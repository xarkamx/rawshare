import React from "react"
import { ImageManager } from "./../../utils/ImageManager"
export function UploaderGalleryButton() {
  return (
    <input
      type="file"
      multiple
      name="photo"
      onChange={({ target }) => {
        let images = new ImageManager(target.files)
        images.upload()
      }}
    />
  )
}
