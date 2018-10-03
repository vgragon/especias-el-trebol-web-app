import React, {Component} from 'react';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";

import * as dialogActions from "../../../store/actions/dialog";

import './Dialog.css';

class Dialog extends Component {
    render() {
        let {visibility, title, message, cancelText, confirmText, callback} = this.props.dialog;

        title = title || "Confirmation dialog";
        message = message || "Are you sure you want to perform this operation?";
        cancelText = cancelText || "Cancel";
        confirmText = confirmText || "Confirm";
        callback = callback || function () {
            return null;
        };

        return (
            <div className={"app-dialog-wrapper" + (visibility ? " visible" : "")}>
                <div className={"app-dialog"}>
                    <h2 className={"app-dialog__title"}>{title}</h2>
                    <div className={"app-dialog__message"} dangerouslySetInnerHTML={{__html: message}}/>
                    <div className={"app-dialog__buttons"}>
                        <button className={"app-button app-button--default float-left"}
                                onClick={this.props.dialogActions.toggleDialog.bind(this, false)}>{cancelText}</button>
                        <button className={"app-button app-button--primary float-right"}
                                onClick={callback.bind(this)}>{confirmText}</button>
                        <div className={"clearfix"}/>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    dialog: state.dialog
});

const mapDispatchToProps = (dispatch) => ({
    dialogActions: bindActionCreators(dialogActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Dialog);