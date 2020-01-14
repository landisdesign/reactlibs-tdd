import React from 'react';
import styles from './Text.module.scss';

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
        type = 'default',
        html,
        children
    } = props;

    const className = styles[type] ?? styles.default;

    return html
        ? <div className={className} dangerouslySetInnerHTML={{ __html: html }} />
        : <div className={className}>{children}</div>
    ;
}

export default Text;
