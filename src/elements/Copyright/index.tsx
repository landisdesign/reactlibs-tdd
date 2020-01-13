import React from 'react';
import styles from './Copyright.module.scss';

const Copyright: React.FC = () => <div className={styles.copyright}>Copyright ©{(new Date()).getFullYear()}</div>;

export default Copyright;
