$(".slider").owlCarousel({
  rtl: true,
  center: true,
  items: 1,
  loop: true,
  dots: false,
  margin: 16,
  navText: [
    '<i class="fas fa-chevron-right"></i>',
    '<i class="fas fa-chevron-left"></i>',
  ],
  responsive: {
    576: {
      items: 2,
    },
    992: {
      items: 3,
    },
  },
});

$(".blog-slider").owlCarousel({
  rtl: true,
  center: true,
  items: 1,
  loop: true,
  dots: false,
  margin: 16,
  navText: [
    '<i class="fas fa-chevron-right"></i>',
    '<i class="fas fa-chevron-left"></i>',
  ],
  responsive: {
    576: {
      center: false,
      items: 2,
    },
    768: {
      center: true,
      items: 3,
    },
    992: {
      center: false,
      items: 4,
    },
  },
});

// show toggle password
$(".toggle-password").click(function () {
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
$("#file").change(function () {
  let file = $(this)[0].files[0];
  $(this).siblings(".overlay").find("label").text(file.name);
});

/////////////////////////////////
// Animation

//
const allDataAnim = $("[data-anim]");

//
const options = {
  root: null,
  rootMargin: "0px 0px -50% 0px",
};

//
const animObServer = new IntersectionObserver((entries, animObServer) => {
  $(entries).each((i, cur) => {
    //
    const target = cur.target;

    // If element inter view port will run all actions
    if (cur.isIntersecting) {
      //
      if (target.dataset.anim === "slideUp")
        target.classList.add("anim__slideUp");
      // console.log("testing");

      // Not trigger action again
      animObServer.unobserve(target);
    }
  });
}, options);

// Run Intersectionobserver
allDataAnim.each((i, cur) => animObServer.observe(cur));
