(function ($, Drupal) {
  'use strict';

  //removeIf(patternLab)
  Drupal.behaviors.stickyHeader = {
    attach: function (context, settings) {
  //endRemoveIf(patternLab)

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

  //removeIf(patternLab)
    }
  };
  //endRemoveIf(patternLab)
})(jQuery, Drupal);
