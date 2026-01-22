//tabs
$(document).on('click','.block7 .b_header', function(){
    $('.block7 .b_header').removeClass('active');
    $(this).addClass('active');
    var l_id = $(this).attr('id');
    var c_id = '#'+l_id+"-content";
    $('.bl7-content').removeClass('active');
    $(c_id).addClass('active');
});
$(document).on('click','.block7 .before', function(){
    active_bh_id = '#'+$('.block7 .b_header.active').attr('id');
    if(active_bh_id != "#1-link"){    
        console.log(active_bh_id);    
        $('.block7 .b_header').removeClass('active');
        $('.block7 .before').removeClass('active');
        $('.block7 .after').removeClass('active');
        var active = $(active_bh_id);
        var active_li = active.parent();
        var prev = active_li.prev().children('.b_header').addClass('active');
        active_li.prev().children('.before').addClass('active');
        active_li.prev().children('.after').addClass('active');
        var l_id = prev.attr('id');
        //console.log(l_id);
        var c_id = '#'+l_id+"-content";
        $('.bl7-content').removeClass('active');
        $(c_id).addClass('active');
    }
});
$(document).on('click','.block7 .after', function(){
    active_bh_id = '#'+$('.block7 .b_header.active').attr('id');
    if(active_bh_id != "#3-link"){    
        //console.log(active_bh_id);    
        $('.block7 .b_header').removeClass('active');
        $('.block7 .before').removeClass('active');
        $('.block7 .after').removeClass('active');
        var active = $(active_bh_id);
        var active_li = active.parent();
        var next = active_li.next().children('.b_header').addClass('active');
        active_li.next().children('.before').addClass('active');
        active_li.next().children('.after').addClass('active');
        var l_id = next.attr('id');
        //console.log(l_id);
        var c_id = '#'+l_id+"-content";
        $('.bl7-content').removeClass('active');
        $(c_id).addClass('active');
    }
});
//form-tabs
$(document).on('click','.point2_header', function(){
    $('.point2_header').removeClass('active');
    $(this).addClass('active');
    var l_id = $(this).attr('id');
    var c_id = '#'+l_id+"-content";
    $('.form_point2-automobile').removeClass('active');
    $(c_id).addClass('active');
});
$(document).on('click','.block_form .before', function(){
    active_bh_id = '#'+$('.block_form .point2_header.active').attr('id');
    if(active_bh_id != "#1form-tab"){    
        console.log(active_bh_id);    
        $('.block_form .point2_header').removeClass('active');
        $('.block_form .before').removeClass('active');
        $('.block_form .after').removeClass('active');
        var active = $(active_bh_id);
        var active_li = active.parent();
        var prev = active_li.prev().children('.point2_header').addClass('active');
        active_li.prev().children('.before').addClass('active');
        active_li.prev().children('.after').addClass('active');
        var l_id = prev.attr('id');
        //console.log(l_id);
        var c_id = '#'+l_id+"-content";
        $('.form_point2-automobile').removeClass('active');
        $(c_id).addClass('active');
    }
});
$(document).on('click','.block_form .after', function(){
    active_bh_id = '#'+$('.block_form .point2_header.active').attr('id');
    if(active_bh_id != "#3form-tab"){    
        //console.log(active_bh_id);    
        $('.block_form .point2_header').removeClass('active');
        $('.block_form .before').removeClass('active');
        $('.block_form .after').removeClass('active');
        var active = $(active_bh_id);
        var active_li = active.parent();
        var next = active_li.next().children('.point2_header').addClass('active');
        active_li.next().children('.before').addClass('active');
        active_li.next().children('.after').addClass('active');
        var l_id = next.attr('id');
        //console.log(l_id);
        var c_id = '#'+l_id+"-content";
        $('.form_point2-automobile').removeClass('active');
        $(c_id).addClass('active');
    }
});
//video
$(document).on('click', '.play_btn-wrap', function() {
    var $video = $('#cvideo'),
        src = $video.attr('src');
        $(".video_img").hide();
        $(".play_btn-wrap").hide();        
        $("#cvideo").css("z-index","1");
        $("#cvideo").css("position","relative");
     $video.attr('src', src + '&autoplay=1');
});
//calendar
$(document).on('click','.calendar_month.available', function(){
    $('.calendar_month').removeClass('active');
    $(this).addClass('active');
    var month = $(this).attr('id');
    var sel_month = '#sel-'+month;
    $('.calendar_dates').removeClass('active');
    $(sel_month).addClass('active');
});
$(document).on('click','.calendar_date.available', function(){
    $(this).addClass('active');
});
$(document).on('click','.calendar_date.active', function(){
    $(this).removeClass('active');
});
//skroll
$(function(){
    $('a[href^="#"]').on('click', function(event) {
      // отменяем стандартное действие
      event.preventDefault();
      
      var sc = $(this).attr("href"),
          dn = $(sc).offset().top;
      /*
      * sc - в переменную заносим информацию о том, к какому блоку надо перейти
      * dn - определяем положение блока на странице
      */
      
      $('html, body').animate({scrollTop: dn}, 1000);
      
      /*
      * 1000 скорость перехода в миллисекундах
      */
    });
  });
 //menu
    $(document).on('click','.menu a', function(){
        $('.menu a').removeClass('active');
        $(this).addClass('active');
    });
    
  $(window).on("scroll", function () {
    if ($(document).scrollTop() > 0){
        $('.menu').addClass('fixed');
    }
    else {
        $('.menu').removeClass('fixed');
    };
  });
    var menu_selector = ".menu"; 
    function onScroll(){
        var scroll_top = $(document).scrollTop();
        $(menu_selector + " a").each(function(){
            var hash = $(this).attr("href");
            var target = $(hash);            
            var target_id = target.attr("id");
            target = $('#'+target_id);
            if (target.position().top-200 <= scroll_top && target.position().top + target.outerHeight() > scroll_top) {
                $(menu_selector + " a.active").removeClass("active");
                $(this).addClass("active");
            } else {
                $(this).removeClass("active");
            }
        });
    }
    $(document).ready(function () {
        $(document).on("scroll", onScroll);
        $("a[href^=#]").click(function(e){
            e.preventDefault();
            $(document).off("scroll");
            $(menu_selector + " a.active").removeClass("active");
            $(this).addClass("active");
            var hash = $(this).attr("href");
            var target = $(hash);
            $("html, body").animate({
                scrollTop: target.offset().top
            }, 500, function(){
                window.location.hash = hash;
                $(document).on("scroll", onScroll);
            });
        });
    });
  //message
  var show1 = true;
  var countbox = ".block2 .quote";
  $(window).on("scroll load", function () {
      if (!show1) return false; // Отменяем показ анимации, если она уже была выполнена
      var w_top = $(window).scrollTop(); // Количество пикселей на которое была прокручена страница
      var e_top = $(countbox).offset().top; // Расстояние от блока со счетчиками до верха всего документа
      var w_height = $(window).height(); // Высота окна браузера
      var d_height = $(document).height(); // Высота всего документа
      var e_height = $(countbox).outerHeight(); // Полная высота блока со счетчиками
      if (w_top + 500 >= e_top || w_height + w_top == d_height || e_height + e_top < w_height) {
        $(document).ready(function (){
            $(".block2 .quote").animate({
                opacity: '1',
                }, 500 );   
            setTimeout(function(){
                $(".block2 .name").animate({
                    opacity: '1',
                    }, 500 );    
                $(".block2 .who").animate({
                    opacity: '1',
                    }, 500 ); 
               },500); //delay is in milliseconds 
               clearTimeout();          
            },);
        show1 = false;
      }
  });

  var show2 = true;
  var countbox2 = ".block4 .quote";
  $(window).on("scroll load", function () {
      if (!show2) return false; // Отменяем показ анимации, если она уже была выполнена
      var w_top2 = $(window).scrollTop(); // Количество пикселей на которое была прокручена страница
      var e_top2 = $(countbox2).offset().top; // Расстояние от блока со счетчиками до верха всего документа
      var w_height2 = $(window).height(); // Высота окна браузера
      var d_height2 = $(document).height(); // Высота всего документа
      var e_height2 = $(countbox2).outerHeight(); // Полная высота блока со счетчиками
      if (w_top2 + 500 >= e_top2 || w_height2 + w_top2 == d_height2 || e_height2 + e_top2 < w_height2) {
        $(document).ready(function (){
            $(".block4 .quote").animate({
                opacity: '1',
                }, 500 );   
            setTimeout(function(){
                $(".block4 .name").animate({
                    opacity: '1',
                    }, 500 );    
                $(".block4 .who").animate({
                    opacity: '1',
                    }, 500 ); 
               },500); //delay is in milliseconds   
            clearTimeout();                   
            },);
        show2 = false;
      }
  });
  var show3 = true;
  var countbox3 = ".block6 .quote";
  $(window).on("scroll load", function () {
      if (!show3) return false; // Отменяем показ анимации, если она уже была выполнена
      var w_top3 = $(window).scrollTop(); // Количество пикселей на которое была прокручена страница
      var e_top3 = $(countbox3).offset().top; // Расстояние от блока со счетчиками до верха всего документа
      var w_height3 = $(window).height(); // Высота окна браузера
      var d_height3 = $(document).height(); // Высота всего документа
      var e_height3 = $(countbox3).outerHeight(); // Полная высота блока со счетчиками
      if (w_top3 + 500 >= e_top3 || w_height3 + w_top3 == d_height3 || e_height3 + e_top3 < w_height3) {
        $(document).ready(function (){
            $(".block6 .quote").animate({
                opacity: '1',
                }, 500 );   
            setTimeout(function(){
                $(".block6 .name").animate({
                    opacity: '1',
                    }, 500 );    
                $(".block6 .who").animate({
                    opacity: '1',
                    }, 500 ); 
               },500); //delay is in milliseconds   
            clearTimeout();                   
            },);
        show3 = false;
      }
  });
  var show4 = true;
  var countbox4 = ".block8 .quote";
  $(window).on("scroll load", function () {
      if (!show4) return false; // Отменяем показ анимации, если она уже была выполнена
      var w_top4 = $(window).scrollTop(); // Количество пикселей на которое была прокручена страница
      var e_top4 = $(countbox4).offset().top; // Расстояние от блока со счетчиками до верха всего документа
      var w_height4 = $(window).height(); // Высота окна браузера
      var d_height4 = $(document).height(); // Высота всего документа
      var e_height4 = $(countbox4).outerHeight(); // Полная высота блока со счетчиками
      if (w_top4 + 500 >= e_top4 || w_height4 + w_top4 == d_height4 || e_height4 + e_top4 < w_height4) {
        $(document).ready(function (){
            $(".block8 .quote").animate({
                opacity: '1',
                }, 500 );   
            setTimeout(function(){
                $(".block8 .name").animate({
                    opacity: '1',
                    }, 500 );    
                $(".block8 .who").animate({
                    opacity: '1',
                    }, 500 ); 
               },500); //delay is in milliseconds   
            clearTimeout();                   
            },);
        show4 = false;
      }
  });
  var show5 = true;
  var countbox5 = ".block10 .quote";
  $(window).on("scroll load", function () {
      if (!show5) return false; // Отменяем показ анимации, если она уже была выполнена
      var w_top5 = $(window).scrollTop(); // Количество пикселей на которое была прокручена страница
      var e_top5 = $(countbox5).offset().top; // Расстояние от блока со счетчиками до верха всего документа
      var w_height5 = $(window).height(); // Высота окна браузера
      var d_height5 = $(document).height(); // Высота всего документа
      var e_height5 = $(countbox5).outerHeight(); // Полная высота блока со счетчиками
      if (w_top5 + 500 >= e_top5 || w_height5 + w_top5 == d_height5 || e_height5 + e_top5 < w_height5) {
        $(document).ready(function (){
            $(".block10 .quote").animate({
                opacity: '1',
                }, 500 );   
            setTimeout(function(){
                $(".block10 .name").animate({
                    opacity: '1',
                    }, 500 );
               },500); //delay is in milliseconds   
            clearTimeout();                   
            },);
        show5 = false;
      }
  });
  //days
  var show61 = true;
  var countbox61 = ".scedule>.day:eq(0)";
  $(window).on("scroll load", function () {
      if (!show61) return false; // Отменяем показ анимации, если она уже была выполнена
      var w_top61 = $(window).scrollTop(); // Количество пикселей на которое была прокручена страница
      var e_top61 = $(countbox61).offset().top; // Расстояние от блока со счетчиками до верха всего документа
      var w_height61 = $(window).height(); // Высота окна браузера
      var d_height61 = $(document).height(); // Высота всего документа
      var e_height61 = $(countbox61).outerHeight(); // Полная высота блока со счетчиками
      if (w_top61 + 400 >= e_top61 || w_height61 + w_top61 == d_height61 || e_height61 + e_top61 < w_height61) {
        $(document).ready(function (){
            $(".scedule>.day:eq(0)").animate({
                opacity: '1',
                }, 500 );  
            $(".d-line").animate({
                height: '20%',
                }, 500 ); 
            setTimeout(function(){
                $(".scedule>.day:eq(0)>.d-text>span").animate({
                    color: '#c0d500',
                    }, 500 );
                },500); //delay is in milliseconds   
            clearTimeout();                   
            },);
        show61 = false;
      }
  });
  var show62 = true;
  var countbox62 = ".scedule>.day:eq(1)";
  $(window).on("scroll load", function () {
      if (!show62) return false; // Отменяем показ анимации, если она уже была выполнена
      var w_top62 = $(window).scrollTop(); // Количество пикселей на которое была прокручена страница
      var e_top62 = $(countbox62).offset().top; // Расстояние от блока со счетчиками до верха всего документа
      var w_height62 = $(window).height(); // Высота окна браузера
      var d_height62 = $(document).height(); // Высота всего документа
      var e_height62 = $(countbox62).outerHeight(); // Полная высота блока со счетчиками
      if (w_top62 + 400 >= e_top62 || w_height62 + w_top62 == d_height62 || e_height62 + e_top62 < w_height62) {
        $(document).ready(function (){
            $(".scedule>.day:eq(1)").animate({
                opacity: '1',
                }, 500 ); 
            $(".d-line").animate({
                height: '38%',
                }, 500 );
            setTimeout(function(){
                $(".scedule>.day:eq(1)>.d-text>span").animate({
                    color: '#c0d500',
                    }, 500 );
                },500); //delay is in milliseconds   
            clearTimeout();                   
            },);
        show62 = false;
      }
  });
  var show63 = true;
  var countbox63 = ".scedule>.day:eq(2)";
  $(window).on("scroll load", function () {
      if (!show63) return false; // Отменяем показ анимации, если она уже была выполнена
      var w_top63 = $(window).scrollTop(); // Количество пикселей на которое была прокручена страница
      var e_top63 = $(countbox63).offset().top; // Расстояние от блока со счетчиками до верха всего документа
      var w_height63 = $(window).height(); // Высота окна браузера
      var d_height63 = $(document).height(); // Высота всего документа
      var e_height63 = $(countbox63).outerHeight(); // Полная высота блока со счетчиками
      if (w_top63 + 400 >= e_top63 || w_height63 + w_top63 == d_height63 || e_height63 + e_top63 < w_height63) {
        $(document).ready(function (){
            $(".scedule>.day:eq(2)").animate({
                opacity: '1',
                }, 500 );   
            $(".d-line").animate({
                height: '58%',
                }, 500 );
            setTimeout(function(){
                $(".scedule>.day:eq(2)>.d-text>span").animate({
                    color: '#c0d500',
                    }, 500 );
                },500); //delay is in milliseconds   
            clearTimeout();                 
            },);
        show63 = false;
      }
  });
  var show64 = true;
  var countbox64 = ".scedule>.day:eq(3)";
  $(window).on("scroll load", function () {
      if (!show64) return false; // Отменяем показ анимации, если она уже была выполнена
      var w_top64 = $(window).scrollTop(); // Количество пикселей на которое была прокручена страница
      var e_top64 = $(countbox64).offset().top; // Расстояние от блока со счетчиками до верха всего документа
      var w_height64 = $(window).height(); // Высота окна браузера
      var d_height64 = $(document).height(); // Высота всего документа
      var e_height64 = $(countbox64).outerHeight(); // Полная высота блока со счетчиками
      if (w_top64 + 400 >= e_top64 || w_height64 + w_top64 == d_height64 || e_height64 + e_top64 < w_height64) {
        $(document).ready(function (){
            $(".scedule>.day:eq(3)").animate({
                opacity: '1',
                }, 500 );   
                $(".d-line").animate({
                    height: '80%',
                    }, 500 );
                setTimeout(function(){
                    $(".scedule>.day:eq(3)>.d-text>span").animate({
                        color: '#c0d500',
                        }, 500 );
                   },500); //delay is in milliseconds   
                clearTimeout();                 
            },);
        show64 = false;
      }
  });
  var show65 = true;
  var countbox65 = ".scedule>.day:eq(4)";
  $(window).on("scroll load", function () {
      if (!show65) return false; // Отменяем показ анимации, если она уже была выполнена
      var w_top65 = $(window).scrollTop(); // Количество пикселей на которое была прокручена страница
      var e_top65 = $(countbox65).offset().top; // Расстояние от блока со счетчиками до верха всего документа
      var w_height65 = $(window).height(); // Высота окна браузера
      var d_height65 = $(document).height(); // Высота всего документа
      var e_height65 = $(countbox65).outerHeight(); // Полная высота блока со счетчиками
      if (w_top65 + 400 >= e_top65 || w_height65 + w_top65 == d_height65 || e_height65 + e_top65 < w_height65) {
        $(document).ready(function (){
            $(".scedule>.day:eq(4)").animate({
                opacity: '1',
                }, 500 ); 
                $(".d-line").animate({
                    height: '100%',
                    }, 500 ); 
                setTimeout(function(){
                    $(".scedule>.day:eq(4)>.d-text>span").animate({
                        color: '#c0d500',
                        }, 500 );
                   },500); //delay is in milliseconds 
                setTimeout(function(){
                    $(".scedule-begin-line").animate({
                        backgroundColor: '#c0d500',
                        }, 500 );
                   },2500); //delay is in milliseconds  
                clearTimeout();                  
            },);        
        show65 = false;
      }
  });
//Form
$(document).on('click','#form_point1_content .block_form_btn', function(){
    $('.block_form_content').removeClass('active');
    $('.form_progress li').removeClass('active');    
    $('#form_point2_content').addClass('active');
    $('#form_point1').removeClass('active');
    $('#form_point2').addClass('active');
    $('#form_point1').addClass('passed');
});
$(document).on('click','#form_point2_content .block_form_btn', function(){
    $('.block_form_content').removeClass('active');
    $('.form_progress li').removeClass('active'); 
    $('#form_point3_content').addClass('active');
    $('#form_point2').removeClass('active');
    $('#form_point3').addClass('active');
    $('#form_point2').addClass('passed');
});
$(document).on('click','#form_point3_content .block_form_btn', function(){
    $('.block_form_content').removeClass('active');
    $('.form_progress li').removeClass('active'); 
    $('#form_point4_content').addClass('active');
    $('#form_point3').removeClass('active');
    $('#form_point4').addClass('active');
    $('#form_point3').addClass('passed');
});
//typed
document.addEventListener('DOMContentLoaded', function() {
    var typed = new Typed('#typed', {
      stringsElement: '#typed-strings',
      typeSpeed: 60,
      startDelay: 1000,
      loop: false
    });
  });



