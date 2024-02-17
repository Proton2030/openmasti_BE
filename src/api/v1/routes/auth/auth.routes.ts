import express from "express";
import { userLogin } from "../../controller/auth/login/userLogin";

const router = express.Router();

router.route("/login").post(userLogin);



module.exports = router;
