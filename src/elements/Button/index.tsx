import React from 'react';
import styled from 'styled-components';
import { colors, fontWeight, fontSize, fontFamily, media } from '../../common/styling';

/**
 * Properties for Button, in addition to those available to HTMLButtonElement
 *
 *  @property isDefault Indicate this the default button in a list of buttons
 *  @property render If provided, overrides `children` as the content for the button
 *  @property className if provided, overrides default styling
 */
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    default?: boolean;
    render?: () => React.ReactNode;
}

const Button: React.FC<ButtonProps> = (props) => {

    if (props.className) {
        const {
            default: isDefault,
            render,
            children,
            ...htmlProps
        } = props;
        return <button {...htmlProps}>{render ? render() : children}</button>;
    }

    const {
        render,
        children
    } = props;
    return <StyledButton {...props}>{render ? render() : children}</StyledButton>;
}

export default Button;

const gradientValues = {
    plain: {
        range: [5, 10, 90, 100],
        accented: [colors.canvas, colors.accentPale, colors.accentMedium, colors.accentDark],
        standard: [colors.canvas, () => '#EEE', () => '#BBB', () => '#888']
    },
    active: {
        range: [0, 10, 90, 100],
        accented: [colors.accentDark, colors.accentPale, colors.accentMedium, colors.canvas],
        standard: [() => '#888', () => '#EEE', () => '#BBB', colors.canvas]
    }
};

const backgroundGradient = (isActive: boolean) => (props: ButtonProps) => {
    const {
        range,
        accented,
        standard
    } = gradientValues[isActive ? 'active' : 'plain'];

    let colorSet = props.default ? accented : standard;
    let steps = [];
    for (const i in range) {
        steps.push(`${colorSet[i](props)} ${range[i]}%`);
    }
    return `linear-gradient(to bottom, ${steps.join(', ')})`;
}

const StyledButton = styled.button<ButtonProps>`

    background: ${backgroundGradient(false)};
    border: 1px solid ${colors.accentMedium};
    border-radius: .25rem;
    white-space: nowrap;
    cursor: pointer;

    &:hover {
        background: ${props => props.default ? colors.accentLight(props) : '#DDD'};
    }

    &:active {
        background: ${backgroundGradient(true)};
    }

    &[disabled] {
        border: 1px solid #CCC;
        background: ${props => props.default ? '#DDD' : '#EEE'};
        color: #666;
        cursor: arrow;
    }

    ${media.desktop`
        font: ${fontWeight.bold} ${fontSize.desktop.small} ${fontFamily.sans};
    `}

    ${media.notDesktop`
        font: ${fontWeight.bold} ${fontSize.tablet.small} ${fontFamily.sans};
    `}
`;

