<template>
	<div class="wrap">
		<div class="img-box">
			<img src="../../../static/loginImg/success.png" height="230" width="430">
		</div>
		<div style='width:100%;height:80px;line-height: 80px;text-align: center;'>
			<strong style="font-size: 16px;font-weight: 600;">注册成功，{{time}}s后自动返回商城首页</strong>
		</div>
		<div class="btn-box">
			<a href="index.html">
				<el-button type='primary'>立即返回</el-button>
			</a>
		</div>
	</div>
</template>
<script>
export default {
  	data() {
  		return {
  			time: 5
  		}
  	},
  	mounted(){
  		this.$nextTick(()=>{
  			let timer = setInterval(()=>{
  				this.time-- ;
  				if (this.time === 0) {
  					clearInterval(timer);
  					location.href = 'index.html'
  				}
  			},1000)
  		})
  	}
}
</script>
<style lang='scss' scoped>
	.wrap{
		width: 430px;
		height: 546px;
		margin: 70px auto 0px;
	    .img-box{
	    	width: 100%;
	    	height: 230px;
	    	img{
	    		width: 100%;
	    		height: 100%;
	    	}
	    }
	    .btn-box{
	    	margin-top: 20px;
	    	width: 100%;
	    	text-align: center;
	    	button{
	    		width: 140px;
	    	}
	    }
	}
</style>