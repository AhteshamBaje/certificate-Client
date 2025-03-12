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


function App() {
  const router = createBrowserRouter([
    {
      path:'/home',
      element:(<ProtectedRoute><Home/></ProtectedRoute>)
    },
    {
      path:'/internshipForm',
      element:(<ProtectedRoute><Form/></ProtectedRoute>)
    },
    {
      path:'/Internshipcertificate/:id',
      element:<InternshipCertificate/>
    },
    {
      path:'/InternshipList',
      element:(<ProtectedRoute><InternshipList/></ProtectedRoute>)
    },

    //Offer-Letter paths...
    {
      path:'/offerletterForm',
      element:(<ProtectedRoute><OfferLetterForm/></ProtectedRoute>)
    },
    {
      path:'/OfferLetter/:id',
      element:<OfferLetter/>
    },
    {
      path:'/OfferLetterList',
      element:(<ProtectedRoute><OfferLetterList/></ProtectedRoute>)
    },
    {
      path:'/courseForm',
      element:(<ProtectedRoute><CourseForm/></ProtectedRoute>)
    },
    {
      path:'/CourseCertificate/:id',
      element:<CourseCertificate/>
    },
    {
      path:'/courseList',
      element:(<ProtectedRoute><CourseList/></ProtectedRoute>)
    },
    {
      path:'/',
      element:<Register/>
    },
    {
      path:'/login',
      element:<Login/>
    },
  ]);

  return (
    <>
      <RouterProvider router={router}/>
      {/* <h1 className='bg-blue-400 text-center font-bold text-xl p-2 m-2 rounded '>Certificate Generator...</h1> */}
      {/* <CertificateGenerator/> */}
      {/* <Form/> */}
    </>
  )
}

export default App
