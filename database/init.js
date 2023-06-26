import create from "./create-tables.js";
import addData from "./add-data.js";

export default {
	initial: () => {
		create.category();
		create.product();
		create.discount();
		create.userLike();
		create.userRating();
		create.userOrder()
		create.order();
		create.wishList();

		setTimeout(() => {
			addData.discount();
			addData.category();
			addData.product();
		}, 10000);
	},
};
