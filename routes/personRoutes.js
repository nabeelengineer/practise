const express = require('express');
const router = express.Router();
const Person = require('./../models/person');

router.post('/', async (req, res) => {
    try{
        const data = req.body

        const newPerson = new Person(data);
        const response = await newPerson.save();
        console.log('data saved');
        res.status(200).json(response);
    } catch(err) {
        console.log(err);
        res.status(500).json('Internal Server Error');
    }
    // res.send("All data is here")
});

router.get('/', async (req, res) => {
    try{
        const data = await Person.find();
        console.log('data fetched');
        res.status(200).json(data);
    } catch {
        console.log(err);
        res.status(500).json('Internal Server Error')
    }
});

router.get('/search', async (req, res) => {
    try {
        const filterQuery = {};
        let hasValidQuery = false;
        for (let key in req.query) {
            const value = req.query[key];
            if (value) {
                hasValidQuery = true;
                if (key === 'name' || key === 'address') {
                    filterQuery[key] = { $regex: value, $options: 'i' };
                } else {
                    filterQuery[key] = value;
                }
            }
        }

        if (!hasValidQuery) {
            return res.status(404).json('Fill at least one field')
        }

        const filteredUsers = await Person.find(filterQuery);
        console.log(filteredUsers)

        if (filteredUsers.length === 0) {
            return res.status(406).json('No matching records found');
        }

        res.status(200).json(filteredUsers);
    } catch (err) {
        console.log(err);
        res.status(500).json('Internal Server Error');
    }
});


router.get('/:workType' , async(req, res) => {
    try {
        const workType = req.params.workType;
        if(workType == 'manager' || workType == 'employee' || workType == 'staff'){
            const response = await Person.find({work: workType});
            console.log('response fetched');
            res.status(200).json(response);
        } else {
            res.status(404).json('Invalid work type');
        }
    } catch(err) {
        console.log(err);
        res.status(500).json('Internal server error');
    }

});

router.put('/:id', async (req, res) => {
    try{
        const personId = req.params.id;
        const updatePersonData = req.body;

        const response = await Person.findByIdAndUpdate(personId, updatePersonData, {
            new : true,
            runValidators : true,
        });

        if (!response) {
            return res.status(404).json('Person not found');
        }

        console.log('data updated');
        res.status(200).json(response);
    } catch(err) {
        console.log(err);
        res.status(500).json('Invalid Server Error');
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const personId = req.params.id;

        const response = await Person.findByIdAndDelete(personId);
        if(!response) {
            return res.status(404).json('Peson not found');
        }
        console.log('data deleted');
        res.status(200).json('person data deleted');
    }catch(err) {
        console.log(err);
        res.status(500).json('Internal server Error');
    }
});

module.exports = router;