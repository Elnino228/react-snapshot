import React, {useEffect} from "react";
import {useLocation} from 'react-router-dom';
import $ from 'jquery';

export default function ScrollToTop() {
    const {pathname} = useLocation();
    useEffect(() => {
        window.scrollTo(0, 0);
        const btn = $('.btnToTop');
        const container = $('.gallery').parent();
        container.scroll(() => {
            if (container.scrollTop() > 300) {
                btn.addClass('show');
            } else {
                btn.removeClass('show');
            }
        });

        btn.on('click', (e) => {
            e.preventDefault();
            container.animate({scrollTop: 0}, '300');
        });

        return () => {
            btn.removeClass('show');
            container.off('scroll');
            btn.off('click');
        }
    }, [pathname]);

    return (
        <button id={'myBtnToTop'} className={'btnToTop'}/>
    );
}