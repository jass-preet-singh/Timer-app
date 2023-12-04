import React from 'react';

const Button = (props) => {

    const { label, style, onClick, isLoading } = props;

    return (
        <button type="button" className={style} onClick={onClick} disabled={isLoading}>
            {isLoading ? <span>Loading... </span> : label}
        </button>
    )

}
export default Button;