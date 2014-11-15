<?php

namespace App\Provider;

use Silex\Application;
use Silex\ServiceProviderInterface;

use App\Fragment\React;

class Fragment implements ServiceProviderInterface
{
    public function register(Application $app)
    {
        $app['fragment.renderer.react'] = $app->share(function ($app) {
            $renderer = new React($app['guzzle.client']);
            return $renderer;
        });

        $app['fragment.renderers'] = $app->share($app->extend('fragment.renderers', function ($renderers) use ($app) {
            $renderers[] = $app['fragment.renderer.react'];
            return $renderers;
        }));
    }

    public function boot(Application $app)
    {
    }
}
