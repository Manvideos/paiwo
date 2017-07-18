
var NoticeView = {

	NewList: '<div class="notice-list" {{html NoticeView.ActionId(message.photo_id)}}>'+
                    '<div class="notice-user-adv"><a href="http://paiwo.co/${message.user_host}"><img src="${NoticeView.ActionAvat(message.avatar)}"/></a></div>'+
                    '<div class="notice-list-text">'+
                        '<a class="notice-user-nic" href="http://paiwo.co/${message.user_host}">${message.nick_name}</a>'+
                        '<span>${NoticeView.ActionText(message.action)}</span>'+
                    '</div>'+
                    '<div class="notice-time">${NoticeView.ActionTime(date)}</div>'+
                    '{{html NoticeView.ActionImg(message.photo_path)}}'+
                    '<i class="notice-del"></i>'+
                '</div>',

    HistoryList: '<div class="notice-list" {{html NoticeView.ActionId(message.photo_id)}}>'+
	                '<div class="notice-user-adv"><a href="http://paiwo.co/${message.user_host}"><img src="${NoticeView.ActionAvat(message.avatar)}"/></a></div>'+
	                '<div class="notice-list-text">'+
	                    '<a class="notice-user-nic" href="http://paiwo.co/${message.user_host}">${message.nick_name}</a>'+
	                    '<span>${NoticeView.ActionText(message.action)}</span>'+
	                '</div>'+
	                '<div class="notice-time">${NoticeView.ActionTime(date)}</div>'+
	                '{{html NoticeView.ActionImg(message.photo_path)}}'+
	                '<i class="notice-del"></i>'+
            	'</div>',

    SysNewList:  '<div class="notice-list official clearfix">'+
	                '<div class="notice-user-adv"><a><img/></a></div>'+
	                '<div class="notice-list-text">'+
	                    '<a class="notice-user-nic" href=":;">[ 系统通知 ]</a>'+
	                    '<p></p>'+
	                '</div>'+
	                '<div class="notice-time">12分钟前</div>'+
            	'</div>',

    SysHisList:  '<div class="notice-list official clearfix">'+
	                '<div class="notice-user-adv"><a><img/></a></div>'+
	                '<div class="notice-list-text">'+
	                    '<a class="notice-user-nic" href=":;">[ 系统通知 ]</a>'+
	                    '<p></p>'+
	                '</div>'+
	                '<div class="notice-time">12分钟前</div>'+
            	'</div>',
    
    ActionAvat: function(data){
    	var action_avat = '';
    	if(data == ''){
    		action_avat = 'user_head.gif'/*tpa=http://paiwo.co/static/images/user_head.gif*/;
    	}else {
    		action_avat = 'http://image.paiwo.co/'+data;
    	}
    	return action_avat;
    },

    ActionText: function(data){
        var action_text = '';   	
    	switch (data){
    		case 'follow':
    			action_text = '关注了你';
    			break;
    		case 'like':
    			action_text = '给你点了赞';
    			break;
    		case '':
    		    action_text = '推荐了你的照片';
    		    break;
            case 'photo_comment':
                action_text = '评论了你的照片';
                break;
    	}
    	return action_text;
    },

    ActionImg: function(data){
 		if(data){
 			action_img = '<div class="notice-focus-pic"><img src="%27+data+%27@!280x280"/*tpa=http://image.paiwo.co/%27+data+%27@!280x280*//></div>';
 		}else{
 			action_img = '';
 		}
 		return action_img;
    },

    ActionTime: function(data){
    	var Aciton_time = base.renderTime(data,10);
    	return Aciton_time;
    },

    ActionId: function(data){
        notice_data_id = data;
        var action_id = '';
        if(data){
            action_id = 'photo_id='+'"'+data+'"';
        }else {
            action_id = 'photo_id='+'"'+user_domain+'"';
        }
        return action_id;
    }

}











