<template>
	<div class="wrap">
		<h4 class='color-6'><span @click='changeView("view10")'>我的帅柏</span>&nbsp;<i>&gt;</i>&nbsp;<span @click='changeView("view12")'>手机绑定</span>&nbsp;<i>&gt;</i>&nbsp;<span @click='changeView("view121")'>更改绑定</span></h4>
		<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" label-position='left'>
		<div class="reg_box">
			<el-form-item label="当前手机号" style='padding-left: 17px;'>
			    	<span v-text='userInfo.real_phone'></span>
			</el-form-item>
			<el-form-item label="短信验证码 " prop="code">
			    <el-input v-model="ruleForm.code" style='width:178px;'></el-input>
			    <el-button type='primary' style='float: right;width:110px;padding:10px;text-align:center;' @click='send_code(0)' v-text='send_btn' :disabled='time>=0'></el-button>
			</el-form-item>
			<el-form-item label="新手机号" prop="phone">
			    <el-input v-model="ruleForm.phone" type="text"></el-input>
			</el-form-item>
			<el-form-item label="短信验证码 " prop="code">
			    <el-input v-model="ruleForm.newcode" style='width:178px;'></el-input>
			    <el-button type='primary' style='float: right;width:110px;padding:10px;text-align:center;' @click='send_code(1)' v-text='send_btn2' :disabled='time2>=0'></el-button>
			</el-form-item>
		</div>
		<div style="width:500px;margin:50px 100px;">
		    <el-button type="primary" @click="submitForm('ruleForm')" style='width:178px;' :disabled='!(ruleForm.phone&&ruleForm.code&&ruleForm.newcode)'>确认添加</el-button>
		</div>	  
	</el-form>
	</div>
</template>
<script>
import {changePhoneBind,sendCode} from '../../common/js/api'
import {errorInfo,getCookie} from '../../common/js/common'
import {userInfo} from '../../common/js/mixins'
import {MessageBox} from  'element-ui'
import {hex_md5} from '../../common/js/md5'
  export default {
    data() {
    	// 手机验证
    	 var checkPhone = (rule, value, callback) => {
    	 	if (value === ''){
    	 		callback(new Error('请输入手机号'));
    	 	} else {
    	 		let reg = /^1[3|4|5|7|8][0-9]\d{4,8}$/ ;
		        if ( !reg.test(value)) {
		          callback(new Error('请输入正确手机号'));
		        } else{
		        	callback();
		        }
    	 	}
	      };
	      // 验证码验证
	    var checkCode = (rule, value, callback) => {
	    	if (value === '') {
	    		callback(new Error('请输入验证码'));
	    	} else {
	    		if (value !== this.ruleForm.code) {
		    		callback(new Error('请输入正确验证码'));
		    	} else {
		    		callback();
		    	}
	    	}
	    	
	    };
      return {
      	userInfo:{
      		real_phone: ''
      	},
        ruleForm: {
            phone: '',
            code: '',
            newcode: ''
        },
        rules: {
          phone: [
            { required: true, validator: checkPhone, trigger: 'blur' }
          ],
          code: [
            { required: true, validator: checkCode, trigger: 'blur' }
          ]
        },
        time: -1 ,
        time2: -1,
        total_time: 60, 
        send_btn: '发送验证码',
        send_btn2: '发送验证码'
      };
    },
    mixins: [userInfo],
    methods: {
    	timeInterval(mark){
    		if (mark) {
    			this.time2 = this.total_time ;
	  			let timer = setInterval(()=>{
		      		this.time2--;
		      		this.send_btn2 = this.time2 + 's后重新发送';
		      		if (this.time2 < 0) {
		      			this.time2 = -1;
		      			this.send_btn2 = '发送验证码';
		      			clearInterval(timer);
		      		}
		      	},1000)
    		}else{
    			this.time = this.total_time ;
	  			let timer = setInterval(()=>{
		      		this.time--;
		      		this.send_btn = this.time + 's后重新发送';
		      		if (this.time < 0) {
		      			this.time = -1;
		      			this.send_btn = '发送验证码';
		      			clearInterval(timer);
		      		}
		      	},1000)
    		}
    		
    	},
    	send_code(mark){
	      	let time = parseInt(new Date()/1000) +"";
	      	let sign ;
	      	let params = {
	      		type: '9',
	      		time: time
	      	};
	      	if (mark) {
	      		params.param = this.ruleForm.phone ;
	      		sign = `content=ShuaiBo2017&param=${this.ruleForm.phone}&time=${time}&type=9`;
	      	}else {
	      		params.param = this.userInfo.real_phone ;
	      		sign = `content=ShuaiBo2017&param=${this.userInfo.real_phone}&time=${time}&type=9`;
	      	}
	      	params.sign = hex_md5(sign);
	      	sendCode(params).then( res=>{
	      		let {errcode,message} = res ;
	      		if (errcode !== 0) {
	      		    errorInfo(errcode,message) ;
	      		} else {
	      			this.timeInterval(mark)
	      		}
	      	});
	    },
	    changeView(view){
	      	 this.$store.commit('switchView',view);
	    },
      	submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let params = {
            	access_token: getCookie('access_token'),
            	phone: this.userInfo.real_phone,
            	code: this.ruleForm.code,
            	newphone: this.ruleForm.phone,
            	newcode: this.ruleForm.newcode
            };
            changePhoneBind(params).then(res=>{
            	let {errcode,message} = res ;
            	if (errcode !== 0 ) {
            		errorInfo(errcode,message) ;
            	} else {
            		MessageBox.alert(message, '提示', {
			          	confirmButtonText: '确定',
			          	callback: action => {
				            this.$store.commit('switchView','view10');
				        }
				    });
            	}
            })
          } else {
            MessageBox.alert('请完成必填信息', '提示', {
		          confirmButtonText: '确定'
		        });
            return false;
          }
        });
      }
    }
  }
</script>
<style lang='scss' scoped>
	.wrap{
		width: 100%;
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
		.el-form{
			width: 400px;
			margin-top: 40px;
		}
	}
</style>