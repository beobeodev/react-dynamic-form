import React from 'react'
import './Section.scss'
import { useForm } from 'react-hook-form'

const Section = ({ currentData }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues
  } = useForm()

  return (
    <>
      <div className='section-header'>
        <span className='section-header__title'>{currentData.title}</span>
        <span className='section-header__description'>{currentData.description}</span>
      </div>
      {currentData.questions.map((value, index) => {
        return (
          <div className='section-item'>
            <span className='section-item__question'>{value.question}</span>
            <span className='section-item__question section-item__description'>{value.description}</span>
            {value.type === 'SHORT_TEXT' ? (
              <input
                type='text'
                className='section-item__shortText'
                placeholder='Nhập chữ'
                id={value.question}
                name={value.question}
                {...register(value.question, {
                  required: {
                    value: value.required,
                    message: 'Vui lòng nhập đầy đủ thông tin'
                  }
                })}
              />
            ) : value.type === 'RADIO' ? (
              <>
                {value.options.map((optionValue, index) => {
                  return (
                    <div className='section-item__choice'>
                      <input
                        type='radio'
                        className='section-item_radio'
                        name={value.question}
                        value={optionValue.text}
                        id={optionValue.text}
                      />
                      <label htmlFor={optionValue.text} className='section-item__labelRadio'>
                        {optionValue.text}
                      </label>
                    </div>
                  )
                })}
              </>
            ) : value.type === 'NUMBER' ? (
              <>
                <input type='text' className='section-item__shortText' placeholder='Nhập số' />
              </>
            ) : (
              <>
                <textarea className='section-item__longText' placeholder='Nhập text'></textarea>
              </>
            )}
          </div>
        )
      })}
    </>
  )
}

export default Section
