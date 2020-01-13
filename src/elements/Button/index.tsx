import React from "react";
import styles from './Button.module.scss';

/**
 * Properties for Button
 *
 *  @property type If present, overrides the default `button` type
 *  @property disabled If present and not false or 'false', disables the button
 *  @property isDefault Indicate this the default button in a list of buttons
 *  @property onClick Event handler for `click` event.
 *  @property render If provided, overrides `children` as the content for the button
 *  @property style If provided, additional styling for the button
 *  @property className if provided, additional classes to add to the button
 */
export interface ButtonProps {
    type?: 'button' | 'submit';
    disabled?: boolean | string;
    isDefault: boolean;
    onClick?: React.MouseEventHandler;
    render?: () => React.ReactNode;
    style?: React.CSSProperties;
    className?: string;
}

export const Button: React.FC<ButtonProps> = (props) => {
    return null;
}
