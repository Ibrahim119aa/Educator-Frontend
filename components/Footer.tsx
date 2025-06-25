"use client";
import Link from "next/link";
import { FaInstagram, FaFacebookF, FaXTwitter, FaLinkedinIn, FaEnvelope } from "react-icons/fa6";
import { FaWhatsapp } from "react-icons/fa";
import { BsFillTelephoneFill } from "react-icons/bs";


const Footer = () => {
    
    return (
        <>
            <div className="fixed bottom-10 right-5 space-y-2">
                <div className="relative w-full">
                    <button area-label="Chat on Whatsapp" className="rounded-full bg-green-500 p-2 text-white [&+*]:hover:opacity-100 [&+*]:hover:scale-100" onClick={()=>window.open("https://api.whatsapp.com/send?phone=+918292168666&text=Good Morning sir, I would like to contact you regarding my query.","_blank")}><FaWhatsapp size={32}/></button>
                    <div className="opacity-0 select-none absolute w-full min-w-28 right-full top-1/2 -translate-y-1/2 scale-0 transition-transform origin-right mx-2 bg-slate-800 text-white text-xs px-3 py-1 rounded-md">Chat with us!</div>
                </div>
                <div className="relative w-full">
                    <button area-label="Call Now" className="rounded-full bg-primary dark:bg-primary-foreground p-3 text-white [&+*]:hover:opacity-100 [&+*]:hover:scale-100" onClick={()=>window.open("tel:+918292168666","_blank")}><BsFillTelephoneFill size={24}/></button>
                    <div className="opacity-0 select-none absolute w-full min-w-28 right-full top-1/2 -translate-y-1/2 scale-0 transition-transform origin-right mx-2 bg-slate-800 text-white text-xs px-3 py-1 rounded-md">Call us now!</div>
                </div>
            </div>
            <div className="relative -bottom-12 -z-10">
                {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path className="fill-black dark:fill-slate-900" fillOpacity="1" d="M0,128L60,149.3C120,171,240,213,360,240C480,267,600,277,720,261.3C840,245,960,203,1080,165.3C1200,128,1320,96,1380,80L1440,64L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"></path></svg> */}
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path className="fill-black dark:fill-slate-900" fillOpacity="1" d="M0,256L48,256C96,256,192,256,288,245.3C384,235,480,213,576,192C672,171,768,149,864,154.7C960,160,1056,192,1152,208C1248,224,1344,224,1392,224L1440,224L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path></svg>
                
                
            </div>
            <footer className="bg-black dark:bg-slate-900 text-white text-xs p-5 min-h-52">
                {/* privacy policy, terms and conditions, links to social media, etc. */}
                <div className="flex flex-wrap items-center justify-center gap-5 p-2 mt-2">
                    <Link href="https://www.instagram.com/oeducators/" target="_blank" passHref className="hover:bg-white hover:text-black p-2 rounded-full transition-colors ease-in-out duration-100"><FaInstagram size={24} /></Link>
                    <Link href="https://www.facebook.com/oeducators/" target="_blank" passHref className="hover:bg-white hover:text-black p-2 rounded-full transition-colors ease-in-out duration-100"><FaFacebookF size={24} /></Link>
                    <Link href="https://www.linkedin.com/company/oeducators/" target="_blank" passHref className="hover:bg-white hover:text-black p-2 rounded-full transition-colors ease-in-out duration-100"><FaLinkedinIn size={24} /></Link>
                    <Link href="https://x.com/OmniFriend2019" target="_blank" passHref className="hover:bg-white hover:text-black p-2 rounded-full transition-colors ease-in-out duration-100"><FaXTwitter size={24} /></Link>
                </div>
                <div className="flex flex-wrap items-center justify-center gap-5 p-2 pt-0 mt-2 [&>*]:flex [&>*]:items-center [&>*]:justify-center [&>*]:gap-2">
                    <Link href="tel:+918292168666" passHref className="hover:bg-white hover:text-black p-2 rounded-full transition-colors ease-in-out duration-100"><BsFillTelephoneFill size={24}/></Link>
                    <Link href="mailto:info@oeducators.com" target="_blank" passHref className="hover:bg-white hover:text-black p-2 rounded-full transition-colors ease-in-out duration-100"><FaEnvelope size={24} /></Link>
                </div>
                <div className="flex flex-wrap items-center justify-center gap-5 p-2 mt-5 hover:[&>*]:underline">
                    <Link href="/privacy-policy" passHref>Privacy Policy</Link>
                    <Link href="/terms-and-conditions" passHref>Terms and Conditions</Link>
                    <Link href="/refund-and-cancellation-policy" passHref>Refund Policy</Link>
                </div>
                <div className="space-y-5 mt-10">
                    {/* <p className="text-center">© 2024 OEducators.com</p> */}
                    <p className="text-center">© 2019-2024 OmniFriend EAppointment PVT. LTD.</p>
                </div>
            </footer>
        </>
    )
}

export default Footer;