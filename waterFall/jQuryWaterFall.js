$(window).on("load",function(){
	var Datas={
		'data':[{'src':'1.jpg'},{"src":'2.jpg'},{"src":'3.jpg'},{"src":'4.jpg'},{"src":'5.jpg'},{"src":'6.jpg'},{"src":'7.jpg'},{"src":'8.jpg'},{"src":'9.jpg'}]
	};
	if(checkSlider){
		$.each(Datas.data,function(key,value){
			var oBox=$("<div>").addClass("box").appendTo($("#main"));
			var oPic=$("<div>").addClass("pic").appendTo($(oBox));
			$("<img>").attr("src","pictures/"+$(value).attr('src')).appendTo($(oPic));
		})
	}
	waterFall();
	$(window).on("scroll",function(){
		//在开始添加这个判断是为了填充页面，因为我准备的图片不足，在正常情况下是不用添加的。
	if(checkSlider){
		$.each(Datas.data,function(key,value){
			var oBox=$("<div>").addClass("box").appendTo($("#main"));
			var oPic=$("<div>").addClass("pic").appendTo($(oBox));
			$("<img>").attr("src","pictures/"+$(value).attr('src')).appendTo($(oPic));
		})
	}
 	waterFall();//传入包含瀑布流的大盒子的id和瀑布流中每个小盒子的className
	})
});
function waterFall(){
	var $bigBox=$("#main");
	var $littleBox=$("#main>.box");
	var screenWidth=$(window).width();
	var boxWidth=$littleBox.eq(0).outerWidth();
	var n=Math.floor(screenWidth/boxWidth);
	// console.log(screenWidth);
	$bigBox.width(n*boxWidth).css("margin","0 auto");//jQuery有自己的width方法。
	var arr=[];
	//each方法接收一个匿名函数作为参数
	$littleBox.each(function(index,value){//index保存着$littleBox每个值下标，value为保存的对象
		var h=$littleBox.eq(index).outerHeight();
		if(index<n){
			arr.push(h);
		}else{
			var minHeight=Math.min.apply(null,arr);
			var minIndex=$.inArray(minHeight,arr);//jQuery提供的方法，查找要找的值在数组的下标位置
			$littleBox.eq(index).css({
				"position":"absolute",
				"top":minHeight+"px",
				"left":boxWidth*minIndex+"px"
			})
			arr[minIndex]+=$littleBox.eq(index).outerHeight();
		}
	})
}
function checkSlider(){
	var $lastBox=$("#main>.box").last();
	var lastBoxHeight=$lastBOx.offset().top+Math.floor($lastBox.outerHeight()/2);
	var scrollHeight=$(window).scorllTop()+$(window).height();
	return lastBoxHeight<scrollHeight?true:false;
}