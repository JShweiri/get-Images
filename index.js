var request = require('request');
const cheerio = require('cheerio');
const fs = require('fs');

 function downloadpage(URL){

  request({url:URL}, function(error, response, body){ 
    console.log('error:', error); // Print the error if one occurred
    console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
    console.log("\n");
    const $ = cheerio.load(body)

    let l = 0;
    if(Object.keys($('img')).length < 80){
      l = Object.keys($('img')).length;
    } else {
      l = 80;
    }

    let url;
    for(let i = 0; i < l; i++ ){
      if ($('img')[''+ i]){
      url = $('img')[''+ i].attribs.src;

      console.log(url); // Print the HTML for the Google homepage.
      if (url.charAt(1) == '/'){
      request('http:'+$('img')[''+ i].attribs.src).pipe(fs.createWriteStream( __dirname + '/images/'+'/' + i + '.png'))
      }
    }
    }
});

 }

 downloadpage('https://en.wikipedia.org/wiki/Dog');

