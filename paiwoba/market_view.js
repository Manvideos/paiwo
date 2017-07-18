
var market_view = {};
	
  //拍摄地区选择
  market_view.hotPhotog_html = '<li class="yue-photog-libox">'+
                  '<div class="photog-libox-head">'+
                  '{{if !cover_path}}'+
                    '<img style="width:280px;height:260px">'+                
                   '{{else}}'+
                      '<img src="http://image.paiwo.co/${cover_path}'+base.retinaPixel['w280h200']+'">'+
                    '{{/if}}'+
                    '<span></span>'+
                    '<div class="footPhotog-bacpic">'+
                      '<figure class="figure">'+
                        '<img data-code="${photographer_domain}" class="header_textbox_headimg" width="65" height="65" src="${market_view.HotPhotogImg(photographer_avatar)}">'+
                        '<figcaption><a data-code="${photographer_domain}">${photographer_name}</a></figcaption>'+
                        '<p class="clearfix">'+
                          '{{html market_view.hotPhotogPlace(photographer_location)}}'+
                        '</p>'+
                      '</figure>'+
                    '</div>'+
                   '</div>'+
                   '<button class="yue-button" data-code="${photographer_id}"><i class="yue-button-i"></i>联系TA</button>'+
                 '</li>';

  market_view.recentOrder_html = '<li data-code="${order_id}">'+
                    '<div class="aut-ul-left-left">'+
                    '<img id="recent_order_headimg" src="${market_view.recentOrderTypeImg(photograph_type)}">'+
                      '<span class="ul-left-black"><i class="${market_view.recentOrderTypeSpan(photograph_type)}"></i></span>'+
                      '<div class="ul-left-text">'+
                        '<p>{{html market_view.recentOrderType(photograph_type)}}</p>'+
                      '</div>'+
                    '</div>'+
                    '<div class="aut-ul-left-mid">'+
                      '<div class="left-mid-time">拍摄时间：'+
                        '{{html market_view.recentOrderTime(photograph_date)}}'+
                      '</div>'+
                      '<div class="left-mid-place">拍摄地点：'+
                      '{{html market_view.recentDemPlace(photograph_location)}}'+
                      '</div>'+
      
                     '<div class="left-mid-con"><u>来自</u><img id="order_img_href" data-code="${customer_domain}" src="${market_view.recentOrderImg(customer_avatar)}"><span id="order_name_href" data-code="${customer_domain}">${customer_name}</span></div>'+
                    '</div>'+
      
                    '<div class="aut-ul-left-right">'+
                      '<div class="left-mid-time">大致预算：<span><i>￥</i>${market_view.recentOrderPrice(photograph_price)}</span></div>'+
                    '</div>'+
                  '</li>';

  market_view.recentDem_html = '<li data-code="${order_id}">'+
                    '<p class="ul-right-li-head">'+
                      '{{html market_view.recentDemTime(photograph_date)}}'+
                    '</p>'+
                    '<p class="ul-right-li-mid">{{html market_view.recentOrderType(photograph_type)}}</p>'+
                    '<p class="ul-right-li-foot">{{html market_view.recentDemPlace(photograph_location)}}<span class="money"><i>￥</i>{{html market_view.recentOrderPrice(photograph_price)}}</span></p>'+
                  '</li>';

  market_view.type_html = ['','人像摄影','婚纱摄影','婚礼跟拍','家庭儿童','旅行跟拍','商业服务','其他'];


/////////////////////////////热门摄影师相关////////////////////////////////////

  // 显示热门摄影师+最新订单地区
  market_view.hotPhotogPlace = function (data){
        if(data == '0-0-0'|| data =='00-00-00'){
            return '未知';
        }
        else if( data == ''){
            return '';
        }      
             data = data+'-00';
        var  num1 = data.substring(0,5), 
        prov_code = num1+'-00-00',
        $pro_json = allArea['province']['02-00-00-00'],
             prov = '',
             city = '';
        if( prov_code == '02-33-00-00' || prov_code =='02-34-00-00') {
            prov = allArea['02-00-00-00'][prov_code]; 
            return '<span>中国</span><span>'+prov+'</span>';
        }
        else {
            for(var i in $pro_json){
                if( prov_code == i)
                    prov = $pro_json[i];               
            }
            city = allArea['city'][prov_code][data];          
            return '<span>'+prov+'</span><span>'+city+'</span>';
       }
          
  }

  //热门摄影师头像显示
  market_view.HotPhotogImg = function (data){
    if (data == '0' || data == '') {
      Other_photog_img = 'user_head.gif'/*tpa=http://paiwo.co/static/images/user_head.gif*/;
    }
    else {
      Other_photog_img = 'http://image.paiwo.co/'+data;
    }
    return Other_photog_img;
  }

 
  //显示热门摄影师
  market_view.showHotPhotog = function (data){  
    var hotPhotogs = $.tmpl(market_view.hotPhotog_html,data);
    hotPhotogs.slice(4,40).hide();
    $('.hot-phg-ul').html(hotPhotogs);    
  }

/////////////////////////////最新订单相关////////////////////////////////////

  //最新需求订单地区显示
  market_view.recentDemPlace = function (data){
        if(data == '0-0-0'){
            return '未知';
        }      
        var  num1 = data.substring(0,5),
             num2 = data.substring(0,2),
        prov_code = num1+'-00-00',
        $pro_json = allArea['province']['02-00-00-00'],
             prov = '',
             city = '';
        if( num2 == '01') {
          return '<span>'+allArea['province']['01-00-00-00'][data]+'</span>';
        }
        else {  
          if( prov_code == '02-33-00-00' || prov_code =='02-34-00-00') {
              prov = allArea['02-00-00-00'][prov_code]; 
              return '<span>中国</span><span>'+prov+'</span>';
          }
          else {
              for(var i in $pro_json){
                  if( prov_code == i)
                      prov = $pro_json[i];               
              }
              city = allArea['city'][prov_code][data];
              if(typeof city == 'undefined'){
                return '<span>'+prov+'</span>';
              }
              else {
                return '<span>'+prov+'</span><span>'+city+'</span>';
              }
          }
        }
  }

  //最新订单拍摄类型
  market_view.recentOrderType = function (data){
    orderType = '';
    orderType = market_view.type_html[data];  
      return orderType;
  }

  //最新订单价格
  market_view.recentOrderPrice = function (data){
  	orderPrice = '';
  	orderPrice = data[0]+'-'+data[1];
  	  return orderPrice;
  }

  //最新订单头像显示
      market_view.recentOrderImg = function (data){
        recentOrder_img = '';
        if(data == 0)
          recentOrder_img = 'user_head.gif'/*tpa=http://paiwo.co/static/images/user_head.gif*/;
        else {
          recentOrder_img = 'http://image.paiwo.co/'+data;
        }
          return recentOrder_img;
      }

      //最新订单拍摄时间
      market_view.recentOrderTime = function (data){
        var    orderTime = '';
        order_time_start = data[0].substring(0,4)+'/'+data[0].substring(5,7)+'/'+data[0].substring(8,10),
         order_end_start = data[1].substring(0,4)+'/'+data[1].substring(5,7)+'/'+data[1].substring(8,10);
         
           return '<span>'+order_time_start+'-'+order_end_start+'</span>';   
      }
      //最新订单拍摄类型图片显示
      market_view.recentOrderTypeSpan  = function (data){
          var order_i_class = '';
          switch (data){
            case 0:
              order_i_class = 'ul-left-black-i-all';
              break;
            case 1:
              order_i_class = 'ul-left-black-i-people';
              break;
            case 2:
              order_i_class = 'ul-left-black-i-wed';
              break;
            case 3:
              order_i_class = 'ul-left-black-i-wedding';
              break;
            case 4:
              order_i_class = 'ul-left-black-i-kid';
              break;
            case 5:
              order_i_class = 'ul-left-black-i-travel';
              break;
            case 6:
              order_i_class = 'ul-left-black-i-biz';
              break;
            case 7:
              order_i_class = 'ul-left-black-i-other';
              break;
          }
          return order_i_class;
      }

      //根据拍摄类型显示图标
      market_view.recentOrderTypeImg = function (data){
          order_img_src = '';
          switch (data){
              case 1:
                  order_img_src = '7716f090d2d36d5802a8dcae80e5b848@!280x280.jpg'/*tpa=http://image.paiwo.co/10763/album/7716f090d2d36d5802a8dcae80e5b848@!280x280*/;
                  break;
              case 2:
                  order_img_src = '0be8bca6db89a50d362b79901e3ffee4@!280x280.jpg'/*tpa=http://image.paiwo.co/10970/album/0be8bca6db89a50d362b79901e3ffee4@!280x280*/;
                  break;
              case 3:
                  order_img_src = 'd5d6070e9008012264d21c6bb367e82a@!280x280.jpg'/*tpa=http://image.paiwo.co/10903/album/d5d6070e9008012264d21c6bb367e82a@!280x280*/;
                  break;
              case 4:
                  order_img_src = 'bd532d6afcea6b59305a97f74ea11212@!280x280.jpg'/*tpa=http://image.paiwo.co/11058/album/bd532d6afcea6b59305a97f74ea11212@!280x280*/;
                  break;
              case 5:
                  order_img_src = '996cffd52115bd897815010e7396cd9d@!280x280.jpg'/*tpa=http://image.paiwo.co/10696/album/996cffd52115bd897815010e7396cd9d@!280x280*/;
                  break;
              case 6:
                  order_img_src = 'e87d7e5f8f7c6a01a1eeab4702ae4e8d@!280x280.jpg'/*tpa=http://image.paiwo.co/10742/album/e87d7e5f8f7c6a01a1eeab4702ae4e8d@!280x280*/;
                  break;
              case 7:
                  order_img_src = 'eea79f86978670389df4c5bc7a7fa727@!280x280.jpg'/*tpa=http://image.paiwo.co/10605/album/eea79f86978670389df4c5bc7a7fa727@!280x280*/;
                  break;
          }
          return order_img_src;
      }

  //显示最新订单
  market_view.showRecentOrder = function (data){
    var RecentOrder_html = $.tmpl(market_view.recentOrder_html,data);   
    $('#aut-ul-left').children().eq(-1).after(RecentOrder_html);
  }

/////////////////////////////推荐订单相关////////////////////////////////////

    //最近需求时间月+日
    market_view.recentDemTime = function (data){
      DemTime = '';
      DemTime = '<span>'+data[0].slice(5,7)+'/'+data[0].slice(8,10)+' - '+data[1].slice(5,7)+' / '+data[1].slice(8,10)+'</span>';
        return DemTime;
    }
      
    //显示推荐订单
    market_view.showRecentDem = function (data){
    	var RecentDem_html = $.tmpl(market_view.recentDem_html,data)
    	$('#recent_dem_ul').find('h4').after(RecentDem_html);
    }

    //显示推荐摄影师
    market_view.showOrderPhotog = function (data){  
      var hotPhotogs = $.tmpl(market_view.hotPhotog_html,data);      
      hotPhotogs.slice(8,80).hide();
      $('#order_creat_photoglist').html(hotPhotogs);    
    }