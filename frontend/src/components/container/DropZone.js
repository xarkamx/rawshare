import React, { useCallback } from "react"
import { useDropzone } from "react-dropzone"
import { optionalFn } from "../../Core/helpers"

export function Dropzone({ onUpload }) {
  const onDrop = useCallback(acceptedFiles => {
    optionalFn(onUpload)(acceptedFiles)
  }, [])
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Drop the files here ...</p>
      ) : (
        <p>Drag 'n' drop some files here, or click to select files</p>
      )}
    </div>
  )
}
