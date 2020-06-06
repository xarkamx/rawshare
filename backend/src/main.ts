import { Routes } from "./http/routes";
import { PhotoConversor } from "./resources/PhotoConversor";

new PhotoConversor().runInterval();
new Routes();
