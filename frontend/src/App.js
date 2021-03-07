import './App.css';

import React, { Component } from "react";
import Orders from "./screens/Orders";
import OrderDetails from "./screens/OrderDetails";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ordersView:true,
      orderDetailsView: false,
      selectedOrderId: null,
      viewCompleted: false,
      activeItem: {
        title: "",
        description: "",
        completed: false
      },
      orderList: []
    };
  }

  showOrderDetails = (orderId) => {
    this.setState({ordersView:false, orderDetailsView: true, selectedOrderId:orderId})
  };

  hideOrderDetails = () => {
    this.setState({ordersView:true, orderDetailsView: false})
  };



  displayCompleted = status => {
    if (status) {
      return this.setState({ viewCompleted: true });
    }
    return this.setState({ viewCompleted: false });
  };



  render() {
    return (
        <div className="row container">
            <div className="col s12">
          {this.state.orderDetailsView ? (
              <OrderDetails
                  selectedOrderId={this.state.selectedOrderId} modeHandler={this.hideOrderDetails}
              />
          ) : null}

          {this.state.ordersView ? (

              <Orders orders={this.state.orderList} showOrderDetails={this.showOrderDetails} />
          ) : null}
            </div>
        </div>
    );
  }
}
export default App;
