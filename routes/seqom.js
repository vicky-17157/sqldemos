const mysql = require('mysql2');
const express = require('express');
//const { Schema } = require('mongoose');
var router= express.Router();
//Configuring express server

router.use(express.json());

var mysqlConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Vicky@27',
    database: 'customer1',
    multipleStatements: true
    });

mysqlConnection.connect((err)=> {
        if(!err)
        console.log('Connection Established Successfully');
        else
        console.log('Connection Failed!'+ JSON.stringify(err,undefined,2));
        });

router.get('/studens' , (req, res) => {
    mysqlConnection.query('select * from studens ;', (err, rows, fields) => {
        if (!err)
        res.send(rows);
        //return res.console.log(rows);
        else
        console.log(err);
    })
} );

router.get('/corses' , (req, res) => {
    mysqlConnection.query('select * from corses ;', (err, rows, fields) => {
        if (!err)
        res.send(rows);
        //return res.console.log(rows);
        else
        console.log(err);
    })
} );

router.get('/exams' , (req, res) => {
    mysqlConnection.query('select * from exams ;', (err, rows, fields) => {
        if (!err)
        res.send(rows);
        //return res.console.log(rows);
        else
        console.log(err);
    })
} );  

router.get('/join' , (req, res) => {
    mysqlConnection.query('select studens.stname, exams.examname, corses.coursename from studens join corses on studens.courseid = corses.courseid join exams on corses.examid = exams.courseid;', (err, rows, fields) => {
    if (!err)
    res.send(rows);
    //return res.console.log(rows);    
    else
    console.log(err);
    })
    } );

router.get('/s1' , (req, res) => {
    mysqlConnection.query('select studens.stname,studens.city, corses.coursename,corses.fee from studens join corses on studens.courseid=corses.courseid;', (err, rows, fields) => {
    if (!err)
    res.send(rows);
    //return res.console.log(rows);    
    else
    console.log(err);
    })
    } );
    
router.get('/s2' , (req, res) => {
    mysqlConnection.query('select studens.stname,studens.city, exams.examname,exams.examtime from studens join exams on studens.examid=exams.examid;', (err, rows, fields) => {
        if (!err)
        res.send(rows);
        //return res.console.log(rows);    
        else
        console.log(err);
        })
        } );    

    //Router to GET specific item detail from the MySQL database
router.get('/studens/:stid' , (req, res) => {
    mysqlConnection.query('SELECT * from studens WHERE stid = ?',[req.params.stid], (err, rows, fields) => {
    if (!err)
    res.send(rows);
    else
    console.log(err);
    })
    } );

router.get('/:insert' , (req, res) => {
    mysqlConnection.connect(function(err){
        if(err)throw err;
        var sqlInsert = "INSERT into studens(stname,city,courseid,examid) values('${mahanth}','${hyderabad}',${1},${3})"
        mysqlConnection.query(sqlInsert, (err, result) => {
            res.send("1 entry added");
            })
    })
});
    
    

router.get('/delete/:stid' , (req, res) => {
    var stud = req.params.stid;
    var sqlDelete = "DELETE FROM studens WHERE stid = ? " 
        mysqlConnection.query(sqlDelete, stud, (err, result) => {
            if (err) console.log(err);
        })
    });

router.post("/update", (req, res) => {
    mysqlConnection.query("insert into studens(stname,city) values('adi','kannur');",
    (err, rows, fields) => {
        if (!err)
        res.send(rows);
        //return res.console.log(rows);
        else
        console.log(err);
          }
        );
      })



module.exports=router;