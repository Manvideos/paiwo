if(typeof (window.addEventListener) =='undefined'){
	$('#highCSS').remove();
	$(document).ready(function($){
		var oBody = document.getElementsByTagName('body')[0];
		oBody.style.overflowY = 'auto';
	});
}else if(window.navigator.userAgent.toLocaleLowerCase().indexOf('msie 9.0')!=-1){
	$(document).ready(function($){
		$('.down-arrow').hide();
		$('.dian').hide();
		var oBody = document.getElementsByTagName('body')[0],
			_h = document.documentElement.clientHeight;
		oBody.style.overflowY = 'auto';
		var _block = $('.scroll_block');
		for(var i=0;i<_block.length;i++){
			_block[i].style.height =  _h +'px';
		}
		$('.header-middle_p').css('opacity',1);
		$('.one_span1').css({'opacity':1,'margin-top':0});
		$('.one_span2').css({'opacity':1,'margin-top':0});
		$('.one_span3').css({'opacity':1,'margin-top':0});
		$('.two_span1').css({'opacity':1,'margin-top':0});
		$('.two_span2').css({'opacity':1,'margin-top':0});
		$('.two_span3').css({'opacity':1,'margin-top':0});
		$('.three_span1').css({'opacity':1,'margin-top':0});
		$('.three_span2').css({'opacity':1,'margin-top':0});
		$('.three_span3').css({'opacity':1,'margin-top':0});
		
		window.onresize = function(){
			_h = document.documentElement.clientHeight;
			for(var i=0;i<_block.length;i++){
				_block[i].style.height = _h +'px';
			}
		};
	});
}else{
	$(document).ready(function($){
		var _block = $('.scroll_block'),
			_h = document.documentElement.clientHeight;
		for(var i=0;i<_block.length;i++){
			_block[i].style.height =  _h +'px';
		}
		var oBody = document.getElementsByTagName('body')[0];
		var oScript = document.createElement('script');
		oScript.setAttribute('src','biz2.js'/*tpa=http://paiwo.co/static/js/biz/biz2.js*/);
		oBody.appendChild(oScript);
		
	});
}