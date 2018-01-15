<!doctype html>
<!--[if lte IE 8]> <html <?php language_attributes(); ?> class="no-js old-ie"> <![endif]-->
<!--[if gt IE 8]><!-->
<html <?php language_attributes(); ?> class="no-js">
  <!--<![endif]-->

  <head>

    <meta http-equiv="X-UA-Compatible" content="IE=edge"> 
    <meta charset="<?php bloginfo('charset'); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="profile" href="http://gmpg.org/xfn/11">
    <link rel="pingback" href="<?php bloginfo('pingback_url'); ?>">
    <?php wp_head(); ?> 

    <script>
      grunticon(["<?php echo get_template_directory_uri(); ?>/dist/icons.data.svg.css", "<?php echo get_template_directory_uri(); ?>/dist/icons.data.png.css", "<?php echo get_template_directory_uri(); ?>/dist/icons.fallback.css"], grunticon.svgLoadedCallback);
    </script>    
    
    <script>
      document.documentElement.className =
              document.documentElement.className.replace("no-js", "js");
    </script>

    <?php if(function_exists('the_field')): ?>
      <?php the_field('header_code', 'options'); ?>
    <?php endif; ?>
    
  </head>

  <body <?php body_class(); ?>>

    <a href="#main">skip to main content</a>

    <div class="container">

      
      <?php do_action('umessages'); ?>
      <main id="main" role="main" class="content">