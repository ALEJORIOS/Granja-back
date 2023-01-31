const express = require('express');
const Student = require('./schemas');
var cors = require('cors')

const app = express()
app.use(cors())
const port = 3000

app.get('/', (req, res) => {
    res.send('Hello World!')
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
            console.log("Registro guardado perfecrtamente")
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

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})