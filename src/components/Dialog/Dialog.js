import React, {Component} from "react";
import './Dialog.scss';
import $ from 'jquery'

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

    handleMoveDialog = (e) => {
        e.preventDefault();
        let curPosX = e.clientX, curPosY = e.clientY, offsetX = 0, offsetY = 0;
        $(document).on('mousemove', function (e) {
            offsetX = curPosX - e.clientX;
            offsetY = curPosY - e.clientY;
            curPosX = e.clientX;
            curPosY = e.clientY;
            let $modal = $('#myModal');
            $modal.css({
                top: $modal.position().top - offsetY,
                left: $modal.position().left - offsetX,
            });
        }).mouseup(function () {
            $(this).off('mousemove')
        });
    };

    render() {
        return (
            <div className={'modal-container'}>
                <div id={'myModal'} className={'modal'}>
                    <div className={'modal-header'} onMouseDown={this.handleMoveDialog}>
                        <div className={'title'}><span>Modal header</span></div>
                        <div className={'wrapper-btn'}>
                            <a className={'minimize-btn'} role={'button'}><i className="fa fa-window-minimize"
                                                                             aria-hidden="true"/></a>
                            <a className={'expand-btn'} role={'button'}><i className="fa fa-expand" aria-hidden="true"/></a>
                            <a className={'close-btn'} role={'button'}><i className="fa fa-times"
                                                                          aria-hidden="true"/></a>
                        </div>
                    </div>
                    <div className={'modal-body'}>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid architecto aspernatur aut
                        commodi debitis dolor, dolorum explicabo facilis inventore iste mollitia nemo odio porro
                        quibusdam, quisquam, quos saepe soluta veniam! Cupiditate doloribus eligendi enim error eum id
                        natus odio officiis optio praesentium, quam, repellendus reprehenderit tenetur ut veritatis,
                        vitae voluptatum. Assumenda cumque delectus earum impedit iure, magni pariatur sint. Corporis
                        dicta distinctio esse eum facilis magnam modi odit quod. Architecto dolorum enim eum
                        exercitationem explicabo harum iure optio veniam voluptatibus.
                    </div>
                    <div className={'modal-footer'}>
                        <button>Close</button>
                        <button>Submit</button>
                    </div>
                    <div className={'top side'}/>
                    <div className={'right side'}/>
                    <div className={'bottom side'}/>
                    <div className={'left side'}/>
                    <div className={'top-left side'}/>
                    <div className={'top-right side'}/>
                    <div className={'bottom-left side'}/>
                    <div className={'bottom-right side'}/>
                </div>
            </div>
        )
    }

}