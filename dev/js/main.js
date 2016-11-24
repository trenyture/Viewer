(function($){
	// PRINCIPAL FUNCTION TO ANIMATE SLIDES
	function theAnimation(a,n){
		var zeLeft = 0;
		if(n > a){
			zeLeft = "-150%";
		}else{
			zeLeft = "150%";
		}
		$('#vws_slides li.vws_active').animate({
			left: zeLeft
		}, 500, function(){
			$(this).removeClass('vws_active');
		});
		if((n - a) > 1 ){
			for (var i = a+1; i < n; i++) {
				$('#vws_slides li').eq(i).animate({
					left: zeLeft
				}, 500);
			};
		}
		if((a - n) > 1 ){
			for (var i = n+1; i < a; i++) {
				$('#vws_slides li').eq(i).animate({
					left: "150%"
				}, 500);
			};
		}
		$('#vws_slides li').eq(n).animate({
			left: "0"
		}, 500, function(){
			$(this).addClass('vws_active');
		});
	}
	function touchToLeft(){
		var actual = $('#vws_slides li.vws_active').index(),
			max = parseInt($('#vws_slides li').length);
		if (actual < max-1) {
			var n = actual + 1;
			theAnimation(actual,n);
		}
	}
	function touchToRight(){
		var actual = $('#vws_slides li.vws_active').index();
		if (actual > 0) {
			var n = actual - 1;
			theAnimation(actual,n);
		}
	}
	function touchTo(n){
		var actual = $('#vws_slides li.vws_active').index();
		if(n != actual){
			theAnimation(actual,n);
		}
	}
	function constructOr(){
		$('#vws_nav').html('<a id="vws_burger" href="#">Menu</a><ul id="vws_menu"></ul>');
		for (var i = 0; i < $('#vws_slides li').length; i++) {
			$('#vws_nav #vws_menu').append('<li>'+$('#vws_slides li').eq(i).data('menu')+'</li>');
		};
		$("#vws_slides li").eq(0).addClass('vws_active');
		$("#vws_slides li").eq(0).addClass('vws_selected');
		$("#vws_slides").before('<span id="vws_prev" class="vws_ctrl"><</span>').after('<span id="vws_next" class="vws_ctrl">></span>');
	}




	$(document).ready(function(){
		constructOr();
		$('body').on('click',function(){
			if ($('#vws_nav').hasClass('vws_actif')) {$('#vws_nav').removeClass('vws_actif');}
		});
		/*DISPLAY OR NOT MENU*/
		$('a#vws_burger').on('click',function(event){
			event.stopPropagation();
			$('#vws_nav').toggleClass('vws_actif');
			return false;
		});
		$('#vws_nav #vws_menu li').on('click',function(){
			touchTo($(this).index());
		});
		/*EVENTS FOR TOUCHING SCREEN*/
		$("#vws_slides").swipe({
			swipe:function(event, direction, distance, duration, fingerCount) {
				if (direction == 'left') {
					touchToLeft();
				}
				if (direction == 'right') {
					touchToRight();
				}
			}
		});
		$(window).keydown(function(e) {
			switch(e.which) {
				case 37:
					touchToRight();
					break;
				case 39:
					touchToLeft();
					break;
			}

		});
		$('#vws_prev').on('click',function(){
			touchToRight();
		});
		$('#vws_next').on('click',function(){
			touchToLeft();
		});
	});
})(jQuery);