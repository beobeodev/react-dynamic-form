import React, { useEffect, useState } from 'react'
import './Form.scss'
import { useForm } from 'react-hook-form'

const Form = ({ data }) => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm()

  const [indexSection, setIndexSection] = useState(0)
  const [currentData, setCurrentData] = useState(data.sections[0])

  useEffect(() => {
    setCurrentData(data.sections[indexSection])
  }, [indexSection, data])

  const onClickButton = (event, type) => {
    event.preventDefault()
    if (type === 'back') {
      setIndexSection(prev => prev - 1)
    }
  }

  const onSubmit = formData => {
    console.log(formData)
    if (indexSection < data.sections.length - 1) {
      setIndexSection(prev => prev + 1)
    } else {
    }
  }

  const ErrorMessage = ({ name }) => {
    if (errors[name]) {
      console.log(errors[name])
      return <span className='form_error'>{errors[name].message}</span>
    }
    return null
  }

  return (
    <div className='form_container'>
      {/* <img
        src='https://scontent.fdad2-1.fna.fbcdn.net/v/t39.30808-6/238408739_611158610289566_8891780197852616951_n.jpg?_nc_cat=101&ccb=1-5&_nc_sid=e3f864&_nc_ohc=0gc_l1lFf-0AX-qlsLk&_nc_ht=scontent.fdad2-1.fna&oh=00_AT9bQUPNBhI-IGscLQfAAgIHsdsOeLxWXd4jml1yd6q7QQ&oe=61D21117'
        alt='GDSC'
        className='test'
      /> */}
      <form noValidate onSubmit={handleSubmit(onSubmit)}>
        <div className='form-main'>
          <span className='form-main__title'>{data.title}</span>
          <span className='form-main__description'>{data.description}</span>
        </div>
        {/* <Section currentData={currentData} /> */}
        <div className='form-header'>
          <span className='form-header__title'>{currentData.title}</span>
          <span className='form-header__description'>{currentData.description}</span>
        </div>
        {currentData.questions.map((value, index) => {
          return (
            <div className='form-item'>
              <span className='form-item__question'>{value.question}</span>
              <span className='form-item__question form-item__description'>{value.description}</span>
              {value.type === 'SHORT_TEXT' ? (
                <>
                  <input
                    type='text'
                    className='form-item__shortText'
                    placeholder='Nhập chữ'
                    {...register(value.question, {
                      required: {
                        value: value.required,
                        message: 'Vui lòng nhập đầy đủ thông tin'
                      }
                    })}
                  />
                  <ErrorMessage name={value.question} />
                </>
              ) : value.type === 'RADIO' ? (
                <>
                  {value.options.map((optionValue, index) => {
                    return (
                      <div className='form-item__choice'>
                        <input
                          type='radio'
                          className='form-item_radio'
                          name={value.question}
                          value={optionValue.text}
                          id={optionValue.text}
                          {...register(value.question, {
                            required: {
                              value: value.required,
                              message: 'Vui lòng chọn'
                            }
                          })}
                          checked={value.defaultAnswer === index + 1 ? true : null}
                        />
                        <label htmlFor={optionValue.text} className='form-item__labelRadio'>
                          {optionValue.text}
                        </label>
                      </div>
                    )
                  })}
                  <ErrorMessage name={value.question} />
                </>
              ) : value.type === 'NUMBER' ? (
                <>
                  <input
                    type='number'
                    className='form-item__shortText'
                    placeholder='Nhập số'
                    {...register(value.question, {
                      required: {
                        value: value.required,
                        message: 'Vui lòng nhập đầy đủ thông tin'
                      },
                      validate: {
                        [value.question]: value => /^[1-7]$/.test(value) || 'Số phải nằm trong khoảng 1-7'
                      }
                    })}
                  />
                  <ErrorMessage name={value.question} />
                </>
              ) : (
                <>
                  <textarea
                    className='form-item__longText'
                    placeholder='Nhập chữ'
                    {...register(value.question, {
                      required: {
                        value: value.required,
                        message: 'Vui lòng nhập đầy đủ thông tin'
                      },
                      validate: val => {
                        if (val.length < value.attrs.minLength || val.length > value.attrs.maxLength) {
                          return `Vui lòng nhập thông tin có độ dài từ ${value.attrs.minLength} - ${value.attrs.maxLength}`
                        }
                      }
                    })}
                  ></textarea>
                  {value.question[value.question.length - 1] === '.' ? (
                    <ErrorMessage name={value.question.slice(0, -1)} />
                  ) : (
                    <ErrorMessage name={value.question} />
                  )}
                </>
              )}
            </div>
          )
        })}
        {indexSection > 0 && (
          <button className='form_buttonBack' onClick={e => onClickButton(e, 'back')}>
            Mục trước
          </button>
        )}
        {indexSection === data.sections.length - 1 ? (
          <button className='form_buttonNext' type='submit'>
            Gửi
          </button>
        ) : (
          <button className='form_buttonNext' type='submit'>
            Mục sau
          </button>
        )}
      </form>
    </div>
  )
}

export default Form
