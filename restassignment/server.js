const express = require('express');
const app = express();
app.use(express.json());

const students = [
    { id:1, name:"abc", age:20, course:"CS",marks:15},
    { id:2, name:"def", age:21, course:"EC",marks:8},
    { id:3, name:"ghi", age:22, course:"EEE",marks:12},
    {id:4, name:"jkl", age:20, course:"ME",marks:10}
]

app.get('/api/students',(req,res) => {
    res.send(students);
});

// app.get('/api/students/:id', (req,res) => {
//     const student = students.find(c => c.id === parseInt(req.params.id));
//     if(!student) res.status(404).send('ERROR!');

//     res.send(student);
// });

app.get('/api/students/sort', (req,res) => {
   // const student = students.filter(c => c.age === parseInt(req.params.age));
    const student = students.sort((a,b)=> a.age - b.age);
    if(!student) res.status(404).send('ERROR!');

    res.send(student);
});

app.get('/api/students/avg', (req,res) => {
   // const student = students.filter(c => c.age === parseInt(req.params.age));
    //const student = students.sort((a,b)=> a.age - b.age);
    
     const counts=students.length;
     if(!counts) res.status(404).send('ERROR!');
     res.send(counts);
});

app.post('/api/students', (req,res) => {
    const student = {
        id:students.length + 1,
        name:req.body.name,
        age:req.body.age,
        course:req.body.course
    };

    students.push(student);
    res.send(students);
});

app.put('/api/students/:id', (req,res) => {
    const student = students.find(c => c.id === parseInt(req.params.id));
     if(!student) res.status(404).send('ERROR!');

     student.name=req.body.name;
     student.age=req.body.age;
     student.course=req.body.course;
     res.send(student);

});

app.delete('/api/students/:id', (req,res) => {
    const student = students.find(c => c.id === parseInt(req.params.id));
     if(!student) res.status(404).send('ERROR!');

     const index = students.indexOf(student);
     students.splice(index,1);
     res.send(student);
})



const port = process.env.PORT || 8080;
app.listen(port,() => console.log(`Listening on port ${port} ..`));
