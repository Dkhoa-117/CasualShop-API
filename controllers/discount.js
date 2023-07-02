import asyncWrapper from "../middlewares/async.js";
import db from "../utils/connection-pool.js";

export default {
	getAll: asyncWrapper((req, res, next) => {
		db.getConnection((err, con) => {
			if (err) {
				console.log(err);
				throw err;
			}
			con.query("SELECT * FROM discount", (err, data) => {
				if (err) {
					console.log(err);
					throw err;
				}
				res.status(200).json({ message: "Success", data });
				con.release();
			});
		});
	}),
	getById: asyncWrapper((req, res, next) => {
		db.getConnection((err, con) => {
			if (err) {
				console.log(err);
				throw err;
			}
			const id = req.params.id;
			if (isNaN(id)) {
				res.status(500).json({ message: "Wrong id" });
				con.release();
				return;
			}
			con.query(`SELECT * FROM discount WHERE id=${id}`, (err, data) => {
				if ((err, data.length < 0)) {
					console.log(err);
					throw err;
				}
				res.status(200).json({ message: "Success", data });
				con.release();
			});
		});
	}),
};
