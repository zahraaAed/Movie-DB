const express=require('express');
const app = express();
const port = 8000;
app.get('/', (req, res) => {
    res.send('ok')
  })
  app.get('/test', (req, res) => {
    res.status(200).json({ status: 200, message: "ok" });
  });
  app.get('/time', (req, res) => {
    // Get the current time in hours and minutes
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    
    const currentTime = `${hours}:${minutes}`;
    
    res.status(200).json({ status: 200, message: currentTime });
  });
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })
 