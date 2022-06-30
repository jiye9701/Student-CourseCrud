const express = require("express")
const { graphqlHTTP } = require("express-graphql")
const schema = require("./graphql/schema")
const connectDB = require("./config/mongoose")
var cors = require("cors")
const {authenticate} = require("./middleware/auth")
const app = express()

//Connect db
connectDB()

//Init middleware
app.use(express.json({ extended: false }))

app.use(function (req, res, next) {
	res.header("Access-Control-Allow-Origin", "*")
	res.header(
		"Access-Control-Allow-Headers",
		"Origin, X-Requested-With, Content-Type, Accept"
	)
	next()
})
app.use(cors())

app.use(
	"/graphql/public",
	graphqlHTTP((req) => ({
		schema,
		graphiql: true
	}))
)

app.get("/", (req, res) => {
	res.send("API running")
})


const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
	console.log(`Port listening on ${PORT}`)
})
