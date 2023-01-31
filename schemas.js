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
    contact: String
})

const Student = mongoose.model('Estudiante', studentSchema);
module.exports = Student;