import { PhotosModel } from "./../models/PhotosModel";
import { parse, dirname } from "path";
import { BunnyCDN } from "../utils/BunnyCDN";
import * as fs from "fs";
var cr2Raw = require("cr2-raw");
var download = require("download-file");
export class PhotoConversor {
  bunnyUrl: string = "https://rawshare.b-cdn.net/";
  async run() {
    console.log("running uploader");
    let model = new PhotosModel();
    let photos = await model.where({ jpg: "" }).get();
    photos.map((item: any) => {
      this.downloader(item);
    });
  }

  runInterval(time: number = 1) {
    time = time * 1000 * 60;
    setInterval(() => {
      this.run();
    }, time);
  }

  private downloader(item: any) {
    let { id, originalFile } = item;

    console.log("downloading", originalFile);
    let { dir, base, ext, name } = parse(originalFile);
    let url = this.bunnyUrl + originalFile;

    download(
      url,
      {
        directory: "./" + dir,
        filename: base,
      },
      (err: any) => {
        if (err) throw err;
        this.rawConversor(dir, base, name, id);
      }
    );
  }
  private rawConversor(dir: string, base: string, name: string, id: number) {
    console.log(base, " to jpg");
    const rawPath = `./${dir}/${base}`;
    let raw = cr2Raw(rawPath);
    const path = `image/jpg/${name}.jpg`;
    fs.writeFile(path, raw.previewImage(), async () => {
      await this.updatePath(path, id);
      fs.unlinkSync(rawPath);
      fs.unlinkSync(path);
    });
  }

  private async updatePath(path: string, id: number) {
    console.log("updating ", id);
    let bunny = new BunnyCDN();
    await bunny.uploader(path);
    let model = new PhotosModel();
    model
      .where({ id })
      .setValues({
        jpg: path,
      })
      .save();
  }
}
//let bunny = new BunnyCDN();
//bunny.uploader("image/test.cr2");
//bunny.get("image");
