const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const projectSchema = new mongoose.Schema({
    title:String,
    mainImage:String,
    desc:String
})
module.exports = mongoose.model("project",projectSchema);