import { Request, Response } from "express";
import UserModel from "../../../../../models/user.model";

export const userLogin = async (req: Request, res: Response) => {
  try {
    const { full_name, email } = req.body;
    const existingUser = await UserModel.findOne({ email: email });

    if (existingUser) {
      return res.status(409).json({ message: 'User already exists' });
    }

    const newUser = new UserModel({
      full_name: full_name,
      email: email,
      is_Premium: false,

    });

    await newUser.save();

    res.status(201).json(newUser);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: 'Server error' });
  }
};
