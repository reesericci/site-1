import { useState, uesEffet, useEffect } from 'react';
import styles from './Text.module.css';

function defaultValidate (text) {
    return text?.length;
}

export default function Text (props) {
    const { validate: _validate, name, description, help, placeholder, data, setData, initialData, wrapperClass, width, margin, type, id: _id, required } = props;

    const id = _id ?? name?.toLowerCase()?.split(' ')?.join('-')?.split('')?.filter(a => `abcdefghijklmnopqrstuvwxyz1234567890-_`.includes(a))?.join('') ?? 'error';
    const validate = data => (_validate ?? defaultValidate)() && (required ? data?.length : true);

    const [localData, setLocalData] = useState(initialData ?? '');
    const [valid, setValid] = useState(false);
    const [partiallyValid, setPartiallyValid] = useState(false);

    return (
        <>
            <div className={[wrapperClass, styles.wrapper, valid && styles.isValid, partiallyValid && !valid && styles.isPartiallyValid].filter(l => l).join(' ')} style={{
                width: width ?? '300px',
                margin: margin ?? '0px',
                boxSizing: 'border-box'
            }}>
                <label for={id}>{name} {help && <span><span aria-label={help} tabIndex={0}>?</span></span>}</label>
                <p>{description}</p>
                <input name={id} id={id} type={type} value={data} onChange={e => {
                    setLocalData(e.target.value);
                    if (setData instanceof Function) setData(e.target.value);
                    setPartiallyValid(validate(e.target.value));
                }} onBlur={() => {
                    setValid(validate(localData));
                }} onFocus={() => {
                    setValid(false);
                }} placeholder={placeholder}></input>
                <span>✓</span>
            </div>
        </>
    )
}