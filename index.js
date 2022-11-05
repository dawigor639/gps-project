const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")

const fs = require('fs')
const fsPromises = require('fs').promises;

const PORT = process.env.PORT || 5000
const app = express()

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cors())

/*
const coordinates = [
  {
    id: 1,
    position: {
        latitude: 49.80404,
        longitude: 9.96233
    },
    timeStamp  : 125155332222
  }
]
*/


async function f(path) {
  const data = await fsPromises.readFile(path)
                     .catch((err) => console.error('Failed to read file', err));

                     console.log( JSON.parse(data.toString()))//
  return JSON.parse(data.toString());
}

/*function writeJson(name,data) {
fs.writeFile(name, data, err => {
  if (err) {
    throw err
  }
  return data
})
}*/


app.get("/", (req, res) => {
  res.send("Welcome to your App!")
})

app.get("/coordinates", (req, res) => {

  let data;

  f('./coordinates.json').then( (response) => {
    res.send(response)
  })

  

})


app.post("/coordinates", (req, res) => {
  const coordinate = {
    id: coordinates.length + 1,
    position: req.body.position, 
    timeStamp: req.body.timeStamp
}
  coordinates.push(coordinate)
  res.send(coordinate);
})

app.listen(PORT, function () {
  console.log(`Express server listening on port ${PORT}`)
})
