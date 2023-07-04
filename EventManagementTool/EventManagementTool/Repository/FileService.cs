namespace EventManagementTool.Repository
{
    public class FileService : IFileService
    {
        private IWebHostEnvironment environment;
        public FileService(IWebHostEnvironment environment) {
            this.environment = environment;
        }
        public bool DeleteImage(string imageFileName)
        {
            try 
            {
                var wwwPath = this.environment.WebRootPath;
                var path = Path.Combine(wwwPath, "Uploads\\",imageFileName);
                if(System.IO.File.Exists(path)) 
                {
                    System.IO.File.Delete(path);
                    return true;
                }
                return false;
            }
            catch(Exception ex) 
            {
                return false;
            }
        }

        public Tuple<int, string> SaveImage(IFormFile imageFile)
        {
            try
            {
                var contentPath = this.environment.ContentRootPath;

                var path = Path.Combine(contentPath, "Uploads");

                if (!Directory.Exists(path))
                {
                    Directory.CreateDirectory(path);
                }

                var ext = Path.GetExtension(imageFile.FileName);
                var allowedExtensions = new string[] { ".jpg", ".png", ".jpeg" };
                if (!allowedExtensions.Contains(ext))
                {
                    string msg = string.Format("Only {0} extensions are allowed");
                    return new Tuple<int, string>(0, msg);
                }

                string uniqueString = Guid.NewGuid().ToString();

                var newFilename = uniqueString + ext;
                var fileWithPath = Path.Combine(path, newFilename);
                var stream = new FileStream(fileWithPath, FileMode.Create);
                imageFile.CopyTo(stream);
                stream.Close();
                return new Tuple<int, string>(1, newFilename);
            }
            catch (Exception ex)
            {
                return new Tuple<int, string>(0, "Error has occured");
            }
        }

        /*public string SaveImage(IFormFile imageFile)
        {
            string uniqueFilename = string.Empty;
            if (imageFile != null)
            {
                string uploadFolder = Path.Combine(environment.WebRootPath, "Upload/");
                
                uniqueFilename = Guid.NewGuid().ToString() + "_" +imageFile.FileName;
                string filePath = Path.Combine(uploadFolder, uniqueFilename);
                using (var fileStream = new FileStream(filePath, FileMode.Create)) {
                    imageFile.CopyTo(fileStream);
                }
            }
            return uniqueFilename;
        }*/
    }
}
