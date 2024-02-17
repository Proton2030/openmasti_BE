import { Request, Response } from "express";
import UserModel from "../../../../../models/user.model";

export const userLogin = async (req: Request, res: Response) => {
  try {
    const existingUser = await UserModel.findOne({ $or: [ { email: req.body.email }, { ph_no: req.body.ph_no }] });

    if (existingUser) {
      return res.status(409).json({ message: 'User already exists' });
    }

    const newUser = new UserModel({
      full_name: req.body.full_name,
      ph_no: req.body.ph_no,
      email: req.body.email,
      is_Premium: req.body.is_Premium,
      vaildity: req.body.vaildity
    });

    await newUser.save();

    res.status(201).json(newUser);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: 'Server error' });
  }
};
