<template>
	<div class="wrap">
		<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" label-position='right'>
			<div class="reg_box">
				<div class="title">新增收货地址</div>
				<el-form-item label="所在地区" prop='area'>
					<el-row class="area">
						<el-col>
							<select v-model="ruleForm.province" @change='setOption("proIndex",$event)'>
							<option value='' disabled selected style='display:none;'>省</option>
			                    <option
			                      v-for="(item,index) in proArr"
			                      :label="item.name"
			                      :value="index" :key='index'>
			                    </option>
			                 </select>
						</el-col>
						<el-col style='margin-left: 14px;'>
							<select v-model="ruleForm.city" @change='setOption("cityIndex",$event)'>
							<option value='' disabled selected style='display:none;'>市</option>
			                    <option
			                      v-for="(item2,index2) in cityArr"
			                      :label="item2.name"
			                      :value="index2" :key='index2'>
			                    </option>
			                 </select>
						</el-col>
						<el-col style='margin-left: 14px;'>
							<select v-model="ruleForm.district" @change='setOption("areaIndex",$event)'>
							<option value='' disabled selected style='display:none;'>区</option>
			                    <option
			                      v-for="(item3,index3) in areaArr"
			                      :label="item3.name"
			                      :value="index3" :key='index3'>
			                    </option>
			                 </select>
						</el-col>
					</el-row>
				</el-form-item>
				<el-form-item label="详细地址" prop='address'>
				    <el-input v-model="ruleForm.address" type='textarea' :autosize="{ minRows: 2, maxRows: 4}"  placeholder="请您如实填写详细收货地址，如街道、小区名、所在楼层、门派号码等"></el-input>
				</el-form-item>
				<el-form-item label="邮政编码">
				    <el-input v-model="ruleForm.postcode" size='small'></el-input>
				</el-form-item>
				<el-form-item label="收货人姓名" prop='name'>
				    <el-input v-model="ruleForm.name" size='small'></el-input>
				</el-form-item>
				<el-form-item label="手机号码" prop='phone'>
				    <el-input v-model="ruleForm.phone" size='small'></el-input>
				</el-form-item>
				<el-form-item label="固定电话">
				    <el-input v-model="ruleForm.tel" size='small'></el-input>
				</el-form-item>
				<el-form-item>
				  	<el-checkbox v-model='setDefault'>设为默认收货地址</el-checkbox>
				</el-form-item>
			</div>
			<div style="width:300px;margin:20px 100px 70px;">
			    <el-button type="primary" @click="submitForm('ruleForm')" style='width:178px;' :disabled='!(ruleForm.province!==""&&ruleForm.city!==""&&ruleForm.address&&ruleForm.name&&ruleForm.phone)'>保存</el-button>
			</div>	  
		</el-form>
	</div>
</template>
<script>
import {saveAddress,linkage} from '../../common/js/api'
import {errorInfo,getCookie} from '../../common/js/common'
import {userInfo} from '../../common/js/mixins'
import {MessageBox} from  'element-ui'
  export default {
    data() {
    	// 地区选择
	     var checkArea = (rule,value,callback) => {
	     	if (this.ruleForm.province === "") {
	     		callback(new Error('请选择省份或直辖市'));
	     	} else if (this.ruleForm.city === '') {
	     		callback(new Error('请选择地级市或地区'));
	     	} else {
	     		if (this.areaArr.length) {
	     			if (this.ruleForm.district === "") {
	     				callback(new Error('请选择地区'));
	     			} else {
	     				callback();
	     			}
	     		} else {
	     			callback();
	     		}
	     	} 
	     };
	     // 手机验证
    	 var checkPhone = (rule, value, callback) => {
    	 	if (value === ''){
    	 		callback(new Error('请输入手机号'));
    	 	} else {
    	 		let reg = /^1[3|4|5|7|8][0-9]\d{8}$/ ;
		        if ( !reg.test(value)) {
		          callback(new Error('请输入正确手机号'));
		        } else{
		        	callback();
		        }
    	 	}
	      };
      return {
      	userInfo: '',
      	setDefault: true,
      	proIndex: 0,
        cityIndex: 0,
        areaIndex: 0,
      	proArr: [],
      	cityArr: [],
      	areaArr: [],
       	ruleForm: {
	        province: '',
	        city: '',
	        district: '',
	        name: '',
	        phone: '',
	        address: '',
	        postcode: '',
	        tel: ''
        },
        rules: {
          area: [
            { required: true, validator: checkArea, trigger: 'blur' }
          ],
          address: [
            { required: true, message: '请输入详细地址', trigger: 'blur' }
          ],
          name: [
            { required: true, message: '请输入收货人姓名', trigger: 'blur' }
          ],
          phone: [
            { required:true, validator: checkPhone, trigger: 'blur' }
          ]
        }
      };
    },
    mixins: [userInfo],
    methods: {
    	getLinkage(mask,id){
    		let params = {
    			pid: id
    		}
    		linkage(params).then(res=>{
    			let {errcode,message,content} = res ;
            	if (errcode !== 0 ) {
            		errorInfo(errcode,message) ;
            	} else {
            		if (mask==='pro') {
            			this.proArr = content ;
            			this.cityArr= [];
            			this.areaArr = [];
            		}else if (mask==='city'){
            			this.cityArr = [] ;
            			this.cityArr = content; 
            		}else if (mask=== 'area'){
            			this.areaArr = [] ;
            			this.areaArr = content;
            		}
            	}
    		})
    	},
	    setOption(type,event){
             if(type === 'proIndex'){
             	this.proIndex = event.target.selectedIndex-1;
                this.cityIndex = 0;
                this.areaIndex = 0;
                this.ruleForm.city = '';
	    		this.ruleForm.district= '';
	    		this.getLinkage('city',this.proArr[this.proIndex].zone_id);
            }
            if(type === 'cityIndex'){
            	this.cityIndex = event.target.selectedIndex-1;
                this.areaIndex = 0;
                this.ruleForm.district= '';
                this.getLinkage('area',this.cityArr[this.cityIndex].zone_id);
            }
            if(type === 'areaIndex'){
            	this.areaIndex = event.target.selectedIndex -1;
            }
        },
      	submitForm(formName) {
	        this.$refs[formName].validate((valid) => {
	          if (valid) {
	            let params = {
	            	access_token: getCookie('access_token') ,
	            	address_id: '',
	            	province: this.proArr[this.proIndex].name,
	            	city: this.cityArr[this.cityIndex].name,
	            	district: this.areaArr[this.areaIndex].name,
	            	name: this.ruleForm.name,
	            	phone: this.ruleForm.phone,
	            	status:this.setDefault?"1":"0",
	            	address: this.ruleForm.address,
	            	postcode: this.ruleForm.postcode,
	            	tel: this.ruleForm.tel
	            };
	            saveAddress(params).then(res=>{
	            	let {errcode,message} = res ;
	            	if (errcode !== 0 ) {
	            		errorInfo(errcode,message) ;
	            	} else {
	            		MessageBox.alert('新增地址添加成功', '提示', {
				          confirmButtonText: '确定',
				          type: 'success'
				        });
				        let setDefault = this.setDefault ;
				        this.$emit('initList',setDefault);
	            		// 初始化表单信息
	            		this.getLinkage('pro');
	            		this.ruleForm.province = '';
	            		this.ruleForm.city = '';
	            		this.ruleForm.district = '';
	            		this.ruleForm.name = '';
	            		this.ruleForm.phone='';
	            		this.ruleForm.address='';
	            		this.ruleForm.postcode ='';
	            	    this.ruleForm.tel ='';

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
    },
    created(){
        this.$nextTick(()=>{
        	this.$nextTick(()=>{
				let access_token = getCookie('access_token') ;
				if (!access_token) {
					location.href = 'login.html' ;
				}else{
					this.getLinkage("pro","")
				}
			})
        })
    }
  }
</script>
<style lang='scss' scoped>
	.title{
	    font-size: 14px;
	    font-weight: 600;
	    line-height: 20px;
	    margin-bottom: 10px;
	    color: #c71724;
	}
	.el-form{
		width: 400px;
		margin-top: 40px;
		.area{
			overflow: hidden;
			padding-top: 4px;
		}
		.el-col{
			float: left;
			width: 90px;
		    select{
		    	background-color: #fff;
			    background-image: none;
			    border-radius: 4px;
			    border: 1px solid rgb(217, 193, 191);
			    box-sizing: border-box;
			    color: rgb(61, 33, 31);
			    display: block;
			    font-size: inherit;
			    height: 30px;
			    line-height: 1;
			    outline: none;
			    padding: 3px 10px;
			    transition: border-color .2s cubic-bezier(.645,.045,.355,1);
			    width: 100%;
		    }
		}
		.el-form-item{
			margin-bottom: 16px;
		}
	}
</style>