var activelistBox = $('.active-list'); //活动列表父级

var activity = {
    
    listPage:1,
    
    init:function(){  //初始化
        
         base.ajax({  //获取banner
            data:{
                'method': 'http://paiwo.co/static/js/activity/paiwo.activity.activity_banner.get'
            },
            success:function(data){
                if(data.error_id==0){
                    
//                   console.log(data);
                    
                    var response = data.response;
                    var bannerDom = $('.active-banner');
                    var bannerInfo = response.activity_list[0];
                    
                    
//---------------------->test begin  发版删除
                    
//                    console.log(bannerInfo);
                         
//                     bannerInfo = {
//                            'activity_banner_big': "http://image.paiwo.co/10006/album/dbb32e01b2d04d29dd8eea122522b3f0",
//                            'activity_id': 30003,
//                            'activity_url': "/pocket/115703"
//                        };
                    
                
//                 console.log(bannerInfo);
                    
//---------------------->test end   发版删除                 
                    
                bannerDom.css('background-image','url('+bannerInfo.activity_banner_big+')').attr('data-code',bannerInfo.activity_id);
                bannerDom.parents('a').attr('href',bannerInfo.activity_url);
                        
                }
            },
            error:function(data){
                slideMessage('网络错误');
            }
        });
        
    },
    
    getList:function(page_no){ //获取活动列表
        
        base.ajax({
            
            data:{
                'method': 'http://paiwo.co/static/js/activity/paiwo.activity.activity_list.get',
                'page_no': page_no,
                'page_size': 5
            },
            
            success:function(data){
                
                
//---------------------->test begin  发版删除
                
//                 data = {
//                       'error_code': "success",
//                       'error_id': 0,
//                       'method': "http://paiwo.co/static/js/activity/paiwo.activity.activity_list.get",
//                       'response':{
//                            'count': 6,
//                            'page_no': 1,
//                            'page_size': 5,
//                            'activity_list':[
//                                {
//                                    'activity_banner': "activity_sigma@2x.jpg"/*tpa=http://paiwo.co/static/images/activity/activity_sigma@2x.jpg*/,
//                                    'activity_banner_mid': "activity1.jpg"/*tpa=http://paiwo.co/static/images/home_images/activity1.jpg*/,
//                                    'activity_end_date': "2015-03-30 12:53:20",
//                                    'activity_id': 3001,
//                                    'activity_start_date': "2015-01-30 12:53:16",
//                                    'activity_state': 1,
//                                    'activity_title': "拍我网适马Art系列镜头深度体验",
//                                    'activity_url': "/activity/sigma"
//                                },
//                                {
//                                    'activity_banner': "activity_vision@2x.jpg"/*tpa=http://paiwo.co/static/images/activity/activity_vision@2x.jpg*/,
//                                    'activity_banner_mid': "activity3.jpg"/*tpa=http://paiwo.co/static/images/home_images/activity3.jpg*/,
//                                    'activity_end_date': "2015-04-22 12:54:01",
//                                    'activity_id': 3002,
//                                    'activity_start_date': "2015-04-22 12:53:58",
//                                    'activity_state': 1,
//                                    'activity_title': "大疆“角度”航拍摄影沙龙",
//                                    'activity_url': "http://mp.weixin.qq.com/s?__biz=MjM5NDM5NjM5OA"
//                                },
//                                {
//                                    'activity_banner': "activity_youth.jpg"/*tpa=http://paiwo.co/static/images/activity/activity_youth.jpg*/,
//                                    'activity_banner_mid': "activity4.jpg"/*tpa=http://paiwo.co/static/images/home_images/activity4.jpg*/,
//                                    'activity_end_date': "2015-06-14 12:54:10",
//                                    'activity_id': 30006,
//                                    'activity_start_date': "2015-05-21 12:54:04",
//                                    'activity_state': 1,
//                                    'activity_title': "“拍我青春”毕业季写真活动",
//                                    'activity_url': "/byxz" 
//                                },
//                                {
//                                    'activity_banner': "activity_liudan@2x.jpg"/*tpa=http://paiwo.co/static/images/activity/activity_liudan@2x.jpg*/,
//                                    'activity_banner_mid': "activity5.jpg"/*tpa=http://paiwo.co/static/images/home_images/activity5.jpg*/,
//                                    'activity_end_date': "2015-06-14 12:54:13",
//                                    'activity_id': 30005,
//                                    'activity_start_date': "2015-06-08 12:54:06",
//                                    'activity_state': 1,
//                                    'activity_title': "拍我系列影展-刘丹",
//                                    'activity_url': "http://mp.weixin.qq.com/s?__biz=MjM5NDM5NjM5OA==&mid=206505573&idx=1"
//                                },
//                                {
//                                    'activity_banner': "http://image.paiwo.co/10006/album/b0400c97505fbe4a6a410df1219ff36c",
//                                    'activity_banner_mid': "http://image.paiwo.co/10006/album/b2a883f6ee90b0b28659214e0dfd4dca",
//                                    'activity_end_date': "2015-07-12 22:00:00",
//                                    'activity_id': 30004,
//                                    'activity_start_date': "2015-07-12 12:00:00",
//                                    'activity_state': 1,
//                                    'activity_title': "拍我主题沙龙：慢摄影，慢生活",
//                                    'activity_url': "/pocket/115722"
//                                },
//                                {
//                                    'activity_banner': "http://image.paiwo.co/10006/album/689d7e282a2f3464483018d08344a98e",
//                                    'activity_banner_mid': "http://image.paiwo.co/10006/album/27d57030a41d54a011bb289542a94d86",
//                                    'activity_end_date': "2015-07-26 23:59:59",
//                                    'activity_id': 30003,
//                                    'activity_start_date': "2015-07-24 00:00:00",
//                                    'activity_state': 1,
//                                    'activity_title': "拍我自拍节",
//                                    'activity_url': "/pocket/115703"
//                                }
//                            ]
//                        }
//                    };
            
                console.log(data);
                
//---------------------->test end   发版删除  
                
                
        
                if(data.error_id==0){
                        
                    var response = data.response,
                        listInfo = response.activity_list,
//                        listInfo = data_tmp.response.activity_list,
                        putListTm = '',
                        pageTm = '',
                        pageCount = Math.ceil(response.count/response.page_size);
        
                        activity.pageCount =  pageCount;
                    
//                    console.log('in');
                    
                    console.log(pageCount);
                 
                        
                    console.log(listInfo);
                    
                    
                        if(pageCount==1){
                            activelistBox.append('<div class="list-box active-list-box'+response.page_no+'"></div>');
                            putListTm = $.tmpl(activity.list_tm,listInfo);
                            activelistBox.find('.active-list-box'+response.page_no+'').html(putListTm);
                        }else{
                            //显示页码
                            
                               
                            
                            
                            if(response.page_no==1){
//                                activelistBox.find('.page-no a').eq(0).addClass('page-cur');
                                activelistBox.append('<div class="list-box active-list-box'+response.page_no+'"></div>');
                                 for(var i=0;i<pageCount;i++){
                                  if(i==0){
                                    pageTm+= '<a class="loaded">'+(i+1)+'</a>';
                                  }else{
                                    pageTm+= '<a>'+(i+1)+'</a>';
                                  }
                                }
                                activelistBox.find('.page-no').html(pageTm);
                                activelistBox.find('.page').show();
                            }else{
                                 activelistBox.append('<div class="list-box active-list-box'+response.page_no+'" style="display:none;"></div>');
                            }
                            
                            console.log(response.page_no);
                            
                            putListTm = $.tmpl(activity.list_tm,listInfo);
                            activelistBox.find('.active-list-box'+response.page_no).html(putListTm).show();
                        }
                    
                        
                        console.log(page_no);
                        activelistBox.find('.page-no a').eq(page_no-1).addClass('loaded page-cur');
                    
                    
                    
//                        console.log(listInfo);
//                    
//                        console.log(listInfo.length,response.page_size,pageCount);   
//                        if(listInfo.length==1){
//                            activelistBox.find('.page').hide();
//                        }else{
//                            for(var i=0;i<pageCount;i++){
//                                if(i==0){
//                                    pageTm+= '<a class="page-cur">'+(i+1)+'</a>';
//                                }else{
//                                    pageTm+= '<a>'+(i+1)+'</a>';
//                                }
//                                
//                            }
//                            
//                            activelistBox.find('.page-no').html(pageTm);
//                            activelistBox.find('.page').show();
//                        }
//                        
//                        activelistBox.append('<div class="active-list-box'+response.page_no+'"></div>');
//                        putListTm = $.tmpl(activity.list_tm,listInfo);
//                        activelistBox.find('.active-list-box'+response.page_no+'').html(putListTm);
                        
                }
            },
            
            error:function(data){
                slideMessage('网络错误');
            }
            
        });
        
    },
    
    putTime:function(start,end){  //输出活动时间
        
            var startTime = start.split(' ')[0].split('-'),
                endTime = end.split(' ')[0].split('-'),
                oDate = new Date();
            if(startTime[0]==oDate.getFullYear()){
                startTime.splice(0,1);
            }

            if(endTime[0]==oDate.getFullYear()){
                endTime.splice(0,1);
            }

            return startTime.join('/')+' - '+endTime.join('/');

     },
    
    putState:function(start,end){  //输出活动状态
        
        var startDate = start.split(' ')[0].split('-'),
            startTime = start.split(' ')[1].split(':'),
            endDate = end.split(' ')[0].split('-'),
            endTime = end.split(' ')[1].split(':'),
            nowTime = new Date().getTime(),
            setStartTime = new Date(),
            setEndTime = new Date();
    
            setStartTime.setFullYear(startDate[0],startDate[1]-1,startDate[2]);
            setStartTime.setHours(startTime[0],startTime[1],startTime[2],0);
            setEndTime.setFullYear(endDate[0],endDate[1]-1,endDate[2]);
            setEndTime.setHours(endTime[0],endTime[1],endTime[2]);
            
//            console.log(nowTime,setStartTime,setEndTime);
        
            setStartTime = setStartTime.getTime();
            setEndTime = setEndTime.getTime();
            
//            if(nowTime<setStartTime){  
//                return '<span class="studio-active-cond studio-active-will"><i></i>即将开始</span>';
//            }else if(nowTime>=setStartTime && nowTime<=setEndTime){  //正在进行
//                return '<span class="studio-active-cond studio-active-ing"><i></i>正在进行</span>';
//            }else if(nowTime>setEndTime){  //已结束
//                return '<span class="studio-active-cond studio-active-end"><i></i>已结束</span>';
//            }else{
//                return '';
//            }
            return '<span class="studio-active-cond"></span>';
        
    },
    
    pageShow:function(page_no){
        activity.listPage = page_no;
        activelistBox.find('.page-no a').removeClass('page-cur');
        activelistBox.find('.page-no a').eq(page_no-1).addClass('page-cur');
        activelistBox.find('.list-box').hide();
        activelistBox.find('.active-list-box'+page_no).fadeIn(100);
    },
    
    list_tm:'<div class="studio-trend-area" data-code="${activity_id}">'+    //活动列表模板
				'<div class="studio-trend-active clearfix">'+
                    '<a href="${activity_url}" target="_blank">'+
					'<div class="studio-active-img" style="background-image:url(${activity_banner})"></div>'+
                    '</a>'+
					'<div class="studio-active-detail">'+
						'<h3>${activity_title}</h3>'+
						'<p class="studio-active-time">'+
							'<span>活动时间：</span>'+
							'<i>${activity.putTime(activity_start_date,activity_end_date)}</i>'+
						'</p>'+
                        '{{html activity.putState(activity_start_date,activity_end_date)}}'+   
						'<button class="submit studio-look"><a href="${activity_url}" target="_blank">去看看</a></button>'+
					'</div>'+
				'</div>'+
			'</div>'
    
    
};


//页面初始化
activity.init();
activity.getList(1);



//上一页
activelistBox.on('click','.page-pre',function(){
    activity.listPage--;
    if(activity.listPage==0)activity.listPage=1;
    activity.pageShow(activity.listPage);
    if(activelistBox.find('.page-no a').eq(activity.listPage-1).hasClass('loaded'))return;
    activity.getList(activity.listPage);
   
});


//下一页
activelistBox.on('click','.page-next',function(){
    activity.listPage++;
    if(activity.listPage==activity.pageCount+1)activity.listPage=activity.pageCount;
    activity.pageShow(activity.listPage);
    if(activelistBox.find('.page-no a').eq(activity.listPage-1).hasClass('loaded'))return;
    activity.getList(activity.listPage);
    
});


//点击页码
activelistBox.on('click','.page-no a',function(){
    var $this = $(this),
        index = $this.html();
//    console.log(index);
     activity.listPage = 1;
    activity.pageShow(index);
    activelistBox.find('.page-no a').removeClass('page-cur');
    $this.addClass('page-cur');
//    console.log('loaded',$this.hasClass('loaded'));
    if($this.hasClass('loaded'))return;
    activity.getList(index);
    
   
});












