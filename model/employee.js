const mongoose = require('mongoose');

const EmployeeSchema = new mongoose.Schema({
    // "_id": ObjectId,
    "first_name": String,
    "last_name": String,
    "email": String,
    "position": String,
    "salary": Number,
    "date_of_joining": {type: Date, default: Date.now},
    "department": String,
    "created_at": {type: Date, default: Date.now},
    "updated_at": {type: Date, default: Date.now}
})

const Employee = mongoose.model("Employee", EmployeeSchema);
module.exports = Employee;