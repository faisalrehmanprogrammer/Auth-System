const { con } = require("../config/db")

const Fetchallblog = (req, res) => {

    console.log('Rout hit')

    const sql = "SELECT * FROM `blog`"
    con.query(sql, (err, blog) => {
        if (err) {
            console.log(err)
            return res.json({ msg: "Error in the fetching", err })
        };

        return res.json({ msg: "All blog", blog })
    })
}



const FilterBlog = (req, res) => {
    console.log('rout hit')
    const { title} = req.query

    const sql = "SELECT * FROM `blog` WHERE title=?"
    con.query(sql, [title], (err, results) => {
        if (err) {
            console.log('Database error', err);
            res.status(500).json('database error')
        }
        if (req.query.search) {
            const filterProduct = results.filter(table =>table.title.includes(req.query.search))
            res.send(filterProduct)
            return
        }
        res.send(results)
    })

}



module.exports = {
    Fetchallblog,
    FilterBlog
}
