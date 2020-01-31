(function ($, Drupal) {
  'use strict';

  //removeIf(patternLab)
  Drupal.behaviors.offCanvas = {
    attach: function (context, settings) {
  //endRemoveIf(patternLab)

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

  //removeIf(patternLab)
    }
  };
  //endRemoveIf(patternLab)
})(jQuery, Drupal);
