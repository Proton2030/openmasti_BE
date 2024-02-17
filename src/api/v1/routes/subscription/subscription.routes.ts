import express from "express";
import { addPlan, deletePlan, editPlan, getAllPlans, getPlanById } from "../../controller/subscription/SubscriptionPans";
import { updateUserPremiumStatus } from "../../controller/subscription/buySubscription";

const router = express.Router();

router.route("/getAllSubscriptionPlan").get(getAllPlans);
router.route("/getSubscriptionPlanById").get(getPlanById);

router.route("/buySubscriptionPlan").post(updateUserPremiumStatus);
router.route("/addSubscriptionPlan").post(addPlan);

router.route("/editSubscriptionPlan").put(editPlan);

router.route("/deleteSubscriptionPlan").delete(deletePlan);


module.exports = router;
