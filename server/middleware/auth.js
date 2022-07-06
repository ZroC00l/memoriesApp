import jwt from "jsonwebtoken";

const auth = async (req, res, next) => {
  try {
    //checking user token is valid, by getting the token from the frontend
    const token = req.headers.authorization.split(" ")[1];

    //verifying the token if its from google auth or custom auth,we verify this through token length
    const isCustomAuth = token.length < 500;
    let decodedData;

    if (token && isCustomAuth) {
      decodedData = jwt.verify(token, process.env.TOKEN_KEY);

      //now that we know which user is logged in, we need to store their id
      req.userId = decodedData?.id;
    } else {
      //decode token credentials from google auth
      decodedData = jwt.decode(token);

      req.userId = decodedData?.sub;
    }
    next();
  } catch (error) {
    console.log(error);
  }
};
export default auth;
