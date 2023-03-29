import asyncWrapper from "../middlewares/async.js";
import db from "../utils/connection-pool.js";

export default {
	getAll: asyncWrapper((req, res, next) => {
		db.getConnection((err, con) => {
			if (err) throw err;
			con.query("SELECT * FROM product_category", (err, data) => {
				if (err) throw err;
				res.status(200).json({ data });
				con.release();
			});
		});
	}),
	getById: asyncWrapper((req, res, next) => {
		db.getConnection((err, con) => {
			if (err) throw err;
			con.query(
				`SELECT * FROM product_category WHERE id=${req.params.id})`,
				(err, data) => {
					if (err) throw err;
					res.status(200).json({ data });
					con.release();
				}
			);
		});
	}),
};
