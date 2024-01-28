function calculateHeightAndSet() {
  const div1 = document.getElementById("profile");
  const div2 = document.getElementById("nav-footer");
  const body = window.innerHeight;
  const details = document.getElementById("details");
  const targetElement = document.getElementById("scrollable");

  const heightTotal = div1.offsetHeight + div2.offsetHeight + details.offsetHeight + 50;
  const heightDifference = body - heightTotal;

  targetElement.style.height = heightDifference + "px ";

}

calculateHeightAndSet(); // Call the function to perform the calculation and setting


function calculateHeightSet() {
  const div1 = document.getElementById("profile-sm");
  const div2 = document.getElementById("nav-footer-sm");
  const body = window.innerHeight;
  const bodyWidth = window.innerWidth;
  const details = document.getElementById("details-sm");
  const targetElement = document.getElementById("scrollable-sm");

  const heightTotal = div1.offsetHeight + div2.offsetHeight + details.offsetHeight + 274;
  const heightDifference = body - heightTotal;

  targetElement.style.height = heightDifference + "px ";


  if (bodyWidth <= 992) {
    $('.screen').addClass('s-padding-50').show();
  }

  const bodyHeight = body - 15;

  const banner = document.getElementById("banner");
  const page = document.getElementById('screen');
  page.style.height = bodyHeight + "px";
  banner.style.height = bodyHeight + "px";

}

calculateHeightSet(); // Call the function to perform the calculation and setting

window.onresize = function () { location.reload(); }


const toggler = document.querySelector(".btn");
toggler?.addEventListener("click", function () {
  document.querySelector("#nav-list-sm").classList.toggle("collapsed");
});

$('#shownav').click(function (event) {
  if ($('.nav-list-sm').hasClass('dismiss') || $('.nav-list-sm').hasClass('d-none')) {
    $('.nav-list-sm').removeClass('dismiss').removeClass('d-none').addClass('selected').show();
  }
  event.preventDefault();
});

$('#closenav').click(function (event) {
  if ($('.nav-list-sm').hasClass('selected')) {
    $('.nav-list-sm').removeClass('selected').addClass('dismiss');
  }
  event.preventDefault();
});





$('#live').click(function () {
  if ($('.live').hasClass('show')) {
    $('.live').removeClass('show');
  }else{
    $('.live').removeClass('show');
  }
})