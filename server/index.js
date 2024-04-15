import express from 'express';
import pokemonRouter from './router/pokemonRouter.js'

const port = process.env.PORT || 8080;

const app = express();

app.get('/',(req,res)=>{
  res.send('hello');
});

app.get('/pokemon',(req, res)=>{
  res.send('포켓몬 정보가 있는곳입니다');
})

app.use('/pokemon', pokemonRouter);


app.listen(port,()=>{
  console.log('server is running');
});