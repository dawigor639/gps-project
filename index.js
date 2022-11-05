const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")

const fs = require("fs")
const fsPromises = require("fs").promises;

const PORT = process.env.PORT || 5000
const app = express()

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cors())

async function fileRead(path) {
  const data = await fsPromises.readFile(path).catch((err) => console.error("Failed reading file", err));
  console.log( JSON.parse(data.toString()))//
  return JSON.parse(data.toString());
}

async function fileWrite(path,data) {
  fsPromises.writeFile(path,JSON.stringify(data)).catch((err) => console.error("Failed writing to file", err));
}

async function fileAppend(path,data) {

  fsPromises.readFile(path).then( savedData => {
    var json = JSON.parse(savedData);
    json.push(data);    
    fsPromises.writeFile(path,JSON.stringify(json)).catch((err) => console.error("Failed writing to file", err));
  }).catch((err) => console.error("Failed reading file", err));

}

app.get("/", (req, res) => {
  res.sendFile("index.html", { root: '.' })
})

app.get("/coordinates", (req, res) => {
  fileRead("./coordinates.json").then( (response) => {
    res.status(200).send(response);
  })
})

app.get("/coordinate", (req, res) => {
  fileRead("./coordinate.json").then( (response) => {
    res.status(200).send(response);
  })
})

app.post("/coordinates", (req, res) => {
  const coordinate = req.body
  fileAppend("./coordinates.json",coordinate)
  res.setHeader("Location", "https://gpsproject.pl/coordinates");
  res.status(201).json({"success":"1"});

})

app.post("/coordinate", (req, res) => {
  const coordinate = req.body 
  fileWrite("./coordinate.json",coordinate) 
  res.setHeader("Location", "https://gpsproject.pl/coordinate");
  res.status(201).json({"success":"1"});

})

app.listen(PORT, function () {

  console.log("Express server listening on port ${PORT}")
})
