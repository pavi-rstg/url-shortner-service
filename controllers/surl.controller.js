"use strict";

const Surl = require("../db/Schema/surl"),
//regex to parse valid url
URL_REGEX = new RegExp("^(http[s]?:\\/\\/(www\\.)?|ftp:\\/\\/(www\\.)?|www\\.){1}([0-9A-Za-z-\\.@:%_\+~#=]+)+((\\.[a-zA-Z]{2,3})+)(/(.)*)?(\\?(.)*)?");

module.exports = {
    /**
    * Route handler to create/return short-url from a long url
    * @param {*} req 
    * @param {*} res 
    * @param {*} next 
    */
    generateShortUrl: function(req, res, next) {
        //validate the long url
        if (!URL_REGEX.test(req.body.url)) {
            var err = new Error("Invalid URL.");
            err.status = 400;
            next(err);
        }
        else {
            //check if the url has already been shortened and saved in the db
            Surl.findOne({ url: req.body.url}, function (err, doc) {
                if (err) {
                    var err = new Error(err);
                    err.status = 400;
                    next(err);
                }
                else if (doc) {
                    //return already shortened url
                    res.json({
                        shortUrl : doc.surl
                    });
                }
                else {
                    //shorten the url and save to db
                    var surlObj = new Surl({
                        url: req.body.url
                    }) 
                    
                    surlObj.surl = Buffer.from(surlObj._id.toString(), 'hex').toString('base64');
                    
                    surlObj.save(function (err) {
                        if (err) {
                            var err = new Error(err);
                            err.status = 400;
                            next(err);
                        }
                        else {
                            res.json({
                                shortUrl : surlObj.surl
                            });
                        }
                    })
                }
            })
        }
    },
    
    /**
    * Route handler to redirect short urls to long url
    * @param {*} req 
    * @param {*} res 
    * @param {*} next 
    */
    redirectToUrl: function(req, res, next) {
        Surl.findOne({ surl: req.params.surl + (req.params[0] ? req.params[0] : '') }, function (err, doc) {
            if (err) {
                var err = new Error("Whoops!");
                err.status = 500;
                next(err);
            }
            else if (doc) {
                res.redirect(doc.url);
            }
            else {
                var err = new Error("Imaginary Short Url!");
                err.status = 400;
                next(err);
            }
            
        })
    }
}