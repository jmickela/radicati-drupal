<?php
/**
 * @file
 * Add false "path" function for Pattern Lab which returns a fake path
 *
 * Use: {{ path(whatever) }}
 *
 */

$function = new Twig_SimpleFunction('link', function ($text, $path, $options = array()) {
    return '<a href="' . $path . '">' . $text . '</a>';
});
