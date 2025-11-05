import React, { useState } from 'react'
import Button from '../../../Components/input/Button'
import Input from '../../../Components/input/Input'
import { useDispatch, useSelector } from 'react-redux'
import { updateUserDetails } from '../../../store/user/userThunk'
import Loading from '../../../Components/loading/Loading'

const AdminPersonalInfo = () => {
    const [editData,setEditData]= useState(false)

    const {user} = useSelector(state=> state.user)
    const dispatch = useDispatch()
    const [loading,setLoading] = useState(false)
        const [userData, setUserData] = useState({
            firstName:user?.firstName  || "",
            lastName:user?.lastName  || "",
            email:user?.email  || "",
            username:user?.username  || "",
            title:user?.title  || "",
            bio:user?.bio  || "",
            aboutMe:user?.aboutMe  || "",
            
        })


const handleUpdateData=async(e)=>{
    e.preventDefault()
    setLoading(true)
        try {
            await dispatch(updateUserDetails(userData))
        } catch (error) {
            console.log(error);
            
        }
}


if(!user) return < Loading /> 
  return (
    <div className='min-h-screen bg-white font-[Urbanist] pt-[12vh] px-4 md:px-8 lg:px-16'>
      <div className='max-w-4xl mx-auto'>
        <div className='mb-8'>
          <h1 className='text-4xl md:text-5xl font-bold text-[#424040] font-[Besley] mb-2'>Personal Information</h1>
          <p className='text-gray-600 text-lg'>Manage your personal details and profile information</p>
        </div>

        <div className='bg-white rounded-2xl shadow-lg border border-gray-100 p-8'>
          <div className='flex items-center justify-between mb-8'>
            <div className='flex items-center gap-3'>
              <div className='w-10 h-10 bg-[#424040] rounded-lg flex items-center justify-center'>
                <svg className='w-5 h-5 text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' />
                </svg>
              </div>
              <h2 className='text-2xl font-bold text-[#424040]'>Profile Details</h2>
            </div>
            <button 
              type='button'
              onClick={() => setEditData(!editData)}
              className='px-4 py-2 border-2 border-[#424040] text-[#424040] hover:bg-[#424040] hover:text-white rounded-xl font-semibold transition-all duration-300'
            >
              {editData ? 'Cancel' : 'Edit'}
            </button>
          </div>

          <form onSubmit={handleUpdateData}>
            {editData ? (
              <div className='space-y-6'>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                  <Input 
                    label='First Name' 
                    type='text'
                    value={userData.firstName}
                    onChange={(e) => setUserData({...userData, firstName: e.target.value})}
                    className='w-full border-2 border-gray-200 rounded-xl focus:border-[#424040] focus:ring-4 focus:ring-[#424040]/10 focus:outline-none text-[#424040] bg-white px-4 py-4 text-base font-medium'
                  />
                  <Input 
                    label='Last Name' 
                    type='text'
                    value={userData.lastName}
                    onChange={(e) => setUserData({...userData, lastName: e.target.value})}
                    className='w-full border-2 border-gray-200 rounded-xl focus:border-[#424040] focus:ring-4 focus:ring-[#424040]/10 focus:outline-none text-[#424040] bg-white px-4 py-4 text-base font-medium'
                  />
                </div>
                
                <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                  <Input 
                    label='Email' 
                    type='email'
                    value={userData.email}
                    onChange={(e) => setUserData({...userData, email: e.target.value})}
                    className='w-full border-2 border-gray-200 rounded-xl focus:border-[#424040] focus:ring-4 focus:ring-[#424040]/10 focus:outline-none text-[#424040] bg-white px-4 py-4 text-base font-medium'
                  />
                  <Input 
                    label='Username' 
                    type='text'
                    value={userData.username}
                    onChange={(e) => setUserData({...userData, username: e.target.value})}
                    className='w-full border-2 border-gray-200 rounded-xl focus:border-[#424040] focus:ring-4 focus:ring-[#424040]/10 focus:outline-none text-[#424040] bg-white px-4 py-4 text-base font-medium'
                  />
                </div>
                
                <Input 
                  label='Title' 
                  type='text'
                  value={userData.title}
                  onChange={(e) => setUserData({...userData, title: e.target.value})}
                  className='w-full border-2 border-gray-200 rounded-xl focus:border-[#424040] focus:ring-4 focus:ring-[#424040]/10 focus:outline-none text-[#424040] bg-white px-4 py-4 text-base font-medium'
                  placeholder='e.g., Full Stack Developer'
                />
                
                <div className='group'>
                  <label className='block text-sm font-bold text-[#424040] mb-3 group-focus-within:text-[#2a2828] transition-colors'>Bio</label>
                  <textarea 
                    value={userData.bio}
                    onChange={(e) => setUserData({...userData, bio: e.target.value})}
                    rows={4}
                    className='w-full border-2 border-gray-200 rounded-xl focus:border-[#424040] focus:ring-4 focus:ring-[#424040]/10 focus:outline-none text-[#424040] bg-white px-4 py-4 text-base font-medium placeholder:text-gray-400 hover:border-gray-300 transition-all duration-200 resize-none'
                    placeholder='Write a small bio about yourself'
                  />
                </div>
                
                <div className='group'>
                  <label className='block text-sm font-bold text-[#424040] mb-3 group-focus-within:text-[#2a2828] transition-colors'>About Me</label>
                  <textarea 
                    value={userData.aboutMe}
                    onChange={(e) => setUserData({...userData, aboutMe: e.target.value})}
                    rows={6}
                    className='w-full border-2 border-gray-200 rounded-xl focus:border-[#424040] focus:ring-4 focus:ring-[#424040]/10 focus:outline-none text-[#424040] bg-white px-4 py-4 text-base font-medium placeholder:text-gray-400 hover:border-gray-300 transition-all duration-200 resize-none'
                    placeholder='Write something detailed about yourself'
                  />
                </div>
                
                <div className='pt-6 border-t border-gray-200'>
                  <button 
                    type='submit'
                    className='flex items-center gap-2 bg-[#424040] text-white hover:bg-[#2a2828] rounded-xl font-semibold py-3 px-6 transition-all duration-300'
                  >
                    <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                      <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12' />
                    </svg>
                    Update Profile
                  </button>
                </div>
              </div>
            ) : (
              <div className='space-y-6'>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                  <div>
                    <label className='block text-sm font-bold text-[#424040] mb-2'>First Name</label>
                    <p className='text-gray-700 bg-gray-50 px-4 py-3 rounded-xl'>{userData.firstName || 'Not set'}</p>
                  </div>
                  <div>
                    <label className='block text-sm font-bold text-[#424040] mb-2'>Last Name</label>
                    <p className='text-gray-700 bg-gray-50 px-4 py-3 rounded-xl'>{userData.lastName || 'Not set'}</p>
                  </div>
                </div>
                
                <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                  <div>
                    <label className='block text-sm font-bold text-[#424040] mb-2'>Email</label>
                    <p className='text-gray-700 bg-gray-50 px-4 py-3 rounded-xl break-all'>{userData.email || 'Not set'}</p>
                  </div>
                  <div>
                    <label className='block text-sm font-bold text-[#424040] mb-2'>Username</label>
                    <p className='text-gray-700 bg-gray-50 px-4 py-3 rounded-xl'>{userData.username || 'Not set'}</p>
                  </div>
                </div>
                
                <div>
                  <label className='block text-sm font-bold text-[#424040] mb-2'>Title</label>
                  <p className='text-gray-700 bg-gray-50 px-4 py-3 rounded-xl'>{userData.title || 'Not set'}</p>
                </div>
                
                <div>
                  <label className='block text-sm font-bold text-[#424040] mb-2'>Bio</label>
                  <p className='text-gray-700 bg-gray-50 px-4 py-3 rounded-xl min-h-[100px]'>{userData.bio || 'Not set'}</p>
                </div>
                
                <div>
                  <label className='block text-sm font-bold text-[#424040] mb-2'>About Me</label>
                  <p className='text-gray-700 bg-gray-50 px-4 py-3 rounded-xl min-h-[150px]'>{userData.aboutMe || 'Not set'}</p>
                </div>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  )
}

export default AdminPersonalInfo