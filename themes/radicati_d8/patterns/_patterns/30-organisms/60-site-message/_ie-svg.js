(function($, Drupal) {
  "use strict";

    // find all the original images
    var originalImageWrapper = document.querySelectorAll(".image--original");

    // find all the svg replacement images
    var ieSvgImageWrapper = document.querySelectorAll(".image--ie-replacement-svg");

  // Detect Internet Explorer with Ducktyping
  // https://stackoverflow.com/a/31479176/6412747
  var isIE = /*@cc_on!@*/false || !!document.documentMode;

  // only run this if the browser is ie, and thus unable to display the original images properly
  if (isIE) {

    // go through all the images tagged to replace
    // set the original image to display none
    // also remove its source and sourceset so it stops downloading and wasting bandwidth
    for (var i = 0; i < originalImageWrapper.length; i++) {
      originalImageWrapper[i].style.display = "none";
      var originalImage = originalImageWrapper[i].querySelector('img');
      originalImage.src = '';
      originalImage.srcset = '';
    }

    // go through all the images tagged as replacements
    // set the replacement images (which default to display: none) to display: block
    // grab the url from the data-uri attribute and copy it to href so the image loads
    for (var i = 0; i < ieSvgImageWrapper.length; i++) {
      ieSvgImageWrapper[i].style.display = "block";
      var ieSvgImage = ieSvgImageWrapper[i].querySelector("image");
      var ieSvgImageUri = ieSvgImage.getAttribute('data-uri');
      ieSvgImage.setAttribute("href", ieSvgImageUri);
    }
  }
})(jQuery, Drupal);
