import React, { useState } from 'react'
import { Form } from 'react-bootstrap'

const InsertForm = () => {

  const[asset,setAsset] = useState();

  function handleAsset(event){
    setAsset(event.target.value);
  }

  
  return (
    <div className='p-2 bg-slate-200 w-80 h-36'>
      <Form>
        <Form.Label>Name</Form.Label>
        <Form.Control type='text' value={asset} onChange={handleAsset} />
      </Form>
    </div>
  )
}

export default InsertForm