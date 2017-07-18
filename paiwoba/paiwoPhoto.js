var paiwoPhoto = {
    data: {},
	b_wechat:false,
	bInputFocus:true,
	index:0,
    comment: {flag: true, page_no: 1, reply_id: 0},
    old_url: '',
    handles: {},
    tool:{},
    collect:{},
	old_url: window.location.href,
    on: function(type, fn){
         if(!this.handles[type]){
              this.handles[type] = fn;
         }
    },
    trg: function(type, data){
        if(this.handles[type]!=undefined){
                this.handles[type].call(this, data);
        }
    },
    pushTool: function(name, fn){
        this.tool[name] = fn;
    },
    init: function(photo_id){
        var t = this;
    
        base.ajax({
                
                data:{
                    'method': 'http://paiwo.co/static/js/com/paiwo.content.photo.get',
                    'photo_id': photo_id
                },


                success:function(data){
                    
                    if(data.error_id == 0){
                        t.data = data.response;
                        paiwoPhoto.comment.page_no == 1;
                    }else if(data.error_id==130001){
                        showMessage('图片已被删除');
                        $('.big_photo_comment').hide();
                        //关闭大图
                        $('.black_bac').on('click', '.black_bac_close', function(){
                            window.location.href = 'gallery.htm'/*tpa=http://paiwo.co/gallery*/;  
                        });


                        //点击shadow
                        $('.black_bac').on('click','.big_pic_shadow',function(){
                          window.location.href = 'gallery.htm'/*tpa=http://paiwo.co/gallery*/;  
                        });
                    }
                    
                },

                error:function(data){
                    slideMessage('网络错误');
                }

            });
        
  
        
        
    },
    
    
    getCollect: function(){
        
        if(is_login == 0){return;}
        
        base.ajax({
            
            async:true,

            data:{
                'method': 'http://paiwo.co/static/js/com/paiwo.user.favorite.name_list.get'
            },


            success:function(data){
                
                if(data.error_id == 0 ){
                        var t = data.response.favorite_list;
                        if(t.length == 0){
                            return;
                        }
                        var tm = '';

                        for(var i = 0; i<t.length ; i++){
                            tm +='<li data="'+t[i].favorite_id +'">'+t[i].favorite_name+'</li>';
                        }
                        $('.store_album_select').append(tm);
                    }
                
            
            },

            error:function(data){
                slideMessage('网络错误');
            }

        });
          
    }
}

/******************事件注册************************/

//喜欢状态
paiwoPhoto.pushTool('like', function(data){
        
    if(data){
        var t = $('.tab_buttons_left');
            t.addClass('select-s');
            t.addClass('active');
            t.addClass('tab_liked');
    }else{
        var t = $('.tab_buttons_left');  
            t.removeClass('select-s');
            t.removeClass('active');
            t.removeClass('tab_liked');
    }
});

//推荐状态
paiwoPhoto.pushTool('recommend', function(data){
    
    if(data){
        var t = $('.tab_buttons_right');
            t.addClass('select-s');
            t.addClass('tab_recd');
            t.addClass('active');
    }else{
        var t = $('.tab_buttons_right');	
            t.removeClass('select-s');
            t.removeClass('tab_recd');
            t.removeClass('active');
    }

});


//收藏状态
paiwoPhoto.pushTool('favorite', function(data){   
    var t = $('.bigpic-star-icon');
        
    if(data){
        t.addClass('active');
        t.find('i').removeClass('pocket-star').addClass('pocket-stared');
    }else{	
        t.removeClass('active');
        t.find('i').removeClass('pocket-stared').addClass('pocket-star');
    }

});


paiwoPhoto.pushTool('temperature', function(data){
    $('.temperature_num').html(data);
});


paiwoPhoto.pushTool('culpic', function(img){
    var width = img.width,
        height = img.height;
    
    if(img.width>900){
		img.width = 900;
		img.height = 900*height/width;
	}else if(width>850){
		var m = 900 -width;
		img.style.marginTop = m +'px';
		img.style.marginBottom = m +'px';
	}else{
		img.style.marginTop = '30px';
		img.style.marginBottom = '30px';
	}

});

paiwoPhoto.pushTool('scrollbarwidth',function(){
	var parent = $('<div style="width:50px;height:50px;overflow:auto"><div></div></div>').appendTo('body'),
		child = parent.children(),
		scrollbarwidth = child.innerWidth() - child.height(99).innerWidth();
	parent.remove();
	return scrollbarwidth;
});

paiwoPhoto.pushTool('weiboShare',function(cont,bg){
		var url = 'http://paiwo.co/photos/'+paiwoPhoto.data.photo_id,
       		weibo_at ='',
        	cont = cont + weibo_at  + ' ' + url +'（分享自 @拍我 - 最具格调的自由摄影师平台）'||'',
        	bg = 'http://image.paiwo.co/'+paiwoPhoto.data.photo_path+'@!1d5' || '',
	    	str = 'http://service.weibo.com/share/share.php?title='+cont+'&appkey=2197733404'+'&pic='+bg+'&ralateUid=';
	window.open(str,'_blank','height=525,width=700,top=100,left=400,resizable=yes,scrollbars=yes');
});


paiwoPhoto.pushTool('wechatHide',function(cont,bg){
    var wechat = $('.wechat_box');
    wechat.removeClass('active');
    setTimeout(function(){
        wechat.css({'visibility':'hidden'});
    },600);
    paiwoPhoto.b_wechat = false;
});


paiwoPhoto.pushTool('qzoneShare',function(title,cont,bg){
    var url = 'http://paiwo.co/photos/'+paiwoPhoto.data.photo_id;
	var cont = cont +'（分享自 @拍我）';
	var bg = bg || '';
	var str = 'http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?title='+encodeURIComponent(title)+'&summary='+encodeURIComponent(cont)+'&desc=&url='+encodeURIComponent(url)+'&pics='+bg;
	window.open(str,'_blank','height=525,width=700,top=100,left=400,resizable=yes,scrollbars=yes');
});

paiwoPhoto.on('showpic', function(){
            
            paiwoPhoto.index = paiwoPhoto.tool.getIndex(this.data.album_photo_list,this.data.photo_id);
            paiwoPhoto.trg('prifAuthor', this.data);
            paiwoPhoto.trg('prifAlbum', this.data.album_photo_list);
//            paiwoPhoto.trg('prifTags', this.data.tags);
            paiwoPhoto.trg('prifBig', this.data.photo_path);
//            paiwoPhoto.trg('likeAndfavorite', this.data.photo_id);
            
            paiwoPhoto.trg('prifCopyRight', this.data.cc_protocol);
            paiwoPhoto.trg('prifAlbumName', this.data);
            paiwoPhoto.trg('prifNewComment', this.data.photo_id);
    
});

paiwoPhoto.pushTool('getIndex',function(photo_list,photo_id){
	var _index = 0;
	for(var i=0;i<photo_list.length;i++){
		if(photo_list[i]['photo_id']==photo_id){
			_index = i;
		}
	}
	return _index;
});

paiwoPhoto.pushTool('getMoreComment', function(){
            if(paiwoPhoto.comment.flag){
                
                
//                
//                 $.ajax({
//                        url: '/a/photo/comment/get',
//                        type: 'POST',
//                        dataType: 'json',
//                        async: false,
//                        data: { photo_id: paiwoPhoto.data.photo_id,
//                                page_size: 4,
//                                page_no: paiwoPhoto.comment.page_no+1},
//                        success: function(data){
//
//                                    if(data.error_id == 0){
//                                        paiwoPhoto.comment.page_no = data.result.page_no;
//                                        if(data.result.count>= data.result.page_no*data.result.page_size){
//                                            paiwoPhoto.comment.flag = true;
//                                        }else{
//                                            paiwoPhoto.comment.flag = false;
//                                        }
//                                         paiwoPhoto.trg('prifComment', data.result.comment_list.reverse());
//                                    }                   
//                                 }
//                    });
                
                
                base.ajax({

                    data:{
                        'method': 'http://paiwo.co/static/js/com/paiwo.content.photo.comment.get',
                        'photo_id':paiwoPhoto.data.photo_id,
                        'page_no':paiwoPhoto.comment.page_no+1,
                        'page_size':4
                    },


                    success:function(data){

                        if(data.error_id == 0){
                            paiwoPhoto.comment.page_no = data.response.page_no;
                            if(data.response.comment_list.length>= data.response.page_size){
                                paiwoPhoto.comment.flag = true;
                            }else{
                                paiwoPhoto.comment.flag = false;
                            }
                             paiwoPhoto.trg('prifComment', data.response.comment_list.reverse());
                        }                   
                         


                    },

                    error:function(data){
                        slideMessage('网络错误');
                    }

                });
                
                
            }

});

//预先加载
paiwoPhoto.pushTool('preLoad',function(photo_list){
//	http://image.paiwo.co/10289/album/b1dd022d8bf2bdc6456b9443b01d432d@!1d5
	var _index = paiwoPhoto.index,
		_list = photo_list,
		_length = photo_list.length;
	
	for(var i=0;i<_list.length;i++){
		var oImg = new Image();
		oImg.src = 'http://image.paiwo.co/'+_list[i].photo_path+base.retinaPixel['1d5'];
	}
	
});


//图片翻页
paiwoPhoto.pushTool('nextPic',function(){
//		//console.log(paiwoPhoto.index);
        $('#targeta img').fadeOut(400,function(){
            $('#targeta').css('display','none');
            paiwoPhoto.index++;
            if(paiwoPhoto.index==paiwoPhoto.data.album_photo_list.length){
                paiwoPhoto.index = 0;
            }
            
        var _index = paiwoPhoto.index,
            _arr = paiwoPhoto.data.album_photo_list;
            if(_index>_arr.length)_index=_arr.length;
            $('.albumphoto').removeClass('curalbum').animate({'opacity':0.6},200,'linear');
            $('.albumphoto').eq(paiwoPhoto.index).addClass('curalbum').animate({'opacity':1},200,'linear');
            $('.wechat_box').removeClass('active');
            setTimeout(function(){
                $('.wechat_box').css({'visibility':'hidden'});
            },600);
            paiwoPhoto.b_wechat = false;
            $('.black_bac').scrollTop(0);
            var _id =_arr[_index]['photo_id'],
                _path =  _arr[_index]['photo_path'];
            paiwoPhoto.data.photo_id =  _id;
            paiwoPhoto.data.photo_path = _path;
            paiwoPhoto.trg('prifBig', _path);
            paiwoPhoto.trg('likeAndfavorite', _id);
            paiwoPhoto.trg('prifNewComment', _id);
            paiwoPhoto.tool.like(paiwoPhoto.data.album_photo_list[paiwoPhoto.index].is_like);
            paiwoPhoto.tool.recommend(paiwoPhoto.data.album_photo_list[paiwoPhoto.index].is_recommend);
            paiwoPhoto.tool.favorite(paiwoPhoto.data.album_photo_list[paiwoPhoto.index].is_favorite);
            paiwoPhoto.tool.temperature(paiwoPhoto.data.album_photo_list[paiwoPhoto.index].temperature);
        });
});


paiwoPhoto.pushTool('prePic',function(){
    $('#targeta img').fadeOut(400,function(){
        $('#targeta').css('display','none');
        paiwoPhoto.index--;
        if(paiwoPhoto.index==-1){
            paiwoPhoto.index = paiwoPhoto.data.album_photo_list.length-1;
        }
	var _index = paiwoPhoto.index,
		_arr = paiwoPhoto.data.album_photo_list;
		if(_index<0)_index=0;
		$('.albumphoto').removeClass('curalbum').animate({'opacity':0.6},200,'linear');
        $('.albumphoto').eq(paiwoPhoto.index).addClass('curalbum').animate({'opacity':1},200,'linear');
		$('.wechat_box').removeClass('active');
		setTimeout(function(){
			$('.wechat_box').css({'visibility':'hidden'});
		},600);
		paiwoPhoto.b_wechat = false;
		$('.black_bac').scrollTop(0);
		var _id =_arr[_index]['photo_id'],
			_path =  _arr[_index]['photo_path'];
		paiwoPhoto.data.photo_id =  _id;
        paiwoPhoto.data.photo_path = _path;
        paiwoPhoto.trg('prifBig', _path);
        paiwoPhoto.trg('likeAndfavorite', _id);
        paiwoPhoto.trg('prifNewComment', _id);
        paiwoPhoto.tool.like(paiwoPhoto.data.album_photo_list[paiwoPhoto.index].is_like);
        paiwoPhoto.tool.recommend(paiwoPhoto.data.album_photo_list[paiwoPhoto.index].is_recommend);
        paiwoPhoto.tool.favorite(paiwoPhoto.data.album_photo_list[paiwoPhoto.index].is_favorite);
        paiwoPhoto.tool.temperature(paiwoPhoto.data.album_photo_list[paiwoPhoto.index].temperature);
    });
		
});


paiwoPhoto.on('prifAuthor', function(author){
    
    $('.username').html(author.user_name).attr('href','/'+author.user_domain );
    $('.userhead').attr('src','http://image.paiwo.co/'+author.user_avatar );
    
});


paiwoPhoto.on('prifAlbum', function(photo_list){
    var tm = '',
        urlArr = [];
    for(var i = 0; i<photo_list.length; i++){
        var _url = 'http://image.paiwo.co/'+photo_list[i].photo_path+'@!120x120';
        urlArr.push(_url);
        tm +='<a data="'+photo_list[i].photo_id+'" class="albumphoto" path="'+photo_list[i].photo_path+'" style="opacity:0;" >';
        tm +='<img width="80" height="80" src="'+_url+'" /></a>';
        
        var oImg = new Image();
        oImg.onload = function(){
            var _data = this.getAttribute('data');
            $('.albumphoto').each(function(index,ele){
                if($(ele).attr('data')==_data){
                    if($(ele).hasClass('curalbum')){
                        $(ele).animate({'opacity':1},600,'linear');
                    }else{
                        $(ele).animate({'opacity':0.6},600,'linear');
                    }
                }
            });
        };
        oImg.src = _url;
        oImg.setAttribute('data',photo_list[i].photo_id);
    }
    $('.main_right_imgbox').html(tm);
    $('.albumphoto[data='+paiwoPhoto.data.photo_id+']').addClass('curalbum').animate({'opacity':1},600,'linear');
    
    
});

paiwoPhoto.on('prifRecommend', function(album){ 
    
     base.ajax({
                
        data:{
            'method': 'http://paiwo.co/static/js/com/paiwo.content.photo.recommend_list.get',
            'album_id':album
        },


        success:function(data){

            if(data.error_id == 0){
                var recommendList = data.response.photo_list;
                var tm = '';
                for(var i = 0; i<recommendList.length; i++){
                    var _url = 'http://image.paiwo.co/'+recommendList[i].photo_path+'@!280x280'
                    tm +='<a class="recomd" data="'+recommendList[i].photo_id+'" style="opacity:0;" >';
                    tm +='<img width="200" height="200" src="'+_url+'" /></a>';
                    var oImg = new Image();
                    oImg.onload = function(){
                        var _data = this.getAttribute('data');
                        $('.recomd').each(function(index,ele){
                            if($(ele).attr('data')==_data){
                                $(ele).animate({'opacity':1},600,'linear');
                            }
                        });
                    };
                    oImg.src = _url;
                    oImg.setAttribute('data',recommendList[i].photo_id);
                }
                
                
                $('.photo_maylike_imgbox').html(tm);
            }              

        },

        error:function(data){
            slideMessage('网络错误');
        }

    });
    
    
    
    
});


paiwoPhoto.on('prifBig', function(photo_path){
	try{
		history.replaceState({title:'show'},'','/photos/'+paiwoPhoto.data.photo_id);
	}catch(e){
		
	}
    
//	$('.photo_maylike_imgbox').html('');
    $('.loading_now').show();
    $('#targeta').html('');
	$('#targeta').css('display','none');
    $('.copyright').html('').hide();
    $('#red_reply').html('').hide();
    $('#bigpic').attr('src','');
    
    paiwoPhoto.tool.like(paiwoPhoto.data.album_photo_list[paiwoPhoto.index].is_like);
    paiwoPhoto.tool.recommend(paiwoPhoto.data.album_photo_list[paiwoPhoto.index].is_recommend);
    paiwoPhoto.tool.favorite(paiwoPhoto.data.album_photo_list[paiwoPhoto.index].is_favorite);
    paiwoPhoto.tool.temperature(paiwoPhoto.data.album_photo_list[paiwoPhoto.index].temperature);
    
    paiwoPhoto.comment.reply_id = 0;
    paiwoPhoto.comment.nick_name = '';
    var url = 'http://image.paiwo.co/'+photo_path+ base.retinaPixel['1d5'];
//    if(paiwoPhoto.img)jQuery(paiwoPhoto.img).error();
        paiwoPhoto.img = new Image();
        paiwoPhoto.img.src = url;
        paiwoPhoto.img.id = 'bigpic';
    
    paiwoPhoto.loadImg = function(){
        paiwoPhoto.tool.culpic(paiwoPhoto.img);
        $('.loading_now').hide();
        $('#targeta').html(paiwoPhoto.img).fadeIn(200);
//        paiwoPhoto.trg('prifRecommend', paiwoPhoto.data.recommend_list);
        
        paiwoPhoto.trg('prifRecommend', paiwoPhoto.data.album_id); //推荐照片
        
        paiwoPhoto.picWidth =  $('#targeta img')[0].scrollWidth;
        paiwoPhoto.tool.preLoad(paiwoPhoto.data.album_photo_list);
    }
    
//    paiwoPhoto.img.removeEventListener('load',paiwoPhoto.loadImg,false);
    
    if(paiwoPhoto.img.complete){
        paiwoPhoto.tool.culpic(paiwoPhoto.img);
        $('.loading_now').hide();
        $('#targeta').html(paiwoPhoto.img).fadeIn(200);
//        paiwoPhoto.trg('prifRecommend', paiwoPhoto.data.recommend_list);
        paiwoPhoto.tool.preLoad(paiwoPhoto.data.album_photo_list);
    
    }else{
        
        paiwoPhoto.img.addEventListener('load',paiwoPhoto.loadImg,false);
        
    }
    
});



paiwoPhoto.on('prifCopyRight', function(data){
        $('.comment_tab_copyright span').hide();
        $('.t'+data).show();
});

paiwoPhoto.on('prifAlbumName', function(data){
    $('.main_right_titlea').attr('href', '/album/'+data.album_id).html(data.album_name);
    
});



paiwoPhoto.on('addCollect', function(name){

     base.ajax({
                
        data:{
            'method': 'paiwo.user.favorite.create',
            'favorite_name':name
        },


        success:function(data){

            if(data.error_id == 0){
                var tm = '<li data="'+data.response.favorite_id+'">'+name+'</li>';
                $('.store_album_select').append(tm);

                $('.store_album_input').html(data.response.favorite_name);
                paiwoPhoto.collect.id = data.response.favorite_id;
            }              

        },

        error:function(data){
            slideMessage('网络错误');
        }

    });
    
    

});


//评论获取
paiwoPhoto.on('prifComment', function(comment_list){
    if( paiwoPhoto.comment.page_no == 1){
	 $('.comment_content_list').html('');
    }
    var tm = '',
        us = '',
        reply_tm = '';
    for(var i = 0; i<comment_list.length; i++){
        us = comment_list[i];
        
         if(us.reply_user_id != 0){
            reply_tm = '<span class="resend_sb"><a>回复<span>@'+us.reply_user_name+'</span>：</a></span>';
         }else{
            reply_tm = '';
         }
        
        
         tm+='<li>'+
                '<div class="content_list_resend"><p>回复</p></div>'+
                '<div class="pic_content_list_headimg">'+
                    '<a class="content_list_headimg_a" data="'+us.comment_user_id+'" data-domain="'+us.comment_user_domain+'"><img width="60" height="60" src="http://image.paiwo.co/'+us.comment_user_avatar+'"></a>'+
                '</div>'+
                '<dl>'+
                    '<dt><a class="snick">'+us.comment_user_name+'</a><span>'+us.create_time+'</span></dt>'+
                    '<dd>'+reply_tm+'<span class="comment-text">'+us.comment_text+'</span></dd>'+
                '</dl>'+
                '<div class="comment_respond_box" style="display:none;">'+
                    '<div class="comment_respond_textarea">'+
                        '<span class="resend_sb"><a>回复<span>@'+us.comment_user_name+'</span>：</a></span>'+
                        '<textarea placeholder="输入文字"></textarea>'+
                    '</div>'+
                    '<button class="reply-in" data="'+us.comment_user_id+'">评论</button>'+
                '</div>'+
            '</li>';
       
    }
    
    $('.comment_content_list').append(tm);

});



paiwoPhoto.pushTool('commentReply', function(text){
        
     base.ajax({
                
        data:{
            'method': 'http://paiwo.co/static/js/com/paiwo.content.photo.comment.add',
            'reply_user_id': paiwoPhoto.comment.reply_id,
            'photo_id': paiwoPhoto.data.photo_id,
            'comment_text':text
        },


        success:function(data){

            if(data.error_id  == 0){
                $('.comment_respond_box').hide();
                paiwoPhoto.tool.prifCommentReply(data);
            }       

        },

        error:function(data){
            slideMessage('网络错误');
        }

    });
    
    
    
});

var comment_target = document.querySelector('.comment_content_list');
paiwoPhoto.pushTool('prifCommentReply', function(data){
    
    var tm = '';
    var us = data.response;
    
         if(us.reply_user_id != 0){
            reply_tm = '<span class="resend_sb"><a>回复<span>@'+us.reply_user_name+'</span>：</a></span>';
         }else{
            reply_tm = '';
         }
        
         tm+='<li>'+
                '<div class="content_list_resend"><p>回复</p></div>'+
                '<div class="pic_content_list_headimg">'+
                    '<a class="content_list_headimg_a" data="'+us.comment_user_id+'"  data-domain="'+us.comment_user_domain+'"><img width="60" height="60" src="http://image.paiwo.co/'+us.comment_user_avatar+'"></a>'+
                '</div>'+
                '<dl>'+
                    '<dt><a class="snick">'+us.comment_user_name+'</a><span>'+us.create_time+'</span></dt>'+
                    '<dd>'+reply_tm+'<span class="comment-text">'+us.comment_text+'</span></dd>'+
                '</dl>'+
                '<div class="comment_respond_box" style="display:none;">'+
                    '<div class="comment_respond_textarea">'+
                        '<span class="resend_sb"><a>回复<span>@'+us.comment_user_name+'</span>：</a></span>'+
                        '<textarea placeholder="输入文字"></textarea>'+
                    '</div>'+
                    '<button class="reply-in" data="'+us.comment_user_id+'">评论</button>'+
                '</div>'+
            '</li>';
    
      document.getElementById('reply_text').value = '';
    
    $('.comment_content_list').prepend(tm);
    comment_target.scrollTop = 0;
});


paiwoPhoto.on('prifNewComment', function(data){
    paiwoPhoto.comment.flag = true;
    paiwoPhoto.comment.page_no = 1;
    $('.comment_content_list').html('');
        
    base.ajax({
                
        data:{
            'method': 'http://paiwo.co/static/js/com/paiwo.content.photo.comment.get',
            'photo_id': data,
            'page_no': 1,
            'page_size': 4
        },


        success:function(data){

            if(data.error_id == 0){
                
                paiwoPhoto.comment.page_no = data.response.page_no;
                if(data.response.comment_list.length>= data.response.page_size){
                    paiwoPhoto.comment.flag = true;
                }else{
                    paiwoPhoto.comment.flag = false;
                }
                 paiwoPhoto.trg('prifComment', data.response.comment_list);                
            }        

        },

        error:function(data){
            slideMessage('网络错误');
        }

    });
    
    
    
});

paiwoPhoto.pushTool('scrollShow',function(data){
	var _body = document.getElementsByTagName('body')[0],
		scrollWidth = paiwoPhoto.tool.scrollbarwidth;
	$('.black_bac').show();
	_body.style.overflow = 'hidden';
    _body.style.paddingRight = scrollWidth + 'px';
});


paiwoPhoto.pushTool('scrollHide',function(data){
	var _body = document.getElementsByTagName('body')[0];
	$('.black_bac').hide();
	_body.style.overflow = 'auto';
    _body.style.paddingRight = '0px';
});


/*************************UI-Router********************************/

(function(){
var main = $('.black_bac');
var main2 = $('#collect-back');
var store_select = $('.store_album_select');
var photoBox = $('.big_photo_box');
//var replyText = ;
main2.on('click', '#col_cel', function(){
    $('.store_album_img').attr('src','');
    main2.fadeOut(100);
    
});

    //点赞 hover效果
main.on('mouseenter','.select-s',function(){
    $(this).find('span').html('取消');
});

main.on('mouseleave','.tab_buttons_left',function(){
    $(this).find('span').html('喜欢');
});

main.on('mouseleave','.tab_buttons_right',function(){
    $(this).find('span').html('推荐');
});

$('.wechat_box').on('click',function(){
    paiwoPhoto.tool.wechatHide();
});
main2.on('click', '#col_firm', function(){
    
    if(typeof paiwoPhoto.collect.id == 'undefined'){
        showMessage('请选择收藏夹');
        return;
    }
    
    base.ajax({
                
        data:{
            'method': 'http://paiwo.co/static/js/com/paiwo.user.favorite.add',
            'favorite_id': paiwoPhoto.collect.id,
            'content_id': paiwoPhoto.data.photo_id,
            'content_type': 1
        },


        success:function(data){

                if(data.error_id == 0){
                    $('.store_album_img').attr('src','');
                    main2.fadeOut(100);
                    paiwoPhoto.data.album_photo_list[paiwoPhoto.index].is_favorite = true;
                    paiwoPhoto.tool.favorite(true);
                    paiwoPhoto.trg('dofavoriteOut', paiwoPhoto.data.photo_id);
                    $('.bigpic-star-icon').addClass('active');
                    $('.bigpic-star-icon').find('i').removeClass('pocket-star').addClass('pocket-stared')
                }   

        },

        error:function(data){
            slideMessage('网络错误');
        }

    });
    


    
});

main2.on('click', 'li', function(e){
    e.stopPropagation();
    paiwoPhoto.collect.id = this.getAttribute('data');
    var text = this.innerHTML;
    $('.store_album_input').html(text);
    store_select.hide();
});

//评论输入框
	
$('#reply_text').on('keyup',function(ev){
	ev.stopPropagation();
	if(ev.keyCode == 39 || ev.keyCode == 37)return;
});

$('#reply_text').on('keydown',function(ev){
    if(ev.keyCode==13){
         return false;
    }
   
});
    
    
//创建收藏夹
main2.on('click', '.store_select_button_none', function(e){
    //e.stopPropagation();
    var v = $('.store_select_text').val();
    if(v.length == 0 ||v == ' '){
        showMessage('请输入收藏夹名字');
        return;
    }
    paiwoPhoto.trg('addCollect', v);
    $('.store_select_text').val('');
});

main2.on('click', '.store_select_text', function(e){
    e.stopPropagation();

});

main2.on('click', '.store_album_input', function(e){
		e.stopPropagation();
        store_select.show();
    
});

	
//点击内容部分隐藏去下拉条
main2.on('click', '.store_contet', function(){
        store_select.hide();
});

main.on('click', '.content_list_headimg_a', function(){
    
    //点击评论头像
    var data = this.getAttribute('data-domain');
    if(data !="" &&typeof data != undefined){
        window.open('/'+data);
    }else{
        showMessage('非摄影师用户');
    }
    
});
main.on('click','.tab_buttons_left', function(){
    
        if(is_login == 0){
//            showMessage('请先登录');
			loginInside.show();
            return;
        }
        var $this = $(this); 
        paiwoPhoto.tool.wechatHide();
    
        if($(this).hasClass('tab_liked')){
            
            base.ajax({
                
                data:{
                    'method': 'paiwo.user.like.delete',
                    'content_id': paiwoPhoto.data.photo_id,
                    'content_type': 1
                },


                success:function(data){

                    if(data.error_id == 0){
                        paiwoPhoto.tool.like(0);
                        paiwoPhoto.trg('unlikeOut', paiwoPhoto.data.photo_id);
                        paiwoPhoto.data.album_photo_list[paiwoPhoto.index].is_like = false;
					}   

                },

                error:function(data){
                    slideMessage('网络错误');
                }

            });
            
            
        }else{
            
            base.ajax({
                
                data:{
                    'method': 'http://paiwo.co/static/js/com/paiwo.user.like.add',
                    'content_id': paiwoPhoto.data.photo_id,
                    'content_type': 1
                },


                success:function(data){

                    if(data.error_id == 0){
				        paiwoPhoto.tool.like(1);
                        paiwoPhoto.trg('dolikeOut', paiwoPhoto.data.photo_id);
                        paiwoPhoto.data.album_photo_list[paiwoPhoto.index].is_like = true;
					}

                },

                error:function(data){
                    slideMessage('网络错误');
                }

            });
            
        }
});

    
//收藏
$('.bigpic-star-icon').click(function(){
    if($(this).hasClass('active')){
        base.ajax({
            
            data:{
                'method': 'paiwo.user.favorite.delete',
                'content_id': paiwoPhoto.data.photo_id,
                'content_type': 1
            },

            success:function(data){

                if(data.error_id == 0){
//                       paiwoPhoto.tool.favorite(0);
                     paiwoPhoto.tool.favorite(false);
                     paiwoPhoto.trg('unfavoriteOut', paiwoPhoto.data.photo_id);
                     $('.bigpic-star-icon').removeClass('active');
//                     $('.bigpic-star-icon').find('i').removeClass('pocket-stared').addClass('pocket-star');
                     paiwoPhoto.data.album_photo_list[paiwoPhoto.index].is_favorite = false;
                }

            },

            error:function(data){
                slideMessage('网络错误');
            }

        });
    }
    else {
        $('.photo_comment_coll').trigger('click');
//        paiwoPhoto.data.album_photo_list[paiwoPhoto.index].is_favorite = true;
    }
});
    
    
main.on('click','.photo_comment_coll', function(){
       
        if(is_login == 0){
			loginInside.show();
            return;
        }
        $('.store_album_img').attr('src','');
        paiwoPhoto.tool.wechatHide();
        
        $(".store_album_img").attr("src", "");
        paiwoPhoto.tool.wechatHide();
    
        if ($(this).hasClass("select-s")){         
            base.ajax({
                
                data:{
                    'method': 'paiwo.user.favorite.delete',
                    'content_id': paiwoPhoto.data.photo_id,
                    'content_type': 1
                },

                success:function(data){

                    if(data.error_id == 0){
//                       paiwoPhoto.tool.favorite(0);
                         paiwoPhoto.tool.favorite(false);
                         paiwoPhoto.trg('unfavoriteOut', paiwoPhoto.data.photo_id);
                         $('.bigpic-star-icon').removeClass('active');
                         $('.bigpic-star-icon').find('i').removeClass('pocket-stared').addClass('pocket-star')
					}

                },

                error:function(data){
                    slideMessage('网络错误');
                }

            });
            
        } else {
            $(".store_album_img").attr("src", "http://image.paiwo.co/" + paiwoPhoto.data.photo_path + "@!280x280");
            $("#collect-back").fadeIn(100)
        }
    
});
    
    
//推荐
main.on('click','.tab_buttons_right', function(){
    
     if(is_login == 0){
        loginInside.show();
        return;
     }
    
//     console.log($(this).hasClass('tab_recd'));
    
     if($(this).hasClass('tab_recd')){
         
         base.ajax({
                
            data:{
                'method': 'paiwo.user.recommend.delete',
                'content_id': paiwoPhoto.data.photo_id,
                'content_type': 1
            },


            success:function(data){

                if(data.error_id == 0){
//                    console.log('dddddd');
//                     paiwoPhoto.tool.favorite(0);
//                     paiwoPhoto.trg('unfavoriteOut', paiwoPhoto.data.photo_id);
                    paiwoPhoto.tool.recommend(false);
                    $('.tab_buttons_right').removeClass('tab_recd');
                    paiwoPhoto.data.album_photo_list[paiwoPhoto.index].is_recommend = false;
                }

            },

            error:function(data){
                slideMessage('网络错误');
            }

        });
         
     }else{
         
          base.ajax({
                
            data:{
                'method': 'http://paiwo.co/static/js/com/paiwo.user.recommend.add',
                'content_id': paiwoPhoto.data.photo_id,
                'content_type': 1
            },


            success:function(data){

                if(data.error_id == 0){
//                     paiwoPhoto.tool.favorite(0);
//                     paiwoPhoto.trg('unfavoriteOut', paiwoPhoto.data.photo_id);
                    paiwoPhoto.tool.recommend(true);
                    $('.tab_buttons_right').addClass('tab_recd');
                    paiwoPhoto.data.album_photo_list[paiwoPhoto.index].is_recommend = true;
                }

            },

            error:function(data){
                slideMessage('网络错误');
            }

        });
         
     }
    
      
});


//关闭大图
main.on('click', '.black_bac_close', function(){
    paiwoPhoto.tool.wechatHide();
    $('.black_bac').hide();
    history.pushState &&　history.pushState ({title:'index'},'',paiwoPhoto.old_url);
	paiwoPhoto.tool.scrollHide();
    $('#bigpic').error();
    paiwoPhoto.img.removeEventListener('load',paiwoPhoto.loadImg,false);
    $('#bigpic').attr('src','');
});

	
//点击shadow
main.on('click','.big_pic_shadow',function(){
    paiwoPhoto.tool.wechatHide();
	$('.black_bac').hide();
    history.pushState &&　history.pushState ({title:'index'},'',paiwoPhoto.old_url);
    paiwoPhoto.tool.scrollHide();
    $('#bigpic').error();
    paiwoPhoto.img.removeEventListener('load',paiwoPhoto.loadImg,false);
    $('#bigpic').attr('src','');
});


//点击专辑
main.on('click', '.albumphoto', function(){
    
	   $('.copyright').hide();
	   $('.wechat_box').removeClass('active');
	   setTimeout(function(){
			$('.wechat_box').css({'visibility':'hidden'});
	   },600);
	   paiwoPhoto.b_wechat = false;
	   $('.black_bac').scrollTop(0);
       var t = $(this),
        id = this.getAttribute('data'),
        path = this.getAttribute('path');
    
        if(t.hasClass('curalbum')){return;}
        $('.curalbum').removeClass('curalbum');
        t.addClass('curalbum');
        
        //console.log(id);
        paiwoPhoto.data.photo_id = id;
        paiwoPhoto.data.photo_path = path;
    
    $('#targeta img').fadeOut(400,function(){
       $('#targeta').css('display','none');
        paiwoPhoto.trg('prifBig', path);
        paiwoPhoto.trg('likeAndfavorite', id);
        paiwoPhoto.trg('prifNewComment', id);
		paiwoPhoto.tool.preLoad(paiwoPhoto.data.album_photo_list);
    	//获取当前序列
    	$('.albumphoto').each(function(index,element){
			if($(this).hasClass('curalbum')){
				paiwoPhoto.index = index;
			}
		});
    
        paiwoPhoto.tool.like(paiwoPhoto.data.album_photo_list[paiwoPhoto.index].is_like);
        paiwoPhoto.tool.recommend(paiwoPhoto.data.album_photo_list[paiwoPhoto.index].is_recommend);
        paiwoPhoto.tool.favorite(paiwoPhoto.data.album_photo_list[paiwoPhoto.index].is_favorite);
        paiwoPhoto.tool.temperature(paiwoPhoto.data.album_photo_list[paiwoPhoto.index].temperature);
        
        $('.albumphoto').removeClass('curalbum').animate({'opacity':0.6},200,'linear');
        $('.albumphoto').eq(paiwoPhoto.index).addClass('curalbum').animate({'opacity':1},200,'linear');
        
    });
    
});

//点击下面推荐
main.on('click', '.recomd', function(){
    $('.copyright').hide();
	$('.wechat_box').removeClass('active');
   	setTimeout(function(){
		$('.wechat_box').css({'visibility':'hidden'});
   	},600);
   	paiwoPhoto.b_wechat = false;
   	$('.black_bac').scrollTop(0);
    var id = this.getAttribute('data');
    paiwoPhoto.init(id);
    paiwoPhoto.trg('showpic');

});


//回复评论
main.on('click', '#send_reply', function(){
    paiwoPhoto.tool.wechatHide();
    if(is_login == 0){
//        showMessage('请先登录');
		loginInside.show();
        return;
    }
    var val = document.getElementById('reply_text').value;
    
    if(val == ''){
        showMessage('请输入回复内容');
    }else if(val.length >200){
        showMessage('回复字数不能大于200');
    }else{
        paiwoPhoto.comment.reply_id = 0;
        paiwoPhoto.tool.commentReply(val);
    }
    
  
    $('#reply_text')[0].focus();
//    $('#send_reply').focus();
    
});
	

//回复弹窗
main.on('click', '.content_list_resend', function(){
    var t = $(this),
        name = t.parent().find('.snick').html();
    paiwoPhoto.comment.comment_user_name = name;
    $('.comment_content_list').find('.comment_respond_box').hide();
    t.parents('li').find('.comment_respond_box').show();
    $(this).parents('li').find('.comment_respond_box textarea').val('');
//    if(comment_target.scrollHeight>270){
//        console.log(comment_target.scrollTop);
//        comment_target.scrollTop = comment_target.scrollTop+82;
//    }
});
	
//回复评论
$('.comment_content_list').on('click','.reply-in',function(){
    paiwoPhoto.comment.reply_id = $(this).attr('data');
    var reply = $(this).parents('.comment_respond_box').find('textarea').val().trim();
    if(reply==''){
        showMessage('评论不能为空！');
        return;
    }
    paiwoPhoto.tool.commentReply(reply);
});
    
//回复评论框聚焦
$('.comment_content_list').on('focus','textarea',function(){
    
//   console.log('in');
   var $this = $(this);
   console.log($this.val());
    if($this.val()===''){
        console.log('inn');
        $this.parent().find('.resend_sb').hide();
    }

});
    
    
//回复评论框失焦
$('.comment_content_list').on('blur','textarea',function(){
    
//   console.log('in');
   var $this = $(this);
   console.log($this.val());
    if($this.val()===''){
        console.log('onn');
        $this.parent().find('.resend_sb').show();
    }

});
    
    
//回车回复评论
main.on('keydown','.comment_respond_box textarea',function(ev){
//    console.log(ev.keyCode);
    var replyBtn = $(this).parents('.comment_respond_box').find('.reply-in');
    if(ev.keyCode==13){
        return false;
    }
});
	
//取消回复某人
main.on('click', '#red_reply', function(){
    $(this).html('').fadeOut(100);
    paiwoPhoto.comment.reply_id = 0;
    paiwoPhoto.comment.comment_user_name = '';
});
    
//评论滚动加载    
main.on('mousewheel DOMMouseScroll','.comment_content_list',function(ev){
    
//    var scrollH = this.scrollHeight;
//   console.log(this.scrollTop);
//               
//    if(this.scrollTop>=scrollH){ //滚动到最评论区最底部
//    
//    }    
    
    
});

//微博分享
main.on('click','.tab_share_weibo',function(){
	//照片专辑 照片作者 照片地址
	var album = $('.main_right_titlea').html(),
        author = $('.username').html(),
	    _photo = 'http://image.paiwo.co/'+paiwoPhoto.data.photo_path+'@!1d5',
	    content = '照片来自专辑「'+album+'」,'+'摄影师『'+author+'』作品';
	    paiwoPhoto.tool.weiboShare(content,_photo);
        paiwoPhoto.tool.wechatHide();
});


//微信分享
main.on('click','.tab_share_wechat',function(){
//	//console.log(paiwoPhoto.data.photo_id);
	var wechat = $('.wechat_box');
	var _url = 'http://paiwo.co/photos/'+paiwoPhoto.data.photo_id,
		_img = wechat.find('img');	
	if(paiwoPhoto.b_wechat){
		paiwoPhoto.tool.wechatHide();
	}else{
		_img.attr('src','');
		_img.attr('src','/a/qrcode/make?share_url='+_url+'?'+new Date().getTime());	
		wechat.css({'visibility':'visible'}).addClass('active');
		paiwoPhoto.b_wechat = true;
	}
});

//空间分享
main.on('click','.tab_share_qzone',function(){
	var album = $('.main_right_titlea').html(),
	    author = $('.username').html(),
        _photo = 'http://image.paiwo.co/'+paiwoPhoto.data.photo_path+'@!1d5',
        content = '照片来自专辑「'+album+'」,'+'摄影师"『'+author+'』作品';
		//console.log(_photo);
		paiwoPhoto.tool.qzoneShare('拍我网摄影作品分享',content,_photo);
        paiwoPhoto.tool.wechatHide();
});


//键盘上下张
$(document).on('keyup',function(ev){
//	//console.log($('.black_bac').css('display')+'|'+paiwoPhoto.bInputFocus);
	if($('.black_bac').css('display')=='block'){
		if(ev.keyCode == 39){ //下一张
			if(paiwoPhoto.index==paiwoPhoto.data.album_photo_list.length){
                paiwoPhoto.index = 0;
            }
			paiwoPhoto.tool.nextPic();
		}else if(ev.keyCode == 37){  //上一张
			if(paiwoPhoto.index<0){
                paiwoPhoto.index = paiwoPhoto.data.album_photo_list.length-1;
            }
			paiwoPhoto.tool.prePic();
		}
	}
});
	
$(document).on('keydown',function(ev){
	if($('.black_bac').css('display')=='block'){
		if(ev.keyCode == 39 || ev.keyCode==37)return;
	}
});



//鼠标移入大图
photoBox.on('mousemove',function(ev){  
    
	if(ev.offsetX<=450){  //上一张
		if(paiwoPhoto.index<0){
//            photoBox.removeClass('mouse_left mouse_right');
//            return;
//            paiwoPhoto.index = paiwoPhoto.data.album_photo_list.length-1;
        }
		$(this).removeClass('mouse_right').addClass('mouse_left');
	}else{  //下一张
		if(paiwoPhoto.index==paiwoPhoto.data.album_photo_list.length){
//            photoBox.removeClass('mouse_left mouse_right');
//            return;
//             paiwoPhoto.index = 0;
        }
		$(this).removeClass('mouse_left').addClass('mouse_right');
	}
    
	
});
	
//鼠标移入大图
photoBox.on('mousemove','#bigpic',function(ev){
    
    var xPos = parseInt(paiwoPhoto.picWidth/2);
    
//    console.log(xPos,paiwoPhoto.picWidth/2);
    if(ev.offsetX<=xPos){
        $(this).removeClass('mouse_right').addClass('mouse_left');
    }else if(ev.offsetX>xPos){
        $(this).removeClass('mouse_left').addClass('mouse_right');
    }
    
});
    
    
//photoBox.on('mousemove','.big_photo_box',function(ev){
//    
//    var xPos = parseInt(paiwoPhoto.picWidth/2);
//    
////    console.log(xPos,paiwoPhoto.picWidth/2);
//    if(ev.offsetX<=450){
//        $(this).removeClass('mouse_right').addClass('mouse_left');
//    }else{
//        $(this).removeClass('mouse_left').addClass('mouse_right');
//    }
//    
//});
    
    
    
    

photoBox.on('click',function(ev){
	$('.copyright').hide();
    
    if(paiwoPhoto.picWidth==750){
        if(ev.offsetX<=375){
            paiwoPhoto.tool.prePic();
        }else{
            paiwoPhoto.tool.nextPic();
        }
    }else if(paiwoPhoto.picWidth==640){
        if(ev.offsetX<=320){
            paiwoPhoto.tool.prePic();
        }else{
            paiwoPhoto.tool.nextPic();
        }
    }else{
        if(ev.offsetX<=450){
            paiwoPhoto.tool.prePic();
        }else{
            paiwoPhoto.tool.nextPic();
        }
    }
    
});

//大图右键
photoBox.on('contextmenu',function(ev){
	$('.copyright').html(paiwoPhoto.data.user_name+'©版权所有').css({'left':ev.offsetX,'top':ev.offsetY}).show();
	return false;
});


comment_target.onscroll = function(){
    
        if(paiwoPhoto.comment.flag && (this.scrollTop+300)>=this.scrollHeight){
            paiwoPhoto.tool.getMoreComment();
        }
}

paiwoPhoto.getCollect();


})();




