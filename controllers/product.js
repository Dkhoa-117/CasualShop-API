import asyncWrapper from "../middlewares/async.js";
import db from "../utils/connection-pool.js";

export default {
	getAll: asyncWrapper((req, res) => {
		db.getConnection((err, con) => {
			if (err) {
				console.log(err);
				throw err;
			}
			con.query("SELECT * FROM product", (err, data) => {
				if (err) {
					console.log(err);
					throw err;
				}
				res.status(200).json({ data });
				con.release();
			});
		});
	}),
};
