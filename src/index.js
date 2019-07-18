const express = require('express');
const config = require('./server/config')



const app = config(express());
// base de datos

require('./database/database')

// inciciando el servidor
app.listen(app.get('port'),()=>{
    console.log('server on port ',app.get('port'));    
});


