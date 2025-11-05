import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import SkillCard from '../../../Components/Card/SkillCard'

const PortfolioSkillsDetailPage = () => {
  const [currentSkills, setCurrentSkills] = useState('')
  const [skillArr, setSkillArr]= useState([])
  const navigate= useNavigate()
const skills = [
  {
    name: "Frontend",
    skills: [
      {
        name: "HTML",
        about: "Expert in semantic HTML5 and accessible web markup",
        level: 4,
        icon: "https://cdn-icons-png.flaticon.com/512/732/732212.png",
      },
      {
        name: "CSS",
        about: "Proficient with modern CSS3, Flexbox, Grid, and responsive design",
        level: 4,
        icon: "https://cdn-icons-png.flaticon.com/512/732/732190.png",
      },
      {
        name: "JavaScript",
        about: "Advanced ES6+, asynchronous programming, and DOM manipulation",
        level: 4,
        icon: "https://cdn-icons-png.flaticon.com/512/5968/5968292.png",
      },
      {
        name: "React",
        about: "Component-based architecture and state management",
        level: 3,
        icon: "https://cdn-icons-png.flaticon.com/512/1126/1126012.png",
      },
      {
        name: "Angular",
        about: "Experience with TypeScript and Angular framework fundamentals",
        level: 2,
        icon: "https://cdn-icons-png.flaticon.com/512/732/732190.png",
      },
      {
        name: "Vue",
        about: "Basic knowledge of Vue.js and reactive data binding",
        level: 2,
        icon: "https://cdn-icons-png.flaticon.com/512/2111/2111370.png",
      },
    ],
  },
  {
    name: "Backend",
    skills: [
      {
        name: "Node",
        about: "Server-side JavaScript runtime environment",
        level: 4,
        icon: "https://cdn-icons-png.flaticon.com/512/5968/5968322.png",
      },
      {
        name: "Express",
        about: "Minimalist web framework for Node.js",
        level: 4,
        icon: "https://cdn-icons-png.flaticon.com/512/919/919825.png",
      },
      {
        name: "MongoDB",
        about: "NoSQL document database, flexible and scalable",
        level: 4,
        icon: "https://cdn-icons-png.flaticon.com/512/919/919836.png",
      },
      {
        name: "PostgreSQL",
        about: "Advanced open-source relational database system",
        level: 3,
        icon: "https://cdn-icons-png.flaticon.com/512/3299/3299675.png",
      },
      {
        name: "MySQL",
        about: "Popular relational database management system",
        level: 3,
        icon: "https://cdn-icons-png.flaticon.com/512/5968/5968329.png",
      },
      {
        name: "Firebase",
        about: "Backend-as-a-Service platform by Google",
        level: 2,
        icon: "https://cdn-icons-png.flaticon.com/512/888/888870.png",
      },
    ],
  },
  {
    name: "DevOps",
    skills: [
      {
        name: "Docker",
        about: "Containerization platform for consistent environments",
        level: 3,
        icon: "https://cdn-icons-png.flaticon.com/512/919/919853.png",
      },
      {
        name: "Kubernetes",
        about: "Container orchestration for automated deployment",
        level: 2,
        icon: "https://cdn-icons-png.flaticon.com/512/919/919842.png",
      },
      {
        name: "AWS",
        about: "Cloud services platform with wide-ranging solutions",
        level: 3,
        icon: "https://cdn-icons-png.flaticon.com/512/906/906324.png",
      },
      {
        name: "CI/CD",
        about: "Continuous Integration and Deployment pipelines",
        level: 3,
        icon: "https://cdn-icons-png.flaticon.com/512/716/716784.png",
      },
      {
        name: "Nginx",
        about: "High-performance web server and reverse proxy",
        level: 2,
        icon: "https://cdn-icons-png.flaticon.com/512/732/732243.png",
      },
    ],
  },
];

  return (
    <div className='min-h-screen relative px-[10vw] py-[10vh]' >
           <button  

         onClick={()=> navigate('/')}
  className="absolute bg-white text-black px-[1.5vw] py-[1vh] flex items-center justify-center rounded-full text-xl font-semibold border-black hover:bg-black hover:text-white border-2  transition-all duration-300 ease-in-out cursor-pointer gap-2 left-10 top-10"
>

  <svg
 className="fill-current transition-colors duration-300 ease-in-out"
  width="25px"
  height="25px"
  viewBox="0 0 92 92"
    
>
  <path
    id="XMLID_546_"
    d="M84,46c0,2.2-1.8,4-4,4H21.6l18.1,18.2c1.6,1.6,1.6,4.1,0,5.7C39,74.6,38,75,36.9,75c-1,0-2.1-0.4-2.8-1.2
	l-24.9-25c-1.6-1.6-1.6-4.1,0-5.6l24.9-25c1.6-1.6,4.1-1.6,5.7,0c1.6,1.6,1.6,4.1,0,5.7L21.6,42H80C82.2,42,84,43.8,84,46z"
  ></path>
</svg>
</button>
      <div  >
        <h1 className='text-7xl font-[Urbanist] font-bold text-center mb-5' >Skill & Expertiese</h1>
        <p className='text-center w-[70%] mx-auto text-xl' >
          A comprehensive overview of my technical skills, design capabilities, and professional experience. Constantly learning and adapting to new technologies and methodologies.
        </p>

      </div>
      <div  className='w-full 0 mt-[4vw] flex items-center justify-center gap-2' >
          {
            skills.map((skill, index) => (
              <div key={index}>
                 <button  

         onClick={()=> 
          {
            setCurrentSkills(skill.name)
            setSkillArr(skill.skills)
          }
         }
  className=" bg-white text-black px-[1.5vw] py-[1vh] flex items-center justify-center rounded-full text-xl font-semibold border-black hover:bg-black hover:text-white border-2  transition-all duration-300 ease-in-out cursor-pointer gap-2 "
>
{skill.name}

</button>
               
              </div>
            ))
          }
      </div>


      <div className='grid  grid-cols-3 gap-[4vw] mt-[4vw] font-[Urbanist]' >
        {
          skillArr.map((skill,idx)=>(
            <SkillCard skill={skill} key={idx} />
          ))
        }
      </div>
    </div>
  )
}

export default PortfolioSkillsDetailPage