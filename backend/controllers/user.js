import User from"../models/User.js"
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs';
import { io } from "../index.js";



export const register = async(req,res) => {
    const {lastName, firstName, email, password} = req.body
    const existingUser = await User.findOne({email})
    if(existingUser){
        return res.json({error : 'User already exist'})
    }

const hashedPassword = await bcrypt.hash(password, 12);
const defaultPicture = 'http://localhost:8000/uploads/default-picture.jpg'
const user = await User.create({
    lastName,
    firstName,
    email,
    password: hashedPassword,
    defaultPicture,
});
user.password = undefined;
const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
    expiresIn: '1d'
});
io.emit("user_created", user);

res.send({
    message: 'User Created with success',
    user,
    token
});
};
export const login = async (req, res) => {
    const {email, password} = req.body
    const user = await User.findOne({email})
    if (!user){
        return res.json({error:"user does not exist"})
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password)

    if(!isPasswordCorrect) {
        return res.json({error:"invalid credentials"})
    }


user.password = undefined;

  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });

  res.json({
    message: "Login successful",
    user,
    token,
  });
};

export const getFriends = async (req, res) => {
    const users = await User.find({
        _id: {
            $ne: req.userId,

        },
    }).select("-password");
    res.send(users);
};

export const updateUser= async(req, res)=>{
    const userId= req.userId;
    const {lastName, firstName, status} = req.body;
    const user = await User.findByIdAndUpdate(
        userId,
        {
            lastName,
            firstName,
            status
        },
        { new: true}
    );
    io.emit("user_updated", user);
    res.send(user);
};
export const updateProfilePicture = async (req, res) => {
    const userId = req.userId;
    const profilePicture = "http://localhost:8000/uploads/" + req.file?.filename;

    const user = await User.findByIdAndUpdate(
        userId,
        { profilePicture },
        { new: true }
    );

    io.emit("user_updated", user);
    res.send(user);
};


export const getUserProfile = async (req,res)=>{

    const user = await User.findById(req.params.id)
    .select("-password");

    res.send(user);

};

