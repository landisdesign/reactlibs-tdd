import React, { ImgHTMLAttributes } from 'react';
import styled, { css } from 'styled-components';

const alignments = {
    center: css`
        display: block;
        margin: 1rem auto;
    `
} as const;

/**
 * Properties for Image, in addition to those available to HTMLImageElement
 *
 *  @property align Aligns image according to the provided constant
 */
export interface ImageProps {
    align?: keyof typeof alignments;
}

const StyledImage = styled.img<ImageProps>`
    ${props => props.align ? (alignments[props.align] ?? '') : ''}
`;

const Image: React.FC<ImageProps & ImgHTMLAttributes<HTMLImageElement>> = (props) => <StyledImage {...props} />;

export default Image;
