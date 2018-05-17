/*广告图片数组*/
var imgs=[
	{"i":0,"img":"images/index/banner_01.jpg"},
    {"i":1,"img":"images/index/banner_02.jpg"},
    {"i":2,"img":"images/index/banner_03.jpg"},
    {"i":3,"img":"images/index/banner_04.jpg"},
    {"i":4,"img":"images/index/banner_05.jpg"},
];
//广告轮播：面向对象
var slider={
	LIWIDTH:670,//保存每个li的宽度
	$ulImgs:null,//保存id为imgs的ul
	$ulIdxs:null,//保存id为indexs的ul
	DURATION:500,//保存单次移动的时间
	WAIT:3000,//保存轮播的等待时间
	moved:0,//保存已经左移的li个数
	init(){
		var me=this;//留住this，用了闭包的原理，这样，就减少了写bind()
		this.$ulImgs=$("#imgs");
		this.$ulIdxs=$("#indexs");
		this.initView();//初始化界面
		this.autoMove();//启动自动轮播
		//当鼠标进入slider，停止轮播，当鼠标移出，再次启动（hover可以绑定两个事件函数：分别代表移入移出的效果）
		$("#slider").hover(function(){
			me.$ulImgs.stop(true);
		},function(){
			me.autoMove();
		});
		me.$ulImgs.on("mouseover","li>img",function(e){
			var $tar=$(e.target);
			//获得当前img的下标
			var i=$tar.index("#imgs img");
			me.moved=i;//修改moved等于i
			me.moved==imgs.length&&(me.moved=0);//使img不能到达第5个****
			//修改ulimgs的left为-moved*LIWIDTH
			me.$ulImgs.css("left",-me.moved*me.LIWIDTH);
			me.changeHover();//根据moved修改hover
		}); 
		//手动播放，为$ulIdxs添加鼠标进入事件，只允许li响应
		me.$ulIdxs.on("mouseover","li",function(e){
			var $tar=$(e.target);
			if(!$tar.is(".hover")){
				var endi=$tar.index("#indexs>li")
				var starti=$(".hover").index("#indexs>li");
				//修改啊moved+为endi-starti
				me.moved+=endi-starti;
				me.changeHover();//立刻修改hover
				//让$ulImgs移动到moved*LIWIDTH的位置
				me.$ulImgs.stop(true).animate({left:-me.moved*me.LIWIDTH},me.DURATION);
			}
		});

	},
	initView(){//将imgs数组的内容生成页面元素
		//遍历imgs,同时声明空字符串htmlImgs和htmlIdxs
		for(var i=0,htmlImgs="",htmlIdxs="";i<imgs.length;i++){
			htmlImgs+=//向htmlimgs中拼接（注意这种格式）
				`<li><img src='${imgs[i].img}'></li>`;
			htmlIdxs+=//向htmlIdxs中拼接
			`<li>${i+1}</li>`;
		}//遍历结束
		//设置$ulImgs的html内容为htmlImgs
		this.$ulImgs.html(htmlImgs);
		//设置$ulImgs的宽为形式的元素个数*LIWIDTH
		this.$ulImgs.css("width",(imgs.length+1)*this.LIWIDTH);
		//在$ulImgs中追加一个第一个元素的clone
		this.$ulImgs.append(this.$ulImgs.children(":first").clone());
		//设置$ulIdxs的html内容为htmlIdxs
		this.$ulIdxs.html(htmlIdxs);
		//设置$ulIdxs中第0个li添加hover class
		this.$ulIdxs.children(":first").addClass("hover");
	},
	autoMove(){//自动轮播
		this.moved++;//记录左移的个数加加
		//先等待WAIT，再移动到moved*LIWIDTH,添加了一个空的动画，不使用delay，因为stop不能停止delay
		this.$ulImgs.animate({"null":0},this.WAIT,function(){
						this.$ulImgs.animate({
							left:-this.moved*this.LIWIDTH
						},this.DURATTION,function(){//this->正在正在变化的
						//如果moved等于imgs的个数
						if(this.moved==imgs.length){
							//将ulImgs的left归零
							this.$ulImgs.css("left",0);
							this.moved=0;//将moved归0
						}
						this.changeHover();//调整原点
						this.autoMove();//再次启动轮播
					}.bind(this))
		}.bind(this))
	},
	changeHover(){//根据moved调整原点的hover
		//将ulIdxs中moved位置的圆点添加hover，去掉兄弟的hover
		this.$ulIdxs.children()
		    .eq(this.moved).addClass("hover")
		    .siblings().removeClass("hover");
	},
	
} 
slider.init();

