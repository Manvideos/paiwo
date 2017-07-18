var base = {
       scrollbarwidth: function() {
           
           //返回滚动条的宽度
           if(document.documentElement.clientHeight < document.body.scrollHeight){
           var parent = $('<div style="width:50px;height:50px;overflow:auto"><div></div></div>').appendTo('body'),
						child = parent.children(),
						scrollbarwidth = child.innerWidth() - child.height(99).innerWidth();
                        parent.remove();
				return scrollbarwidth;
			}
           return 0;
          },
    
       deviceRetina: function(num){
            
        /*
         *检测高清屏.
         *有参,返回对应的分辨率
         *无参,返回ture or false
         */
           if(arguments.length == 0){
                return window.devicePixelRatio>1 ? true : false ;
           }
           
           if(window.devicePixelRatio>1){  //retina屏幕
               if(num=='1d5'){  
                   return '@!1d10';
               }else if(num=='w280'){
                   return '@!w560';
               }else if(num=='w280h200'){
                   return '@!560x400';
               }else if(num=='a560'){
                   return '@!1000x1000';
               }else{
                   return '@!'+num*2 +'x'+ num*2;
               }
//               return num == '1d5' ? '@!1d10':'@!'+num*2 +'x'+ num*2;
           }else{  //非retina屏幕
               if(num=='1d5'){  
                   return '@!1d5';
               }else if(num=='w280'){
                   return '@!w280';
               }else if(num=='w280h200'){
                   return '@!280x200';
               }else if(num=='a560'){
                   return '@!560x560';
               }else{
                   return '@!'+num +'x'+ num;
               }
//               return num == '1d5' ? '@!1d5':'@!'+num +'x'+ num;;
           } 
        },
    
        retinaPixel: {},
    
        extend: function(target, source){
            
            //用于扩展对象,如果最后参数是false,不支持同名覆写,默认true
            var args = [].slice.call(arguments),i = 1, key,
                ride = typeof args[args.length - 1] == "boolean" ? args.pop() : true;
            if (args.length === 1){
                //处理$.extend(data) 情况
                target = !this.window ? this : {};
                i = 0;
            }
            
            while ((source = args[i++])){
                for(key in source){
                    if(ride || (key in target)){
                        target[ key ] = source[ key ];
                    }
                
                }
                
            }
            return target; 
        },
    
    ajax:function(json){
        
        
        $.ajax({
            url: '/rest',
            type: 'POST',
            dataType: 'json',
            async: json.async?json.async:false,
            data: {
                data:JSON.stringify(json.data)
            },

            success: function(data){
                json.success && json.success(data);
            },

            error: function(data){
                json.error && json.error(data);
            }

        });
    }
    
};
base.renderTime= function(timestamp, l){
    /*
     * 默认为时间戳
     * l为时间戳位 10或者13位
     * 当l为0的时候 表示各式为2015-07-09 11:17:21
     */
 
     if(l == 0){
        timestamp = new Date(time).getTime();
        l == 13;
     }
     timestamp = (l == 10) ? timestamp*1000 : timestamp;
     
     var now = new Date(),
         diff =  now.getTime()- timestamp,
         last = new Date(timestamp),
         lastm = '0'+last.getMinutes();
     var out = ''; 
    
    if(diff<60000){                     //1分钟内
    	out = '刚刚';
    }else if(diff>=60000&&diff<3600000){ //1小时内
    	out = parseInt(diff/60000)+'分钟前';
    }else if(diff>=3600000&&diff<21600000){//6小时内
    	out = parseInt(diff/3600000)+'小时前';
    }else if(diff>=21600000&&diff<=86400000&&now.getDate() == last.getDate() ){
    	out = '今天'+last.getHours()+':'+lastm.slice(-2);
    }else if(diff>=21600000&&diff<=86400000+(23-last.getHours())*3600000){
    	out = '昨天'+last.getHours()+':'+lastm.slice(-2);
    }else {
        
    	out = last.getFullYear()+'/'+(last.getMonth()+1)+'/'+last.getDate();
    }
    
    return out;
    
}

//头像
base.showAvatar = function(avatar){
    
    var avatar = avatar.toString();
    if(avatar=='0' || avatar==''){  //头像为空
        return 'user_head.gif'/*tpa=http://paiwo.co/static/images/user_head.gif*/;
    }else{
        return  'http://image.paiwo.co/'+avatar;
    }
    
};


//图片分辨率相关
base.retinaPixel['280'] = base.deviceRetina(280);
base.retinaPixel['80'] = base.deviceRetina(80);
base.retinaPixel['200'] = base.deviceRetina(200);
base.retinaPixel['600'] = base.deviceRetina(600);
base.retinaPixel['1d5'] = base.deviceRetina('1d5');
base.retinaPixel['w280'] = base.deviceRetina('w280');
base.retinaPixel['w280h200'] = base.deviceRetina('w280h200');
base.retinaPixel['a560'] = base.deviceRetina('a560');
base.retinaPixel['500'] = base.deviceRetina(500);


//store.js
(function(e){function o(){try{return r in e&&e[r]}catch(t){return!1}}var t={},n=e.document,r="localStorage",i="script",s;t.disabled=!1,t.version="http://paiwo.co/static/js/com/1.3.17",t.set=function(e,t){},t.get=function(e,t){},t.has=function(e){return t.get(e)!==undefined},t.remove=function(e){},t.clear=function(){},t.transact=function(e,n,r){r==null&&(r=n,n=null),n==null&&(n={});var i=t.get(e,n);r(i),t.set(e,i)},t.getAll=function(){},t.forEach=function(){},t.serialize=function(e){return JSON.stringify(e)},t.deserialize=function(e){if(typeof e!="string")return undefined;try{return JSON.parse(e)}catch(t){return e||undefined}};if(o())s=e[r],t.set=function(e,n){return n===undefined?t.remove(e):(s.setItem(e,t.serialize(n)),n)},t.get=function(e,n){var r=t.deserialize(s.getItem(e));return r===undefined?n:r},t.remove=function(e){s.removeItem(e)},t.clear=function(){s.clear()},t.getAll=function(){var e={};return t.forEach(function(t,n){e[t]=n}),e},t.forEach=function(e){for(var n=0;n<s.length;n++){var r=s.key(n);e(r,t.get(r))}};else if(n.documentElement.addBehavior){var u,a;try{a=new ActiveXObject("htmlfile"),a.open(),a.write("<"+i+">document.w=window</"+i+'><iframe src="favicon.ico"/*tpa=http://paiwo.co/favicon.ico*/></iframe>'),a.close(),u=a.w.frames[0].document,s=u.createElement("div")}catch(f){s=n.createElement("div"),u=n.body}var l=function(e){return function(){var n=Array.prototype.slice.call(arguments,0);n.unshift(s),u.appendChild(s),s.addBehavior("#default#userData"),s.load(r);var i=e.apply(t,n);return u.removeChild(s),i}},c=new RegExp("[!\"#$%&'()*+,/\\\\:;<=>?@[\\]^`{|}~]","g");function h(e){return e.replace(/^d/,"___$&").replace(c,"___")}t.set=l(function(e,n,i){return n=h(n),i===undefined?t.remove(n):(e.setAttribute(n,t.serialize(i)),e.save(r),i)}),t.get=l(function(e,n,r){n=h(n);var i=t.deserialize(e.getAttribute(n));return i===undefined?r:i}),t.remove=l(function(e,t){t=h(t),e.removeAttribute(t),e.save(r)}),t.clear=l(function(e){var t=e.XMLDocument.documentElement.attributes;e.load(r);for(var n=0,i;i=t[n];n++)e.removeAttribute(i.name);e.save(r)}),t.getAll=function(e){var n={};return t.forEach(function(e,t){n[e]=t}),n},t.forEach=l(function(e,n){var r=e.XMLDocument.documentElement.attributes;for(var i=0,s;s=r[i];++i)n(s.name,t.deserialize(e.getAttribute(s.name)))})}try{var p="__storejs__";t.set(p,p),t.get(p)!=p&&(t.disabled=!0),t.remove(p)}catch(f){t.disabled=!0}t.enabled=!t.disabled,typeof module!="undefined"&&module.exports&&this.module!==module?module.exports=t:typeof define=="function"&&define.amd?define(t):e.store=t})(Function("return this")())
