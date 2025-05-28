const express=require("express");
const app=express();
const mongoose=require("mongoose");
const newListings=require("./models/listing.js");
const mongo_URL="mongodb://127.0.0.1:27017/Journeo";
const path=require("path");
const ejsMate=require("ejs-mate");
const methodOverride=require('method-override');
main().then(()=>{
    console.log("Connected to DB");
})
.catch((err)=>{
    console.log(err);
});
async function main(){
    await mongoose.connect(mongo_URL);
}
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.get("/",(req,res)=>{
    res.send("Hi , I am a root");
});
app.use(express.static(path.join(__dirname,"/public")));
app.engine('ejs',ejsMate);
//Index Route
app.get("/listings",async (req,res)=>{
 const allListings= await newListings.find({});
 //console.log(allListings);
  res.render("./listings/index.ejs",{allListings});
});
//New Route
app.get("/listings/new",(req,res)=>{
res.render("./listings/new.ejs");
});
//Show Route
app.get("/listings/:id",async (req,res)=>{
let {id}=req.params;
const listing=await newListings.findById(id);
res.render("./listings/show.ejs",{listing});
});
//Create Route
app.post("/listings",async(req,res)=>{
   // let {title,description,image,price,country,location}=req.body;
   const newListing=new newListings(req.body.listing);
   
    await newListing.save();

   res.redirect("/listings");

});
//Edit route
app.get("/listings/:id/edit",async(req,res)=>{
    let {id}=req.params;
const listing=await newListings.findById(id);
res.render("./listings/edit.ejs",{listing});
});
//Update Route
app.put("/listings/:id",async(req,res)=>{
    let {id}=req.params;
   await  newListings.findByIdAndUpdate(id,{...req.body.listing});
   res.redirect(`/listings/${id}`);
});
//Delete Route
app.delete("/listings/:id",async(req,res)=>{
    let {id}=req.params;
   let deletedListing= await newListings.findByIdAndDelete(id);
   console.log(deletedListing);
    res.redirect("/listings");
});

app.listen(3000,()=>{
    console.log("server is listening to port 3000");
});
