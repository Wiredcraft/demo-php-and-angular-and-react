<?php

namespace App\Provider;

use Silex\Application;
use Silex\ServiceProviderInterface;

use App\Form\Type\Simple;

class Form implements ServiceProviderInterface
{
    public function register(Application $app)
    {
        $app['form.types'] = $app->share($app->extend('form.types', function ($types) use ($app) {
            $types[] = new Simple();
            return $types;
        }));
    }

    public function boot(Application $app)
    {
    }
}
