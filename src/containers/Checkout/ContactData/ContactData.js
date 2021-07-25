import React, { useState } from 'react';
import { connect } from 'react-redux';

import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/spinner/spinner';
import classes from './ContactData.css';
import axios from '../../../axios-orders';
import Input from '../../../components/UI/Input/Input';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../../store/actions/index';
import {updateObject, checkValidity} from '../../../shared/utility';

const ContactData = props => {
    const [orderForm, setOrderForm] = useState({
                name: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder: 'Your Name'
                    },
                    value: '',
                    validation: {
                        required: true
                    },
                    valid: false,
                    touched: false
                },
                
                street: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder: 'Street'
                    },
                    value: '',
                    validation: {
                        required: true
                    },
                    valid: false,
                    touched: false
                },

                zipCode: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder: 'ZIP'
                    },
                    value: '',
                    validation: {
                        required: true,
                        
                    },
                    valid: false,
                    touched: false
                },

                country: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder: 'Country'
                    },
                    value: '',
                    validation: {
                        required: true
                    },
                    valid: false,
                    touched: false
                },

                email: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'email',
                        placeholder: 'Your E-mail'
                    },
                    value: '',
                    validation: {
                        required: true
                    },
                    valid: false,
                    touched: false
                },

                deliveryMethod: {
                    elementType: 'select',
                    elementConfig: {
                        options: [
                            {value: 'fastest', displayValue: 'Fastest' },
                            {value: 'cheapest', displayValue: 'Normal' },
                        ]
                    },
                    value: 'fastest',
                    validation: {},
                    valid: true
                }
        })
        const [formValid, setFormValid] = useState(false);

    const orderHandler = (event) => {
        event.preventDefault();  //prevents reloading ie default action
        const formData = {};
        for (let formElementIdentifier in orderForm) {
            formData[formElementIdentifier] = orderForm[formElementIdentifier].value;
        }
        const order = {
           ingredients: props.ings,
           price: props.price,
           orderData: formData,
           userId: props.userId
        }

        props.onOrderBurger(order, props.token);
    }

    const inputChangedHandler = (event, inputIdentifier) => {
        
        const updatedFormElement = updateObject(orderForm[inputIdentifier], {
            value: event.target.value,
            valid: checkValidity(event.target.value, orderForm[inputIdentifier].validation),
            touched: true
        });

        const updatedOrderForm = updateObject(orderForm,{
            [inputIdentifier]: updatedFormElement
        });

        let formValid = true;
        for (let inputIdentifier in updatedOrderForm) {
            formValid = updatedOrderForm[inputIdentifier].valid && formValid;
        }
        setOrderForm(updatedOrderForm);
        setFormValid(formValid)
    }

        const formElementsArray = [];
        for (let key in orderForm) {
            formElementsArray.push({
                id: key,
                config: orderForm[key]
            });
        }
        let form = (
             <form onSubmit={orderHandler}>

                 {formElementsArray.map(formElement => (
                     <Input 
                     key={formElement.id}
                     elementType={formElement.config.elementType} 
                     elementConfig={formElement.config.elementConfig}
                     value={formElement.config.value}
                     invalid={!formElement.config.valid}
                     shouldValidate={formElement.config.validation}
                     touched={formElement.config.touched}
                     changed={(event) => inputChangedHandler(event, formElement.id)} />
                 ))}

                 <Button btnType="Success" disabled={!formValid}>ORDER</Button>
             </form>
        );
        if (props.loading) {
            form = <Spinner />
        }
        return (
            <div className={classes.ContactData}>
                <h4>Enter your contact data</h4>
                {form}
            </div>
        );
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        loading: state.order.loading,
        token: state.auth.token,
        userId: state.auth.userId
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onOrderBurger: (orderData, token, userId) => dispatch(actions.purchaseBurger(orderData, token, userId))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios));