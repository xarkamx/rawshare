import { AFIO } from "./AsyncFetch"
import { LoginManager } from "./../LoginManager"
export class AuthFetch extends AFIO {
  constructor(path) {
    super(path)
    this.__setUrl(path)
    let loginManager = new LoginManager()
    this.setHeaders({ "access-token": loginManager.getToken().token })
  }
  __setUrl(path) {
    let https = "http://"
    let prefix =
      process.env.NODE_ENV === "development"
        ? "localhost:3000/api/"
        : "siteurl/"
    this.path = https + this.__clearURL(prefix + path)
  }

  __clearURL(path) {
    console.log()
    return path.replace("//", "/")
  }
}
