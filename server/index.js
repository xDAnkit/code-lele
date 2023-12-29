const express = require("express");
const expressSession = require("express-session");
const bodyParser = require("body-parser");
const http = require("node:http");
const mongoose = require("mongoose");
const { codeMod } = require("./mongooseModule/codeSchema.js");
const cors = require("cors");

const app = express();
const server = http.createServer(app);

app.use(cors());
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
app.use(bodyParser.text());
app.use(bodyParser.raw());

app.use(
  expressSession({
    secret: "saveyourass",
    resave: false,
    saveUninitialized: true,
  })
);

app.get("/:id", async (req, res) => {
  const id = req.params.id;
  const codeSave = await codeMod.findOne({ id: id });

  res.status(201).json(codeSave);
});
app.post("/:id", async (req, res) => {
  const { id, code, language } = req.body;
  const codeDetail = await codeMod.findOne({ id: id });
  if (codeDetail?.id != id) {
    const codeSave = new codeMod({ id, code, language });
    const insertedCode = await codeSave.save();
    res.status(201).json(insertedCode);
  }
  res.status(302);
});
app.patch("/:id", async (req, res) => {
  const id = req.params.id;
  const { code, language } = req.body;
  await codeMod.findOneAndUpdate({ id: id }, { code, language });
  res.status(201);
});
//shdgudiehdied
// app.post('/', async (req,res)=>{

// })

app.listen(9001, async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/codeshare", {
      autoIndex: true,
    });
    console.log("This is localhost:9001");
  } catch (err) {
    console.log(err);
  }
});
