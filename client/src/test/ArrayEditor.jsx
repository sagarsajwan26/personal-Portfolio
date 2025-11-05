import React, { useState } from 'react'
import axios from 'axios'
  

const ArrayEditor = ({label ,id ,value}) => {
    const [dataValue, setDataValue] = useState(value?.join(','))

   
    
    const handleUpdateArrayData= async e=>{
        e.preventDefault()
             const res = await axios.put(
      'http://localhost:3000/api/v1/project/updateprojectArrayData/68c9a926f2aeef0c1962c493',
      {
          [id]:dataValue
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      }
    )
    console.log(res);
    
            
    }
  return (
    <form onSubmit={handleUpdateArrayData} >

        {/* <Input  label={label} value={dataValue} onChange={e=>setDataValue(e.target.value)} />
        <button type='submit' >Update</button> */}
    </form>
  )
}

export default ArrayEditor