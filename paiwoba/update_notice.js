var ua = window.navigator.userAgent.toLocaleLowerCase();
var oUpdate = document.getElementById('update');
var oClose = document.getElementById('close-zha-box');
if(window.addEventListener){
	oUpdate.style.display = 'none';
}else{
	if(getCookie('updateClose')){
		oUpdate.style.display = 'none';
	}else{
		oUpdate.style.display = 'block';
		oClose.onclick = function(){
			addCookie('updateClose',true,7);
			oUpdate.style.display = 'none';
		};
	}
}

//cookie设置
function addCookie(name,value,iDay){
	var oDate=new Date();
	oDate.setDate(oDate.getDate()+iDay);
	document.cookie=name+'='+value+';path=/;expires='+oDate.toGMTString();
}


//cookie的读取
function getCookie(name){
	var arr=document.cookie.split('; ');
	for(var i=0; i<arr.length; i++){
		var arr2=arr[i].split('=');
		if(arr2[0]==name){
			return arr2[1];	
		}
	}
	return '';
}
