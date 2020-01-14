import React from 'react';

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
    return null;
}

export default ProgressIndicator;
