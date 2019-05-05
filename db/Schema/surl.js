"use strict";
const mongoose = require("mongoose"),
  Schema = mongoose.Schema;

let surlSchema = new Schema(
  {
    surl: {type: String, required : true},
    url: {type: String, required : true},
  },
  {
    // createdAt,updatedAt fields are automatically added into records
    timestamps: true
  }
);

surlSchema.index({ surl: 1 });
surlSchema.index({ url: 1 });

module.exports = mongoose.model("Surl", surlSchema);
