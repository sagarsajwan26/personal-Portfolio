import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FaLinkedin, FaGithub, FaTwitter, FaInstagram, FaFacebook } from 'react-icons/fa'
import Loading from '../../../Components/loading/Loading'
import Button from '../../../Components/input/Button'
import Input from '../../../Components/input/Input'
import { updateUserSocialInfo } from '../../../store/user/userThunk'

const AdminSocialLinks = () => {
  const { user } = useSelector(state => state.user)
  const [editData, setEditData] = useState(false)
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()
  
  const [socialLinks, setSocialLinks] = useState({
    facebook: user?.socialLinks?.facebook || "",
    instagram: user?.socialLinks?.instagram || "",
    linkedin: user?.socialLinks?.linkedin || "",
    twitter: user?.socialLinks?.twitter || "",
    github: user?.socialLinks?.github || "",
  })

  const handleDataChange = e => {
    const { id, value } = e.target
    setSocialLinks(prev => ({
      ...prev, [id]: value
    }))
  }

  const handleUpdateSocialLinks = async e => {
    e.preventDefault()
    setLoading(true)
    try {
      await dispatch(updateUserSocialInfo(socialLinks)).then(res=>{
        console.log(res);
        
      })
      setEditData(false)
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  const socialPlatforms = [
    { key: 'linkedin', label: 'LinkedIn', icon: FaLinkedin, color: 'text-blue-600' },
    { key: 'github', label: 'GitHub', icon: FaGithub, color: 'text-gray-800' },
    { key: 'twitter', label: 'Twitter', icon: FaTwitter, color: 'text-blue-400' },
    { key: 'instagram', label: 'Instagram', icon: FaInstagram, color: 'text-pink-500' },
    { key: 'facebook', label: 'Facebook', icon: FaFacebook, color: 'text-blue-700' },
  ]

  if (!user) return <Loading />

  return (
    <div className='min-h-screen w-full flex items-center justify-center flex-col relative gap-8 md:gap-[4vw] my-10 md:my-[10vw] px-4 md:px-0'>
      <div className='w-full md:w-[80vw] max-w-4xl'>
        
        {/* Header Section */}
        <div className='flex flex-col md:flex-row items-center justify-between w-full mb-8 md:mb-[4vw] gap-6 md:gap-0'>
          <h1 className='text-4xl md:text-6xl lg:text-8xl text-center md:text-left'>Social Links</h1>
          <Button 
            label={editData ? "Cancel" : "Edit Links"} 
            className='hover:text-white hover:bg-black transition-all duration-300' 
            onClick={() => setEditData(!editData)} 
          />
        </div>

        {/* Edit Form */}
        {editData ? (
          <div className='w-full p-6 md:p-8 border border-black/10 rounded-2xl bg-white/50'>
            <h2 className='text-2xl md:text-3xl mb-6 text-center md:text-left'>Update Social Links</h2>
            
            <form onSubmit={handleUpdateSocialLinks} className='space-y-6'>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                {socialPlatforms.map(platform => {
                  const IconComponent = platform.icon
                  return (
                    <div key={platform.key} className='space-y-2'>
                      <div className='flex items-center gap-2 mb-2'>
                        <IconComponent className={`text-xl ${platform.color}`} />
                        <label className='font-medium'>{platform.label}</label>
                      </div>
                      <Input 
                        value={socialLinks[platform.key]} 
                        id={platform.key} 
                        placeholder={`Enter your ${platform.label} URL`}
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
                  label={loading ? 'Updating...' : 'Update Links'} 
                  disabled={loading}
                  className='hover:text-white hover:bg-black transition-all duration-300 disabled:opacity-50' 
                />
              </div>
            </form>
          </div>
        ) : (
          /* Display Social Links */
          <div className='space-y-6 md:space-y-8'>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
              {socialPlatforms.map(platform => {
                const link = user?.socialLinks?.[platform.key]
                const IconComponent = platform.icon
                return (
                  <div key={platform.key} className='p-6 border border-black/10 rounded-2xl bg-white/30 hover:bg-white/50 transition-all duration-300'>
                    <div className='flex items-center justify-between'>
                      <div className='flex items-center gap-3'>
                        <IconComponent className={`text-2xl ${platform.color}`} />
                        <div>
                          <h3 className='text-lg font-medium'>{platform.label}</h3>
                          {link ? (
                            <a 
                              href={link} 
                              target='_blank' 
                              rel='noopener noreferrer'
                              className='text-sm text-blue-600 hover:text-blue-800 break-all'
                            >
                              {link}
                            </a>
                          ) : (
                            <p className='text-sm text-gray-500'>Not added</p>
                          )}
                        </div>
                      </div>
                      {link && (
                        <a 
                          href={link} 
                          target='_blank' 
                          rel='noopener noreferrer'
                          className='text-xs px-3 py-1 border border-black/20 rounded-full hover:bg-black hover:text-white transition-all duration-300'
                        >
                          Visit
                        </a>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
            
            {!Object.values(user?.socialLinks || {}).some(link => link) && (
              <div className='text-center py-12 md:py-[8vw]'>
                <p className='text-lg md:text-xl opacity-60'>No social links added yet</p>
                <p className='text-sm md:text-base opacity-40 mt-2'>Click "Edit Links" to get started</p>
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

export default AdminSocialLinks