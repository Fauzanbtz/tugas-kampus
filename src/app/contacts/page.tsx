/* eslint-disable react/no-unescaped-entities */
import Navbar from "@/components/common/Navbar";
import { MdOutlineMail } from "react-icons/md";
import { FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaFacebook } from "react-icons/fa";
import { FaPinterestP } from "react-icons/fa";
import { FiPhoneCall } from "react-icons/fi";
import { IoPrintOutline } from "react-icons/io5";
import { TbMapSearch } from "react-icons/tb";
import Footer from "@/components/common/Footer";

export default function Contacts() {
  return (
    <div>
      <Navbar />
      <div className="md:flex justify-between p-10 px-5 pt-10 md:px-24 items-center">
        <div className="md:w-1/2 flex flex-col gap-3">
          <div>
            <h1 className="text-3xl font-semibold">Get in touch</h1>
            <p className="font-medium text-lg">
              we're here for you every step of the way. whether you have
              questions, need order assistance, or whant to share feedback, our
              friendly customer support team is ready to assist. our team is
              here to help! Reach out to us via.
            </p>
          </div>
          <div className="flex flex-col gap-5">
            <div className="flex items-center gap-5">
              <MdOutlineMail className="text-6xl text-[#FF4500] bg-[#f7cd839d] p-4 rounded-xl" />
              <div className="flex flex-col">
                <h1 className="font-light">Email</h1>
                <p>mdaminur.oc@gmail.com</p>
              </div>
            </div>
            <div className="flex items-center gap-5">
              <FiPhoneCall className="text-6xl text-[#0000FF] bg-[#dbf1ff] p-4 rounded-xl" />

              <div className="flex flex-col">
                <h1 className="font-light">Phone</h1>
                <p>+880 123 456 789</p>
              </div>
            </div>
            <div className="flex items-center gap-5">
              <IoPrintOutline className="text-6xl text-[#8A2BE2] bg-[#e5ecff] p-4 rounded-xl" />

              <div className="flex flex-col">
                <h1 className="font-light">Fax</h1>
                <p>(401) 555-0123</p>
              </div>
            </div>
            <div className="flex items-center gap-5">
              <TbMapSearch className="text-6xl text-[#32CD32] bg-[#d7fdb0] p-4 rounded-xl" />

              <div className="flex flex-col">
                <h1 className="font-light">Office</h1>
                <p>678 Seltice Way Coeur D Alene</p>
              </div>
            </div>
          </div>
          <div>
            <h1 className="text-xl font-semibold mb-4">Stay Connected</h1>
            <div className="flex items-center gap-3">
              <FaInstagram className="text-3xl text-secondary bg-[#f7cd839d] p-2 rounded-full" />
              <FaXTwitter className="text-3xl text-secondary bg-[#f7cd839d] p-2 rounded-full" />
              <FaFacebook className="text-3xl text-secondary bg-[#f7cd839d] p-2 rounded-full" />
              <FaPinterestP className="text-3xl text-secondary bg-[#f7cd839d] p-2 rounded-full" />
            </div>
          </div>
        </div>
        <div className="md:w-1/2 bg-gray-500 flex flex-col gap-5 justify-center items-center p-8 mt-10 md:mt-0 rounded-3xl">
          <div className="flex flex-col items-center text-center">
            <h1 className="text-3xl font-semibold p-5 text-white">
              Send us a message
            </h1>
            <p className="text-white">
              your email address will not be published.
              <br />
              required fields are marked
            </p>
          </div>
          <form action="" className="flex flex-col gap-3 w-full">
            <label htmlFor="" className="text-white">
              Your Name
            </label>
            <input
              type="text"
              placeholder="Your Name"
              className="w-full p-3 border rounded-xl"
            />
            <label htmlFor="" className="text-white">
              Your Email
            </label>
            <input
              type="email"
              placeholder="Email Address"
              className="w-full p-3 border rounded-xl"
            />
            <label htmlFor="" className="text-white">
              Phone Number
            </label>
            <input
              type="text"
              placeholder="Phone Number"
              className="w-full p-3 border rounded-xl"
            />
            <label htmlFor="" className="text-white">
              Message
            </label>
            <textarea
              name=""
              id=""
              cols={30}
              rows={10}
              placeholder="Message"
              className="w-full p-3 border rounded-xl"></textarea>
            <div className="flex w-full bg-secondary justify-center rounded-full">
              <button className=" text-black p-3 rounded-3xl ">Submit</button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
}
