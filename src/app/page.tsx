"use client"

import React, {Suspense, useState, useTransition} from "react";
import {convertToWebP} from "@/utils/imageConverter";
import Success from "@/assets/success";
import QualitySlider from "@/app/_components/qualitySlider";
import Dropzone from "@/app/_components/dropzone";

export default function Home() {
  const [file, setFile] = useState<File | null>(null);
  const [convertedFile, setConvertedFile] = useState<string | undefined>();
  const [originalFileName, setOriginalFileName] = useState<
    string | undefined
  >();
  const [isPending, startTransition] = useTransition();
  const [quality, setQuality] = useState(0.85);

  const handleFileAccepted = (acceptedFile: File) => {
    setFile(acceptedFile);
    const fileNameWithoutExtension = acceptedFile.name.replace(/\.[^/.]+$/, "");
    setOriginalFileName(fileNameWithoutExtension);
    startTransition(() =>
      convertToWebP(acceptedFile, setConvertedFile, quality)
    );
  };

  const handleQualityChange = (newQuality: number) => {
    setQuality(newQuality);
    if (file) {
      startTransition(() => convertToWebP(file, setConvertedFile, newQuality));
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-xl mb-4">Image to WebP Converter</h1>
      <QualitySlider onQualityChange={handleQualityChange} />
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
