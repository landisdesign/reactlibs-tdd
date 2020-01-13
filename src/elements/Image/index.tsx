import React from 'react';
import styles from './Image.module.scss';

const ALIGN_VALUES = ['center'] as const;

/**
 * Properties for Image, in addition to those available to HTMLImageElement
 *
 *  @property align Aligns image according to the provided constant
 */
export interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
    align?: typeof ALIGN_VALUES[number];
}

const Image: React.FC<ImageProps> = (props) => {
    const {
        align,
        className,
        ...passedProps
    } = props;

    let combinedClasses = [];
    if (className) {
        combinedClasses.push(className);
    }
    if (align) {
        combinedClasses.push(styles[align]);
    }
    const classProp = combinedClasses.length ? {className: combinedClasses.join(' ')} : {};

    const imgProps = {...passedProps, ...classProp};

    return <img {...imgProps}/>;
}

export default Image;
