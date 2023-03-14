import mysql from "mysql";
export const pool = mysql.createPool({
	connectionLimit: 20,
	host: process.env.MYSQLHOST,
	port: process.env.MYSQLPORT,
	user: process.env.MYSQLUSER,
	password: process.env.MYSQLPASSWORD,
	database: process.env.MYSQLDATABASE,
});
export default {
	getConnection: (callback) => {
		return pool.getConnection(callback);
	},
};
