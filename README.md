# Stripe for Meteor

Load Stripe's javascript libraries on the client (optional) and server.  Once client side libs are ready, the package will automatically configure the publishable key you pass in.  You can also reactively check for the client side libs to be ready in an autorun.

Package includes:

[Stripe.js](https://stripe.com/docs/stripe.js) (latest from CDN)
[Stripe Checkout](https://stripe.com/docs/checkout) (latest from CDN)
[Stripe for Node.js](https://www.npmjs.com/package/stripe) (v4.4.0)

## Install

```bash
meteor add jeremy:stripe
```

## Usage

### Client

Load Stripe.js and Stripe Checkout on the client:

```js
// anywhere on client
ReactiveStripe.load("YOUR_PUBLISHABLE_KEY");
```
(See the Stripe [docs](https://stripe.com/docs/stripe.js#setting-publishable-key) for info about the publishable key)

Or only load the client libs on specific routes:

```js
// Flow Router
FlowRouter.triggers.enter([ReactiveStripe.load("YOUR_PUBLISHABLE_KEY")], {
  only: ['route1', 'route2', 'checkout']
});
```

```js
// Iron Router
Router.onBeforeAction(function() {
  ReactiveStripe.load("YOUR_PUBLISHABLE_KEY");
  this.next();
}, { only: ['route1', 'route2', 'checkout'] });
```

Now you can use [Stripe.js](https://stripe.com/docs/stripe.js) or [Stripe Checkout](https://stripe.com/docs/checkout) in any of the ways outlined in the Stripe docs.

##### Helpers

Although you likely won't ever need it, there is a reactive helper method available to check if the client side libraries are loaded from Stripe's CDN.  You could use it like this:

```js
// check ReactiveStripe.loaded() before running Stripe code
Template.myTemplate.onRendered(function() {
  this.autorun(() => {
    if (ReactiveStripe.loaded()) {
      // Stripey stuff goes here
    }
  });
});
```

### Server

The [Stripe npm package](https://www.npmjs.com/package/stripe) is available anywhere on the server with the `Stripe` (async) or `StripeSync` (sync) globals.

First, initialize the server side library with your secret key:

```js
const stripe = Stripe("YOUR_SECRET_KEY");
// or
const stripe = StripeSync("YOUR_SECRET_KEY");
```

Then you can use any of the provided methods outlined in the [extensive API docs](https://stripe.com/docs/api/node).  For example:

##### async
```js
const stripe = Stripe("YOUR_SECRET_KEY");

stripe.customers.create({
    email: 'customer@example.com'
  },
  function(err, customer) {
    if (err) {
      console.warn(err);
    }
    console.log(customer); // new customer object returned from Stripe
  }
);
```

##### sync
```js
const stripe = StripeSync(key);

let customer;

try {
  customer = stripe.customers.create({
    email: 'customer@example.com'
  });
} catch(e) {
  console.error(e);
}

console.log(customer); // new customer object returned from Stripe
```


## Resources

- [Stripe Docs](https://stripe.com/docs)
- [Stripe API reference](https://stripe.com/docs/api/node)
