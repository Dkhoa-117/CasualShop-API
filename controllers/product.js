import asyncWrapper from "../middlewares/async.js";
import db from "../utils/connection-pool.js";

export default {
	getAll: asyncWrapper((req, res, next) => {
		db.getConnection((err, con) => {
			if (err) {
				console.log(err);
				return;
				// throw err;
			}
			con.query("SELECT * FROM product", (err, data) => {
				if (err) {
					console.log(err);
					return;
					// throw err;
				}
				res.status(200).send(data);
				con.release();
			});
		});
	}),
};
