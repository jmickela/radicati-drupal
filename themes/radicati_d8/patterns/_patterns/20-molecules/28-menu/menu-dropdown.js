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
