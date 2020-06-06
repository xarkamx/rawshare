import { UserModel } from "./../../models/UserModel";
let jwt = require("jsonwebtoken");
export async function validateToken(req: any, res: any) {
  console.log("validating token");
  const token = req.headers["access-token"];

  if (token) {
    let data = await new UserModel().where({ jwtToken: token }).get();
    if (data.length == 0) {
      res.json({ error: "Token Inexistente" });
      return false;
    }
    let { username } = data[0];
    jwt.verify(token, username, (err: any, decoded: any) => {
      if (err) {
        res.json({ error: "Token inválida" });
        return false;
      }
    });
  } else {
    res.send({
      error: "Token no proveída.",
    });
    return false;
  }
  return true;
}
