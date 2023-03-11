import asyncWrapper from "../middlewares/async.js";
import db from "../utils/connection-pool.js";

export default {
	getAll: asyncWrapper((req, res) => {
		db.getConnection((err, con) => {
			if (err) throw err;
			con.query("SELECT * FROM product_category", (err, data) => {
				if (err) throw err;
				res.status(200).send(data);
				con.release();
			});
		});
	}),
};
