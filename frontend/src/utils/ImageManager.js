import { AuthFetch } from "./AsyncFetch/AuthFetch"
import { AFIO } from "./AsyncFetch/AsyncFetch"
import { LoginManager } from "./LoginManager"
var userData = new LoginManager().getToken()
export class ImageManager {
  files = []
  constructor(files) {
    this.files = files
  }
  async upload(onStateChange = null) {
    let { hostname, path, password } = await getBunnyKeys()
    let bunny = new BunnyCDN(hostname, path, password)
    let files = this.files
    let fetch = new AuthFetch("/photos")
    delete fetch.headers["Content-Type"]
    fetch.toggleStringify()
    let index = 0
    for (let item of files) {
      let filename = this.getFileName(index, item)
      bunny.uploader(item, filename).then(this.uploadPaths)
      index++
    }
  }

  uploadPaths(item) {
    let fetch = new AuthFetch("/photos")
    fetch.post(item)
  }

  getFileName(index, item) {
    let timeStamp = new Date().getTime()
    let filename = `${userData.username}-${index}-${timeStamp}-${item.name}`
    return filename
  }
}
export class BunnyCDN {
  headers = {
    "Content-Type": "multipart/form-data",
  }
  constructor(hostname, path, password) {
    this.hostName = hostname
    this.path = path
    this.headers.AccessKey = password
  }
  async uploader(file, filename) {
    let folder = "image/"
    filename = folder + filename || new Date() + ".cr2"
    const url = `${this.hostName}/${this.path}/${filename}`
    let fetch = new AFIO(url)
    fetch.toggleStringify()
    fetch.setHeaders(this.headers)
    let data = await fetch.put(file)
    return { data, url, filename }
  }
  get(folderName) {
    let fetch = new AFIO(`${this.hostName}/${this.path}/${folderName}/`)
    fetch.setHeaders(this.headers)
    fetch.get().then(item => {
      console.log(item)
    })
  }
}
function getBunnyKeys() {
  let fetch = new AuthFetch("/keys")
  return fetch.get()
}
