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
        // 確認是否登入
		checkLogin() {
			const url = `${this.apiUrl}/api/user/check`;
			axios
				.post(url)
				.then((res) => {
					// this.getData();
                    console.log(res);
				})
				.catch((err) => {
					alert(err.data.message);
					window.location = "./login.html";
				});
		},
        // 取得資料
        getData() {
            const url = `${this.apiUrl}/api/${this.apiPath}/admin/products/all`;
			console.log(url);
            axios.get(url)
				.then((res) => {
					this.products = res.data.products;
                    // console.log(res)
				})
				.catch((err) => {
					alert(err.data.message);
				});
        },
	},
	mounted() {
		// 取出 Token
		const token = document.cookie.replace(/(?:(?:^|.*;\s*)cationToken\s*=\s*([^;]*).*$)|^.*$/,"$1");
		axios.defaults.headers.common.Authorization = token;
    console.log(token);
		this.checkLogin();
        this.getData()
	},
}).mount("#app");