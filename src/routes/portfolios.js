const express = require("express");
const router = express.Router();
const portfolioController = require("../controller/portfolios");
const { validate, portfolioSchema } = require("../middleware/validate");
const portfolioUpload = require("../middleware/portfolioUpload");

router.get("/user/:id", portfolioController.getPortfolios);
router.get("/:id", portfolioController.getDetailPortfolio);
router.post(
  "/",
  portfolioUpload(),
  validate(portfolioSchema),
  portfolioController.createPortfolio,
);
router.put("/:id", portfolioUpload(), portfolioController.updatePortfolio);
router.delete("/:id", portfolioController.deletePortfolio);

module.exports = router;
