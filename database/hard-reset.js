import db from "../utils/connection-pool.js";

const makeQuery = (query) => {
	return db.makeQuery(query)
}
function resetFn(table){
    makeQuery(`DROP TABLE ${table};`)
}
export default {
    all: () => {
        try {
            resetFn("user_like");
            resetFn("discount");
            resetFn("product_category")
            resetFn("user_rating");
            resetFn("user_order");
            resetFn("orders");
            resetFn("wish_list");
            resetFn("product");
        } catch (error) {
            console.log(error)
        }
    }
}
