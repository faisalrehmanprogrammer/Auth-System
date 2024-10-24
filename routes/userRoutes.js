const express = require('express');
const router = express.Router();
const db = require('../db.js');

router.post('/create', async (req, res) => {
    let con;
    try {
        con = db.connection
        console.log("connection is successful")
        const { name, description } = req.body;
        console.log('req body', req.body)
        if (!name || !description) {
            return res.status(400).json({ message: 'the name and description is required' })
        }
        const query = 'INSERT INTO student_table (name, description) VALUES (?, ?)';
        const result = await con.query(query, [name, description]);
        console.log('sql', result)
        console.log(result.insertId)

        res.status(201).json({ data: 'task created successfuly ', taskId: result.insertId })

    } catch (error) {
        console.log('failed to create task', error)
        res.status(500).json({ error: 'failed to create task' })

    } finally {
        if (con) con.release;
    }

})



router.get('/fetch', (req, res) => {
    let con;
    try {
        con = db.connection
        console.log("connection is successful")
        const qry = 'SELECT * FROM student_table';
        con.query(qry, (err, rows) => {
            if (err) {
                console.log('error executing', err)
                return res.status(500).json({ err: "failed to get task" })
            }
            res.status(201).json({ data: rows })
        })


    } catch (error) {
        console.log('failed to get task', error)
        res.status(500).json({ error: 'failed to get task' })

    } finally {
        con.release
    }

})


router.get('/fetch/:id', (req, res) => {
    let con;
    try {
        const id= req.params.id;
        con = db.connection
        console.log("connection is successful")
        const qry = `SELECT * FROM student_table WHERE id=${id}`;
        con.query(qry, (err, rows) => {
            if (err) {
                console.log('error executing', err)
                return res.status(500).json({ err: "failed to get by id task" })
            }
            res.status(201).json({ data: rows })
        })


    } catch (error) {
        console.log('failed to get by id task', error)
        res.status(500).json({ error: 'failed to get by id task' })

    } finally {
        con.release
    }

})

router.put('/update/:id', (req, res) => {
    let con;
    try {
        
        con = db.connection
        console.log("connection is successful")
        const id= parseInt(req.params.id);
        const {name,description}=req.body;
        const qry = `UPDATE  student_table SET name=?,description=?  WHERE id=?`;
        con.query(qry,[name,description, new Date() ,id], (err, qry) => {
            if (err) {
                console.log('error executing update', err)
                return res.status(500).json({ err: "failed to update task by id" })
            }
            console.log('name:',name, "description:",description,"id:",id)
            res.status(201).json({ data:qry })
        })


    } catch (error) {
        console.log('failed to update by id task', error)
        res.status(500).json({ error: 'failed to update task by id' })

    } finally {
        con.release
    }

})


router.delete('/delete/:id', (req, res) => {
    let con;
    try {
        const id= req.params.id;
        con = db.connection
        console.log("connection is successful")
        const qry = `DELETE FROM student_table WHERE id=${id}`;
        con.query(qry, (err, qry) => {
            if (err) {
                console.log('error executing', err)
                return res.status(500).json({ err: "failed to delete task by id " })
            }
            res.status(201).json({ data: qry})
        })


    } catch (error) {
        console.log('failed to get by id task', error)
        res.status(500).json({ error: 'failed to delete task by id' })

    } finally {
        con.release
    }

})





module.exports = router;