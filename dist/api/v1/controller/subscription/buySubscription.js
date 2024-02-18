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
exports.updateUserPremiumStatus = void 0;
const paymentHistory_model_1 = __importDefault(require("../../../../models/paymentHistory.model"));
const user_model_1 = __importDefault(require("../../../../models/user.model"));
const updateUserPremiumStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { _id } = req.body;
        if (!_id) {
            return res.status(400).json({ error: 'User ID is required' });
        }
        const user = yield user_model_1.default.findById(_id);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        user.is_premium = true;
        user.validity = 90;
        yield user.save();
        const planHistory = new paymentHistory_model_1.default({
            userId: _id,
            plan_name: "gold",
        });
        yield planHistory.save();
        console.log('User premium status updated successfully');
        res.status(200).json({ message: 'User premium status updated successfully', data: planHistory });
    }
    catch (error) {
        console.error('Error updating user premium status:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
exports.updateUserPremiumStatus = updateUserPremiumStatus;
