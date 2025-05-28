const mongoose=require("mongoose");
const initData=require("./data.js");
const newListing=require("../models/listing.js");
const mongo_URL="mongodb://127.0.0.1:27017/Journeo";

main().then(()=>{
    console.log("Connected to DB");
})
.catch((err)=>{
    console.log(err);
});
async function main(){
    await mongoose.connect(mongo_URL);
}
const initDB=async ()=>{
    await newListing.deleteMany({});
    await newListing.insertMany(initData.data);
console.log("data was initialized");
}
initDB();