
import { Request, Response } from 'express';
import PlanDetailsModel from '../../../../models/PlanDetails.model';

export const getAllPlans = async (req: Request, res: Response) => {
  try {
    const plans = await PlanDetailsModel.find();
    res.status(200).json(plans);
  } catch (error) {
    console.error('Error fetching plans:', error);
    res.status(400).json({ error: 'Internal server error' });
  }
}

export const getPlanById = async (req: Request, res: Response) => {
  try {
    const planId = req.params.id;
    const plan = await PlanDetailsModel.findById(planId);
    if (!plan) {
      return res.status(404).json({ error: 'Plan not found' });
    }
    res.status(200).json(plan);
  } catch (error) {
    console.error('Error fetching plan by ID:', error);
    res.status(400).json({ error: 'Internal server error' });
  }
}

export const editPlan = async (req: Request, res: Response) => {
  try {
    const planId = req.params.id;
    const updatedPlan = await PlanDetailsModel.findByIdAndUpdate(planId, req.body, { new: true });
    if (!updatedPlan) {
      return res.status(404).json({ error: 'Plan not found' });
    }
    res.status(200).json(updatedPlan);
  } catch (error) {
    console.error('Error updating plan:', error);
    res.status(400).json({ error: 'Internal server error' });
  }
}

export const deletePlan = async (req: Request, res: Response) => {
  try {
    const planId = req.body.id;
    const deletedPlan = await PlanDetailsModel.findByIdAndDelete(planId);
    if (!deletedPlan) {
      return res.status(404).json({ error: 'Plan not found' });
    }
    res.status(200).json({ message: 'Plan deleted successfully' });
  } catch (error) {
    console.error('Error deleting plan:', error);
    res.status(400).json({ error: 'Internal server error' });
  }
}

export const addPlan = async (req: Request, res: Response) => {
  try {
    const newPlan = new PlanDetailsModel(req.body);
    const savedPlan = await newPlan.save();
    res.status(201).json(savedPlan);
  } catch (error) {
    console.error('Error adding new plan:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
