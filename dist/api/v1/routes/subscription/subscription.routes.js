"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const SubscriptionPans_1 = require("../../controller/subscription/SubscriptionPans");
const buySubscription_1 = require("../../controller/subscription/buySubscription");
const router = express_1.default.Router();
router.route("/getAllSubscriptionPlan").get(SubscriptionPans_1.getAllPlans);
router.route("/getSubscriptionPlanById").get(SubscriptionPans_1.getPlanById);
router.route("/buySubscriptionPlan").post(buySubscription_1.updateUserPremiumStatus);
router.route("/addSubscriptionPlan").post(SubscriptionPans_1.addPlan);
router.route("/editSubscriptionPlan").put(SubscriptionPans_1.editPlan);
router.route("/deleteSubscriptionPlan").delete(SubscriptionPans_1.deletePlan);
module.exports = router;
