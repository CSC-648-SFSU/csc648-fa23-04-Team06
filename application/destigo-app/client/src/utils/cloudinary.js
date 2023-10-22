const fileUpload = async (file) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "chat-app");
  formData.append("cloud_name", "hellooworkd"); // Replace with your upload preset

  try {
    const response = await fetch(
      "https://api.cloudinary.com/v1_1/hellooworkd/image/upload",
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
