<?php

namespace Drupal\radicati_component_helper\TwigExtension;

use Drupal\Core\Template\Attribute;

/**
* A test Twig extension that adds a custom function and a custom filter.
*/
class TwigExtensions extends \Twig_Extension {

  /**
  * Generates a list of all Twig functions that this extension defines.
  *
  * @return array
  *   A key/value array that defines custom Twig functions. The key denotes the
  *   function name used in the tag, e.g.:
  *   @code
  *   {{ testfunc() }}
  *   @endcode
  *
  *   The value is a standard PHP callback that defines what the function does.
  */
  public function getFunctions() {
    return array(
      new \Twig_SimpleFunction('bem', [$this, 'bem'], ['needs_context'=>true, 'is_safe' => ['html']]),
      new \Twig_SimpleFunction('expand', [$this, 'expand'], ['is_safe' => ['html']])
    );
  }

  /**
  * Generates a list of all Twig filters that this extension defines.
  *
  * @return array
  *   A key/value array that defines custom Twig filters. The key denotes the
  *   filter name used in the tag, e.g.:
  *   @code
  *   {{ foo|testfilter }}
  *   @endcode
  *
  *   The value is a standard PHP callback that defines what the filter does.
  */
  public function getFilters() {
    return [
      'upsert' => new \Twig_Filter_Function([
        'Drupal\\radicati_component_helper\\TwigExtension\\TwigExtensions',
        'upsertFilter'
      ]),
    ];
  }

  /**
  * Gets a unique identifier for this Twig extension.
  *
  * @return string
  *   A unique identifier for this Twig extension.
  */
  public function getName() {
    return 'radicati_component_helper.twigextensions';
  }

  /**
  * Outputs either an uppercase or lowercase test phrase.
  *
  * The function generates either an uppercase or lowercase version of the
  * phrase "The quick brown fox jumps over the lazy dog 123.", depending on
  * whether or not the $upperCase parameter evaluates to TRUE. If $upperCase
  * evaluates to TRUE, the result will be uppercase, and if it evaluates to
  * FALSE, the result will be lowercase.
  *
  * @param bool $upperCase
  *   (optional) Whether the result is uppercase (true) or lowercase (false).
  *
  * @return string
  *   The generated string.
  *
  * @see \Drupal\system\Tests\Theme\TwigExtensionTest::testTwigExtensionFunction()
  */
  public static function bem($context, $base_class, $modifiers = array(), $blockname = '', $extra = array()) {
    $classes = [];
    // If using a blockname to override default class.
    if ($blockname) {
      // Set blockname class.
      $classes[] = $blockname . '__' . $base_class;
      // Set blockname--modifier classes for each modifier.
      if (isset($modifiers) && is_array($modifiers)) {
        foreach ($modifiers as $modifier) {
          $classes[] = $blockname . '__' . $base_class . '--' . $modifier;
        };
      }
    }
    // If not overriding base class.
    else {
      // Set base class.
      $classes[] = $base_class;
      // Set base--modifier class for each modifier.
      if (isset($modifiers) && is_array($modifiers)) {
        foreach ($modifiers as $modifier) {
          $classes[] = $base_class . '--' . $modifier;
        };
      }
    }
    // If extra non-BEM classes are added.
    if (isset($extra) && is_array($extra)) {
      foreach ($extra as $extra_class) {
        $classes[] = $extra_class;
      };
    }
    if (class_exists('Drupal')) {
      $attributes = new Attribute();
      // Iterate the attributes available in context.
      if(!empty($context['attributes'])) {
        foreach ($context['attributes'] as $key => $value) {
          // If there are classes, add them to the classes array.
          if ($key === 'class') {
            foreach ($value as $class) {
              $classes[] = $class;
            }
          } // Otherwise add the attribute straightaway.
          else {
            $attributes->setAttribute($key, $value);
          }
          // Remove the attribute from context so it doesn't trickle down to
          // includes.
          $context['attributes']->removeAttribute($key);
        }
      }
      // Add class attribute.
      if (!empty($classes)) {
        $attributes->setAttribute('class', $classes);
      }
      return $attributes;
    }
    else {
      $attributes = 'class="' . implode(' ', $classes) . '"';
      return $attributes;
    }
  }

  public static function expand($attributes) {
      $output = "";

      if(empty($attributes))
        return null;

      foreach($attributes as $key => $value) {
        $output .= " {$key}='{$value}'";
      }

      return $output;
  }

  public static function upsertFilter($arr1, $arr2) {
    if ($arr1 instanceof \Traversable) {
      $arr1 = iterator_to_array($arr1);
    } elseif (!is_array($arr1)) {
      $arr1 = [];
    }
    if ($arr2 instanceof \Traversable) {
      $arr2 = iterator_to_array($arr2);
    } elseif(!is_array($arr2)) {
      $arr2 = [];
    }
    return array_merge($arr1, $arr2);
  }
}
