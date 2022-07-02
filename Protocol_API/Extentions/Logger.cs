

namespace Protocol_API.Extentions
{
    public class Logger
    {
        private static string? _errorFile;

        public static string GetLogDir() => Path.Combine(AppContext.BaseDirectory, "Logs");

        public static void LogInfo(string message)
        {
            var logDir = Path.Combine(GetLogDir(), "Info");
            Directory.CreateDirectory(logDir);

            var logFile = new FileInfo(Path.Combine(logDir, $"info-{DateTime.Today:MM-dd-yyyy}.txt"));

            if (!logFile.Exists)
            {
                using var stream = logFile.Create();
            }
            try
            {
                File.AppendAllLines(logFile.FullName, new[] { "===***===", message, "===***===" });
            }
            catch
            {
                // nothing!
            }
        }

        public static void LogError(Exception ex, int retries = 0)
        {
            if (ex is TaskCanceledException or IOException or SocketException)
            {
                return;
            }

            if (retries >= 5)
            {
                _errorFile = $"errors-{DateTime.Today:MM-dd-yyyy}";
                return;
            }

            if (string.IsNullOrEmpty(_errorFile) || !_errorFile.StartsWith($"errors-{DateTime.Today:MM-dd-yyyy}"))
            {
                _errorFile = $"errors-{DateTime.Today:MM-dd-yyyy}";
            }

            try
            {
                DogLog(ex);
            }
            catch
            {
                _errorFile += "-1";

                Thread.Sleep(10);

                LogError(ex, retries++);
            }
        }

        public static void DogLog(Exception ex)
        {
            var errorDir = Path.Combine(GetLogDir(), "Errors");
            Directory.CreateDirectory(errorDir);

            var logFile = new FileInfo(Path.Combine(errorDir, $"{_errorFile}.txt"));
            if (!logFile.Exists)
            {
                using var stream = logFile.Create();
            }

            var lines = new[]
            {
                $"====== {DateTime.Now} ======",
                $"Message: {ex.Message} -- {ex.InnerException?.Message}",
                $"Stack Trace: {ex.StackTrace}",
                "======================="
        };

            File.AppendAllLines(logFile.FullName, lines);

            if (_errorFile!.Contains("-1-1-1"))
            {
                _errorFile = "";
            }
        }
    }
}
