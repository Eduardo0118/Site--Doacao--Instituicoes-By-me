const express = require("express")
const servidor = express()

servidor.use(express.static('public'))

servidor.use(express.urlencoded({extended: true}))

const Pool = require('pg').Pool
const db = new Pool({
    user: 'postgres',
    password: 'SENHA DO DB',
    host: 'localhost',
    port: 5432,
    database: 'NOME DO DB'
})

const nunjucks = require("nunjucks")
nunjucks.configure("./", {
    express: servidor,
    noCache: true,
})

servidor.get("/", function(req, res){
    
    db.query("SELECT * FROM inst", function(err, result){
        if (err) return res.send("Erro de banco de dados!")
        const donors = result.rows
        return res.render("Prática01.html", { donors })
    })
 })

servidor.post("/", function (req, res) {

    const name = req.body.name
    const dinheiro = req.body.dinheiro
    const email = req.body.email

    if (name == "" || dinheiro == "" || email == "") {
        return res.send("[ERROR] Todos os campos são obrigatórios!")
    }

    const query = `INSERT INTO inst ("name", "dinheiro", "email") VALUES ($1,$2,$3)`

    const values = [name, dinheiro, email]
    
    db.query(query, values, function(err){
        if (err) return res.send("Erro no banco de dados." + err.stack)
        return res.redirect("/")
    })

})

servidor.listen(3000, function() {
    console.log("Iniciei o servidor")
})