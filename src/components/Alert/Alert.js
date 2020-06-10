import React from 'react';
import PropTypes from 'prop-types';

import styles from './Alert.module.css';

const Alert = ({ message }) => <p className={styles.alert}>{message}!</p>;

Alert.propTypes = {
  message: PropTypes.string.isRequired,
};

export default Alert;
