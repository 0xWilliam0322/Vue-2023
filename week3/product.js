import { createApp} from 'https://cdnjs.cloudflare.com/ajax/libs/vue/3.2.47/vue.esm-browser.min.js'
let productModal ={}
// let delProductModal ={}
const app = {
    data() {
        return {
        apiUrl: "https://vue3-course-api.hexschool.io/v2",
        apiPath: "william_vue",
        products: [],
        tempProduct: {
            imagesUrl:[]
        },
        isNew: false  //確認是編輯或是新增所使用
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
        openModal(status , product){
            if(status==='create'){
                productModal.show()
                this.isNew = true
                // 帶入初始化資料
                this.tempProduct = {
                    imagesUrl:[]
                }           
             } 
                else if(status ==='edit')
            {
                productModal.show()
                this.isNew = false
                // 要帶入當前編輯的資料
                this.tempProduct = { ...product}
            } 
                else if (status==='delete'){
                    delProductModal.show()
                    this.tempProduct = { ...product}//等等取ID使用

                }
           },
        updateProduct() {
            let url =`${this.apiUrl}/api/${this.apiPath}/admin/product`
            let methods = 'post'
            if(!this.isNew){
             url =`${this.apiUrl}/api/${this.apiPath}/admin/product/{id}`
             methods = 'put'
            }
            axios[methods](url,{data:this.tempProduct}).then(res=>{
                this.getProducts()
                productModal.hide()
            })
        } ,
        deleteProduct () {
            // 不需要重新賦值 ，  所以用const
            const url =`${this.apiUrl}/api/${this.apiPath}/admin/product/${this.tempProduct.id}`
            axios.delete(url).then(() =>{
                this.getProducts()
                delProductModal.hide()
            })
        }
    } , 
    mounted() {
        // 取出 Token
		const token = document.cookie.replace(/(?:(?:^|.*;\s*)HexToken\s*=\s*([^;]*).*$)|^.*$/,"$1");
        axios.defaults.headers.common["Authorization"] = token;
        console.log(token);

		this.getProducts();


    // Bootstrap 方法
    //1. 初始化new
    //2. 呼叫方法 show ,hide
     productModal = new bootstrap.Modal('#productModal')
     delProductModal =new bootstrap.Modal('#delProductModal') 
    // productModal.show()
}
}  
createApp(app).mount('#app')
