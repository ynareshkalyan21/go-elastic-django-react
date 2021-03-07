import React, { Component } from "react";
export default class SearchFilter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            search: "",
            assetClass:"",
            purchaseType: "",
            priceRange: "",
            assertClass:"",
            orderSubmittedRange: "",
            pagination : {
                min:0,
                max:0,
                selected:0
            },
            submitMode:false
        };
        this.query = "";
        this.setPagination = () => {

        }
    }

    handleChange = e => {
        let {name, value} = e.target;
        if (e.target.type === "checkbox") {
            value = e.target.checked;
        }
        // this.state[name] = value;
        // this.setState(this.state)
        this.setState(state => (state[name] = value, state))
        this.setState(state => (state.submitMode = true, state))

    };

    goSearch = () => {
        let q = "";
        let state = this.state;
        if (state.search){
            q += "&search=" + state.search
        }
        if (state.purchaseType) {
            q += "&purchaseType=" + state.purchaseType
        }
        if(state.assetClass) {
            q += "&assetClass=" + state.assetClass
        }
        if(state.priceRange) {
            q += "&priceRange=" + state.priceRange
        }
        if(state.orderSubmittedRange) {
            q += "&orderSubmittedRange=" + state.orderSubmittedRange
        }
        // let rangeQ = "";
        // if(state.priceRange.min) {
        //     rangeQ+=state.priceRange.min
        // }
        // if(state.priceRange.max) {
        //     rangeQ+=":"+ state.priceRange.max
        // }
        // if (rangeQ) {
        //     q += "&priceRange="+ rangeQ
        // }
        // rangeQ = "";
        // if(state.orderSubmittedRange.min) {
        //     rangeQ+=state.priceRange.min
        // }
        // if(state.orderSubmittedRange.max) {
        //     rangeQ+=":"+ state.orderSubmittedRange.max
        // }
        // if (rangeQ) {
        //     q += "&orderSubmittedRange="+ rangeQ
        // }
        this.query = q;
        this.props.refreshList(q);
        this.setState(state => (state.submitMode = false, state));
        return q
    };

    goSearchPageQ = (pageNumber) => {
        return this.query + "&page=" + pageNumber
    };

    render() {
        return (
            <div className="search-filter col s12">
                Filters:
                <div className="row">
                    <div className="col s6">
                        <div className="row">
                            <div className="col s6">
                                Type :
                            </div>
                            <div className="col s6">
                                <select name="purchaseType" onChange={this.handleChange}>
                                    <option value="" > </option>
                                    <option value="BUY"> BUY</option>
                                    <option value="SELL">SELL</option>
                                </select>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col s6">
                                AssetClass :
                            </div>
                            <div className="col s6">
                                 <select name="assetClass" onChange={this.handleChange}>
                                    <option value="" > </option>
                                    <option value="EQUITY"> EQUITY</option>
                                </select>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col s6">
                                Order Submitted :
                                <br/>(yyyyy-mm-dd:yyyy-mm-dd)
                            </div>
                            <div className="col s6">
                                <input onChange={this.handleChange} type="text" placeholder="dd-mm-yyyy:dd-mm-yyyy" name="orderSubmittedRange" />
                            </div>
                        </div>
                    </div>
                    <div className="col s6">
                        <div className="row">
                            <div className="col s6">
                                Price Range:
                                <br/>(ex: 10:100)
                            </div>
                            <div className="col s6">
                                  <input onChange={this.handleChange} type="text" name="priceRange" placeholder="min price|max price"/>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col s6">
                                 Search :
                            </div>
                            <div className="col s6">
                                    <input name="search" onChange={this.handleChange} placeholder="Search for orderId Instrument"/>
                            </div>
                        </div>

                        <div className="row">
                            { this.state.submitMode ? <button onClick={this.goSearch}>Submit</button> : null}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}