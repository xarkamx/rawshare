import React, { useState, useEffect, useRef } from "react"
import { ImageManager } from "./../../utils/ImageManager"
import Masonry from "react-masonry-component"
import { AuthFetch } from "../../utils/AsyncFetch/AuthFetch"
import "./scss/gallery.scss"
import { Button } from "@material-ui/core"
export function UploaderGalleryButton() {
  const inputRef = useRef(null)
  return (
    <>
      <GalleryView />
      <Button
        style={{
          display: "block",
          margin: "10px auto",
          color: "white",
          fontWeight: "bolder",
          textShadow: "1px 1px 1px #aaa",
          boxShadow: "1px 1px 3px #555",
          width: "15vw",
          background: "blue",
        }}
        onClick={() => {
          inputRef.current.click()
        }}
      >
        Subir
      </Button>
      <input
        ref={inputRef}
        hidden
        id="photoUploader"
        type="file"
        multiple
        name="photo"
        onChange={({ target }) => {
          let images = new ImageManager(target.files)
          images.upload()
        }}
      />
    </>
  )
}
export function GalleryView() {
  const [photos, setPhotos] = useState([])
  let loadPhotos = () => {
    let fetch = new AuthFetch("/gallery")
    fetch.get().then(photos => {
      setPhotos(photos)
    })
  }
  useEffect(() => {
    loadPhotos()
  }, [])
  return (
    <Masonry
      className={"mainGallery"} // default ''
      elementType={"ul"} // default 'div'
      disableImagesLoaded={false} // default false
      updateOnEachImageLoad={false} // default false and works only if disableImagesLoaded is false
    >
      {photos.map((item, key) => {
        return (
          <li>
            <img
              style={{ width: "32.5vw" }}
              key={key}
              src={`https://rawshare.b-cdn.net/${item.jpg}`}
            />
          </li>
        )
      })}
    </Masonry>
  )
}
