
//消息框显示判断
window.onload = function() {
	if($('#top_notice i').is('hideen') == false){
		$('#top_notice i').css('display','none');
		if($('#new_message').is('hideen') == true){
			$('.tab-notice-box').fadeOut();
		}else {
			$('#new_notice').fadeOut();
		}
	}else{}	
}

var notice = {};

    //初始化变量
	notice.notice_data_id = '';
	notice.unread_count = '';
	notice.message_list_new = new Array,
	notice.message_list_readed = new Array;

	if(location.hostname.indexOf('duopaizhao') == -1){
	    notice.socketURL = 'ws://message.paiwo.co/message';
	}else{
	    notice.socketURL = 'ws://message.duopaizhao.com/message';
	}

notice.ws = new WebSocket(notice.socketURL);

//服务器建立连接
notice.ws.onopen = function(){
    console.log('连接成功');
    notice.send('init',{});
};

notice.page = function(index){
	var x = {};
	    x.session_id = 'dynamic';
	    x.page_no = index;
	    x.page_size = 10;
	    notice.send('history',x);
}

//向服务器发送请求
notice.send = function (type,msg){
	var obj = {};
	obj.req = type;
	obj.msg = msg;
	notice.ws.send(JSON.stringify(obj));
}

//数据回调处理
notice.callback = {

	init: function(data){

		//显示未读信息
		notice.unread_count = data.system_dynamic.unread_count; 
		$('.notice-line-i').html(notice.unread_count);

		if(data.system_dynamic.unread_count == 0){			
			$('#new_notice_title').css('display','none');
			$('#his_notice_title').css('display','none');
		}else if(data.system_dynamic.unread_count > 10){
			$('#new_notice_title').css('display','block');
			$('#his_notice_title').css('display','none');
		}else {
			$('#new_notice_title').css('display','block');
			$('#his_notice_title').css('display','block');
		}

		//获取消息历史纪录
		notice.page(1);
	},
	read: function(data){
		var msg = {};
			msg.session_id = 'dynamic';

			notice.send('read',msg);
	},
	history: function(data){

		console.log(data);
		if(data.message_list.length == 0){
			$('.page').css('display','none');
			$('#new_notice_title').css('display','none');
			$('#his_notice_title').css('display','none');
			$('#no_notice').css('display','block');
		}else if(data.message_list.length < 10){
			$('#no_notice').css('display','none');
			$('.page-next').addClass('page-first');
		}else {
			$('.page').css('display','block');
			$('.page-next').removeClass('page-first');
		}

		for(var i = 0; i < data.message_list.length; i++){
			data.message_list[i].message = JSON.parse(data.message_list[i].message);
		}
		notice.message_list_num = data.message_list.length;

		//消息重新读取
		notice.message_list_readed.splice(0);
		notice.message_list_new.splice(0);

        var vv = 0;
		for(var i = 0; i < data.message_list.length; i++){

		    //翻页后每次统计未读的信息个数		    
			if(data.message_list[i].is_read == 0){
				vv = vv + 1;
			}else{ }

			if(vv == 0){
				notice.message_list_readed.push(data.message_list[i]);		
			}else if (vv < 10){
				if(data.message_list[i].is_read == 0){
					notice.message_list_new.push(data.message_list[i]);
				}else{
					notice.message_list_readed.push(data.message_list[i]);
				}
			}else {
				if(data.message_list[i].is_read == 0){
					notice.message_list_new.push(data.message_list[i]);
				}else{
					notice.message_list_readed.push(data.message_list[i]);
				}
			}
		}

		history_html = $.tmpl(NoticeView.HistoryList,notice.message_list_readed);
		new_html = $.tmpl(NoticeView.HistoryList,notice.message_list_new);

        //二次插入
		$('.his-notice-list').html(history_html);
		$('.new-notice-list').html(new_html);

	}

};//存放各种回调的

//数据返回
notice.ws.onmessage = function(data){ 

	var obj = JSON.parse(data.data);

    //console.log(obj);

	if(obj.res == 'init'){       
		notice.callback.init(obj.msg);
	    notice.callback.read();
	}else if(obj.res == 'history'){           
		notice.callback.history(obj.msg);
    }
}

//DOM 事件处理
notice.main = $('.notice-main');

notice.main.on('click','.notice-list',function(){
	var href = $(this).attr('photo_id');
	if(href != user_domain){
		window.open('/photos/'+href);
	}else {
		window.open('/'+user_domain+'#friends');
	}
});


var index = 1;
$('.page-in').on('click','a',function(){

	//回到顶部
	$("html,body").stop().animate({scrollTop:0},300);

	$('#new_notice_title').css('display','none'); 
	$('#his_notice_title').css('display','none'); 

	if($(this).index() == 0){
		if(index == 1) {
			$(this).addClass('page-first');
		}else {
			if(index == 2){
				$(this).addClass('page-first');
			}
			index = index - 1;
			$(this).siblings('a').removeClass('page-first');
			notice.page(index);
		}
	}else if($(this).index() == 2){
		if(notice.message_list_num < 10){
			$(this).addClass('page-first');
		}else {
			index = index + 1;
			$(this).siblings('a').removeClass('page-first');
			notice.page(index);
		}
	}	
});

notice.main.on('click','.notice-user-adv a,.notice-list-text a',function(ev){
	ev.stopPropagation();
});















