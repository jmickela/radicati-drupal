(function ($, Drupal) {
  'use strict';

  //removeIf(patternLab)
  Drupal.behaviors.listingPage = {
    attach: function (context, settings) {
      //endRemoveIf(patternLab)

      // $('#edit-issues').on('change', function() {
      //   $(".views-exposed-form").submit();
      // });

      $(".view-filters .views-exposed-form select").on("change", function() {
        $(".views-exposed-form").submit();
      });


      //removeIf(patternLab)
    }
  };
  //endRemoveIf(patternLab)
})(jQuery, Drupal);
