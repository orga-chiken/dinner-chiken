//params  对象的属性，要传一个属性过来
function parseParams(params){
	var str = '?';
	for(var key in params){
		if(params[key] === undefined || params[key] === null || params[key] === ''){
			continue;
		}
		str += key + '=' + params[key] + '&';
	}
	return str + '_s=0';
}

var Api = {
	// 登陆
    login : function(params, cb,ecb) {
        var url = "/users/login/";
        ajax(url, JSON.stringify(params), "POST", cb, ecb);
    },








	// 获取管理员下所有用户签到信息
	getAllUsers : function(cb,ecb) {
		var url = "/visits/team/checkins";
		get(url,cb,ecb);
	},

	// 获取管理员下所有用户拜访信息
	getAllUserVisits : function(cb,ecb) {
		var url = "/visits/team/records";
		get(url,cb,ecb);
	},

	// 查询用户拜访详情
	getUserVisitDetails : function(recordId,correspondingCustomerId,cb,ecb) {
		var url = "/visits/records/" + recordId +"?correspondingCustomerId="+correspondingCustomerId;
		get(url,cb,ecb);
	},



	// 获取验证码
	getVerifcode : function(mobile,cb,ecb) {
		var url = "/users/verifyCode/"+mobile;
		get(url,cb,ecb);
	},

	// 验证码登录
	verifcodeLogin : function(openId,params,cb,ecb) {
		var url = "/users/verifycode/signin/"+openId;
		ajax(url, JSON.stringify(params), "POST", cb, ecb);
	},

	//首次根据code获取跳转链接
	getFirstRedirectUrl : function(code ,cb ,ecb) {
		var url = "/users/code/" + code;
		get(url ,cb ,ecb);
	},

	//根据token获取跳转链接
	getRedirectUrlByToken : function(cb ,ecb) {
		var url = "/users/sign";
		get(url ,cb ,ecb);
	}
};
