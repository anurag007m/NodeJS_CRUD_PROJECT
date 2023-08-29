const express = require('express')

const app = express()

const mysql = require('mysql')

const  cors = require ('cors')

app.use(cors());

app.use(express.json());

const db =mysql.createConnection({
    user:'root',
    host:'localhost',
    password:'anurag',
    database:'cliniclist'
});

app.post('/create',(req,res)=>{
    const clinicname=req.body.clinicname;

    const contactnumber=req.body.contactnumber;

    const aboutclinic=req.body.aboutclinic;

    const clinicaddress=req.body.clinicaddress;

    const clinichour=req.body.clinichour;

    db.query("INSERT INTO clinics (clinicname,contactnumber,aboutclinic,clinicaddress,clinichour) VALUES (?,?,?,?,?)",

    [clinicname,contactnumber,aboutclinic,clinicaddress,clinichour],

     (err,result)=>{

        if(err){
            console.log(err)
        }
        
        else{
            res.send("Values Inserted");
        }
    }
    );

});


app.get('/clinics',(req,res)=>{
    db.query("SELECT * FROM clinics",(err,result)=>{
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
    });
});

app.put('/update',(req,res)=> {

const id= req.body.id;

const clinichour=req.body.clinichour;

db.query("UPDATE clinics SET  clinichour=? WHERE id =?",[clinichour,id],
(err,result)=>{
    if(err){
        console.log(err);
    }else{
        res.send(result);
    }
}
);

});

app.delete('/delete/:id',(req,res)=>{
    const id=req.params.id

    db.query("DELETE FROM clinics WHERE id = ?",id,(err,result)=>{
        if (err){
            console.log(err);
        }else{
            res.send(result);
        }
    })
})


app.listen(3001,()=>{
    console.log("Server running on port 3001");
})



