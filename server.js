const express = require("express")
const cors = require("cors")
const morgan = require("morgan")

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static("public"))

const port = process.env.PORT || 4000
app.listen(port, () => console.log(`Listening on port ${port}`))
