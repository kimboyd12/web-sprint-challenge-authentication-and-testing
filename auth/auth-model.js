  
const db = require("../database/dbConfig")

function findBy(filter) {
	return db("users")
		.select("id", "username", "password")
		.where(filter)
}



module.exports = {
	findBy
}
