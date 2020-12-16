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
            isOpen: true,
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

    handleExpandDialog = (e) => {
        e.preventDefault();
        let $modal = $('#myModal');
        if ($modal) {
            if (Math.floor($modal.width()) === window.innerWidth || Math.ceil($modal.width()) === window.innerWidth) {
                $modal.css({
                    top: '10%',
                    left: window.innerWidth / 2 - 500 / 2,
                    width: '500px',
                    height: 'auto'
                });
            } else {
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
        let minHeight = +$modal.css('min-height').replace(/\D/g, '');
        let maxLeft = $modal.position().left + $modal.width() - minWidth;
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
        let resize = (e, direction) => {
            offsetX = startPosX - e.clientX;
            offsetY = startPosY - e.clientY;
            startPosX = e.clientX;
            startPosY = e.clientY;
            switch (direction) {
                case 'left':
                    if ($modal.position().left > 0)
                        resizeLeft(offsetX);
                    else {
                        console.log(offsetX);
                        $modal.css({
                            left:0,
                            width:$modal.width(),
                            height:$modal.height()
                        });
                        if (offsetX <= 0) {
                            resizeLeft(offsetX);
                        }
                    }
                    break;
                case 'right':
                    resizeRight(-offsetX);
                    break;
                case 'bottom':
                    resizeBottom(-offsetY);
                    break;
                case 'bottom-left':
                    resizeLeft(offsetX);
                    resizeBottom(-offsetY);
                    break;
                case 'bottom-right':
                    resizeRight(-offsetX);
                    resizeBottom(-offsetY);
                    break

            }
        };
        let limitInViewPort = () => {
            if ($modal.position().left < 0)
                $modal.css({
                    left: 0,
                    width: $modal.width(),
                    height: $modal.height()
                });
            // if ($modal.position().top > (document.documentElement.clientHeight - $modal.height()))
            //     $modal.css({
            //         top: document.documentElement.clientHeight - $modal.height()
            //     });
            // if ($modal.position().left < -(document.documentElement.clientWidth / 2 - $modal.width() / 2))
            //     $modal.css({
            //         left: -(document.documentElement.clientWidth / 2 - $modal.width() / 2)
            //     });
            // if ($modal.position().left > (document.documentElement.clientWidth / 2 - $modal.width() / 2))
            //     $modal.css({
            //         left: document.documentElement.clientWidth / 2 - $modal.width() / 2
            //     });
        };
        $(document).on('mousemove', function (e) {
            resize(e, direction);
            limitInViewPort();
        }).mouseup(function () {
            $(this).off('mousemove')
        });
    };

    render() {
        return (
            <div className={`modal-container ${this.state.isOpen ? 'enable' : 'hide'}`}>
                <div id={'myModal'} className={'modal'}>
                    <div className={'modal-header'} onMouseDown={this.handleMoveDialog}>
                        <div className={'title'}><span>Modal header</span></div>
                        <div className={'wrapper-btn'}>
                            <a className={'minimize-btn'} role={'button'}>
                                <i className="fa fa-window-minimize" aria-hidden="true"/>
                            </a>
                            <a className={'expand-btn'} role={'button'} onClick={this.handleExpandDialog}>
                                <i className="far fa-window-restore"/>
                            </a>
                            <a className={'close-btn'} role={'button'} onClick={this.handleCloseDialog}>
                                <i className="fa fa-times" aria-hidden="true"/>
                            </a>
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
                        <button onClick={this.handleCloseDialog}>Close</button>
                        <button>Submit</button>
                    </div>
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