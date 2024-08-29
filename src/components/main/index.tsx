"use client";

import React, { useState, useTransition, Suspense } from "react";
import Dropzone from "./dropzone";
import { convertToWebP } from "../../utils/imageConverter";
import Success from "@/assets/success";

export default function ImgConvert() {
  const [convertedFile, setConvertedFile] = useState<string | undefined>(
    undefined
  );
  const [originalFileName, setOriginalFileName] = useState<string | undefined>(
    undefined
  );
  const [isPending, startTransition] = useTransition();

  const handleFileAccepted = (file: File) => {
    const fileNameWithoutExtension = file.name.replace(/\.[^/.]+$/, "");
    setOriginalFileName(fileNameWithoutExtension);
    startTransition(() => convertToWebP(file, setConvertedFile));
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-xl mb-4">Image to WebP Converter</h1>
      <Dropzone onFileAccepted={handleFileAccepted} />
      {isPending && <p>Converting...</p>}
      <Suspense fallback={<p>Loading converted image...</p>}>
        {convertedFile && originalFileName && (
          <div className="flex flex-col items-center mt-2">
            <h2 className="text-lg mb-2">File converted 👇</h2>
            <div className="flex justify-between items-center bg-white rounded-sm p-3 shadow-sm w-80 sm:w-[413px]">
              <div className="flex gap-2">
                <Success color="green" />
                {originalFileName}.webp
              </div>
              <a href={convertedFile} download={`${originalFileName}.webp`}>
                <button className="bg-blue-500 hover:bg-blue-600 text-white rounded-sm shadow-md px-4 py-1 transition ease-in-out delay-0 hover:scale-105 duration-10">
                  Download
                </button>
              </a>
            </div>
          </div>
        )}
      </Suspense>
    </div>
  );
}
