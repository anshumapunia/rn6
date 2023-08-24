const { BlogModel } = require("../models/blog.model");

const addblog = async (req, res) => {
  const {userID,username,title,content,category,date,likes,comments}= req.body;
  try {
    const blog = new BlogModel({userID,username,title,content,category,date,likes,comments});
    await blog.save();
    res.status(200).send({ success: true, message: "Blog is added" });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

const editblog = async (req, res) => {
  const blogId = req.params.id;
  const updatedBlogData = req.body;
  const {userID}=req.body
  try {
    data=await BlogModel.find({blogId})
    if(data.userID===userID){
      const blog = await BlogModel.findByIdAndUpdate(blogId, updatedBlogData, {
        new: true,
      })
      res.status(200).send({ success: true, message: "Blog is edit by the User" });
    }else{
      res.status(200).send({ success: true, message: "This blog is not create by your so you not able to edit this blog" });
    }
    
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

const deleteblog = async (req, res) => {
    const blogId = req.params.id;
    const {userID}=req.body
  try {
    data=await BlogModel.find({blogId});
    if(data.userID===userID){
      let loki=await BlogModel.findByIdAndDelete(blogId)
      res.status(200).send({ success: true, message: "blog is delete" });
    }else{
      res.status(200).send({ success: true, message: "This blog is not create by your so you not able to delete this blog" });
    }
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

const getblog = async (req, res) => {
  console.log(req.query);
  let{title,date,category,order}=req.query;

  try {
    title=new RegExp(title,'i');
    category=new RegExp(category,'i')
    
    if(order==='asc'){
      order=1;
    }else if(ordery==='desc'){
      order=-1
    }

    if(order){
      data=await BlogModel.find({title,date,category}).sort({date:order})
    }else{
      data=await BlogModel.find({title,date,category})
    }

    res.status(200).send({ success: true,data:data,message:"All Blogs data successfully fetched"});

} catch (error) {
    res.status(400).send({ error: error.message });
}
};



const likeblog = async (req, res) => {
  const blogId = req.params.id;
try {
  const blog = await BlogModel.findByIdAndUpdate(blogId, {$inc:{likes:1}}, {
    new: true,
  })
  res.status(200).send({ success: true, message: "Blog liked successfully",data:blog });
 
} catch (error) {
  res.status(400).send({ error: error.message });
}
};


const commentblog = async (req, res) => {
  const blogId = req.params.id;
  const {username,content}=req.body;
  try {
    const blog = await BlogModel.findByIdAndUpdate(blogId, {$push:{comments:{username,content}}}, {
      new: true,
    })
    res.status(200).send({ success: true, message: "Comment added successfully",data:blog });
   
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

module.exports = { addblog,editblog,deleteblog,getblog,likeblog,commentblog }
