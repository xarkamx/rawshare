import { AuthFetch } from "./AsyncFetch/AuthFetch"
export class ImageManager {
  files = []
  constructor(files) {
    this.files = files
  }
  upload() {
    let files = this.files
    let fetch = new AuthFetch("/photos")
    delete fetch.headers["Content-Type"]
    fetch.toggleStringify()
    for (let item of files) {
      let data = new FormData()
      data.append("photo", item)
      fetch.post(data)
    }
  }
}
