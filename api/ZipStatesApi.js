module.exports = function (app) {
    var express = require('express');
    var request = require('request');
    var baseURL = 'https://www.zipcodeapi.com/rest/ht5CJnaM6k30kjN9rerCNt2ZWoLLHknZOtCxQNkW7nXsHLB803KNwMNtbyeTTBSI/info.json/';
    var result ={};
    var cache= {};
    var start = function () {
      app.get('/api/ziptostate', function (req, res) {
        var zip = req.query.zip;
        var URL = baseURL + zip + '/radians';
        request.get(URL ,function(error,response,body){
          if(error){
            console.log(error);
                   }
          else{
            result= JSON.parse(body);
            if(result.state === undefined){
              var errored = JSON.stringify({zipCode: zip,
                            state: 'no matching state'});
              res.writeHead(200, {
                'Content-Length': errored.length,
                'Content-Type': 'application/json'});
              res.end(errored);
                                          }
            else {
              cache[zip] = result.state;
              var responseString = JSON.stringify({zipCode: zip,
                                   state: result.state});
              res.writeHead(200, {
                'Content-Length': responseString.length,
                'Content-Type': 'application/json'});
                res.end(responseString);

                }
          }
        });
      });
    };
    return {
      start: start
    };
};
