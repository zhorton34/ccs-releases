const fs = require('fs');
const filePath = process.argv[2]; 


fs.readFile(filePath, 'utf-8', (err, data) => {
  if (err) throw err;

  let jsonData = data;

  // Step 1: Replace "ccs" with "ccs-releases"
  const ccsReplacedData = JSON.parse(jsonData.replace(/\bccs\b/g, 'ccs-releases')); 


  // Step 2: Update signatures 
  function updateSignatures(obj) {
    for (const key in obj) {
      if (key === 'signature') {
        obj[key] = newSignature;
      } else if (typeof obj[key] === 'object') {
        updateSignatures(obj[key]); // Recurse into nested objects
      }
    }
  }

  // updateSignatures(ccsReplacedData); 

  fs.writeFile(filePath, JSON.stringify(ccsReplacedData, null, 2), 'utf-8', (err) => {
    if (err) throw err;
    console.log('File updated successfully!');
  });
});
