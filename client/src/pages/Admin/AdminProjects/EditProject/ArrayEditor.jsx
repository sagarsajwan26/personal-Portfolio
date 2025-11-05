import React, { useState } from 'react'
import Input from '../../../../Components/input/Input'
import { useDispatch } from 'react-redux'
import { handleProjectArrayData } from '../../../../store/projects/projectThunk'
import { toast } from 'react-toastify'

const ArrayEditor = ({ label, id, value, projectId }) => {
  const [dataValue, setDataValue] = useState(value?.join(','))
  const dispatch = useDispatch()

  const handleUpdateArrayData = async e => {
    e.preventDefault()

    dispatch(handleProjectArrayData({ projectId, [id]: dataValue })).then(
      res => {
        if(res.meta.requestStatus='fulfilled'){
          toast.success(`${id} has been updated`)
        }
      }
    )
  }
  return (
    <div className='bg-white rounded-2xl shadow-lg border border-gray-100 p-8 mb-6'>
      <h3 className='text-xl font-bold text-[#424040] mb-6 capitalize'>{id}</h3>
      <form onSubmit={handleUpdateArrayData} className='space-y-6'>
        <Input
          label={label || id}
          value={dataValue}
          onChange={e => setDataValue(e.target.value)}
          className='w-full border-2 border-gray-200 rounded-xl focus:border-[#424040] focus:ring-4 focus:ring-[#424040]/10 focus:outline-none text-[#424040] bg-white px-4 py-4 text-base font-medium'
          placeholder={`Enter ${id} (comma separated)`}
        />
        <div className='pt-4 border-t border-gray-200'>
          <button 
            type='submit' 
            className='bg-[#424040] text-white hover:bg-[#2a2828] rounded-xl font-semibold py-3 px-6 transition-all duration-300'
          >
            Update {id}
          </button>
        </div>
      </form>
    </div>
  )
}

export default ArrayEditor
