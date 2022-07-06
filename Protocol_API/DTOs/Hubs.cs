using Microsoft.AspNetCore.SignalR;

namespace Protocol_API.DTOs
{
    public class Hubs: Hub
    {
        public async Task SendMessage(NotifyMessage message)
        {
            await Clients.All.SendAsync("ReceiveMessage", "hello baylood");
        }
    }
}
