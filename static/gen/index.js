window.onload=function(){var mySwiper=new Swiper('.swiper-container',{direction:'horizontal',loop:true,pagination:'.swiper-pagination',paginationClickable:true,autoplay:3000,loop:true,autoplayDisableOnInteraction:false});var categorylist=document.getElementsByClassName('category')[0];var list=categorylist.getElementsByTagName('li');var navul=document.getElementsByClassName('nav-li')[0];var navlist=navul.getElementsByTagName('li');categorylist.addEventListener("click",function(event){var event=event||window.event;var target=event.target||event.srcElement;console.log(target);var parentNode=target.parentNode;if(target.nodeName=='UL'){return;}
for(var i=0;i<list.length;i++){list[i].setAttribute('class','');}
if(target.nodeName=="li"){target.setAttribute('class','active');}
else{parentNode.setAttribute('class','active');}});navul.addEventListener("click",function(event){var event=event||window.event;var target=event.target||event.srcElement;var parentNode=target.parentNode;if(target.nodeName=='UL'){return;}
for(var i=0;i<navlist.length;i++){navlist[i].setAttribute('class','');}
if(target.nodeName=="li"){target.setAttribute('class','nav-active');}
else{parentNode.setAttribute('class','nav-active');}});}
function triggle(el,className){var getclassname=el.getAttribute('class');if(getclassname!=undefined){}
else{el.setAttribute('class','active');}}