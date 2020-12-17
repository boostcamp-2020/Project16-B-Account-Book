class ImageUploader {
  async upload(file) {
    const data = new FormData();
    const preset = process.env.REACT_APP_PRESET;
    const CloudinaryURL = process.env.REACT_APP_CLOUDINARY_URL;

    data.append('file', file);
    data.append('upload_preset', preset);

    const result = await fetch(CloudinaryURL, {
      method: 'POST',
      body: data,
    });

    return await result.json();
  }
}

export default ImageUploader;
