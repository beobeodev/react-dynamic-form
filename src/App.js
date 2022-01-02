import React, { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'
import Form from './pages/form/Form'

const App = () => {
  const [data, setData] = useState('')

  useEffect(() => {
    axios
      .get(
        'https://gist.githubusercontent.com/bittermeatball/7854f3d7950469b0203a068fcaf27908/raw/1de87462c4f8c2fd0bfb9d452b246c92697b2eee/sample.json'
      )
      .then(res => {
        setData(res.data)
      })
  })

  return <div className='App'>{data === '' ? <></> : <Form data={data} />}</div>
}

export default App
