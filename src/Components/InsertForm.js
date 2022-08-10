import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap'

const InsertForm = () => {

  const[asset,setAsset] = useState();
  const[assetId,setAssetId] = useState();
  const[desc,setDesc] = useState();


  function handleAsset(event){
    setAsset(event.target.value);
  }

  function handleAssetId(event){
    setAssetId(event.target.value);
  }

  function handleDesc(event){
    setDesc(event.target.value);
  }
  
  return (
    <div className='p-2 bg-slate-200 w-96 h-auto items-center justify-center'>
      <Form>
        <Form.Label>Name</Form.Label>
        <Form.Control className='mt-4' type='text' value={asset} onChange={handleAsset} />
        <Form.Label className='mt-4'>Asset_id</Form.Label>
        <Form.Control type='text' value={assetId} onChange={handleAssetId} />
        <Form.Label className='mt-4'>Description</Form.Label>
        <Form.Control  componentClass="textarea" bsSize="large" rows="20"  value={desc} onChange={handleDesc} />
        <Button className='mt-2' type='submit'>Add</Button>
      </Form>
    </div>
  )
}

export default InsertForm