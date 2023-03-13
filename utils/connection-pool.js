import mysql from "mysql";
const pool = mysql.createPool({
	connectionLimit: 20,
	host: "mysql",
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
