
using System.Text;
using System.Text.Json;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.ServiceBus;
using Microsoft.Azure.ServiceBus.Core;

namespace api_azure_bus_service.Controllers
{

    [ApiController]
    [Route("[controller]")]
    public class RegistroController : ControllerBase
    {
        private readonly IConfiguration _config;
        private readonly string serviceBusConnectionString;

        public RegistroController(IConfiguration config)
        {
            _config = config;
            serviceBusConnectionString = _config.GetValue<string>("AzureBusConnectionString");
        }

        [HttpPost]
        [Route("queue")]
        public async Task<IActionResult> SaveAtQueue(Registro Registro)
        {
            await SendMessageToQueue(Registro);
            return Ok(Registro);
        }

        [HttpPost]
        [Route("topic")]
        public async Task<IActionResult> SaveAtTopic(Registro Registro)
        {
            await SendMessageToTopic(Registro);
            return Ok(Registro);
        }

        private async Task SendMessageToQueue(Registro Registro)
        {
            var queueName = "filaregistros";

            var client = new QueueClient(serviceBusConnectionString, queueName, ReceiveMode.PeekLock);
            string messageBody = JsonSerializer.Serialize(Registro);
            var message = new Message(Encoding.UTF8.GetBytes(messageBody));

            await client.SendAsync(message);
            await client.CloseAsync();
        }

        private async Task SendMessageToTopic(Registro Registro)
        {
            var topicName = "Registro-topic";

            var client = new TopicClient(serviceBusConnectionString, topicName);
            string messageBody = JsonSerializer.Serialize(Registro);
            var message = new Message(Encoding.UTF8.GetBytes(messageBody));

            await client.SendAsync(message);
            await client.CloseAsync();
        }
    }
}