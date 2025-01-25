const express = require("express");
const mongoose = require("mongoose");

const app = express();
const projects = require("./modules/project");

app.use(express.json());

mongoose
    .connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.error("MongoDB connection error:", err));

app.get("/", (req, res) => {
    res.send("Welcome to the API!");
});

app.all("*", (req, res) => {
    res.status(404).send("Route not found");
});

app.post("/project", async (req, res) => {
    try {
        const project = new projects();
        const body = req.body;
        project.mainImage = body.mainImage;
        project.title = body.title;
        project.desc = body.desc;
        await project.save();
        res.send(project);
    } catch (e) {
        res.status(500).send(e.message);
    }
});

app.delete("/project/:id", async (req, res) => {
    try {
        await projects.findByIdAndDelete(req.params.id);
        res.send("removed");
    } catch (e) {
        res.status(500).send(e.message);
    }
});

app.get("/project", async (req, res) => {
    try {
        const projectsAll = await projects.find();
        res.json(projectsAll);
    } catch (e) {
        res.status(500).send(e.message);
    }
});

app.get("/project/:id", async (req, res) => {
    try {
        const project = await projects.findById(req.params.id);
        res.json(project);
    } catch (e) {
        res.status(500).send(e.message);
    }
});

app.put("/project/:id", async (req, res) => {
    const updateData = {
        title: req.body.title,
        mainImage: req.body.mainImage,
        desc: req.body.desc,
    };
    try {
        const updatedProject = await projects.findByIdAndUpdate(
            req.params.id,
            updateData,
            { new: true }
        );
        res.send(updatedProject);
    } catch (e) {
        res.status(500).send(e.message);
    }
});

module.exports = app;
