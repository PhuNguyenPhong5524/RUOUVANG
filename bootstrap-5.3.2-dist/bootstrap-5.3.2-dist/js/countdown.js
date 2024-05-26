


  var now = new Date();
  var fut = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59).getTime();
  setInterval(function() {
    var now = new Date().getTime();
    var D = fut - now;
    var hours = Math.floor((D % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((D % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((D % (1000 * 60)) / 1000);
    hours %= 24;
    minutes %= 60;
    seconds %= 60;
    document.getElementById("hours").innerText = hours;
    document.getElementById("minutes").innerText = minutes;
    document.getElementById("seconds").innerText = seconds;
  }, 1000);
