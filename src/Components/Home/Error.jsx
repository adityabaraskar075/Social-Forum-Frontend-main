import { Link } from 'react-router-dom'
import image from './not-found.png'

const Error = () => {
  return (
    <section className="bg-white h-screen flex items-center justify-center flex-col gap-4">
      <img src={image} className='h-[300px]' alt="not found" />
      <Link className='p-2 bg-purple-700 rounded-md shadow-md text-white hover:bg-purple-500' to='/'>Back to Home</Link>
      <Link className='p-2 bg-green-700 rounded-md shadow-md text-white hover:bg-green-500 min-w-[100px] text-center' to='/login'>Login</Link>
    </section>
  )
}

export default Error