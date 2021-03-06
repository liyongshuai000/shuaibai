import axios from 'axios'

let base = process.env.API_ROOT;
// let base = 'http://app.shuaibomall.net/web';
export {base};
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.headers.get['Content-Type'] = 'application/x-www-form-urlencoded';



const trans = params => {
    // Do whatever you want to transform the data
    let ret = ''
    for (let it in params) {
      ret += encodeURIComponent(it) + '=' + encodeURIComponent(params[it]) + '&'
    }
    return ret ;
  }
// 注册
export const reg = params => {
	params = trans(params);
	return axios.post(`${base}/customerAction/register`,params).then( res => res.data);
}
// 注册协议
export const  getBaseData = () =>{
	return axios.get(`${base}/initAction/getBaseData`).then(res=>res.data);
}
// 完善信息
export const  perInfomation = params =>{
	params = trans(params);
	return axios.post(`${base}/customerAction/perInfomation`,params).then(res=>res.data); 
}

// 发送验证码 
export const sendCode = params =>{
	params = trans(params);
	return axios.post(`${base}/customerAction/sendCode`,params).then( res=> res.data);
}

// 登录
export const login = params =>{
	params = trans(params);
	return axios.get(`${base}/customerAction/login?`+params).then( res=> res.data);
}
// 登录广告
export const getLoginAd= params =>{
	params = trans(params) ;
	return axios.post(`${base}/AdvertisementAction/getLoginAd`,params).then(res=>res.data) ;
}

//  生成验证码token
export const createToken = ()=> {
	return axios.get(`${base}/customerAction/createToken`).then(res=>res.data);
}


// 忘记密码
export const resetPasswd = params => {
	params = trans(params) ;
	return axios.post(`${base}/customerAction/resetPasswd`,params).then(res => res.data);
}


// 首页
// 关键列表
export const getKeyWord = ()=>{
	return axios.get(`${base}/initAction/getKeyWord`).then(res=>res.data);
}
// 轮播图标签
export const getHomePage = params => {
	params = trans(params);
	return axios.post(`${base}/initAction/getHomePage`,params).then( res=> res.data);
}
// 首页资讯
export const getHomeInformations = () =>{
	return axios.post(`${base}/initAction/getHomeInformations`).then(res=>res.data) ;
}
// 手机面额充值
export const  getActualFee = params =>{
	params = trans(params);
	return axios.get(`${base}/MobileRechargeAction/getActualFee?${params}`).then(res=>res.data )
}
// 手机充值
export const mobileRecharge = params =>{
	params = trans(params);
	return axios.post(`${base}/MobileRechargeAction/recharge`,params).then(res=>res.data);
}
// 充值支付
export const rechargePay = params =>{
	params = trans(params) ;
	return axios.post(`${base}/MobileRechargeAction/pay`,params).then(res=>res.data) ;
}
// 每日上新
export const getNewGoods = params => {
	params = trans(params);
    return axios.get(`${base}/initAction/getNewGoods?${params}`).then(res=> res.data);
}
// 分类
export const getCategory = () => {
	return axios.get(`${base}/initAction/getCategory`).then(res=> res.data);
}
// 专题活动
export const  getActivity = ()=>{
	return axios.get(`${base}/initAction/getActivity`).then(res=>res.data);
}
// 获取首页分类商品
export const getCategoryGoods = params =>{
	params = trans(params);
	return axios.post(`${base}/initAction/getCategoryGoods`,params).then(res=>res.data);
}
// 猜你喜欢
export const getGuessLike = params =>{
	params = trans(params);
	return axios.get(`${base}/goodsAction/getGuessLike?${params}`).then(res=>res.data);
}
// 关键词搜索
export const goodsList = params =>{
	params = trans(params);
	return axios.get(`${base}/goodsAction/goodsList?${params}`).then(res=>res.data);
}
// 专题活动 
export const  getThematicActivities = params =>{
	params = trans(params);
	return  axios.get(`${base}/specialAction/getThematicActivities?${params}`).then(res=>res.data) ; 
}

// 个人中心
// 获取用户信息
export const getUserInfo = params =>{
	params = trans(params);
	return axios.post(`${base}/userAction/getUserInfo`,params).then(res=>res.data);
}
// 修改交易商账号
export const changeDealer = params =>{
	params = trans(params) ;
	return axios.post(`${base}/userAction/changeDealer`,params).then(res=>res.data) ; 
}
// 获取未读消息数量
export const getMessageCount = params =>{
	params = trans(params) ;
	return axios.post(`${base}/MessageAction/getMessageCount`,params).then(res=>res.data) ; 
}
// 保存地址
export const saveAddress = params =>{
	params = trans(params);
	return axios.post(`${base}/addressAction/saveAddress`,params).then(res=>res.data);
}
// 获取地址选择列表
export const linkage = params =>{
	params = trans(params);
	return axios.post(`${base}/addressAction/getAddressList`,params).then(res=>res.data);
}
// 获取地址列表
export const getAddress = params =>{
	params = trans(params);
	return axios.post(`${base}/addressAction/getAddress`,params).then(res=>res.data);
}
// 删除地址
export const delAddress = params =>{
	params = trans(params);
	return axios.post(`${base}/addressAction/delAddress`,params).then(res=>res.data);
}
// 设置默认地址
export const defaultAddress = params =>{
	params = trans(params);
	return axios.post(`${base}/addressAction/defaultAddress`,params).then(res=>res.data);
}
// 获取单个地址
export const getOneAddress = params =>{
	params = trans(params);
	return axios.post(`${base}/addressAction/getOneAddress`,params).then(res=>res.data);
}
// 修改密码
export const modifyPassword = params =>{
	params = trans(params) ;
	return axios.post(`${base}/userAction/modifyPassword`,params).then(res=>res.data);
}
// 添加绑定手机
export const phoneBind = params =>{
	params = trans(params);
	return axios.post(`${base}/userAction/phoneBind`,params).then(res => res.data);
}
// 更改绑定手机号
export const changePhoneBind = params =>{
	params =trans(params);
	return axios.post(`${base}/userAction/changePhoneBind`,params).then(res=> res.data);
}
// 添加绑定邮箱
export const bindEamil = params =>{
	params = trans(params) ;
	return axios.post(`${base}/customerAction/bindEmail`,params).then(res=>res.data);
}
// 解绑邮箱
export const unbindEmail = params =>{
	params = trans(params) ;
	return  axios.post(`${base}/userAction/unbindEmail`,params).then(res=>res.data) ;
}
// 设置头像
export const changeAvater = params =>{
	params = trans(params);
	return  axios.post(`${base}/userAction/changeAvater`,params).then(res=>res.data);
}
// 设置用户名
export const changeUsername = params =>{
	params = trans(params);
	return axios.post(`${base}/userAction/changeUsername`,params).then(res=>res.data);
}
// 设置出生日期
export const changeBirthday = params =>{
	params = trans(params);
	return axios.post(`${base}/userAction/changeBirthday`,params).then(res=>res.data);
}
// 设置性别
export const changeSex = params => {
	params = trans(params);
	return axios.post(`${base}/userAction/changeSex`,params).then(res=>res.data);
}
// 订单列表
export const getOrders = params => {
	params = trans(params);
	return axios.post(`${base}/orderAction/getOrders`,params).then(res=>res.data); 
} 
// 话费流量充值列表
export const mobileOrders = params =>{
	params =  trans(params);
	return axios.post(`${base}/orderAction/mobileOrders`,params).then(res=>res.data);
}
// 实名认证
export const verifyRealname = params =>{
	params =  trans(params);
	return axios.post(`${base}/userAction/verifyRealname`,params).then(res=>res.data);
}
// 实名认证状态
export const verifyRealnameState = params =>{
	params =  trans(params);
	return axios.post(`${base}/userAction/verifyRealnameState`,params).then(res=>res.data);
}

// 商品收藏列表
export const collection = params =>{
	params = trans(params) ;
	return axios.post(`${base}/userAction/collection`,params).then(res=>res.data);
}
// 取消收藏
export const cancelCollections = params =>{
	params = trans(params);
	return axios.post(`${base}/userAction/cancelCollections`,params).then(res=>res.data);
}
// 我的关注
export const attention = params =>{
	params = trans(params);
	return axios.post(`${base}/userAction/attention`,params).then(res=>res.data);
}
// 取消关注
export const cancelAttentions = params =>{
	params = trans(params);
	return axios.post(`${base}/userAction/cancelAttentions`,params).then(res=>res.data);
}


// 我的足迹
export const footmark = params =>{
	params = trans(params);
	return axios.post(`${base}/userAction/footmark`,params).then(res=>res.data); 
}
// 删除足迹
export const delFoots = params =>{
	params = trans(params);
	return axios.post(`${base}/userAction/delFoots`,params).then(res=>res.data);
}

// 优惠券
// 获取优惠券
export const getCoupons = params => {
	params = trans(params);
	return axios.post(`${base}/userAction/getCoupons`,params).then(res=>res.data);
}

// 资金
// 充值
export const recharge = params =>{
	params = trans(params);
	return axios.post(`${base}/userAction/recharge`,params).then(res=>res.data);
}
// 资金明细
export const finance= params => {
	params = trans(params) ;
	return axios.post(`${base}/userAction/finance`,params).then(res=>res.data);
}
// 请求积分
export const integration = params => {
	params = trans(params);
	return axios.post(`${base}/userAction/integration`,params).then(res=>res.data);
}
// 积分明细
export const integrationDetail = params =>{
	params = trans(params);
	return axios.post(`${base}/userAction/integrationDetail`,params).then(res=>res.data);
}
// 请求购物积分
export const shoppingCoin = params =>{
	params = trans(params);
	return axios.post(`${base}/userAction/shoppingCoin`,params).then(res=>res.data);
} 
// 请求购物积分明细
export const shoppingCoinDetail = params =>{
	params = trans(params);
	return axios.post(`${base}/userAction/shoppingCoinDetail`,params).then(res=>res.data);
} 
// 购物积分明细
export const rewardDetail = params =>{
	params = trans(params) ;
	return axios.post(`${base}/userAction/rewardDetail`,params).then(res=>res.data);
}
// 鸿府积分明细
export const hongfuDetail = params =>{
	params = trans(params) ;
	return axios.post(`${base}/userAction/hongfuDetail`,params).then(res=>res.data);
}
// 钱包
export const rewardAmount = params =>{
	params = trans(params) ;
	return axios.post(`${base}/userAction/rewardAmount`,params).then(res=>res.data);
}
// 钱包明细
export const yuebaoDetail = params =>{
	params = trans(params) ;
	return axios.post(`${base}/userAction/yuebaoDetail`,params).then(res=>res.data);
}
// 钱包明细
export const yuebaoCharge = params =>{
	params = trans(params) ;
	return axios.post(`${base}/userAction/yuebaoCharge`,params).then(res=>res.data);
}
// 钱包转账
export const yuebaoTransfer = params =>{
	params = trans(params) ;
	return axios.post(`${base}/userAction/yuebaoTransfer`,params).then(res=>res.data);
}
// 余额和正常金额互转
export const yuebaoTransferIn = params =>{
	params = trans(params) ;
	return axios.post(`${base}/userAction/yuebaoTransferIn`,params).then(res=>res.data);
}
// 验证转账密码
export const verifyTransfer = params =>{
	params = trans(params) ;
	return axios.get(`${base}/userAction/verifyTransfer?${params}`).then(res=>res.data);
}

// 验证转账密码
export const yuebaoWithdraw = params =>{
	params = trans(params) ;
	return axios.get(`${base}/userAction/yuebaoWithdraw?${params}`).then(res=>res.data);
}
// 设置支付密码
export const setPayPasswd = params =>{
	params = trans(params) ;
	return axios.post(`${base}/customerAction/setPayPasswd`,params).then(res=>res.data);
}
// 设置支付密码
export const setTransferPasswd = params =>{
	params = trans(params) ;
	return axios.post(`${base}/customerAction/setTransferPasswd`,params).then(res=>res.data);
}
// 手续费比例
export const withdrawServiceFee = params =>{
	params = trans(params) ;
	return axios.post(`${base}/userAction/withdrawServiceFee`,params).then(res=>res.data);
}

// 查看下级
export const extendPerson = params =>{
	params = trans(params);
	return axios.post(`${base}/userAction/extendPerson`,params).then(res=>res.data);
}


// 购物车相关
// 添加购物车
export const addCart = params=>{
	params = trans(params);
	return axios.post(`${base}/cartAction/addCart`,params).then(res=>res.data)
}
// 获取购物车列表
export const getCarts= params=>{
	params = trans(params);
	return axios.post(`${base}/cartAction/getCarts`,params).then(res=>res.data);
}
// 删除
export const removeCart = params=>{
	params = trans(params);
	return axios.post(`${base}/cartAction/removeCart`,params).then(res=>res.data);
}
// 数量编辑
export const editCart= params=>{
	params = trans(params);
	return axios.post(`${base}/cartAction/editCart`,params).then(res=>res.data);
}
// 立即购买、结算
export const buy = params =>{
	params = trans(params);
	return axios.post(`${base}/orderAction/buy`,params).then(res=>res.data)
}

// 投诉
export const  complain = params =>{
	params = trans(params) ;
	return axios.post(`${base}/userAction/complain`,params).then(res=>res.data);
}

// 提现
export const withdraw =params =>{
	params = trans(params);
	return axios.post(`${base}/userAction/withdraw`,params).then(res=>res.data);
}

// 商家入驻
export const shopJoin = params =>{
	params = trans(params);
	return axios.post(`${base}/userAction/shopJoin`,params).then(res=>res.data);
}
// 店铺佣金
export const commission = params =>{
	params =  trans(params) ;
	return axios.post(`${base}/userAction/commission`,params).then(res=>res.data) ;
}
// 缴纳保证金
export const bail = params =>{
	params = trans(params); 
	return axios.post(`${base}/userAction/bail`,params).then(res=>res.data);
}
// 佣金明细
export const  commissionDetail = params =>{
	params =  trans(params);
	return axios.post(`${base}/userAction/commissionDetail`,params).then(res=>res.data) ;
}

// 物流消息
export const getExpressMessages = params =>{
	params = trans(params) ; 
	return axios.post(`${base}/messageAction/getExpressMessages`,params).then(res=>res.data) ;
}



// 商品详情
export const goodsDetail = params =>{
	params = trans(params);
	return axios.post(`${base}/goodsAction/goodsDetail`,params).then(res=>res.data);
}
// 选取地址查运费
export const getExpressFees = params =>{
	params = trans(params);
	return axios.post(`${base}/orderAction/getExpressFees`,params).then(res=>res.data);
}
// 精品推荐
export const getHighGoods = params =>{
	params = trans(params);
	return axios.post(`${base}/goodsAction/getHighGoods`,params).then(res=>res.data);
}
// 热销排行
export const getHotGoods = params =>{
	params = trans(params);
	return axios.get(`${base}/sellerAction/getHotGoods?${params}`).then(res=>res.data);
}
// 获取店铺推荐
export const getRecommend = params =>{
	params = trans(params);
	return axios.get(`${base}/goodsAction/getRecommend?${params}`).then(res=>res.data);
}
// 获取评价列表
export const getComments = params=>{
	params = trans(params);
	return axios.get(`${base}/goodsAction/getComments?${params}`).then(res=>res.data);
}
// 获取回复
export const replyContent = params =>{
	params = trans(params);
	return axios.get(`${base}/goodsAction/replyContent?${params}`).then(res=>res.data);
}
// 有用
export const usefulComment = params =>{
	params= trans(params);
	return axios.post(`${base}/goodsAction/usefulComment`,params).then(res=>res.data);
}
// 回复
export const replyComment = params=>{
	params = trans(params);
	return axios.post(`${base}/goodsAction/replyComment`,params).then(res=>res.data);
}
// 收藏、取消收藏
export const collectionGoods = params=>{
	params = trans(params);
	return axios.post(`${base}/goodsAction/collection`,params).then(res=>res.data);
}
// 关注店铺
export const addFollow= params=>{
	params =trans(params);
	return axios.post(`${base}/shopAction/addFollow`,params).then(res=>res.data);
}
// 取消关注
export const cancelFollow= params=>{
	params =trans(params);
	return axios.post(`${base}/shopAction/cancelFollow`,params).then(res=>res.data);
}
// 店铺信息
export const  getShopInfo= params =>{
	params = trans(params);
	return axios.get(`${base}/shopAction/getSellerInfo?${params}`).then(res=>res.data);
}
// 客服信息 
export const getKFInfo = () =>{
	return axios.post(`${base}/initAction/getKFInfo`).then(res=>res.data) ;
}

// 店铺详情
export const getSellerInfo =  params => {
	params = trans(params);
	return axios.get(`${base}/sellerAction/getSellerInfo?${params}`).then(res=>res.data); 
}

// 获取商家认证信息
export  const check_real_customer = params=>{
	params = trans(params);
	return axios.get(`${base}/userAction/check_real_customer?${params}`).then(res=>res.data);
}
// 商家认证
export const authentication = params =>{
	params = trans(params);
	return axios.post(`${base}/userAction/authentication`,params).then(res=>res.data);
}


// 订单相关
// 获取购买需要购买商品信息
export const buy_bal = params =>{
	params = trans(params);
	return axios.post(`${base}/orderAction/buy_bal`,params).then(res=>res.data);
}
// 获取运费
export const getExpressFee = params =>{
	params = trans(params);
	return axios.post(`${base}/orderAction/getExpressFee`,params).then(res=>res.data);
}
// 获取可用优惠券
export const orderCoupons = params =>{
	params = trans(params);
	return axios.post(`${base}/orderAction/getCoupons`,params).then(res=>res.data) ; 
}
// 确认订单
export const generate = params =>{
	params = trans(params);
	return axios.post(`${base}/orderAction/generate`,params).then(res=>res.data);
}
// 订单详情
export const getOrderDetail = params =>{
	params = trans(params);
	return axios.post(`${base}/orderAction/getOrderDetail`,params).then(res=>res.data);
}
//  取消订单
export const cancelOrder = params =>{
	params = trans(params);
	return  axios.post(`${base}/orderAction/cancelOrder`,params).then(res=>res.data);
}
// 支付
export const pay = params =>{
	params = trans(params);
	return axios.post(`${base}/orderAction/pay`,params).then(res=>res.data);
}
// 获取支付订单状态
export const  getOrderPayStatus = params =>{
	params = trans(params) ;
	return axios.post(`${base}/orderAction/getOrderPayStatus`,params).then(res=>res.data);
}
// 催一催(提醒发货)
export const orderRemind = params =>{
	params = trans(params);
	return axios.post(`${base}/orderAction/orderRemind`,params).then(res=>res.data); 
}
// 获取物流信息
export const express = params =>{
	params =  trans(params);
	return axios.post(`${base}/orderAction/express`,params).then(res=>res.data);
}
// 确认收货
export const  delivery = params =>{
	params = trans(params);
	return axios.post(`${base}/orderAction/delivery`,params).then(res=>res.data);
}
// 删除订单
export const delOrder = params => {
	params = trans(params);
	return axios.post(`${base}/orderAction/delOrder`,params).then(res=>res.data);
}
// 店铺可用优惠券
export const getShopCoupons = params =>{
	params = trans(params) ;
	return axios.post(`${base}/shopAction/getGoodsCoupons`,params).then(res=>res.data); 
}
// 领取优惠券
export const receiveCoupon = params =>{
	params = trans(params);
	return axios.post(`${base}/shopAction/receiveCoupon`,params).then(res=>res.data) ;
}

// 售后
// 评论
export const commentGoods =params =>{
	params = trans(params);
	return axios.post(`${base}/orderAction/commentGoods`,params).then(res=>res.data);
}
// 获取订单评论
export const getCommnets = params =>{
	params =  trans(params) ;
	return axios.post(`${base}/orderAction/getCommnets`,params).then(res=>res.data);
}
// 追加评论
export const addComment = params =>{
	params = trans(params);
	return axios.post(`${base}/orderAction/addComment`,params).then(res=>res.data);
}
// 申请退款退货 换货 维修
export const refund = params =>{
	params = trans(params) ;
	return axios.post(`${base}/orderAction/refund`,params).then(res=>res.data) ;
}
// 获取退款列表
export const getRefunds = params =>{
	params = trans(params);
	return axios.post(`${base}/orderAction/getRefunds`,params).then(res=>res.data);
}
// 申请售后商品信息
export const getRefundInfo = params =>{
	params = trans(params);
	return axios.post(`${base}/orderAction/getRefundInfo`,params).then(res=>res.data); 
}
// 售后详情
export const supportDetail =params =>{
	params = trans(params) ;
	return axios.post(`${base}/orderAction/supportDetail`,params).then(res=>res.data); 
}
// 售后信息
export const refundGoods =params =>{
	params = trans(params) ;
	return axios.post(`${base}/orderAction/refundGoods`,params).then(res=>res.data); 
}
// 修改申请
export const changeRefund = params =>{
	params = trans(params);
	return axios.post(`${base}/orderAction/changeRefund`,params).then(res=>res.data);
}
// 撤销申请
export const revokerRefund = params =>{
	params = trans(params) ;
	return axios.post(`${base}/orderAction/revokerRefund`,params).then(res=>res.data);
}
// 获取物流信息
export const getExpress = params =>{
	params = trans(params);
	return axios.post(`${base}/orderAction/getExpress`,params).then(res=>res.data);
}
// 填写、修改退货
export const writeReturnNote = params =>{
	params = trans(params);
	return axios.post(`${base}/orderAction/writeReturnNote`,params).then(res=>res.data) ;
}
// 留言
export const refundMessage = params => {
	params = trans(params);
	return  axios.post(`${base}/orderAction/refundMessage`,params).then(res=>res.data);
}
// 催一催
export const refundRemind = params =>{
	params = trans(params) ;
	return axios.post(`${base}/orderAction/refundRemind`,params).then(res=>res.data) ; 
}


// 资讯
export const getInformations = params =>{
	params = trans(params); 
	return axios.post(`${base}/initAction/getInformations`,params).then(res=>res.data); 
}
//资讯详情
export const getInformationsDetail = params =>{
	params = trans(params); 
	return axios.post(`${base}/initAction/getInformationsDetail`,params).then(res=>res.data) ;
}


// 底部链接
// 购物流程
export const b_buy_process =()=>{
	return axios.post(`${base}/BottomAction/buy_process`).then(res=>res.data);
}
// 售后服务
export const b_after_sale =()=>{
	return axios.post(`${base}/BottomAction/after_sale`).then(res=>res.data);
}
// 退款说明
export const b_refund_info =()=>{
	return axios.post(`${base}/BottomAction/refund_info`).then(res=>res.data);
}
// 返修/退换货
export const b_return_goods =()=>{
	return axios.post(`${base}/BottomAction/return_goods`).then(res=>res.data);
}
// 取消订单
export const b_cancel_order =()=>{
	return axios.post(`${base}/BottomAction/cancel_order`).then(res=>res.data);
}
// 七天无理由
export const b_seven_day =()=>{
	return axios.post(`${base}/BottomAction/seven_day`).then(res=>res.data);
}
