using Microsoft.AspNetCore.SignalR;

namespace Protocol_API.BackgroundServices
{
    public class TestServices: BackgroundService
    {
        private readonly IServiceProvider _serviceProvider;
        private readonly IHubContext<Hubs> _hub;

        public TestServices(IServiceProvider serviceProvider, IHubContext<Hubs> hub)
        {
            _serviceProvider = serviceProvider;
            _hub = hub;
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
                //var scope = _serviceProvider.CreateScope();
                //var context = scope.ServiceProvider.GetRequiredService<AppDbContext>();

                //var visitors = await context.Visitors.ToListAsync();
              //  await _hub.Clients.All.SendAsync("ReceiveMessage", "Usersss", "messagessss");
                Console.WriteLine("=======================");
                Console.WriteLine("Service Ended");
                Console.WriteLine("=======================");

                Console.WriteLine("=======================");
                //Console.WriteLine($"found {visitors.Count} records in DB");
                Console.WriteLine("=======================");

                await Task.Delay(5000);
            }
        }
    }
}
