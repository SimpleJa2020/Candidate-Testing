const express = require("express");

const transactionController = require("../controllers/transaction-controller");
const upload = require("../middlewares/upload");

const router = express.Router();

router.post(
  "/:categoryId",
  upload.single("image"),
  transactionController.createTransaction
);
router.get("/", transactionController.getAllTransaction);
router.get("/:transactionId", transactionController.getTransactionById);
router.put("/:transactionId", transactionController.updateTransaction);
router.delete("/:transactionId", transactionController.deleteTransaction);

module.exports = router;
