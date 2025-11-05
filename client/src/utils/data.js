import { FaTachometerAlt } from 'react-icons/fa'; // dashboard icon (FontAwesome)
import { FaTools } from 'react-icons/fa';        // skills icon
import { FaProjectDiagram } from 'react-icons/fa'; // projects icon
import { FaUserCircle } from 'react-icons/fa';   // profile icon
import { TbLogout2 } from "react-icons/tb";
import { FaUserAlt } from "react-icons/fa";
import { HiOfficeBuilding } from "react-icons/hi";
import { IoShareSocial } from "react-icons/io5";
import { MdCall } from "react-icons/md";

export const HEADER_LIST = [
  {
    label: 'dashboard',
    to: "/admin/homepage",
    icon: FaTachometerAlt
  },
  {
    label: 'skills',
    to: "/admin/homepage/skills",
    icon: FaTools
  },
  {
    label: 'projects',
    to: "/admin/homepage/projects",
    icon: FaProjectDiagram
  },
  {
    label: 'profile',
    to: "/admin/homepage/profile",
    icon: FaUserCircle
  },
 
];


export const SKILL_CATEGORY_OPTION=['Frontend', 'Backend', 'Database', 'DevOps', 'Tools', 'Languages', 'Frameworks', 'Other']


export const PROFESSIONAL_TYPES=[{
  label:"Personal Info",
  icon: FaUserAlt ,
  to:""
},{
   label:"Professional Info",
  icon:HiOfficeBuilding ,
  to:"professionalInfo"
},{
 label:"Social Info",
  icon: IoShareSocial,
  to:"SocialInfo"
},{
    label:'Contact Info',
 icon: MdCall,
  to:"contactInfo"
}]

export const JOB_TYPE_OPTIONS= [
  'Part-Time',
  "Full Time",
  "Internship",
  "Freelance",
  "Trainee",
  "Selfemployed",
]