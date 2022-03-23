import React, {useState, useEffect} from 'react'
import './CardForm.css'
// import api from "../api";
import {sendCard} from "../api";
import Input from '@mui/material/Input';

const label = {'aria-label': 'description'};

function CardForm() {
    const [number, setNumber] = useState('')
    const [expiry, setExpiry] = useState('')
    const [cvv, setCvv] = useState('')
    const [amount, setAmount] = useState('')
    const [numberDirty, setNumberDirty] = useState(false)
    const [expiryDirty, setExpiryDirty] = useState(false)
    const [cvvDirty, setCvvDirty] = useState(false)
    const [amountDirty, setAmountDirty] = useState(false)
    const [numberError, setNumberError] = useState('Поле не заполнено')
    const [cvvError, setCvvError] = useState('Поле не заполнено')
    const [expiryError, setExpiryError] = useState('Поле не заполнено')
    const [amountError, setAmountError] = useState('Поле не заполнено')
    const [formValid, setFormValid] = useState(false)
    useEffect(() => {
        if (numberError || cvvError || amountError || expiryError) {
            setFormValid(false)
        } else {
            setFormValid(true)
        }
    }, [numberError, expiryError, cvvError, amountError])

    function handleSubmit(event) {
        event.preventDefault()
        sendCard(amount, number, expiry, cvv)
            .then((res) => {
                console.log('RequestId:', res._id, 'Amount:', res.amount)
                // Не смог понять , как сделать , чтоб сервер отправлял только id и amount. Решил сделать на стороне клиента
            })
            .catch((err) => {
                if (err) {
                    console.log(err)
                }
            })
    }

    function formatString(e) {
        const code = e.keyCode;
        const allowedKeys = [8];
        if (allowedKeys.indexOf(code) !== -1) {
            return;
        }

        e.target.value = e.target.value.replace(
            /^([1-9]\/|[2-9])$/g, '0$1/' // 3 > 03/
        ).replace(
            /^(0[1-9]|1[0-2])$/g, '$1/' // 11 > 11/
        ).replace(
            /^([0-1])([3-9])$/g, '0$1/$2' // 13 > 01/3
        ).replace(
            /^(0?[1-9]|1[0-2])([0-9]{2})$/g, '$1/$2' // 141 > 01/41
        ).replace(
            /^([0]+)\/|[0]+$/g, '0' // 0/ > 0 and 00 > 0
        ).replace(
            /[^\d\/]|^[\/]*$/g, '' // To allow only digits and `/`
        ).replace(
            /\/\//g, '/' // Prevent entering more than 1 `/`
        );
        setExpiry(e.target.value)
        if (e.target.value.length < 7) {
            setExpiryError('Поле заполненено не правильно')
        } else {
            setExpiryError('')
        }
    }


    const blurHandler = (e) => {
        switch (e.target.name) {
            case 'number':
                setNumberDirty(true)
                break
            case 'cvv':
                setCvvDirty(true)
                break
            case 'expiry':
                setExpiryDirty(true)
                break
            case 'amount':
                setAmountDirty(true)
        }
    }

    function numberHandler(e) {
        const re = /^[0-9\b]+$/;
        if (e.target.value === '' || re.test(e.target.value)) {
            setNumber(e.target.value)
        }
        if ((e.target.value.length < 16)) {
            setNumberError('Поле заполненено не правильно')
        } else {
            setNumberError('')
        }
    }

    function cvvHandler(e) {
        const re = /^[0-9\b]+$/;
        if (e.target.value === '' || re.test(e.target.value)) {
            setCvv(e.target.value)
        }
        if (e.target.value.length < 3) {
            setCvvError('Поле заполненено не правильно')
        } else {
            setCvvError('')
        }
    }

    function amountHandler(e) {
        const re = /^[0-9\b]+$/;
        if (e.target.value === '' || re.test(e.target.value)) {
            setAmount(e.target.value)
            setAmountError('')
        } else {
            setAmountError('Поле заполнено не правильно')
        }
    }


    return (
        <form onSubmit={handleSubmit} noValidate className='form'>
            <div className='form__input-content'>
                <p className='form__title'>Введите сумму</p>
                <Input
                    type='tel'
                    value={amount}
                    name='amount'
                    onChange={e => amountHandler(e)}
                    onBlur={e => blurHandler(e)}
                    placeholder="AMOUNT"
                    required
                    inputProps={label}
                    error={amountError}

                />

                {(amountDirty && amountError) && <div style={{color: 'red'}}>{amountError}</div>}
            </div>

            <div className='form__input-content'>
                <p className='form__title'>Введите номер карты</p>
                <Input
                    type='text'
                    value={number}
                    name='number'
                    onChange={e => numberHandler(e)}
                    onBlur={e => blurHandler(e)}
                    placeholder="Card number"
                    required
                    inputProps={{label, maxLength: 16}}
                    error={numberError}
                />
                {(numberDirty && numberError) && <div style={{color: 'red'}}>{numberError}</div>}
            </div>

            <div className='form__input-content'>
                <p className='form__title'>Введите дату истечения срока карты</p>
                <Input
                    type='text'
                    value={expiry}
                    name='expiry'
                    onChange={e => formatString(e)}
                    onBlur={e => blurHandler(e)}
                    placeholder="MM/YYYY"
                    inputProps={{label, maxLength: 7}}
                    error={expiryError}
                    required
                />
                {(expiryDirty && expiryError) && <div style={{color: 'red'}}>{expiryError}</div>}
            </div>

            <div className='form__input-content'>
                <p className='form__title'>Введите cvv карты</p>
                <Input
                    type='tel'
                    value={cvv}
                    name='cvv'
                    onChange={e => cvvHandler(e)}
                    onBlur={e => blurHandler(e)}
                    placeholder="CVV"
                    maxLength="3"
                    required
                    inputProps={{label, maxLength: 3}}
                    error={cvvError}
                />
                {(cvvDirty && cvvError) && <div style={{color: 'red'}}>{cvvError}</div>}
            </div>

            <button disabled={!formValid}
                    className={`form__submit-btn ${!formValid ? `form__submit-btn_disabled` : ``}`}
                    type='submit'>Оплатить
            </button>

        </form>
    )
}

export default CardForm
