import React, { Component } from "react";
import SearchFilters from "../components/SearchFilters";
import axios from "axios";

export default class Orders extends Component {
    constructor(props) {
        super(props);
        this.state = {
            orderList: this.props.orders
        };
    }


    componentDidMount() {
        this.refreshList();
    }

    refreshList = (q) => {
        q = q?q:"";
        axios
            .get("/orders/?" + q)
            .then(res => this.setState({ orderList: res.data }))
            .catch(err => console.log(err));
    };

    // handleChange = e => {
    //     let {name, value} = e.target;
    //     if (e.target.type === "checkbox") {
    //         value = e.target.checked;
    //     }
    //     const activeItem = {...this.state.activeItem, [name]: value};
    //     this.setState({activeItem});
    // };

    renderOrderTable = () => {
        let orders =  this.state.orderList;
        return orders.map(order => (
            <tr onClick={() => this.props.showOrderDetails(order.orderId)}>
                <th  >{order.orderId}</th>
                <th>{order.assetClass}</th>
                <th>{order.orderSubmitted}</th>
                <th>{order.instrumentName}</th>
                <th>{order.instrumentId}</th>
                <th>{order.purchaseType}</th>
                <th>{order.tradeQuantity}</th>
                <th>{order.tradePrice}</th>
            </tr>
        ));
    };

    render() {
        return (
            <div>
                <div className="row">
                    <SearchFilters refreshList={this.refreshList} />
                </div>
                <div className="">
                    <div className="row">
                        <b>Order search result</b>
                    </div>
                    <div className="row margin-10">
                        <table className="col s12">
                            <thead>
                            <tr>
                                <th>OrderId</th>
                                <th>Asset Class</th>
                                <th>Order Submitted</th>
                                <th>Instrument Name</th>
                                <th>Instrument Id</th>
                                <th>Purchase Type</th>
                                <th>Trade quantity</th>
                                <th>Trade Price</th>
                            </tr>
                            </thead>
                            <tbody>
                            {this.renderOrderTable()}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

        );
    }
}