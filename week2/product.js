import { createApp } from "https://unpkg.com/vue@3/dist/vue.esm-browser.js";

createApp({
	data() {
		return {
			apiUrl: "https://vue3-course-api.hexschool.io/v2",
			apiPath: "william_vue",
			products: [],
			tempProduct: {},
		};
		
	},
	methods: {
        // 取得資料
        getData() {
            const url = `${this.apiUrl}/api/${this.apiPath}/admin/products/all`;
			// console.log(url);
            axios.get(url)
				.then((res) => {
					this.products = res.data.products;
                    // console.log(res)
				})
				.catch((err) => {
					alert(err.data.message);
				});
        },

		//更新資料
		updateProduct() {

		}
	},
	mounted() {
		// 取出 Token
		const token = document.cookie.replace(/(?:(?:^|.*;\s*)HexToken\s*=\s*([^;]*).*$)|^.*$/,"$1");
		axios.defaults.headers.common.Authorization = token;
    // console.log(token);
		this.checkLogin();
        this.getData()
	},
}).mount("#app");