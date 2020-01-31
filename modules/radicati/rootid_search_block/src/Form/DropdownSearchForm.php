<?php
/**
 * @file
 * Contains \Drupal\rootid_search_block\Form\SearchForm.
 */
namespace Drupal\rootid_search_block\Form;

use Drupal\Component\Render\FormattableMarkup;
use Drupal\Core\Form\FormBase;
use Drupal\Core\Form\FormStateInterface;


class DropdownSearchForm extends FormBase {
  public function getFormId() {
    return "dropdownsearch__form";
  }

  public function buildForm(array $form, FormStateInterface $form_state) {
    $form['terms'] = [
      '#type' => 'textfield',
      '#title' => $this->t('Search Terms'),
      '#label_attributes' => [
        'class' => [
          'sr-only'
        ],
      ],
    ];

    $form['button'] = [
      '#type' => 'html_tag',
      '#tag' => 'button',
      '#value' =>  new FormattableMarkup('<i class="icon icon-arrow-right icon--circle"></i>', []),
      '#attributes' => [
        'type'    => 'submit',
        'class'   => ['search-submit'],
        'aria-label' => t('Search')
      ]
    ];

    $form['submit'] = [
      '#type'   => 'submit',
      '#value'  =>  new FormattableMarkup('<i class="icon icon-search"></i>', []),
    ];

    return $form;
  }

  /*
   * TODO: This should be moved to a configuration on the block config page.
   */
  public function submitForm(array &$form, FormStateInterface $form_state) {
    $terms = $form_state->getValue('terms');
    //$form_state->setRedirectUrl(Url::fromRoute('view.prc_site_search.page_1', ['terms' => $terms]));
    $form_state->setRedirect('view.aclunc_search_results.page_1', ['terms' => $terms]);
  }

}
