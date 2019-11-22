const express = require('express');
const router = express.Router();
const Url = require('../models/url')

router.get('/:code', async (req,res, next)=>{
    try{
        const url = await Url.findOne({urlCode:req.params.code, expire:{$gt:Date.now()}})
        if(!url){
            const url2 = await Url.findOne({urlCode:req.params.code})
            if(url2){
               await Url.findByIdAndRemove({_id:url2._id})
                console.log(url2)
                return res.render('expired')
            }
        }
        if(url){
            return res.redirect(url.longUrl)
        }else{
            return res.render('expired')
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