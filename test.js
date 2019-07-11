const path = require('path');
const fs = require('fs');

const p = path.join(
  process.mainModule.filename,
  'data',
  'card.json'
);

console.log(process.mainModule.filename);