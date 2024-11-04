import React from 'react'

import * as styles from "./CertificateItem.module.css"
import { Link } from 'react-router-dom'

const CertificateItem = ({ certificates }) => {
	return (
		<ul className={styles.certificateList}>
			{certificates.map(cert => (
				<li key={cert.ID} className={styles.card}>
					<h2 className={styles.itemName}>{cert.NAME}</h2>
					<div className={styles.itemContent}>
						{cert.DISCOUNT > 0 ? (
							<>
								<p className={styles.itemTotalPrice}>Цена:
									<span style={{ textDecoration: 'line-through', color: 'red' }}> {Math.floor(cert.PRICE)} ₽</span>
									<span className={styles.itemPrice}>{Math.floor(cert.SUMMA)} ₽</span>
								</p>
							</>
						) : (
							<p className={styles.itemTotalPrice}>Цена: {cert.PRICE} ₽</p>
						)}
						<p>Со скидкой {Math.floor(cert.DISCOUNT)}%</p>
					</div>
					<Link to={`/contact/${cert.ID}/${cert.TABLENAME}/${cert.PRIMARYKEY}/${cert.PRICE}/${cert.SUMMA}`}
						style={{ textDecoration: 'none' }}>
						<button className={styles.btnBuy}>Оформить
						</button>
					</Link>
				</li>
			))}
		</ul>
	)
}

export default CertificateItem


