Package.describe({
  name: 'jeremy:stripe',
  summary: "Stripe.js, Stripe Checkout, and Stripe for Node (async/sync) wrapped up for Meteor.",
  version: '1.0.0',
  git: 'https://github.com/jshimko/meteor-stripe.git'
});

Package.on_use(function (api) {

  Npm.depends({
    "stripe": "4.0.0"
  });

  api.use([
    'ecmascript',
    'underscore@1.0.4',
    'reactive-var@1.0.6'
  ]);

  api.addFiles('stripe_client.js', 'client');
  api.addFiles('stripe_server.js', 'server');

  api.export('ReactiveStripe', 'client');
  api.export(['Stripe', 'StripeSync'], 'server');
});
