<template>
	<div class="wrap">
		<div class="box" v-if='viewList.length'>
			<ul class="view-box" >
				<li class="view-list" v-for='(shopItem,shopIndex) in viewList'>
					<div class="store-info">
						<dl>
							<dt>
								<img :src="shopItem.cover" @click='storeDetail(shopItem.seller_id)'>
							</dt>
							<dd class="ellipsis-1" v-text='shopItem.shop_name'></dd>
							<dd class="btn">
								<button class='color-6 border-c' @click='escView(shopItem.attention_id)'>取消关注</button>
							</dd>
							<dd class="store-eval">
								<dl>
									<dt>商品</dt>
									<dd class='color-primary' v-text='shopItem.comment.goods_comment'></dd>
								</dl>
								<dl>
									<dt>服务</dt>
									<dd class='color-primary' v-text='shopItem.comment.service_comment'></dd>
								</dl>
								<dl>
									<dt>物流</dt>
									<dd class='color-primary' v-text='shopItem.comment.logistics_comment'></dd>
								</dl>
							</dd>
						</dl>
					</div>
					<div class="border-c goods-info">
						<nav class="f5-bg title">
							<div @click='shopItem.goodsList=shopItem.week;shopItem.tabIndex=1;shopItem.scrollIndex=0;' :class='{"active":shopItem.tabIndex===1}'>本周上新（{{shopItem.week_count}}）</div>
							<div @click='shopItem.goodsList=shopItem.coupon;shopItem.tabIndex=2;shopItem.scrollIndex=0;'  :class='{"active":shopItem.tabIndex===2}'>优惠（{{shopItem.coupon_count}}）</div>
							<div  @click='shopItem.goodsList=shopItem.hot;shopItem.tabIndex=3;shopItem.scrollIndex=0;'  :class='{"active":shopItem.tabIndex===3}'>热销（{{shopItem.hot_count}}）</div>
						</nav>
						<div class="list-box">
							<div class="color-primary left-btn" @click='shopItem.scrollIndex=shopItem.scrollIndex>0?--shopItem.scrollIndex:0'>
								<i class="el-icon-arrow-left"></i>
							</div> 
							<ul>
								<li v-for="(item,index) in shopItem.goodsList" v-if='index>=shopItem.scrollIndex&&index<(shopItem.scrollIndex+5)'>
									<dl>
										<dt>
											<img :src="item.cover" @click='goodDetail(item.goods_id)'>
										</dt>
										<dd>
											<span class='color-primary'>{{item.shop_price|currency}}</span>
											<em class="color-6">{{item.market_price|currency}}</em>
										</dd>
									</dl>
								</li>
							</ul>
							<div class="color-primary right-btn" @click='shopItem.scrollIndex=shopItem.scrollIndex<shopItem.goodsList.length?++shopItem.scrollIndex:shopItem.goodsList.length'>
								<i class="el-icon-arrow-right"></i>
							</div>
						</div>
					</div>
				</li>
			</ul>
			<pagination :pagesize='pagesize' @changePage='changePage'></pagination>
		</div>
		<div v-else style='font-size:16px;'>
			暂无关注店铺
		</div>
	</div>
</template>
<script>
	import {currency} from "../../common/js/filter"
	import {errorInfo,getCookie} from '../../common/js/common'
	import {attention,cancelAttentions} from '../../common/js/api'
	import pagination from '../Common/pagination'
	import {Message} from  'element-ui'
	export default {
		data(){
			return {
			 	viewList: [],
			 	pagesize: 1 ,// 总页数
				page: "1"
			}
		},
		filters:{
			currency
		},
		components: {
			pagination
		},
		methods:{
			storeDetail(id){
				window.open(`storeDetail.html?seller_id=${id}`) ;
			},
			goodDetail(id){
				window.open(`goodDetail.html?goods_id=${id}`) ;
			},
			// 改变页数
			changePage(page){
				this.page = page ;
				this.initList();
			},
			escView(id){
				let params = {
					access_token: getCookie('access_token'),
					ids: id
				};
				cancelAttentions(params).then(res=>{
					let {errcode,message,content} = res ;
					if(errcode !== 0){
						errorInfo(errcode,message) ;
					}else {
						Message.success({
				          message: "取消收藏成功",
				          type: 'success'
				        });
				        this.initList();
					}
				})
			},
			initList(){
				let params  ={
					access_token: getCookie('access_token'),
					page: "1"
				}
				attention(params).then(res=>{
					let {errcode,message,content,pageSize} = res ;
					if(errcode !== 0){
						errorInfo(errcode,message) ;
					}else {
						for(let i =0;i<content.length;i++){
							content[i].goodsList = content[i].week ;
							content[i].scrollIndex = 0;
							content[i].tabIndex = 1;
						}
						this.viewList = content;
						this.pagesize  = pageSize ;
					}
				})
			}
		},
		 mounted(){
	    	this.$nextTick(()=>{
	    		this.initList();
	    	})
    	}
	}
</script>
<style lang='scss' scoped>
	.wrap{
		padding-left: 15px;
	}
	.view-box{
		width: 100%;
	}
	.view-list{
		width: 100%;
		height: 240px;
		margin-top: 46px;
		overflow: hidden;
	}
	.store-info{
		float: left;
		width: 150px;
		text-align: center;
		dl{
			width: 100%;
		}
		dt{
			width: 70px;
			height: 70px;
			margin: 14px auto;
			img{
				width: 100%;
				height: 100%;
				border-radius: 50%;
				cursor: pointer;
			}
		}
		.btn{
			text-align: center;
			padding: 18px 0px;
			button{
				width: 66px;
				height: 24px;
				border-radius: 4px;
				background-color: transparent;
			}
		}
	}
	.store-eval{
		overflow: hidden;
		dl{
			float: left;
			width: 50px;
			border-right: 1px solid #ccc;
			border-top: 1px solid #ccc;
		}
		dt{
			width: 100%;
			height: 40px;
			line-height: 40px;
			margin: 0px;
			color: #666;
		}
		dd{
			font-size: 16px;
			font-weight: 600;
		}
		dl:last-child{
			border-right: none;
		}
	}
	.goods-info{
		float: left;
		width: 842px;
		margin-left: 30px;
		text-align: center;
		.title{
			width: 100%;
			height: 36px;
			line-height: 36px;
			border-bottom: 1px solid #ccc;
			div{
				float: left;
				width: 120px;
				cursor: pointer;
			}
			.active{
				background-color: #fff;
				color:#c71724;
			}
		}
	}
	.list-box{
		position: relative;
		width: 100%;
		height: 200px;
		.left-btn,.right-btn{
			width: 24px;
			height: 60px;
			position: absolute;
			top: 0px;
			bottom: 0px;
			margin-top: auto;
			margin-bottom: auto;
			z-index: 10;
			cursor: pointer;
			i{
				font-size: 32px;
				line-height: 56px;
			}
		}
		.left-btn{
			left: -32px;
		}
		.right-btn{
			right: -28px;
		}
		ul{
			position: absolute;
			overflow: hidden;
		}
		li{
			float: left;
			width: 169px;
			height: 198px;
			padding: 10px;
			margin-right: -1px;
			border-right: 1px solid #ccc;
			dl{
				width: 100%;
			}
			dt{
				width: 150px;
				height: 150px;
				img{
					width: 100%;
					height: 100%;
					cursor: pointer;
				}
			}
			dd{
				margin-top: 6px;
				line-height: 28px;
				span{
					font-size: 16px;
					font-weight: 600;
				}
				em{
					text-decoration: line-through;
					font-size: 14px;
				}
			}
		}
		li:last-child{
			margin-right: -1px;
		}
	}
	.viewList:first-child{
		margin-top: 20px;
	}
</style>