<?php

return [
    'server_key' => env(
        'MIDTRANS_SERVER_KEY',
        'SB-Mid-server-80UAP5u3u6z1LurAdklNVu33',
    ),
    'client_key' => env(
        'MIDTRANS_CLIENT_KEY',
        'SB-Mid-client-TgveGmEBqgD7ZH4e',
    ),
    'is_production' => false,
    'is_sanitized' => true,
    'is_3ds' => true,
];
