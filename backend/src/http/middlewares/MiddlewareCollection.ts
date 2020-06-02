import { UserModel } from "./../../models/UserModel";
let jwt = require("jsonwebtoken");
export async function validateToken(req: any, res: any) {
  console.log("validating token");
  const token = req.headers["access-token"];

  if (token) {
    let data = await new UserModel().where({ jwtToken: token }).get();
    if (data.length == 0) {
      return res.json({ mensaje: "Token inválida" });
    }
    let { username } = data[0];
    console.log(username, token);
    jwt.verify(token, username, (err: any, decoded: any) => {
      if (err) {
        return res.json({ mensaje: "Token inválida" });
      }
    });
  } else {
    res.send({
      mensaje: "Token no proveída.",
    });
  }
  return true;
}
