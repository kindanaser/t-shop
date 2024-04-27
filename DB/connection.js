import mongoose from 'mongoose';

const connectDB = async ()=>{
    mongoose.connect(process.env.DB)
    .then( ()=>{
        console.log("connected to DB successfully ... ");
    }).catch( (err)=>{
        console.log(`error to cnecct DB ${err}`)
    })
}
export default connectDB;