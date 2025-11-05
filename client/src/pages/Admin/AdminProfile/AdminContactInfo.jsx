import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaHome, FaCity, FaFlag } from 'react-icons/fa'
import Loading from '../../../Components/loading/Loading'
import Button from '../../../Components/input/Button'
import Input from '../../../Components/input/Input'
import { updateUserContactInfo } from '../../../store/user/userThunk'

const AdminContactInfo = () => {
  const { user } = useSelector(state => state.user)
  const [editData, setEditData] = useState(false)
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()
  
  const [contactInfo, setContactInfo] = useState({
    email: user?.email || "",
    phone: user?.contactInfo?.phone || "",
    address: user?.contactInfo?.address || "",
    city: user?.contactInfo?.city || "",
    state: user?.contactInfo?.state || "",
    zipCode: user?.contactInfo?.zipCode || "",
  })

  const handleDataChange = e => {
    const { id, value } = e.target
    setContactInfo(prev => ({
      ...prev, [id]: value
    }))
  }

  const handleUpdateContactInfo = async e => {
    e.preventDefault()
    setLoading(true)
    try {
      await dispatch(updateUserContactInfo(contactInfo))
      setEditData(false)
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  const contactFields = [
    { key: 'email', label: 'Email', icon: FaEnvelope, color: 'text-red-500', type: 'email' },
    { key: 'phone', label: 'Phone', icon: FaPhone, color: 'text-green-600', type: 'tel' },
    { key: 'address', label: 'Address', icon: FaHome, color: 'text-blue-600', type: 'text' },
    { key: 'city', label: 'City', icon: FaCity, color: 'text-purple-500', type: 'text' },
    { key: 'state', label: 'State', icon: FaFlag, color: 'text-orange-500', type: 'text' },
    { key: 'zipCode', label: 'Zip Code', icon: FaMapMarkerAlt, color: 'text-indigo-500', type: 'text' },
  ]

  if (!user) return <Loading />

  return (
    <div className='min-h-screen w-full flex  justify-center flex-col relative gap-8 md:gap-[4vw]  px-4 md:px-0'>
      <div className='w-full md:w-[80vw] max-w-4xl'>
        
       
        <div className='flex flex-col md:flex-row items-center justify-between w-full mb-8 md:mb-[4vw] gap-6 md:gap-0'>
          <h1 className='text-4xl md:text-6xl lg:text-8xl text-center md:text-left'>Contact Information</h1>
        
        </div>

          <div className='flex justify-end mb-6' >
              <Button 
            label={editData ? "Cancel" : "Edit Info"} 
            className='hover:text-white hover:bg-black transition-all duration-300' 
            onClick={() => setEditData(!editData)} 
          />
          </div>

        
        {editData ? (
          <div className='w-full p-6 md:p-8 border border-black/10 rounded-2xl bg-white/50'>
            <h2 className='text-2xl md:text-3xl mb-6 text-center md:text-left'>Update Contact Information</h2>
            
            <form onSubmit={handleUpdateContactInfo} className='space-y-6'>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                {contactFields.slice(0, 2).map(field => {
                  const IconComponent = field.icon
                  return (
                    <div key={field.key} className='space-y-2'>
                      <div className='flex items-center gap-2 mb-2'>
                        <IconComponent className={`text-xl ${field.color}`} />
                        <label className='font-medium'>{field.label}</label>
                      </div>
                      <Input 
                        value={contactInfo[field.key]} 
                        id={field.key} 
                        type={field.type}
                        placeholder={`Enter your ${field.label.toLowerCase()}`}
                        onChange={handleDataChange} 
                        className='border-b-2 border-black/20 bg-transparent focus:border-black rounded-none px-0 py-3' 
                      />
                    </div>
                  )
                })}
              </div>
              
              
              <div className='space-y-2'>
                <div className='flex items-center gap-2 mb-2'>
                  <FaHome className='text-xl text-blue-600' />
                  <label className='font-medium'>Address</label>
                </div>
                <Input 
                  value={contactInfo.address} 
                  id='address' 
                  type='text'
                  placeholder='Enter your full address'
                  onChange={handleDataChange} 
                  className='border-b-2 border-black/20 bg-transparent focus:border-black rounded-none px-0 py-3' 
                />
              </div>
              
              {/* City, State, Zip Code */}
              <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
                {contactFields.slice(3).map(field => {
                  const IconComponent = field.icon
                  return (
                    <div key={field.key} className='space-y-2'>
                      <div className='flex items-center gap-2 mb-2'>
                        <IconComponent className={`text-xl ${field.color}`} />
                        <label className='font-medium'>{field.label}</label>
                      </div>
                      <Input 
                        value={contactInfo[field.key]} 
                        id={field.key} 
                        type={field.type}
                        placeholder={`Enter ${field.label.toLowerCase()}`}
                        onChange={handleDataChange} 
                        className='border-b-2 border-black/20 bg-transparent focus:border-black rounded-none px-0 py-3' 
                      />
                    </div>
                  )
                })}
              </div>
              
              <div className='flex justify-center pt-6'>
                <Button 
                  type='submit'
                  label={loading ? 'Updating...' : 'Update Info'} 
                  disabled={loading}
                  className='hover:text-white hover:bg-black transition-all duration-300 disabled:opacity-50' 
                />
              </div>
            </form>
          </div>
        ) : (
          /* Display Contact Info */
          <div className='space-y-6 md:space-y-8'>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
              {contactFields.map(field => {
                const info = field.key === 'email' ? user?.email : user?.contactInfo?.[field.key]
                const IconComponent = field.icon
                return (
                  <div key={field.key} className='p-6 border border-black/10 rounded-2xl bg-white/30 hover:bg-white/50 transition-all duration-300'>
                    <div className='flex items-center gap-3'>
                      <IconComponent className={`text-2xl ${field.color}`} />
                      <div className='flex-1'>
                        <h3 className='text-lg font-medium'>{field.label}</h3>
                        {info ? (
                          field.key === 'email' ? (
                            <a 
                              href={`mailto:${info}`}
                              className='text-sm text-blue-600 hover:text-blue-800 break-all'
                            >
                              {info}
                            </a>
                          ) : field.key === 'phone' ? (
                            <a 
                              href={`tel:${info}`}
                              className='text-sm text-blue-600 hover:text-blue-800'
                            >
                              {info}
                            </a>
                          ) : (
                            <p className='text-sm text-gray-700'>{info}</p>
                          )
                        ) : (
                          <p className='text-sm text-gray-500'>Not added</p>
                        )}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
            
            {!user?.email && !user?.contactInfo?.phone && !user?.contactInfo?.address && !user?.contactInfo?.city && !user?.contactInfo?.state && !user?.contactInfo?.zipCode && (
              <div className='text-center py-12 md:py-[8vw]'>
                <p className='text-lg md:text-xl opacity-60'>No contact information added yet</p>
                <p className='text-sm md:text-base opacity-40 mt-2'>Click "Edit Info" to get started</p>
              </div>
            )}
          </div>
        )}
        
        {/* Decorative Element */}
        <div className='absolute bottom-4 md:bottom-[2vw] right-4 md:right-[2vw] opacity-20'>
          <svg width="20px" height="20px" className='md:w-[25px] md:h-[25px]' viewBox="0 0 24 24" fill="#000000">
            <path d="M18.364 8.95l-5.657-5.657a1 1 0 0 0-1.414 0L5.636 8.95a1 1 0 0 0 1.414 1.414L11 6.414V20a1 1 0 0 0 2 0V6.414l3.95 3.95a1 1 0 0 0 1.414-1.414z"></path>
          </svg>
        </div>
      </div>
    </div>
  )
}

export default AdminContactInfo