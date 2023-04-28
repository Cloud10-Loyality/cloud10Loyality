import express,{ Express } from "express";
const app = express()

import {mintNFT, burnNFT }from'./mint-burn-nft'


app.use(express.json())
app.use(express.urlencoded({extended:false}))

app.post("/mint-nft", async (req, res) => {
    const name = req.body.name;
    const txHash = await mintNFT(name);
    res.send({ txHash });
  });

  app.post("/burn-nft", async (req, res) => {
    const name = req.body.name;
    const txHash = await burnNFT(name);
    res.send({ txHash });
  });


  app.listen(8080,() => {
    console.log('server is running')
})
