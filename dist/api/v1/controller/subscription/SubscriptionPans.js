"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addPlan = exports.deletePlan = exports.editPlan = exports.getPlanById = exports.getAllPlans = void 0;
const PlanDetails_model_1 = __importDefault(require("../../../../models/PlanDetails.model"));
const getAllPlans = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const plans = yield PlanDetails_model_1.default.find();
        res.status(200).json(plans);
    }
    catch (error) {
        console.error('Error fetching plans:', error);
        res.status(400).json({ error: 'Internal server error' });
    }
});
exports.getAllPlans = getAllPlans;
const getPlanById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const planId = req.params.id;
        const plan = yield PlanDetails_model_1.default.findById(planId);
        if (!plan) {
            return res.status(404).json({ error: 'Plan not found' });
        }
        res.status(200).json(plan);
    }
    catch (error) {
        console.error('Error fetching plan by ID:', error);
        res.status(400).json({ error: 'Internal server error' });
    }
});
exports.getPlanById = getPlanById;
const editPlan = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const planId = req.params.id;
        const updatedPlan = yield PlanDetails_model_1.default.findByIdAndUpdate(planId, req.body, { new: true });
        if (!updatedPlan) {
            return res.status(404).json({ error: 'Plan not found' });
        }
        res.status(200).json(updatedPlan);
    }
    catch (error) {
        console.error('Error updating plan:', error);
        res.status(400).json({ error: 'Internal server error' });
    }
});
exports.editPlan = editPlan;
const deletePlan = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const planId = req.body.id;
        const deletedPlan = yield PlanDetails_model_1.default.findByIdAndDelete(planId);
        if (!deletedPlan) {
            return res.status(404).json({ error: 'Plan not found' });
        }
        res.status(200).json({ message: 'Plan deleted successfully' });
    }
    catch (error) {
        console.error('Error deleting plan:', error);
        res.status(400).json({ error: 'Internal server error' });
    }
});
exports.deletePlan = deletePlan;
const addPlan = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newPlan = new PlanDetails_model_1.default(req.body);
        const savedPlan = yield newPlan.save();
        res.status(201).json(savedPlan);
    }
    catch (error) {
        console.error('Error adding new plan:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
exports.addPlan = addPlan;
