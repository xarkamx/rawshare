import { PhotosModel } from "./../models/PhotosModel";
import { parse, dirname } from "path";
import { BunnyCDN } from "../utils/BunnyCDN";
import * as fs from "fs";
var cr2Raw = require("cr2-raw");
var download = require("download-file");
var compress_images = require("compress-images");
export class PhotoConversor {
  bunnyUrl: string = "https://rawshare.b-cdn.net/";
  async run() {
    console.log("running uploader");
    let model = new PhotosModel();
    let photos = [];
    try {
      photos = await model.where({ jpg: "" }).limit("10").get();
    } catch (e) {
      console.log("err", e);
      return false;
    }
    photos.map((item: any) => {
      this.downloader(item);
    });
  }

  runInterval(time: number = 1) {
    this.run();
    time = time * 5000 * 60;
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
        this.rawConversor(dir, base, name, ext, id);
      }
    );
  }
  private rawConversor(
    dir: string,
    base: string,
    name: string,
    ext: string,
    id: number
  ) {
    console.log(base, " to jpg");
    const rawPath = `./${dir}/${base}`;
    if (ext != ".CR2") {
      console.log(ext, "ups");
      fs.unlinkSync(rawPath);
      return false;
    }
    let raw = cr2Raw(rawPath);
    const path = `image/jpg/${name}.jpg`;
    fs.writeFile(path, raw.previewImage(), async () => {
      this.compress(path)
        .then((data: any) => {
          const compressedPath = data.statistic.path_out_new;
          this.updatePath(compressedPath, id);
          this.clearFiles([rawPath, path, compressedPath]);
        })
        .catch(() => {
          this.clearFiles([rawPath, path]);
        });
    });
  }

  private clearFiles(paths: Array<string>) {
    paths.map((item) => fs.unlinkSync(item));
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
  private async compress(path: string) {
    console.log("compressing", path);
    return new Promise((load, fail) => {
      compress_images(
        path,
        "image/jpg/comp",
        { compress_force: false, statistic: true, autoupdate: true },
        false,
        { jpg: { engine: "mozjpeg", command: ["-quality", "40"] } },
        { png: { engine: "pngquant", command: ["--quality=20-50"] } },
        { svg: { engine: "svgo", command: "--multipass" } },
        {
          gif: {
            engine: "gifsicle",
            command: ["--colors", "64", "--use-col=web"],
          },
        },
        function (error: any, completed: any, statistic: any) {
          if (error) {
            fail(error);
          }
          load({ completed, statistic });
        }
      );
    });
  }
}
