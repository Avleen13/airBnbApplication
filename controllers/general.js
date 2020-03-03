const express = require('express')
const router = express.Router();


//home route
router.get("/",(req,res)=>{

    res.render("general/home",{
        title:"Home Page"
    });
});

//contact us route
router.get("/contact-us",(req,res)=>{

    res.render("general/contactUs",{
        title:"Contact Page"
    });
});

//process contact us form for when user submits form
router.post("/contact-us",(req,res)=>{

    const {firstName,lastName,email,message} = req.body;

    
    const sgMail = require('@sendgrid/mail');
    sgMail.setApiKey(process.env.SEND_GRID_API_KEY);
    const msg = {
    to: `kadeembestteaches@gmail.com`,
    from: `${email}`,
    subject: 'Contact Us Form Submit',
    html: 
    `Vistor's Full Name ${firstName} ${lastName} <br>
     Vistor's Email Address ${email} <br>
     Vistor's message : ${message}<br>
    `,
    };

    //Asynchornous operation (who don't know how long this will take to execute)
    sgMail.send(msg)
    .then(()=>{
        res.redirect("/");
    })
    .catch(err=>{
        console.log(`Error ${err}`);
    });

});

module.exports = router;