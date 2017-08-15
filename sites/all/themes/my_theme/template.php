<?php

function my_theme_js_alter(&$js) {
  unset(
    $js['misc/drupal.js'],
    $js['misc/jquery.js'],
    $js['misc/ui/jquery.ui.core.min.js'],
    $js['misc/jquery.once.js'],
    $js['misc/jquery.ba-bbq.js'],
    $js['misc/jquery.cookie.js']
  );
}