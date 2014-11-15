<?php

use Silex\Application;
use Silex\Provider\TwigServiceProvider;
use Silex\Provider\UrlGeneratorServiceProvider;
use Silex\Provider\ValidatorServiceProvider;
use Silex\Provider\ServiceControllerServiceProvider;

$app = new Application();
$app->register(new UrlGeneratorServiceProvider());
$app->register(new ValidatorServiceProvider());
$app->register(new ServiceControllerServiceProvider());
$app->register(new TwigServiceProvider());
$app['twig'] = $app->share($app->extend('twig', function ($twig, $app) {
    // add custom globals, filters, tags, ...

    return $twig;
}));

// Use form.
use Silex\Provider\FormServiceProvider;
use Silex\Provider\TranslationServiceProvider;
use App\Provider\Form;
$app->register(new FormServiceProvider());
$app->register(new TranslationServiceProvider(), array(
    'locale_fallbacks' => array('en'),
));
$app->register(new Form());

// Use Guzzle to power `render_react()`.
use Silex\Provider\HttpFragmentServiceProvider;
use Guzzle\GuzzleServiceProvider;
use App\Provider\Fragment;
$app->register(new HttpFragmentServiceProvider());
$app->register(new GuzzleServiceProvider());
$app->register(new Fragment());

return $app;
