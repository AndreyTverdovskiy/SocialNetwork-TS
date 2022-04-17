import React from "react";
import s from './FormsControls.module.css'
import {Field, WrappedFieldMetaProps, WrappedFieldProps} from "redux-form";
import {FieldValidatorType} from "../../../utils/validators/validators";

type FormControlPropsType = {
    meta: WrappedFieldMetaProps
}

const FormControl: React.FC<FormControlPropsType> = ({meta: {touched, error}, children}) => {
    const hasError = touched && error
    return (
        <div className={s.formControl + " " + (hasError ? s.error : '')}>
            <div>
                {children}
            </div>
            {hasError && <span>{error}</span>}
        </div>
    )
}

export const TextArea: React.FC<WrappedFieldProps> = (props) => {
    const {input, meta, ...restProps} = props;
    return <FormControl {...props}> <textarea {...input} {...restProps}/> </FormControl>
}

export const Input: React.FC<WrappedFieldProps> = (props) => {
    const {input, meta, ...restProps} = props;
    return <FormControl {...props}> <input {...input} {...restProps}/> </FormControl>
}

export const createField = (placeholder: string | null, name: string, validators: Array<FieldValidatorType>, component: React.FC<WrappedFieldProps>, props: any = {}, text:string = '') => (
    <div>
        <Field placeholder={placeholder}
               name={name}
               validate={validators}
               component={component}
               {...props}
        /> {text}
    </div>
)

