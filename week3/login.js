import {createApp} from 'https://cdnjs.cloudflare.com/ajax/libs/vue/3.2.47/vue.esm-browser.min.js'
const site= 'https://vue3-course-api.hexschool.io/'
const app = { 
  data(){
    return {
      user : {
        username: '' , 
        password: ''
      }
    }
},methods : {
  login(){
    const url =`${site}v2/admin/signin`
    // console.log(this.user);
    axios.post(url , this.user).then(res=>{
      // const expired = res.data.expired
      // const token =res.data.token
      const {expired , token} = res.data //解構就是將右邊的值一個一個帶出來
    //   console.log(expired , token);
      document.cookie = `HexToken=${token}; expires=${new Date(expired)};`
      window.location ='./product.html'
    }).catch(err => {
      alert ('登入失敗，請確認帳密是否正確')
    })
  } 
},
  mounted() {
  }
}
createApp(app).mount('#app')