<template>
<main>
 {{$route.params.id}}
    <div id="Page2">
      <div class="container">
      <div class="card">
        <div class="text-right">
         <button class="btn btn-info" @click="update">保存</button>
         <button class="btn btn-danger" @click="dlt">削除</button>
        </div>

        <!-- {{items}} -->
        <div class="table">

          <tbody>
          <tr>
           <td class="table-secondary col1">No</td>
             <td class="col2">
               <!-- {{items.no}} -->
              <input v-model="items.no" type="text" class="form-control" >
               </td>             
          </tr>
          </tbody>

          <tbody>
            <tr>
           <td class="table-secondary col1">名前</td>
             <td class="col2">
               <!-- {{items.name}} -->
              <input v-model="items.name" type="text" class="form-control" >
             </td>
            </tr>
          </tbody>

          <tbody>
           <tr>
           <td class="table-secondary col1">カナ</td>
             <td class="col2">
               <!-- {{items.kana}} -->
              <input v-model="items.kana" type="text" class="form-control" >
             </td>
           </tr>
          </tbody>

          <tbody><!-- {{items.age}} ここも頭大文字Ageだとデータ取れない -->
           <tr>
           <td class="table-secondary col1">年齢</td>
             <td class="col2">
               <!-- {{items.age}} -->
              <input v-model="items.age" type="text" class="form-control" >
             </td>
           </tr>
          </tbody>

          <tbody><!-- {{items.gender}} -->
           <tr>
           <td class="table-secondary col1">性別</td>
             <td class="col2">
               <!-- {{items.gender}} -->
              <input v-model="items.gender" type="text" class="form-control" >
             </td>
           </tr>
          </tbody>

          <tbody><!-- {{items.address}} -->
           <tr>
           <td class="table-secondary col1">住所</td>
             <td class="col2">
               <!-- {{items.address}} -->
              <input v-model="items.address" type="text" class="form-control" >
             </td>
           </tr>
          </tbody>

        </div><!--table-->

       </div> <!--card-->
      </div><!--container-->
    </div>
    </main>
</template>


<script>
//<script>部の構成：１import文２export文{ data(){...},create(){},methods{...} }
// import "bootstrap";
// import "bootstrap/dist/css/bootstrap.min.css";//npm install bootstrapしなければエラーなし
// import axios from 'axios';

export default {
    name: "app",
  data() {
      return {
      //axiosDeGetData()が動いたらバックからココにデータが入る
      list:[],
// No:0,
// Name:"",
// Kana:"",

      //itemsに特定のメソッドを紐づける
      items:{
         No:0,
         Name:"",
         Kana:"",
         Age:"",
         Gender:"",
         Address:""
       }
    };
  }, //data()終端

//上記の設定等が読み込まれてココが最初のスクリプト
  created(){
     this.GetOneData();
  },

  methods: {
  // //AxiosDeGetData:function(){...}という書き方もある
  //   AxiosDeGetData(){
  //     axios.get("/api/Staff")//「/api/Staff」8080号室へ持っていくために、localhostの5001号室のstaffルームへアクセスしてデータを取っている？
  //     .then(response=>{
  //       console.log(response.data);//ログ取得。response.dataは各staffデータ（Noほか各項目全部）の事
  //       this.list=response.data;//バックエンドからのresponse.data.listというデータをthis.listというlist[]配列へ代入している
  //       //console.log(this.list);
  //       //4/10サンプルhttps://run.mocky.io/v3/b1fae6c6-b515-48f5-9b1f-86951d0a64e6
  //     });
  //   },


    GetOneData() {
      //var index = this.$route.params.id-1;//このままでも使えるが短い変数へ受け取らせている
        var id = this.$route.params.id;
      this.$axios
        .get(`/api/kokyakus/${id}`)//指定された一件のkokyakuデータを取得する。
        .then(response => {
          //ここでのresponseやresponse.dataは検証Console画面とかMockyとかとの内部の処理でどの様に関係している？
          console.log("getonedata"+response.data);//受け取ったデータを検証console画面でデバッグ表示する
          this.items = response.data; //バックエンドからのresponse.dataというデータをthis.itemsというオブジェクトへ代入している
        });
    },


    update(e) {
      console.log(this.items);
      this.$axios
        .put("/api/kokyakus/"+this.items.no, this.items) 
        //.put(`/api/bike/${this.selected.id}`, this.selected) //テンプレートリテラル
        //.put("/api/bike", this.selected)
        .then((response) => {
          //
          console.log(response);
          this.back(); //戻るボタンを自動で押したことにする
        })
        .catch((response) => {
          //
          console.log(response); //
        });
    },

    back(){
      this.$router.go(-1)
    },

    //削除前
    dlt(e) {
      var d = window.confirm("この項目を削除してよろしいですか?");
      if (d == true) {
        //if(d)でも同じ意味
        this.del();
      } else {
        alert("キャンセルされました");
      }
    },
    //データを削除する
    del() {
      this.$axios
        .delete("/api/kokyakus/" + this.items.no) //「thisこの車のトランクの」「itemsという箱の」「No」ただしNoだと動かないので小文字no
        .then((response) => {
          console.log(response); //
          //
          this.$router.push("/"); //強制的にPage1に飛ばす
        })
        .catch((response) => {
          console.log(response); //
          //
        });
    },

  } //methods 終端
} //export default 終端
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

h1,
h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
