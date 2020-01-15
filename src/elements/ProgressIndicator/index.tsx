import React from 'react';
import styled, { css } from 'styled-components';
import { colors } from '../../common/styling';

/**
 * Properties for ProgressIndicator.
 *
 * @property current The amount of progress to be indicated. It will be clamped
 * between 0 and `total`, inclusive.
 * @property total The total amount of progress possible. It should be positive.
 * @property progressColor A valid CSS color for the area indicating completed
 * progress. If not provided, a value of `#369` will be used.
 * @property backgroundColor A valid CSS color for the area indicating progress
 * not yet complerted. If not provided, a value of `#FFF` will be used.
 * @property width The CSS width of the progress indicator. If not provided, it
 * will be as wide as the parent container.
 */
export interface ProgressIndicatorProps {
    current: number;
    total: number;
    width?: string;
}

const StyledDiv = styled.div<ProgressIndicatorProps>`
    ${props => props.width ? css`width: ${props.width};` : ''}
    background: ${background};
`;

const ProgressIndicator: React.FC<ProgressIndicatorProps> = (props) => <StyledDiv {...props} />;

export default ProgressIndicator;

function background(props:ProgressIndicatorProps) {
    const {
        current,
        total,
    } = props;

    const clampedMax = Math.max(0.0001, total); // avoid divide by zero
    const clampedMin = Math.min(Math.max(0, current), clampedMax);
    const fraction = clampedMin / clampedMax * 100;

    if (fraction < .2) {
        return css`${colors.canvas}`;
    }
    if (fraction > 99.8) {
        return css`${colors.accentDark}`;
    }
    return css`linear-gradient(to right, ${colors.accentDark} ${fraction - 0.1}%, ${colors.canvas} ${fraction + 0.1}%)`;
}
