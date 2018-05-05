<?php

/**
 * 
 *  Declare theme support
 * 
 */
function jbrychta_add_theme_support() {

  register_nav_menus(
          array(
              'header' => 'Hlavička',
          )
  );

  add_theme_support('title-tag');
  add_theme_support('html5', array('gallery', 'caption'));
  add_theme_support('post-thumbnails');

  //add_image_size('gallery-thumbnail', 422, 270, true);
}

add_action('init', 'jbrychta_add_theme_support');

/**
 * 
 *  Register script and styles
 * 
 */
function jbrychta_add_styles() {

  $version = (WP_DEBUG === TRUE) ? date('His') : '1.0.0';

  wp_enqueue_style('main', get_template_directory_uri() . '/dist/style.css', array(), $version, 'all');

  wp_enqueue_script('grunticon', get_template_directory_uri() . '/dist/grunticon.loader.js', array('jquery'), $version);
  wp_enqueue_script('main', get_template_directory_uri() . '/dist/main.js', array('jquery'), $version);
}

add_action('wp_enqueue_scripts', 'jbrychta_add_styles');

/**
 * 
 *  Create ACF menu page
 * 
 */
if (function_exists('acf_add_options_page')) {
  acf_add_options_page(array(
      'page_title' => 'Nastavení',
      'menu_title' => 'Nastavení',
      'menu_slug' => 'nastaveni',
  ));
}

/**
 * 
 * Apply zalomeni filter on acf fields
 * 
 */
function jbrychta_apply_acf_filter($value, $post_id, $field) {

  switch ($field['type']) {
    case 'textarea':

      $value = apply_filters('the_title', $value);

      break;

    case 'text':

      $value = apply_filters('the_title', $value);

      break;
  }

  return $value;
}

add_filter('acf/load_value/type=textarea', 'jbrychta_apply_acf_filter', 10, 3);
add_filter('acf/load_value/type=text', 'jbrychta_apply_acf_filter', 10, 3);