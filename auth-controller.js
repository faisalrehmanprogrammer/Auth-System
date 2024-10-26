
const { con } = require("../config/db");


const CreateUser = (req, res) => {
    console.log("Route hit");
    const { name, email, password } = req.body;
    const user = [name, email, password];

    const sql = "INSERT INTO auth(name, email, password) VALUES (?)"

    con.query(sql, [user], (err, data) => {
        if (err) throw err;
        return res.json({ msg: 'user created', data })
    })

}

const UpdateUser = (req, res) => {
    console.log("Route hit");
    const { email, password } = req.body;
    const sql = "UPDATE auth SET password=? WHERE email= ?"
    con.query(sql, [password,email], (err, data) => {
        if (err) {
            console.log(err);
        }
        if (data.affectedRows === 0) {
            return res.json({ msg: 'Email not found', data })
        }
        return res.json({ msg: 'Password updated successfully', data });

    })
}


const FetchUser = (req, res) => {
    const { email } = req.body;
    const sql = "SELECT * FROM auth WHERE email= ?"
    con.query(sql, [email], (err, data) => {
        if (err) {
            console.log(err);
        }
        if (data.length===0) {
            return res.json({ msg: 'Email not found', data })
        }
        return res.json({ msg: 'user get successfully', data });

    })

}



const DeleteUser = (req, res) => {
    const { email} = req.body;
    const sql = "DELETE FROM auth WHERE email= ?"
    con.query(sql, [email], (err, data) => {
        if (err) {
            console.log(err);
        }
        if (data.affectedRows === 0) {
         res.send({ msg: 'Email not found', data })
        }
        return res.json({ msg: 'user delete successfully', data });

    })

}

module.exports = {
    CreateUser,
    UpdateUser,
    FetchUser,
    DeleteUser
}










