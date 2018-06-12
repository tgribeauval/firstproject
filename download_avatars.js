
var request = require('request');
var fs = require('fs');

const repoOwner = process.argv[2];
const repoName = process.argv[3];



function getRepoContributors(repoOwner, repoName, cb) {
  var options = {
    url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
    headers: {
      'User-Agent': 'request',
      'Authorization': 'GITHUB_TOKEN'
    }
    if (!repoOwner || !repoName)
    console.log("Error");
  };

  request(options, function(err, res, body) {
    cb(err, body);
    var toParse = JSON.parse(body);
    for (var i = 0; i < toParse.length; i++) {
      console.log(toParse[i].avatar_url);
      downloadImageByURL(toParse[i].avatar_url, './avatars/' + toParse[i].login + '.png');
    }
  });
}






   getRepoContributors("jquery", "jquery", function(err, result) {
     console.log("Errors:", err);
     console.log("Result:", result);
  });




function downloadImageByURL(url, filePath) {

  request.get(url)
       .on('error', function (err) {
         throw err;
       })
       .on('response', function (response) {
         console.log('Response Status Code: ', response.statusCode);
       })
       .pipe(fs.createWriteStream(filePath));
}


console.log(downloadImageByURL("https://avatars2.githubusercontent.com/u/2741?v=3&s=466", "avatars/kvirani.jpg"));