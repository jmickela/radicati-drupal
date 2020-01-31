<?php
/**
 * @file
 * Add false "path" function for Pattern Lab which returns a fake path
 *
 * Use: {{ path(whatever) }}
 *
 */

$function = new Twig_SimpleFunction('path', function ($whatever) {
    return "https://replace.me";
});
