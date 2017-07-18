
jQuery(function(){

  var locationCode = ''; //全局变量

  $('#main_box').css({paddingTop: 0});
  //初始化localstorange
  store.remove('refresh');
  store.remove('sel_type');
  store.remove('place_id');

  //初始化banner
  $('#area_input').val('');

////////////////////////////DOM事件绑定/////////////////////////////

  //document click事件
  function closeSelect(){  
    $('.banner_select').fadeOut(200);
    $('#banner_sel_type').find('i').removeClass('active');
  }

  function closePlace(){
    $('.place-choose').fadeOut(200);
    $('.pla-cho-pro2box,.place-choose s').css('display','none');
  }

  function closeSecondPlace(){
    $('.pla-cho-pro2box,.place-choose s').css('display','none');
  }

  $(document).click(function(){
    closeSelect();
    closePlace();
    closeSecondPlace();
  });
  
  //banner接拍类型选择
  $('#banner_sel_type').on('click',function(ev){
      if($(this).find('.banner_select').css('display')=='block'){
        $('#banner_sel_type').find('i').removeClass('active');
        $(this).find('.banner_select').hide();
      }
      else{
        $('#banner_sel_type').find('i').addClass('active');
        $(this).find('.banner_select').show();
      }
    ev.stopPropagation();
  });
   
  $('#banner_sel_type').on('click','dd',function(){
    var type_name = $(this).html(); //类型名称
    var   type_id = $(this).attr('data-code'); //类型id
        store.set('sel_type',type_id); //存储localstorange
    $('#banner_sel_type').find('span').html(type_name).attr('data-code',type_id);
  });

  //热门摄影师地区切换
  var $sli_tog = $('.place-choose');
  $('#chosed_pla_btn').click(function(ev){
    $sli_tog.fadeIn(200);
    $sli_tog.find('.pla-cho-zxpro-li-seclet').removeClass('pla-cho-zxpro-li-seclet');
    ev.stopPropagation();
  });

  $sli_tog.click(function(ev){
    closeSecondPlace();
    ev.stopPropagation();
  });

  $('#zhixia,.pla-cho-pro2box').on('click','li',function(ev){
    ev.stopPropagation();
    locationCode = $(this).attr('data-code');
    flag = 0;
    $.ajax({
         url: '/rest',
        type: 'POST',
    dataType: 'json',
       async: false,
       data: {
         data: JSON.stringify({
          'method': 'http://paiwo.co/static/js/market/paiwo.market.location_hot_photographer.get',
          'location_code': locationCode
         })
    },
    success:function (data){
        if(data.error_id == 0) {
            if(data.response.photographer_list.length == 0){
              $('#hotPhotog').html('');
              $('.change_list_span').css({lineHeight: 60+'px'}).html('未找到周边热门摄影师');
            }
            else{
              if(data.response.photographer_list.length < 5){
                $('.change_list_span').css({lineHeight: 35+'px'}).html('');
              }
              else{
                $('.change_list_span').css({lineHeight: 35+'px'}).html('<b class="change_list">换一批<i></i></b>');
              }
              photographer_count = data.response.photographer_count;
              market_view.showHotPhotog(data.response.photographer_list);
            }
        }
      } 
  }); 

  $('#chosed_pla').html($(this).html());
    $sli_tog.fadeOut(200);
  });

  //换一批
  var flag = 0;
      $('.local-hot-phg').on('click','.change_list',function(){
        var n = parseInt(photographer_count/4),
            m = photographer_count%4,
            t = $('.yue-photog-libox');
        t.slice(flag*4, flag*4+4).hide();
        if( n == 1 ){
          flag = flag == 1? 0 : flag+1;
        }else {
          if( m ==0 ){
            flag = flag == n-1? 0 : flag+1;
          }else {
            flag = flag == n? 0 : flag+1;
          }
          
        }       
        t.slice(flag*4, flag*4+4).stop(true,true).fadeIn();
    });
  

  //下拉框点击
  $('.select').click(function(evs){
    $(this).find('dl').toggle().parent('.select').siblings().find('dl').hide();
    $(this).parents('li').siblings('li').find('dl').hide();
    ev.stopPropagation();
  });

  //关闭地区选择的选择框
  $('.place-choose b').click(function(){
    closePlace();
  }); 

  $('#pla_cho').on('click','li',function(ev){
    ev.stopPropagation();
    $(this).addClass('pla-cho-zxpro-li-seclet').siblings().removeClass('pla-cho-zxpro-li-seclet');
    $(this).find('s').show().parent().siblings().find('s').hide();
    var li_code = $(this).attr('data-code'),
    $oversea_json = allArea['province']['01-00-00-00'];
       $li_json = allArea['city'][li_code];
        cityList_frag = '';
    if(li_code == '01-00-00-00'){
      for(var i in $oversea_json){
        cityList_frag += '<li data-code='+i+'>'+$oversea_json[i]+'</li>';
      }
    }
    else{
      for(var i in $li_json){
        cityList_frag += '<li data-code='+i+'>'+$li_json[i]+'</li>';
      }
    }
    var li_jsonul = $(this).nextAll('.pla-cho-pro2box').eq(0);
    li_jsonul.siblings('.pla-cho-pro2box').hide();
    li_jsonul.css('display','block').find('ul').html(cityList_frag);     
  });

   $('.pla-cho-pro2box').on('click', 'li', function(e){
    e.stopPropagation();
    $('.pla-cho-pro2box,.pla-cho-zxpro li s,.place-choose').stop(true,true).fadeOut(200);
    $('.hot-phg-tab').find('span').first().html($(this).html());
   });

  //点击二级空白地区关闭
  $('.pla-cho-pro2box').click(function(){
    $('#pla_cho').find('.pla-cho-pro2box').hide();
    $('#pla_cho').find('s').hide();
  });

  //约拍地区输入
  var input_index = -1;
  var input_now = null;
  $('#area_input').on('keyup',function(ev){
    if(ev.keyCode==40 || ev.keyCode==38) return;
    var location = $(this).val();
    var len = location.length;
    if(len==0){
      $('.banner_select_area').hide();
    }
    $('.banner_select_area').html('');
    for(var i =0;i<areaName.length;i++){
      for(var j=0;j<areaName[i].length;j++){
        if(!len) return;
        if(location == areaName[i].substring(0,len)){
          var area = '<dd data-code="'+areaCode[i]+'">'+areaName[i]+'</dd>';
          $('.banner_select_area').append(area).show();
          break;
        }
      }
    }
    
    if(ev.keyCode==13){
      $('#area_input').val($('#area_input').val());
      $('.banner_select_area').hide();
    }
    input_now = $('#area_input').val();
  });
  
  $('#area_input').on('keydown',function(ev){
    if(ev.keyCode==40){  //向下
      input_index++;
      if(input_index==5){
        input_index=-1;
      }
      if(input_index==$('.banner_select_area').children().size()){
        input_index = -1;
      }
      
      if(input_index==-1){
        $('#area_input').val(input_now);
        $('.banner_select_area').children().css('color','#b6b3ad');
      }else{
        $('.banner_select_area').children().css('color','#b6b3ad');
        $('.banner_select_area').children()[input_index].style.color = '#fff';
        var sel_area_down = $('.banner_select_area').children()[input_index].innerHTML;
        var sel_area_down_id = $('.banner_select_area').children()[input_index].getAttribute('data-code');
        $('#area_input').val(sel_area_down).attr('data-code',sel_area_down_id);
         store.set('place_id',sel_area_down_id); //storage存储
      }
    }else if(ev.keyCode==38){  //向上
      input_index--;
      if(input_index==-2){
        if($('.banner_select_area').children().size()>5){
          input_index = 4;
        }else{
          input_index = $('.banner_select_area').children().size()-1;
        }
      }
      if(input_index==-1){
        $('#area_input').val(input_now);
        $('.banner_select_area').children().css('color','#b6b3ad');
      }else{
        $('.banner_select_area').children().css('color','#b6b3ad');
        $('.banner_select_area').children()[input_index].style.color = '#fff';
        var sel_area_up = $('.banner_select_area').children()[input_index].innerHTML;
        var sel_area_up_id = $('.banner_select_area').children()[input_index].getAttribute('data-code');
        $('#area_input').val(sel_area_up).attr('data-code',sel_area_up_id);
      }
      
    }
  });
   
  $('#banner_sel_area').on('click','dd',function(ev){
    var area_name = $(this).html();
    var area_id = $(this).attr('data-code');
    $('#area_input').val(area_name).attr('data-code',area_id);
    $('#banner_sel_area').find('.banner_select_area').hide();
    ev.stopPropagation();
    store.set('place_id',area_id); //storage存储
  });

  //订单私信hover效果
  $('#hotPhotog').on('mouseenter','.yue-button',function(){
    $(this).find('i').removeClass('yue-button-i').addClass('yue-button-ihover');
  });
  $('#hotPhotog').on('mouseleave','.yue-button',function(){
    $(this).find('i').removeClass('yue-button-ihover').addClass('yue-button-i');
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

  //我要拍出现联系方式
  $('.order-wo-pai').on('click',function(){
    $('.order-text-phone').fadeIn(400);
    $(this).hide();
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

  //摄影师主页跳转
  $('#hotPhotog').on('click','.header_textbox_headimg',function(){
     var ph_host = $(this).attr('data-code');
     window.open('/'+ph_host);
  });
  $('#hotPhotog figcaption').on('click','a',function(ev){
     var ph_host = $(this).attr('data-code');
     window.open('/'+ph_host);
  });

  $('#order_img_href,#order_name_href').click(function(ev){
     ev.stopPropagation();
     var ph_host = $(this).attr('data-code');
     window.open('/'+ph_host);
  }); 

  //查看全部需求按钮跳转页面
  $('#allDem-btn').click(function(){
      window.location.href = 'all.htm'/*tpa=http://paiwo.co/market/all*/;
  });

  $('#login_b').click(function(){
      window.location.reload();
  });

  //需求订单页Dom事件绑定

      //发布需求订单页面跳转
      $('.banner_submit').click(function(){
         window.location.href = 'create.htm'/*tpa=http://paiwo.co/market/create*/;
         store.set('refresh','outpage');
         //输入地区选择判断
         var photoAreaId = $('#area_input').attr('data-code'),  //获取约拍地区id
              photoArea = $('#area_input').val();  //获取约拍地区
          if(photoAreaId == ''){  //填写数据
            //判断输入地点是否在数据中
            for(var i=0;i<areaName.length;i++){
              if(photoArea==areaName[i]){     //在数据中
                photoAreaId = areaCode[i];
                store.set('place_id',photoAreaId);
              }
            }         
          }
      });

      function BannerLocalStorageShow() {
        var $sel_place_div = $('#sel_place').find('div');
        if($sel_place_div.attr('data-code') == store.get('sel_type')){
          $(this).find('i').addClass('active');           
        }        
      }

      //订单需求页我要拍
      $('#wo_pai').click(function(){
        $(this).hide();
        $('.wo-pai-box').slideDown();
      });

      //顶部top
      $('.top-tab').addClass('top_tab_opa');
      window.addEventListener('scroll',function(){
        var scrollT = document.documentElement.scrollTop||document.body.scrollTop;
        if(scrollT>40){
          $('.top-tab').removeClass('top_tab_opa');
        }else{
          $('.top-tab').addClass('top_tab_opa');
        }
      });
 });  //jquery 结束







    









