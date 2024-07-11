import jwt from "jsonwebtoken"
import dotenv from "dotenv"

dotenv.config();

const generateJWTTokenAndSetCookie = (userId, res) => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: "15d"
    })
    res.cookie("jwt", token, {
        maxAge: 15 * 24 * 60 * 60 * 1000, //milliseconds
        httpOnly: true,
        sameSite: "strict",
        secure: "false"
    })
}

export default generateJWTTokenAndSetCookie