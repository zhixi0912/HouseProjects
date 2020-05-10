import React from "react";
import ReactDom from "react-dom";

let ModalWrapper = function (reactClass,wrapDivId,onOk,onCancel,props) {
    this.props = props;
    this.onOutOk = onOk;
    this.onOutCancel = onCancel;
    this.reactClass = reactClass;
    this.wrapDivId = wrapDivId;
};
ModalWrapper.prototype.show = function () {
    var wrapDivId = this.wrapDivId;
    this.wrapDiv = document.getElementById(wrapDivId);
    if (! this.wrapDiv) {
        this.wrapDiv = document.createElement("div");
        this.wrapDiv.id = wrapDivId;
        document.body.appendChild( this.wrapDiv);
    }
    var props ={onOk:this.onOk.bind(this),onCancel:this.onCancel.bind(this),onManualClose:this.onOk.bind(this)};
    for (var i in this.props){
        props[i] = this.props[i];
    }
    // console.log(props);
    var modalComponent = React.createElement(this.reactClass,props);
    ReactDom.render(modalComponent,  this.wrapDiv);
};
ModalWrapper.prototype.onOk = function (...params) {
    this.onOutOk && this.onOutOk(...params);
    ReactDom.unmountComponentAtNode(this.wrapDiv);
};
ModalWrapper.prototype.onCancel = function () {
    this.onOutCancel && this.onOutCancel();
    ReactDom.unmountComponentAtNode(this.wrapDiv);
};
export default ModalWrapper;