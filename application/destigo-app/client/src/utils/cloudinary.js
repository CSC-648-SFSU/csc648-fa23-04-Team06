const fileUpload = async (file) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "blog-app");
  formData.append("cloud_name", "destigo"); 
  
  try {
    const response = await fetch(
      "https://api.cloudinary.com/v1_1/destigo/image/upload",
      {
        method: "POST",
        body: formData,
      }
    );

    if (response.ok) {
      const data = await response.json();
      return data.url;
    } else {
      console.error(`Failed to upload file. Status: ${response.status}`);
    }
  } catch (error) {
    console.error(error);
  }
};

export { fileUpload };
