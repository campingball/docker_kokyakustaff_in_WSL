<template>
<main>
 
  <div id="Page1">
    <div class="container">
      <div class="card">
        <div class="card-body">
          <!-- <h3>顧客検索＆登録</h3><p>●顧客やスタッフの管理アプリ</p>   -->
            
            <div class="row mt-1">
             <div class="col">
              <input v-model="items.Name" type="text" class="form-control" placeholder="名前を入力" />
             </div>
            </div>
            <div class="row mt-1">
             <div class="col">
              <input v-model="items.Kana" type="text" class="form-control" placeholder="カナを入力"/>
             </div>
            </div>
            <button v-on:click="add" class="mb-3 btn btn-success">
            新規登録
          </button>

            <p mt-1></p>
            <div class="row mt-1">
             <div class="col">
              <input v-model="items.keyword" type="text" class="form-control" placeholder="キーワードを入力" />
             </div>
            </div>
            <button v-on:click="find" class="mb-3 btn btn-info">
            検索
          </button>

            <p mt-1></p>
            
           
            <!-- <div class="row mt-1"> -->
             <!-- <div class="col"> -->
              <!-- <input v-bind:disabled="inputDisabled" v-model="items.Password" type="text" class="form-control" placeholder="パスワードを入力"/> -->
             <!-- </div> -->
            <!-- </div> -->
             <!-- <button v-bind:disabled="btnDisabled" v-on:click="find" class="mt-3 btn btn-warning"> -->
            <!-- ログイン -->
           <!-- </button> -->

<!-- <p>{{items}}</p> オブジェクトの中身を確認してみる-->

<p>職員のコロナ予防接種情報を追加追加</p>
<p>退職者は退職日を入力した時点で非表示機能追加→「退職者含む」ボタン押せば表示可機能追加</p>
            <p class="mt-5 mb-2">登録者一覧</p>
             <!--v-forを以下のタグに組み込んで受け取ったデータを表示させる  -->
            <table class="table table-bordered" >
              <tbody>
                <tr>
                  <td class="bg-info">登録ID</td>
                  <td class="bg-info">氏名</td>
                  <td class="bg-info">カナ</td>
                </tr>

                <tr v-on:click="itemSelect(Stafflist)" v-for="Stafflist in list" v-bind:key="Stafflist.no"><!-- v-forとv-bindはセット利用必須 -->
                  <!-- v-forの記述によりlist[]に届いたデータがココに届いて表示が増えていく -->
                  <td>{{Stafflist.no}}</td>
             <!-- <td>{{Stafflist.name}}</td> -->
                  <td>{{Stafflist.kana}}</td>
                </tr>
              </tbody>
           </table>

          </div><!--card-body 終端-->
        </div><!--card 終端-->
      </div><!--container 終端-->
    </div><!--Page1 終端-->
 </main><!--main 終端:ページ遷移用に必須のタグ-->
</template><!--template 終端-->

<script>
export default {
  name: 'IndexPage',
  data() {
    return {

      //axiosDeGetData()やfind()が動いたらバックからココにデータが入る
      list:[],

      btnDisabled:true, //v-bind:disabled機能=btnDisabledをtrueにするとボタンがグレーアウト。
      inputDisabled:true, //v-bind:disabled機能=inputDisabledをtrueにするとフォームがグレーアウト。

      //itemsに特定のメソッドを紐づける
      items:{
         No:0,
         Name:"",
         Kana:"",
         Password:"",
         //keyword:""
      }
    }; // return終
  }, //data()終端

  //※サーバーサイドレンダリング：ココはサーバーサイドで動いている
  async asyncData({ params, $axios }) {
    const list = await $axios.$get(`/api/kokyakus`)
    console.log(list); //javascript的にlist内容を表示させている(検証→consoleで確認出来る)
    return { list }    
  },

  //上記の設定等が読み込まれてココが最初のスクリプト↑へ移動
  created(){
    // this.AxiosDeGetData();
  },

  methods: {

  //上記※サーバーサイドレンダリングに変えたのでコメントアウト済み
    // AxiosDeGetData(){
    //   this.$axios.get("/api/kokyakus")//「/api/Staff」8080号室へ持っていくために、localhostの5001号室のstaffルームへアクセスしてデータを取っている？
    //   .then(response=>{
    //     console.log(response.data);//ログ取得。response.dataは各staffデータ（Noほか各項目全部）の事
    //     this.list=response.data;//バックエンドからのresponse.data.listというデータをthis.listというlist:[]配列(オブジェクトエリア)へ代入している
    //     console.log(this.list); //javascript的にlist内容を表示させている(検証→consoleで確認出来る)
    //     //4/10サンプルhttps://run.mocky.io/v3/b1fae6c6-b515-48f5-9b1f-86951d0a64e6
    //   });
    // },

     add(e){
       this.$axios 
        .post("/api/kokyakus", this.items)//バックエンドのURL
        .then((response) => {
          console.log(response); 
          //新規追加した後でページを更新使用としたが以下廃業しfind()に転送するとページ更新が無くvue.jsの良さが出る。
          //this.$router.go({path: this.$router.currentRoute.path, force: true});
          this.items.Name = ""; //オブジェクトを一旦クリアしている(登録ボタン押下後にフォームをクリアする)
          this.items.Kana = ""; //オブジェクトを一旦クリアしている(登録ボタン押下後にフォームをクリアする)
          this.items.keyword = ""; //オブジェクトを一旦クリアしている(検索ボタン押下後にフォームをクリアする)
          this.find(); //find()を利用するとページ更新がなくデータが全件取得されページ更新チラつきが無くvue.jsの良さが出る
        })
        .catch( (response) => {
          //
          console.log(response);
        });
      },
      
      //add()内のページ更新作業を分離するときに使う。
      // pageReload(e){
      //     this.$router.go({path: this.$router.currentRoute.path, force: true});
      // },

//ほかのメソッドは引数がないのにItemSelectはなぜ必要
//ココでの「Staff」はtemplate部のv-forのStaffを引数に使う
     itemSelect(Staff){
       alert(Staff.no);
       //console.log("itemSelect()の"+this.Staff.name);
      this.$router.push('/detail/'+ Staff.no);//フロンドエンドでのURL
       
     },

      //検索ボタン押下後動くメソッド
      find(){
       //console.log(event);
       console.log(this.items);//テキストボックスとオブジェクト連携を目視で確認
       //console.log(this.order);//テキストボックスとオブジェクト連携を目視で確認
      var url ="/api/kokyakus";
      //まずurl変数にベースとなるURLに?aを追加して代入する。
      //「?a」の意味は→何かのパラメータがあることをプログラムに認識させプログラムを簡単に書くためのテクニック。
      if(this.items.keyword !==""){ //欄内がもし空欄でなければ(空欄かどうかチェック)
       url += "?keyword=" + this.items.keyword; //"検索用パラメータ"+欄内の文字をurlに追記して検索機能へ渡す
       //ちなみに空欄の場合は全件が取得され表示されている。
      }
         console.log(url);//urlを目視で確認出来る。axiosへ渡す
         this.$axios.get(url)
         .then(response=>{
         console.log(response.data);
         this.list=response.data;//バックエンドからデータを取り出してlistオブジェクトに入れる。
        // console.log(this.list);バックエンドからlist[]に入ったデータを確認。
        //
        // if(this.list !==""){
        //   appear()
        // }
        });
       }, //find()

       //もしthis.listが空欄でない場合以下の処理
      //  appear(){
      //     this.btnDisabled = false;
      //     this.inputDisabled = false;  
      //   }
     
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
