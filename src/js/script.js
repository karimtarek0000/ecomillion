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

/////////////////////////////////
// Validation Form
function validationForm() {
  // Forms
  const form1 = $('form[name="form1"]');
  const form2 = $('form[name="form2"]');

  // All input
  const allInput = {
    phone: "#phone",
    name: "#name",
    name2: "#name2",
    email: "#email",
    textArea: "#textArea",
  };

  // All fileds message
  const filedsMessage = {
    messageName1: $("#messageName1"),
    messageName2: $("#messageName2"),
    messagePhone: $("#messagePhone"),
    messageEmail: $("#messageEmail"),
    messageTextArea: $("#messageTextArea"),
  };

  // Data center form
  const dataForm = {
    name: null,
    phone: null,
    email: null,
    message: null
  };

  // Regexp
  const regExp = {
    name: /^[\D]{4,}$/g,
    email: /^([A-z]|[0-9]){3,}@[A-z]{3,7}[.]{1}[A-z]{2,4}$/g,
    phone: /^[\d]{7,11}$/,
    textArea: /^[\D]{15,}$/g,
  };

  // All messages errors
  const messageErrors = {
      name: {
      en: "must write name",
      ar: "يجب ادخال الاسم",
    },
      email: {
      en: "write correct email",
      ar: "يجب ادخال الايميل بشكل صحيح",
    },
    phone: {
      en: "write between 7 and 11 numbers",
      ar: "يجب ادخال من ٧ الي ١١ رقم",
    },
    text: {
      en: "You must write message",
      ar: "يجب ادخال رسالة",
    },
  };

  // 1) - Get value from input phone and name
  $(allInput.email)
    .add(allInput.phone)
    .add(allInput.name)
    .add(allInput.name2)
    .add(allInput.textArea)
    .on("input", function () {
      //
      const getId = $(this).attr("id");

      // 1) Check if get id equal => PHONE
      if (getId === allInput.phone.replace("#", "")) {
        // Check if value input equal regular expersion
        if ($(this).val().match(regExp.phone)) {
          dataForm.phone = $(this).val();
          renderMessageErrorUI("messagePhone");
        } else {
          renderMessageErrorUI("messagePhone", "phone");
        }
      }

      // 2) Check if get id equal => NAME
      if (getId === allInput.name.replace("#", "") || getId === allInput.name2.replace("#", "")) {
        // 
        const getIdMessageName = $(this).next().attr('id')
        // Check if value input equal regular expersion
        if ($(this).val().match(regExp.name)) {
          dataForm[getId] = $(this).val();
          renderMessageErrorUI(getIdMessageName);
        } else {
          renderMessageErrorUI(getIdMessageName, "name");
        }
      }
    
      // 3) Check if get id equal => EMAIL
      if (getId === allInput.email.replace("#", "")) {
        if ($(this).val().match(regExp.email)) {
          dataForm.email = $(this).val().toLowerCase();
          renderMessageErrorUI("messageEmail");
        } else {
          renderMessageErrorUI("messageEmail", "email");
        }
      }

      // 4) Check if get id equal => TEXTAREA
      if (getId === allInput.textArea.replace("#", "")) {
        if ($(this).val()) {
          dataForm.message = $(this).val();
          renderMessageErrorUI("messageTextArea");
        } else {
          renderMessageErrorUI("messageTextArea", "text");
        }
      }
    });

  // 3) - Render message error ui
  function renderMessageErrorUI(type, nameKey = "") {
    // const lang = $("html").attr("lang");
    //
    nameKey == ""
      ? filedsMessage[type].text("")
      : filedsMessage[type].text(messageErrors[nameKey]['ar']);
  }

  // 4) - Remove all data after send data to API
  $(allInput.email).add(allInput.name).add(allInput.name2).add(allInput.phone).add(allInput.name).add(allInput.textArea).on('removeValue', function() {
    $(this).val('');
  });

  // 5) - Event submit on form
  form1.add(form2).on("submit", function(e) {
    // 1) Disable behover submit
    e.preventDefault();

    // 2) Get attr name from form
    const selectForm = $(this).attr('name');

    // Form 1
    if(selectForm === 'form1') {
      // 2) If all data required exsist will be send data to api
      if (dataForm.phone && dataForm.name) {
        // 1) - Send all data to API
        const data = Object.assign({}, { name: dataForm.name, phone: dataForm.phone});
        // 2) - Remove all data from input
        $(allInput.name).add(allInput.phone).trigger('removeValue');
      } else {
        // Trigger input validation
        $(allInput.phone).add(allInput.name).trigger("input");
      }
    }

    // Form 2
    if(selectForm === 'form2') {
      if(dataForm.name2 && dataForm.email && dataForm.message) {
        // 1) - Send all data to API
        const data = Object.assign({}, { name: dataForm.name2, email: dataForm.email, message: dataForm.message});
        // 2) - Remove all data from input
        $(allInput.name2).add(allInput.email).add(allInput.textArea).trigger('removeValue');
        
      } else {
        // Trigger input validation
        $(allInput.name2).add(allInput.email).add(allInput.textArea).trigger("input");
      }
    }

    
  });

}

// Call fn validationForm
validationForm();
