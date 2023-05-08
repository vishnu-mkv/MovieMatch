namespace MovieMatch.Managers
{
    public class FileHandler : IFileHandler
    {
        private readonly string wwwrootPath;

        public IHttpContextAccessor _httpContextAccessor { get; }

        public FileHandler(IWebHostEnvironment hostingEnvironment, IHttpContextAccessor httpContextAccessor)
        {
            wwwrootPath = hostingEnvironment.WebRootPath;
            _httpContextAccessor = httpContextAccessor;
        }

        public string Save(string directory, IFormFile file)
        {
            string photoName = $"{Guid.NewGuid()}{Path.GetExtension(file.FileName)}";
            string filePath = Path.Combine("media", directory, photoName);
            string fullPath = Path.Combine(wwwrootPath, filePath);

            Directory.CreateDirectory(Path.GetDirectoryName(fullPath));

            using (var fileStream = new FileStream(fullPath, FileMode.Create))
            {
                file.CopyTo(fileStream);
            }

            return filePath;
        }

        public void DeleteFile(string filePath)
        {
            string fullPath = Path.Combine(wwwrootPath, filePath);
            Console.WriteLine(filePath);
            Console.WriteLine("full "+fullPath);


            if (File.Exists(fullPath))
            {
                File.Delete(fullPath);
            }
        }

        public string GetFullUrl(string filePath)
        {
            return URLHelper.GetFileURL(_httpContextAccessor, filePath);
        }

        
    }
}

public class URLHelper
{
    public static string GetFileURL(IHttpContextAccessor _httpContextAccessor,string filePath)
    {
        if (filePath.StartsWith("http://") || filePath.StartsWith("https://"))
        {
            return filePath;
        }

        var request = _httpContextAccessor.HttpContext.Request;
        var baseUrl = $"{request.Scheme}://{request.Host}";
        return $"{baseUrl}/{filePath.Replace("\\", "/")}";
    }
}

public interface IFileHandler
{
    void DeleteFile(string filePath);
    public string Save(string directory, IFormFile file);
    public string GetFullUrl(string filePath);
}