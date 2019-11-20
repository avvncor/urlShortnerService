const express = require('express');
const router = express.Router();
const Url = require('../models/url')

router.get('/:code', async (req,res, next)=>{
    try{
        const url = await Url.findOne({urlCode:req.params.code})
        if(url){
            return res.redirect(url.longUrl)
        }else{
            return res.status(404).json('No Url found')
        }
    }catch(err){
        console.log(err);
        res.status(500).json("Server Error")
    }
})

router.get('/', (req,res, next)=>{
    res.render('url',{
        shortUrl:"",
        error:""
    })
    
})


module.exports = router;