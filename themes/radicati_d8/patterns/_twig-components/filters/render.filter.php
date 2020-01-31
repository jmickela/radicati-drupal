<?php

$filter = new Twig_SimpleFilter('render', function ($string, $options="") {
  return $string;
});
