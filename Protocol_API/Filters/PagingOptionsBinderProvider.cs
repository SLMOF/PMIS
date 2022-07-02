using Microsoft.AspNetCore.Mvc.ModelBinding;
using Microsoft.AspNetCore.Mvc.ModelBinding.Binders;

namespace Protocol_API.Filters
{
    public class PagingOptionsBinderProvider: IModelBinderProvider
    {
        public IModelBinder? GetBinder(ModelBinderProviderContext context)
        {
            if (context is null)
            {
                return null;
            }

            if (context.Metadata.ModelType == typeof(RequestParams))
            {
                return new BinderTypeModelBinder(typeof(PagingOptionsBinder));
            }

            return null;
        }
    }
}
