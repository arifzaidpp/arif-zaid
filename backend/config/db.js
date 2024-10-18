import mongoose from "mongoose";

// import mongoose from "mongoose";

// const connectToMongoDB = async () =>{
//     try{
//         await mongoose.connect(process.env.MONGO_URI);
//         console.log("Connected to MongoDB");
//     }catch (error){
//         console.log("Error connecting to MongoDB",error.message);
//     }
//  }

const connectToMongoDB = async () => {
    try {
        const dbName = "Admin"; // Replace with your actual database name
        const mongoUri = `${process.env.MONGO_URI}/${dbName}`;
        await mongoose.connect(mongoUri);
        console.log("Connected to MongoDB");
    } catch (error) {
        console.log("Error connecting to MongoDB", error.message);
    }
}

export default connectToMongoDB;