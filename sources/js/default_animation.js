var click_check = 0;
var menu = document.getElementById('menu');
var menucontent = document.getElementById('menu_content');
menu.style.cursor = 'pointer';

var mousePosition;
var offset = [0];
var div;
var isDown = false;

$.fn.animateRotate = function(angle, duration, initialangle, background, easing, complete) {
  return this.each(function() {
    var $elem = $(this);

    $({deg: initialangle}).animate({deg: angle}, {
      duration: duration,
      easing: easing,
      step: function(now) {
        $elem.css({
            transform: 'rotate(' + now + 'deg)'         
         });
          if (background == 0){
              $elem.css({
                  background: '#5DADE2'         
              });
          }
          else if (background == 1){
              $elem.css({
                  background: '#fff'         
              });
          }
      },
      complete: complete || $.noop
    });
  });
};

document.body.appendChild(menu);

menu.addEventListener('mousedown', function(e) {
    isDown = true;
    offset = [
        menu.offsetLeft-e.clientX,
    ];
}, true);

document.addEventListener('mouseup', function() {
    isDown = false;
}, true);


document.addEventListener('mousemove', function(event) {
    event.preventDefault();
    widthpage=$(window).width()
    
    if (isDown) {
        mousePosition = {
            x : event.clientX,
        };
        if(((widthpage-mousePosition.x)) <= (widthpage*0.25)) {  
            menu.style.right = (widthpage-mousePosition.x) + 'px';
            menucontent.style.width=(widthpage-mousePosition.x) + 'px';
            percent=(widthpage-mousePosition.x)/(widthpage*0.25)
            if (click_check==1){
                $("#menu ul li").eq(0).css({transform: 'rotate(' + 45*percent + 'deg)', background:   '#fff'});
                $("#menu ul li").eq(1).css({transform: 'rotate(' + -45*percent + 'deg)',background: '#fff'});
            }
            else{
                $("#menu ul li").eq(0).css({transform: 'rotate(' + 45*percent + 'deg)', background:   '#5DADE2'});
                $("#menu ul li").eq(1).css({transform: 'rotate(' + -45*percent + 'deg)',background: '#5DADE2'});
                document.getElementById("menu_content").style.boxShadow = "0px 0px 30px gray"
            }

            if(mousePosition.x >= widthpage-widthpage*0.029){
                menu.style.right = 0 + 'px';
                menucontent.style.width= 0 + 'px';
                click_check=0
                $("#menu ul li").eq(0).css({transform: 'rotate(' + -45 + 'deg)',background: '#fff'});
                $("#menu ul li").eq(1).css({transform: 'rotate(' + 45 + 'deg)',background: '#fff'});
            }
        }
        else if(((widthpage-mousePosition.x)) >= (widthpage*0.25) ){
            menu.style.right =  (widthpage*0.25) + 'px';
            menucontent.style.width= (widthpage*0.251) + 'px';
            click_check=1
            $("#menu ul li").eq(0).css({transform: 'rotate(' + 45 + 'deg)',background: '#5DADE2'});
            $("#menu ul li").eq(1).css({transform: 'rotate(' + -45 + 'deg)',background: '#5DADE2'});
        }
    }
}, true);



$(document).ready(function(){
$("#menu").click(function() {
    widthpage=$(window).width()
    if (click_check==0){
        $("#menu_content").animate({'width' : (widthpage*0.251)}, 500);
        $("#menu").animate({'right' : (widthpage*0.25)}, 500)
        click_check=1
        $("#menu ul li").eq(0).animateRotate(45,500,0,0);
        $("#menu ul li").eq(1).animateRotate(-45,500,0,0);
    }
    else{
        $("#menu_content").animate({'width' : 0}, 500);
        $("#menu").animate({'right' : 0}, 500);
        click_check=0
        $("#menu ul li").eq(0).animateRotate(-45,500,0,1);
        $("#menu ul li").eq(1).animateRotate(45,500,0,1);
    }
});
});

$('[id="menu_click"]').click(function(){
    scroll_top=$("#"+$(this).attr('name')).offset().top
    window.scroll({
        top: scroll_top, 
        behavior: 'smooth'
    });
});

for (i = 0; i < 100; i++) { 
        var d = Math.floor(Math.random() * 200);
        var newCircle = $('<div />')
        newCircle.addClass("circle");
        newCircle.css({
        width: d,
        height: d,
        left: $("#circle_fill").width()/2
            ,backgroundColor: getRandomColor()
        });
        $('#circle_fill').append(newCircle)
}


function getRandomColor() {
    var colours = ["rgba(255, 255, 255, 0.7)", "rgba(173, 177, 245, 0.7)", "rgba(54, 62, 212, 0.7)", "rgba(22, 28, 134, 0.7)"];
    return colours[Math.floor(Math.random() * 4)]
}


function randomFromTo(from, to){
    return Math.floor(Math.random()*(to-from+1)+from);
}
  
function moveRandom(obj) {
    var cPos = $('#circle_fill').offset();
	var cHeight = $('#circle_fill').height();
    var cWidth = $('#circle_fill').width();
    var divHeight=$('.frontpage_content').height();
			
    var pad = parseInt($('#circle_fill').css('padding-top').replace('px', ''));
			
    
    var bHeight = obj.height();
	var bWidth = obj.width();
			
	maxY = cPos.top + cHeight*0.9 + pad;
    maxX = cPos.left + cWidth*1 - pad;
			
    minY = -50;
	minX = cPos.left + pad;
    
    newY = randomFromTo(minY, maxY);
	newX = randomFromTo(minX, maxX);
    obj.animate({
        top: newY,
        left: newX
    }, 10000, function() {
    moveRandom(obj);
    });
}

function pausemoveRandom(obj){
    function firstClick() {
        $(".circle").stop()
        $(".background_frontpage_me").off('click').on('click', secondClick)
    }
    function secondClick() {
        $('.circle').each(function() {
            moveRandom($(this));
        });
        $(".background_frontpage_me").off('click').on('click', firstClick)
    }
    $(".background_frontpage_me").on('click', firstClick)
}

$('.circle').each(function() {
    cond=true
    moveRandom($(this));
    pausemoveRandom($(this))
});


function animateCircle(obj){
    var scroll = $(window).scrollTop();
    var circboxheigh = obj.height();
    shadowbox=(circboxheigh/scroll)+30
    box=(circboxheigh/scroll)+40
    if (scroll ==0 || box >90 || box==Infinity){
        $('#circleanimation').css({background: '-moz-radial-gradient(transparent 76.25%, rgb(62, 83, 97) 86.25%)'},{background: '-webkit-radial-gradient(transparent 76.25%, rgb(62, 83, 97) 86.25%)'},{background: '-ms-radial-gradient(transparent 76.25%, rgb(62, 83, 97) 86.25%)'},{background: '-o-radial-gradient(transparent 76.25%, rgb(62, 83, 97) 86.25%)'})
    }
    else{
        $('#circleanimation').css({background: '-webkit-radial-gradient(transparent '+ shadowbox +'%, rgba(62,83,97,1) '+ box +'%)'},{background: '-ms-radial-gradient(transparent '+ shadowbox +'%, rgba(62,83,97,1) '+ box +'%)'},{background: '-o-radial-gradient(transparent '+ shadowbox +'%, rgba(62,83,97,1) '+ box +'%)'},{background: 'moz-radial-gradient(transparent '+ shadowbox +'%, rgba(62,83,97,1) '+ box +'%)'})
    }
}

$(document).ready(function(){
    $(window).scroll(function(){
        animateCircle($('#circleanimation'))
    });
});

$(document).ready(function(){
    var check=true
    $('[id="expandible"]').click(function(){
        if (check==true){
            $(this).addClass("full_canvas")
            $(".bellow_page").css( {"zIndex": 0})
            $(".fullframe,.page").css( {"zIndex": -10})
            $("#media_disp").css( {"zIndex": 1})
            $("#media_disp .fullframe").css( {"zIndex": 1})
            $('html, body').css({overflow: 'hidden'})
            check=false
        }
        else{
            $(this).removeClass("full_canvas")
            $(".bellow_page").css( {"zIndex": 2})
            $(".fullframe,.page").css( {"zIndex": 1})
            $("#media_disp .fullframe").css( {"zIndex": 1})
            $('html, body').css({overflow: 'auto'})
            $('.content_blog').css({overflow: 'auto'})
            check=true
        } 
    });
});

$(document).ready(function(){
    var randominit=randomFromTo(0, 3)
    if (randominit==0){ 
        $('[id="squarediv"]').animate({opacity: 1})
        $('[id="squaredivnf"]').animate({opacity: 1})
        $('.cresearch').css({'height':66.66+'vh','width':66.66+'vw','float':"left"});
         $('.oresearch').css({'height':33.33+'vh','width':33.33+'vw'});
         $('.publications').css({'height':33.33+'vh','width':33.33+'vw'});
         $('.teaching').css({'height':33.33+'vh','width':50+'vw'});
         $('.cv').css({'height':33.33+'vh','width':50+'vw'});
    }
    else if (randominit==1){ 
         $('[id="squarediv"]').animate({opacity: 1})
         $('[id="squaredivnf"]').animate({opacity: 1})
         $('.cresearch').css({'height':33.33+'vh','width':33.33+'vw'});
         $('.oresearch').css({'height':33.33+'vh','width':33.33+'vw'});
         $('.publications').css({'height':66.66+'vh','width':66.66+'vw'});
         $('.teaching').css({'top':-50+'vh','height':50+'vh','width':33.33+'vw'});
         $('.cv').css({'top':-50+'vh','height':50+'vh','width':33.33+'vw','float':"right"});
    }
    else if (randominit==2){
         $('[id="squarediv"]').animate({opacity: 1})
         $('[id="squaredivnf"]').animate({opacity: 1})
         $('.cresearch').css({'height':33.33+'vh','width':50+'vw',});
         $('.oresearch').css({'height':33.33+'vh','width':50+'vw'});
         $('.publications').css({'height':66.66+'vh','width':66.66+'vw','float':"left"});
         $('.teaching').css({'height':33.33+'vh','width':33.33+'vw'});
         $('.cv').css({'height':33.33+'vh','width':33.33+'vw'});
    }
    else if (randominit==3){ 
         $('[id="squarediv"]').animate({opacity: 1})
         $('[id="squaredivnf"]').animate({opacity: 1})
         $('.cresearch').css({'height':66.66+'vh','width':66.66+'vw','float':"right"});
         $('.oresearch').css({'height':33.33+'vh','width':33.33+'vw'});
         $('.publications').css({'height':33.33+'vh','width':33.33+'vw'});
         $('.teaching').css({'height':33.33+'vh','width':50+'vw'});
         $('.cv').css({'height':33.33+'vh','width':50+'vw'});
    }
});

$(document).ready(function(){
    var randominit=randomFromTo(0, 3)
    tools_disp
})

function randaxis(){
    var axisavailable=["x","y"];
    return axisavailable[randomFromTo(0, 1)]
}

$('[id="squarediv"]').flip({
    axis: 'y',
    trigger: 'click'
});
