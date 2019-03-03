import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';
import { resetIngredients } from './burgerBuilder';

const purchaseBurgerSuccess = (id, orderData) => {
    return {
        type: actionTypes.PURCHASE_BURGER_SUCCESS,
        orderId: id,
        orderData: orderData
    }
}

const purchaseBurgerFailed = (error) => {
    return {
        type: actionTypes.PURCHASE_BURGER_FAILED,
        error: error
    }
}

const purchaseBurgerStart = () => {
    return {
        type: actionTypes.PURCHASE_BURGER_START
    }
}

export const purchaseBurgerInit = () => {
    return {
        type: actionTypes.PURCHASE_BURGER_INIT
    }
}

export const purchaseBurger = (orderData, token) => {
    return dispatch => {
        dispatch(purchaseBurgerStart());
        axios.post('/orders.json?auth=' + token, orderData)
            .then(response => {
                dispatch(purchaseBurgerSuccess(response.data.name, orderData));
                // Reset ingredients on successfull order execution.
                dispatch(resetIngredients())
            })
            .catch(error => {
                dispatch(purchaseBurgerFailed(error));
            });
    }
}

const fetchOrdersSuccess = (orders) => {
    return {
        type: actionTypes.FETCH_ORDERS_SUCCESS,
        orders: orders
    }
}

const fetchOrdersFailed = (error) => {
    return {
        type: actionTypes.FETCH_ORDERS_FAILED,
        error: error
    }
}

const fetchOrdersStart = () => {
    return {
        type: actionTypes.FETCH_ORDERS_START
    }
}

export const fetchOrders = (token, userId) => {
    return dispatch => {
        dispatch(fetchOrdersStart());
        axios.get('/orders.json?auth=' + token + '&orderBy="userId"&equalTo="' + userId + '"')
            .then(response => {
                const orders = [];
                for (let key in response.data) {
                    orders.push({
                        ...response.data[key],
                        id: key
                    });
                }
                dispatch(fetchOrdersSuccess(orders));
            })
            .catch(error => {
                dispatch(fetchOrdersFailed(error));
            });
    }
}