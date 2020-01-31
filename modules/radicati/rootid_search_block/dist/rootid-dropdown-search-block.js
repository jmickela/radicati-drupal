(function ($, Drupal) {
  Drupal.behaviors.searchToggle = {
    attach: function(context, settings) {
      $('.dropdownsearch__toggle').once().on('click', function () {
        var $parent = $(this).parent();

        if(!$parent.hasClass('dropdownsearch--open')) {
          $parent.addClass('dropdownsearch--open');
          $(".dropdownsearch__dropdown input#edit-terms").focus();
        } else {
          $parent.removeClass('dropdownsearch--open');
        }

        return false;
      });
    }
  };
})(jQuery, Drupal);
