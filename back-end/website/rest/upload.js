var formidable = require('formidable');
var fs = require('fs');

module.exports = function(app) {

app.post('/uploadFieldData', function(req, res) {
    var form = new formidable.IncomingForm();
    form.uploadDir = "temp/uploads";
    form.keepExtensions = true;

    form
        .on('error', function(err) {
            throw err;
        })

        .on('field', function(field, value) {
            //receive form fields here
        })

        /* this is where the renaming happens */
        .on ('fileBegin', function(name, file){
                //rename the incoming file to the file's name
                //console.log(file);
                file.path = form.uploadDir + "/" + file.name;
        })

        .on('file', function(field, file) {
            //On file received
            //console.log(file);
        })

        .on('progress', function(bytesReceived, bytesExpected) {
            //self.emit('progess', bytesReceived, bytesExpected)

            var percent = (bytesReceived / bytesExpected * 100) | 0;
            process.stdout.write('Uploading: %' + percent + '\r');
        })

        .on('end', function() {
          console.log("process end");
          res.sendStatus(500);

        });

    form.parse(req);
  });
};
