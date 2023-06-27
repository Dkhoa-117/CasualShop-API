import asyncWrapper from "../middlewares/async.js";
import db from "../utils/connection-pool.js";
import { pool } from "../utils/connection-pool.js";

export default {
	getUserOrderById: asyncWrapper(async (req, res) => {
		const { id } = req.query;
		let data = {};
		await pool
			.promise()
			.query(`SELECT * FROM user_order WHERE id = ${id};`)
			.then(async (result) => {
				data = { ...result[0][0] };
				await pool
					.promise()
					.query(`SELECT * FROM orders WHERE userorderId = '${id}'`)
					.then(async (result) => {
						data = { ...data, productList: result[0] };
					});
			})
			.catch((err) => {
				console.log(err);
			});
		res.status(200).json({ message: "Success", data });
	}),
	getUserOrder: asyncWrapper(async (req, res) => {
		const { status, uid } = req.query;
		console.log(uid);
		let query = "";
		if (status === "all" || status === undefined) {
			query = `SELECT * FROM user_order WHERE userId = '${uid}' AND NOT (status = 'cart');`;
		} else {
			query = `SELECT * FROM user_order WHERE (userId = '${uid}' AND (status = '${status}'));`;
		}
		if (uid) {
			await pool
				.promise()
				.query(query)
				.then(async (result) => {
					let data = result[0];
					res.status(200).json({ message: "Success", data });
				})
				.catch((err) => {
					console.log(err);
					throw err;
				});
		} else {
			res.json({ message: "Error" });
		}
	}), // -> get
	getOrder: asyncWrapper(async (req, res) => {
		const { id } = req.query;
		await pool
			.promise()
			.query(
				`SELECT a.name, a.imgSrc, b.userorderId, b.productId, b.createAt, b.quantity, b.price, b.totalPrice  FROM ((SELECT name, id, imgSrc from product) a LEFT JOIN (SELECT * FROM orders) b ON b.productId = a.id) WHERE b.userorderId = ${id};`
			)
			.then(async (result) => {
				let data = result[0];
				res.status(200).json({ message: "Success", data });
			})
			.catch((err) => {
				console.log(err);
				throw err;
			});
	}),
	addToCart: asyncWrapper(async (req, res) => {
		const { product, uid, quantity } = req.body;

		console.log(product);
		await pool
			.promise()
			.query(
				`SELECT id FROM user_order WHERE (userId='${uid}' AND status='cart');`
			)
			.then(async (result) => {
				let { id } = result[0][0];
				if (id) {
					await pool
						.promise()
						.query(
							`INSERT INTO orders(userorderId, productId, quantity, price, totalPrice, createAt) VALUES ('${id}', ${
								product.id
							}, ${quantity}, ${product.price}, ${
								quantity * product.price
							}, NOW());`
						)
						.then(async (result) => {
							let data = result[0];
							if (data) {
								utilities.updateTotalPrice(id);
								res.status(200).json({ message: "Success", data });
							}
						})
						.catch((err) => {
							console.log(err);
							throw err;
						});
				}
			});
	}), //  -> post
	adjustQuantity: asyncWrapper(async (req, res) => {
		const { product, quantity, uid } = req.body;
		await pool
			.promise()
			.query(
				`SELECT * FROM user_order WHERE (status='cart' AND userId='${uid}');`
			)
			.then(async (result) => {
				let { id } = result[0][0];
				if (id) {
					let query = "";
					query = `UPDATE orders SET quantity = ${quantity}, totalPrice = totalPrice + price WHERE userorderId = ${id} AND productId = ${product.id};`;
					await pool
						.promise()
						.query(query)
						.then(async (result) => {
							utilities.updateTotalPrice(id);
							res.status(200).json({ message: "Success" });
						})
						.catch((err) => {
							console.log(err);
							throw err;
						});
				}
			})
			.catch((err) => {
				console.log(err);
				throw err;
			});
	}), //  -> put
	removeFromCart: asyncWrapper(async (req, res) => {
		const { product, id } = req.body;
		db.getConnection((err, con) => {
			if (err) {
				console.log(err);
				throw err;
			}
			con.query(
				`DELETE FROM orders WHERE (userorderId=${id} AND productId = ${product});`,
				(err, data) => {
					if (err) {
						console.log(err);
						throw err;
					}
					utilities.updateTotalPrice(id);
					res.status(200).json({ message: "Success" });
					con.release();
				}
			);
		});
	}), //  -> delete

	confirmOrder: asyncWrapper(async (req, res) => {
		const { uid, id } = req.body;
		db.getConnection((err, con) => {
			if (err) {
				console.log(err);
				throw err;
			}
			con.query(
				`UPDATE user_order SET status = 'ordered', orderedDate = NOW() WHERE (status = 'cart' AND id = ${id});`,
				(err, data) => {
					if (err) {
						console.log(err);
						s;
						throw err;
					}
					utilities.newUserCart(uid);
					res.status(200).json({ message: "Success" });
					con.release();
				}
			);
		});
	}), // -> put
	createCart: asyncWrapper(async (req, res) => {
		const {uid} = req.body;
		utilities.newUserCart(uid)
		res.status(200).json({message: "Success"})
	})
};

const utilities = {
	updateTotalPrice: async (userorderId) => {
		await pool
			.promise()
			.query(
				`SELECT SUM(totalPrice) AS totalPrice FROM orders WHERE userorderId ='${userorderId}';`
			)
			.then(async (result) => {
				let { totalPrice } = result[0][0];
				await pool
					.promise()
					.query(
						`UPDATE user_order SET (totalPrice = ${totalPrice}, productQuantity = productQuantity + 1) WHERE id = ${userorderId};`
					)
					.catch((err) => {
						console.log(err);
					});
			})
			.catch((err) => {
				console.log(err);
			});
	},
	newUserCart: async (userId) => {
		await pool
			.promise()
			.query(
				`INSERT INTO user_order(status, userId) VALUES ('cart', '${userId}');`
			)
			.catch((err) => {
				console.log(err);
			});
	},
};
