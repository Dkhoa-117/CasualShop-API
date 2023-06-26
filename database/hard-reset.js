import db from "../utils/connection-pool.js";

const makeQuery = (query) => {
	return db.makeQuery(query).catch(err => console.log(err));
};

function resetFn(table){
    makeQuery(`DROP TABLE ${table};`)
}
export default {
    all: () => {
        resetFn("product");
        resetFn("discount");
        resetFn("product_category")
        resetFn("user_like");
        resetFn("user_rating");
        resetFn("user_order");
        resetFn("orders");
        resetFn("wish_list");
    }
}