import axios from "axios";

const validator = () => {
	return new Promise(async (resolve, reject) => {
		try {
			if (localStorage.getItem("token")) {
				const token = localStorage.getItem("token");
				const { data } = await axios.get("/validate", {
					headers: {
						Authorization: `bearer ${token}`,
					},
				});

				resolve(data.ok);
			} else {
				resolve(false);
			}
		} catch (err) {
			console.log(err);
			resolve(false);
		}
	});
};

export default validator;
