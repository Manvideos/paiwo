var main = $('.photo_comment_tab');

var objList = [];

$(function(){
    pd.init();
    
    
    
    $('#send_reply').click(function(){
        if(is_login == 0){
            loginInside.show();
            return;
        }
        
        
        //发送评论
        var val = $('#reply_text').val().trim();
        if(val.length> 140){
            showMessage('评论长度少于140字数');
            return;
        }
        if(val){
            $('#reply_text').val('');
            pd.sendComment(val, 0);
        }
    });

    
    
    $('#comment-wrap').on('click', '.content_list_resend', function(){
        //回复某人
        $('.comment_respond_box').hide();
        $(this).parents('li').next().show();
        $(this).parents('li').next().find('input').focus();
    });
    
    $('#comment-wrap').on('click', 'button', function(){
        if(is_login == 0){
            loginInside.show();
            return;
        }
        //确定回复
        var t = $(this);
        var text = t.prev().find('.res-text');
        var val = text.val().trim();
        
        if(val.length >140){
            showMessage('评论长度小于140个字符');
            return;
        }
        var id = t.attr('data');
        text.val('');
        pd.sendComment(val, id);
        t.parents('.comment_respond_box').hide();
        
    });
    $('.tab_buttons_left').on('click', function(){
        //喜欢
             if(is_login == 0){
		         loginInside.show();
                 return;
             }
            
        
            var t = $(this);
        
            if(t.hasClass('active')){
                pd.likePocket('unlike');
                t.removeClass('active tab_liked');
            }else{
                pd.likePocket('like')
                t.addClass('active tab_liked');
            }
    });
    
    $('.tab_buttons_right').on('click', function(){
        //推荐
           if(is_login == 0){
		         loginInside.show();
                 return;
             }
            
        
        
         var t = $(this);
            if(t.hasClass('active')){
                pd.recommendPocket('unrecommend');
                 t.removeClass('active tab_recd');
            }else{
                pd.recommendPocket('recommend');
                t.addClass('active tab_recd');
            }
        
    });

    $('.bigpic-star-icon').on('click',function(){
        //收藏
            if(is_login == 0){
                 loginInside.show();
                 return;
             }

        var t = $(this);
            if(t.hasClass('active')){
                pd.unCollect();
                t.removeClass('active');
                t.find('i').removeClass('pocket-stared').addClass('pocket-star');   
            }else{
                var url = 'http://image.paiwo.co/'+pd.data.pocket_cover_photo+'@!280x280';
                $('.store_album_img').attr('src', "").attr('src', url);
                $('#collect-back').show();
            }
    });
    
    
    $('.cieclebox_message').on('click', function(){
        //私信
         if(is_login == 0){
		  loginInside.show();
        }else{
            $('#top_message').trigger('click');
            PWS.addTalk(pd.data.author_id);
        }
   
    });
    
    
    $('.comment_tab_coll a').on('click', function(){
    //     //收藏
    //     if(is_login == 0){
		  // loginInside.show();
    //         return;
    //     }
    //     if($(this).hasClass('col')){
    //         pd.unCollect();
    //         $(this).removeClass('col').html('收藏');
            
            
    //     }else{
        
        
        
    //     var url = 'http://image.paiwo.co/'+pd.data.pocket_cover_photo+'@!280x280';
    //     $('.store_album_img').attr('src', "").attr('src', url);
    //     $('#collect-back').show();
    //     }
    });
    
    
    
    
    $('#col_cel').on('click', function(){
        
        //取消收藏
         $('#collect-back').hide();
    });
    
    $('#col_firm').on('click', function(){
        if(is_login != 1){
            showMessage('请先登录');
            return;
        }
        
        if(p_select == -1){
         showMessage('请先选择收藏夹');
            return;
        }
        
        pd.saveCollect(p_select);
        $('#collect-back').hide();
    });
    
    
    
    
    $('.store_album_input').on('click', function(e){
        
        $('.store_album_select').show();
        e.stopPropagation();
    });
    
    $('.store_contet').on('click', function(e){
        
        //防冒泡
        $('.store_album_select').hide();
        e.stopPropagation();
    
    });
    
    $('.store_album_select').on('click', 'li', function(){
        var id = $(this).attr('data');
        var name = $(this).html();
        p_select = id;
        $('.store_album_input').html(name);
    });
    
    $('.store_select_button_none').on('click', function(){
        var name = $('.store_select_text').val().trim();
        
        if(name){
            pd.createCollect(name);
            $('.store_select_text').val('');
        }else{
            showMessage('请输入收藏夹名称');
        }
    });
    
    $('.store_select_text').on('click', function(e){
        e.stopPropagation();
    
    });
    
    $('.cieclebox_concen').on('click', function(e){
        if(is_login == 0){
            loginInside.show();
            return;
        }
        
        
        if($(this).hasClass('fol')){
            pd.follow('unfollow');
        }else{
            pd.follow('follow');
        }
        
    });
    
    $('.tab_share_weibo').on('click', function(){
        
        var cs = "来自拍我网 Pocket";
        
        var url = 'http://paiwo.co/pocket/'+pd.data.pocket_id,
       		weibo_at = '',
        	cont = cs + weibo_at  + ' ' + url +'（分享自 @拍我 - 最具格调的自由摄影师平台）'||'',
        	bg = 'http://image.paiwo.co/'+pd.data.pocket_cover_photo+'@!1d5' || '',
	    	str = 'http://service.weibo.com/share/share.php?title='+cont+'&appkey=2197733404'+'&pic='+bg+'&ralateUid=';

	window.open(str,'_blank','height=525,width=700,top=100,left=400,resizable=yes,scrollbars=yes');
    
    });
    
     $('.tab_share_wechat').on('click', function(){
         

         
       var wechat = $('#wexchat');
         
	   var _url = ' http://paiwo.co/pocket/'+pd.data.pocket_id,
		_img = wechat.find('img');
         
		_img.attr('src','');
		_img.attr('src','/a/qrcode/make?share_url='+_url);	
         
         
		wechat.css({'visibility':'visible'}).addClass('active');
         
         $('#wexchat').show();
         
         
    });
    
    
    $('#wexchat').on('click', function(){
        $(this).hide();
    
    });
    
   // 赞
   main.on('mouseenter','.tab_liked,.tab_recd',function(){
        $(this).find('span').html('取消');
   });

    main.on('mouseleave','.tab_buttons_left',function(){
        $(this).find('span').html('喜欢');
    });

    main.on('mouseleave','.tab_buttons_right',function(){
        $(this).find('span').html('推荐');
    });
    
     $('.tab_share_qzone').on('click', function(){
         var bg = 'http://image.paiwo.co/'+pd.data.pocket_cover_photo+'@!1d5' || '';
         var title = "拍我网分享";
         var cs = '来自拍我网 Pocket';
        var url = 'http://paiwo.co/pocket/'+pd.data.pocket_id;
        var cont = cs +'（分享自 @拍我）';
        var bg = bg || '';
        var str = 'http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?title='+encodeURIComponent(title)+'&summary='+encodeURIComponent(cont)+'&desc=&url='+encodeURIComponent(url)+'&pics='+bg;
         
        window.open(str,'_blank','height=525,width=700,top=100,left=400,resizable=yes,scrollbars=yes');

    });
    
    $('.pocket-delet').on('click', function(e){
        //删除pocket
        $('.back').fadeIn(400);
        
    });
    
    $('.mes-cel,#close_btn').on('click',function(e){
            e.stopPropagation();
            $('.back').fadeOut(400);
    });
    $('.message').on('click', function(e){
        e.stopPropagation();
    });
    $('.back').on('click', function(e){
        $(this).fadeOut(400);
    });
    
    $('.mes-btn').on('click', function(e){
            e.stopPropagation();
         $.ajax({
                url: '/rest',
                 type: 'POST',
                 async: false,
                 data:  {
                       data:JSON.stringify({pocket_id: pd.id,method: 'paiwo.content.pocket.delete'})
                        },
                 dataType: 'json',
                 success: function(data){
                     
                     if(data.error_id == 0){
                        window.location.href = 'index.htm'/*tpa=http://paiwo.co/*/+pd.data.author_domain ;
                     }
                 }
                
        });
    
    });
    
    
    
    
    $('.pocket-go-top').on('click', function(){
        $('body').animate({scrollTop: 0});
    
    });
    

    $('.cieclebox_concen').hover(function(){
        var t = $(this);
        if(pd.data.follow_state == 2 ||pd.data.follow_state == 4){
            t.html('取消关注')   
        }  
        
    
    }, function(){
        var t = $(this);
         if(pd.data.follow_state == 2){
                t.html('<i class="f-a"></i>已关注');
            }
            if(pd.data.follow_state == 4){
                t.html('<i class="f-b"></i>已关注');
            }
    
    });
    
    
    
    $(document).on('scroll', function(){
        if( document.body.scrollTop == 0){
         $('.pocket-go-top').hide();
        }else{
         $('.pocket-go-top').show();
        }
        
        

    });
    
    

});

var pd = {};

pd.init = function(){
    var ar = window.location.pathname.split('/');
    pd.id = ar[ar.length-1];
    if(/^[0-9]*$/.test(pd.id)){
        pd.getPocket(pd.id);
    }else{   
        window.location.href = '404.htm'/*tpa=http://paiwo.co/404*/;
    }
    
    
    
    
}


pd.getPocket = function(id){
    
    $.ajax({
             url: '/rest',
             type: 'POST',
             async: false,
             data:  {
                   data:JSON.stringify({pocket_id: pd.id,method: 'http://paiwo.co/static/js/pocket/paiwo.content.pocket.get'})
                    },
             dataType: 'json',
             success: function(data){
                 if(data.error_id == 0){
                     pd.data = data.response;
                     pd.showPocketInfo(data.response);
                     pd.showPocket(data.response);
                     pd.showPocketComment(1);
                     $('.pocket-hot-num').html(data.response.temperature);
                     pd.getCollect();
                     
                     var time = pd.sendTime(data.response.create_time);
                     $('.put-time').html(time);
                 }else{
                     window.location.href = '404.htm'/*tpa=http://paiwo.co/404*/;
                 }
             }
          });       
}
pd.showPocketInfo = function(data){
    
    $('.pocket-header-tit h2').html(data.pocket_title); //标题
    $('title').html(data.pocket_title);
    $('.pocket-header-tit h3').html(data.pocket_second_title);  //副标题
    $('.pocket-user-name a').attr('href','/'+data.author_domain).html(data.author_name);    //个人主页
    $('.pocket-user-info a').attr('href','/'+data.author_domain);
    
    if(data.author_avatar.length == 0){
        data.author_avatar = 0;
    }
    
    $('.pocket-user-ava img').attr('src', 'http://image.paiwo.co/'+data.author_avatar);     //头像地址
    
    if(pd.data.is_self){
        $('.cieclebox_concen').hide();
        $('.pocket-edite').attr('href', '/pocket/'+pd.id+'/edit');
        $('.pocket-delet').show();
         $('.pocket-edite').show();
        
    }else{
//        $('.pocket-delet').hide();
//         $('.pocket-edite').hide();
        $('.pocket-tip').css('bottom', '35px');
        pd.showFllow(pd.data.follow_state);
        
    }
    if(pd.data.is_like){
        $('.tab_buttons_left').addClass('active tab_liked');
    }
    
    if(pd.data.is_recommend){
        $('.tab_buttons_right').addClass('active tab_recd');
    }
    if(pd.data.is_favorite){
        $('.bigpic-star-icon').addClass('active');
        $('.bigpic-star-icon').find('i').addClass('pocket-stared');
    }
    else {
        $('.bigpic-star-icon').removeClass('active');
        $('.bigpic-star-icon').find('i').addClass('pocket-star');
    }
    
    pd.showFllow(pd.data.follow_state);

}
pd.showPocket = function(data){
    
    //显示图片
    var bgurl = 'url(http://image.paiwo.co/' + data.pocket_cover_photo + '@!banner)';
    $('.pocket-header-back').css('background-image', bgurl);
    
    
    var txt = $('.content').html(data.pocket_content);
    
    
    var html = $('.content').text();
    
    $(html).each(function(i, target){
            var obj = {};
            if(target.getAttribute('src')){
                    obj.src = target.getAttribute('src');
                    obj.width = target.style.width;
                    obj.height = target.style.height;
            }else{
                    obj.content = target.innerHTML;
                    obj.hstyle = target.className.replace(/p-vir-blo ?/, '');
            }
            
            objList.push(obj);
    
    });
    
    $('.content').html(html);
    
    
    
    pd.showContent();
}

pd.showContent = function(){
    $('.p-vir-blo').each(function(){
        var t = $(this);
        var ni = $('<img>');
       if(t.attr('src')){
          t.html(ni);   
          pd.imgChange(t.attr('src'), t.width(), t.height(), ni);
        }else{ 
        }; 
    });
}
pd.showPocketComment = function(page_no){
      $.ajax({
            url: '/rest',
             type: 'POST',
             async: false,
             data:  {data:JSON.stringify({
                     pocket_id: pd.id,
                     page_no: page_no,
                     page_size: 100,
                     method: 'http://paiwo.co/static/js/pocket/paiwo.content.pocket.comment.get'})
                    },
             dataType: 'json',
             success: function(data){
                 if(data.error_id == 0){   
                     var comments = $.tmpl(tm.content, data.response.comment_list);
                     $('#comment-wrap').append(comments);
                 }else{
                     //window.location.href = '404.htm'/*tpa=http://paiwo.co/404*/;
                 }
             }
    });
}

pd.imgChange = function(url, width, height, ni){
    
    //改变图片位置
    var img = new Image();
    var purl = 'http://image.paiwo.co/' + url +'';
    var k2 = width /height;
    img.src = purl;
    img.onload = function(){
        var k1 = img.width /img.height;
        if(k1 >k2 ){
            var ileft = -(height*k1 - width)/2;
            ni.css({width:'', height:height, left: ileft, top:''});
        }else{
            var itop = -(width/k1 - height)/2;
            ni.css({width:width, height:'', left:'', top: itop});
        }
        ni.attr('src',purl);
    }
    
}

pd.sendComment = function(text, reply){
    $.ajax({
            url: '/rest',
             type: 'POST',
             async: false,
            data:  {data: JSON.stringify({
                     pocket_id: pd.id,
                     reply_user_id:reply,
                     comment_text: text,
                     method: 'http://paiwo.co/static/js/pocket/paiwo.content.pocket.comment.add'})
                    },
             dataType: 'json',
             success: function(data){
                 if(data.error_id == 0){
                     var comtent = $.tmpl(tm.content, data.response);
                     $('#comment-wrap').prepend(comtent);
                 }else{
                     window.location.href = '404.htm'/*tpa=http://paiwo.co/404*/;
                 }
             }
    });
}

pd.sendTime = function(data){
	var oDate = new Date(),
		dataArr = data.split(' '),
		oYear = dataArr[0].split('-'),
		oHour = dataArr[1].split(':');
		oDate.setFullYear(oYear[0],oYear[1]-1,oYear[2]);
		oDate.setHours(oHour[0],oHour[1],oHour[2],0);
    
	var oMs = oDate.getTime();
    
    var nDate = new Date(),
		nMs = nDate.getTime();
	var dMs = nMs-oMs,
		odate = [oDate.getFullYear(),oDate.getMonth(),oDate.getDate()],
		ndate = [nDate.getFullYear(),nDate.getMonth(),nDate.getDate()];
    if(dMs<60000){                     //1分钟内
    	return '刚刚';
    }else if(dMs>=60000&&dMs<3600000){ //1小时内
    	var t = parseInt(dMs/60000);
    	return t+'分钟前';
    }else if(dMs>=3600000&&dMs<21600000){//6小时内
    	var t = parseInt(dMs/3600000)
    	return t+'小时前';
    }else if(dMs>=21600000&&odate==ndate){
    	return '今天'+oDate.getHours()+':'+oDate.getMinutes();
    }else if(dMs>=21600000&&odate[0]==ndate[0]&&odate[1]==odate[1]&&ndate[2]-odate[2]==1){
    	return '昨天'+oDate.getHours()+':'+oDate.getMinutes();
    }else {
    	var month = oDate.getMonth()+1;
    	return oDate.getFullYear()+'/'+month+'/'+oDate.getDate();
    }
 
};




pd.likePocket = function(type){
    var data = {};
        if(type == 'like'){
            data.method = 'http://paiwo.co/static/js/pocket/paiwo.user.like.add';
        }else{
            data.method = 'paiwo.user.like.delete';
        }
    data.content_id = pd.data.pocket_id;
    data.content_type = 2;
    
    $.ajax({
             url: '/rest',
             type: 'POST',
             async: false,
             data:  {data: JSON.stringify(data)}
    });
}

pd.recommendPocket= function(type){
        var data = {};
        if(type == 'recommend'){
            data.method = 'http://paiwo.co/static/js/pocket/paiwo.user.recommend.add';
        }else{
            data.method = 'paiwo.user.recommend.delete';
        }
    data.content_id = pd.data.pocket_id;
    data.content_type = 2;
    
    $.ajax({
             url: '/rest',
             type: 'POST',
             async: false,
             data:  {data: JSON.stringify(data)}
    });

}

pd.showFllow = function(value){
    if(value == 1){
        $('.cieclebox_concen').removeClass('fol').html('+ 关注');
    }else if(value == 2){
         $('.cieclebox_concen').addClass('fol').html('<i class="f-a"></i> 已关注');
    }else if(value == 3){
        $('.cieclebox_concen').removeClass('fol').html('+ 关注');
    }else{
        $('.cieclebox_concen').addClass('fol').html('<i class="f-b"></i> 已关注');
    }
}

pd.getCollect = function (){
     $.ajax({
            url: '/rest',
             type: 'POST',
             async: false,
            data:  {data: JSON.stringify({method: 'http://paiwo.co/static/js/pocket/paiwo.user.favorite.name_list.get'})},
             dataType: 'json',
             success: function(data){
                 if(data.error_id == 0){
                     var tm = '';
                     var t = data.response.favorite_list;
                    for(var i =0; i<t.length;i++){
                tm += '<li data="'+t[i].favorite_id+'">'+t[i].favorite_name+'</li>';
                    }
                 }              
                $('.store_select_button_none').after(tm);
             }
            });
}
pd.saveCollect = function(id){
    var data ={};
    data.method = 'http://paiwo.co/static/js/pocket/paiwo.user.favorite.add';
    data.favorite_id = id;
    data.content_id = pd.data.pocket_id;
    data.content_type = 2;
        $.ajax({
            url: '/rest',
             type: 'POST',
             async: false,
            data:  {data: JSON.stringify(data)},
             dataType: 'json',
             success: function(data){
                $('.bigpic-star-icon').find('i').removeClass('pocket-star').addClass('pocket-stared');
                $('.bigpic-star-icon').addClass('active');
             }
            });
}
pd.unCollect = function(){
    var data = {"method":"paiwo.user.favorite.delete","content_id":pd.data.pocket_id,"content_type":2}
     $.ajax({
            url: '/rest',
             type: 'POST',
             async: false,
            data:  {data: JSON.stringify(data)},
             dataType: 'json',
             success: function(data){
                $('.bigpic-star-icon').removeClass('active');
                $('.bigpic-star-icon').find('i').removeClass('pocket-stared').addClass('pocket-star');
             }
            });
    
}

pd.createCollect = function(name){
    var data = {};
    data.method = 'paiwo.user.favorite.create';
    data.favorite_name = name;
        $.ajax({
            url: '/rest',
             type: 'POST',
             async: false,
             data:  {data: JSON.stringify(data)},
             dataType: 'json',
             success: function(data){
                var tm = '<li data="'+data.response.favorite_id+'">'+name+'</li>';           
                $('.store_select_button_none').after(tm);
             }
            });
}

pd.follow = function(type){
    var data = {};
    if(type == 'follow'){
        data.method = 'paiwo.user.follow.follow';
    }else{
        data.method = 'paiwo.user.follow.un_follow';
    }
    data.follow_id = pd.data.author_id ;
    
     $.ajax({
            url: '/rest',
             type: 'POST',
             async: false,
            data:  {data: JSON.stringify(data)},
             dataType: 'json',
             success: function(data){
                pd.data.follow_state = data.response.follow_state;
                pd.showFllow(data.response.follow_state);
             }
            });
}



pd.page_no = 1;
pd.page_flag = true;
var p_select = -1; 

