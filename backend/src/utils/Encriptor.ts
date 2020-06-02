import * as bcrypt from "bcryptjs";
export function encrypt(plainTextPassword: string) {
  return new Promise((load, fail) => {
    bcrypt.genSalt(10, function (err: any, salt: any) {
      bcrypt.hash(plainTextPassword, salt, function (err: any, hash: any) {
        if (err) {
          fail(err);
        } else load(hash);
      });
    });
  });
}
export function compare(password: string, hash: string) {
  console.log(password, hash);
  return bcrypt.compare(password, hash);
}
