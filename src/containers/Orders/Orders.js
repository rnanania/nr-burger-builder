import React, { Component } from 'react';
import { connect } from 'react-redux';

import Spinner from '../../components/UI/Spinner/Spinner';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';

import Order from '../../components/Order/Order';

// Properties coming from Store State
interface StateProps {
    //TODO: Define proper type -- Array of Order.
    orders: [any],
    loading: boolean,
    token: string,
    userId: string
}

// Properties coming from Store Dispatch
interface DispatchProps {
    fetchOrders: (token:string, userId:string) => void
}

type Props = StateProps & DispatchProps;

class Orders extends Component<Props> {
    componentDidMount() {
        this.props.fetchOrders(this.props.token, this.props.userId);
    }

    render() {
        let orders = null;
        if (this.props.orders && !this.props.loading) {
            orders = this.props.orders.map(order => {
                return <Order key={order.id} ingredients={order.ingredients} price={order.price} />
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

const mapStateToProps = (state) => {
    return {
        orders: state.order.orders,
        loading: state.order.loading,
        token: state.auth.token,
        userId: state.auth.userId
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchOrders: (token, userId) => dispatch(actions.fetchOrders(token, userId)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));