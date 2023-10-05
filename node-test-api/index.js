const express = require('express'); 
const app = express();

// app.get()
// app.post()
// app.put()
// app.delete()

app.get('/', (request, response) => {
    response.send('Hello World'); 
});

app.get('/api/courses', (request, response) => {
    response.send([1,2,3]);
});

app.get('/status', function(req,res){
    const status = {
        "Status": "Running"
    }
    res.send(status); 
});

app.listen(3000, () => console.log("Listening on port 3000"));