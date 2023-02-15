import { createApp} from 'https://cdnjs.cloudflare.com/ajax/libs/vue/3.2.47/vue.esm-browser.min.js'
let productModal ={}
let delProductModal ={}
const app = {
    data() {
        return {
        apiUrl: "https://vue3-course-api.hexschool.io/v2",
        apiPath: "william_vue",
        products: [],
        tempProduct: {
            imgUrl:[]
        },
        isNew: false
        }
    } ,
    methods :{
        getProducts(){
            const url = `${this.apiUrl}/api/${this.apiPath}/admin/products`;
            axios.get(url).then((res)=>{
                this.products=res.data.products
                console.log(this.products);                
            }).catch((err)=> {
                alert(err.data.message);

            })
        },
        updateProduct() {
            
        }
    } , 
    mounted() {
        // 取出 Token
		const token = document.cookie.replace(/(?:(?:^|.*;\s*)cationToken\s*=\s*([^;]*).*$)|^.*$/,"$1");
		axios.defaults.headers.common.Authorization = token;
    // console.log(token);
		this.getProducts();
        this.getProducts()


    // Bootstrap 方法
    //1. 初始化new
    //2. 呼叫方法 show ,hide
     productModal = new bootstrap.Modal('#productModal')
    productModal.show()
}
}  
createApp(app).mount('#app')