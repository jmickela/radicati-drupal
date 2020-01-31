(function ($, Drupal) {
  'use strict';

  //removeIf(patternLab)
  Drupal.behaviors.slideshow = {
    attach: function (context, settings) {
      //endRemoveIf(patternLab)
      $('.slideshow .field__items').once().slick({
        autoplay: true,
        autoplaySpeed: 4000,
        prevArrow: $('.slick-prev'),
        nextArrow: $('.slick-next'),
      });
      //removeIf(patternLab)
    }
  };
  //endRemoveIf(patternLab)
})(jQuery, Drupal);
