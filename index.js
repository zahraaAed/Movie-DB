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
  app.get('/hello/:id?', (req, res) => {
    const { id } = req.params;
    if (id) {
      res.status(200).json({ status: 200, message: `Hello, ${id}` });
    } else {
      res.status(200).json({ status: 200, message: 'Hello!' });
    }
  });
  
  // Route to respond with a search query or an error message
  app.get('/search', (req, res) => {
    const { s } = req.query;
    if (s) {
      res.status(200).json({ status: 200, message: 'ok', data: s });
    } else {
      res.status(500).json({ status: 500, error: true, message: 'you have to provide a search' });
    }
  });
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })
 