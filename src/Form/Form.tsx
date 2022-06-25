import { useState, useEffect } from 'react';

import Error from '../Error/Error';
import { placeholder, inputTitle, formTitle, formBTN, formErrors } from '../constants';
import { emulatedRequest } from '../utils/functions';
import Loader from '../Loader/Loader';
import Toast from '../Toast/Toast';

const Form = (): JSX.Element => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [tel, setTel] = useState<string>('');
  const [date, setDate] = useState<string>('');
  const [message, setMessage] = useState<string>('');

  const [replasedTel, setReplasedTel] = useState<string>('');

  const [nameError, setNameError] = useState<string>('');
  const [emailError, setEmailError] = useState<string>('');
  const [telError, setTelError] = useState<string>('');
  const [dateError, setDateError] = useState<string>('');
  const [messageError, setMessageError] = useState<string>('');

  const [isFormSending, setIsFormSending] = useState<boolean>(false);
  const [requestMessage, setRequestMessage] = useState<string>('');

  const handleSubmit = (): void => {
    validateForm();

    if (
      !nameError.length &&
      !emailError.length &&
      !telError.length &&
      !dateError.length &&
      !messageError.length &&
      name.length &&
      email.length &&
      tel.length &&
      date.length &&
      message.length
    ) {
      sendRequest();
    }
  };

  const sendRequest = async () => {
    setIsFormSending(true);

    const formInf = {
      name: name,
      email: email,
      tel: replasedTel,
      date: date,
      message: message,
    }

    //при необходимости раскомментировать для реального запроса
    // const res = await fetch(url, {
    //   method: 'POST',
    //   body: JSON.stringify(formInf),
    //   headers: {
    //     'Content-Type': 'application/json'
    //   }
    // });
    // const data: IResponse = await res.json();

    const data: IResponse = await emulatedRequest();
    setRequestMessage(data.message);
    if (data.status === 'success') {
      setName('');
      setEmail('');
      setTel('');
      setDate('');
      setMessage('');
    } 

    setIsFormSending(false);

    setTimeout(() => {
      setRequestMessage('');
    }, 5000);
  };

  const validateForm = (): void => {
    if (!name.length) {
      setNameError(formErrors.notFilled);
    }
    if (!email.length) {
      setEmailError(formErrors.notFilled);
    }
    if (!tel.length) {
      setTelError(formErrors.notFilled);
    }
    if (!date.length) {
      setDateError(formErrors.notFilled);
    }
    if (!message.length) {
      setMessageError(formErrors.notFilled);
    }
  };

  const setCurrentDate = (): string => {
    const date = new Date().toISOString();
    return date.split('T')[0];
  };

  const currentDate = setCurrentDate();

  const validateName = (value: string): void => {
    setName(value);
    const nameArr = value.split(' ');

    if (!/^[a-zA-Z\s]+$/.test(value)) {
      setNameError(formErrors.alphabet);
    } else if (nameArr.length !== 2) {
      setNameError(formErrors.notTwoWords);
    } else if (nameArr[0].length < 3 && nameArr[1].length < 3) {
      setNameError(formErrors.nameSurnameLength);
    } else if (nameArr[0].length < 3 || nameArr[0].length > 30) {
      setNameError(formErrors.nameLength);
    } else if (nameArr[1].length < 3 || nameArr[1].length > 30) {
      setNameError(formErrors.surnameLength);
    } else {
      setNameError('');
    }
  };

  const validateMessage = (value: string): void => {
    setMessage(value);

    if (value.length < 10 || value.length > 300) {
      setMessageError(formErrors.messageLength);
    } else {
      setMessageError('');
    }
  };

  const validateTel = (event: any): void => {
    const element = event.target;
    const pattern: string = element.dataset.phonePattern;
    const def = pattern.replace(/\D/g, '');

    let val = event.target.value.replace(/\D/g, '');
    let i = 0;

    if (def.length >= val.length) val = def;

    const newVal = pattern.replace(/./g, function (char) {
      return /[_\d]/.test(char) && i < val.length ? val.charAt(i++) : i >= val.length ? '' : char;
    });

    setTel(newVal);
    setReplasedTel(val);

    if (val.length < 11) {
      setTelError(formErrors.tel);
    } else {
      setTelError('');
    }
  };

  useEffect((): void => {
    const telInput = document.querySelector('[data-phone-pattern]');
    for (const ev of ['input', 'blur', 'focus']) {
      telInput!.addEventListener(ev, validateTel);
    }
  }, []);

  const validateEmail = (value: string): void => {
    setEmail(value);

    const regex =
      /^((([^<>()[\]\.,;:\s@\"]{1,})+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@((([^<>()[\]\.,;:\s@\"]{1,})+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if (!value.length) {
      setEmailError(formErrors.email);
    } else if (!regex.test(value)) {
      setEmailError(formErrors.email);
    } else {
      setEmailError('');
    }
  };

  const validateDate = (value: string): void => {
    setDate(value);

    if (value.length < 10) {
      setDateError(formErrors.date);
    } else {
      setDateError('');
    }
  };

  return (
    <>
    <form className="form">
      <div className="form-title">{formTitle}</div>

      <label className="form-label">
        {inputTitle.name}
        <input
          className={!!nameError.length ? 'form-input error' : 'form-input'}
          type="text"
          placeholder={placeholder.name}
          value={name}
          onChange={(e) => {
            validateName(e.target.value.toUpperCase());
          }}
        ></input>
        {!!nameError.length && <Error>{nameError}</Error>}
      </label>
      <label className="form-label">
        {inputTitle.email}
        <input
          className={!!emailError.length ? 'form-input error' : 'form-input'}
          type="email"
          placeholder={placeholder.email}
          value={email}
          onChange={(e) => {
            validateEmail(e.target.value);
          }}
          formNoValidate
        ></input>
        {!!emailError.length && <Error>{emailError}</Error>}
      </label>
      <label className="form-label">
        {inputTitle.tel}
        <input
          className={!!telError.length ? 'form-input error' : 'form-input'}
          type="text"
          data-phone-pattern="+7 (___) ___-__-__"
          placeholder={placeholder.tel}
          value={tel}
        ></input>
        {!!telError.length && <Error>{telError}</Error>}
      </label>
      <label className="form-label">
        {inputTitle.birthdate}
        <input
          className={!!dateError.length ? 'form-input error' : 'form-input'}
          type="date"
          placeholder={placeholder.birthdate}
          value={date}
          onChange={(e) => validateDate(e.target.value)}
          max={currentDate}
        ></input>
        {!!dateError.length && <Error>{dateError}</Error>}
      </label>
      <label className="form-label textarea-label">
        {inputTitle.message}
        <textarea
          className={!!messageError.length ? 'form-input textarea error' : 'form-input textarea'}
          placeholder={placeholder.message}
          value={message}
          onChange={(e) => {
            validateMessage(e.target.value);
          }}
        ></textarea>
        {!!messageError.length && <Error>{messageError}</Error>}
      </label>

      <button className="formBTN" type="button" onClick={handleSubmit}>
        {formBTN}
      </button>
    </form>
    {!!requestMessage.length && <Toast message={requestMessage}></Toast>}
    {isFormSending && <Loader></Loader>}
    </>    
  );
};

export default Form;
