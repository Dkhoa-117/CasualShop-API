import mysql from "mysql";
const pool = mysql.createPool({
	connectionLimit: 10,
	host: "localhost",
	port: 3306,
	user: "public",
	password: "password",
	database: "mydb",
});
export default {
	getConnection: (callback) => {
		return pool.getConnection(callback);
	},
};
