
jQuery(function(){
 

  BannerLocalStorageShow();

  var city_datacode = '', //ip datacode全局
	  detail_submit_bor = 'open', //提交订单按钮的开关
	  photographer_count = '',
	  photograph_type = 0,
	  photograph_location = ''; 

if(!store.get('place_id')){
	$('#place_error').show().find('span').html('未匹配到所选地点，已自动选择IP所在地点');
}
    
	//页面内外页显示
    if(store.get('refresh')=='inpage') {
    	$('.yuepai_main_tit').find('h2').html('我的订单')
    	$('#detai_btn').hide();
    	$('.yupai-foot-main').hide();
	    $('.yuepai_detail,.detail-sub').show();
	    $('#place_error').hide();
    }
    else {
    	$('.yuepai_main_tit').find('h2').html('推荐摄影师')
    	$('.yuepai-main-footPhotog').show();
    	$('#detai_btn').show();
    }

		//根据拍摄地区推荐摄影师
		$('#sel_prov dl').on('click','dd',function(){
			if(store.get('refresh') == 'outpage'){
				var area_code = $('#sel_prov').find('i').attr('data-code'),
				    prov_code = $(this).attr('data-code'),
				    c1 = area_code.substring(0,2);		    
			    if( c1 == '01'){	
		    		photograph_location = $(this).attr('data-code');
		    		photograph_type = $('#sel_type').find('.active').parent().attr('data-code');
		            orderPhotogajax(photograph_type,photograph_location);		    
			    }
				else if( c1 == '02') {		       
			        if( prov_code == '02-33-00-00' || prov_code == '02-34-00-00') {				      	
		    		   photograph_location = $(this).attr('data-code');
		    		   photograph_type = $('#sel_type').find('.active').parent().attr('data-code');
			           orderPhotogajax(photograph_type,photograph_location);		    		 
			        }
			    }
			}
			else{}     		    	
		});

        $('#sel_city dl').on('click','dd',function(){
        	if(store.get('refresh') == 'outpage'){
	      	 	photograph_location = $(this).attr('data-code');
	      	 	photograph_type = $('#sel_type').find('.active').parent().attr('data-code');
	            orderPhotogajax(photograph_type,photograph_location);
	        }		    		    	    		
      	 });
	 
	    //根据拍摄类型推荐摄影师
	    $('#sel_type div').on('click','i',function(){
	        photograph_type = $(this).parent().attr('data-code');
	        if(store.get('refresh') == 'outpage'){    	
	    		var c1 = $('#sel_area').find('i').attr('data-code').substring(0,2);
		    	if( c1 == '01'){
		    	    photograph_location = $('#sel_prov').find('i').attr('data-code'); 
		    	}
		    	else {
		    		photograph_location = $('#sel_city').find('i').attr('data-code');
		    	}
		    	orderPhotogajax(photograph_type,photograph_location);
	    	}
	    });
    
    //提交详细订单
    var submit_bor = false;
        time_delet_bor = true;
    $('#detail_submit').click(function(){
    	submit_bor = true;
    	var photograph_location = false,
    	        photograph_type = 1,
    	        photograph_date = false,
    	photograph_people_count = 0,
    	  photograph_start_date = '',
    	    photograph_end_date = '',
    	      photograph_gender = 01,
    	     photograph_require = '', 
    	          contact_emial = false,
    	   photograph_low_price = 0,
    	  photograph_high_price = 500,
    	          contact_phone = '',
    	   photograph_money_bor = false, 
    	 photograph_require_bor = false,
    	    photograph_time_bor = false,
    	   photograph_email_bor = false,
    	   photograph_place_bor = false;

    	//获取地区值
    	var   area_code = $('#sel_area').find('i').attr('data-code'),
	    	  prov_code = $('#sel_prov').find('i').attr('data-code');
    	if(area_code) {
	    	var c1 = area_code.substring(0,2);
	    	if( c1 == '01') {
	    		photograph_location = prov_code;	
	    	}
	    	else {
	    		if(prov_code == '02-33-00-00' || prov_code == '02-34-00-00'){
	    			photograph_location = prov_code;
	    		}
	    		else {
	    			photograph_location = $('#sel_city').find('i').attr('data-code');
	    		}
	    	}
	    }

    	//判断地区
    	if(photograph_location){
    		$('#place_error').hide();
    		photograph_place_bor = true;
    	}
    	else {
    		$('#place_error').show().find('span').html('请选择详细拍摄地点，以便我们为您挑选摄影师');
    		photograph_place_bor = false;
    	}

    	//获取拍摄类型
    	if($('#sel_type').find('i').hasClass('active')){
          photograph_type = $('#sel_type').find('.active').parent().attr('data-code');
        }
        else{
          photograph_type = 0;
        }

        //获取拍摄时间
        var FontYear  = '',
            FontMonth = '',
            FontDay   = '',
            NextYear  = '',
           NextMonth  = '',
             NextDay  = '';
         FontYear = $('#year').find('i').html();
        FontMonth = $('#month').find('i').html();
          FontDay = $('#day').find('i').html();
         NextYear = $('#year2').find('i').html();
        NextMonth = $('#month2').find('i').html();
          NextDay = $('#day2').find('i').html();

        photograph_start_date = FontYear+'-'+FontMonth+'-'+FontDay;
          photograph_end_date = NextYear+'-'+NextMonth+'-'+NextDay;

        //判断拍摄的时间
        var FontTimeDate = new Date(),
            NextTimeDate = new Date();
            FontTimeDate.setFullYear(FontYear);
            FontTimeDate.setMonth(FontMonth-1,FontDay);
            NextTimeDate.setFullYear(NextYear);
            NextTimeDate.setMonth(NextMonth-1,NextDay);
             FontTimeMus = FontTimeDate.getTime(FontTimeDate);
             NextTimeMus = NextTimeDate.getTime(NextTimeDate);
        if(photograph_start_date == '年-月-日' || photograph_end_date == '年-月-日') {
        	$('#time_error').show();
        }
        else {
        	if ( FontTimeDate >  NextTimeMus){
        	   $('#time_error').show();
        	   photograph_time_bor = false;
        	}
            else{
               $('#time_error').hide();
               photograph_time_bor = true;
            }
        }

        //判断时间有没有被删
        if($('.yuepai_detail').find('.select').length == 6){
        	time_delet_bor = true;
        }
        else {
        	time_delet_bor = false;
        }

        //获取拍摄人数+性别
        var  photograph_people_val = $('.photo_people_box input').val(),
                 photograph_gender = $('.photo_sex_radio').find('.active').parents('.radio').attr('data-code');
           photograph_people_count = /^[0-9]*[1-9][0-9]*$/.test(photograph_people_val);

	    //判断人数+性别
	    if (photograph_type == 3 || photograph_type == 6 || photograph_type == 7){
	    	if(!$('.photo_sex_radio').find('i').hasClass('active')){
	    		photograph_gender = 0;
	    		photograph_money_bor = true;
	    	}
	    	else {
	    		photograph_gender = $('.photo_sex_radio').find('.active').parents('.radio').attr('data-code');
	    		photograph_money_bor = true;
	    	}

	    	if(photograph_people_val == ''){
	    		photograph_people_val = 0;
	    		photograph_money_bor = true;
	    	}
	    	else {
	    		if(photograph_people_count){
	    			$('#num_error').hide();
	    			photograph_money_bor = true;
	    		}
	    		else {
	    			$('#num_error').show();
	    			photograph_money_bor = false;
	    		}
	    	}
	    }
	    else {
	    	if(photograph_people_count && photograph_people_val > 0){
	    		if(!$('.photo_sex_radio').find('i').hasClass('active')){
	        	    $('#num_error').show().find('span').html('请选择性别');
	        	    photograph_money_bor = false;
		        }
		        else {
		        	$('#num_error').hide();
		        	photograph_money_bor = true;
		        }
	    	}
	        else{
	        	if(!$('.photo_sex_radio').find('i').hasClass('active')){
	        	    $('#num_error').show().find('span').html('请选择性别');
	        	    photograph_money_bor = false;
		        }
		        else {
		        	$('#num_error').show().find('span').html('请正确填写人数');
		        	photograph_money_bor = false;
		        }
	        }
	        
	    }


	    //获取期望风格
	    photograph_require = $('.textarea').val();

	    //判断期望字数
	    if($('.textarea-tip').find('i').html() <= 120){
	    	photograph_require_bor = true;
	    }
	    else {
	    	photograph_require_bor = false;
	    	$('.textarea').addClass('price-textarea-excced');
	    }

	    //获取邮箱
	    contact_email = $('.photo_connect_emial').val().replace(/(^\s*)|(\s*$)/g,'');

	    //判断邮箱
	    if( contact_email == '') {
	    	$('#email_error').show();
	    }
	    else {
	    	if(/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(contact_email) == false) {
	    		$('#email_error').show().find('span').html('请填写正确的邮箱格式');
	    		photograph_email_bor = false;	
	    	}
	    	else 
	    		$('#email_error').hide();
	    		photograph_email_bor = true;
	    }

	    //获取价格
	    photograph_low_price = $('.b-left').html().substring(1);
	    photograph_high_price = $('.b-right').html().substring(1);

	    //获取联系电话
	    contact_phone = $('.photo_connect_phone').val();
         
        //判断全部正确显示，提交请求

     if( photograph_money_bor && photograph_place_bor && photograph_time_bor && photograph_require_bor && photograph_email_bor && $('#email_error').css('display') == 'none' && time_delet_bor){
    	
    	$('.alert_body').show();
        $('#detail_submit_box').fadeIn();

	        $('#detail_submit_btn').click(function(){
	          if(detail_submit_bor == 'open'){
	        	  detail_submit_bor = 'close';
		        	$.ajax({
				         url: '/rest',
				        type: 'POST',
				    dataType: 'json',
				       async: false,
				        data: {
				          data: JSON.stringify({
				          'method': 'paiwo.market.order.create',
				          'photograph_location': photograph_location,
				          'photograph_type': photograph_type,
				          'photograph_start_date': photograph_start_date,
				          'photograph_end_date': photograph_end_date,
				          'photograph_low_price': photograph_low_price,
				          'photograph_high_price': photograph_high_price,
				          'photograph_people_count': photograph_people_val,
				          'photograph_gender': photograph_gender,
				          'photograph_require': photograph_require,
				          'contact_phone': contact_phone,
				          'contact_email': contact_email
				         })
				    },
				    success:function (data){
				        if(data.error_id == 0) {
				           window.location.href = 'market.htm'/*tpa=http://paiwo.co/market/*/+data.response.order_id;
				           store.set('refresh','outpage');		
				        }
				      },

				      error:function(data){

				      }
				  });
			  }else{
			  	return;
			  }
	       });
        
	}
		//取消订单发布
		$('#detail_cancel_btn').click(function(){
			$('.alert_body').fadeOut();
		});
  
    });
    


//////////////////////DOM事件绑定//////////////////////

      //document click事件
	  function closeSelect(){  
	    $('.place_select,.timeselect_select').fadeOut(200);
	  }

	  $(document).click(function(){
	    closeSelect();
	  });

	  //下拉框点击
	  $('.select').click(function(ev){
	  	  ev.stopPropagation();
	  	  if($(this).find('dl').css('display') == 'none'){
		  	$(this).find('dl').toggle().parent().siblings().find('dl').slideUp(50);
		  }
		  else{
		  	$(this).find('dl').slideUp(50);
		  }		  
	  });

	  //地区初始化、取json
	  $sel_area = $('#sel_area');
	  $sel_prov = $('#sel_prov');
	  $sel_city = $('#sel_city');

	  var $area_json = allArea['area'],
	  $province_json = allArea['province'],
	      $city_json = allArea['city'];  

	  //海外隐藏第三级地区
	  function dis_hide(){
	  	if( area_val == '01-00-00-00') {
	  	  $sel_city.hide();
	    }
	    else {
	  	  $sel_city.show();
	     };
	  }; 

          //第二级地区不为空时 三级联动
		  (function(){
		  	  if($sel_area.find('i').html() == '请选择'){
		  	  	$sel_area.siblings('.select').hide();
		  	  }
		  	  else {
		  	  	$sel_area.siblings('.select').show();
		  	  }
		  	  var area_code = $sel_prov.find('i').attr('data-code');
		  	    if(!area_code == ''){
			  	      prov_code = $sel_prov.find('i').attr('data-code'),
					       c1 = area_code.substring(0,2);
				  	  if(!prov_code == ''){
				  	  	var prov_frag = '',
				  	  		city_frag = '';
				  	  	if( c1 == '01'){
				  	  		for(var i in $province_json['01-00-00-00']){
				  	  			prov_frag += '<dd data-code='+i+'>'+$province_json['01-00-00-00'][i]+'</dd>';
				  	  		}
				  	  	}
				  	  	else {
				  	  		for(var i in $province_json['02-00-00-00']){
				  	  			prov_frag += '<dd data-code='+i+'>'+$province_json['02-00-00-00'][i]+'</dd>';
				  	  		}
				  	  		for (var i in $city_json[prov_code]){
					      		city_frag += '<dd data-code='+i+'>'+$city_json[prov_code][i]+'</dd>';
					        }
				  	  	} 			    
					    $sel_prov.find('dl').html(prov_frag);
					    $sel_city.find('dl').html(city_frag);
					    $sel_city.find('i').html($sel_city.find('dl').children().eq(0).html());
				      }
			    }
		  })();

		//一级地区
		$sel_area.on('click','dd',function(){
			$sel_prov.show();
			area_i = $(this).html();   //一级地区值
			var area_code = $(this).attr('data-code'),
				       c1 = area_code.substring(0,2);
			$(this).parents('#sel_area').find('i').html(area_i).attr('data-code',area_code);
		 
		    //二级联动
		    var pro_frag ='';
		      area_val = $sel_area.find('i').attr('data-code');  	  
		    for(var i in $province_json[area_val]){
		  	  pro_frag += '<dd data-code='+i+'>'+$province_json[area_val][i]+'</dd>'; 	
		    }
		    $sel_prov.find('dl').html(pro_frag);
		         var pro_dd = $sel_prov.find('dl').children().eq(0),
		        pro_dd_html = pro_dd.html(),
		        pro_dd_data = pro_dd.attr('data-code');
		    $sel_prov.find('i').html(pro_dd_html)
		    $sel_prov.find('i').attr('data-code',pro_dd_data);

	      dis_hide();

		  //隐藏错误提示
		  $('#place_error').hide();

		  //第二级地区不为空时 三级联动
		  (function(){
		  	  if($sel_prov.find('i').attr('data-code') == '02-01-00-00'){
		  	  	 var city_frag = '';		   
			    for (var i in $city_json['02-01-00-00']){
			      city_frag += '<dd data-code='+i+'>'+$city_json['02-01-00-00'][i]+'</dd>';
			    }
			    $sel_city.find('dl').html(city_frag);
			    $sel_city.find('i').attr('data-code','02-01-01-00');
			    $sel_city.find('i').html($sel_city.find('dl').children().eq(0).html());
		      }
		  })();
		  if(c1 == '01'){
		  	var photograph_location = $sel_prov.find('dl').children().eq(0).attr('data-code');
		  }
		  else {
		    var photograph_location = $sel_city.find('dl').children().eq(0).attr('data-code');
		  }
		  if(store.get('refresh') == 'outpage'){
		      orderPhotogajax(photograph_type,photograph_location);
		  }
	  });
	  	  

	  //第二级地区 三级联动
	  $sel_prov.on('click','dd',function(){
	    var city_frag = '',
	        area_code = $sel_area.find('i').attr('data-code'),
	           prov_i = $(this).html(),   //二级地区的值
	        prov_code = $(this).attr('data-code');
	    $sel_prov.find('i').html(prov_i).attr('data-code',prov_code); 
	   
	    for (var i in $city_json[prov_code]){
	      city_frag += '<dd data-code='+i+'>'+$city_json[prov_code][i]+'</dd>';
	    }
	    $sel_city.find('dl').html(city_frag);
	    $sel_city.find('i').html($sel_city.find('dl').children().eq(0).html());
	    var photograph_location = $sel_city.find('dl').children().eq(0).attr('data-code');

	    //国内隐藏部分第三级地区
	    if(prov_code == '02-33-00-00' || prov_code == '02-34-00-00' || area_code == '01-00-00-00') {
	    	$sel_city.hide();
	    }
	    else {
	    	$sel_city.show();
	    }

	    //隐藏错误提示
		$('#place_error').hide();
		if(store.get('refresh') == 'outpage'){
			orderPhotogajax(photograph_type,photograph_location);
		}
	  });

	  //第三级地区选择
	  $sel_city.on('click','dd',function (){
	  	var city_code = $(this).attr('data-code');
	  	       city_i = $(this).html(); //三级地区的值
	    $sel_city.find('i').html(city_i)
	    $sel_city.find('i').attr('data-code',city_code);

	    //隐藏错误提示
		$('#place_error').hide();
	  });


	  //拍摄类型选择
      $('.photo_types>div i').click(function() {
	      $(this).addClass('active').parent().siblings().find('i').removeClass('active');
	  });

	  //时间选择
	  $('.yuepai_main_timeselect').on('click','dd',function(){
	    var time_dd = $(this).html();
	    $(this).parents('.yuepai_main_timeselect').find('i').html(time_dd);
	  });

	  function showDay(year, month){
	  	var day_frag = '',
	  	    year_val = $('#year').find('i').html(),
	  	   month_val = $('#month').find('i').html(),
		    max = (new Date(year_val,month_val,0)).getDate();
			for(var i=1; i<max+1;i++){
			  day_frag +='<dd>'+i+'</dd>';
			}
			$('#day').find('dl').html(day_frag);
			$('#day').find('i').html($('#day').find('dd').eq(0).html());
			//结束时间联动
			$('#day2').find('dl').html(day_frag);
			$('#day2').find('i').html($('#day2').find('dd').eq(0).html());
			TimeJuge();
	 }

	 function showDay2(year, month){
	  	var day_frag = '',
	  	    year_val = $('#year2').find('i').html(),
	  	   month_val = $('#month2').find('i').html(),
		    max = (new Date(year_val,month_val,0)).getDate();
			for(var i=1; i<max+1;i++){
			  day_frag +='<dd>'+i+'</dd>';
			}
			$('#day2').find('dl').html(day_frag);
			$('#day2').find('i').html($('#day2').find('dd').eq(0).html());
			TimeJuge();
	 }

	  //选择年
	  year_frag = '';
	  for( var i=2015;i<2017;i++) {
	  	 year_frag += '<dd>'+i+'</dd>';
	  }
	  $('#year,#year2').find('dl').html(year_frag);

	  //font 年
	  $('#year').on('click','dd',function(){
	  	  var month_frag = '',
	                date = new Date();
	            time_now = date.getMonth()+1;
	  	  if($(this).html() == '2015'){		      
			  for(var i=time_now; i<13;i++) {
			  	month_frag += '<dd>'+i+'</dd>';
			  }
			  $('#month').find('dl').html(month_frag);
			  $('#month').find('i').html($('#month').find('dd').eq(0).html());

			  //结束时间联动
			  $('#year2').find('i').html($(this).html());
			  $('#year2').find('dl').html('<dd>2015</dd><dd>2016</dd>');
			  $('#month2').find('dl').html(month_frag);
			  $('#month2').find('i').html($('#month2').find('dd').eq(0).html()); 
			  year_val = $('#year,#year2').find('i').html();
			  
	          //当年三级联动
			  (function(){
			  	 var day_frag = '',
			  	     date = new Date(),
			  	 time_i_month = $('#month').find('i').html(),
			  	 time_now_month = date.getMonth()+1,
			  	 time_now_day = date.getDate(),
			    max = (new Date(year_val,time_now_month,0)).getDate();
			    if(time_i_month == time_now_month){
					for(var i=time_now_day; i<max+1;i++){
					  day_frag +='<dd>'+i+'</dd>';
					}
					$('#day').find('dl').html(day_frag);
					$('#day').find('i').html($('#day').find('dd').eq(0).html());

					//结束时间联动
					$('#day2').find('dl').html(day_frag);
					$('#day2').find('i').html($('#day2').find('dd').eq(0).html());
				}	
			  })();
		  }
		  else {
		  	$('#year2').find('i').html('2016');
		  	$('#year2').find('dl').html('<dd>2016</dd>');
		  	$('#month2').find('i').html('1');
		  	for(var i=1; i<13;i++) {
			  	month_frag += '<dd>'+i+'</dd>';
			}
			$('#month').find('dl').html(month_frag);
			$('#month').find('i').html($('#month').find('dd').eq(0).html());
			showDay();
		  }

		  TimeJuge();
	   });

	   //next 年
	   $('#year2').on('click','dd',function(){
	  	  var month_frag = '',
	                date = new Date();
	            time_now = $('#month').find('i').html();
	  	  if($(this).html() == '2015'){		      
			  for(var i=time_now; i<13;i++) {
			  	month_frag += '<dd>'+i+'</dd>';
			  }
			  $('#month2').find('dl').html(month_frag);
			  $('#month2').find('i').html($('#month2').find('dd').eq(0).html());
			  year_val = $('#year2').find('i').html();
			  
	          //当年三级联动
			  (function(){
			  	 var day_frag = '',
			  	    month_val = $('#month').find('i').html(),
			  	 time_now_day = $('#day').find('i').html(),
			    max = (new Date(year_val,month_val,0)).getDate();			    
				for(var i = time_now_day; i<max;i++){
				  day_frag +='<dd>'+i+'</dd>';
				}
				$('#day2').find('dl').html(day_frag);
				$('#day2').find('i').html($('#day2').find('dd').eq(0).html());
					
			  })();
		  }
		  else {
			  	for(var i=1; i<13;i++) {
				  	month_frag += '<dd>'+i+'</dd>';
				}
				$('#month2').find('dl').html(month_frag);
				$('#month2').find('i').html($('#month2').find('dd').eq(0).html());
				showDay2();
		  }
		  TimeJuge();
	   });
	 
	   //日		
	  $('#month').on('click','dd',function(){
	  	 var day_frag = '',
	  	 	month_frag = '',
	  	         date = new Date(),
		  	 time_now_month = date.getMonth()+1,
		  	 time_now_day = date.getDate(),
	  	month_val = $(this).html(),
	  	year_val = $('#year').find('i').html();

	  	//结束时间月联动
	  	$('#month2').find('i').html($(this).html());
	  	   for(var i = month_val; i<13;i++) {
		  	  month_frag += '<dd>'+i+'</dd>';
		   }
		$('#month2').find('dl').html(month_frag);

		//day联动
	  	if(month_val == time_now_month){     
		    max = (new Date(year_val,time_now_month,0)).getDate();
			for(var i=time_now_day; i<max+1;i++){
			  day_frag +='<dd>'+i+'</dd>';
			}
			$('#day').find('dl').html(day_frag);
			$('#day').find('i').html($('#day').find('dd').eq(0).html());
			//结束时间联动
			$('#day2').find('dl').html(day_frag);
			$('#day2').find('i').html($('#day2').find('dd').eq(0).html());					
		}
		else showDay();
	  });

	  $('#month2').on('click','dd',function(){
	  	 var day_frag = '',
	  	         date = new Date(),
		  	 time_now_month = date.getMonth()+1,
		  	 time_now_day = date.getDate(),
	  	  month_val = $(this).html(),
	  	  year_val = $('#year2').find('i').html();
	  	 if(month_val == time_now_month){     
		    max = (new Date(year_val,time_now_month,0)).getDate();
			for(var i=time_now_day; i<max+1;i++){
			  day_frag +='<dd>'+i+'</dd>';
			}
			$('#day2').find('dl').html(day_frag);
			$('#day2').find('i').html($('#day2').find('dd').eq(0).html());			
		}
		else	
	    	showDay2();
	  });

	  $('#day').on('click','dd',function(){
	  	var day_frag = '',
	  	    year_val = $('#year').find('i').html(),
	  	   month_val = $('#month').find('i').html(),
	  	     day_val = $(this).html(); 
	  	    max = (new Date(year_val,month_val,0)).getDate();
			for(var i = day_val; i<max+1;i++){
			  day_frag +='<dd>'+i+'</dd>';
			}
		$('#day2').find('dl').html(day_frag);
		$('#day2').find('i').html($(this).html());
	  });
	 

	  //拍摄人数选择
	  var $input = $('.photo_people_box').find('input'),
	      peo_num = parseInt($input.val());

	  $('.photo_people_box input').keydown(function(ev){
	  	if(ev.keyCode >47 && ev.keyCode <58 || ev.keyCode == 8) {
	  		return true;
	  	}
	  	else {
	  		return false;
	  	}
	  });

      $('.photo_people_box').on('input propertychange',function(){
      	  peo_num = parseInt($input.val());
      });
	  $('.photo_people_add').click(function(){
	    peo_num ++;
	    $input.val(peo_num);
	  });

	  $('.photo_people_reduce').click(function(){
	    if(peo_num >=1 ) {
	      peo_num --;
	      $input.val(peo_num);
	    }
	  });

      //大致预算
	  $('.cash_move_l').mousedown(function(event){
	    var cmL = parseInt($('.cash_move_l').css('left')),
	        oxP = event.clientX;
		    $(document).mousemove(function(event){
		      var oxF = event.clientX-oxP;
		      if( cmL+oxF >= 0 && cmL+oxF <= 600) {
		        $('.cash_move_l').css('left',cmL+oxF);
		        var car_pay = '';
		            car_pay = Math.round(parseInt((1/18)*(cmL+oxF)*(cmL+oxF))/100)*100;
		        $('.cash_move').find('.b-left').html('￥'+car_pay);
		        $('.cash_move_center').css('left',cmL+oxF);
		        if($('.cash_move_center').width() < 20){
		        	$(this).unbind('mousemove');
		        }
		      }
		      else {
		      	$(this).unbind('mousemove');
		      }
		    });
	  });
	  $(document).mouseup(function(){
	    $(this).unbind('mousemove');
	  }); 
	  $('.cash_move_r').mousedown(function(event){
	    var cmL = parseInt($('.cash_move_r').css('left')),
	        oxP = event.clientX;
		    $(document).mousemove(function(event){
		      var oxF = event.clientX-oxP;
		      if( cmL+oxF >= 0 && cmL+oxF <= 600) {
		        $('.cash_move_r').css('left',cmL+oxF);
		        var car_pay = '';
		            car_pay = Math.round(parseInt((1/18)*(cmL+oxF)*(cmL+oxF))/100)*100;
		        if( car_pay == 20000){
		        	$('.cash_move').find('.b-right').html('￥'+car_pay+'+');
		        }
		        else{
		        	$('.cash_move').find('.b-right').html('￥'+car_pay);
		        }
		        $('.cash_move_center').css('right',598-(cmL+oxF));
		        if($('.cash_move_center').width() < 20){
		        	$(this).unbind('mousemove');
		        }
		      }
		      else {
		      	$(this).unbind('mousemove');
		      }
		    });
	  });
	  $(document).mouseup(function(){
	    $(this).unbind('mousemove');
	  });

	  //备注字数的统计判断
	  $('.textarea').on('input propertychange',function(){
	  	var text_num = $(this).val().length;
	  	  $('.textarea-tip').find('i').html(text_num);
	  	 if(text_num > 120) {
	  	 	$('.textarea-tip').addClass('textarea-tip-excced');	  	 	
	  	 }
	  	 else {
	  	 	$('.textarea-tip').removeClass('textarea-tip-excced');
	  	 }
	  });

	  //去发起订单按钮  
   	  $('#detai_btn').click(function(){	     
	     if(is_login == 0){
	     	$('.tab-login-a').trigger('click');
	     }
	     else {
	     	//获取自己所有订单
	        $.ajax({
	               url: '/rest',
	              type: 'POST',
	          dataType: 'json',
	             async: false,
	             data: {
	                data:JSON.stringify({
	                  'method':'http://paiwo.co/static/js/market/paiwo.market.order.self_list.get',
	                    'page_no': 1,
	                    'page_size': 20
	                })
	             },

	              success:function (data){
	              	  if(data.response.order_list.length == 0){
	              	  	   SubmiteDetail(this);
				     	   store.set('refresh','inpage');
				     	   $('#place_error,#detai_btn').hide();
				     	   $('.detail-sub').show();
				     	   $('h2').html('我的订单');
	              	  }
	              	  else {
	              	  	  for(var i=0; i<data.response.order_list.length;i++){
			                  if(data.response.order_list[i].order_state == 1){
			                  	  var TimeTxet = data.response.order_list[i].photograph_date[1],
			                  	      Nowdate = new Date(),
			                  	    Orderdate = new Date(),
			                  	      Nowyear = Nowdate.getFullYear(),
			                  	     NowMonth = Nowdate.getMonth()+1,
			                  	      NowDate = Nowdate.getDate(),
			                  	         year = TimeTxet.substring(0,4),
			                  	        month = TimeTxet.substring(5,7),
			                  	          day = TimeTxet.substring(8,10);
	                                Orderdate.setFullYear(year,month,day);
	                                Nowdate.setFullYear(Nowyear,NowMonth,NowDate);
	                                 var OrderTime = Orderdate.getTime(),
	                                     NowTime = Nowdate.getTime();                            
	                              
	                              //未过期
	                              if(NowTime <= OrderTime) {
	                                  var order_id = data.response.order_list[i].order_id;  
				                  	  $('.alert_body').show();
				                  	  $('#order_tip_box').fadeIn();
				                  	  $('#order_tip_submit_btn').click(function(){
				                          window.location.href = 'market.htm'/*tpa=http://paiwo.co/market/*/+order_id;
				                          return;
				                      });
				                  }
				                  //已过期
				                  else {  
				                  	  SubmiteDetail(this);
							     	  store.set('refresh','inpage');
							     	  $('#place_error,#detai_btn').hide();
							     	  $('.detail-sub').show();
							     	  $('h2').html('我的订单');
							     	  return;
				                  }
				                return;        
			                  }
			                  else {
			                  	  SubmiteDetail(this);
						     	  store.set('refresh','inpage');
						     	  $('#place_error,#detai_btn').hide();
						     	  $('.detail-sub').show();
						     	  $('h2').html('我的订单');
			                  }
			              }
			           }		               
	              },

	              error:function(data){

	              }
	        });

	     }
	  });

	  //取消按钮，跳转页面
	  $('#detail_cancel').click(function(){
	  	 window.location.href = 'market.htm'/*tpa=http://paiwo.co/market*/;
	  });

	  //摄影师主页跳转
	  $('#order_creat_photoglist').on('click','.header_textbox_headimg',function(){
	     var ph_host = $(this).attr('data-code');
	     window.open('/'+ph_host);
	  });
	  $('#order_creat_photoglist figcaption').on('click','a',function(){
	     var ph_host = $(this).attr('data-code');
	     window.open('/'+ph_host);
	  });

	  //订单私信hover效果
	  $('#order_creat_photoglist').on('mouseenter','.yue-button',function(){
	    $(this).find('i').removeClass('yue-button-i').addClass('yue-button-ihover');
	  });
	  $('#order_creat_photoglist').on('mouseleave','.yue-button',function(){
	    $(this).find('i').removeClass('yue-button-ihover').addClass('yue-button-i');
	  });

	  //点击显示私信
	  $('#order_creat_photoglist').on('click','.yue-button',function(){
	  	  var scrollWidth = window.scrollWidth(),
	  	      marginLeft = -scrollWidth/2;
	  	  $('.yuepai_main_button').css({marginLeft: marginLeft+'px'});
	      $('#top_message').trigger('click');
    	  PWS.addTalk(this.getAttribute('data-code'));
      });
	  
	  $('.message_shadow').on('click',function(){
	     $('.yuepai_main_button').css({marginLeft: 0});
	  });

	  //关闭私信弹窗
	  $('.message_close').on('click',function(){
	  	  $('.yuepai_main_button').css({marginLeft: 0});
	  	  $('.alert_body').fadeOut();
	  });

	  $('#order_tip_cancel_btn').click(function(){
	  	$('.alert_body').fadeOut();
	  	$(this).parents('#order_tip_box').fadeOut();
	  });

	  //判断邮箱
	  $('.photo_connect_emial').on('input propertychange',function(){
	  	var contact_email = $(this).val();
	  	 if(/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(contact_email) == true){
	  	 	$('#email_error').hide();
	  	 	photograph_email_bor = true;
	  	 }
	  });

	  //根据拍摄类型显示人数+性别
	    $('#sel_type div').on('click','i',function(){
	        var photograph_type = $(this).parent().attr('data-code');  	
			if( photograph_type == 3 || photograph_type == 6 ||  photograph_type == 7){
				$('.photo_people_box').find('input').val('');
	            $('.photo_main_people,.photo_main_sex').slideUp(200);
				$('.photo_sex_radio').find('i').removeClass('active');
				$('.photo_sex_radio').find('.radio').find('i').hide();
			}
			else {
				$('.photo_main_people,.photo_main_sex').slideDown(200);
				$('.photo_people_box').find('input').val(1);
				peo_num = 1;				
				$('.photo_sex_radio').find('.radio').eq(0).find('i').show().addClass('active').parents('.radio').siblings().find('i').hide().removeClass('active');
			}
	    });

	    if(submit_bor){
	    	$('#sel_type div').on('click','i',function(){
	    		photograph_type = $(this).parent().attr('data-code');  	
			    if( photograph_type == 3 || photograph_type == 6 ||  photograph_type == 7){
			    	$('#num_error').hide();
			    }
	    	});
	    }
      
      //备注字数的统计判断
	  $('.textarea').on('input propertychange',function(){
	  	if(submit_bor){
		  	 var text_num = $(this).val().length;
		  	  $('.textarea-tip').find('i').html(text_num);
		  	 if(text_num > 120) {
		  	 	$('.textarea-tip').addClass('textarea-tip-excced');
		  	 	$(this).addClass('price-textarea-excced');	  	 	
		  	 }
		  	 else {
		  	 	$('.textarea-tip').removeClass('textarea-tip-excced');
		  	 	$(this).removeClass('price-textarea-excced');
		  	 }
		}
	  });

	  //性别选择
	  $('.radio').on('click',function(){
	  	var photograph_type = $('#sel_type').find('.active').parent().attr('data-code');
	  	if( photograph_type == 3 || photograph_type == 6 ||  photograph_type == 7){
	  		if($(this).find('i').css('display') == 'none'){
	  		  $(this).find('i').addClass('active').parents('.radio').siblings().find('i').removeClass('active');
	  		  $(this).find('i').show().parents('.radio').siblings().find('i').hide();
	  		}
	  		else{
	  		  $(this).find('i').removeClass('active');
	  		  $(this).find('i').hide();	
	  		}
	  	}
	  	else {
	  		$(this).find('i').addClass('active').parents('.radio').siblings().find('i').removeClass('active');
			$(this).find('i').show().parents('.radio').siblings().find('i').hide();
	    }
      });

      //推荐摄影师换一批
	  var flag = 0;
      $('.yupai-foot-main').on('click','.change_list',function(){
        var n = parseInt(photographer_count/8),
            m = photographer_count%8,
            t = $('.yue-photog-libox');
        t.slice(flag*8, flag*8+8).hide();
        if( n == 1 ){
          flag = flag == 1? 0 : flag+1;
        }else {
          if( m == 0 ){
            flag = flag == n-1? 0 : flag+1;
          }else {
            flag = flag == n? 0 : flag+1;
          }    
        }       
        t.slice(flag*8, flag*8+8).stop(true,true).fadeIn();
      });

///////////////////////////函数封装///////////////////////////////////

       //去发布详细订单按钮函数
	   function SubmiteDetail(data){
	      $(data).hide();
	      $('.yupai-foot-main').hide();
	      $('.yuepai_detail,.detail-sub').show();
	   }

	   //根据集市首页记录显示函数
	   function BannerLocalStorageShow() {
			//拍摄类型显示
		    if(store.get('place_id') && store.get('sel_type')){
		    	BannerPlace(store.get('place_id'));
		    	BannerType();
		    	orderPhotogajax(store.get('sel_type'),store.get('place_id'));
		    }
		    else if(store.get('place_id') && !store.get('sel_type')){
		    	BannerPlace(store.get('place_id'));
		    	NoTypeOrderPhotogajax(store.get('place_id'));
		    }
		    else if(store.get('sel_type') && !store.get('place_id')){
		    	getIPCode();
		    	BannerType();
		    	BannerPlace(IPcity_code);
		    	NoOrderPhotogajax(store.get('sel_type'));
		    }
		    else if (!store.get('sel_type') && !store.get('place_id')){
		    	AllNoOrderPhotogajax();
		    	getIPCode();
		    	BannerPlace(IPcity_code);
		    }

		    function BannerType(){   	
		    	var sel_place_div = $('#sel_type').find('div');
		    	 sel_place_div.find('i').removeClass('active');
				for(var i=0; i<sel_place_div.length; i++) {		
				    if(sel_place_div[i].getAttribute('data-code') == store.get('sel_type')){
				    	$sel_place_type_list = $(sel_place_div[i]);
				    	$sel_place_type_list.find('i').addClass('active'); 			
				    }
				}
		    }
			
		    function BannerPlace(data){
			 	//拍摄地点显示
			 	var  banner_area_code = data,
			    	       $area_json = allArea['area'],
					   $province_json = allArea['province'],
					       $city_json = allArea['city'],
						    area_code = '',
					 	    area_val  = '',
					 	    prov_code = '',
					 	     prov_val = '',
					 	    city_code = '',
					 	     city_val = '',
			 	                   c1 = banner_area_code.substring(0,2),
			 	                   c2 = banner_area_code.substring(0,5);
			    //海外
			 	if( c1 == '01') {
			 	  $('#sel_city').hide();
			 	    area_code = '01-00-00-00';
			 	  $('#sel_area').find('i').attr('data-code','01-00-00-00').html($area_json[area_code]);	  
			 	  $('#sel_prov').find('i').attr('data-code',banner_area_code).html($province_json[area_code][banner_area_code]);	  
			 	}

			 	//国内地区显示
			 	else if ( c1 == '02') {
			 		area_code = '02-00-00-00';
			 		prov_code = c2+'-00-00';
			 		if(c2 == '02-33' || c2 == '02-34') {
			 			$('#sel_city').hide();
			 			$('#sel_area').find('i').attr('data-code','02-00-00-00').html($area_json[area_code]);
			 			$('#sel_prov').find('i').attr('data-code',banner_area_code).html($province_json[area_code][banner_area_code]);
			 		}
			 		else {
			 	  		$('#sel_area').find('i').attr('data-code','02-00-00-00').html($area_json[area_code]); 	    
			 	  		$('#sel_prov').find('i').attr('data-code',prov_code).html($province_json[area_code][prov_code]);
			 	  		$('#sel_city').find('i').attr('data-code',banner_area_code).html($city_json[prov_code][banner_area_code]);
			 	    }
			 	}
			}
			
		}

   		//地区，类型都有记录的ajax请求函数
		function orderPhotogajax(data1,data2){
			$.ajax({
			         url: '/rest',
			        type: 'POST',
			    dataType: 'json',
			       async: true,
			        data: {
			          data: JSON.stringify({
			          'method': 'paiwo.market.order.simple.submit',
			          'photograph_type': data1,
			          'photograph_location': data2

			         })
			    },
			    success:function (data){
			        if(data.error_id == 0) {
			        	photographer_count = data.response.photographer_count;
			        	market_view.showOrderPhotog(data.response.photographer_list);
			        	if(photographer_count == 0){
			        		$('#yuepai_main_footPhotog_h3').hide();
			        		$('#yuepai_main_footPhotog_box').show();
			        		$('.change_list').hide();
			        	}
			        	else if(photographer_count <= 8){
			        		$('#yuepai_main_footPhotog_h3').show();
			        		$('#yuepai_main_footPhotog_box').hide();
			        		$('.change_list').hide();
			        	}
			        	else {
			        		$('#yuepai_main_footPhotog_h3').show();
			        		$('#yuepai_main_footPhotog_box').hide();
			        		$('.change_list').show();
			        		flag = 0
			          	}	   
			        }
			      }
			  });
		}

		//地区无记录，类型有记录的ajax请求函数
		function NoOrderPhotogajax(data){
			getIPCode();
			$.ajax({
			         url: '/rest',
			        type: 'POST',
			    dataType: 'json',
			       async: true,
			        data: {
			          data: JSON.stringify({
			          'method': 'paiwo.market.order.simple.submit',
			          'photograph_type': 0,
			          'photograph_location': IPcity_code
			         })
			    },
			    success:function (data){
			        if(data.error_id == 0) {
			        	photographer_count = data.response.photographer_count;
			        	market_view.showOrderPhotog(data.response.photographer_list);
			            if(photographer_count == 0){
			        		$('#yuepai_main_footPhotog_h3').hide();
			        		$('#yuepai_main_footPhotog_box').show();
			        		$('.change_list').hide();
			        	}
			        	else if(photographer_count <= 8){
			        		$('#yuepai_main_footPhotog_h3').show();
			        		$('#yuepai_main_footPhotog_box').hide();
			        		$('.change_list').hide();
			        	}
			        	else {
			        		$('#yuepai_main_footPhotog_h3').show();
			        		$('#yuepai_main_footPhotog_box').hide();
			        		$('.change_list').show();
			        		flag = 0;
			          	}	
			        }
			      }
			  });
		}

		//地区有记录，类型无记录的ajax请求函数
		function NoTypeOrderPhotogajax(data){
			$.ajax({
			         url: '/rest',
			        type: 'POST',
			    dataType: 'json',
			       async: true,
			        data: {
			          data: JSON.stringify({
			          'method': 'paiwo.market.order.simple.submit',
			          'photograph_type': 0,
			          'photograph_location': data
			         })
			    },
			    success:function (data){
			        if(data.error_id == 0) {
			        	photographer_count = data.response.photographer_count;
			            market_view.showOrderPhotog(data.response.photographer_list);
			            if(photographer_count == 0){
			        		$('#yuepai_main_footPhotog_h3').hide();
			        		$('#yuepai_main_footPhotog_box').show();
			        		$('.change_list').hide();
			        	}
			        	else if(photographer_count <= 8){
			        		$('#yuepai_main_footPhotog_h3').show();
			        		$('#yuepai_main_footPhotog_box').hide();
			        		$('.change_list').hide();
			        	}
			        	else {
			        		$('#yuepai_main_footPhotog_h3').show();
			        		$('#yuepai_main_footPhotog_box').hide();
			        		$('.change_list').show();
			        		flag = 0
			          	}	
			        }
			      },

			      error:function(data){

			      }
			  });
		}

		//地区无记录，类型无记录的ajax请求函数
		function AllNoOrderPhotogajax(){
			getIPCode();
			$.ajax({
			         url: '/rest',
			        type: 'POST',
			    dataType: 'json',
			       async: true,
			        data: {
			          data: JSON.stringify({
			          'method': 'paiwo.market.order.simple.submit',
			          'photograph_type': 0,
			          'photograph_location': IPcity_code
			         })
			    },
			    success:function (data){
			        if(data.error_id == 0) {
			        	photographer_count = data.response.photographer_count;
			            market_view.showOrderPhotog(data.response.photographer_list);
			            if(photographer_count == 0){
			        		$('#yuepai_main_footPhotog_h3').hide();
			        		$('#yuepai_main_footPhotog_box').show();
			        		$('.change_list').hide();
			        	}
			        	else if(photographer_count <= 8){
			        		$('#yuepai_main_footPhotog_h3').show();
			        		$('#yuepai_main_footPhotog_box').hide();
			        		$('.change_list').hide();
			        	}
			        	else {
			        		$('#yuepai_main_footPhotog_h3').show();
			        		$('#yuepai_main_footPhotog_box').hide();
			        		$('.change_list').show();
			        		flag = 0
			          	}	       
			        }
			      },

			      error:function(data){

			      }
			  });
		}

    function TimeJuge(){
    	if(submit_bor){
	       //获取拍摄时间
	        var FontYear  = '',
	            FontMonth = '',
	            FontDay   = '',
	            NextYear  = '',
	           NextMonth  = '',
	             NextDay  = '';
	         FontYear = $('#year').find('i').html();
	        FontMonth = $('#month').find('i').html();
	          FontDay = $('#day').find('i').html();
	         NextYear = $('#year2').find('i').html();
	        NextMonth = $('#month2').find('i').html();
	          NextDay = $('#day2').find('i').html();

	        photograph_start_date = FontYear+'-'+FontMonth+'-'+FontDay;
	          photograph_end_date = NextYear+'-'+NextMonth+'-'+NextDay;

	        //判断拍摄的时间
	        var FontTimeDate = new Date(),
	            NextTimeDate = new Date();
	            FontTimeDate.setFullYear(FontYear);
	            FontTimeDate.setMonth(FontMonth-1,FontDay);
	            NextTimeDate.setFullYear(NextYear);
	            NextTimeDate.setMonth(NextMonth-1,NextDay);
	             FontTimeMus = FontTimeDate.getTime(FontTimeDate);
	             NextTimeMus = NextTimeDate.getTime(NextTimeDate);
	        if(photograph_start_date == '年-月-日' || photograph_end_date == '年-月-日') {
	        	$('#time_error').show();
	        }
	        else {
	        	if ( FontTimeDate >  NextTimeMus){
	        	   $('#time_error').show();
	        	   photograph_time_bor = false;
	        	}
	            else{
	               $('#time_error').hide();
	               photograph_time_bor = true;
	            }
	        } 
		}
    }

    //根据IP显示推荐摄影师
	function getIPCode(){
	   if(city[city.length -1] == '市'){
	     city = city.slice(0, city.length-1);
	     for(var j=0;j<areaName.length;j++){
	       if(areaName[j] == city){
	         break;
	       }
	     }
	     if(j > 467){ 
	       IPcity_code = '02-00-00-00';    
	     }
	     else {
	       IPcity_code = areaCode[j];
	     }
	  }
	  else {
	    for(var j=0;j<areaName.length;j++){
	       if(areaName[j] == city){
	         break;
	       }
	     }
	     if(j > 467){
			IPcity_code = '02-00-00-00';    
	     }
	     else {
	       IPcity_code = areaCode[j];
	     }
	  }
	   return IPcity_code;
	};  
});