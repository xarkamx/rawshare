import React from "react"
export function UploaderGalleryButton() {
  return (
    <input
      type="file"
      multiple
      onChange={({ target }) => {
        console.log(target.files)
      }}
    />
  )
}
