import React, { Component } from "react";
import {
    Form,
    FormGroup,
} from "reactstrap";
import axios from "axios";

export default class OrderDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            orderId: this.props.selectedOrderId,
            // selectedOrder: this.props.selectedOrder,
            orderData: {},
            saveMode: false
        };
        // this.loadData(this.state.orderId)

    }

    componentDidMount() {
        this.loadData(this.state.orderId)
    }
    loadData = (orderId) => {
        axios
            .get("/orders/" + orderId+"/")
            .then(res => this.setState(state => (state.orderData = res.data, state)))
            .catch(err => console.log(err));
    };

    hide = () => {
        this.props.modeHandler()
    };

    handleChange = e => {
        let {name, value} = e.target;
        if (e.target.type === "checkbox") {
            value = e.target.checked;
        }
        // const activeItem = {...this.state.selectedOrder};
        // this.state.selectedOrder[name] = value;
        // var someProperty = {...this.state.selectedOrder};
        // someProperty[name] = value;
        // this.setState({someProperty})
        // if (name === "orderId") {
        //     this.state.selectedOrder.orderId = value
        // } else if(name === "") {
        //     this.state.selectedOrder.orderId = value
        // }

         this.setState(state => (state.orderData[name] = value, state))
         this.setState(state => (state.saveMode = true, state))

        // this.setState({selectedOrder: this.state.selectedOrder})
        // alert(name, value)
        // this.setState({activeItem});
    };

    save = () => {
       let data = {dataSource:this.state.orderData.dataSourceName,counterPartyName:this.state.orderData.counterpartyName };
       axios
            .put("/orders/"+ this.state.orderId+"/",data)
            .then(res => this.setState(state => (state.saveMode = false, state)))
            .catch(err => console.log(err));
    };

    render() {
        let order = this.state.orderData;
        return (
            <div>
                <a className="nav"  onClick={() => this.hide()} > ~-- Back to orders </a>
                <div className="margin-10">
                    <div className="row bold">
                        <div className="col s6">
                            <b>Order Id:</b>
                        </div>
                        <div className="col s6">
                            <b>{order.orderId}</b>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col s6">
                            purchaseType:
                        </div>
                        <div className="col s6">
                            {order.purchaseType}
                        </div>
                    </div>
                    <div className="row">
                        <div className="col s6">
                            tradePrice:
                        </div>
                        <div className="col s6">
                            {order.tradePrice}
                        </div>
                    </div>
                    <div className="row">
                        <div className="col s6">
                            tradeQuantity:
                        </div>
                        <div className="col s6">
                            {order.tradeQuantity}
                        </div>
                    </div>
                    <div className="row">
                        <div className="col s6">
                            instrumentId:
                        </div>
                        <div className="col s6">
                            {order.instrumentId}
                        </div>
                    </div>
                    <div className="row">
                        <div className="col s6">
                            assetClass:
                        </div>
                        <div className="col s6">
                            {order.assetClass}
                        </div>
                    </div>
                    <div className="row">
                        <div className="col s6">
                            orderSubmitted:
                        </div>
                        <div className="col s6">
                            {order.orderSubmitted}
                        </div>
                    </div>

                            <div className="row">
                                <div className="col s6">
                                    CounterParty:
                                </div>
                                <div className="col s6 ">
                                    <input type="text" name="counterpartyName" onChange={this.handleChange} value={order.counterpartyName}/>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col s6">
                                    Data source:
                                </div>
                                <div className="col s6">
                                    <label>
                                        <input type="text" name="dataSourceName"  onChange={this.handleChange} value={order.dataSourceName}/>
                                    </label>
                                </div>
                            </div>
                            { this.state.saveMode ? <button className="margin-10" onClick={this.save}>SAVE</button> : null }

                </div>
            </div>
        );
    }
};