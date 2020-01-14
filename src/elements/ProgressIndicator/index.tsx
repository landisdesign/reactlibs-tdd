import React from 'react';
import styles from './ProgressIndicator.module.scss';

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
    progressColor?: string;
    backgroundColor?: string;
    width?: string;
}

const ProgressIndicator: React.FC<ProgressIndicatorProps> = (props) => {
    const {
        width
    } = props;

    const widthObject = typeof width === 'undefined' ? {} : {width};
    const style = {
        ...widthObject,
        background: background(props)
    };

    return <div className={styles.progressIndicator} style={style}></div>;
}

export default ProgressIndicator;

const background = (props:ProgressIndicatorProps): string => {
    const {
        current,
        total,
        progressColor = '#369',
        backgroundColor = '#FFF'
    } = props;

    const clampedMax = Math.max(0.0001, total); // avoid divide by zero
    const clampedMin = Math.min(Math.max(0, current), clampedMax);
    const fraction = clampedMin / clampedMax * 100;

    if (fraction < .2) {
        return backgroundColor;
    }
    if (fraction > 99.8) {
        return progressColor;
    }
    return `linear-gradient(to right, ${progressColor} ${fraction - 0.1}%, ${backgroundColor} ${fraction + 0.1}%)`;
}
