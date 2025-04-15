"use client";
import fiver from "../../../public/fiverr-1.svg";
import Whatsapp from "../../../public/whatsapp.svg";
import Link from "next/link";
import Image from "next/image";
import '@/app/globals.css';


const EmailSection = () => {
 

  return (
    <section
      id="contact"
      className="grid md:grid-cols-2 my-12 md:my-12 py-24 gap-4 relative"
    >
      <div className="bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary-900 to-transparent rounded-full h-80 w-80 z-0 blur-lg absolute top-3/4 -left-4 transform -translate-x-1/2 -translate-1/2"></div>
      <div className="z-10">
        <h5 className="text-xl font-bold text-white my-2">
          Let&apos;s Connect
        </h5>
        <p className="text-[#ADB7BE] mb-4 max-w-md">
          {" "}
          I&apos;m currently looking for new opportunities, my inbox is always
          open. Whether you have a question or just want to say hi, I&apos;ll
          try my best to get back to you!
        </p>
      
      </div>
      <div>
       
        <Link href="https://www.fiverr.com/s/K2BYm2">
          <button
            type="submit"
            className=" mt-3 font-medium py-2.5 px-5 flex items-center justify-around rounded-lg w-full bg-gradient-to-br from-primary-500 to-secondary-500 hover:bg-slate-200 text-white"
          >
            <Image className="w-12 heartbeat" src={fiver} alt="email Icon" />
            My Fiverr
          </button>
        </Link>

        <Link href="https://wa.me/message/FYPCUDSRLRNFG1">
          <button
            type="submit"
            className=" mt-3 font-medium py-2.5 px-5 flex items-center justify-around rounded-lg w-full bg-gradient-to-br from-primary-500 to-secondary-500 hover:bg-slate-200 text-white"
          >
            <Image className="w-12 ml-3 heartbeat" src={Whatsapp} alt="email Icon" />
            My WhatsApp
          </button>
        </Link>
        {/* </form>
        )} */}
      </div>
    </section>
  );
};

export default EmailSection;
