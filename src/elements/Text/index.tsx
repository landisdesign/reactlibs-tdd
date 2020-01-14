import React from 'react';

const textTypes = ['story'] as const;

export interface TextProps {
    type?: typeof textTypes[number];
    html?: string;
}

const Text: React.FC<TextProps> = (props) => {
    return null;
}

export default Text;
