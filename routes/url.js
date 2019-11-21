const express = require('express');
const router = express.Router();
const validUrl = require('valid-url');
const shortid = require('shortid');
const config = require('config');
const Url = require('../models/url')

router.post('/shorten',  async (req,res,next)=>{
    
    const {longUrl} = req.body;
    if(longUrl){
       return  res.render('url',{
            shortUrl:"",
            error:"Invalid Url"
        })
    }
    
    const baseUrl = config.get('baseUrl');
    const urlCode = shortid.generate();

    if(validUrl.isUri(longUrl)){
        try{
            let url = await Url.findOne({longUrl})
            if(url){
                // return res.json(url)
                res.render('url',{
                    shortUrl:url.shortUrl,
                    error:""
                })
            }
            else{
                const shortUrl = baseUrl + '/' + urlCode;
                url = new Url({
                    longUrl,
                    shortUrl,
                    urlCode,
                    date: new Date()
                });

                await url.save();
                return res.render('url',{
                    shortUrl:url.shortUrl,
                     error:""
                })
            }

        } catch(err){
            console.log(err);
            return res.status(500).json('Server Error')
        }   
    }else{
        return res.render('url',{
            shortUrl:"",
            error:"Invalid Url"
        })
    }
})


module.exports = router;