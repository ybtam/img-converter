'use client'

import Dropzone from '@/app/_components/dropzone'
import QualitySlider from '@/app/_components/qualitySlider'
import Success from '@/assets/success'
import { convertImage } from '@/utils/imageConverter'
import React, { Suspense, useState, useTransition } from 'react'
import ImageBox from "@/app/_components/image-box";

export default function Home() {
  const [file, setFile] = useState<File | null>(null)
  const [quality, setQuality] = useState(0.85)

  return (
    <div className="flex flex-col items-center justify-center gap-6">
      <h1 className="text-xl">Convert your image</h1>
      <QualitySlider quality={quality} onQualityChange={setQuality} />
      <Dropzone onFileAccepted={setFile} />
      <ImageBox file={file} quality={quality} format={'webp'} />
      <ImageBox file={file} quality={quality} format={'jpeg'} />
      <ImageBox file={file} quality={quality} format={'png'} />
    </div>
  )
}
