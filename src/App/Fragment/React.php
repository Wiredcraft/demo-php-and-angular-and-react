<?php

namespace App\Fragment;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Fragment\FragmentRendererInterface;
use Guzzle\Service\Client;

class React implements FragmentRendererInterface
{
    private $client;

    /**
     * Constructor.
     */
    public function __construct(Client $client)
    {
        $this->client = $client;
    }

    /**
     * {@inheritdoc}
     */
    public function render($uri, Request $request, array $options = array())
    {
        $req = $this->client->get('http://127.0.0.1:3000/render');
        $query = $req->getQuery();
        $query->merge($options);
        $res = $req->send();
        return new Response((string)$res->getBody());
    }

    /**
     * {@inheritdoc}
     */
    public function getName()
    {
        return 'react';
    }
}
