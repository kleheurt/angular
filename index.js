// const pres = require("./presentation")
import Presentation from './presentation.js';
import Service from './service.js';

console.log('** Administration Collègues **');
const presentation = new Presentation(new Service);
presentation.utiliser();

