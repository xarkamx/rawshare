import { AuthFetch } from "./AsyncFetch/AuthFetch"
export class ImageManager {
  files = []
  constructor(files) {
    this.files = files
  }
  upload() {
    let files = this.files
    let fetch = new AuthFetch("/photos")
    for (let item of files) {
      fetch.post(item)
    }
  }
}
