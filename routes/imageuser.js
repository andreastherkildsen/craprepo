var mongoose   = require('mongoose');
var fs         = require('fs-extra');
var uuid       = require('node-uuid');
var multiparty = require('multiparty');

module.exports = function(routes, mongoose, imageUser) {

	//Start processing af vores billede!
  var form = new multiparty.Form();
    form.parse(req, function(err, fields, files) {
      var user_id = req.headers.id;

        //Find en bruger
        mongoose.model('users').findById(user_id, function(err, user) {
          if (err) { 
            console.log('Kan ikke finde brugeren' + err) 
          };
          //Hvis der er gamle billeder, så skal de slettes fra disken.
          if (typeof user.images !== 'undefined' && user.images.length > 0) {
           	user.images.forEach(function(image) {
              fs.unlink(imagedest + image);
            });
            //Find user og slet alle evt. billeder hvis der er nogen.
            mongoose.model('users').findByIdAndUpdate(
              user_id,
              {$set: { images: [] }}, function(err, affected) {
              console.log('affected images' + affected);
            });
          }
        });
      
        //Foreach in files do - save file
        console.log(files);
        if (files.images) {
          files.images.forEach(function(file) {
         //   var file = files.upload[0];
            var contentType = file.headers['content-type'];
            var tmpPath = file.path;
  //          var extIndex = tmpPath.lastIndexOf('.');
  //          var extension = (extIndex < 0) ? '' : tmpPath.substr(extIndex);
            // uuid is for generating unique filenames. 
  //          var fileName = uuid.v4() + extension;
            var fileName = uuid.v4() + '.jpg';
            var destPath = imagedest + fileName;//

            // Server side file type checker.
            if (contentType !== 'image/png' && contentType !== 'image/jpeg') {
                fs.unlink(tmpPath);
                return res.status(400).send('Vi understøtter ikke denne filformat.');
            }

            fs.rename(tmpPath, destPath, function(err) {
              if (err) {
                    console.log(err);
                    return res.status(400).send('Billedet er IKKE gemt:');
              } else {
                mongoose.model('users').findByIdAndUpdate(
                user_id,
                  {$push: {"images": fileName}},
                  {safe: true, upsert: true},
                function(err, model) {
                  if (err) {console.log(err)};
                }
              )
              }
            });
          })
          res.json('Billedet ER uploaded');
        } else {
          res.json('billeder ER updated - INGEN billeder er vedhæftet');
        }
    });
});

app.get('/download/image', function(req, res) {
     var img = fs.readFileSync('C:\\temp\\56de89ee-b175-4cd4-8413-5c1022733c0a.jpg');
     res.writeHead(200, {'Content-Type': 'image/gif' });
     res.end(img, 'binary');
});

}