import { JWTPayload, jwtVerify, SignJWT } from "jose";

const secret = new TextEncoder().encode(process.env.JWT_SECRET);

export const generateAccessToken = async (
  payload: JWTPayload
): Promise<string> => {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("30m")
    .sign(secret);
};

export const generateRefreshToken = async (
  payload: JWTPayload
): Promise<{ token: string; jti: string }> => {
  const returnObject = {
    token: "",
    jti: "",
  };

  const jti = crypto.randomUUID();
  const token = await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setJti(jti)
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(secret);

  returnObject.token = token;
  returnObject.jti = jti;

  return returnObject;
};

export const verifyToken = async (
  token: string
): Promise<JWTPayload | null> => {
  try {
    const { payload } = await jwtVerify(token, secret);
    return payload;
  } catch (error) {
    throw error;
  }
};
