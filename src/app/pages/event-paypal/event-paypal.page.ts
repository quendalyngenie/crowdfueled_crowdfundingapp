import { Component, OnInit } from '@angular/core';
import { PayPal, PayPalPayment, PayPalConfiguration } from '@ionic-native/paypal/ngx';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-event-paypal',
  templateUrl: './event-paypal.page.html',
  styleUrls: ['./event-paypal.page.scss'],
})
export class EventPaypalPage implements OnInit {
  paymentAmount: string;
  currency: string = 'SGD';
  currencyIcon: string = 'S$';

  constructor(private payPal: PayPal, private route: ActivatedRoute, private authService: AuthService, private router: Router) {
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
        onApprove: (data, actions) => {
          return actions.order.capture()
            .then(details => {
              // Get the logged-in user's ID from the AuthService
              const userId = this.authService.getId();

              // Get the user's name from the Firestore database
              this.authService.getSpecificUserNameById(userId).then(name => {
                // Show a success message to the buyer with the user's name
                alert('Transaction completed by ' + name + '!');
              });
              this.router.navigate(['/event']);
            })
            .catch(err => {
              console.log(err);
              this.router.navigate(['/event']);
            });
        }


      }).render('#paypal-button-container');
    }, 500);
  }
}


