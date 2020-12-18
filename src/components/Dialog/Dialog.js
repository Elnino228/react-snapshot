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
        let $modal = $('#myModal');
        let curPosX = e.clientX, curPosY = e.clientY, offsetX = 0, offsetY = 0;
        let dragElement = (e) => {
            offsetX = curPosX - e.clientX;
            offsetY = curPosY - e.clientY;
            curPosX = e.clientX;
            curPosY = e.clientY;
            $modal.css({
                top: $modal.position().top - offsetY,
                left: $modal.position().left - offsetX,
            });
        };
        let limitInViewPort = () => {
            if ($modal.position().top < 0)
                $modal.css({
                    top: 0
                });
            if ($modal.position().top > (document.documentElement.clientHeight - $modal.height()))
                $modal.css({
                    top: document.documentElement.clientHeight - $modal.height()
                });
            if ($modal.position().left < 0)
                $modal.css({
                    left: 0
                });
            if ($modal.position().left > document.documentElement.clientWidth - $modal.width())
                $modal.css({
                    left: document.documentElement.clientWidth - $modal.width()
                });
        };
        $(document).on('mousemove', function (e) {
            dragElement(e);
            limitInViewPort();
        }).mouseup(function () {
            $(this).off('mousemove')
        });
    };

    originWidth = 0;
    originHeight = 0;

    handleExpandDialog = (e) => {
        e.preventDefault();
        let $modal = $('#myModal');
        if ($modal) {
            if (Math.floor($modal.width()) === document.documentElement.clientWidth || Math.ceil($modal.width()) === document.documentElement.clientWidth) {
                $modal.css({
                    top: '10%',
                    left: document.documentElement.clientWidth / 2 - this.originWidth / 2,
                    width: this.originWidth ,
                    height: this.originHeight
                });
            } else {
                this.originWidth = $modal.width();
                this.originHeight = $modal.height();
                $modal.css({
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%'
                });
            }
        }
    };

    handleCloseDialog = (e) => {
        this.setState({
            isOpen: false
        })
    };

    handleResize = (e, direction) => {
        e.preventDefault();
        let $modal = $('#myModal');
        let startPosX = e.clientX, startPosY = e.clientY, offsetX = 0, offsetY = 0;
        let minWidth = +$modal.css('min-width').replace(/\D/g, '');

        let resizeLeft = (offsetX) => {
            if ($modal.position().left >= 0) {
                if ($modal.width() > minWidth) {
                    if ($modal.width() + offsetX > minWidth) {
                        $modal.css({
                            width: $modal.width() + offsetX + 'px',
                            height: $modal.height() + 'px',
                            left: $modal.position().left - offsetX,
                        });

                    } else {
                        if (offsetX > 0) {
                            let rest = $modal.width() - minWidth;
                            $modal.css({
                                width: minWidth + 'px',
                                height: $modal.height() + 'px',
                                left: $modal.position().left + rest,
                            });
                        }
                    }
                } else if ($modal.width() === minWidth) {
                    $modal.css({
                        width: $modal.width() + offsetX + 'px',
                        height: $modal.height() + 'px',
                    });
                }
            }
        };
        let resizeRight = (offsetX) => {
            $modal.css({
                width: $modal.width() + offsetX + 'px',
                height: $modal.height() + 'px'
            });
        };
        let resizeBottom = (offsetY) => {
            $modal.css({
                height: $modal.height() + offsetY + 'px'
            });
        };

        let limitLeft = (callbackFunction) => {
            if ($modal.position().left > 0) {
                if ($modal.position().left - offsetX > 0) {
                    callbackFunction();
                } else {
                    let rest = $modal.position().left;
                    $modal.css({
                        width: $modal.width() + rest + 'px',
                        height: $modal.height() + 'px',
                        left: 0,
                    });
                }
            } else if ($modal.position().left === 0) {
                if (offsetX < 0) {
                    callbackFunction();
                }
            }
        };

        let limitRight = (callbackFunction) => {
            if ($modal.position().left + $modal.width() + offsetY < document.documentElement.clientWidth || $modal.position().left + $modal.width() === document.documentElement.clientWidth) {
                callbackFunction();
            } else {
                $modal.css({
                    height: $modal.height() + 'px',
                    width: document.documentElement.clientWidth - $modal.position().left + 'px',
                });
            }
        };

        let limitBottom = (callbackFunction) => {
            if ($modal.position().top + $modal.height() + offsetY < document.documentElement.clientHeight || $modal.position().top + $modal.height() === document.documentElement.clientHeight) {
                callbackFunction();
            } else {
                $modal.css({
                    width: $modal.width() + 'px',
                    height: document.documentElement.clientHeight - $modal.position().top + 'px',
                });
            }
        };

        let resize = (e, direction) => {
            offsetX = startPosX - e.clientX;
            offsetY = startPosY - e.clientY;
            startPosX = e.clientX;
            startPosY = e.clientY;
            switch (direction) {
                case 'left':
                    limitLeft(() => resizeLeft(offsetX));
                    break;
                case 'right':
                    limitRight(() => resizeRight(-offsetX));
                    break;
                case 'bottom':
                    limitBottom(() => resizeBottom(-offsetY));
                    break;
                case 'bottom-left':
                    limitLeft(() => resizeLeft(offsetX));
                    limitBottom(() => resizeBottom(-offsetY));
                    break;
                case 'bottom-right':
                    limitRight(() => resizeRight(-offsetX));
                    limitBottom(() => resizeBottom(-offsetY));
                    break
            }
        };

        $(document).on('mousemove', function (e) {
            resize(e, direction);
        }).mouseup(function () {
            $(this).off('mousemove')
        });
    };

    render() {
        return (
            <div className={`modal-container ${this.state.isOpen ? 'show' : 'hide'}`}>
                <div id={'myModal'} className={'modal'}>
                    <div className={'modal-header'} onMouseDown={this.handleMoveDialog}>
                        <div className={'title'}><span>{this.state.title}</span></div>
                        <div className={'wrapper-btn'}>
                            {/*<a className={'minimize-btn'} role={'button'}>*/}
                            {/*    <i className="fa fa-window-minimize" aria-hidden="true"/>*/}
                            {/*</a>*/}
                            <a className={'expand-btn'} role={'button'} onClick={this.handleExpandDialog}>
                                <i className="far fa-window-restore"/>
                            </a>
                            <a className={'close-btn'} role={'button'} onClick={this.handleCloseDialog}>
                                <i className="fa fa-times" aria-hidden="true"/>
                            </a>
                        </div>
                    </div>
                    {this.state.content}
                    {/*<div className={'top side'}/>*/}
                    <div className={'right side'} onMouseDown={(e) => this.handleResize(e, 'right')}/>
                    <div className={'bottom side'} onMouseDown={(e) => this.handleResize(e, 'bottom')}/>
                    <div className={'left side'} onMouseDown={(e) => this.handleResize(e, 'left')}/>
                    {/*<div className={'top-left side'}/>*/}
                    {/*<div className={'top-right side'}/>*/}
                    <div className={'bottom-left side'} onMouseDown={(e) => this.handleResize(e, 'bottom-left')}/>
                    <div className={'bottom-right side'} onMouseDown={(e) => this.handleResize(e, 'bottom-right')}/>
                </div>
            </div>
        )
    }

}