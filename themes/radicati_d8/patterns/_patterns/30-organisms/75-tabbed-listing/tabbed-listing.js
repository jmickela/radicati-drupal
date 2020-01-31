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
