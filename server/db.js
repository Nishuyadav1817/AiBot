const mongoose=require("mongoose");

async function DataBase() {
    await mongoose.connect("mongodb+srv://Nishuyadav1817:%23Nishu1616@nishu1818.iwdfunk.mongodb.net/ChatBot");
    console.log("Data base connected")
}
module.exports=DataBase;