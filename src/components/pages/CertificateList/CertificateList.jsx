import React, { useEffect, useState } from 'react'
import api from '../../api/api';
import CertificateItem from '../CertificateItem/CertificateItem';
import * as styles from "./CertificateList.module.css"
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import ErrorMessage from '../ErrorMessage/ErrorMessage';

const CertificateList = () => {
	const [certificates, setCertificates] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState(null);

	const fetchCertificates = async () => {
		try {
			const result = await api.getGoodList();
			if (result.result === 0) {
				setCertificates(result.data);
			} else {
				setError(`Ошибка API: ${result.resultdescription}`);
			}
		} catch (error) {
			setError(`Ошибка при получении сертификатов: ${error.message}`);
		} finally {
			setIsLoading(false); 
		}
	};

	useEffect(() => {
		fetchCertificates();
	}, []);


	return (
		<div className={styles.container}>
			<h1 className={styles.header}>Подарочные сертификаты</h1>	
			{isLoading && <LoadingSpinner />}
			{error && <ErrorMessage message={error} />}
			<CertificateItem certificates={certificates} />
		</div>
	);
}

export default CertificateList
