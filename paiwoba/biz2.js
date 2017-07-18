var _block = $('.scroll_block'),
	_point = $('.dian');

var biz = {
	_height:document.documentElement.clientHeight,
	index:0,
	flag:false,
	bMouse:true,
	timer1:null,
	timer2:null,
	addWheel:function(obj,fn){
		function fnWheel(ev){
				var oEvent=ev || event;
				var bDown=false;
				if(oEvent.wheelDelta){
					if(oEvent.wheelDelta>0){
						bDown=false;
					}else{
						bDown=true;
					}
				}else{
					if(oEvent.detail>0){
						bDown=true;
					}else{
						bDown=false;
					}	
				}
				fn && fn(bDown);
				oEvent.preventDefault && oEvent.preventDefault();
				return false;
		}
		if(window.navigator.userAgent.toLowerCase().indexOf('firefox')!=-1){
			obj.addEventListener('DOMMouseScroll',fnWheel,false);	
		}else{
			obj.onmousewheel=fnWheel;
		}
	},
	blockInit:function(index){
		switch(index){
			case 0:
				_point.fadeOut(400);
				$('.header-middle_p').removeClass('active').addClass('active');
				$('#box').css({
					webkitTransform: "translate3d(0px, -" + biz._height*0 + "px, 0px)",
					webkitTransition: "all 1000ms cubic-bezier(0.860, 0.000, 0.070, 1.000)",
					"-moz-transform": "translate3d(0px, -" + biz._height*0 + "px, 0px)",
					"-moz-transition": "all 1000ms cubic-bezier(0.860, 0.000, 0.070, 1.000)",
					"-ms-transform": "translate3d(0px, -" + biz._height*0+ "px, 0px)",
					"-ms-transition": "all 1000ms cubic-bezier(0.860, 0.000, 0.070, 1.000)"
				});
				break;
			case 1:
				_point.fadeIn(800);
				$('.dian li i').removeClass('li_cur').eq(0).addClass('li_cur');
				$('#box').css({
					webkitTransform: "translate3d(0px, -" + biz._height*1 + "px, 0px)",
					webkitTransition: "all 1000ms cubic-bezier(0.860, 0.000, 0.070, 1.000)",
					"-moz-transform": "translate3d(0px, -" + biz._height*1 + "px, 0px)",
					"-moz-transition": "all 1000ms cubic-bezier(0.860, 0.000, 0.070, 1.000)",
					"-ms-transform": "translate3d(0px, -" + biz._height*1+ "px, 0px)",
					"-ms-transition": "all 1000ms cubic-bezier(0.860, 0.000, 0.070, 1.000)"
				});
				$('#one .one_span1').css({
					webkitTransform: "translate3d(0px, -90px, 0px)",
					opacity: "1",
					webkitTransition: "all 2000ms cubic-bezier(0.215, 0.610, 0.355, 1.000) 1000ms",
					"-moz-transform": "translate3d(0px, -90px, 0px)",
					"-moz-transition": "all 2000ms cubic-bezier(0.215, 0.610, 0.355, 1.000) 1000ms",
					"-ms-transform": "translate3d(0px, -90px, 0px)",
					"-ms-transition": "all 2000ms cubic-bezier(0.215, 0.610, 0.355, 1.000) 1000ms"
				});
				$('#one .one_span2').css({
					webkitTransform: "translate3d(0px, -90px, 0px)",
					opacity: "1",
					webkitTransition: "all 2000ms cubic-bezier(0.215, 0.610, 0.355, 1.000) 1200ms",
					"-moz-transform": "translate3d(0px, -90px, 0px)",
					"-moz-transition": "all 2000ms cubic-bezier(0.215, 0.610, 0.355, 1.000) 1200ms",
					"-ms-transform": "translate3d(0px, -90px, 0px)",
					"-ms-transition": "all 2000ms cubic-bezier(0.215, 0.610, 0.355, 1.000) 1200ms"
				});
				$('#one .one_span3').css({
					webkitTransform: "translate3d(0px, -90px, 0px)",
					opacity: "1",
					webkitTransition: "all 2000ms cubic-bezier(0.215, 0.610, 0.355, 1.000) 1400ms",
					"-moz-transform": "translate3d(0px, -90px, 0px)",
					"-moz-transition": "all 2000ms cubic-bezier(0.215, 0.610, 0.355, 1.000) 1400ms",
					"-ms-transform": "translate3d(0px, -90px, 0px)",
					"-ms-transition": "all 2000ms cubic-bezier(0.215, 0.610, 0.355, 1.000) 1400ms"
				});
				break;
			case 2:
				_point.fadeIn(800);
				$('.dian li i').removeClass('li_cur').eq(1).addClass('li_cur');
				$('#box').css({
					webkitTransform: "translate3d(0px, -" + biz._height*2 + "px, 0px)",
					webkitTransition: "all 1000ms cubic-bezier(0.860, 0.000, 0.070, 1.000)",
					"-moz-transform": "translate3d(0px, -" + biz._height*2 + "px, 0px)",
					"-moz-transition": "all 1000ms cubic-bezier(0.860, 0.000, 0.070, 1.000)",
					"-ms-transform": "translate3d(0px, -" + biz._height*2+ "px, 0px)",
					"-ms-transition": "all 1000ms cubic-bezier(0.860, 0.000, 0.070, 1.000)"
				});
				$('#two .two_span1').css({
					webkitTransform: "translate3d(0px, -90px, 0px)",
					opacity: "1",
					webkitTransition: "all 2000ms cubic-bezier(0.215, 0.610, 0.355, 1.000) 1000ms",
					"-moz-transform": "translate3d(0px, -90px, 0px)",
					"-moz-transition": "all 2000ms cubic-bezier(0.215, 0.610, 0.355, 1.000) 1000ms",
					"-ms-transform": "translate3d(0px, -90px, 0px)",
					"-ms-transition": "all 2000ms cubic-bezier(0.215, 0.610, 0.355, 1.000) 1000ms"
				});
				$('#two .two_span2').css({
					webkitTransform: "translate3d(0px, -90px, 0px)",
					opacity: "1",
					webkitTransition: "all 2000ms cubic-bezier(0.215, 0.610, 0.355, 1.000) 1200ms",
					"-moz-transform": "translate3d(0px, -90px, 0px)",
					"-moz-transition": "all 2000ms cubic-bezier(0.215, 0.610, 0.355, 1.000) 1200ms",
					"-ms-transform": "translate3d(0px, -90px, 0px)",
					"-ms-transition": "all 2000ms cubic-bezier(0.215, 0.610, 0.355, 1.000) 1200ms"
				});
				$('#two .two_span3').css({
					webkitTransform: "translate3d(0px, -90px, 0px)",
					opacity: "1",
					webkitTransition: "all 2000ms cubic-bezier(0.215, 0.610, 0.355, 1.000) 1400ms",
					"-moz-transform": "translate3d(0px, -90px, 0px)",
					"-moz-transition": "all 2000ms cubic-bezier(0.215, 0.610, 0.355, 1.000) 1400ms",
					"-ms-transform": "translate3d(0px, -90px, 0px)",
					"-ms-transition": "all 2000ms cubic-bezier(0.215, 0.610, 0.355, 1.000) 1400ms"
				});
				break;
			case 3:
				_point.fadeIn(800);
				$('.dian li i').removeClass('li_cur').eq(2).addClass('li_cur');
				$('#box').css({
					webkitTransform: "translate3d(0px, -" + biz._height*3 + "px, 0px)",
					webkitTransition: "all 1000ms cubic-bezier(0.860, 0.000, 0.070, 1.000)",
					"-moz-transform": "translate3d(0px, -" + biz._height*3 + "px, 0px)",
					"-moz-transition": "all 1000ms cubic-bezier(0.860, 0.000, 0.070, 1.000)",
					"-ms-transform": "translate3d(0px, -" + biz._height*3+ "px, 0px)",
					"-ms-transition": "all 1000ms cubic-bezier(0.860, 0.000, 0.070, 1.000)"
				});
				$('#three .three_span1').css({
					webkitTransform: "translate3d(0px, -90px, 0px)",
					opacity: "1",
					webkitTransition: "all 2000ms cubic-bezier(0.215, 0.610, 0.355, 1.000) 1000ms",
					"-moz-transform": "translate3d(0px, -90px, 0px)",
					"-moz-transition": "all 2000ms cubic-bezier(0.215, 0.610, 0.355, 1.000) 1000ms",
					"-ms-transform": "translate3d(0px, -90px, 0px)",
					"-ms-transition": "all 2000ms cubic-bezier(0.215, 0.610, 0.355, 1.000) 1000ms"
				});
				$('#three .three_span2').css({
					webkitTransform: "translate3d(0px, -90px, 0px)",
					opacity: "1",
					webkitTransition: "all 2000ms cubic-bezier(0.215, 0.610, 0.355, 1.000) 1200ms",
					"-moz-transform": "translate3d(0px, -90px, 0px)",
					"-moz-transition": "all 2000ms cubic-bezier(0.215, 0.610, 0.355, 1.000) 1200ms",
					"-ms-transform": "translate3d(0px, -90px, 0px)",
					"-ms-transition": "all 2000ms cubic-bezier(0.215, 0.610, 0.355, 1.000) 1200ms"
				});
				$('#three .three_span3').css({
					webkitTransform: "translate3d(0px, -90px, 0px)",
					opacity: "1",
					webkitTransition: "all 2000ms cubic-bezier(0.215, 0.610, 0.355, 1.000) 1400ms",
					"-moz-transform": "translate3d(0px, -90px, 0px)",
					"-moz-transition": "all 2000ms cubic-bezier(0.215, 0.610, 0.355, 1.000) 1400ms",
					"-ms-transform": "translate3d(0px, -90px, 0px)",
					"-ms-transition": "all 2000ms cubic-bezier(0.215, 0.610, 0.355, 1.000) 1400ms"
				});
				break;
			case 4:
				_point.fadeOut(400);
				$('#box').css({
					webkitTransform: "translate3d(0px, -" + biz._height*4 + "px, 0px)",
					webkitTransition: "all 1000ms cubic-bezier(0.860, 0.000, 0.070, 1.000)",
					"-moz-transform": "translate3d(0px, -" + biz._height*4 + "px, 0px)",
					"-moz-transition": "all 1000ms cubic-bezier(0.860, 0.000, 0.070, 1.000)",
					"-ms-transform": "translate3d(0px, -" + biz._height*4+ "px, 0px)",
					"-ms-transition": "all 1000ms cubic-bezier(0.860, 0.000, 0.070, 1.000)"
				});
				break;
			case 5:
				$('#box').css({
					webkitTransform: "translate3d(0px, -" + biz._height*5 + "px, 0px)",
					webkitTransition: "all 1000ms cubic-bezier(0.860, 0.000, 0.070, 1.000)",
					"-moz-transform": "translate3d(0px, -" + biz._height*5 + "px, 0px)",
					"-moz-transition": "all 1000ms cubic-bezier(0.860, 0.000, 0.070, 1.000)",
					"-ms-transform": "translate3d(0px, -" + biz._height*5+ "px, 0px)",
					"-ms-transition": "all 1000ms cubic-bezier(0.860, 0.000, 0.070, 1.000)"
				});
				break;
		}

	}
	
};


//初始化
biz.blockInit(0);


//右侧固定点鼠标移入
$('.dian').on('mouseenter','li',function(){
if($(this).hasClass(''))
  $(this).find('i').addClass('li_hover');
$(this).find('span').stop(true,true).show(400).parent('li').siblings().find('span').stop(true,true).hide(200);
});
$('.dian').on('mouseleave','li',function(){
$(this).find('i').removeClass('li_hover');
});
$('.dian').on('mouseleave',function(){
$(this).find('span').hide(200);
});


//鼠标滚轮事件
biz.addWheel(document,function(bDown){
	if(bDown){
		if(!biz.flag){
			clearTimeout(biz.timer1);
			biz.flag = true;
			biz.index++;
			if(biz.index>=5)biz.index=5;
			biz.blockInit(biz.index);
			timer1 = setTimeout(function(){
					biz.flag = false;
			},1000);
		}

	}else{
		if(!biz.flag){
			clearTimeout(biz.timer2);
			biz.flag = true;
			biz.index--;
			if(biz.index==-1)biz.index=0;
			biz.blockInit(biz.index);
			timer2 = setTimeout(function(){
					biz.flag = false;
			},1000);
		}
	}


//	document.title = biz.index;
});


//下一页按钮
$('.down-arrow').on('click',function(){
	biz.index++;
	biz.blockInit(biz.index);
});


//拍摄类型三页
$('.person').on('click',function(){
	biz.blockInit(1);
});

$('.biz').on('click',function(){
	biz.blockInit(2);
});

$('.event').on('click',function(){
	biz.blockInit(3);
});


//键盘换页
$(document).on('keydown',function(ev){
	if(ev.keyCode==40){
		if(!biz.flag){
			clearTimeout(biz.timer1);
			biz.flag = true;
			biz.index++;
			if(biz.index>=5)biz.index=5;
			biz.blockInit(biz.index);
			timer1 = setTimeout(function(){
					biz.flag = false;
			},1000);
		}
	}else if(ev.keyCode==38){
		if(!biz.flag){
			clearTimeout(biz.timer2);
			biz.flag = true;
			biz.index--;
			if(biz.index==-1)biz.index=0;
			biz.blockInit(biz.index);
			timer2 = setTimeout(function(){
					biz.flag = false;
			},1000);
		}
	}
});


//当页面变化时
window.onresize = function(){
	biz._height = document.documentElement.clientHeight;
	for(var i=0;i<_block.length;i++){
		_block[i].style.height = biz._height +'px';
	}

	$('#box').css({
		webkitTransform: "translate3d(0px, -" + biz._height*biz.index + "px, 0px)",
		webkitTransition: "all 0",
		"-moz-transform": "translate3d(0px, -" + biz._height*biz.index + "px, 0px)",
		"-moz-transition": "all 0",
		"-ms-transform": "translate3d(0px, -" + biz._height*biz.index + "px, 0px)",
		"-ms-transition": "all 0"
	});
	
};

