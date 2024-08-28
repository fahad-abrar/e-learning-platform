import jwt from "jsonwebtoken";

const registerToken = (user) => {
  const secretCode = Math.floor(Math.random() * 9000 + 1000).toString();
  const payload = {
    user,
    secretCode,
  };
  const registerToken = jwt.sign(payload, process.env.REGISTER_SECRET, {
    expiresIn: "1000000m",
  });
  return {
    secretCode,
    registerToken,
  };
};

export default registerToken;
