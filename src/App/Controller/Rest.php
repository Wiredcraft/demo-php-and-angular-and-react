<?php

namespace App\Controller;

use Silex\Application;
use Silex\ControllerProviderInterface;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\ParameterBag;

class Rest implements ControllerProviderInterface
{
    public function connect(Application $app)
    {
        // @see http://silex.sensiolabs.org/doc/cookbook/json_request_body.html
        $app->before(function (Request $request) {
            if (0 === strpos($request->headers->get('Content-Type'), 'application/json')) {
                $data = json_decode($request->getContent(), true);
                $request->request->replace(is_array($data) ? $data : array());
            }
        });

        $controllers = $app['controllers_factory'];

        // POST
        $controllers->post('/', function (Request $request, Application $app) {
            return $app->json($request->request->get('form'));
        })->bind('rest');

        // GET
        $controllers->get('/', function (Application $app) {
            $form = $app['form.factory']->create('simple');
            return $app['twig']->render('rest.orig.twig', array('form' => $form->createView()));
        });

        // GET
        $controllers->get('/angular', function (Application $app) {
            $form = $app['form.factory']->create('simple');
            return $app['twig']->render('rest.angular.twig', array('form' => $form->createView()));
        });

        // GET
        $controllers->get('/react', function (Application $app) {
            $form = $app['form.factory']->create('simple');
            return $app['twig']->render('rest.react.twig', array('form' => $form->createView()));
        });

        return $controllers;
    }
}
