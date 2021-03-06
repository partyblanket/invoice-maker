var JSZip = require('jszip');
var Docxtemplater = require('docxtemplater');

var fs = require('fs');
var path = require('path');



async function createDocx (invoiceDets, userDets, templateid) {
  const {filename} = userDets.templateArray.find(el => el._id == templateid)
  console.log(filename);
  
  const content = fs.readFileSync(path.resolve(__dirname, 'docxtemplates',filename), 'binary');
  //if no content -> check S3
  const zip = new JSZip(content);

  const doc = new Docxtemplater();[]
  doc.loadZip(zip);
  console.log('setData ',{...invoiceDets, ...userDets});

  doc.setData({...invoiceDets, ...userDets});

  try {
      doc.render()
  }
  catch (error) {
      var e = {
          message: error.message,
          name: error.name,
          stack: error.stack,
          properties: error.properties,
      }
      console.log(JSON.stringify({error: e}));
      throw error;
  }

  var buf = doc.getZip()
              .generate({type: 'nodebuffer'});

  // buf is a nodejs buffer, you can either write it to a file or do anything else with it.
  fs.writeFileSync(path.resolve(__dirname,'invoices', 'invoice-instance.docx'), buf);
  return 'invoice-instance.docx'
}

module.exports = createDocx