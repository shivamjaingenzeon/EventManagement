namespace EventManagementTool.Repository
{
    public interface IFileService
    {
        public Tuple<int,string> SaveImage(FormFile imageFile);

        public bool DeleteImage(string imageFileName);
    }
}
