
jQuery(function(){

//获取市集最新订单
$.ajax({
       url: '/rest',
      type: 'POST',
  dataType: 'json',
     async: false,
     data: {
        data:JSON.stringify({
          'method':'http://paiwo.co/static/js/market/paiwo.market.order.list.get',
          'photograph_type': 0,
          'page_no': 1,
          'page_size': 5
        })
     },

      success:function (data){
          market_view.showRecentOrder(data.response.latest_order_list);
          market_view.showRecentDem(data.response.recommend_order_list);
          if(data.response.latest_order_count > (data.response.page_no)*5){
          	$('#change_page').show();
          }
          else
          	$('#change_page').hide();
      },

      error:function(data){

      }
});

//更换拍摄类型更换订单列表
$('#sel_type div').on('click','i',function(){

	$('#aut-ul-left').html('<h4 class="hot-phg-h4">最新订单</h4>');
	$('#recent_dem_ul').html('<h4 class="hot-phg-h42 hot-phg-h4">推荐</h4>');

	var this_type = $(this).parent().attr('data-code');

	$.ajax({
	       url: '/rest',
	      type: 'POST',
	  dataType: 'json',
	     async: false,
	     data: {
	        data:JSON.stringify({
	          'method':'http://paiwo.co/static/js/market/paiwo.market.order.list.get',
	          'photograph_type': this_type,
	          'page_no': 1,
	          'page_size': 5
	        })
	      },

	      success:function (data){
	          market_view.showRecentOrder(data.response.latest_order_list);
	          market_view.showRecentDem(data.response.recommend_order_list);
	          if(data.response.latest_order_count > (data.response.page_no)*5){
	          	$('#change_page').show();
	          	$('.no-more-dem').hide();	          	
	          }
	          else{
	          	$('#change_page').hide();
	            $('.no-more-dem').show();
	          }
	      },

	      error:function(data){

	      }
	});

});

//订单翻页
var page_no = 1;
$('#change_page').click(function(){

    $('#list_loading').show(); //显示loading 动画

	page_no ++;

    //找参数
	if($('#sel_type').find('.active'))
	  var cur_type = $('#sel_type').find('.active').parent().attr('data-code');
	else
	  cur_type = 0;

	$.ajax({
	       url: '/rest',
	      type: 'POST',
	  dataType: 'json',
	     async: false,
	     data: {
	        data:JSON.stringify({
	          'method':'http://paiwo.co/static/js/market/paiwo.market.order.list.get',
	          'photograph_type': cur_type,
	          'page_no': page_no,
	          'page_size': 5
	        })
	     },

	      success:function (data){
	      	  if(data.error_id == 0){
	      	  	  $('#list_loading').hide();
		          market_view.showRecentOrder(data.response.latest_order_list);
		          market_view.showRecentDem(data.response.recommend_order_list);
		          if( data.response.latest_order_list.length != 0){
	          	    $('#change_page').show();
	             	$('.no-more-dem').hide();
	          	  }
	              else{ 
	             	$('#change_page').hide();
	          	    $('.no-more-dem').show();
	          	    page_no = 1;
	              }
	          }
	      },

	      error:function(data){

	      }
	});

});


///////////////////////DOM事件绑定/////////////////////////

	//联系他按钮
	  $('.left-mid-con').on('mouseenter','a',function(){
	      $(this).find('i').removeClass('yue-button-i').addClass('yue-button-ihover');
	  });
	  $('.left-mid-con').on('mouseleave','a',function(){
	      $(this).find('i').removeClass('yue-button-ihover').addClass('yue-button-i');
	  });

	//拍摄类型选择
      $('.photo_types>div i').click(function() {
	      $(this).addClass('active').parent().siblings().find('i').removeClass('active');
	  });

	//查看最新订单详情
	  $('#aut-ul-left').on('click','li',function(){
	      var order_id = $(this).attr('data-code');
	      window.location.href = 'market.htm'/*tpa=http://paiwo.co/market/*/+order_id;
	  });

	  //查看推荐订单详情
	  $('#recent_dem_ul').on('click','li',function(){
	     var order_id = $(this).attr('data-code');
	     window.location.href = 'market.htm'/*tpa=http://paiwo.co/market/*/+order_id;
	  });

	//返回顶部按钮
	window.addEventListener('scroll',function(){
		var scrollTop = document.documentElement.scrollTop || document.body.scrollTop,
		 clientHeight = document.documentElement.clientHeight || document.body.clientHeight;
		if(scrollTop > clientHeight/2){
			$('#go_top').stop(true,true).fadeIn();
		}
		else{
			$('#go_top').stop(true,true).fadeOut();
		}
	},false);

	//点击回到顶部
	$('#go_top').on('click',function(){
	     $("html,body").stop().animate({scrollTop:0},600);
	});

	//点击显示私信
    $('#hotPhotog').on('click','.yue-button',function(){
      if(is_login == 0){
        loginInside.show();
        return;
      }
      $('#top_message').trigger('click');
      PWS.addTalk(this.getAttribute('data-code'));
    });
});