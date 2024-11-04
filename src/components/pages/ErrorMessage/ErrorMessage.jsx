import React from 'react';
import * as styles from "./ErrorMessage.module.css"

const ErrorMessage = ({ message }) => {
    if (!message) return null; 

    return (
			<div className={styles.alertDanger} role="alert">
			{message}
	</div>
    );
};

export default ErrorMessage;
