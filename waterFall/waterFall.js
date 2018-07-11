window.onload=function(){
	var Datas={
		'data':[{'src':'1.jpg'},{"src":'2.jpg'},{"src":'3.jpg'},{"src":'4.jpg'},{"src":'5.jpg'},{"src":'6.jpg'},{"src":'7.jpg'},{"src":'8.jpg'},{"src":'9.jpg'}]
	};
	var num=0;//记录滚动加载数据的次数
	//在开始添加这个判断是为了填充页面，因为我准备的图片不足，在正常情况下是不用添加的。
	if(checkSlider){
			//滚动生成图片
			var bigBox=document.getElementById("main");
			var fragment=document.createDocumentFragment();
			for(var i=0;i<Datas.data.length;i++){
				var div1=document.createElement("div");
				div1.className="box";
				fragment.appendChild(div1);
				var div2=document.createElement("div");
				div2.className="pic";
				div1.appendChild(div2);
				var image=document.createElement("img");
				image.src="pictures/"+Datas.data[i].src;
				div2.appendChild(image);
			}
			bigBox.appendChild(fragment);
			// console.log("1");
		 }
		 waterFall("main","box");//传入包含瀑布流的大盒子的id和瀑布流中每个小盒子的className
	//给页面滚动绑定事件函数，滚动时动态加载图片。
	window.onscroll=function(){
		//调用checkSlider函数判断是否具有可滑动的条件
		num=num+1;
		if(checkSlider&&num<3){
			//滚动生成图片
			var bigBox=document.getElementById("main");
			var fragment=document.createDocumentFragment();
			for(var i=0;i<Datas.data.length;i++){
				var div1=document.createElement("div");
				div1.className="box";
				fragment.appendChild(div1);
				var div2=document.createElement("div");
				div2.className="pic";
				div1.appendChild(div2);
				var image=document.createElement("img");
				image.src="pictures/"+Datas.data[i].src;
				div2.appendChild(image);
			}
			bigBox.appendChild(fragment);
			// console.log("1");
		 }
		 waterFall("main","box");//传入包含瀑布流的大盒子的id和瀑布流中每个小盒子的className
	}
	console.log(num);
}
//确定每行显示多少列，并且使包含瀑布流的块级元素居中显示。然后使图片按照瀑布流的样式排列起来，
function waterFall(parent,box){
	var bigBox=document.getElementById(parent);
	var littleBox=bigBox.getElementsByClassName(box);
	//算出一行多少列
	var screenWidth=document.documentElement.clientWidth;//获得页面视口的大小
	var boxWidth=littleBox[0].offsetWidth;//存放一个盒子的宽度
	var num=Math.floor(screenWidth/boxWidth);//存放每行能放下盒子的个数
	var nArr=[];//存放每行盒子的高度
	bigBox.style.width=boxWidth*num+'px';
	bigBox.style.margin="0 auto";
	for(var i=0,len=littleBox.length;i<len;i++){
		if(i<num){
			nArr.push(littleBox[i].offsetHeight);//在页面中每个元素的高度是存放在offsetHeight属性当中的
		}else{
			var minHeight=Math.min.apply(null,nArr);//利用apply绑定Math.min()函数传入数组为参数，因为min只接受数值为参数。
			var index=foundIndex(nArr,minHeight);
			littleBox[i].style.position="absolute";
			littleBox[i].style.top=nArr[index]+"px";
			// littleBox[i].style.left=boxWidth*index+"px";//两种方法算出应该距离左边的位置。
			littleBox[i].style.left=littleBox[index].offsetLeft+"px";
			nArr[index]+=littleBox[i].offsetHeight;//每次修改完一个盒子的位置之后，更改数组中的值，将加在那一列上的盒子的高度加上去
		}
	}
	console.log(nArr);
}
//找出数组中值为index的下标。
function foundIndex(arr,index){
	for(var i=0;i<arr.length;i++){
		if(arr[i]==index){
			return i;
		}
	}
}
function checkSlider(){
	var bigBox=document.getElementById("main");
	var littleBox=bigBox.getElementsByClassName("box");
	var lastBox=littleBox[littleBox.length-1];
	var boxToTop=lastBox.offsetTop+lastBox.offsetHeight/2;
	// console.log(boxToTop);
	// 在考虑模式兼容的情况下得出现在页面已加载的高度。
	var scrollLength=(document.body.scrollTop||document.documentElement.scrollTop)+(document.body.clientHeight||document.documentElement.clientHeight);
	// console.log(scrollLength);
	return boxToTop<scrollLength?true:false;
}