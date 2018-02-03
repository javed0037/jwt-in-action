var express = require('express');
var jwt = require('jsonwebtoken');
var app = express();
app.get('/fapi',(req,res) => {
  res.json({
    text:'this is get api'
  });  
});
app.post('/fapi/Loginuser',(req,res)=>{
  const user = { id:3 };
  const token = jwt.sign({ user },'my_secret_key');
  res.json({
    token:token
  });
});

app.get('/fapi/Getprotected',ensureToken,(req,res)=>{
  jwt.verify(req.token,'my_secret_key',function(err,data){
    if(err){
      res.sendStatus(403);
    }
    else{
  res.json({
    text:'this is protected',
    data:data
  });
}
})
});
function ensureToken (req,res,next){
  const berearHeader = req.headers["authorization"];

  if(typeof berearHeader !==  'undefined')
  {
    const bearer = berearHeader.split(" ");
    const bearerToken = bearer[1];
    req.token = bearerToken;
    next();
  }
  else{
    res.sendStatus(403);
  }
}

app.listen(3000,()=>{
  console.log("Api listing on the port 3000")
});
