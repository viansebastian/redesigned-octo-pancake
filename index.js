const express = require('express'); 
const app = express();
const Joi = require('joi');
   
app.use(express.json());

const courses = [
    {id: 1, name: 'course1'},
    {id: 2, name: 'course2'},
    {id: 3, name: 'course3'},
];

const port = process.env.PORT || 3000; //$env:PORT=5000 to define local env PORT variable
app.listen(port, () => console.log(`Listening on port ${port}...` ));

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
    if (!course) return res.status(404).send('Course not found');
    res.send(course); 
});

app.get('/status', function(req,res){
    const status = {
        "Status": "Running"
    }
    res.send(status); 
});

app.post('/api/courses', (req, res) => {
    const { error } = validateCourse(req.body); // result.error
    if(error) return res.status(400).send(error.details[0].message);
    // if ... return = so that if error occurs, other blocks of code will not be executed

    const course = {
        id: courses.length + 1, 
        name: req.body.name, //body is input from user in web??
    };
    courses.push(course);
    res.send(course);
});

app.put('/api/courses/:id', (req, res) => {
    //look up the course 
    //if not exist, return 404
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) return res.status(404).send('Course not found');

    //validate, if invalid return 404
    const { error } = validateCourse(req.body); // result.error
    if(error) return res.status(400).send(error.details[0].message);

    //update course, return updated course
    course.name = req.body.name;
    res.send(course);
});

app.delete('/api/courses/:id', (req, res) =>{
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) return res.status(404).send('Course not found');

    const index = courses.indexOf(course);
    courses.splice(index, 1); // 1 means remove 1 object

    res.send(course);

});


function validateCourse(course){
    const schema = {
        name: Joi.string().min(3).required(),
    }
    return Joi.validate(course, schema); 
}