import React from 'react'


const InputformCustom = (props) => {
    const { type, label, i_id, i_class, name, val, onCh } = props

    return (

        <><input type={type}
            name={name}
            id={i_id}
            className={`form-control ${i_class}`}
            onBlur={onCh}
            value={val}
            onChange={onCh} required
        />
            <label class="label-valid" htmlFor={label}>{label}</label></>
    )
}

export default InputformCustom;