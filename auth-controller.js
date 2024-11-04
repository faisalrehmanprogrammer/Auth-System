const { con } = require("../config/db");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require("uuid");

const CreateUser = async (req, res) => {
    console.log("Route hit");
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        return res.status(500).json({ msg: 'Fields are required' })

    }

    const qry = "SELECT * FROM auth WHERE email=?"

    con.query(qry, [email], async(err, data) => {
        if (err) {
            console.log(err)
        };
        if (data.length > 0) {
            return res.status(500).json({ msg: 'user with this email already exist', data })
        }

        const salt =await bcrypt.genSalt(10)
        const hashPassword =await bcrypt.hash(password, salt);
        const user = [
            name,
            email,
            hashPassword,
        ]


        const sql = "INSERT INTO auth(name, email, password) VALUES (?)"

        con.query(sql, [user], (err, data) => {
            if (err) throw err;

            return res.json({ msg: 'User Created successfully', data })
        })


    })


}
const LoginUser = async(req, res) => {

    console.log('Rout hit')
    const { email,password } = req.body

    const sql = "SELECT * FROM auth WHERE email=?"

    con.query(sql, [email], async(err, data) => {
        if (err) throw err;
        if (data < 0) {
            return res.json({ msg: 'try to login with correct credential', data })
        }

        const user = data[0]; 
        const match =await bcrypt.compare(password,user.password)
        if (!match) {
            res.status(400).json({ msg: 'try to login with correct Credential' })

        }
        const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' })
    return res.json({msg:"user login successfuly",token})
    })
}
module.exports = {
    CreateUser,
    LoginUser
}










