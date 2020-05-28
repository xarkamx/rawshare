import * as fs from "fs";
import { BunnyCDN } from "./utils/BunnyCDN";
import { Routes } from "./http/routes";
var cr2Raw = require("cr2-raw");

//let raw = cr2Raw("image/test.cr2");
//fs.writeFileSync("image/jpg//my-image.jpg", raw.previewImage());
//let bunny = new BunnyCDN();
//bunny.uploader("image/test.cr2");

new Routes();
