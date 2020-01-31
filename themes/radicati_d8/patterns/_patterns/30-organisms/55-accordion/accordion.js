(function ($, Drupal) {
  'use strict';

  //removeIf(patternLab)
  Drupal.behaviors.accordion = {
    attach: function (context, settings) {
  //endRemoveIf(patternLab)
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
  //removeIf(patternLab)
    }
  };
  //endRemoveIf(patternLab)
})(jQuery, Drupal);
