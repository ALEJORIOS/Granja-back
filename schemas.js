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
    gender: String
})

const paramsSchema = mongoose.Schema({
    name: String,
    value: {}
})

const Student = mongoose.model('Estudiante', studentSchema);
const Params = mongoose.model('Params', paramsSchema);

module.exports = {
    Student,
    Params
}