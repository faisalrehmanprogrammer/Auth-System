const { con } = require("../config/db")

const AdminCreateUser = (req, res) => {
    console.log('Rout hit')
    const { img, title, content, auther_id } = req.body

    const sql = "INSERT INTO `blog`( `img`, `title`, `content`, `auther_id`) VALUES (?,?,?,?)"
    con.query(sql, [img, title, content,auther_id], (err, data) => {
        if (err) throw err
        return res.json({ msg: "Failed to created ", data })
    })
    
}

const AdminUpdateUser = (req, res) => {

    console.log('Rout hit')
    
    const { img, title, content, auther_id } = req.body

    const sql = "UPDATE `blog` SET  `img`=?, `title`=?, `content`=? WHERE  auther_id=?"
    con.query(sql, [img, title, content,auther_id], (err, data) => {
        if (err) throw err;
        if (data.affectedRows===0) {
            return res.json({ msg: "blog not found", data })
        }
        return res.json({ msg: "blog update successfully", data })
    })
}

const AdminFetchUser = (req, res) => {
    console.log('Rout hit')
    const {auther_id}  = req.body

    const sql = "SELECT * FROM blog WHERE  auther_id=?"
    con.query(sql, [auther_id], (err, data) => {
        if (err) throw err;
        if (data.affectedRows===0) {
            return res.status(500).json({ msg: "blog not found", data })
        }
        return res.json({ msg: "blog fetch successfully", data })
    })
}
const AdminDeleteUser = (req, res) => {
    console.log('Rout hit')
    console.log('req.body',req.body)
    const {auther_id}  = req.body

    const sql = "DELETE FROM `blog` WHERE auther_id = ?"
    con.query(sql, [auther_id], (err, data) => {
        if (err) {
            console.log(err)
            return res.status(500).json({ msg: "Internal server error" });
        };
        if (data.affectedRows===0) {
            return res.json({ msg: "blog not found", data })
        }
        return res.json({ msg: "blog delete successfully", data })
    })
}

module.exports = {
    AdminCreateUser,
    AdminUpdateUser,
    AdminFetchUser,
    AdminDeleteUser

}
