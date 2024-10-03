const express = require('express');
const router = express.Router();
const Employee = require('../model/employee.js');

// route: GET /api/v1/emp/employees
// get all employees
router.get('/employees', async (req, res) => {
    try {
        const employees = await Employee.find({});
        // on success
        res.status(201).send(employees);

    } catch (err) {

        res.status(500).send({ 
            message: "Employee retrieval failed", 
            status: 'Status 500: internal server error', 
            error: err 
        });
    }
});


// route: POST /api/v1/emp/employees
// create employee
router.post('/employees', async (req, res) => {
    try {
        const newEmployee = new Employee(req.body);
        await newEmployee.save(); // persist to db

        // on success
        res.status(201).json({
            message: "Employee created successfully", 
            first_name: newEmployee.first_name,
            last_name: newEmployee.last_name,
            id: newEmployee._id
        });
        
    } catch (err) {
        res.status(500).send({ 
            message: "Employee creation failed", 
            status: 'Status 500: internal server error', 
            error: err 
        });
    }
});


// route: GET /api/v1/emp/employees/{empID}
// get specific employee by id
router.get('/employees/:empID', async (req, res) => {
    try {
        const empID = req.params.empID;
        const employee = await Employee.findOne({_id: empID});
        if(employee)
            res.status(200).send(employee);
        else
            res.status(404).send({status: false, message: `Employee with id '${empID} cannot be found'`});

    } catch (err) {

        res.status(500).send({ 
            message: "Employee retrieval failed", 
            status: 'Status 500: internal server error', 
            error: err 
        });
    }
});


// route: PUT /api/v1/emp/employees/eid
// delete employee by id
router.put('/employees/:eid', async (req, res) => {
    try {

        const employee = await Employee.findOneAndUpdate(
            {_id: req.params.eid}, // identifier 
            // $set determines which fields to update
            { $set:
                {
                    ...req.body,
                    updated_at: Date.now() // update this field every time
                }
            },
            // return object post-change instead of pre- (by default)
            {new: true}

        );
        const id = employee._id;

        if(employee)
            res.status(200).send({status: true, message: `Employee '${id}' updated successfully `});
        else
            res.status(404).send({status: false, message: `Employee with id '${id}' cannot be found'`});

    } catch (err) {

        res.status(500).send({ 
            message: "Employee update failed", 
            status: 'Status 500: internal server error', 
            error: err 
        });
    }
});


// route: DELETE /api/v1/emp/employees?eid=xxx
// delete employee by id
router.delete('/employees', async (req, res) => {
    try {
        const employee = await Employee.findOneAndDelete({_id: req.query.eid});
        const id = employee._id;
        if(employee)
            res.status(204).send({status: true, message: `Employee '${id}' deleted successfully `});
        else
            res.status(404).send({status: false, message: `Employee with id '${id}' cannot be found'`});

    } catch (err) {

        res.status(500).send({ 
            message: "Employee delete failed", 
            status: 'Status 500: internal server error', 
            error: err 
        });
    }
});

module.exports = router;
