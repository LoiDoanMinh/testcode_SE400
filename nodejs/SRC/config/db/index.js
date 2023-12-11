//kết nối database
const mongoose = require('mongoose');
async function connect(){
try{
    await mongoose.connect('mongodb+srv://bietdoibaothu:Khoi123456789!@cluster0.duwjpta.mongodb.net/ExplosiveWord');
    
    console.log('susseccfully');
}
catch(error){
    console.log('failure');
}
}
module.exports={connect};