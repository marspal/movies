const fs = require("fs");
const util = require("util");
const readAsync = util.promisify(fs.readFile)

async function init(path){
  try{
    let data = await readAsync(path);
    data = JSON.parse(data);
    console.log(data.name);
  } catch(err){
    console.log(err)
  }
}

init('./package.json')