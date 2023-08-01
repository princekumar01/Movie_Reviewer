require('dotenv').config()
const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');
const server = express();
const movieRouter = require('./routes/movie');
const watchRouter = require('./routes/watchList');
const path = require('path');
const jwt = require('jsonwebtoken');
const authRouter = require('./routes/auth')
const fs = require('fs');
const publicKey = fs.readFileSync(path.resolve(__dirname,'./public.key'),'utf-8')
//console.log('env',process.env.MONGO_PASSWORD,publicKey)



 
//db connection
main().catch(err => console.log(err));

async function main() {
  await mongoose.connect(process.env.MONGO_URL);
  console.log('database connected')
}
//Schema








//bodyParser
const auth = (req,res,next)=>{ 
  //console.log(req.body);
  try{
    //const token = req.get('Authorization').split('Bearer ')[1];
    const token = req.get('authorization');
    console.log(token);
    var decoded = jwt.verify(token,publicKey );
    console.log(decoded)
    if(decoded.email){
      //res.status(201).json(decoded);
      next()
    }else{
      res.sendStatus(401)
    }
  }catch(err){
    res.sendStatus(401)
  }
  //console.log(decoded)
};

server.use(cors());
server.use(express.json());
server.use(express.urlencoded());
server.use(morgan('default'));
server.use('/api/v1/',movieRouter.router);
server.use('/auth',authRouter.router);
server.use('/watchlist',auth,watchRouter.router);
//server.use('/users',auth,userRouter.router);

server.listen(process.env.PORT, () => {
  console.log('server started');
});