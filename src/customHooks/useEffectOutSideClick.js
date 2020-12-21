import {useEffect} from "react";
import $ from 'jquery';

export default function useEffectOutSideClick(handleClickCallback, targetIds = [], deps = []) {


    useEffect(() => {
        const handleClickOutside = (e) => {
            if (typeof targetIds === 'string') {
                let $wrapper = $(`#targetIds`);
                if (!$wrapper.is(e.target) && $wrapper.has(e.target).length === 0)
                    handleClickCallback && handleClickCallback();
            } else {
                if (targetIds && Array.isArray(targetIds) && targetIds.length && targetIds.every(id => {
                    let $wrapper = $(`#${id}`);
                    return !$wrapper.is(e.target) && $wrapper.has(e.target).length === 0
                })) {
                    handleClickCallback && handleClickCallback();
                }
            }

        };

        document.addEventListener("mouseup", handleClickOutside);

        return () => document.removeEventListener("mouseup", handleClickOutside);
    }, deps)

}