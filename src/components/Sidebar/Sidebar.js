import React, {Component} from "react";
import './Sidebar.scss';

let that;

export default class Sidebar extends Component {
    constructor(props) {
        super(props);
        that = this;
    }

    openNav = () => {
        document.getElementById("mySidenav").style.width = "250px";
        document.getElementsByClassName("app")[0].style.marginLeft = "250px";
        document.getElementsByClassName("header")[0].style.marginLeft = "250px";
        document.getElementsByClassName("sidebar-mask")[0].style.width = "100vw";
    };

    closeNav = () => {
        document.getElementById("mySidenav").style.width = "0";
        document.getElementsByClassName("app")[0].style.marginLeft = "0";
        document.getElementsByClassName("header")[0].style.marginLeft = "0";
        document.getElementsByClassName("sidebar-mask")[0].style.width = "0";
    };

    render() {
        return (
            <>
                <div className={'sidebar-mask'} onClick={this.closeNav}/>
                <div id="mySidenav" className="sidenav">
                    <a href="#" className="sidebar-close-btn" onClick={this.closeNav}>&times;</a>
                    <a href="#">About</a>
                    <a href="#">Services</a>
                    <a href="#">Clients</a>
                    <a href="#">Contact</a>
                </div>

            </>
        )
    }
}

export function openSidebar() {
    that.openNav();
}