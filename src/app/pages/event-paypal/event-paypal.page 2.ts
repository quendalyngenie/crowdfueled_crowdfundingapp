import { Component, OnInit } from '@angular/core';
import { PayPal, PayPalPayment, PayPalConfiguration } from '@ionic-native/paypal/ngx';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-event-paypal',
  templateUrl: './event-paypal.page.html',
  styleUrls: ['./event-paypal.page.scss'],
})
export class EventPaypalPage implements OnInit {
  paymentAmount: string;
  currency: string = 'SGD';
  currencyIcon: string = 'S$';

  constructor(private payPal: PayPal, private route: ActivatedRoute, private router: Router) {
    this.route.queryParams.subscribe(params => {
      this.paymentAmount = params['price'];
    });
  }

  ngOnInit() {
    let _this = this;
    setTimeout(() => {
      // Render the PayPal button into #paypal-button-container
      <any>window['paypal'].Buttons({

        // Set up the transaction
        createOrder: function (data, actions) {
          return actions.order.create({
            purchase_units: [{
              amount: {
                value: _this.paymentAmount
              }
            }]
          });
        },

        // Finalize the transaction
        onApprove: function (data, actions) {
          return actions.order.capture()
            .then(function (details) {
              // Show a success message to the buyer
              alert('Transaction completed by ' + details.payer.name.given_name + '!');
            })
            .catch(err => {
              console.log(err);
            });
        }
      }).render('#paypal-button-container');
    }, 500);
  }
}


// import { Component } from '@angular/core';
// import { PayPal, PayPalPayment, PayPalConfiguration } from '@ionic-native/paypal/ngx';

// @Component({
//   selector: 'app-paypal',
//   templateUrl: 'paypal.page.html',
//   styleUrls: ['paypal.page.scss'],
// })
// export class PaypalPage {
//   constructor(private payPal: PayPal) { }
//   paymentAmount: string = '3.33';
//   currency: string = 'INR';
//   currencyIcon: string = '₹';

//   payWithPaypal() {
//     this.payPal.init({
//       PayPalEnvironmentProduction: 'YOUR_PRODUCTION_CLIENT_ID',
//       PayPalEnvironmentSandbox: 'YOUR_SANDBOX_CLIENT_ID'
//     }).then(() => {
//       // Environments: PayPalEnvironmentNoNetwork, PayPalEnvironmentSandbox, PayPalEnvironmentProduction
//       this.payPal.prepareToRender('PayPalEnvironmentSandbox', new PayPalConfiguration({
//         // Only needed if you get an "Internal Service Error" after PayPal login!
//         //payPalShippingAddressOption: 2 // PayPalShippingAddressOptionPayPal
//       })).then(() => {
//         let payment = new PayPalPayment(this.paymentAmount, this.currency, 'Description', 'sale');
//         this.payPal.renderSinglePaymentUI(payment).then((res) => {
//           console.log(res);
//           // Successfully paid
//         }, () => {
//           // Error or render dialog closed without being successful
//         });
//       }, () => {
//         // Error in configuration
//       });
//     }, () => {
//       // Error in initialization, maybe PayPal isn't supported or something else
//     });
//   }
// }