import React, { useState, useEffect, useRef } from "react"
import { ImageManager } from "./../../utils/ImageManager"
import Masonry from "react-masonry-component"
import { AuthFetch } from "../../utils/AsyncFetch/AuthFetch"
import "./scss/gallery.scss"
import { Dropzone } from "./../../components/container/DropZone"
import { GridContainer, GridItem } from "./../../components/Grid/Grid"
import { useCState } from "./../../utils/hooks/simpleHooks"
import { FontIcon } from "./../../components/Icons/FontIcon"
import { SKGrid } from "./../../components/Icons/Spinkit"
export function UploaderGalleryButton() {
  const [state, setState] = useCState({
    files: [],
    completed: [],
    uploading: false,
  })
  console.log("completed", state.completed)
  return (
    <>
      <Dropzone
        onFilesAdded={files => {
          setState({ uploading: true })
          setState({
            files: files.map(({ name }) => {
              return { name, status: "uploading" }
            }),
          })
          let images = new ImageManager(files)
          images
            .upload((item, index) => {
              let completed = state.completed
              completed.push(index)
              setState({ completed })
            })
            .then(all => {
              setState({ files: [], completed: [], uploading: false })
            })
        }}
      >
        {state.uploading == true ? (
          <FilesGrid
            files={state.files}
            key={new Date()}
            completed={state.completed}
          />
        ) : (
          <GalleryView />
        )}
      </Dropzone>
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
      disableImagesLoaded={true} // default false
      updateOnEachImageLoad={false} // default false and works only if disableImagesLoaded is false
    >
      {photos.map((item, key) => {
        let between = 20
        return (
          <li>
            <img
              style={{ width: `${between}vw` }}
              key={key}
              src={`https://rawshare.b-cdn.net/${item.jpg}`}
            />
          </li>
        )
      })}
    </Masonry>
  )
}
function FilesGrid({ files, completed }) {
  return (
    <GridContainer className="fileGrid">
      {files.map((file, key) => {
        return (
          <GridItem xs={4} key={key} className="fileItem">
            <div>
              <div className="icon">
                {!completed.includes(key) ? (
                  <SKGrid background="orange" />
                ) : (
                  <FontIcon
                    icon="check"
                    style={{
                      color: "white",
                      borderRadius: "100%",
                      background: "green",
                      padding: "10px",
                    }}
                  />
                )}
              </div>
              {file.name}
            </div>
          </GridItem>
        )
      })}
    </GridContainer>
  )
}
