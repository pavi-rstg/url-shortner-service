"use strict";
const express = require("express"),
router = express.Router(),
mongoose = require('mongoose'),
  Surl = require("../../db/Schema/surl"),
  surlCtrl = require("../../controllers/surl.controller");

/* GET home page. */
router.get("/", function(req, res, next) {
  
  res.render("index", {origin : req.headers.origin || req.headers.host});
});


/* POST to generate short url. */
router.post("/", surlCtrl.generateShortUrl);

/* GET for short url redirection. */
router.get("/:surl*", surlCtrl.redirectToUrl);

module.exports = router;
