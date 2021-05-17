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

      //
      if (target.dataset.anim === "slideLeft")
        target.classList.add("anim__slideLeft");

      //
      if (target.dataset.anim === "slideRight")
        target.classList.add("anim__slideRight");

      //
      if (target.dataset.anim === "slideUp3D")
        target.classList.add("anim__slideUp3D");

      //
      if (target.dataset.anim === "slideDown")
        target.classList.add("anim__slideDown");

      // Not trigger action again
      animObServer.unobserve(target);
    }
  });
}, options);

// Run Intersectionobserver
allDataAnim.each((i, cur) => animObServer.observe(cur));

/////////////////////////////////
// 1) - Navbar Portfolio - Scroll
//
const navbarPortfolio = $("#navbar-portfolio");
//
let status = false;
let startDownX = null;
let scrollLeft = null;

////////////////////
// Computer
function mouseDown(e) {
  status = true;
  startDownX = e.pageX - navbarPortfolio.offset().left;
  scrollLeft = navbarPortfolio.scrollLeft();
}
//
function mouseUpAndLeave() {
  status = false;
}
//
function mouseMove(e) {
  if (!status) return; // false stop move action
  const startMoveX = e.pageX - navbarPortfolio.offset().left;
  const distance = startMoveX - startDownX;
  navbarPortfolio.scrollLeft(scrollLeft - distance);
}

// Other Devices
function touchStart(e) {
  status = true;
  startDownX = e.touches[0].pageX - navbarPortfolio.offset().left;
  scrollLeft = navbarPortfolio.scrollLeft();
}
//
function touchMove(e) {
  if (!status) return; // false stop move action
  const startMoveX = e.touches[0].pageX - navbarPortfolio.offset().left;
  const distance = startMoveX - startDownX;
  navbarPortfolio.scrollLeft(scrollLeft - distance);
}

// Run All Event with on map
// Computer
navbarPortfolio.on({
  mousedown: mouseDown,
  mouseup: mouseUpAndLeave,
  mouseleave: mouseUpAndLeave,
  mousemove: mouseMove,
  touchstart: touchStart,
  touchend: mouseUpAndLeave,
  touchmove: touchMove,
});

/////////////////////////////////
// 2) - Portfolio
$(".allBusiness__items .allBusiness__items__item").on("click", function () {
  // 1) Get id when click the button
  const classSelect = $(this).data("select");
  // 2) Add class active on select button then remove class active from all siblings
  $(this)
    .addClass("btn-outline-yellowish--active")
    .siblings()
    .removeClass("btn-outline-yellowish--active");
  // 3) Filter with all children
  $("#portfolio")
    .children()
    .filter((i, cur) => {
      if ($(cur).hasClass(classSelect)) {
        //
        if ($(cur).is(":hidden")) $(cur).removeClass("d-none");
        //
        if ($(window).innerWidth() > 768) $(cur).addClass("anim-scale1");
      } else {
        $(cur).addClass("d-none");
      }
    });
});
