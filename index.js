import express from "express";
import initApp from "./src/modules/app.router.js";
import 'dotenv/config';

const app = express();
const PORT = process.env.PORT || 3000;

initApp(app,express);

app.listen(PORT , ()=>{
    console.log(`server is running in port ... ${PORT}`)
})

