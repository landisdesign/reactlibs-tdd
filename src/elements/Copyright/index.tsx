import React from 'react';
import styled from 'styled-components';
import { colors, lineHeight, fontFamily, media, fontSize } from '../../common/styling';

const StyledDiv = styled.div`
    padding: 1rem;
    color: ${colors.text};
    font: 1rem/${lineHeight} ${fontFamily.sans};
    text-align: center;

    ${media.desktop`
        font-size: ${fontSize.desktop.small};
    `}

    ${media.notDesktop`
        font-size: ${fontSize.phone.small};
    `}
`;

const Copyright: React.FC = () => <StyledDiv>Copyright ©{(new Date()).getFullYear()}</StyledDiv>;

export default Copyright;
