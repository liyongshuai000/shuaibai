<template>
	<div>
		<div class="head-con-box">
			<div class="logo">
				<a href="index.html">
					<img src="../../../static/headImg/logo.png" height="39" width="269">
				</a>
			</div>
			<div class="search-box">
				<div class="search-form">
					<form id="searchForm" name="searchForm" method="get" action="relatedGoods.html">
						<input type="text" name="keyword"  autocomplete="off" id="key" accesskey="s" class="search-text" v-model='searchWord'>
						<input type='submit' class="search-btn" value="搜索" />
                    </form>
				</div>
				<ul class="hot-words">
					<li v-for='(item,index) in keyWordsArr'  :key='index' v-text='item.keyword' @click='relatedGoods(item.keyword)'></li>
				</ul>
			</div>
			 <div class="border-primary color-primary shopping-cart" @mouseenter='cartBol=true' @mouseleave='cartBol=false'>
				<a href="myOrder.html#vip3">
					<img src="../../../static/headImg/shopCarRed.png" height="14" width="14" style="vertical-align:-2px;">
					我的购物车
					<span  class='cart-btn' v-text='userInfo.cart_num-0?userInfo.cart_num:0'  :style='{opacity:userInfo.cart_num?1:0}'></span>
				</a>
				<div class="cart-box" v-show='cartBol' @mouseenter='cartBol=true' @mouseleave='cartBol=false'>
				    <div class="border-c shop-list-box" v-if='shopList.length'>
				    	<ul class="shop-list" v-for='shopItem in shopList'>
							<li v-for='(item,index) in shopItem.goods'>
								<dl class="goods-info">
									<dt>
										<img :src="item.cover" @click='goodDetail(item.goods_id)'>
									</dt>
									<dd>
										<div class="ellipsis-2 show-info" v-text='item.name'></div>
										<div class="sell-info">
											<span>{{item.shop_price|currency}}*{{item.quantity}}</span><em @click="remove(item.cart_id)">删除</em>
										</div>
									</dd>
								</dl>
							</li>
						</ul>
						<dl class="check-cart">
							<dt>
								共{{userInfo.cart_num}}件商品&nbsp;共计{{totalPrice|currency}}
							</dt>
							<dd>
								<el-button size='mini' type='primary'>
									<a href="myOrder.html#vip3" style="color:#fff;">去购物车结算</a>
								</el-button>
							</dd>
						</dl>
				    </div>
					<div class="border-c no-cart" v-else>
				   		暂无商品
				   	</div>
				</div>
			 </div> 
		</div>
	</div>
</template>
<script>
    import {getKeyWord,getCarts,removeCart,getUserInfo} from "../../common/js/api"
    import {MessageBox} from 'element-ui'
	import {currency} from '../../common/js/filter'
	import {userInfo} from '../../common/js/mixins'
	import {errorInfo,getCookie} from '../../common/js/common'
	export default{
		data(){
			return{
				cartBol: false,
				searchWord: "",
				userInfo: {
					cart_num: ''
				},
				keyWordsArr: [{
			   	   keyword:''
			   }],
			   shopList:[],
			   totalPrice: 0 
			}
		},
		filters:{
			currency
		},
		computed:{
			carBol(){
				let  bol = this.$store?this.$store.state.shopCarBol:"" ;
				return bol ;
			}
		},
		watch:{
			carBol(){
				this.initList();
			}
		},
		mixins: [userInfo],
		methods:{
			relatedGoods(keyword){
				window.open(`relatedGoods.html?keyword=${keyword}`); 
			},
			keyWords(){
				getKeyWord().then(res=>{
					let {errcode,message,content} = res ;
					if(errcode !== 0){
						if (errcode === 99) {
	            			MessageBox.alert(message, '提示', {
					          	confirmButtonText: '确定',
					          	callback: action => {
					          		window.location.href = 'login.html';
					          	}
						    });
	            		}else{
	            			MessageBox.alert(message, '提示', {
					          	confirmButtonText: '确定'
						    });
	            		}
					}else {
						this.keyWordsArr = content;	
					}
				})
			},
			countTotalPrice(){
				let totalPrice = 0 ;
				let totalNum = 0 ;
				for (let i = 0 ;i < this.shopList.length; i++){
					let arr = this.shopList[i].goods ;
					for(let j = 0;j< arr.length;j++){
						let price = arr[j].shop_price*arr[j].quantity ;
						totalPrice+=price;
						totalNum++;
					}
				}
				this.totalPrice = totalPrice ;
				this.userInfo.cart_num = totalNum ;
			},
			goodDetail(id){
				window.open(`goodDetail.html?goods_id=${id}`)
			},
			remove(cart_id){
			 	MessageBox.confirm('此操作将永久删除该商品, 是否继续?', '提示', {
		          confirmButtonText: '确定',
		          cancelButtonText: '取消',
		          type: 'warning'
		        }).then(() => {
		        	let params = {
				 		access_token: getCookie('access_token'),
				 		cart_ids: cart_id
		 			} ;
			        removeCart(params).then(res=>{
				 		let {errcode,message,content} = res;
				 		if(errcode!==0) {
							errorInfo(errcode,message) ;
						}else{
							this.initList(); 
						}
				 	})
		        }).catch(() => {
		            return false;          
		        });
			 },
			initList(){
			 	let params = {
					access_token: getCookie('access_token')
				};
				getCarts(params).then(res=>{
					let {errcode,message,content} = res ;
					if(errcode!==0) {
						errorInfo(errcode,message) ;
					}else{
						this.shopList = content ;
						this.countTotalPrice() ;
					}
				});
			 }
		},
		mounted(){
			this.$nextTick(()=>{
				this.keyWords();
				let  access_token = getCookie('access_token');
				if (access_token) {
					this.initList();
				}
			})
		}
	}
</script>
<style lang='scss' scoped>
	.head-con-box{
		width: 100%;
		height: 104px;
	}
	.logo{
		width: 270px;
		margin-top: 32px;
		float: left;
		img{
			width: 100%;
		}
	}
	.search-box{
		width: 520px;
		float: left;
		margin-top: 32px;
		margin-left: 120px;
	}
	.search-form{
	    border: 3px solid #e4393c;
	    height: 44px;
	    width: 496px;
	}
	 #searchForm{
    	overflow: hidden;
    	.search-text{
			float: left;
			background-color: #fff;
			background-position: 0 -360px;
			background-repeat: repeat-x;
		 	font-family: arial,"宋体";
			font-size: 14px;
			padding: 5px;
			width: 412px;
			height: 38px;
			line-height: 38px;
			border: none;
			outline: none;
		}
		.search-btn{
			float: left;
		    color: #fff;
		    font-size: 14px;
		    font-weight: 700;
		    width: 78px;
		    height: 38px;
		    border: none;
		    margin: 0px;
		    background: none repeat scroll 0 0 #e4393c;
		}
    }
	.hot-words{
		margin: 0px;
		padding: 6px 0px;
		overflow: hidden;
		li{
			float: left;
			padding-left: 10px;
			cursor: pointer;
		}
	}
	.shopping-cart{
		position: relative;
		width: 150px;
		height: 36px;
		margin-top: 32px;
		padding-top: 6px;
		text-align: center;
		float: right;
		.cart-btn{
			vertical-align: super;
		    border-radius: 8px;
		    padding: 0px 4px;
			color: #fff;
			background-color: #f24450;
		}
	}
	.cart-box{
		position: relative;
		.no-cart,.shop-list{
			overflow: hidden;
			width: 240px;
			padding: 0px 14px;
			background-color: #fff;
		}
		.no-cart{
			position: absolute;
			right: -1px;
			top: 8px;
			height: 56px;
			line-height: 56px;
			text-align: center;
		}
	}
	.shop-list-box{
		position: absolute;
		top: 8px;
		right: -1px;
		overflow-y: scroll;
		z-index: 100;
		.check-cart{
			height: 72px;
			line-height: 30px;
			overflow: hidden;
			background-color: #fff;
		}
	}
	.shop-list{
		li{
			width: 100%;
			height: 80px;
			padding: 10px 0px;
			border-bottom: 1px solid #ccc;
		}
		.goods-info{
			width: 100%;
			height: 80px;
			overflow: hidden;
			dt{
				float: left;
				width: 60px;
				height: 60px;
				img{
					width: 100%;
					height: 100%;
					cursor: pointer;
				}
			}
			dd{
				float: left;
				width: 136px;
				height: 60px;
				margin-left: 10px;
				color: #000;
			}
		}
		.show-info{
			line-height: 18px;
			height: 36px;
			overflow: hidden;
		}
		.sell-info{
			overflow: hidden;
			margin-top: 6px;
			span{
				float: left;
			}
			em{
				float: right;
			}
			em:hover{
				cursor: pointer;
				color: #c71724;
			}
		}
	}
</style>