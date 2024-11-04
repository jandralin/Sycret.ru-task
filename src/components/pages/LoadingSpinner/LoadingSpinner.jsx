import React from 'react'
import * as styles from "./LoadingSpinner.module.css"

const LoadingSpinner = () => {
	return (
		<div className={styles.spinnerBorder} role="status">
			<span className={styles.srOnly}>Loading...</span>
		</div>
	)
}

export default LoadingSpinner
