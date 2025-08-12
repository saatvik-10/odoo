import * as jwt from "hono/jwt";

export const getPasswordKeys = async (password: string) => {
  // Bun.password.hash generates a hash including the salt and algorithm
  const hash = await Bun.password.hash(password);

  // The Bun.password API combines the salt and hash into a single string.
  // There is no need to return a separate salt.
  // The verify function extracts the salt and algorithm from the hash string automatically.
  return { hash };
};

export const validatePassword = async (password: string, hash: string) => {
  // The verify function extracts the salt and algorithm from the hash string automatically.
  return await Bun.password.verify(password, hash);
};

//generates JWT for users
export const generateJWT = async (data: IJWTData): Promise<string> => {
  //5 Days
  const expiry = Math.floor(Date.now() / 1000) + 60 * 10 * 24 * 60;
  return await jwt.sign({ ...data, exp: expiry }, process.env.JWT_SECRET!);
};

//verifies JWT for users
export const verifyJWT = async (token: string): Promise<IJWTData> => {
  const data = await jwt.verify(token, process.env.JWT_SECRET!);
  return data as unknown as IJWTData;
};