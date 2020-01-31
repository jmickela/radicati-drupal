(function(window, document, $, Drupal) {
'use strict';
(function ($, Drupal) {
  'use strict';

  // $('#edit-issues').on('change', function() {
      //   $(".views-exposed-form").submit();
      // });

      $(".view-filters .views-exposed-form select").on("change", function() {
        $(".views-exposed-form").submit();
      });


      })(jQuery, Drupal);

(function ($, Drupal) {
  'use strict';
  $('.iconlink--social-popup').once().on('click', function() {
        var screenLeft = window.screenLeft;
        var screenTop = window.screenTop;

        var width = window.outerWidth;
        var height = window.outerHeight;

        var popupWidth = 626;
        var popupHeight = 436;

        var left = screenLeft + (width/2) - (popupWidth / 2);
        var top = screenTop + (height/2) - (popupHeight / 2);

        var url = $(this).attr('href');

        window.open(url, '', 'toolbar=0,status=0,width=626,height=436,left=' + left + ',top='+top);
        return false;
      });
  })(jQuery, Drupal);

(function ($, Drupal) {
  'use strict';

  var closeButton = $("#off-canvas .offcanvas__close");
    var ocOverlay = $(".oc-overlay");
    var hamburger = $(".hamburger");

    closeButton.once().on('click', function() {
      closeOffCanvas();
    });

    ocOverlay.once().on("click", function() {
      closeOffCanvas();
    });

  function closeOffCanvas() {
    $("body").removeClass("off-canvas-open");
    hamburger.removeClass("open");
    hamburger.attr("aria-expanded", "false");
    $("#off-canvas").removeClass("off-canvas--open");
    $("#off-canvas").attr("aria-expanded", "false");
    $("body .hamburger").focus();
  }

  })(jQuery, Drupal);

(function ($, Drupal) {
  'use strict';

  $('.slideshow .field__items').once().slick({
        autoplay: true,
        autoplaySpeed: 4000,
        prevArrow: $('.slick-prev'),
        nextArrow: $('.slick-next'),
      });
      })(jQuery, Drupal);

(function ($, Drupal) {
  'use strict';

  //var top = $('#main-nav').offset().top - parseFloat($('#main-nav').css('margin-top').replace(/auto/, 0));
      var top = $('#site-header').offset().top;

      if($('body.toolbar-tray-open').length !== 0)
        top -= 39;

      if($('body.toolbar-horizontal').length !== 0)
        top -= 39;

      $(window).once().scroll(function (event) {
        // what the y position of the scroll is
        var y = $(this).scrollTop();

        // whether that's below the form
        if (y > top) {
          // if so, ad the fixed class
          $('.site-header__inner').addClass('affixed');
        } else {
          // otherwise remove it
          $('.site-header__inner').removeClass('affixed');
        }
      });

  })(jQuery, Drupal);

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

(function ($, Drupal) {
  'use strict';

  $('.accordion__button').once().on('click', function() {
        var $parent = $(this).closest('.accordion');
        $(this).attr('aria-expanded', function(_, val) {
          if(val === 'true') return false; else return 'true';
        });
        $('.accordion__content', $parent).attr('aria-hidden', function(_, val) {
          if(val === 'true') return false; else return 'true';
        });

        $parent.toggleClass('accordion--open');
      });
  })(jQuery, Drupal);

(function ($, Drupal, window, document) {

  Drupal.behaviors.tabbedListing = {
    attach: function (context, settings) {
      $(window).on('load', function () {
        $( "#content-listing" ).once().tabs();
      });

      $(".tabbed-listing__tabselect").once().on('change', function(e) {

        $('#content-listing').tabs('option', 'active', $(this).val());
      });
      //
      // $(window).resize(function () {
      //   // Execute code when the window is resized.
      // });
      //
      // $(window).scroll(function () {
      //   // Execute code when the window scrolls.
      // });


    }
  };

} (jQuery, Drupal, window, document));

// this deploys the accordion functionality on the sub menu items in the offcanvas nav
jQuery(".menu--dropdown .sub-menu").hide();

jQuery(".menu--dropdown .dropdown-toggle").click(function() {
  jQuery(this).toggleClass("rotate-arrow");

  if (jQuery(this)
    .siblings(".sub-menu")
    .attr("aria-expanded") === "false" ) {
      jQuery(this)
        .siblings(".sub-menu")
        .attr("aria-expanded", "true");
    } else {
      jQuery(this)
        .siblings(".sub-menu")
        .attr("aria-expanded", "false");
    }

  jQuery(this)
    .siblings(".sub-menu")
    .toggle();

  if (jQuery(this).hasClass("rotate-arrow")) {
    jQuery(".toggle-text").text("Hide submenu");
  } else {
    jQuery(".toggle-text").text("Show submenu");
  }
});

/*
Ok. This script does a lot of stuff.

* It checks each input to see whether its label is before or after the input and attaches a class of "label-before" or "label-after" to the label so it can be appropriately styled. (Note: labels that wrap around an input are rendered as before, at least in Chrome...)

* It checks the width of all inputs and checks to see whether their width is 100% of the containing element. If so, it attaches a class of "full-width" to both the input and its label.

* It finds each input of type text, email, or password and each textarea and adds a "placeholder" class to input and the matching label. ("Matching" labels can either use the "for" attribute or can wrap around the input.)

* It finds each textarea and adds a "textarea-label" class to its matching label.

* Each time focus is on one of the placeholder inputs a "busy" class is added.

* Each time focus moves away from one of the placeholder inputs, the "busy" class is removed. Meanwhile, if there is text in the input, a "filled" class is added. If there is no content, the "filled" class is removed.
*/


jQuery(document).ready(function($) {
  // Find all the textareas
  var $textareas = $("form textarea");

  // Add a "textarea-label" class to each of those labels
  if (typeof $textareas == "object") {
    Object.keys($textareas).forEach( function(textarea) {
      if (textarea != "length" && textarea != "prevObject") {
        addTextarea($textareas[textarea]);
      }
    });
  } else if (typeof $textareas == "array") {
    $textareas.forEach(function(textarea) {
      addTextarea(textarea);
    });
  }

  // For each input...
  var $allInputs = $("form input, form textarea");

  // check if the label is before or after the input, and if it's full width. Add descriptive classes.
  if (typeof $allInputs == "object") {
    Object.keys($allInputs).forEach(function(input) {
      if (input != "length" && input != "prevObject") {
        checkIfLabelFirst($allInputs[input]);
        tagFullWidth($allInputs[input]);
      }
    });
  } else if (typeof $allInputs == "array") {
    $allInputs.forEach(function(input) {
      checkIfLabelFirst(input);
      tagFullWidth(input);
    });
  }

  // Find the inputs that need placeholder labels
  // We're having trouble with them in safari on an iphone 7, so I'm removing 'form textarea' from this variable...
  var $placeholderInputs = $(
    "form input[type='text'], form input[type='email'], form input[type='password'], form input[type='tel']"
  );

  // Add a "placeholder" class to each of those labels
  // Also assign height and top position
  if (typeof $placeholderInputs == "object") {
    Object.keys($placeholderInputs).forEach(function(input) {
      if (input != "length" && input != "prevObject") {
        addPlaceholder($placeholderInputs[input]);
        setLabelHeight($placeholderInputs[input]);
        setPlaceholderLabelPosition($placeholderInputs[input]);
      }
    });
  } else if (typeof $placeholderInputs == "array") {
    $placeholderInputs.forEach(function(input) {
      addPlaceholder(input);
      setLabelHeight(input);
      setPlaceholderLabelPosition(input);
    });
  }

  // These placeholders get cool effects on interaction
  $placeholderInputs
    .on("focus", addBusy)
    .on("blur", removeBusy)
    .on("blur change", toggleFilled);

  // Lastly, check each input one last time.
  // If an input is somehow prefilled, set its class
  // to filled
  // If an input has focus on pageload, set its class
  // to busy and its top to 0
  if (typeof $allInputs == "object") {
    Object.keys($allInputs).forEach(function(input) {
      if (input != "length" && input != "prevObject") {
        checkFilled($allInputs[input]);
        checkFocus($allInputs[input]);
      }
    });
  } else if (typeof $allInputs == "array") {
    $allInputs.forEach(function(input) {
      checkFilled(input);
      checkFocus(input);
    });
  }


  function checkFocus(target) {
    if (document.activeElement === target && document.hasFocus()) {
      var $label = getLabel(target);
      if ($label !== undefined) {
        if (typeof $label === "object" && $label.length > 0) {
          $label = $label[0];
        }
        $($label).addClass("busy");
        $label.style.top = 0 + 'px';
      }
    }
  }

  function addPlaceholder(input) {
    var $label = getLabel(input);
    if ($label !== undefined) {
      $(input).addClass("placeholder");
      $($label).addClass("placeholder");
    }
    var $parent = getParent(input);
    if ($parent !== undefined) {
      $($parent).addClass("placeholder");
    }
  }

  function setLabelHeight(input) {
    var $label = getLabel(input);
    if ($label !== undefined) {
      if (typeof $label === "object" && $label.length > 0) {
        $label = $label[0];
      }
      $label.style.height = $label.offsetHeight + 'px';
    }
  }

  function setPlaceholderLabelPosition(input) {
    // note that $inputBoxHeight should match the $textbox-height variable in _forms.scss
    var $inputBoxHeight = 53;
    // note that $lineHeight should match the $label-line-height variable in _forms.scss
    var $lineHeight = 1.5;
    // note that $fontSize should match the $lable-font-size variable in _forms.scss
    var $fontSize = 16;
    // note that $shrinkRatio should match the $label-shrink-ratio variable in _forms.scss
    var $shrinkRatio = 0.8;

    var $label = getLabel(input);
    if ($label !== undefined) {
      if (typeof $label === "object" && $label.length > 0) {
        $label = $label[0];
      }
      // This vertically centers all labels inside their inputs
      // if ($label.style !== undefined && $label.style.height !== undefined) {
      //   var $positionTop =
      //     (parseInt($label.style.height, 10) + input.offsetHeight) / 2;
      // } else {
      //   var $positionTop = ($label.offsetHeight + input.offsetHeight) / 2;
      // }
      // if ($label.classList.contains("label-before")) {
      //   $label.style.marginTop =
      //     -(1 - $shrinkRatio) * $label.offsetHeight + "px";
      // } else if ($label.classList.contains("label-after")) {
      //   $label.style.marginBottom =
      //     -(1 - $shrinkRatio) * $label.offsetHeight + "px";
      //   $positionTop *= -1;
      // } else {
      //   var $positionTop = 0;
      // }

      // This centers a single line label in a text input and puts it an equal amount down in a textarea
      if ($label.classList.contains("label-before")) {
        if ($label.style !== undefined && $label.style.height !== undefined) {
          var $positionTop =
            parseInt($label.style.height, 10) +
            ($inputBoxHeight - $lineHeight * $fontSize) / 2;
        } else {
          var $positionTop =
            $label.offsetHeight +
            ($inputBoxHeight - $lineHeight * $fontSize) / 2;
        }
        // $label.style.marginTop =
        //   -(1 - $shrinkRatio) * $label.offsetHeight + "px";
      } else if ($label.classList.contains("label-after")) {
        var $positionTop = -1 * input.offsetHeight + ($inputBoxHeight - $lineHeight * $fontSize) / 2;
        // $label.style.marginBottom =
        //   -(1 - $shrinkRatio) * $label.offsetHeight + "px";
      } else {
        var $positionTop = 0;
      }
      setLabelPosition($label, $positionTop);
    }
  }

  function setLabelPosition($label, $positionTop) {
    if ($label !== undefined) {
      if (typeof $label === "object" && $label.length > 0) {
        $label = $label[0];
      }
      $label.style.top = String($positionTop) + "px";
    }
  }

  function addTextarea(target) {
    var $label = getLabel(target);
    if ($label !== undefined) {
      $($label).addClass("textarea-label");
    }
  }

  function toggleFilled(event) {
    var $label = getLabel(event.target);
    if ($label !== undefined) {
      if (event.target.value) {
        $($label).addClass("filled");
        setLabelPosition($label, 0);
      } else {
        $($label).removeClass("filled");
        setPlaceholderLabelPosition(event.target);
      }
    }
  }

  function checkFilled(element) {
    var $label = getLabel(element);
    if ($label !== undefined) {
      if (element.value) {
        $($label).addClass("filled");
        setLabelPosition($label, 0);
      } else {
        $($label).removeClass("filled");
        setPlaceholderLabelPosition(element);
      }
    }
  }

  function addBusy(event) {
    var $label = getLabel(event.target);
    if ($label !== undefined) {
      $($label).addClass("busy");
      setLabelPosition($label, 0);
    }
  }

  function removeBusy(event) {
    var $label = getLabel(event.target);
    if ($label !== undefined) {
      $($label).removeClass("busy");
    }
  }

  function getLabel(target) {
    var $form = $(target).closest('form');
    var $id = target.id;
    if ($id !== undefined && $id !== "") {
      var $label = $form.find("label[for=" + $id + "]");
    }
    if ($label == undefined || $label.length <= 0) {
      var parentElem = $(target).parent();
      var parentTagName = parentElem.get(0).tagName.toLowerCase();

      if (parentTagName == "label") {
        $label = parentElem;
      }
    }

    if ($label == undefined || $label.length <= 0) {
      return undefined;
    } else {
      return $label;
    }
  }

  function getParent(target) {
    // we're looking for drupal webform parent divs
    return $(target).parent('.form-item');
  }

  function checkIfLabelFirst(target) {
    var $label = getLabel(target);

    var $parent = getParent(target);

    if ($label !== undefined) {
      if (typeof $label === "object" && $label.length > 0) {
        $label = $label[0];
      }
      if ($label !== undefined) {
        // remember that compareDocumentPosition is a bitwise operator that adds up the various possibilities (like file permissions). So you get 10 when it spits out both 8 and 2
        switch ($label.compareDocumentPosition(target)) {
          case 2: // input comes first
          case 8: // input contains label (???)
          case 10: // input contains label (yeah right!) & thus input comes first
            $(target).addClass("label-after");
            $($label).addClass("label-after");
            if ($parent !== undefined) {
              $($parent).addClass("label-after");
            }
            break;
          case 4: // label comes first
          case 16: // label contains input
          case 20: // label contains input & thus label is first
            $(target).addClass("label-before");
            $($label).addClass("label-before");
            if ($parent !== undefined) {
              $($parent).addClass("label-before");
            }
            break;
          default:
            console.log("I'm having trouble comparing the position of this input and its label:");
            console.log(target);
            console.log($label);
        }
      }
    }
  }

  function checkIfWidth100(target) {
    var parent = $(target).parent()[0];
    var padding =
      parseInt($(parent).css("padding-left")) +
      parseInt($(parent).css("padding-right"));
    var percent = (
      (target.offsetWidth / (parent.offsetWidth - padding)) *
      100
    ).toFixed(0);

    if (percent == 100) {
      return true;
    } else {
      return false;
    }
  }

  function tagFullWidth(target) {
    if (checkIfWidth100(target)) {
      $(target).addClass("full-width");
      var $label = getLabel(target);
      if ($label !== undefined) {
        $($label).addClass("full-width");
      }
    }
  }
});


// Normally the hamburgers style themselves to match the state of the offcanvas. This script is only so that the hamburger styling can be toggled on the PatternLab demo pages. It shouldn't work when the hamburger is actually being used on a page.

// (function() {
//   var hamburgerToggles = document.querySelectorAll('.hamburger');
//
//   for(var i = 0; i < hamburgerToggles.length; i++) {
//     hamburgerToggles[i].addEventListener('click', handleHamburgerClicked);
//   }
//
//   function getCorrectTarget(e) {
//     var targetElement = e.target;
//
//     if(!targetElement.classList.contains('hamburger')) {
//       targetElement = targetElement.parentNode;
//     }
//
//     return targetElement;
//   }
//
//   function handleHamburgerClicked(e) {
//     var hamburgerElement = getCorrectTarget(e);
//
//     if(hamburgerElement.parentNode.classList.contains('sg-pattern-example')) {
//       hamburgerElement.classList.toggle('open');
//     }
//   }
//
// })();

(function ($, Drupal) {
  'use strict';

  // this is set to match the hamburger visibility breakpoint in _hamburger.scss
      var breakpointInPx = 992;
      var breakpointInEms = breakpointInPx / 16;

      $(document).ready(hamburgerTabindex(breakpointInEms));

      $(window).resize(function() {
        hamburgerTabindex(breakpointInEms);
      });

      $('.hamburger').once().on('click', function() {
        $(this).toggleClass('open');
        slideInOCanvas('#off-canvas');

        if($(this).attr('aria-expanded') === "true") {
          $(this).attr("aria-expanded", "false");
        } else {
          $(this).attr('aria-expanded', "true");
        }
      });


  function slideInOCanvas(id) {
    $("body").toggleClass("off-canvas-open");
    $(id).toggleClass("off-canvas--open");
    if ($("#off-canvas").attr("aria-expanded") === "true") {
      $("#off-canvas").attr("aria-expanded", "false");
      $("body .focusable.skip-link").focus();
    } else {
      $("#off-canvas").attr("aria-expanded", "true");
      $("#off-canvas").focus();
    }
  }

  function windowWidthInEms() {
    var width =
      window.innerWidth ||
      document.documentElement.clientWidth ||
      document.body.clientWidth;

    // Because we're setting our base font size on the body element, we use body here.
    var emWidth = width / parseFloat(getComputedStyle(document.querySelector("body"))["font-size"]);

    return emWidth;
  }

  function hamburgerTabindex(breakpoint) {
    if (windowWidthInEms() < breakpoint) {
      $(".hamburger").attr("tabindex", "0");
    } else {
      $(".hamburger").attr("tabindex", "-1");
    }
  }


})(jQuery, Drupal);

function initializeVideos() {
  let allVideos = $("iframe[src*='//player.vimeo.com'], iframe[src*='youtube.com'], iframe[src*='youtu.be'], iframe[src*='youtube-nocookie.com'], object, embed");

  allVideos.each(function() {

    $(this)
      .attr('data-aspectRatio', this.height / this.width)
      .removeAttr('height')
      .removeAttr('width');
  });
} 

function resizeVideos() {
  let allVideos = $("iframe[src*='//player.vimeo.com'], iframe[src*='youtube.com'], iframe[src*='youtu.be'], iframe[src*='youtube-nocookie.com'], object, embed");
  
  allVideos.each(function() {

    $(this)
      .attr('parentWidth', $(this).parent().width())
      .width($(this).attr('parentWidth'))
      .height($(this).attr('parentWidth') * $(this).attr('data-aspectRatio'));

  });
}

$(document).ready(function () {
  initializeVideos();
  resizeVideos();
  $(window).resize(function() {
    resizeVideos();
  });
});

$('.wp-block-gallery.slider').slick({
  infinite: true,
  slidesToShow: 1,
  slidesToScroll: 1,
  nextArrow: "<a class='slick-next slick-arrow' href='#'><i class='icon icon-right-open' title='Next'></i></a>",
  prevArrow: "<a class='slick-prev slick-arrow' href='#'><i class='icon icon-left-open' title='Previous'></i></a>",
});
// $(document).ready(function() {
//   var slider = tns({
//     container: '.cardslider__cards',
//     items: 4,
//     slideBy: 1,
//     autoplay: false,
//     nav: false,
//   });
// });

// $('.cardslider__cards').slick({
//   infinite: true,
//   slidesToShow: 4,
//   slidesToScroll: 1,
//   nextArrow: "<a class='slick-next slick-arrow' href='#'><i class='far fa-chevron-right' title='Next'></i></a>",
//   prevArrow: "<a class='slick-prev slick-arrow' href='#'><i class='far fa-chevron-left' title='Previous'></i></a>",
//   responsive: [
//     {
//       breakpoint: 982,
//       settings: {
//         slidesToShow: 2
//       }
//     },
//     {
//       breakpoint: 768,
//       settings: {
//         slidesToShow: 1
//       }
//     }
//   ]
// });
$(".fliphovercard").hover(function() {
  $(this).addClass('fliphovercard--hover');
},
function() {
  $(this).removeClass('fliphovercard--hover');
});

$('.expandingsearch__button').on('click', function () {
  var $parent = $(this).parent();

  if ($parent.hasClass('expandingsearch--open') && $('.expandingsearch__input', $parent).val() == '') {
    $parent.removeClass('expandingsearch--open');
    $('.expandingsearch__input', $parent).off( "focus" );
    return false;
  } else if($parent.hasClass('expandingsearch--open')) {
    return true;
  }

  $(this).parent().toggleClass('expandingsearch--open');
  $('.expandingsearch__input', $parent).focus();

  return false;
});
$('.dropdownsearch__toggle').on('click', function () {
  var $parent = $(this).parent();

  if(!$parent.hasClass('dropdownsearch--open')) {
    $parent.addClass('dropdownsearch--open');
  } else {
    $parent.removeClass('dropdownsearch--open');
  }

  return false;
});

// $('.hoverexpandingsearch__button').on('click', function () {
//   var $parent = $(this).parent();
//
//   if ($parent.hasClass('hoverexpandingsearch--open') && $('.hoverexpandingsearch__input', $parent).val() === '') {
//     $parent.removeClass('hoverexpandingsearch--open');
//     $('.hoverexpandingsearch__input', $parent).off( "focus" );
//     return false;
//   } else if($parent.hasClass('hoverexpandingsearch--open')) {
//     return true;
//   }
//
//   $(this).parent().toggleClass('hoverexpandingsearch--open');
//   $('.expandingsearch__input', $parent).focus();
//
//   return false;
// });
})(window, document, window.jQuery, window.Drupal);
