const R = require('ramda');

let errors = [];

R.forEachObjIndexed((value, key) => console.log(key+':'+value))({ body: [ 'email', 'password', 'asd' ] });