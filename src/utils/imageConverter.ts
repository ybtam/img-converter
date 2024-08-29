export const convertToWebP = (
  file: File,
  callback: (webpUrl: string | undefined) => void,
  quality: number
) => {
  const reader = new FileReader();
  reader.readAsDataURL(file);

  reader.onload = (event) => {
    const result = event.target?.result;

    if (typeof result === "string") {
      const imgElement = new Image();
      imgElement.src = result;

      imgElement.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        canvas.width = imgElement.width;
        canvas.height = imgElement.height;

        ctx?.drawImage(imgElement, 0, 0, canvas.width, canvas.height);

        canvas.toBlob(
          (blob) => {
            if (blob) {
              const webpUrl = URL.createObjectURL(blob);
              callback(webpUrl);
            } else {
              callback(undefined);
            }
          },
          "image/webp",
          quality
        );
      };
    } else {
      console.error("FileReader result is not a string");
      callback(undefined);
    }
  };
};
