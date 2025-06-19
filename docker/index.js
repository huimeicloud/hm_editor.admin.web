var express = require('express');
var app = express();


app.use('/hmEditor/admin-client',express.static( __dirname + '/hm_editor.admin.web'));

app.get('*', function(req, res) {
  res.sendFile( __dirname + '/hm_editor.admin.web/index.html' );
});

app.get('/hmEditor/admin-client/admin', function (req, res) {
  var status = {
    "status":"UP"
  };
  res.send(status);
});


app.listen(23071,'0.0.0.0',function(){
  console.log('hmEditor.admin.web ready...')
});
