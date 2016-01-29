window.onload=function(){
	var changjing=document.getElementsByClassName('changjing');
	var left=document.getElementById('left');
	var right=document.getElementById('right');
	var play=document.getElementById('boxs');
	var none_block=document.getElementById('none_block');
	var boxs=document.getElementById('boxs');
	var again=document.getElementById('again');
	var end=document.getElementById('end');
	var close=document.getElementById('close');
	var snake=[ {x:0,y:0},{x:0,y:1},{x:0,y:2} ];
	RIGHT=39,LEFT=37,UP=38,DOWN=40,
	ROW=10,
	defaultDirection=RIGHT;     //defaultDirection 默认方向

	var isInSnake=function(cc,dd){
		for(var i=0;i<snake.length;i++){
			if(snake[i].x==cc&&snake[i].y==dd){
				return true;
			}
		}
		return false;
	},
	// 投放食物
	// random=function(){
	// 	return Math.floor(Math.random()*ROW);
	// }
	dropFood=function(){
		var x=Math.floor(Math.random()*ROW),
		    y=Math.floor(Math.random()*ROW);
		    //warniing:当蛇的数据占整个页面的时候会陷入死循环;
		    if (snake.length==100) {
		    	alert('翻滚吧....');
		    	return;
		    };
		    while(isInSnake(x,y)){
		    	x=Math.floor(Math.random()*ROW);
		    	y=Math.floor(Math.random()*ROW);
		    }
			//(1) 可以写成  id=x+'_'+y;
			//(2)   	    var div=document.getElementById(id);  
			//(3)           div.style.backgroundColor='red'; 简化如下:
			var div=document.getElementById(x+'_'+y).style.backgroundImage='url(./images/a.jpg)';
			return {foodx:x,foody:y};	
	},
	food=dropFood();
	zou=function(){
		// defaultDirection=dir;
		// var c={};
		// c.x=snake[snake.length-1];
		// c.y-snake[snake.length-1].y+1;
		var last=snake.length-1;
		var newHead=({x:snake[last].x,y:snake[last].y+1});
		var newHead;
		if(defaultDirection==RIGHT){
			newHead={x:snake[last].x,y:snake[last].y+1};
		}
		if(defaultDirection==LEFT){
			newHead={x:snake[last].x,y:snake[last].y-1};
		}
		if(defaultDirection==DOWN){
			newHead={x:snake[last].x+1,y:snake[last].y};
		}
		if(defaultDirection==UP){
			newHead={x:snake[last].x-1,y:snake[last].y};
		}
		if(newHead.x>9||newHead.x<0||newHead.y>9||newHead.y<0){
			// alert('咯咯,你穿越了!!!');
			close.style.display='block';
			clearInterval(t);
			return null;
		}
		if(isInSnake(newHead.x,newHead.y)){
			alert('自己咬自己');
			clearInterval(t);
			return null;
		}
		snake.push(newHead);
		if(newHead.x==food.foodx&&newHead.y==food.foody){
			// snake.push(newHead);
			var tmp=document.getElementById(food.foodx+'_'+food.foody).style.backgroundColor='green';
			tmp=document.getElementById(food.foodx+'_'+food.foody).style.backgroundImage=null;
			food=dropFood();
			return null; 
		}
		var weiba=snake.shift();
		var t=document.getElementById(weiba.x+'_'+weiba.y);
		t.style.backgroundColor='rgba(255,255,255,0)';
		var h=document.getElementById(newHead.x+'_'+newHead.y);
		h.style.backgroundColor='green';
	},
	// zou();
	
	// 自己调用
	(function(){
		for(var i=0;i<snake.length;i++){
			var a=document.getElementById(snake[i].x+'_'+snake[i].y).style.backgroundColor='green';
		}
	})();
	
	// ---------------------------------------------------------------------------------------------
	
	document.onkeydown=function(e){
		var d=e.keyCode;
		if(d==LEFT||d==UP||d==RIGHT||d==DOWN){
			if(Math.abs(d-defaultDirection) !==2){
				zou(d);
			}
			defaultDirection=d;
		}
		// if(e.keyCode==38){zou('up');}
		// if(e.keyCode==40){zou('down');}
		// if(e.keyCode==37){zou('left');}
		// if(e.keyCode==39){zou('right');}
	}
	
	play.onclick=function(){
		var t=setInterval(zou,500);
		none_block.style.display='block';
	};
	again.onclick=function(){
		close.style.display='none';
		location.reload();
	}
	end.onclick=function(){
		close.style.display='none';
		location.assign('./login.html');
	}
// -------------------------------------------
//while循环的一种用法 
// var iskongxuowei=function(){
// 	if(x==2&&y==0){
// 		return true;
// 	}else{
// 		return false;
// 	}
// };
// var dianming=function(){
// 	var x=Math.floor(Math.random()*5);
// 	var y=Math.floor(Math.random()*10);
// 		while(iskongxuowei(x,y)){
// 			x=Math.floor(Math.random()*6);
// 		 	y=Math.floor(Math.random()*11);
// 		}
// 	return {x:x,y:y};	
// };
// console.log(dianming());
// ---------------------------------------------
// var data=[{a:1,b:2},{a:3,b:5},{a:12,b:16}];
// var aaaaa=function(a,b){
// 	for(var i=0;i<data.length;i++){
// 		while(data[i].a==a&&data[i].b==b){
// 			return true;
// 		}	
// 	}
// 	return false;
// };
// console.log(aaaaa(3,5));
//如果数组中有 a:3 b:5 对象 return true
// 如果没有返回false
// -----------------------------------------------
// var arr=[{x:0,y:0},{x:0,y:1},{x:0,y:2}];
// var c={};
// // c.x=0;
// // c.y=3;
// // console.log(c);
// var fn=function(){
// 	c.x=arr[arr.length-1].x;
// 	c.y=arr[arr.length-1].y+1;
// 	console.log(c);
// 	arr.shift();
// 	arr.push(c);
// 	return arr;
// };
// console.log(fn());




// var t=setInterval(aa,1000);
// clearInterval(t);






};