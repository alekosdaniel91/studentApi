const express = require("express");
const fs = require('fs');
var app = express();

app.use(function (req, res, next) {
    var allowedOrigins = ['http://127.0.0.1:4200', 'http://localhost:4200'];
    var origin = req.headers.origin;
    console.log(origin);    
    if (allowedOrigins.indexOf(origin) > -1) {
        res.setHeader('Access-Control-Allow-Origin', origin);
    }
    res.header('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.header('Access-Control-Allow-Credentials', true);
    return next();
});

app.get('/students', (req, res)=>{
    fs.readFile('students.json', (err, data) => {  
        if (err) throw err;
        let studentData = JSON.parse(data);
        res.json(studentData);
    });
});

app.get('/students/active', (req, res)=>{
    fs.readFile('students.json', (err, data) => {  
        if (err) throw err;
        let studentData = JSON.parse(data);
        res.json(studentData.filter((obj)=>obj.active === true));
    });
    
});
app.get('/students/active/average', (req, res)=>{
    fs.readFile('students.json', (err, data) => {  
        if (err) throw err;
        let studentData = JSON.parse(data).filter((obj)=>obj.active === true);
        let sum=0
        for ( let i = 0; i < studentData.length; i++) {
            sum=sum+studentData[i].grades
          };
        res.json(sum/studentData.length);
    });
    
});

app.get('/students/average', (req, res)=>{
    fs.readFile('students.json', (err, data) => {  
        if (err) throw err;
        let studentData = JSON.parse(data);
        let sum=0
        for ( let i = 0; i < studentData.length; i++) {
            sum=sum+studentData[i].grades
          };
        res.json(sum/studentData.length);
    });
});
app.listen(3000, ()=>{
    console.log("Empezamos ");
});
