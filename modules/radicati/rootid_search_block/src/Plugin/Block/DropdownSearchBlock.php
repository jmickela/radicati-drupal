<?php

namespace Drupal\rootid_search_block\Plugin\Block;

use Drupal\Core\Block\BlockBase;
use Drupal\Core\Block\BlockPluginInterface;

/**
 * Provides the Header Search Block.
 *
 * @Block(
 *   id = "dropdown_search_block",
 *   admin_label = @Translation("Dropdown Search"),
 *   category = @Translation("Rootid"),
 * )
 *
 */
class DropdownSearchBlock extends BlockBase implements BlockPluginInterface {
  public function build() {
    $form =\Drupal::formBuilder()->getForm('Drupal\rootid_search_block\Form\DropdownSearchForm');

    return [
      '#theme'  => 'rootid_dropdown_search_block',
      '#title'  => $this->t('Dropdown Search'),
      '#form'   => $form,
      '#attached' => [
        'library' => [
          'rootid_search_block/rootid_dropdown_search_block',
          'rootid_search_block/rootid_search_block'
        ]
      ]
    ];
  }
}