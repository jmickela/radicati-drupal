<?php

namespace Drupal\radicati_social\Plugin\Block;

use Drupal\Core\Block\BlockBase;

/**
 * Class RadicatiSocial
 *
 * Creates a simple social sharing block. Most of the business logic is in the
 * Radicati theme and javascript files.
 *
 * @Block(
 *   id = "radicati_social",
 *   admin_label = @Translation("Social Sharing"),
 *   category = @Translation("radicati")
 * )
 *
 * @package Drupal\radicati_social\Plugin\Block
 */
class RadicatiSocial extends BlockBase {

  public function build() {
    return [
      '#theme' => 'radicati_social'
    ];
  }

}

/**
 * <?php
function simpleshare_block_info()
{
$blocks['simpleshare'] = array(
'info' => t('Simple Share'),
'cache' => DRUPAL_CACHE_PER_PAGE,
);

return $blocks;
}

function simpleshare_block_view($delta)
{
global $base_url;
$path = current_path();

$path = drupal_get_normal_path($path);
$node = menu_get_object('node', 1, $path);

$path_alias = drupal_lookup_path('alias',$path);

if(!isset($path_alias) or $path_alias == "")
$path_alias = $path;
$path_alias = $base_url . '/' . $path_alias;

$title = drupal_get_title();
//dsm($title);

$block['subject'] = "Share:";
$block['content'] = _simpleshare_twitter($path_alias, $title);
$block['content'] .= _simpleshare_facebook($path_alias); //Should use open graph tags
//$block['content'] .= _simpleshare_googleplus($path_alias, $title);
//$block['content'] .= _simpleshare_tumblr($path_alias, $title);
//$block['content'] .= _simpleshare_pinterest($path_alias);
$block['content'] .= _simpleshare_reddit($path_alias, $title);
$block['content'] .= _simpleshare_email($path_alias, $title);
$block['content'] .= _simpleshare_print();

return $block;
}

function _simpleshare_twitter($path_alias, $title="")
{
$output = "<div id='simpleshare-twitter' class='simpleshare'><a target='_blank' href='http://twitter.com/intent/tweet?url=$path_alias&text=$title'><i class='fa fa-twitter'></i></a></div>";
return $output;
}

function _simpleshare_pinterest($path)
{
$output = "";
$output .= "<div id='simpleshare-pinterest' class='simpleshare'><a href='http://pinterest.com/pin/create/button/?url=" . urlencode($path);
$output .= "'>Pinterest</a></div>";
//<a href="&media={URI-encoded URL of the image to pin}&description={optional URI-encoded description}" class="pin-it-button" count-layout="horizontal"><img border="0" src="//assets.pinterest.com/images/PinExt.png" title="Pin It" /></a>
return $output;
}

function _simpleshare_facebook($path)
{
drupal_add_js(_simpleshare_js_sharebox($path, "facebook"), "inline");

return "<div id='simpleshare-facebook' class='simpleshare'><a onclick='return facebook_click()' href='#'><i class='fa fa-facebook'></i></a></div>";
}

function _simpleshare_googleplus($path)
{
drupal_add_js(_simpleshare_js_sharebox($path, "googleplus"), "inline");

return "<div id='simpleshare-googleplus'><a onclick='return googleplus_click();' href='#'>Google+</a></div>";
}

function _simpleshare_tumblr($path, $title)
{
drupal_add_js(_simpleshare_js_sharebox($path, "tumblr", $title), "inline");
return "<div id='simpleshare-tumblr' class='simpleshare'><a onclick='return tumblr_click();' href='#'>Tumblr</a></div>";
}

function _simpleshare_email($url, $title="")
{
$site_name = variable_get("site_name", "some website");
$share_message = "Check out this page on $site_name: $url";
$link = "mailto:?Subject=Post on $site_name: $title&Body=$share_message";
$output = "<div id='simpleshare-email' class='simpleshare'><a href='$link'><i class='fa fa-envelope-o'></i></a></div>";
return $output;
}

function _simpleshare_reddit($url, $title="")
{
//<a href="http://www.reddit.com/submit" onclick="window.location = 'http://www.reddit.com/submit?url=' + encodeURIComponent(window.location); return false"> <img src="http://www.reddit.com/static/spreddit7.gif" alt="submit to reddit" border="0" /> </a>
$output = "<div id='simpleshare-reddit' class='simpleshare'><a target='_blank' href='http://www.reddit.com/submit?url=$url&title=$title'><i class='fa fa-reddit-alien'></i></a></div>";
return $output;
}

function _simpleshare_js_sharebox($url, $type, $title="")
{
if($type=="facebook")
$path = "'http://www.facebook.com/sharer.php?u='+encodeURIComponent(u)";//+'&t='+encodeURIComponent(t)";
elseif($type=="googleplus")
$path = "'https://plus.google.com/share?url='+encodeURIComponent('$url')";
elseif($type='tumblr')
$path = "'http://www.tumblr.com/share/link?url='+encodeURIComponent('$url')+'&name=$title'";

$output = "function {$type}_click()";
$output .= "{u='$url';t='$title'; ";
$output .= "var left = (screen.width/2)-(626/2); var top = (screen.height/2)-(436/2); ";
$output .= "window.open($path,'Share','toolbar=0,status=0,width=626,height=436,top='+top+',left='+left);return false;}";
return $output;
}

function _simpleshare_print($title="print")
{
$output = "<div id='simpleshare-print' class='simpleshare'><a href='javascript:window.print();'><i class='fa fa-print'></i></a>";
return $output;
}
 */
