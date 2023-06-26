import mysql from "mysql2";
import dotenv from "dotenv";
dotenv.config();
export const pool = mysql.createPool({
	connectionLimit: 20,
	host: process.env.MYSQLHOST,
	port: process.env.MYSQLPORT,
	user: process.env.MYSQLUSER,
	password: process.env.MYSQLPASSWORD,
	database: process.env.MYSQLDATABASE,
	multipleStatements: true,
	waitForConnections: true,
});

export default {
	getConnection: (callback) => pool.getConnection(callback),
	makeQuery: (query) => {
		pool.getConnection((err, conn) => {
			if (err) {
				console.log(err.message);
			}
			conn.query(query, (err, data) => {
				if (err) {
					console.log(err.message);
				}
				const output = query.split(" ")
				console.log(`	${output[0]} ${output[2]}`);
			});
			conn.release();
		});
	},
};
