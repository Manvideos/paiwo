var hometm={};hometm.photog_tm='<li data="${user_name}">'+'<a href="http://paiwo.co/${user_domain}" class="phers-li-a" target="_blank">'+'<div class="index-phers-head">'+'<img src="http://image.paiwo.co/${avatar}">'+'<i class="index-phers-hot"></i>'+"</div>"+"</a>"+'<a class="pers-name" href="http://paiwo.co/${user_domain}" target="_blank">${user_name}</a>'+"{{if follow_state == 1}}"+'<a class="photog_add" data="${user_id}">'+"+ 关注</a>"+"{{else follow_state == 2}}"+'<a class="photog_added_2" data="${user_id}">'+"<i></i>已关注</a>"+"{{else follow_state == 3}}"+'<a class="photog_add" data="${user_id}">'+"+ 关注</a>"+"{{else}}"+'<a class="photog_added_4" data="${user_id}">'+"<i></i>互相关注</a>"+"{{/if}}"+"</li>";hometm.bazzar_tm='<li class="yue-photog-libox">'+'<div class="photog-libox-head">'+"{{if !cover_path}}"+'<img style="width:280px;height:260px"">'+"{{else}}"+'<img src="http://image.paiwo.co/${cover_path}'+base.retinaPixel["w280h200"]+'">'+"{{/if}}"+"<span></span>"+'<div class="footPhotog-bacpic">'+'<figure class="figure">'+'<img data-code="${photographer_domain}" class="header_textbox_headimg" width="65" height="65" src="${HotPhotogImg(photographer_avatar)}">'+'<figcaption><a data-code="${photographer_domain}">${photographer_name}</a></figcaption>'+'<p class="clearfix">'+"{{html hotPhotogPlace(photographer_location)}}"+"</p>"+"</figure>"+"</div>"+"</div>"+'<button class="yue-button" data-code="${photographer_id}"><i class="yue-button-i"></i>联系TA</button>'+"</li>";hometm.activity_tm="<li>"+'<a href="${activity_url}" target="_blank">'+'<div class="activity-list activity-list5" style="background-image:url(${activity_banner_mid});"></div>'+'<div class="events-list-card">'+"<h3>${activity_title}</h3>"+"<span>${put_activity_time(activity_start_date,activity_end_date)}</span>"+"</div>"+"</a>"+"</li>";function hotPhotogPlace(data){if(data=="0-0-0"||data=="00-00-00"){return"未知"}else{if(data==""){return""}}data=data+"-00";var num1=data.substring(0,5),prov_code=num1+"-00-00",$pro_json=allArea["province"]["02-00-00-00"],prov="",city="";if(prov_code=="02-33-00-00"||prov_code=="02-34-00-00"){prov=allArea["02-00-00-00"][prov_code];return"<span>中国</span><span>"+prov+"</span>"}else{for(var i in $pro_json){if(prov_code==i){prov=$pro_json[i]}}city=allArea["city"][prov_code][data];return"<span>"+prov+"</span><span>"+city+"</span>"}}function HotPhotogImg(data){if(data=="0"||data==""){Other_photog_img="user_head.gif"/*tpa=http://paiwo.co/static/images/user_head.gif*/}else{Other_photog_img="http://image.paiwo.co/"+data}return Other_photog_img}function showAva(str){if(str.length==0){return"user_head-1.gif"/*tpa=http://paiwo.co/static/js/minjs/static/images/user_head.gif*/}return"http://image.paiwo.co/"+str}function put_activity_time(start,end){var startTime=start.split(" ")[0].split("-"),endTime=end.split(" ")[0].split("-"),oDate=new Date();if(startTime[0]==oDate.getFullYear()){startTime.splice(0,1)}if(endTime[0]==oDate.getFullYear()){endTime.splice(0,1)}return startTime.join("/")+" - "+endTime.join("/")}(function getRecPg(){$.ajax({url:"/rest",type:"POST",dataType:"json",async:false,data:{data:JSON.stringify({"method":"http://paiwo.co/static/js/minjs/paiwo.market.location_hot_photographer.get","location_code":"02-00-00-00"})},success:function(data){if(data.error_id==0){pg_list=[];for(var i=0;i<4;i++){pg_list[i]=data.response.photographer_list[i]}var tm=$.tmpl(hometm.bazzar_tm,pg_list);$(".index-bazzar-phers ul").html(tm)}}})})();var pagazineMod=$(".index-pagazine");function get_activity_list(){base.ajax({data:{"method":"http://paiwo.co/static/js/minjs/paiwo.activity.activity_list.get","page_no":1,"page_size":4},success:function(data){if(data.error_id==0){var response=data.response,listInfo=response.activity_list,putListTm="";putListTm=$.tmpl(hometm.activity_tm,listInfo);$(".index-events ul").html(putListTm)}},error:function(data){slideMessage("网络错误")}})}get_activity_list();function getPagazine(){base.ajax({data:{"method":"http://paiwo.co/static/js/minjs/paiwo.content.dynamic_list.get","host_domain":"pagazine","page_no":1,"page_size":4},success:function(data){if(data.error_id==0){var response=data.response,dynamicList=response.content_list;for(var i=0;i<dynamicList.length;i++){if(dynamicList[i].content_id==123985){dynamicList.splice(i,1);break}}for(var i=0;i<3;i++){pagazineMod.find(".index-pagazine-list .pagazine-list").eq(i).css("background-image","url(http://image.paiwo.co/"+dynamicList[i].photo_list[0].photo_path+"@!1d5)");pagazineMod.find(".index-pagazine-list .pagazine-list-tit").eq(i).html(dynamicList[i].content_title);pagazineMod.find(".index-pagazine-list a").eq(i).attr("href","/pocket/"+dynamicList[i].content_id)}}},error:function(data){slideMessage("网络错误")}})}getPagazine();base.ajax({data:{"method":"http://paiwo.co/static/js/minjs/paiwo.photographer.list.get"},success:function(data){if(data.error_id==0){var data_list_popu=data.response.photographer_list.slice(0,15),data_list_acti=data.response.photographer_list.slice(15,30),data_list_file=data.response.photographer_list.slice(30,45),phers_html_popu="",phers_html_acti="",phers_html_file="";phers_html_popu=$.tmpl(hometm.photog_tm,RandomFive(data_list_popu,5));phers_html_acti=$.tmpl(hometm.photog_tm,RandomFive(data_list_acti,5));
phers_html_file=$.tmpl(hometm.photog_tm,RandomFive(data_list_file,5));$("#most_popu_ul,#most_popu2_ul").html(phers_html_popu);$("#most_acti_ul").html(phers_html_acti);$("#most_file_ul").html(phers_html_file)}},error:function(data){slideMessage("网络错误")}});function doFollow(id){base.ajax({data:{"method":"paiwo.user.follow.follow","follow_id":id},success:function(data){if(data.error_id==0){if(data.response.follow_state==2){$(".photog_add[data="+id+"]").removeClass().addClass("photog_added_2").html("<i></i>已关注")}else{if(data.response.follow_state==4){$(".photog_add[data="+id+"]").removeClass().addClass("photog_added_4").html("<i></i>互相关注")}}}else{showMessage("网络错误..")}},error:function(data){slideMessage("网络错误")}})}function unFollow(id){base.ajax({data:{"method":"paiwo.user.follow.un_follow","follow_id":id},success:function(data){if(data.error_id==0){$(".photog_added_2[data="+id+"]").removeClass().addClass("photog_add").html("+ 关注");$(".photog_added_4[data="+id+"]").removeClass().addClass("photog_add").html("+ 关注")}},error:function(data){slideMessage("网络错误")}})}function RandomFive(arr,num){var copy_arr=new Array(),return_arr=new Array();for(var index in arr){copy_arr.push(arr[index])}for(var i=0;i<num;i++){if(copy_arr.length>0){var copy_arr_index=Math.floor(Math.random()*copy_arr.length);return_arr[i]=copy_arr[copy_arr_index];copy_arr.splice(copy_arr_index,1)}else{return}}return return_arr}store.remove("tag");$("#area_input").val("");$(".top-tab").addClass("top_tab_opa");var topTab=$(".top-tab");window.addEventListener("scroll",function(){var scrollT=document.documentElement.scrollTop||document.body.scrollTop;if(scrollT>40){topTab.removeClass("top_tab_opa");$(".header-banner-pos").css("opacity",0)}else{topTab.addClass("top_tab_opa");var opa=(40-scrollT)/40;$(".header-banner-pos").css("opacity",opa)}});function closeSelect(){$(".banner_select").fadeOut(200);$("#banner_sel_type").find("i").removeClass("active")}function closePlace(){$(".place-choose").fadeOut(200);$(".pla-cho-pro2box,.place-choose s").css("display","none")}function closeSecondPlace(){$(".pla-cho-pro2box,.place-choose s").css("display","none")}$(document).click(function(){closeSelect();closePlace();closeSecondPlace()});$("#banner_sel_type").on("click",function(ev){if($(this).find(".banner_select").css("display")=="block"){$("#banner_sel_type").find("i").removeClass("active");$(this).find(".banner_select").hide()}else{$("#banner_sel_type").find("i").addClass("active");$(this).find(".banner_select").show()}ev.stopPropagation()});$("#banner_sel_type").on("click","dd",function(){var type_name=$(this).html();var type_id=$(this).attr("data-code");store.set("sel_type",type_id);$("#banner_sel_type").find("span").html(type_name).attr("data-code",type_id)});var input_index=-1;var input_now=null;$("#area_input").on("keyup",function(ev){if(ev.keyCode==40||ev.keyCode==38){return}var location=$(this).val();var len=location.length;if(len==0){$(".banner_select_area").hide()}$(".banner_select_area").html("");for(var i=0;i<areaName.length;i++){for(var j=0;j<areaName[i].length;j++){if(!len){return}if(location==areaName[i].substring(0,len)){var area='<dd data-code="'+areaCode[i]+'">'+areaName[i]+"</dd>";$(".banner_select_area").append(area).show();break}}}if(ev.keyCode==13){$("#area_input").val($("#area_input").val());$(".banner_select_area").hide()}input_now=$("#area_input").val()});$("#area_input").on("keydown",function(ev){if(ev.keyCode==40){input_index++;if(input_index==5){input_index=-1}if(input_index==$(".banner_select_area").children().size()){input_index=-1}if(input_index==-1){$("#area_input").val(input_now);$(".banner_select_area").children().css("color","#b6b3ad")}else{$(".banner_select_area").children().css("color","#b6b3ad");$(".banner_select_area").children()[input_index].style.color="#414141";var sel_area_down=$(".banner_select_area").children()[input_index].innerHTML;var sel_area_down_id=$(".banner_select_area").children()[input_index].getAttribute("data-code");$("#area_input").val(sel_area_down).attr("data-code",sel_area_down_id);store.set("place_id",sel_area_down_id)}}else{if(ev.keyCode==38){input_index--;if(input_index==-2){if($(".banner_select_area").children().size()>5){input_index=4}else{input_index=$(".banner_select_area").children().size()-1}}if(input_index==-1){$("#area_input").val(input_now);$(".banner_select_area").children().css("color","#b6b3ad")}else{$(".banner_select_area").children().css("color","#b6b3ad");$(".banner_select_area").children()[input_index].style.color="#414141";var sel_area_up=$(".banner_select_area").children()[input_index].innerHTML;var sel_area_up_id=$(".banner_select_area").children()[input_index].getAttribute("data-code");$("#area_input").val(sel_area_up).attr("data-code",sel_area_up_id)}}}});$("#banner_sel_area").on("click","dd",function(ev){var area_name=$(this).html();var area_id=$(this).attr("data-code");$("#area_input").val(area_name).attr("data-code",area_id);$("#banner_sel_area").find(".banner_select_area").hide();
ev.stopPropagation();store.set("place_id",area_id)});$(".select").click(function(evs){$(this).find("dl").toggle().parent(".select").siblings().find("dl").hide();$(this).parents("li").siblings("li").find("dl").hide();ev.stopPropagation()});$(".yue-button").on("mouseenter",function(){$(this).find("i").removeClass("yue-button-i").addClass("yue-button-ihover")});$(".yue-button").on("mouseleave",function(){$(this).find("i").removeClass("yue-button-ihover").addClass("yue-button-i")});$(".yue-button").click(function(){if(is_login==0){loginInside.show();return}$("#top_message").trigger("click");PWS.addTalk(this.getAttribute("data-code"))});$(".index-bazzar-phers").on("click",".header_textbox_headimg",function(){var ph_host=$(this).attr("data-code");window.open("/"+ph_host)});$(".index-bazzar-phers figcaption").on("click","a",function(ev){var ph_host=$(this).attr("data-code");window.open("/"+ph_host)});$("#photog1 .index-phers-head,#photog1 h3").click(function(){window.open("Anotherkye.htm"/*tpa=http://paiwo.co/Anotherkye*/);return false});$("#photog2 .index-phers-head,#photog2 h3").click(function(){window.open("parasolka.htm"/*tpa=http://paiwo.co/parasolka*/);return false});$("#photog3 .index-phers-head,#photog3 h3").click(function(){window.open("jieyin.htm"/*tpa=http://paiwo.co/jieyin*/);return false});$("#photog4 .index-phers-head,#photog4 h3").click(function(){window.open("toinoyang.htm"/*tpa=http://paiwo.co/toinoyang*/);return false});$(".banner_submit").click(function(){window.location.href="create.htm"/*tpa=http://paiwo.co/market/create*/;store.set("refresh","outpage");var photoAreaId=$("#area_input").attr("data-code"),photoArea=$("#area_input").val();if(photoAreaId==""){for(var i=0;i<areaName.length;i++){if(photoArea==areaName[i]){photoAreaId=areaCode[i];store.set("place_id",photoAreaId)}}}});$("#people_tag").click(function(){store.set("tag","1");window.location.href="gallery.htm"/*tpa=http://paiwo.co/gallery*/});$("#japan_tag").click(function(){store.set("tag","2");window.location.href="gallery.htm"/*tpa=http://paiwo.co/gallery*/});$("#wb_tag").click(function(){store.set("tag","3");window.location.href="gallery.htm"/*tpa=http://paiwo.co/gallery*/});$("#goods_tag").click(function(){store.set("tag","4");window.location.href="gallery.htm"/*tpa=http://paiwo.co/gallery*/});$("#emotion_tag").click(function(){store.set("tag","5");window.location.href="gallery.htm"/*tpa=http://paiwo.co/gallery*/});$("#street_tag").click(function(){store.set("tag","6");window.location.href="gallery.htm"/*tpa=http://paiwo.co/gallery*/});$("#kid_tag").click(function(){store.set("tag","7");window.location.href="gallery.htm"/*tpa=http://paiwo.co/gallery*/});$("#view_tag").click(function(){store.set("tag","8");window.location.href="gallery.htm"/*tpa=http://paiwo.co/gallery*/});$(".header-banner-seabtn").on("click",function(){var _val=$(".home_search_input").val();_val=_val.replace(/^\s+|\s+$/g,"").replace(/\s+/g,",");window.location.href="search-q=.htm"/*tpa=http://paiwo.co/search?q=*/+_val});$(".home_search_input").on("keydown",function(ev){if(ev.keyCode==13){var _val=$(".home_search_input").val();if(_val==""){return}_val=_val.replace(/^\s+|\s+$/g,"").replace(/\s+/g,",");window.location.href="search-q=.htm"/*tpa=http://paiwo.co/search?q=*/+_val}});function LeftAuto(){Left();var aa=$(".phers-tab").find("a"),font=$(".phers-tab .active").index(),next=font==aa.length-1?0:font+1;aa.eq(font).removeClass("active");aa.eq(next).addClass("active")}var s_data={};s_data.t=setInterval(LeftAuto,5000);s_data.index=1;$(".phers-box-div").hover(function(){clearInterval(s_data.t)},function(){s_data.t=setInterval(LeftAuto,5000)});function Left(index){if(index){s_data.index=index}else{s_data.index++}if(s_data.index==4){$(".phers-box-div").stop().animate({left:-(s_data.index-1)*1134},700,function(){$(this).css("left",0)});s_data.index=1}else{$(".phers-box-div").stop().animate({left:-(s_data.index-1)*1134},700)}}$(".phers-tab").on("click","a",function(){if($(this).hasClass("active")){return}var index=$(this).index()+1;clearInterval(s_data.t);s_data.t=setInterval(LeftAuto,5000);Left(index);$(this).addClass("active").siblings().removeClass("active")});var phers=$(".index-phers");phers.on("click",".photog_add",function(){if(is_login==0){loginInside.show();return}var id=$(this).attr("data");if(top_data.user_id==id){showMessage("不能关注自己");return}doFollow(id)});phers.on("click",".photog_added_2,.photog_added_4",function(){if(is_login==0){loginInside.show();return}var id=$(this).attr("data");unFollow(id)});phers.on("mouseenter",".photog_added_2,.photog_added_4",function(){$(this).html("取消")});phers.on("mouseleave",".photog_added_2",function(){$(this).html("<i></i>已关注")});phers.on("mouseleave",".photog_added_4",function(){$(this).html("<i></i>互相关注")});$(".header-arrow").on("click",function(){$("html,body").stop().animate({scrollTop:600},300)});var look_flag=false;$(".header-banner-look").on("click",function(){if(is_login==0){loginInside.show();return}window.location.href="http://paiwo.co/login";look_flag=true});
