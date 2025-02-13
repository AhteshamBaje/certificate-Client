import { RouterProvider } from 'react-router-dom'
import './App.css'
import { createBrowserRouter } from 'react-router-dom';
import InternshipCertificate from './pages/Internship.jsx';
import { Home } from './pages/Home.jsx';
import { Form } from './pages/InternshipForm.jsx';
import OfferLetterForm from './pages/OfferLetterForm.jsx';
import InternshipList from './pages/InternshipList.jsx';


function App() {
  const router = createBrowserRouter([
    {
      path:'/',
      element:<Home/>
    },
    {
      path:'/internshipForm',
      element:<Form/>
    },
    {
      path:'/Internshipcertificate/:id',
      element:<InternshipCertificate/>
    },
    {
      path:'/InternshipList',
      element:<InternshipList/>
    },
    {
      path:'/offerletterForm',
      element:<OfferLetterForm/>
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
