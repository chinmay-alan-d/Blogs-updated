require('dotenv').config()
const express = require("express");
const app = express();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
app.use(express.json());
const cors = require('cors');

app.use(
    cors({
        origin : "*"
    })
)

var mysql = require('mysql');


const db = mysql.createPool({
	connectionLimit: 10,
	host: process.env.MYSQL_HOST || 'localhost',
	user: process.env.MYSQL_USER || 'root',
	password: process.env.MYSQL_PASSWORD || 'ch@i#782',
	database: process.env.MYSQL_DATABASE || 'blogs'
});


app.get("/",(req,res)=>{
    db.query('show tables;',(err,result)=>{
        if(err) throw err;
        console.log(result);
    });
})


app.post("/signup",async(req,res)=>{
    const salt = await bcrypt.genSalt();
    var username = req.body.username;
    var hashedPwd = await bcrypt.hash(req.body.password,salt);
    let query = "insert into users(username,password) VALUES ?";
    var VALUES = [
        [username,hashedPwd]
    ];
    db.query(query,[VALUES],(err,response)=>{
        if(err) throw err;
        console.log(response);
    });
    res.sendStatus(200);
});

app.post('/login', async (req, res) => {
    try {
        const username = req.body.username;
        const pwd = req.body.password;
        const query = "SELECT * FROM users WHERE username=?";
        const values = [username];

        db.query(query, [values], async (err, result) => {
            if (err) {
                console.error(err);
                return res.status(500).send({
                    message : "Internal Server Error"
                }); 
            }

            if (result && result.length > 0) {
                const passwordMatch = await bcrypt.compare(pwd, result[0].password);
                if (passwordMatch) {
                    console.log('matching password');
                    let token = jwt.sign({username : username},process.env.ACCESS_TOKEN_KEY);
                    return res.status(200).send({ "name":username,"token" : token });
                } else {
                    console.log('No match');
                    return res.status(401).send({
                        message: "Passwords does not match"
                    });
                }
            } else {
                console.log('User not found');
                return res.status(401).send({
                        message: "User Not Found",
                    });
            }
        });
    } catch (error) {
        console.log(error);
        return res.status(500); 
    }
});

app.get('/authenticate', (req,res)=>{
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(" ")[1];
    if(token===null) return res.status(401).send({
        message : "No token"
    });
    jwt.verify(token,process.env.ACCESS_TOKEN_KEY,(err,user)=>{
        if(err) {
            return res.status(401).send({
                message : "User Not Authorized"
            })
        }else{
            return res.status(200).send({
                message : "Authorized"
            })
        }
    });
});

app.post("/getartists",(req,res)=>{
    let artistname = req.body.name;
    let query = `SELECT username,userId FROM users WHERE username LIKE "${artistname}%";`
    console.log(query);
    db.query(query,(err,response)=>{
        if(err) console.log(err);
        let listOfArtist = [];
        for(let i=0;i<response.length;++i) {
            listOfArtist.push({username : response[i]['username'],id : response[i]['userId']});
        }
        console.log(listOfArtist);
        return res.send(listOfArtist);
    });
});

app.post("/getBlogs",(req,res)=>{
    let id = req.body.id;
    let query = `SELECT blogNum,blog FROM blogs WHERE userId = "${id}";`;
    console.log(query);
    db.query(query,(err,response)=>{
        if(err) throw err;
        let blogsArray = [];
        for(let i =0;i<response.length;++i) {
            blogsArray.push(response[i]['blog']);
        }
        console.log(blogsArray);
        res.status(200).json(blogsArray);
    });
});

app.post('/create',(req,res)=>{
    let username = req.body.username;
    let token = req.body.token;
    let content = req.body.content;
    jwt.verify(token,process.env.ACCESS_TOKEN_KEY,(err,user)=>{
        if(err) {
            return res.status(401).send({
                message : "User Not Authorized"
            });
        }else{
            let query = `SELECT userId FROM users WHERE username="${username}";`;
            db.query(query,(error,response)=>{
                if(error) res.status(500).send(
                    {
                        message : "Internal Server Error",
                    }
                )
                let userId = response[0]['userId'];
                query = `INSERT INTO blogs(userId,blog) VALUES (${userId},"${content}");`;
                db.query(query,(queryError,queryResponse)=>{
                    if(queryError) res.status(500).send({
                        message : "Internal Server Error",
                    });
                    console.log(queryResponse);
                    res.status(200).send({
                        message : "Addes to Database",
                    });
                });
            });
        }
    });
})

app.listen(4000,()=>{
    console.log("Server Running On Port 4000");
})