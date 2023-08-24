const mongoose = require('mongoose');

const commentSchema=new mongoose.Schema({
  username:{type:String,required:true,trim:true},
  content:{type:String,required:true,trim:true}
})

const blogSchema = new mongoose.Schema({
 userID:{type:mongoose.Schema.Types.ObjectId,ref:'User', required:true},
 title:{type:String,required:true,trim:true},
 content:{type:String,required:true,trim:true},
 category:{type:String,required:true,trim:true},
 date:{type:Date,required:true,trim:true},
 likes:{type:Number,required:true,trim:true, default:0},
 comments:[commentSchema]
});

const BlogModel = mongoose.model('Blog', blogSchema);

module.exports = {BlogModel};