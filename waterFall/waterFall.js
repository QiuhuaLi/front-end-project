window.onload=function(){
	waterFall("main","box");//传入包含瀑布流的大盒子的id和瀑布流中每个小盒子的className
}
function waterFall(parent,box){
	var bigBox=document.getElementById(parent);
	var littleBox=bigBox.getElementsByClassName(box);
	// console.log(littleBox.length)
	//算出一行多少列
	var screenWidth=document.documentElement.clientWidth;//获得页面视口的大小
	var boxWidth=littleBox[0].offsetWidth;//存放一个盒子的宽度
	var num=Math.floor(screenWidth/boxWidth);//存放每行能放下盒子的个数
	var nArr=[];//存放每行盒子的高度
	bigBox.style.width=boxWidth*num+'px';
	bigBox.style.margin="0 auto";
	for(var i=0;i<littleBox.length;i++){
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