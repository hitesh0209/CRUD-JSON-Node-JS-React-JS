const express = require("express") 
const router = express.Router();
const fs = require("fs");


const dbRoutes = require('./db')
router.use(dbRoutes);


const dataPath = "./db/db.json"

const saveData = (data) => {
    const stringifyData = JSON.stringify(data)
    fs.writeFileSync(dataPath, stringifyData)
}

const getData = () => {
    const jsonData = fs.readFileSync(dataPath)
    return JSON.parse(jsonData)   
}

dbRoutes.post('/addData', (req, res) => {
 
    var existData = getData()
    // const newDataId = Math.floor(100000 + Math.random() * 900000)
    existData.push(req.body)
    // existData = req.body
   
    // console.log(existData);
    saveData(existData);
    res.send({success: true, msg: 'Data added successfully'})
})

dbRoutes.get("/readData",(req,res) => {
    const Data = getData()
    res.send(Data);
})

dbRoutes.put('/update/:id', (req, res) => {
    var existData = getData()
    fs.readFile(dataPath, 'utf8', (err, data) => {
      const dataId = req.params['id'];     

      var foundId = existData.findIndex(function (obj){ 
        return obj.id == dataId;
    });
    if (foundId >= 0) {
      console.log("found id");
      existData[foundId] = {
              id: dataId,
              username: req.body.username,
              email: req.body.email,
        }
    }
      saveData(existData);      
      res.send(`Data with id ${dataId} has been updated`)
    }, true); 
  });

  dbRoutes.delete('/delete/:id', (req, res) => {

    fs.readFile(dataPath, 'utf8', (err, data) => {
      var existData = getData()

      // var existData = getData()
      const dataId = req.params['id'];
      var foundId = existData.findIndex(function (obj){ 
        return obj.id == dataId;
    });
    if (foundId >= 0) {
        console.log("id found");
          existData.splice(foundId,1)
    }
      saveData(existData);
      res.send(`Data with id ${dataId} has been deleted`)
    }, true);
  })
module.exports =router