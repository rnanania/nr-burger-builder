import React, { Component } from 'react';
import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

class Orders extends Component {
    state = {
        orders: []
    }

    componentDidMount() {
        axios.get('/orders.json').then(response => {
            let fetchedOrders = [];
            for(let key in response.data) {
                fetchedOrders.push({ ...response.data[key], key: key });
            }
            this.setState({ orders: fetchedOrders});
        }).catch(error => {
            console.info(error);
        })
    }

    render() {
        let orders = null;
        if(this.state.orders){
            orders = this.state.orders.map(order => {
                return <Order key={order.key} ingredients={order.ingredients} price={order.price} />
            });
        } else {
            orders = <Spinner />
        }
        return (
            <div>
                {orders}
            </div>
        );
    }
}

export default withErrorHandler(Orders, axios);