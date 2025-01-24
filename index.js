const express = require("express");
const mongoose = require("mongoose");
const app = new express();

const projects = require("./modules/project")
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI).then(()=>{
    app.post("/project",async(req,res)=>{
        try{
            const project = new projects();
            const body = req.body;
            project.mainImage = body.mainImage;
            project.title = body.title;
            project.desc = body.desc;
            await project.save();
            res.send(project);
            return;
        }catch(e){
            res.send(e.message);
            return;
        }
    });
    app.delete("/project/:id",async(req,res)=>{
        try{
            await projects.findByIdAndDelete(req.params.id);
            res.send("removed");
            return;
        }catch(e){
            res.send(e.message);
            return;
        }
    });
    app.get("/project",async(req,res)=>{
        try{
            const projectsAll = await projects.find();
            res.json(projectsAll);
            return;
        }catch(e){
            res.send(e.message);
            return;
        }
    });
    app.get("/project/:id",async(req,res)=>{
        try{
            const project = await projects.findById(req.params.id);
            res.json(project);
            return;
        }catch(e){
            res.send(e.message);
            return;
        }
    });
    app.put("/project/:id",async(req,res)=>{
        const updateDate = {
            title:req.body.title,
            mainImage:req.body.mainImage,
            desc:req.body.desc
        };
        try{
            const updateProject = await projects.findByIdAndUpdate(req.params.id,updateDate,{new:true})
            res.send(updateProject);
            return;
        }catch(e){
            res.send(e.message);
            return;
        }
    });
}).catch((e)=>{
    console.log(e);
});


// app.listen(3000,()=>{
//     console.log("the app is running in port 3000");
// })
module.exports = app;