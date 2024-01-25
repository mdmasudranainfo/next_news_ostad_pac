import { jwtVerify, SignJWT } from "jose";

export async function CreateToken(email, id) {
  const secret = new TextEncoder().encode(process.env.JWT_SECRET);
  const Payload = { email: email, id: id };
  let token = await new SignJWT(Payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setIssuer(process.env.JWT_ISSUER)
    .setExpirationTime(process.env.JWT_EXPIRATION_TIME)
    .sign(secret);
  return token;
}

export async function VerifyToken(token) {
  const secret = new TextEncoder().encode(process.env.JWT_SECRET);
  const decoded = await jwtVerify(token, secret);
  return decoded["payload"];
}

//
// export async function CreateToken(email, id) {
//   const secret = new TextEncoder().encode(process.env.JWT_SECRET);
//   let token = await new SignJWT({ email, id })
//     .setProtectedHeader({ alg: "HS256" })
//     .setIssuedAt() // jwt token create time stamp
//     .setIssuer(process.env.JWT_ISSUER) // jwt token issuer
//     .setExpirationTime(process.env.JWT_EXPIRATION_TIME) // expiration time
//     .sign(secret); // sing token
//   return token; //return token
// }

// export async function VerifyToken(token) {
//   const secret = new TextEncoder().encode(process.env.JWT_SECRET);
//   const decoded = await jwtVerify(token, secret);
//   return decoded["payload"];
// }

//
