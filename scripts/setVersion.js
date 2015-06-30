var json = require('../package.json')
var fs = require('fs');
var path = require('path');
var version = json.version.split('.');
version.pop();
json.version = version.concat([process.env.CIRCLE_BUILD_NUM]).join('.')
fs.writeFileSync(path.join(__dirname, '../package.json'), JSON.stringify(json, null, 2));
