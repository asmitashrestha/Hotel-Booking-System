import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="bg-blue-800 h-30 p-10 text-white ">
      <div className="footer-container flex justify-between">
        <Link to="/" className="ml-72 text-3xl hover:text-blue-400 font-bold ">
          TravelHarbor.com
        </Link>
        <div className="footer-services flex 
        justify-between font-bold text-lg mr-56">
          <p className="mr-9">Privacy Policy</p>
          <p>Terms of Service</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
