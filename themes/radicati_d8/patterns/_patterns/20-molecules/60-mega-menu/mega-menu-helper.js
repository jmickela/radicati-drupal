//removeIf(patternLab)

(function ($, Drupal) {
  'use strict';

  Drupal.behaviors.megaMenu = {
    attach: function (context, settings) {

      $("nav.menu--mega-menu").accessibleMegaMenu({
        /* prefix for generated unique id attributes, which are required
           to indicate aria-owns, aria-controls and aria-labelledby */
        uuidPrefix: "accessible-megamenu",

        /* css class used to define the megamenu styling */
        menuClass: "menu--mega-menu",

        /* css class for a top-level navigation item in the megamenu */
        topNavItemClass: "menu__menu-item",

        /* css class for a megamenu panel */
        panelClass: "dropdown-content",

        /* css class for a group of items within a megamenu panel */
        panelGroupClass: "layout__region",

        /* css class for the hover state */
        hoverClass: "hover",
        openOnMouseover: true,

        /* css class for the focus state */
        focusClass: "focus",

        /* css class for the open state */
        openClass: "open"
      });

    }
  };
})(jQuery, Drupal);

//endRemoveIf(patternLab)
