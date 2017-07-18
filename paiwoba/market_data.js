

var photographer_list = '';


//根据IP显示摄影师
(function(){

   if(city[city.length -1] == '市'){
     city = city.slice(0, city.length-1);
     for(var j=0;j<areaName.length;j++){
       if(areaName[j] == city){
         break;
       }
     }
     if(j > 467){ 
       $('#chosed_pla').html('全国');
       IPHotPhotog('02-00-00-00');    
     }
     else {
       $('#chosed_pla').html(areaName[j]);
       IPHotPhotog(areaCode[j]);
     }
  }
  else {
    for(var j=0;j<areaName.length;j++){
       if(areaName[j] == city){
         break;
       }
     }
     if(j > 467){
       $('#chosed_pla').html('全国');
       IPHotPhotog('02-00-00-00');    
     }
     else {
       $('#chosed_pla').html(areaName[j]);
       IPHotPhotog(areaCode[j]);
     }
  }
})();

//获取热门摄影师
function IPHotPhotog(data){
  $.ajax({
         url: '/rest',
        type: 'POST',
    dataType: 'json',
       async: false,
       data: {
          data:JSON.stringify({
          	'method': 'http://paiwo.co/static/js/market/paiwo.market.location_hot_photographer.get',
          	'location_code': data
          })
       },

        success:function (data){
        	if(data.error_id == 0){
               photographer_count = data.response.photographer_count;
               market_view.showHotPhotog(data.response.photographer_list);
          }
        }
  });
}
//获取市集最新订单
$.ajax({
       url: '/rest',
      type: 'POST',
  dataType: 'json',
     async: false,
     data: {
        data:JSON.stringify({
          'method':'http://paiwo.co/static/js/market/paiwo.market.order.list.get',
          'photograph_type': 0,
          'page_no': 1,
          'page_size': 5
        })
     },

      success:function (data){
          market_view.showRecentOrder(data.response.latest_order_list);
          market_view.showRecentDem(data.response.recommend_order_list);
      },

      error:function(data){

      }
});
