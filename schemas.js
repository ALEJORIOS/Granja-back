const mongoose = require("mongoose");
mongoose.set('strictQuery', false);
require("dotenv").config();

mongoose.connect(
    process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
)

const studentSchema = mongoose.Schema({
    name: String,
    lastName: String,
    birthday: String,
    parent: String,
    contact: String,
    group: String,
    opt: String,
    membership: Boolean,
    gender: String,
    points: Number,
    hedge: String
})

const teacherSchema = mongoose.Schema({
    name: String,
    lastName: String,
    username: String,
    password: String,
    role: String,
    email: String,
    gender: String,
    contact: String,
    birthday: String
})

const paramsSchema = mongoose.Schema({
    name: String,
    value: {}
})

const reportSchema = mongoose.Schema({
    date: String,
    service: String,
    teacher: String,
    achievements: {}

})

const Student = mongoose.model('Estudiante', studentSchema);
const Teachers = mongoose.model('Profesores', teacherSchema);
const Params = mongoose.model('Params', paramsSchema);
const Reports = mongoose.model('Reports', reportSchema);

module.exports = {
    Student,
    Teachers,
    Params,
    Reports
}