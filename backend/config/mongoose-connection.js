const mongoose=require("mongoose")

const config=require('config')
mongoose.connect(`${config.get("MONGODB_URI")}`)
.then(function(){ 
  console.log("db connected successfully")
})
.catch(function(err){
    console.log(err.message)
})

module.exports=mongoose.connection;
// mongoose.connect("mongodb://127.0.0.1:27017/testapp")

