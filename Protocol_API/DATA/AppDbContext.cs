


using Microsoft.EntityFrameworkCore.ChangeTracking;

namespace Protocol_API.DATA
{
    public class AppDbContext : DbContext
    {
        private readonly JwtResolver _jwtResolver;
        public AppDbContext(DbContextOptions<AppDbContext> options, JwtResolver jwtResolver)
         : base(options)
        {
            _jwtResolver = jwtResolver;
        }

        public DbSet<Role> Roles { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<Department> Departments { get; set; }
        public DbSet<Visitor> Visitors { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            IgnoreDeletedRecords(modelBuilder);
            AddUserFilter(modelBuilder, _jwtResolver);


            modelBuilder.Entity<Role>().Property(r => r.Permissions).HasConversion(v => string.Join(',', v), v => v.Split(',', StringSplitOptions.RemoveEmptyEntries).ToList()); // converty array to comma separted strings and vice versa for that collumn
        }

        //while Saving Entitites
        public override Task<int> SaveChangesAsync(CancellationToken cancellationToken = default)
        {
            AddCredentials(); // adds createdBy and createdAt at each insert operation.

            return base.SaveChangesAsync(cancellationToken);
        }


        //Ignore deleted Records
        private static void IgnoreDeletedRecords(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Visitor>().HasQueryFilter(d => !d.IsDeleted);
        }

        private static void AddUserFilter(ModelBuilder modelBuilder, JwtResolver _jwtResolver)
        {   
            modelBuilder.Entity<Visitor>().HasQueryFilter(u => u.CreatedById == _jwtResolver.GetUserId());
        }

            //added outmatic datetime and created by
            private IEnumerable<EntityEntry<Entity>> AddCredentials()
        {
            var entries = ChangeTracker.Entries<Entity>().Where(e => e.State == EntityState.Added);

            foreach (var entry in entries)
            {
                entry.Entity.CreatedAt = DateTime.Now;
                entry.Entity.IsDeleted = false;

                if (_jwtResolver.GetUserRoleName() != "Admin")
                {
                    entry.Entity.CreatedById = _jwtResolver.GetUserId();
                }
            }


            return entries;
        }
    }
}
