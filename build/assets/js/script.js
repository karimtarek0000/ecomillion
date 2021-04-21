$('.slider').owlCarousel({
	rtl:true,
    center: true,
    items:1,
    loop:true,
	dots: false,
    margin:16,
	navText: [
		'<i class="fas fa-chevron-right"></i>',
		'<i class="fas fa-chevron-left"></i>'
	],
    responsive:{
        576:{
            items:2
        },
        992:{
            items:3
        }
    }
});

$('.blog-slider').owlCarousel({
	rtl:true,
    center: true,
    items:1,
    loop:true,
	dots: false,
    margin:16,
	navText: [
		'<i class="fas fa-chevron-right"></i>',
		'<i class="fas fa-chevron-left"></i>'
	],
    responsive:{
        576:{
			center: false,
            items:2
        },
        768:{
			center: true,
            items:3
        },
        992:{
			center: false,
            items:4
        }
    }
});

// show toggle password
$(".toggle-password").click(function() {
	$(this).toggleClass("fa-eye fa-eye-slash");
	var input = $($(this).prev());
	if (input.attr("type") == "password") {
	  input.attr("type", "text");
	} else {
	  input.attr("type", "password");
	}
});

// Show file name
// Preview no# of files to upload
$('#file').change(function() {
    let file = $(this)[0].files[0];
    $(this).siblings('.overlay')
        .find('label').text(file.name);
});