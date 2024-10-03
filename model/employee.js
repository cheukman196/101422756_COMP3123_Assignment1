const mongoose = require('mongoose');

const EmployeeSchema = new mongoose.Schema({
    "first_name": {type: String, required: true },
    "last_name": {type: String, required: true },
    "email": {type: String, required: true },
    "position": String,
    "salary": Number,
    "date_of_joining": {type: Date, default: Date.now},
    "department": String,
    "created_at": {type: Date, default: Date.now},
    "updated_at": {type: Date, default: Date.now}
})

const Employee = mongoose.model("Employee", EmployeeSchema);
module.exports = Employee;

