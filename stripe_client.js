
ReactiveStripe = {

  load: _.once(function(stripeKey) {
    const createHeadTag = (srcUrl) => {
      let script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = srcUrl;
      document.head.appendChild(script);
    }
    createHeadTag('https://js.stripe.com/v2/');
    createHeadTag('https://checkout.stripe.com/checkout.js');

    this._checkReady(stripeKey);
  }),

  _checkReady: function(stripeKey) {
    let i = 0;
    const checkReady = Meteor.setInterval(() => {
      if (typeof Stripe !== 'undefined' && typeof StripeCheckout !== 'undefined') {
        Stripe.setPublishableKey(stripeKey);
        this._loaded.set(true);
        Meteor.clearInterval(checkReady);
      } else {
        i += 100;
        if (i > 10000) {
          // stop checking if the lib isn't loaded within 10 secs,
          // then throw an error
          Meteor.clearInterval(checkReady);
          throw new Meteor.Error('Error loading Stripe libs from their CDN.');
        }
      }
    }, 100);
  },

  _loaded: new ReactiveVar(false),

  loaded: function() {
    return this._loaded.get();
  }

};
