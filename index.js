const express = require('express');
const bodyParser = require("body-parser");
const schemaModule = require('./schemas');
const Student = schemaModule.Student;
const Params = schemaModule.Params;
const Teacher = schemaModule.Teachers;
const Reports = schemaModule.Reports;
const jwt = require('jsonwebtoken');
var cors = require('cors');
const { response } = require('express');
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
                const token = jwt.sign({ username: req.body.username, role: found[0].role, name: found[0].name, id: found[0]._id }, process.env.JWT_KEY)
                res.status(200).json({ token });
            } else {
                res.status(401).json({ msg: "Usuario o Contraseña" });
            }
        }
    })
})

app.get('/icons', (req, res) => {
    Params.find({ name: "icons" }, (err, found) => {
        if (err) {
            res.send(err);
        } else {
            res.send(found[0]);
        }
    })
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

app.get('/reports', (req, res) => {
    Reports.find({ visible: true }, (err, found) => {
        if (err) {
            res.send(err);
        } else {
            res.send(found);
        }
    })
})

app.get('/one-report', (req, res) => {
    Reports.find({ _id: req.query.id }, (err, found) => {
        if (err) {
            res.send(err);
        } else {
            res.send(found[0]);
        }
    })
})


app.post('/verify-existence-of-report', (req, res) => {
    Reports.find({
        date: req.body.date,
        service: req.body.service,
        teacher: req.body.teacher
    }, (err, found) => {
        if (err) {
            res.send(err);
        } else {
            res.send(found);
        }
    })
})

app.post('/add-achievement', async(req, res) => {
    const addAchievement = ({
        name: 'achievements',
        value: req.body.value
    })
    await Params.findOneAndUpdate({ name: 'achievements' }, addAchievement).then((response) => {
        res.send(response);
    })
})

app.post('/report', async(req, res) => {
    const newReport = new Reports({
        date: req.body.date,
        service: req.body.service,
        teacher: req.body.teacher,
        achievements: req.body.achievements,
        lastRecord: req.body.lastRecord,
        visible: true
    })
    await newReport.save().then((response) => {
        res.send(response);
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
        gender: req.body.gender,
        points: req.body.points,
        hedge: req.body.hedge
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

app.put('/add-achievement', async(req, res) => {
    const addAchievement = ({
        name: 'achievements',
        value: req.body.value
    })
    await Params.findOneAndUpdate({ name: 'achievements' }, addAchievement).then((response) => {
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
        gender: req.body.gender,
        points: req.body.points,
        hedge: req.body.hedge
    })
    await Student.findOneAndUpdate({ _id: req.body.id }, editStudent).then((response) => {
        res.send(response);
    })
})

app.put('/reset', async(req, res) => {
    await Student.updateMany({}, { points: 0 }).then((response) => {
        res.send(response);
    })
})

app.put('/rate-students', async(req, res) => {
    await req.body.rate.forEach(async(std) => {
        const points = ({
            points: std.points
        })
        await Student.findOneAndUpdate({ _id: std.id }, points).then();
    })
    res.status(200).json({ msg: "success" });
})

app.put('/edit-report', async(req, res) => {
    const editReport = ({
        date: req.body.date,
        service: req.body.service,
        teacher: req.body.teacher,
        achievements: req.body.achievements
    })
    await Reports.findOneAndUpdate({ _id: req.body.id }, editReport).then((response) => {
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

app.delete('/delete-report', async(req, res) => {
    await Reports.findOneAndUpdate({ _id: req.query.id }, { visible: false }).then((response) => {
        res.send(response);
    })
})

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})