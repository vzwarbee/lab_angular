import React from 'react'

export const InputCustom = (props) => {
    const { type, label, i_id, i_class, name, val, onCh, onBlr } = props
    return (
        <div className={`form-floating mt-3 ${!i_class ? 'mb-1' : i_class}`}>
            <input
                type={type}
                value={val}
                name={name}
                className={`form-control ${i_class}`}
                id={i_id} placeholder={label}
                onChange={onCh}
                onBlur={onBlr}
            />
            <label htmlFor={label} className="form-label">{label}</label>
        </div>
    );
};



export default InputCustom;