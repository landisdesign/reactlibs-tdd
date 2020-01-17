import React from 'react';
import styled, { css } from 'styled-components';
import { fontFamily, media, fontSize } from '../../common/styling';

const textTypes = ['story'] as const;

/**
 * Defines properties for Text component
 * @property type If provided, identifies the styling for this component.
 * Currently only `story` is an option.
 * @property html If provided, overrides the children of this component with any
 * content. **This will render any text as HTML, including unsafe scripts.**
 */
export interface TextProps {
    type?: typeof textTypes[number];
    html?: string;
}


const Text: React.FC<TextProps> = (props) => {
    const {
        type,
        html,
        children
    } = props;

    return html
        ? <StyledText type={type} dangerouslySetInnerHTML={{ __html: html }} />
        : <StyledText type={type}>{children}</StyledText>
    ;
}

export default Text;

const StyledText = styled.div<TextProps>`
    ${props => props.type === 'story' ? css`
        padding-right: .5rem;
        font-family: ${fontFamily.serif};
        line-height: 2;
    ` : css`
        font-family: ${fontFamily.sans};
    `}

    ${media.desktop`
        font-size: ${fontSize.desktop.normal};
    `}

    ${media.tablet`
        font-size: ${fontSize.tablet.normal};
    `}

    ${media.phone`
        font-size: ${fontSize.phone.normal};
    `}
`;
