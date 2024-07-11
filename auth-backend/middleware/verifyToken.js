import jwt from "jsonwebtoken"
import dotenv from "dotenv"

dotenv.config();

const verifyToken = (req, res, next) => {
    const token = req.cookies.jwt;
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized: token not provided' })
    }

    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        next();
    }
    catch (error) {
        return res.status(401).json({ message: 'Unauthorized: Invalid token' })
        console.log(error.message)
    }

}

export default verifyToken