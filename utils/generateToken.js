import Jwt from "jsonwebtoken";

export const generateToken = (payload) => {
  const expiresIn = 60 * 15; //15 min
  try {
    const token = Jwt.sign({ uid: payload }, process.env.Jwt_Secret, {
      expiresIn,
    });
    return { token, expiresIn };
  } catch (error) {
    console.log(error);
  }
};
