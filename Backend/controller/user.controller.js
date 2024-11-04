import User from "../user.model.js";
import bcrypt from 'bcryptjs'; // Change to bcryptjs

export const signup = async (req, res) => {
    try {
        const { fullname, email, password } = req.body;
        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: "User already exists" });
        }
        
        const hashedPassword = await bcrypt.hash(password, 10); // bcryptjs hashing
        const createUser = new User({
            fullname: fullname,
            email: email,
            password: hashedPassword
        });
        
        await createUser.save();
        res.status(201).json({
            message: "User created successfully",
            user: {
                _id: createUser._id,
                email: createUser.email,
                fullname: createUser.fullname,
            }
        });
    } catch (error) {
        console.log("Error: " + error.message);
        res.status(500).json({ message: "Server error" });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }
        
        const isEqual = await bcrypt.compare(password, user.password); // bcryptjs comparison
        if (!isEqual) {
            return res.status(400).json({ message: "Invalid password" });
        }
        
        res.status(200).json({
            message: "Login successful",
            user: {
                _id: user._id,
                email: user.email,
                fullname: user.fullname,
            },
        });
    } catch (error) {
        console.log("Error: " + error.message);
        res.status(500).json({ message: "Server error" });
    }
};
