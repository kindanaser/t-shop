import express from "express";
import 'dotenv/config';
import initApp from "./src/modules/app.router.js";
import Stripe from 'stripe';
const stripe = new Stripe(process.env.stripe_sk);

const app = express();
const PORT = process.env.PORT || 3000;

app.post('/webhook', express.raw({type: 'application/json'}), (request, response) => {
     const sig = request.headers['stripe-signature'];
     let event ;

      try {
        event = stripe.webhooks.constructEvent(request.body,sig,'whsec_wOFIYbUUpYCr9PhLlk2Z8I6KFBNbUz3C');
      } catch (err) {
        response.status(400).send(`Webhook Error: ${err.message}`);
        return;
      }
  
    if (event.type == "checkout.session.completed") {
        console.log("create order .....");
        const checkoutSessionCompleted = event.data.object;
    }else{
        console.log(`Unhandled event type ${event.type}`);        
    }
    response.send();
  });

initApp(app,express);

app.listen(PORT , ()=>{
    console.log(`server is running in port ... ${PORT}`)
})

