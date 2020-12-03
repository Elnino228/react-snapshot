import React, {useState} from "react";
import './SearchForm,.scss'
import {useHistory} from 'react-router-dom';

export default function SearchForm(props) {
    let [input, setInput] = useState('');

    let handleOnChange = (e) => {
        setInput(e.target.value);
    };

    let history = useHistory();

    let handleSubmit = (e) => {
        e.preventDefault();
        e.currentTarget.reset();
        let url = `/search/${input}`;
        history.push(url);
    };

    return (
        <form
            className={'search-form'}
            onSubmit={handleSubmit}
            action="">
            <input type="text" placeholder={'Search ...'} onChange={handleOnChange} value={input}/>
            <button
                className={input.trim() ? 'active' : ''}
                disabled={!input.trim()}
            >
                <svg height="32" width="32">
                    <path
                        d="M19.427 21.427a8.5 8.5 0 1 1 2-2l5.585 5.585c.55.55.546 1.43 0 1.976l-.024.024a1.399 1.399 0 0 1-1.976 0l-5.585-5.585zM14.5 21a6.5 6.5 0 1 0 0-13 6.5 6.5 0 0 0 0 13z"
                        fill="#ffffff"
                        fillRule="evenodd"
                    />
                </svg>
            </button>
        </form>
    )
}