var currentAjax = null;


var config = {
	"protocol": "http",
	"server": "localhost",
	"port": "8080",
	"virtualDirectory": "/m416",
	"versionUrl": "/api/v1"
};




/**
 * 接口url
 */
var getBaseUrl = function(){
	return config.protocol + "://" + config.server + ":" + config.port + "/" + config.virtualDirectory + config.versionUrl;
};



/**
 * ajax for Default
 */
function get(url, callback, errorCallback, callback3) {
	ajax(url, null, "GET", callback, errorCallback, callback3);
}

/**
 * ajax with requestData & requestType
 */
function ajax(url, requestData, requestType, callback, errorCallback, callback3) {
	url = getBaseUrl() + url;
	if (requestType == null || requestType.toString().trim().length == 0) {
		requestType = "GET";
	}
	currentAjax = $.ajax({
		async: true,
		cache: false,
		data: requestData,
		dataType: "json",
		contentType: "application/json; charset=utf-8",
		url: url,
		type: requestType,
		success: function(data) {
			if (callback) {
				callback(data);
			}
		},
		error: function(error) {
			if (error.status == 200 || error.responseText == "" || error.responseText == null) {
				if (error.status == 200) {
					if (callback) {
						callback(error);
					}
				}
				return;
			}
			if(error.status == 404){
				return;
			}
			if(error.status == 401 || error.status == 4011 || error.status == 4012 || error.status == 4013){
				location.href = "../sales_representative/loading.html"
			}
			if (errorCallback) {
				errorCallback(error);
			}
			console.log((error))
		},
		complete: function() {
			if (callback3) {
				callback3();
			}
		}
	});
}

function stopAjax() {
	//如若上一次AJAX请求未完成，则中止请求
	if (currentAjax) {
		currentAjax.abort();
	}
}

/**
 * Convert Date by time stamp
 */
function convertDateByTimeStamp(nS) {
	nS = nS + "";
	var date;
	if (nS.length == 13) {
		date = new Date(parseInt(nS));
	} else {
		date = new Date(parseInt(nS) * 1000);
	}
	var year = date.getFullYear();
	var month = date.getMonth() + 1;
	var day = date.getDate();
	var hour = date.getHours();
	var minute = date.getMinutes();
	return year + "-" + month + "-" + day + " " + getLength2(hour) + ":" + getLength2(minute);
}

function getLength2(number) {
	return number < 10 ? "0" + number : number + "";
}