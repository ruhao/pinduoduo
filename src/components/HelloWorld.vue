<template>
  <div>
   <ul>
    <li v-for="(item,index) in GoodsList" :key=index @click="PageJump(item.goods_id)">
    <img :src="item.goods_image_url" alt="">
    <img :src="item.goods_thumbnail_url" alt="">
    {{item.goods_name}}
    </li> 
   </ul>  
  </div>
</template>

<script>
import { GetPinDuoDuoApi } from "../minixs/GetApi.js";

export default {
  name: "HelloWorld",
  data() {
    return {
      GoodsList: [],
      url:"http://mobile.yangkeduo.com/goods2.html?goods_id=",
      data: {
        client_id: "85cce594a0d943e8aec5569427bd881a",
        client_secret: "502a790e6be968bc349fca881106a38439e6d2f4",
        data_type: "JSON",
        page: 10,
        page_size: 10,
        sort_type: 0,
        timestamp: "",
        type: "pdd.ddk.goods.search",
        with_coupon: true
      }
    };
  },
  methods:{
    PageJump (data){
      // this.$router.push({path:`${this.url}${data}`})
      window.location.href = `${this.url}${data}`
    }
  },
  created() {
    let MyUrl = GetPinDuoDuoApi(this.data)
    this.axios.post(MyUrl)
      .then(res => {
        this.GoodsList=res.data.goods_search_response.goods_list
        console.log(this.GoodsList)
      });
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
