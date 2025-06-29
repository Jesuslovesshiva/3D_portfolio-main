import { Link } from "react-router-dom";
import { socialLinks } from "../constants";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";

const Footer = () => {
  return (
    <footer className='footer font-poppins'>
      <hr className='border-slate-200' />

      <div className='footer-container'>
        <p>
          © 2025 <strong>Daniel Leitner</strong>. All rights reserved.
        </p>

        <div className='flex gap-4 justify-center items-center'>
          <Link to='/contact'>
            <HiOutlineMail className='w-6 h-6 text-slate-600 hover:text-orange-300 transition-colors' />
          </Link>
          <a href='https://github.com/Jesuslovesshiva' target='_blank' rel='noopener noreferrer'>
            <FaGithub className='w-6 h-6 text-slate-600 hover:text-orange-300 transition-colors' />
          </a>
          <a href='https://www.linkedin.com/in/xalli-game-3a9795331' target='_blank' rel='noopener noreferrer'>
            <FaLinkedin className='w-6 h-6 text-slate-600 hover:text-orange-300 transition-colors' />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
