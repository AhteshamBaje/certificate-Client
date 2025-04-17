import { RouterProvider } from 'react-router-dom'
import './App.css'
import { createBrowserRouter } from 'react-router-dom';
import InternshipCertificate from './pages/Internship.jsx';
import { Home } from './pages/Home.jsx';
import { Form } from './pages/InternshipForm.jsx';
import OfferLetterForm from './pages/OfferLetterForm.jsx';
import InternshipList from './pages/InternshipList.jsx';
import OfferLetterList from './pages/OfferLetterList.jsx';
import OfferLetter from './pages/OfferLetter.jsx';
import CourseForm from './pages/CourseForm.jsx';
import CourseList from './pages/CourseList.jsx';
import CourseCertificate from './pages/CourseCertificate.jsx';
import Register from './pages/Register.jsx';
import Login from './pages/Login.jsx';
import ProtectedRoute from './pages/ProtectedRoute.jsx';
import axios from 'axios';
import CourseUpdateForm from './pages/CourseUpdateForm.jsx';
import { InternshipUpdateForm } from './pages/InternshipUpdateForm.jsx';
import OfferUpdateForm from './pages/OfferUpdateForm.jsx';
import InvalidPage from './pages/InvalidPage.jsx';
import ExperienceForm from './pages/ExperienceForm.jsx';
import ExperienceList from './pages/ExperienceList.jsx';
import ExpCertificate from './pages/ExerienceCertificate.jsx';


function App() {

  axios.defaults.baseURL = import.meta.env.VITE_BASEURL;
  axios.defaults.withCredentials = true;

  const router = createBrowserRouter([
    {
      path: '/home',
      element: (<ProtectedRoute><Home /></ProtectedRoute>)
    },
    {
      path: '/',
      element: <Login/>
    },
    {
      path: '/login',
      element: <Login />
    },
    {
      path:'/Invalidpage',
      element:<InvalidPage/>
    },

    //Internship paths...
    {
      path: '/internshipForm',
      element: (<ProtectedRoute><Form /></ProtectedRoute>)
    },
    {
      path: '/Internshipcertificate/:id',
      element: <InternshipCertificate />
    },
    {
      path: '/InternshipList',
      element: (<ProtectedRoute><InternshipList /></ProtectedRoute>)
    },
    {
      path:'/Internship/Update/:id',
      element: (<ProtectedRoute><InternshipUpdateForm /></ProtectedRoute>)
    },

    //Offer-Letter paths...
    {
      path: '/offerletterForm',
      element: (<ProtectedRoute><OfferLetterForm /></ProtectedRoute>)
    },
    {
      path: '/OfferLetter/:id',
      element: <OfferLetter />
    },
    {
      path: '/OfferLetterList',
      element: (<ProtectedRoute><OfferLetterList /></ProtectedRoute>)
    },
    {
      path:'/updateoffer/:id',
      element:(<ProtectedRoute><OfferUpdateForm/></ProtectedRoute>)
    },

    //course paths...
    {
      path: '/courseForm',
      element: (<ProtectedRoute><CourseForm /></ProtectedRoute>)
    },
    {
      path: '/CourseCertificate/:id',
      element: <CourseCertificate />
    },
    {
      path: '/courseList',
      element: (<ProtectedRoute><CourseList /></ProtectedRoute>)
    },
    {
      path:'/course/update/:id',
      element:(<ProtectedRoute><CourseUpdateForm /></ProtectedRoute>)
    },

    // Experience paths....
    {
      path:'/experienceForm',
      element:<ExperienceForm/>
    },
    {
      path:'/experienceList',
      element:<ExperienceList/>
    },
    {
      path:'/experienceCertificate/:id',
      element:<ExpCertificate/>
    }
  ]);

  return (
    <>
      <RouterProvider router={router} />
      {/* <h1 className='bg-blue-400 text-center font-bold text-xl p-2 m-2 rounded '>Certificate Generator...</h1> */}
      {/* <CertificateGenerator/> */}
      {/* <Form/> */}
    </>
  )
}

export default App
