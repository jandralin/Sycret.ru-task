import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import InputMask from 'react-input-mask';
import useFormValidation from '../../hooks/useFormValidation';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import api from '../../api/api';
import * as styles from "./ContactForm.module.css"

const ContactForm = () => {
	const { id, tableName, primaryKey, price, summa } = useParams();

	const [name, setName] = useState('');
	const [phone, setPhone] = useState('');
	const [email, setEmail] = useState('');
	const [message, setMessage] = useState('');
	const [isGift, setIsGift] = useState(false);
	const [pName, setPName] = useState("");
	const [pPhone, setPPhone] = useState("");
	const navigate = useNavigate();
	const { errors, validate } = useFormValidation();
	const [errorMessage, setErrorMessage] = useState('');
	const [isSubmitEnabled, setIsSubmitEnabled] = useState(false);

	const handleBlur = (field, value) => {
		validate({
			Email: email,
			Phone: phone,
			PPhone: pPhone,
			IsGift: isGift
		}, field);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		const formattedName = name.trim();
		const formattedEmail = email.trim();
		const formattedMessage = message.trim();
		const formattedPName = pName.trim();
		const formattedPhone = phone.replace(/\D/g, '').slice(-10); // Получаем последние 10 цифр
		const formattedPPhone = isGift ? pPhone.replace(/\D/g, '').slice(-10) : "";
		const data = {
			Id: Number(id),
			TableName: tableName,
			PrimaryKey: primaryKey,
			Price: Number(price),
			Summa: Number(summa),
			ClientName: formattedName,
			Phone: formattedPhone,
			Email: formattedEmail,
			PaymentTypeId: 2,
			UseDelivery: 0,
			DeliveryAddress: "",
			IsGift: isGift ? 1 : 0,
			MsgText: formattedMessage,
			PName: isGift ? formattedPName : "",
			PPhone: isGift ? formattedPPhone : "",
		};
		try {
			await api.osSale(data);
			navigate('/payment');
		} catch (error) {
			console.error('Ошибка при отправке данных:', error);
			setErrorMessage('Ошибка при отправке данных. Попробуйте снова.');
		}
	};

	useEffect(() => {
		const areAllFieldsFilled = name && phone && email && (!isGift || (pName && pPhone));
		const hasNoErrors = Object.keys(errors).length === 0;
		setIsSubmitEnabled(areAllFieldsFilled && hasNoErrors);
	}, [name, phone, email, pName, pPhone, isGift, errors]);

	useEffect(() => {
		if (errorMessage) {
			const timer = setTimeout(() => {
				setErrorMessage('');
			}, 3000);
			return () => clearTimeout(timer);
		}
	}, [errorMessage]);

	return (
		<div className={styles.container}>
			<ErrorMessage message={errorMessage} />
			<form onSubmit={handleSubmit} className={styles.form}>
			
				<div >	
					<h2>Заполните форму</h2>
					<div className={styles.formItem}>
						<label htmlFor="name" >Имя*</label>
						<input
							className={styles.itemInput}
							id="name"
							value={name}
							onChange={(e) => setName(e.target.value)}
							placeholder="Имя"
							required
						/>
					</div>
					<div className={styles.formItem}>
						<label htmlFor="phone" >Телефон*</label>
						<InputMask
							className={styles.itemInput}
							id="phone"
							mask="+7 (999) 999-99-99"
							value={phone}
							onChange={(e) => setPhone(e.target.value)}
							onBlur={() => handleBlur('Phone', phone)}
							placeholder="+7 (___) ___-__-__"
							required
						/>
						
					</div>
					{errors.Phone && <p className={styles.errorMessage}>{errors.Phone}</p>}
					<div className={styles.formItem}>
						<label htmlFor="email" >Email*</label>
						<input
							className={styles.itemInput}
							id="email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							onBlur={() => handleBlur('Email', email)}
							placeholder="Почта"
							required
						/>
						
					</div>{errors.Email && <p className={styles.errorMessage}>{errors.Email}</p>}
					<div className={styles.formItem}>
						<label htmlFor="message" >Сообщение</label>
						<textarea
							className={`${styles.itemInput} ${styles.messageInput}`}
							id="message"
							value={message}
							onChange={(e) => setMessage(e.target.value)}
							placeholder="Сообщение"
						/>
					</div>
					<div className={styles.formCheckbox}>
					<p>Покупаете сертификат в подарок?</p>
					<label className={styles.checkboxLabel}>Да</label>
							<input
								className={styles.checkboxInput}
								type="checkbox"
								checked={isGift}
								onChange={() => setIsGift(!isGift)}
							/>
							
						
					</div>
					{isGift && (
						<>
							<div className={styles.formItem}>
								<label htmlFor="pName" >Имя плательщика*</label>
								<input
									className={styles.itemInput}
									id="pName"
									value={pName}
									onChange={(e) => setPName(e.target.value)}
									placeholder="Имя плательщика"
									required
								/>
							</div>
							<div className={styles.formItem}>
								<label htmlFor="pPhone" >Телефон плательщика*</label>
								<InputMask
									className={styles.itemInput}
									id="pPhone"
									mask="+7 (999) 999-99-99"
									value={pPhone}
									onChange={(e) => setPPhone(e.target.value)}
									onBlur={() => handleBlur('PPhone', pPhone)}
									placeholder="+7 (___) ___-__-__"
									required
								/>
							
							</div >{errors.PPhone && <p className={styles.errorMessage}>{errors.PPhone}</p>}
						</>
					)}</div>
				<button type="submit" disabled={!isSubmitEnabled} className={`${styles.btn} ${styles.btnSubmit}`}>Оплатить</button>

			</form>
			<button onClick={() => navigate("/")} className={`${styles.btn} ${styles.btnBack}`}>Назад</button>
		</div>
	);
};

export default ContactForm
