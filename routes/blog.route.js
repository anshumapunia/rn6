const {Router}=require("express");
const blogRoute=Router()
const {auth}=require("../middlewares/auth.middleware")
const {verifyrole}=require("../middlewares/verifyrole.middleware");
const {addblog,editblog,deleteblog,getblog,likeblog,commentblog}=require("../controllers/blog.controller")

blogRoute.post("/blogs",auth,verifyrole(["User"]),addblog)
blogRoute.patch("/blogs/:id",auth,verifyrole(["User"]),editblog)
blogRoute.delete("/blogs/:id",auth,verifyrole(["User"]),deleteblog)
blogRoute.get("/blogs",auth,getblog)
blogRoute.patch("/blogs/:id/like",auth,verifyrole(["User"]),likeblog)
blogRoute.patch("/blogs/:id/comment",auth,verifyrole(["User"]),commentblog)


module.exports={blogRoute}