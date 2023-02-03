const express = require('express');
const bodyParser = require("body-parser");
const schemaModule = require('./schemas');
const Student = schemaModule.Student;
const Params = schemaModule.Params;
const Teacher = schemaModule.Teachers;
const jwt = require('jsonwebtoken');
var cors = require('cors');
require("dotenv").config();

const app = express()
app.use(cors())
const port = 3000


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.post('/verifyJWT', (req, res) => {
    res.send(jwt.verify(req.body.jwt, process.env.JWT_KEY))
})

app.post('/login', (req, res) => {
    Teacher.find({ username: req.body.username }, (err, found) => {
        if (err) {
            res.send(err);
        } else {
            if (found[0].password === req.body.password) {
                const token = jwt.sign({ username: req.body.username, role: found[0].role, name: found[0].name }, process.env.JWT_KEY)
                res.status(200).json({ token });
            } else {
                res.status(401).json({ msg: "Usuario o Contraseña" });
            }
        }
    })
})

app.get('/estudiante', (req, res) => {
    const addStudent = new Student({
        name: "Alejandro",
        lastName: "Ríos",
        birthday: "27-01-1997",
        parent: "Tulia",
        contact: "3188501911"
    })
    addStudent.save().then(
        () => {
            console.log("Registro guardado perfectamente")
            res.send("Registro guardado");
        },
        (err) => console.error(err)
    )
})

app.get('/students', (req, res) => {
    Student.find({}, (err, found) => {
        if (err) {
            res.send(err);
        } else {
            res.send(found);
        }
    })
})

app.get('/teachers', (req, res) => {
    Teacher.find({}, (err, found) => {
        if (err) {
            res.send(err);
        } else {
            res.send(found);
        }
    })
})

app.get('/group-ages', (req, res) => {
    Params.find({ name: 'groupAges' }, (err, found) => {
        if (err) {
            res.send(err);
        } else {
            res.send(found);
        }
    })
})

app.get('/achievements', (req, res) => {
    Params.find({ name: 'achievements' }, (err, found) => {
        if (err) {
            res.send(err);
        } else {
            res.send(found[0].value);
        }
    })
})

app.post('/add', async(req, res) => {
    const newStudent = new Student({
        name: req.body.name,
        lastName: req.body.lastName,
        birthday: req.body.birthday,
        parent: req.body.parent,
        contact: req.body.contact,
        group: req.body.group,
        opt: req.body.opt,
        membership: req.body.membership,
        gender: req.body.gender
    })
    await newStudent.save().then((response) => {
        res.send(response);
    })
})

app.post('/add-teacher', async(req, res) => {
    const newTeacher = new Teacher({
        name: req.body.name,
        lastName: req.body.lastName,
        username: req.body.username,
        password: req.body.password,
        role: req.body.role,
        email: req.body.email,
        gender: req.body.gender,
        birthday: req.body.birthday,
        contact: req.body.contact
    })
    await newTeacher.save().then((response) => {
        res.send(response);
    })
})

app.put('/edit', async(req, res) => {
    const editStudent = ({
        name: req.body.name,
        lastName: req.body.lastName,
        birthday: req.body.birthday,
        parent: req.body.parent,
        contact: req.body.contact,
        group: req.body.group,
        opt: req.body.opt,
        membership: req.body.membership,
        gender: req.body.gender
    })
    await Student.findOneAndUpdate({ _id: req.body.id }, editStudent).then((response) => {
        res.send(response);
    })
})

app.put('/edit-teacher', async(req, res) => {
    const editTeacher = ({
        name: req.body.name,
        lastName: req.body.lastName,
        username: req.body.username,
        password: req.body.password,
        role: req.body.role,
        email: req.body.email,
        gender: req.body.gender,
        birthday: req.body.birthday,
        contact: req.body.contact
    })
    await Teacher.findOneAndUpdate({ _id: req.body.id }, editTeacher).then((response) => {
        res.send(response);
    })
})

app.delete('/delete', async(req, res) => {
    await Student.findOneAndDelete({ _id: req.query.id }).then((response) => {
        res.send(response);
    })
})

app.delete('/delete-teacher', async(req, res) => {
    await Teacher.findOneAndDelete({ _id: req.query.id }).then((response) => {
        res.send(response);
    })
})

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})