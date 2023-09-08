import mongoose from "mongoose";

let isconnected = false; //track the connection

export const connectToDB = async () =>{
    mongoose.set('strictQuery',true);

    if(isconnected){
        console.log('MongoDB is already connected');
        return;
    }

    try {
        await mongoose.connect(process.env.MONGODB_URI,{
            dbName: 'share_prompt',
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        isconnected=true;
        console.log('MongoDB connected');

    } catch (error) {
        console.log(error)
    }
}