interface Params {
  file: File;
  callback: (imgUrl: string | undefined) => void;
  quality: number;
  format: 'webp' | 'jpeg' | 'png';
}

export const convertImage = ({ file, callback, quality, format }: Params) => {
  // Validate file type
  const validTypes = ['image/jpeg', 'image/png', 'image/webp'];
  if (!validTypes.includes(file.type)) {
    console.error('Invalid file type. Only JPEG, PNG, and WebP formats are supported.');
    callback(undefined);
    return;
  }

  const reader = new FileReader();

  reader.onload = (event) => {
    const result = event.target?.result;

    if (typeof result === 'string') {
      const imgElement = new Image();
      imgElement.src = result;

      imgElement.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        canvas.width = imgElement.width;
        canvas.height = imgElement.height;

        ctx?.drawImage(imgElement, 0, 0, canvas.width, canvas.height);

        canvas.toBlob(
          (blob) => {
            if (blob) {
              const imageUrl = URL.createObjectURL(blob);
              callback(imageUrl);
            } else {
              console.error('Image conversion failed.');
              callback(undefined);
            }
          },
          `image/${format}`,
          quality
        );
      };

      imgElement.onerror = () => {
        console.error('Failed to load image.');
        callback(undefined);
      };
    } else {
      console.error('Failed to read file.');
      callback(undefined);
    }
  };

  reader.onerror = () => {
    console.error('Error reading file.');
    callback(undefined);
  };

  reader.readAsDataURL(file);
};
