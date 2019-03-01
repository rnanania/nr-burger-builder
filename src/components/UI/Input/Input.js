import React from 'react';
import './Input.css';

const input = (props) => {
    let inputElement = null;
    let inputClasses = ['InputElement'];
    if(props.invalid && props.touched){
        inputClasses.push('invalid');
    }
    
    switch (props.elementType) {
        case ('input'):
            inputElement = <input className={inputClasses.join(' ')}
                {...props.elementConfig} value={props.value} onChange={props.changed}/>;
            break;
        case ('textarea'):
            inputElement = <textarea className={inputClasses.join(' ')}
                {...props.elementConfig} value={props.value} onChange={props.changed}/>;
            break;
        case ('select'):
            inputElement = (
                <select className="InputElement" 
                {...props.elementConfig} value={props.value} onChange={props.changed}>
                    {props.elementConfig.options.map(option => (
                        <option key={option.value} value={option.value}>{option.displayName}</option>
                    ))}
                </select>
            );
            break;
        default:
            inputElement = <input className={inputClasses.join(' ')}
                {...props.elementConfig} value={props.value} onChange={props.changed}/>;
            break;
    }
    return (
        <div className="Input">
            <label>{props.label}</label>
            {inputElement}
        </div>
    );
};

export default input;