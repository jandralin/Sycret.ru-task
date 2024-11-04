import { useState } from 'react';

const useFormValidation = () => {
    const [errors, setErrors] = useState({});

    const validate = (values, field = null) => {
        const newErrors = { ...errors };
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phoneMask = /^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/;

        const validateField = (key, value) => {
            switch (key) {
                case 'Email':
                    if (!emailRegex.test(value)) {
                        newErrors.Email = 'Неверный формат email';
                    } else {
                        delete newErrors.Email;
                    }
                    break;
                case 'Phone':
                    if (!phoneMask.test(value)) {
                        newErrors.Phone = 'Неверный формат телефона';
                    } else {
                        delete newErrors.Phone;
                    }
                    break;
                case 'PPhone':
                    if (values.IsGift && !phoneMask.test(value)) {
                        newErrors.PPhone = 'Неверный формат телефона плательщика';
                    } else {
                        delete newErrors.PPhone;
                    }
                    break;
                default:
                    break;
            }
        };

        if (field) {
            validateField(field, values[field]);
        } else {
            Object.keys(values).forEach((key) => validateField(key, values[key]));
        }

        setErrors(newErrors);
        return newErrors;
    };

    return { errors, validate };
};

export default useFormValidation;
