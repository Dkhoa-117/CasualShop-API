import asyncWrapper from "../middlewares/async.js";
import { pool } from "../utils/connection-pool.js";

export default {
	getWishList: asyncWrapper(async (req, res) => {
		const { uid } = req.query;
		await pool
			.promise()
			.query(
				`SELECT a.name, a.price, a.imgSrc, a.inventory, a.id FROM (SELECT * FROM product) a right JOIN (SELECT * FROM wish_list WHERE (userId = '${uid}')) b ON a.id = b.productId;`
			)
			.then(async (result) => {
				let data = result[0];
				res.status(200).json({
					message: "Success",
					data,
				});
			})
			.catch((err) => {
				console.log(err);
				throw err;
			});
	}),
	add2WishList: asyncWrapper(async (req, res) => {
		const { uid, productId } = req.body;
		await pool
			.promise()
			.query(
				`INSERT INTO wish_list(productId, userId) VALUES (${productId}, '${uid}');`
			)
			.then(async (result) => {
				let data = result[0];
				res.status(200).json({ message: "Success", data });
			})
			.catch((err) => {
				console.log(err);
			});
	}),
	removeFromWishList: asyncWrapper(async (req, res) => {
		const { productId, uid } = req.body;
		await pool
			.promise()
			.query(
				`DELETE FROM wish_list WHERE (productId = ${productId} AND userId = '${uid}');`
			)
			.then((result) => {
				let data = result[0];
				res.status(200).json({ message: "Success", data });
			})
			.catch((err) => {
				console.log(err);
				throw err;
			});
	}),
};
