window.onload=function(){
	var mySwiper = new Swiper ('.swiper-container', {
    direction: 'horizontal',
    loop: true,  
    // 如果需要分页器
    pagination: '.swiper-pagination',
    paginationClickable :true,
    autoplay:3000,  //自动轮播
    loop: true,   //循环
    autoplayDisableOnInteraction : false  //用户操作后不停止    
  });
  var categorylist = document.getElementsByClassName('category')[0];
  var list = categorylist.getElementsByTagName('li');
  categorylist.addEventListener("click",function(event){
      var event = event || window.event;
      var target = event.target || event.srcElement;
      console.log(target);
      var parentNode = target.parentNode;
      if(target.nodeName=='UL'){
      	return;
      }
      for(var i=0;i<list.length;i++){
      	list[i].setAttribute('class','');
         }
      if(target.nodeName=="li"){   	
         target.setAttribute('class','active');
      }
      else{
        parentNode.setAttribute('class','active');
      }
      	
  });
}
function triggle(el,className){
   var getclassname = el.getAttribute('class');
   if(getclassname!=undefined){
   }
   else{
   	el.setAttribute('class','active');
   }
}