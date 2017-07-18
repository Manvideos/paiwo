function getGra(json){
    $.ajax({
        url: '/rest',
        type: 'POST',
        dataType: 'json',
        async: false,
        data: {
            data:JSON.stringify({
                'method': 'http://paiwo.co/static/js/activity/paiwo.activity.graduate.150521.put',
                'school_id': json.id,
                'people_count': json.count,
                'people_name': json.name,
                'people_phone': json.phone
            })
         },
         success:function(data){
            if (data.error_id==0) {
                slideMessage('报名成功');
            }else{
                slideMessage('网络错误');
            }
         },
         error:function(data){
            slideMessage('网络错误');
         }
    });
}


// function byxz(){
//         var count = 1,
    
//     iname =  document.querySelector('#name'),
//     icount = document.querySelector('#count'),
//     iphone = document.querySelector('#phone');
    
    
//     document.querySelector('.active-btn').onclick = function(e){
    
        
//     }
    
// }

$(function(){

    var count = 1,
    
    iname = $('#name'),
    icount = $('#count'),
    iphone = $('#phone');


    var oImg = new Image();
    oImg.onload =function(){
        $('.active-btn').show();
        $('.active-bottom').show();
    };
    oImg.src = 'active-back.jpg'/*tpa=http://paiwo.co/static/images/activity/active-back.jpg*/;

// 立即报名

$('.active-btn').on('click',function(){
    var clientW = document.documentElement.clientWidth;
    $('.active-shadow').fadeIn(100);
    if(clientW<800){
        $('.active-shadow').addClass('active-form');
    }
	
});
    
$('.active-close').on('click',function(){
    var clientW = document.documentElement.clientWidth;
    if(clientW>800){
       $('.active-shadow').fadeOut(100);  
    }else {
       $('.active-shadow').removeClass('active-form'); 
    }
	   
    $('.active-school a').html('请选择').removeAttr('data');
    $('#name').val('');
    $('#count').val(1);
    $('#phone').val('');
    $('.phone-warn p').hide();
});




$('.active-school').on('click',function(){
    $(this).find('dl').toggle();
});


$('.active-school').on('click','dd',function(){
    var _val = $(this).html(),
        _data = $(this).attr('data');
    $('.active-school a').html(_val);
    $('.active-school a').attr('data',_data);
});
$('.active-shadow').on('click', function(){
    $('.active-shadow').fadeOut(100);
});

$('.active-signup').on('click', function(e){
    e.stopPropagation();
});

// 提交表单
$('.active-sub').on('click',function(){
    var json = {};
    json.id = $('.active-school a').attr('data');
    json.count = $('#count').val();
    json.name = $('#name').val();
    json.phone = $('#phone').val();
    
    if(!json.id){
        $('.war_school').show().addClass('warning-alert');
        return;
    }else {
        $('.war_school').hide().removeClass('warning-alert');
    }

    if(!json.name){
        $('.war_name').show().addClass('warning-alert');
        return;
    }else{
        $('.war_name').hide().removeClass('warning-alert');
    }
    
    if(!/^[0-9]*$/.test(json.count)){
        $('.war_num').html('<i></i>请填写整数').show().addClass('warning-alert');
        return;
    }else{
        $('.war_num').hide().removeClass('warning-alert');
    }
    
    if(!json.phone){
        $('.phone-warn .war_phone').html('<i></i>请填写手机号码').show().addClass('warning-alert');
        return;
    }else{
        $('.phone-warn .war_phone').hide().removeClass('warning-alert');
    }
    
    if(!/^1\d{10}$/.test(json.phone)){
        if(document.documentElement.clientWidth>=800){
            $('.active-tel .war_phone').html('<i></i>手机号码格式不正确').show();
            
        }else{
            $('.phone-warn .war_phone').html('<i></i>手机号码格式不正确').show().addClass('warning-alert');;
        }
        return;
    }else{
         if(document.documentElement.clientWidth>=800){
            $('.active-tel .war_phone').hide();
        }else{
            $('.phone-warn .war_phone').hide().removeClass('warning-alert');
        }
    }
    
    
    
    
    console.log(json.count);
    
    if(!json.count){
        $('.war_num').show().addClass('warning-alert');
        return;
    }else{
        $('.war_num').hide().removeClass('warning-alert');
    } 

    

//    if(document.documentElement.clientWidth<800){
//        
//    }
    
    
    
    
   getGra(json); 
   $('.active-close').trigger('click');    
});

// 拍摄人数    
$('.add-num').on('click', function(){
    var count = icount.val();
    if(!isNaN(count)){
        count++;
        icount.val(Math.floor(count));
    }else{
        icount.val(1);
    }
    
});
    
    
$('.reduce-num').on('click', function(){
    var count = icount.val();
    if(!isNaN(count)){
        count --;
        if(count == 0)return;
        icount.val(Math.floor(count));
    }else{
        icount.val(1);
    }
    
});    

});


//上部提示信息提示
var mes = $('.setting_succeed');
var setM= null;
function slideMessage(str){
    clearTimeout(setM);
	mes.html(str).addClass('active');
    setTimeout(function(){
        mes.removeClass('active');
    },1800);
}







