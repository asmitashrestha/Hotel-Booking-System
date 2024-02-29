import { Link } from 'react-router-dom'
import { BsFacebook, BsInstagram } from 'react-icons/bs'
import { BiLogoGmail, BiLocationPlus } from 'react-icons/bi'
import { AiOutlineMail, AiOutlinePhone } from 'react-icons/ai'
const Footer = () => {
    return (
        <>
            <div className="footer">
                <div className="foots ml-16 mt-11 ">
                    <div className="footer-left mb-5">
                        <h1><span className='text-zinc-800 text-2xl font-serif font-semibold'>Travel</span> <span
                         className='text-blue-700 text-2xl font-bold font-serif'>Harbor</span></h1>
                        <p className='text-justify text-md text-zinc-900'>Lorem ipsum dolor sit amet consectetur <br /> adipisicing elit. Expedita, nam.</p>
                    </div>
                    <div className="footer-left ml-20 text-justify">
                        <h1 className='text-2xl font-bold justify-center '>Discover</h1>
                        <div className="naves justify-center ml-4 mt-2 ">
                            <Link to='/'>Home</Link>
                            <Link to='/about'>About</Link>
                            <Link to='/tour'>Tour</Link>
                        </div>
                        <div className="icons flex mt-4 mb-5">
                            <p className='mr-4 '><BsFacebook /></p>
                            <p className='mr-4'><BsInstagram /></p>
                            <p className='mr-4'><BiLogoGmail /></p>
                        </div>

                    </div>
                </div>

                <div className="foots foot-r mt-11 mr-20 ">
                    <div className="footer-right">
                        <h2 className='text-2xl font-bold'>QuickLinks</h2>
                        <div className="links ml-4 mt-2">
                            <Link to='/gallery'>Gallery</Link>
                            <Link to='login'>Login</Link>
                            <Link to='/register'>Register</Link>
                        </div>
                    </div>
                    <div className="footer-r footer-right ml-40">
                        <h2 className='text-2xl font-bold justify-center'>Contact</h2>
                        <p className='mt-2'> <span className='text-2xl'> <BiLocationPlus /> </span>  <span className=' font-bold relative bottom-1 left-2 right-3'>Address:</span> <span className=' font-semibold relative bottom-1 left-2'>Jawalakhel,Lalitpur</span> </p>
                        <p className='mt-2'> <span className='text-2xl'> <AiOutlineMail /> </span> <span className=' font-bold relative bottom-1 left-2 right-3'>Email:</span>  <span className=' font-semibold relative bottom-1 left-2'>travelharbor@gmail.com</span> </p>
                        <p className='mt-2'><span className='text-2xl'><AiOutlinePhone /></span>  <span className=' font-bold relative bottom-1 left-2 right-3'> Phone:</span> <span className=' font-semibold relative bottom-1 left-2'>+9779837654567</span> </p>
                    </div>
                </div>
            </div>
            <div className="foot-div">
                 <p className='foot-para justify-center text-center mt-4 mb-4 text-zinc-900 font-semibold'>Copyright 2023 design and
                 developed by Asmita Shrestha & Aman Singh</p>
     
            </div>
              </>
    )
}

export default Footer