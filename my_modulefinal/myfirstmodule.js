exports.myDateTime = function () {
    return Date();
};


/* 
For at gøre brug at dette modul kan jeg require det i en anden .js fil ved at skrive

var dt = require('./myfirstmodule');

For at gøre det helt basic og køre det så simpelt som overhvoede muligt kan man benytte sig af :

res.write("The date and time are currently: " + dt.myDateTime());

*/ 