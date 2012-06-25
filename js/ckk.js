$.fn.preload = function() {
	this.each(function() {
		$('<img/>')[0].src = this;
	})
}

$(document).ready(function() {
	
	$(['images/bg1.jpg', 'images/bg2.jpg', 'images/bg3.jpg', 'images/bg4.jpg']).preload();
	var acceptable_width = Math.min(1280, Math.max($(window).width(), 982)); 
	$('#bg').width(acceptable_width).css('margin-left', '-' + (acceptable_width / 2).toString() + 'px');
	$('#bg li').css('left', '-' + ((1280 - acceptable_width) / 2).toString() + 'px');

	if($('#bg').height() < ($('#top').outerHeight(true) + $('#content').outerHeight())) {
		$('#bg').height($('#top').outerHeight(true) + $('#content').outerHeight() + 30);
		$('#bottom').css('margin-top', '30px');
	}

	if(!document.cookie.match(/bgindex/)) {
		document.cookie = 'bgindex=1';
		var bgindex = 0;
	} else {
		var bgindex = parseInt(document.cookie.match(/bgindex=([0-9])/)[1]);
		if(bgindex > 3) bgindex = 0;
	}
	$('#bg li:eq(' + bgindex + ')').show();

	setInterval(function() {
		var visible = $('#bg li:visible');
		visible.fadeOut();
		if(visible.next().length > 0) {
			visible.next().fadeIn(1000);
			bgindex += 1;
		} else {
			$('#bg li:first').fadeIn(1000);
			bgindex = 0;
		}
		document.cookie = 'bgindex=' + bgindex.toString();
	}, 5000);
	
	if($('#gslider').length) {
		$($.map($('#gslider li a'), function(i) { return $(i).attr('href'); })).preload();
		var slider = $('#gslider ul');
		var slider_item = $('#gslider li');
		var slider_item_width = slider_item.outerWidth(true);
	
		slider.width(slider_item_width * slider_item.length);
		slider.prepend($('#gslider li:last')).css('margin-left', '-' + slider_item_width + 'px');
		slider_item.find('a').click(function(e) {
			e.preventDefault();
			if(!$('#gnew').length) {
				var gnew = $('<img src="' + $(this).attr('href') + '" id="gnew" style="display: none;"/>');
				var gold = $('#gimg img:not(#gnew)');
				$('#gimg').append(gnew);
				gnew.fadeIn(function() {
					$(this).attr('id', '');
				});
				gold.fadeOut(function() {
					$(this).remove();
				})
			}
		});
	
		$('#gslider a.next').click(function(e) {
			e.preventDefault();
			slider.animate({'margin-left': '-=' + slider_item_width}, function() {
				slider.append($('#gslider li:first')).css('margin-left', '-' + slider_item_width + 'px');
			});
		});

		$('#gslider a.prev').click(function(e) {
			e.preventDefault();
			slider.animate({'margin-left': '+=' + slider_item_width}, function() {
				slider.prepend($('#gslider li:last')).css('margin-left', '-' + slider_item_width + 'px');
			});
		});
	}
	
	if($('#howtoget').length) {
		$('#howtoget .tabs a').click(function(e) {
			e.preventDefault();
			$('#howtoget div.info').hide();
			$('#howtoget div.' + $(this).attr('class')).show();
			$('#howtoget .tabs li').removeClass('active');
			$(this).parent().addClass('active');
		});
		$('#howtoget a.car').click();
	}
	
	$('#menu ul.main > li:not(.active)').hover(function(e) {
		$(this).children('ul').stop().slideDown();
	}, function(e) {
		$(this).children('ul').slideUp(function() { $(this).attr('style', ''); });
	});
});
