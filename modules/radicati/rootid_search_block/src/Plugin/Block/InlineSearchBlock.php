<?php

namespace Drupal\rootid_search_block\Plugin\Block;

use Drupal\Core\Block\BlockBase;
use Drupal\Core\Block\BlockPluginInterface;

/**
 * Provides the Header Search Block.
 *
 * @Block(
 *   id = "inline_search_block",
 *   admin_label = @Translation("Inline Search"),
 *   category = @Translation("Rootid"),
 * )
 *
 */
class InlineSearchBlock extends BlockBase implements BlockPluginInterface {
  public function build() {
    $form =\Drupal::formBuilder()->getForm('Drupal\rootid_search_block\Form\InlineSearchForm');

    return [
      '#theme'  => 'rootid_inline_search_block',
      '#title'  => $this->t('Inline Search'),
      '#form'   => $form,
    ];
  }
}