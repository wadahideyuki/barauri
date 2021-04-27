$(document).ready(function(){
//ユーザーエージェントによる振分
var userAgent = window.navigator.userAgent.toLowerCase();
var appVersion = window.navigator.appVersion.toLowerCase();
if(userAgent.indexOf("msie") > -1){}
if(userAgent.indexOf("firefox") > -1){}
if(userAgent.indexOf("chrome") > -1){}
if(userAgent.indexOf("iphone") > -1){}
if(userAgent.indexOf("android") > -1){}
if(appVersion.indexOf("msie 7.") != -1){}
var ipad = userAgent.indexOf('ipad') > -1 || userAgent.indexOf('macintosh') > -1 && 'ontouchend' in document;
if(ipad == true){
  //viewportの設定
  $('meta[name="viewport"]').attr("content", "width=1200px");
}

//SPのみ
var ua = navigator.userAgent;
if (ua.indexOf('iPhone') > 0 ||ua.indexOf('iPod') > 0 || (ua.indexOf('Android') > 0 && ua.indexOf('Mobile') > 0) || ua.indexOf('Windows Phone') > 0) {
}


/*--------------------
     パックの金額
--------------------*/
//金額の合計とURLの設定
var urlPre = "https://deagostini.jp/order/index.php?mod=bulk";
var urlBknum = "&backnumber[";
var urlCls = "]=";
function fncSumUrl(){
  var sumPrice = 0;
  var cartUrl = urlPre;
  var freeShipping = $(".mainZone .partCart dt span").attr("data-free");
  $(".mainZone .partGoods > li").each(function(){
    var thisUnitPrice = $(this).find(".price strong").text();
    var thisElm = $(this).find(".num input");
    var thisNum = thisElm.val();
    var thisPrice = thisUnitPrice * thisNum;
    var thisUrl = thisElm.attr("data-url");
    //金額を加算
    sumPrice+=thisPrice;
    //URLを追加
    if(thisNum > 0){
      cartUrl+=urlBknum + thisUrl + urlCls + thisNum;
    }
  });
  //金額の合計
  $(".mainZone .partCart dd strong").text(sumPrice);
  //URLの設定
  $(".mainZone .partCart .btn a").attr("href", cartUrl);
  //送料無料
  if(sumPrice >= freeShipping){
    $(".mainZone .partCart .btn a .freeShipping").addClass("show");
  }else{
    $(".mainZone .partCart .btn a .freeShipping").removeClass("show");
  }
}//fncSumUrl() End
fncSumUrl();

//各パックの個数:click
$(".numBox button").click(function(){
  var thisBox = $(this).parent(".numBox");
  var thisNumEl = thisBox.find(".num input");
  var thisNum = thisNumEl.val();
  if($(this).hasClass("minus")){//-
    if(thisNum <= 0){
      thisNum = 0;
    }else{
      thisNum--;
    }
  }else{//+
    thisNum++;
  }
  thisNumEl.val(thisNum);
  fncSumUrl();
  return false;
});
//各パックの個数:入力
$(".mainZone .partGoods .num input").change(function(){
  fncSumUrl();
});



//scrolladClass
var scrollAnimationClass = 'set-anime';
var triggerMarginDefault = 50;
var num = 0;

var scrollAnimationElm = document.querySelectorAll('.set-anime');
var scrollAnimationFunc = function () {
  var dataMargin = scrollAnimationClass + '_margin';
  var dataTrigger = scrollAnimationClass + '_trigger';
  var dataDelay = scrollAnimationClass + '_delay';
  for (var i = 0; i < scrollAnimationElm.length; i++) {
    var triggerMargin = triggerMarginDefault;
    var elm = scrollAnimationElm[i];
    var showPos = 0;
    if (elm.dataset[dataMargin] != null) {
      triggerMargin = parseInt(elm.dataset[dataMargin]);
    }
    if (elm.dataset[dataTrigger]) {
      showPos = document.querySelector(elm.dataset[dataTrigger]).getBoundingClientRect().top + triggerMargin;
    } else {
      showPos = elm.getBoundingClientRect().top + triggerMargin;
    }
    if (window.innerHeight > showPos) {
      var delay = (elm.dataset[dataDelay]) ? elm.dataset[dataDelay] : 0;
      setTimeout(function (index) {
        scrollAnimationElm[index].classList.add('show-anime');
        var sclNum = $(".show-anime").length;
        $("body").addClass("scl" + sclNum)
      }.bind(null, i), delay);
    }
  }
}
//window.addEventListener('load', scrollAnimationFunc);
$(function () {
  scrollAnimationFunc();
})
window.addEventListener('scroll', scrollAnimationFunc);
window.addEventListener('load', scrollAnimationFunc);


});//DocRdyFncEnd