(function ($, Drupal) {
  'use strict';
  //removeIf(patternLab)
  Drupal.behaviors.socialShare = {
    attach: function (context, settings) {
  //endRemoveIf(patternLab)

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
  //removeIf(patternLab)
    }
  };
  //endRemoveIf(patternLab)
})(jQuery, Drupal);
