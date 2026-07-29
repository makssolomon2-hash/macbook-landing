import {useMediaQuery} from "react-responsive";
import {useGSAP} from "@gsap/react";
import gsap from "gsap";

import {footerLinks, navLinks} from "../constants/index.js";

const Footer = () => {
   

    useGSAP(() => {
        gsap.fromTo('.footer', {
            y: 200,
            opacity: 0,   
        },{
            y: 0,
            opacity: 1,
            stagger: 0.5,
            duration: 2.5,
            ease: 'power1.inOut',
        });
    })

    return (
       <section className="footer container mx-auto py-7 max-lg:px-5 ">
           <div className="info flex-between ">
               <p>More ways to shop:
                   <a className=" underline cursor-pointer text-primary mx-0.5;"> Find an Apple Store </a>
                   or
                   <a className="underline cursor-pointer text-primary mx-0.5 "> other retailer </a>
                   near you. Or call 000800 040 1966.</p>
               <img src="/public/logo.svg" alt="Apple logo" className="cursor-pointer" />
           </div>

           <hr className="my-7  text-gray-600 w-80%"></hr>
           
           <div className="info2 flex flex-col lg:flex-row lg:items-center justify-between max-lg:mt-5 gap-5 text-sm">
               <p>Copyright © 2024 Apple Inc. All rights reserved.</p>
               <div className="lex flex-col lg:flex-row lg:items-center justify-between max-lg:mt-5 gap-5 text-sm">
                   <ul className="lg:divide-x flex flex-col lg:flex-row gap-2.5">
                       {footerLinks.map(({ label }) => (
                           <li key={label} className="lg:px-5 cursor-pointer hover:text-primary transition-all duration-300 ease-in-out">
                               <a href={label}>{label}</a>
                           </li>
                       ))}
                   </ul>
               </div>
           </div>
       </section>
    )
}
export default Footer
