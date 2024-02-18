import PlanHistoryModel from "../../../../models/paymentHistory.model";
import UserModel from "../../../../models/user.model";
import { Request, Response } from 'express';

export const updateUserPremiumStatus = async (req: Request, res: Response) => {
  try {
    const { _id }: any = req.body;

    if (!_id) {
      return res.status(400).json({ error: 'User ID is required' });
    }
    
    const user = await UserModel.findById(_id);
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    user.is_premium = true;
    user.validity = 90;

    await user.save();

    const planHistory = new PlanHistoryModel({
      userId: _id,
      plan_name: "gold",
    });
    await planHistory.save();

    console.log('User premium status updated successfully');
    res.status(200).json({ message: 'User premium status updated successfully',data:planHistory });
  } catch (error) {
    console.error('Error updating user premium status:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
