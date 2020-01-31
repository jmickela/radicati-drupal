jQuery('a[target^="_new"]').click(function() {
    return openWindow(this.href);
});


//https://stackoverflow.com/questions/4068373/center-a-popup-window-on-screen
function PopupCenter(url, title, w, h) {
  // Fixes dual-screen position                         Most browsers      Firefox
  var dualScreenLeft =
    window.screenLeft != undefined ? window.screenLeft : window.screenX;
  var dualScreenTop =
    window.screenTop != undefined ? window.screenTop : window.screenY;

  var width = window.innerWidth
    ? window.innerWidth
    : document.documentElement.clientWidth
    ? document.documentElement.clientWidth
    : screen.width;
  var height = window.innerHeight
    ? window.innerHeight
    : document.documentElement.clientHeight
    ? document.documentElement.clientHeight
    : screen.height;

  var systemZoom = width / window.screen.availWidth;
  var left = (width - w) / 2 / systemZoom + dualScreenLeft;
  var top = (height - h) / 2 / systemZoom + dualScreenTop;
  var newWindow = window.open(
    url,
    title,
    "scrollbars=yes, width=" +
      w / systemZoom +
      ", height=" +
      h / systemZoom +
      ", top=" +
      top +
      ", left=" +
      left
  );

  // Puts focus on the newWindow
  if (window.focus) newWindow.focus();
}

// Open in a new tab on mobile devices and in a new window on desktop devices, as defined by a screenwidth > 640 :shrug:
//https://stackoverflow.com/a/22962821/6412747
function openWindow(url) {

    console.log("running the openWindow function");

    if (window.innerWidth <= 640) {
        // if width is smaller then 640px, create a temporary a elm that will open the link in new tab
        console.log("opening a new tab");
        var a = document.createElement('a');
        a.setAttribute("href", url);
        a.setAttribute("target", "_blank");

        // //This dispatch stuff wasn't working, but a.click() *is* (at least on my local!), so I'm going to test it in a few browsers before I call it good...
        // var dispatch = document.createEvent("HTMLEvents");
        // dispatch.initEvent("click", true, true);
        // a.dispatchEvent(dispatch);

        a.click();

    }
    else {
        console.log("opening in a new window");
        var width = window.innerWidth * 0.66 ;
        // define the height in
        var height = width * window.innerHeight / window.innerWidth ;
        // Ratio the hight to the width as the user screen ratio
        // window.open(url , 'newwindow', 'width=' + width + ', height=' + height + ', top=' + ((window.innerHeight - height) / 2) + ', left=' + ((window.innerWidth - width) / 2));
        PopupCenter(url, 'Follow on Twitter', width, height);
    }
    return false;
}
