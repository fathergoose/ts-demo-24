"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var https = require("https");
function start(word) {
    console.log('Hello', word);
}
start(process.argv[2]);
var myO = { key: 'value' };
start(myO.key);
https
    .get('https://jsonplaceholder.typicode.com/users', function (res) {
    var data = [];
    var headerDate = res.headers && res.headers.date ? res.headers.date : 'no response date';
    console.log('Status Code:', res.statusCode);
    console.log('Date in Response header:', headerDate);
    res.on('data', function (chunk) {
        data.push(chunk);
    });
    res.on('end', function () {
        console.log('Response ended: ');
        var users = JSON.parse(Buffer.concat(data).toString());
        for (var _i = 0, users_1 = users; _i < users_1.length; _i++) {
            var user = users_1[_i];
            console.log("Got user with id: ".concat(user.id, ", name: ").concat(user.address.geo.lat));
        }
    });
})
    .on('error', function (err) {
    console.log('Error: ', err.message);
});
