const express = require('express'); 
const app = express();
   
// app.get()
// app.post()
// app.put()
// app.delete()

app.get('/', (req, res) => {
    res.send('Hello World!, from stever!'); 
});

app.get('/api/courses', (req, res) => {
    res.send([1,2,3]);
});

app.get('/api/courses/:id', (req, res) => {
    res.send(req.params.id)
})

app.get('/status', function(req,res){
    const status = {
        "Status": "Running"
    }
    res.send(status); 
});

const port = process.env.PORT || 3000; //$env:PORT=5000 to define local env PORT variable
app.listen(port, () => console.log(`Listening on port ${port}...` ));