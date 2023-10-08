const express = require('express'); 
const app = express();
const Joi = require('joi')
   
app.use(express.json());

// app.get()
// app.post()
// app.put()
// app.delete()
const courses = [
    {id: 1, name: 'course1'},
    {id: 2, name: 'course2'},
    {id: 3, name: 'course3'},
];

app.get('/', (req, res) => {
    res.send('Hello World!, from stever!'); 
});

app.get('/api/courses', (req, res) => {
    res.send(courses);
});

app.get('/api/courses/:id', (req, res) => {
    //res.send(req.params.id)
    
    // let course2 = courses.find(function (c) {
    //    return c.id === parseInt(req.params.id);
    // })

    const course = courses.find(c => c.id === parseInt(req.params.id));

    if (!course) res.status(404).send('Course not found')
    else res.send(course); 
});

app.get('/status', function(req,res){
    const status = {
        "Status": "Running"
    }
    res.send(status); 
});

app.post('/api/courses', (req, res) => {
    
    const schema = {
        name: Joi.string().min(3).required(),
    }
    const result = Joi.validate(req.body, schema); 

    if(result.error){
        res.status(400).send(result.error.details[0].message);
        return; 
    }

    const course = {
        id: courses.length + 1, 
        name: req.body.name, //body is input from user in web??
    };
    courses.push(course);
    res.send(course);
});

const port = process.env.PORT || 3000; //$env:PORT=5000 to define local env PORT variable
app.listen(port, () => console.log(`Listening on port ${port}...` ));