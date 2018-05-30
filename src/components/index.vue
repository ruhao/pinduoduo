<template>
  <div class="bgcolor">
    <div class="Search">
       <input v-model="keyword" placeholder="搜索产品">
       <i @click="GetSearchedGoods"><img src="../assets/search.png"></i>
    </div>
    <div class="Nav">
    <ul id="GetLength">
      <li v-for="(item,index) in TypeList" :key=index>
        {{item.opt_name}}
      </li>
    </ul>
    </div>
    <div class="GoodsList">
      <ul>
        <li v-for="(item,index) in GoodsList" :key=index @click="PageJump(item.goods_id)">
       <!-- <img :src="item.goods_image_url" alt="">
       <img :src="item.goods_thumbnail_url" alt=""> -->
       {{item.goods_name}}
      </li> 
    </ul>  
    </div>
  </div>
</template>

<script>
import {
  GetPinDuoDuoSearchApi,
  GetPinDuoDuoTypeApi
} from "../minixs/GetApi.js";

export default {
  data() {
    return {
      GoodsList: [],
      TypeList: [],
      keyword: "",
      url: "http://mobile.yangkeduo.com/goods2.html?goods_id=", //页面跳转基地址
      SearchData: {
        //产品列表数据
        client_id: "85cce594a0d943e8aec5569427bd881a",
        client_secret: "502a790e6be968bc349fca881106a38439e6d2f4",
        data_type: "JSON",
        keyword: "",
        opt_id: "",
        page: 10,
        page_size: 10,
        sort_type: 0,
        timestamp: "",
        type: "pdd.ddk.goods.search",
        with_coupon: true
      },
      TypeData: {
        //产品分类数据
        client_id: "85cce594a0d943e8aec5569427bd881a",
        client_secret: "502a790e6be968bc349fca881106a38439e6d2f4",
        data_type: "JSON",
        parent_opt_id: "0",
        timestamp: "",
        type: "pdd.goods.opt.get"
      }
    };
  },
  methods: {
    push: function() {
      this.list.push(11);
      this.nextTick(function() {
        alert("数据已经更新");
      });
      this.$nextTick(function() {
        alert("v-for渲染已经完成");
      });
    },
    PageJump(data) {
      // this.$router.push({path:`${this.url}${data}`})
      window.location.href = `${this.url}${data}`;
    },
    GetGoodsList() {
      //获取代签名的Url
      let SearchUrl = GetPinDuoDuoSearchApi(this.SearchData);
      this.axios.post(SearchUrl).then(res => {
        this.GoodsList = res.data.goods_search_response.goods_list;
        console.log(this.GoodsList);
      });
    },
    GetSearchedGoods() {
      //重置opt_id，ID
      this.SearchData.opt_id = "";
      this.SearchData.keyword = this.keyword;
      this.GetGoodsList();
    }
  },
  created() {
    this.GetGoodsList();
    let TypeUrl = GetPinDuoDuoTypeApi(this.TypeData);
    this.axios.post(TypeUrl).then(res => {
      this.TypeList = res.data.goods_opt_get_response.goods_opt_list;
      console.log(this.TypeList);
    });
  },
  updated() {
    let Nav = document.getElementById("GetLength");
    console.log(Nav.children);
    if (document.getElementsByClassName("Nav")[0]) {
      console.log(2);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.bgcolor {
  background: #cccccc;
  display: flex;
  flex-direction: column;
}
.Search {
  width: 100%;
  position: relative;
  height: 29px;
}
.Search input {
  border: 0;
  width: 96%;
  height: 24px;
  margin: 5px 2%;
  color: gray;
  text-align: center;
  font-size: 10px;
  line-height: 18px;
  border-radius: 3px;
}
.Search i {
  font-style: normal;
  position: absolute;
  height: 18px;
  width: 18px;
  right: 4%;
  top: 6px;
  cursor: pointer;
  z-index: 2;
}
.Search i img {
  width: 100%;
  margin-top: 2px;
}
.Nav {
  height: 24px;
  margin-top: 5px;
  overflow-x: scroll;
  padding: 0 2%;
  width: 96%;
  background: white;
}
.Nav ul {
  overflow: hidden;
  list-style: none;
}
.Nav ul li {
  float: left;
  margin: 0 5px;
  font-size: 12px;
  line-height: 24px;
}
</style>
