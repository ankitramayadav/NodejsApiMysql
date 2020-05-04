const mysql=require('mysql');
const express=require('express');
var app=express();
const bodyparser = require('body-parser');

app.use(bodyparser.json());

var mysqlConnection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'laravel',
    multipleStatements:true
});
mysqlConnection.connect((err)=>{
    if(!err){
        console.log("connected");
    }
    else{
        console.log("failed"+JSON.stringify(err,undefined,2));
    }
});

app.listen(3000,()=>console.log('Server running at port 3000'));
//get Students
app.get('/api/students',(req,res)=>{
    mysqlConnection.query('select * from NodeStudent',(err,rows,fields)=>{
        if(!err)
        {
            //console.log(fields);
            res.send(rows);
        }
        else{
            console.log(err);
        }
    })
});

//search
app.get('/api/students/:dte_id',(req,res)=>{
    mysqlConnection.query('select * from NodeStudent where dte_id = ?',[req.params.dte_id],(err,rows,fields)=>{
        if(!err)
        {
            //console.log(fields);
            res.send(rows);
        }
        else{
            console.log(err);
        }
    })
});

//delete
app.delete('/api/students/:dte_id',(req,res)=>{
    mysqlConnection.query('delete from NodeStudent where dte_id = ?',[req.params.dte_id],(err,rows,fields)=>{
        if(!err)
        {
            //console.log(fields);
            console.log('deleted successfully');
            //res.send(rows);
        }
        else{
            console.log(err);
        }
    })
});
//updateandinsert
app.post('/api/students/:dte_id',(req,res)=>{
    var s = req.body;
    mysqlConnection.query('UPDATE NodeStudent SET name = ?, course = ?, fees = ?, city = ? WHERE dte_id = ?',[s.name, s.course, s.fees, s.city ,s.dte_id],(err,rows,fields)=>{
        if(!err)
        {
            //console.log(fields);
            console.log('Modified successfully');
            //res.send(rows);
        }
        else{
            console.log(err);
        }
    })
});

app.post('/api/students',(req,res)=>{
    var s = req.body;
    mysqlConnection.query('insert into NodeStudent values(?,?,?,?,?)',[s.dte_id,s.name, s.course, s.fees,s.city],(err,rows,fields)=>{
        if(!err)
        {
            //console.log(fields);
            console.log('Inserted successfully');
            //res.send(rows);
        }
        else{
            console.log(err);
        }
    })
});

