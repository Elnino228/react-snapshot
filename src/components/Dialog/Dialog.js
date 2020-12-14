import React, {Component} from "react";
import './Dialog.scss'
import 'bootstrap/dist/css/bootstrap.min.css';

export function showDialog(title = '1', content = '1', style = {width: '50%'}) {
    this.setState({
        isOpen: true,
        title: title,
        content: content,
        style: style
    })
}

export function hideDialog() {
    this.setState({
        isOpen: false,
    })
}

export default class Dialog extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
            title: '',
            style: {},
            content: null
        };
        showDialog = showDialog.bind(this);
        hideDialog = hideDialog.bind(this);
    }

    componentDidMount() {
    }

    render() {
        return (
            <div className="modal fade" id="myModal" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span
                                aria-hidden="true">&times;</span></button>
                            <h4 className="modal-title" id="myModalLabel">Modal title</h4>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="form-group">
                                    <label htmlFor="recipient-name" className="control-label">Recipient:</label>
                                    <input type="text" className="form-control" id="recipient-name"/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="message-text" className="control-label">Message:</label>
                                    <textarea className="form-control" id="message-text"/>
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary">Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}