var tm = {};

tm.content = '<div class="comment_content_box">'+
            '<ul class="comment_content_list"> '+
                '<li>'+
                    '<div class="content_list_resend">'+
                        '<p>回复</p>'+
                    '</div>'+
                    '<div class="pic_content_list_headimg">'+
                        '<a class="content_list_headimg_a" href="http://paiwo.co/${comment_user_domain}" target="_blank">'+
                            '<img width="60" height="60" src="http://image.paiwo.co/${comment_user_avatar }">'+
                        '</a>'+
                   '</div>'+
                    '<dl>'+
                        '<dt>'+
                            '<a class="snick" target="_blank" href="http://paiwo.co/${comment_user_domain}">${comment_user_name}</a>'+
                            '<span>${pd.sendTime(create_time)}</span>'+
                        '</dt>'+
                '<dd>'+
      '{{if reply_user_id != 0}}'+
        '<span class="resend_sb"><a><span>回复</span><span class="reply_name">@${reply_user_name}</span>：</a></span>'+
        '<span class="comment-wrap">${comment_text}</span>'+
        '{{else}}'+
        '${comment_text}'+
        '{{/if}}'+
            '</dd>'+
                    '</dl>'+
                '</li>'+
             '<div class="comment_respond_box" style="display:none">'+
                        '<div class="comment_respond_textarea">'+
                            '<span class="resend_sb"><a><span>回复</span><span class="reply_name">@${comment_user_name }</span>：</a></span>'+
                            '<input class="res-text">'+
                        '</div>'+
                        '<button data="${comment_user_id}">评论</button>'+
                    '</div>'+
            '</ul>'+
        '</div>';


//显示顶部信息
var setM;
function showMessage(content){
	clearTimeout(setM);
	$('.message-box').html(content).animate({top: 0}, 400,function(){
		setM = setTimeout(hideMessage, 1500);
	});
}

function hideMessage(){
	$('.message-box').animate({top: '-27px'}, 400);
}