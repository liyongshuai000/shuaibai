<template>
	<div class="wrap">
		<h4 class='color-6'><span @click='changeView("view10")'>我的帅柏</span>&nbsp;<i>&gt;</i>&nbsp;<span>话费/流量充值</span></h4>
		<div class="color-6 f5-bg title">
	 		<i class="primary-bg icon"></i>
	 		<span style="vertical-align: 4px;">话费/流量充值明细</span>
	 	</div>
	 	<table border='1' cellpadding="10" cellspacing="0" class="table">
	 		<tr class="f5-bg">
	 			<th>日期</th>
	 			<th>充值账号</th>
	 			<th>充值状态</th>
	 			<th>充值金额</th>
	 			<th>充值类型</th>
	 			<th>充值订单</th>
	 		</tr>
	 		<tr  v-for='item in orderList'>
	 			<td>{{item.date_add*1000 | dateStyle}}</td>
	 			<td>{{item.mobile}}</td>
	 			<td :class='{"color-primary":item.is_success==="2"}'>
	 				{{item.is_success==="2"?"支付失败":"支付成功"}}
 				</td>
	 			<td :class='{"color-primary":item.is_success==="2"}'>
	 				{{item.total_fee|currency}}
 				</td>
	 			<td>{{item.type==="1"?"话费":"流量"}}</td>
	 			<td>支付订单&nbsp;&nbsp;{{item.order_sn}}</td>
	 		</tr>
	 	</table>
	 	<pagination :pagesize='pagesize' @changePage='changePage' ref='pagination'></pagination>
	</div>
</template>
<script>
import {dateStyle,currency} from '../../common/js/filter'
import {mobileOrders} from '../../common/js/api'
import {errorInfo,getCookie} from '../../common/js/common'
import pagination from '../Common/pagination'
  export default {
    data() {
      return {
      	orderList: null,
      	page: "1",
      	pagesize: 1,
      };
    },
    filters:{
    	dateStyle,currency
    },
    components:{
		pagination
	},
    methods: {
    	changeView(view){
	      	 this.$store.commit('switchView',view);
	      	 location.hash = view ;
	    },
	     // 改变页数
		changePage(page){
			this.page = page + "" ;
			this.initList();
		},
		initList(){
			let params  ={
				access_token: getCookie('access_token'),
				page: this.page
			}
			mobileOrders(params).then(res=>{
				let {errcode,message,content} = res ;
				if(errcode !== 0){
					errorInfo(errcode,message) ;
				}else {
					this.orderList = content.orders;
					this.pagesize = content.pageSize; 
				}
			})
		}
    },
    mounted(){
    	this.$nextTick(()=>{
    		// 是否含有‘猜你喜欢’
    		this.$emit('hasGuess',false);
    		this.initList();
    	})
    }
  }
</script>
<style lang='scss' scoped>
	.wrap{
		width: 1030px;
		h4{
			line-height: 40px;
			font-weight: 400;
			border-bottom: 1px solid #ccc;
			span{
				cursor: pointer;
			}
			i{
				color: #b0b0b0;
			}
		}
	}
	.title{
		width: 100%;
		height: 40px;
		padding: 10px;
		line-height: 20px;
		margin-top: 20px;
		.icon{
			display: inline-block;
			width: 8px;
			height: 20px;
		}
		span{
			font-size: 16px;
			font-weight: 600;
		}
	}
	.table {
          width: 100%;
          margin-top: 18px;
          border-collapse:collapse;
          th,td{
          	font-size: 14px;
          	border: 1px solid #dfe6ec;
          	text-align: center;
          }
	}
</style>