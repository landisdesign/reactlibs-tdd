import React from "react";
import styles from './Button.module.scss';

/**
 * Properties for Button, in addition to those available to HTMLButtonElement
 *
 *  @property isDefault Indicate this the default button in a list of buttons
 *  @property render If provided, overrides `children` as the content for the button
 *  @property className if provided, overrides default styling
 */
export interface ButtonProps {
    isDefault?: boolean;
    render?: () => React.ReactNode;
}

const Button: React.FC<ButtonProps & React.ButtonHTMLAttributes<HTMLButtonElement>> = (props) => {
    const {
        isDefault = false,
        className = styles[isDefault ? 'default' : 'button'],
        render,
        children,
        ...passedProps
    } = props;

    return <button className={className} {...passedProps}>{ render ? render() : children}</button>;
}

export default Button;