using System.ComponentModel;
using System.Linq.Expressions;

namespace Protocol_API.Helpers
{
    public static class QueryableExtensions
    {
        public static async Task<PaginatedResult<T>> PaginateAsync<T>(this IQueryable<T> source, RequestParams requestParams, CancellationToken token = default)
        {
            source = source.Filter(requestParams.Filters)
                .Sort(requestParams.Sorts);

            var totalItems = await source.CountAsync(token);
            source = source.Skip(requestParams.Page * requestParams.Size)
                .Take(requestParams.Size);

            var items = await source.ToListAsync(token);

            return new PaginatedResult<T>()
            {
                Page = requestParams.Page,
                Size = requestParams.Size,
                Items = items,
                TotalItems = totalItems,
                TotalPages = (int)Math.Floor((decimal)totalItems / requestParams.Size)
            };
        }

        public static IQueryable<T> Filter<T>(this IQueryable<T> source, List<Filter> filters)
        {
            if (!filters.Any())
            {
                return source;
            }

            foreach (var filter in filters)
            {
                var param = Expression.Parameter(typeof(T), "x");

                var propertyAccess = Expression.Property(param, filter.Field);

                var converter = TypeDescriptor.GetConverter(propertyAccess.Type);

                var tempValue = converter.ConvertFromInvariantString(filter.Value.ToString());

                //var value = Expression.Constant(tempValue, tempValue.GetType());
                var value = Expression.Constant(tempValue, propertyAccess.Type);

                var operation = filter.Operation switch
                {
                    Operation.Eq => Expression.Equal(propertyAccess, value),
                    Operation.Gt => Expression.GreaterThanOrEqual(propertyAccess, value),
                    Operation.Lt => Expression.LessThanOrEqual(propertyAccess, value),
                    Operation.Gte => Expression.GreaterThanOrEqual(propertyAccess, value),
                    Operation.Lte => Expression.LessThanOrEqual(propertyAccess, value),
                    Operation.Like => throw new NotImplementedException(),
                    _ => Expression.Equal(propertyAccess, value)
                };

                var lambda = Expression.Lambda<Func<T, bool>>(operation, param);

                source = source.Where(lambda);
            }

            return source;
        }

        public static IQueryable<T> Sort<T>(this IQueryable<T> source, List<Sort> sorts)
        {
            if (!sorts.Any())
            {
                return source;
            }

            var i = 0;
            foreach (var sort in sorts)
            {
                var param = Expression.Parameter(typeof(T), "x");

                var propertyAccess = Expression.Property(param, sort.Field);

                var fieldType = propertyAccess.Type;

                var lambda = Expression.Lambda(propertyAccess, param);
                var direction = "";
                if (i is 0)
                {
                    direction = sort.IsAscending ? nameof(Queryable.OrderBy) : nameof(Queryable.OrderByDescending);
                }
                else
                {
                    direction = sort.IsAscending ? nameof(Queryable.ThenBy) : nameof(Queryable.ThenByDescending);
                }

                var call = Expression.Call(typeof(Queryable), direction, new[] { source.ElementType, propertyAccess.Type },
                    source.Expression, lambda);

                source = source.Provider.CreateQuery<T>(call);
                i++;
            }

            return source;
        }
    }
}
