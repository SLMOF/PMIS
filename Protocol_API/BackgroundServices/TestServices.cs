namespace Protocol_API.BackgroundServices
{
    public class TestServices: BackgroundService
    {
        private readonly IServiceProvider _serviceProvider;

        public TestServices(IServiceProvider serviceProvider)
        {
            _serviceProvider = serviceProvider;
        }

        protected override async Task ExecuteAsync(CancellationToken stoppingToken)
        {
            await Task.Delay(1000);

            while (!stoppingToken.IsCancellationRequested)
            {
                Console.WriteLine("=======================");
                Console.WriteLine("Service is runing");
                Console.WriteLine("=======================");

                // Fetch Taxpayers
                var scope = _serviceProvider.CreateScope();
                var context = scope.ServiceProvider.GetRequiredService<AppDbContext>();

                var visitors = await context.Visitors.ToListAsync();
                Console.WriteLine("=======================");
                Console.WriteLine("Service Ended");
                Console.WriteLine("=======================");

                Console.WriteLine("=======================");
                Console.WriteLine($"found {visitors.Count} records in DB");
                Console.WriteLine("=======================");

                await Task.Delay(5000);
            }
        }
    }
}
