var express = require('express');
var axios = require('axios');

var app = express();


app.set('view engine', 'ejs');


function getRandomUserData(users) {
    let getrandom = function () {
        let min = Math.ceil(0);
        let max = Math.floor(users.length-1);
        let index = Math.floor(Math.random() * (max - min) + min);

        return index
    }

    let randomusers = [
        users[getrandom()], users[getrandom()], users[getrandom()]
    ];

    return randomusers
}

app.get('/', async function (req, res) {
    console.log("Request Recieved")

    let users = (await axios.get("https://jsonplaceholder.typicode.com/users")).data

    
    users = getRandomUserData(users).map(user => {
        return {
            name : user.name,
            city : user.address.city,
            company : user.company.name
        }
    })

    res.render('index', {
        users: users
    });
});

app.listen(8080);
console.log('Server is listening on port 8080');