import React from 'react';
import styled from 'styled-components';
import { fontWeight, fontFamily, lineHeight, media, fontSize } from '../../common/styling';

interface TitleProps {
    packed?: boolean;
}

const Title: React.FC<TitleProps> = (props) => <StyledTitle {...props}/>;

export default Title;

const StyledTitle = styled.h1<TitleProps>`
    padding: 0;
    font-weight: ${fontWeight.bold};
    font-family: ${fontFamily.sans};
    margin: ${props => props.packed ? '0' : '.25em 0'};
    line-height: ${props => props.packed ? '1' : lineHeight};

    ${media.phone`
        font-size: ${fontSize.phone.title};
    `}

    ${media.tablet`
        font-size: ${fontSize.tablet.title};
    `}

    ${media.desktop`
        font-size: ${fontSize.desktop.title};
    `}
`;
