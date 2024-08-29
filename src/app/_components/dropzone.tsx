import React from 'react'
import { useDropzone } from 'react-dropzone'

interface DropzoneProps {
  onFileAccepted: (file: File) => void
}

const Dropzone: React.FC<DropzoneProps> = ({ onFileAccepted }) => {
  const onDrop = (acceptedFiles: File[]) => {
    const inputFile = acceptedFiles[0]
    if (inputFile) {
      onFileAccepted(inputFile)
    }
  }

  const { getInputProps, getRootProps, isDragActive } = useDropzone({
    onDrop,
  })

  return (
    <div
      {...getRootProps()}
      className={`w-80 rounded-md border-2 border-dashed p-2 text-center sm:w-[413px] sm:p-4 ${
        isDragActive ? 'border-green-500' : 'border-gray-400'
      }`}
    >
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Drop the files here ...</p>
      ) : (
        <p>Drag and drop an image file here, or click to select a file</p>
      )}
    </div>
  )
}

export default Dropzone
