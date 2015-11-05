$(document).on('click', '.map span', function(){
	var $this = $(this);
	$this.parent().siblings('.location').toggleClass('show');
});