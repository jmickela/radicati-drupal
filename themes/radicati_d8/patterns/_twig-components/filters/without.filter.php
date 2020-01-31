<?php

$filter = new Twig_SimpleFilter('without', function ($string, $options="") {
  return $string;
});
