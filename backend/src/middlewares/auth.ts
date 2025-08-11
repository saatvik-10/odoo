import * as jwt from "hono/jwt";


//Return hash as a object
export const getPasswordKeys = async (password : string) => {
    const hash = await Bun.password.hash(password);
    return { hash };
}

//Verify password against hash
//Bun.password.verify extracts the salt and algorithm from the hash string automatically
export const validatePassword = async (password : string, hash : string) => {
    return await Bun.password.verify(password, hash);
}

//Generates JWT for users
export const generateJWT = async (data : IJWTData) : Promise<string> => {
    const expiry = Math.floor(Date.now() / 1000) + 60 * 5 * 24 * 60; // 5 Days
    return await jwt.sign({ ...data, exp: expiry }, process.env.JWT_SECRET!);
}

//Verifies JWT for users
//Returns IJWTData if valid, throws error if invalid
export const verifyJWT = async (token : string) : Promise<IJWTData> => {
    const data = await jwt.verify(token, process.env.JWT_SECRET!);
    return data as unknown as IJWTData;
}