namespace Protocol_API.DTOs
{
    public interface IMessage
    {
        Task SendMessage(string ReceiveMessage,string message);
    }
}
