import * as keys from "../assets/storage/keys.json";
import { AFIO } from "./Afio";
import { createReadStream } from "fs";
export class BunnyCDN {
  hostName: string;
  path: string;
  headers: object = {
    "Content-Type": "multipart/form-data",
    AccessKey: keys.password,
  };
  constructor() {
    this.hostName = keys.hostname;
    this.path = keys.path;
  }
  uploader(filename: string) {
    let fetch = new AFIO(`${this.hostName}/${this.path}/${filename}`);
    fetch.setHeaders(this.headers);
    fetch.put(createReadStream(filename)).then((item) => {
      console.log(item);
    });
  }
  get(folderName: string) {
    let fetch = new AFIO(`${this.hostName}/${this.path}/${folderName}/`);
    fetch.setHeaders(this.headers);
    fetch.get().then((item) => {
      console.log(item);
    });
  }
}
