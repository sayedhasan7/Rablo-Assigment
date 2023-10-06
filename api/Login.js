const Express = require("express")
const router = Express.Router()
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const User = require("../modal/UserModal")
const mongodb = require("mongoose")


router.post("/", async (req, res) => {
    try {
        const { email, password } = req.body;
        // console.log(email, password)
        // Find the user by email
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({ message: 'Authentication failed . Email ID Not Found' });
        }

        // Compare the provided password with the stored hash
        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return res.status(401).json({ message: 'Authentication failed. Invalid password.' });
        }

        // If the password is correct, create a JWT token
        const token = await jwt.sign({ userId: user._id, email: user.email }, "process.env.SECRETKEY");

        // fetching and sending the userdetails 
        const userdata = jwt.verify(token,"process.env.SECRETKEY")
        const userdetails = await User.findOne({email:userdata.email}).select("-password")

        // sending both the deatils 
        res.status(200).json({ message: 'Authentication successful' ,token:token,userdetails});

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }

});

module.exports = router;
