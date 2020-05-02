import React from 'react'
import '../../../Main.css'
import {
  CardElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
import ShoppingCartRowTable from './ShoppingCartRowTable';

function CheckoutForm(props) {
    const shopItems = localStorage.getItem('cart_items') === null ? [] : JSON.parse(localStorage.getItem('cart_items'));
    let countItem = 0;
    let subTotal = parseFloat(0);
    let grandTotal = parseFloat(0);
    let totalItemCount = 0;
    let taxe = 0.087;

    if (shopItems.length > 0) {
        for (let index = 0; index < shopItems.length; index++) {
            const el = shopItems[index];
            grandTotal += parseFloat(el.product_price) * parseFloat(el.quantity);
            subTotal += parseFloat(el.product_price) * parseFloat(el.quantity);
            totalItemCount += parseInt(el.quantity)
        }
    }


    const stripe = useStripe();
    const elements = useElements();

    // const handleSubmit = async (event) => {
    //     event.preventDefault();
    //     const {error, paymentMethod} = await stripe.createPaymentMethod({
    //         type: 'card',
    //         card: elements.getElement(CardElement),
    //     });
    // };

    const handleSubmit = async (event) => {
        // Block native form submission.
        event.preventDefault();
    
        if (!stripe || !elements) {
          // Stripe.js has not loaded yet. Make sure to disable
          // form submission until Stripe.js has loaded.
          return;
        }
    
        // Get a reference to a mounted CardElement. Elements knows how
        // to find your CardElement because there can only ever be one of
        // each type of element.
        const cardElement = elements.getElement(CardElement);
    
        // Use your card Element with other Stripe.js APIs
        const {error, paymentMethod} = await stripe.createPaymentMethod({
          type: 'card',
          card: cardElement,
        });
        
        const span_error = document.getElementById('card_element_error');
        if (error) {
          console.log('[error]', error);
          span_error.style.color = 'red';
          span_error.innerText = error.message;
        } else {
          console.log('[PaymentMethod]', paymentMethod);
          span_error.innerText = '';
        }
      };

  return (
        <div className="col-md-12">
            <h2 className="text-center">Mon Panier d'achat</h2><hr/>
        <div className="row">
           {
                shopItems.length === 0 ?
                <div className="col-md-12 bg-danger">
                    <p className="text-center text-white text-capitalize" style={{ fontSize:'22px' }}>Votre panier est vide !</p>
                </div>
                : <table className="table table-bordered table-striped table-condensed">
                    <thead><th>#</th><th>Article</th><th>Prix</th><th>Quantité</th><th>Taille</th><th>Sous-Total</th></thead>
                    <tbody>
                        {
                            shopItems.map(item =>(
                                <ShoppingCartRowTable 
                                    product={props.product} 
                                    countItem={++countItem} 
                                    item={item} 
                                    deCrementProductQuantity={props.deCrementProductQuantity} 
                                    inCrementProductQuantity={props.inCrementProductQuantity}
                                    key={item.product_id} 
                                />
                            ))
                        }
                    </tbody>
                </table>                
            }
                <legend>Total</legend>
                <table className="table table-bordered table-condensed">
                    <thead style={tableHeaderStyle}><th>Total Article</th><th>Sous Total</th><th>Taxe</th><th>Total Général</th></thead>
                    <tbody>
                        <tr style={tableHeaderStyle}>
                            <td>{totalItemCount}</td>
                            <td>${subTotal.toFixed(2)}</td>
                            <td>${(taxe * subTotal).toFixed(2)}</td>
                            <td className="bg-success text-center" style={{ fontSize:'20px' }}>${(grandTotal + taxe).toFixed(3)}</td>
                        </tr>
                    </tbody>
                </table>
                <hr/>
                <button type="button" className="btn btn-dark float-right" data-toggle="modal" data-target="#exampleModal">
                    Chechout >>
                </button>

                <div className="modal fade lg" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Commande des articles</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="modal-body">
                           <div className="form-group">
                               <input type="email" name="email" className="form-control" placeholder="Adresse email" />
                            </div>
                            <div className="form-group">
                                <input type="text" name="full_name" className="form-control" placeholder="Nom complet" />
                            </div>
                            <div className="row">
                                <div className="col-6 form-group">
                                    <input type="text" name="city" className="form-control" placeholder="Cité" />
                                </div>
                                <div className="col-6 form-group">
                                    <input type="text" name="province" className="form-control" placeholder="Ville" />
                                </div>
                                <div className="col-6 form-group">
                                    <input type="text" name="code_postal" className="form-control" placeholder="Boite postal" />
                                </div>
                                <div className="col-6 form-group">
                                    <input type="text" name="cellphone" className="form-control" placeholder="Téléphone" />
                                </div>
                            </div>
                            <legend>Détails Carte</legend>
                            <div className="form-group">
                                <input type="text" name="full_name_on_card" className="form-control" placeholder="Nom complet sur la carte" />
                            </div>
                            <div className="fomGroup">
                                <CardElement 
                                    options={{
                                        style: {
                                            base: {
                                            fontSize: '16px',
                                            color: '#424770',
                                            '::placeholder': {
                                                color: '#aab7c4',
                                            },
                                            },
                                            invalid: {
                                            color: '#9e2146',
                                            },
                                        },
                                    }}
                                />
                                <p id="card_element_error"></p>
                            </div>
                            {/* <div className="form-group">
                            <label for="card-element">
                                Credit or debit card
                            </label>
                            <div id="card-element">
                            </div>

                            <div id="card-errors" role="alert"></div>
                            </div> */}
                            {/* <div className="form-group">
                                <input type="text" name="address" className="form-control" placeholder="Adresse physique" />
                            </div>
                            <div className="form-group">
                                <input type="text" name="card_number" className="form-control" placeholder="N° carte de crédit" />
                            </div>
                            <div className="row">
                                <div className="col-6 form-group">
                                    <input type="text" name="expire_date" className="form-control" placeholder="MM/DD" />
                                </div>
                                <div className="col-6 form-group">
                                    <input type="text" name="cvc_code" className="form-control" placeholder="Code CVC" />
                                </div>
                            </div> */}
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button type="submit" className="btn btn-primary" disabled={!stripe}>Achater</button>
                        </div>
                    </form>
                    </div>
                </div>
                </div>
        </div>
    </div>
  )
}

const tableHeaderStyle = {
    textAlign:'center'
}

export default CheckoutForm;
