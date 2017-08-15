<?php

function my_theme_preprocess(&$variables, $hook) {
  $variables['theme_path'] = drupal_get_path('theme', 'my_theme');
}