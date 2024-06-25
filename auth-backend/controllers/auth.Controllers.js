import User from "../models/user.model.js"
import bcrypt from "bcrypt"
import generateJWTTokenAndSetCookie from "../utils/generateToken.js"

const signup = async (req, res) => {
    try {
        const { username, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        // we need to check if the user already exists
        const foundUser = await User.findOne({ username });
        if (foundUser) {
            res.status(201).json({
                message: "Username already exists :("
            });
        }
        else {
            const user = new User({ username: username, password: hashedPassword });
            generateJWTTokenAndSetCookie(user._id, res);
            await user.save();
            res.status(201).json({ message: "User registered!" });

        }

    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "User registration failed" })
    }

}

export default signup;