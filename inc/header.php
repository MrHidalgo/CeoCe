<?php include_once("arbo.php"); ?>
<!doctype html>
<html lang="fr-CH">
<head>
    <meta charset="utf-8">
    <title><?php if (isset($page['title'])) {
            echo $page['title'];
        } ?></title>
    <meta name="description" content="<?php if (isset($page['description'])) {
        echo $page['description'];
    } ?>">
    <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <?php
    if (isset($page['noindex']) && ($page['noindex'] == "noindex")) {
        ?>
        <meta name="robots" content="noindex">
    <?php } ?>
    <?php
    if (isset($page['id']['canonical'])) {
        ?>
        <link rel="canonical" href="https://caseo.ch/<?php echo $pages[$page['id']]['canonical']; ?>" />
    <?php } ?>

    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.0/normalize.min.css">
    <link rel="stylesheet" href="css/style.css">
<!--    <link rel="stylesheet" href="css/style.min.css">-->
</head>
<body>
<header id="topbar">
    <div class="row">
        <a href="./" class="logo" logo-js>LOGO</a>
        <a href="#" class="btn cta">Demande d'offre</a>
    </div>
</header>
        
