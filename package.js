Package.describe({
  name: "jeremy:stripe",
  summary: "Stripe.js, Stripe Checkout, and Stripe for Node (async/sync) wrapped up for Meteor.",
  version: "1.4.1",
  git: "https://github.com/jshimko/meteor-stripe.git"
});

Package.on_use(function (api) {

  Npm.depends({
    "stripe": "4.5.0"
  });

  api.use([
    "ecmascript@0.4.3",
    "underscore@1.0.8",
    "reactive-var@1.0.9"
  ]);

  api.addFiles("stripe_client.js", "client");
  api.addFiles("stripe_server.js", "server");

  api.export("ReactiveStripe", "client");
  api.export(["Stripe", "StripeSync"], "server");
});
