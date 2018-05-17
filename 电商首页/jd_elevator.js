/*
* @Author: Li Qiuhua
* @Date:   2018-04-05 16:12:07
* @Last Modified by:   Li Qiuhua
* @Last Modified time: 2018-04-17 20:10:24
*/
//楼层滚动
'use strict';
var elevator={
	FHEIGHT:414,//保存楼层高度
	UPLEVAL:0,//保存亮灯区域的上限
	DOWNLEVAL:0,//保存亮灯区域的下限
	$spans:null,//保存所有楼层的气泡
	$elevator:null,//保存电梯按钮的div
	init(){
		var me=this;//this->elevator
		//计算UPLEVEL和DOWNLEVEL
		me.UPLEVAL=(innerHeight-me.FHEIGHT)/2;
		me.DOWNLEVAL=me.UPLEVAL+me.FHEIGHT;
		//找到所有楼层的气泡
		me.$spans=$(".floor>header>span");
		//找到电梯按钮的div
		me.$elevator=$("#elevator");
		//为当前窗口添加滚动事件
		$(window).scroll(function(){
			me.checkSpan();
			//如果有气泡亮就设置elevator
			if(me.$spans.is(".hover"))
				me.$elevator.show();
			//否则就设置隐藏
			else 
				me.$elevator.hide();
		});
		//为elevator下的ul绑定鼠标进入，只允许li响应
		me.$elevator.children("ul")
			.on("mouseover","li",function(){//this->li
			    $(this).children(":first").hide()
					.next().show();
			})
			.on("mouseout","li",function(){//this->li
				//获得当前li的下标i
				var i=$(this).index("#elevator>ul>li");
				//如果当前li对应的spans没亮灯
				if(!me.$spans.eq(i).is(".hover"))
					//第一个显示，第二个隐藏
					$(this).children(":first").show()
					.next().hide();
			})
			.on("click","li",function(){//this->li
				//获得当前li的下标i
				var i=$(this).index("#elevator>ul>li");
				//获得spans中i位置的span的offsetTop
				var offsetTop=me.$spans.eq(i).offset().top;
				var scroll=offsetTop-me.UPLEVAL;
				//这里stop(true),是为了停止此动画之前的所有正在进行的动画，养成习惯
				$(document.body).stop(true).animate({
					scrollTop:scroll//css中没有的属性，但jQuery中有
				},1000);
			});
	},
	checkSpan(){//检查每个楼层的span是否亮灯
		var me=this;//this->elevator
		me.$spans.each(function(i){//this->当前的span,i->当前访问的span是第几个
			//获得当前span的offseTop
			var offsetTop=$(this).offset().top;
			//获得页面滚动的scrollTop
			var scrollTop=$(document.body).scrollTop();
			//如果offsetTop>scrollTop+UPLEVEL且小于scrollTop+DOWNLEVEL
			if(offsetTop>(scrollTop+me.UPLEVAL)&&offsetTop<=(scrollTop+me.DOWNLEVAL)){
				//设置当前的span的class为hover
				$(this).addClass("hover");
				//找到id为elevator下的ul下的i位置的li，让li下的第一个隐藏第二个显示
				me.$elevator.find("ul>li").eq(i)
					.children(":first").hide()
					.next().show();
			}else{//否则
				$(this).removeClass("hover")//清除当前span的class
				//找到id为elevator下的ul下的i位置的li，让li下的第一个显示第二个隐藏
				me.$elevator.find("ul>li").eq(i)
					.children().show()
					.next().hide();
			}
		})
	},
}
elevator.init();