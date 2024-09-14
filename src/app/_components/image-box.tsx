import { useEffect, useState, useTransition } from "react";
import { convertImage } from "@/utils/imageConverter";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface Props {
  format: 'webp' | 'jpeg' | 'png';
  file: File | null;
  quality: number;
}

export default function ImageBox({ file, quality, format }: Props) {
  const [imageUrl, setImageUrl] = useState<string>();
  const [isPending, setIsPending] = useState(false);

  useEffect(() => {
    if (!file) return;

    setIsPending(true);
    convertImage({
      file,
      callback: url => {
        setImageUrl(url);
        setIsPending(false);
      },
      quality,
      format,
    })
  }, [quality, file]);

  return (
    <div className="mt-2 flex flex-col items-center">
      {isPending ? (
        <p className="text-center">Converting...</p>
      ) : !imageUrl ? (
        <p className="text-center">{format}</p>
      ) : (
        <div className="flex w-80 items-center justify-between rounded-sm bg-white p-3 shadow-sm sm:w-[413px]">
          <div className="flex gap-2">
            <img src={imageUrl} alt="converted image" className="w-16 h-16" />
            {file?.name?.split(".").reverse().pop()} ({format})
          </div>
          <Button asChild>
            <Link href={imageUrl} download={file?.name}>
              Download
            </Link>
          </Button>
        </div>
      )}
    </div>
  );
}
