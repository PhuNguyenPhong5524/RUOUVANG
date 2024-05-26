
window.onscroll = function() {myFunction()};

var backtop = document.getElementById("backtop");
var sticky = backtop.offsetTop;

function myFunction() {
  if (window.pageYOffset >= sticky) {
    backtop.classList.add("sticky")
  } else {
    backtop.classList.remove("sticky");
  }
}





