import React from "react";
import SectionHeaders from "../sectionHeaders/SectionHeaders";
import { FaPhoneAlt, FaTelegramPlane, FaGlobe, FaMapMarkerAlt } from "react-icons/fa";


const Contact = () => {
    return (
        <>
            <SectionHeaders section="Contact" />
            <form action="#" className="bg-[url('./bg.png')]" method="post">
                <section className="pt-24 pb-12">
                    <div className="mx-auto max-w-[85rem] mb-16 px-4 sm:px-6 lg:px-8">
                        <div className="grid lg:grid-cols-5 grid-cols-1">

                            {/* Form: 60% width */}
                            <div className="lg:col-span-3 bg-[#e8edf0] p-5 lg:p-11 max-lg:rounded-xl max-lg:mb-6 lg:rounded-l-lg">
                                <h2 className="text-black font-manrope text-3xl font-light leading-10 mb-6">Contact Me</h2>

                                {/* First Name and Last Name in one row */}
                                <div className="grid grid-cols-2 gap-4 mb-4">
                                    <div>
                                        <label htmlFor="first-name" className="uppercase text-black text-sm font-medium">First Name</label>
                                        <input type="text" id="first-name" name="first-name" autoComplete="given-name" className="w-full bg-white h-12 text-gray-600 placeholder-gray-400 shadow-sm bg-transparent text-lg font-normal leading-7 rounded-md border border-gray-200 focus:outline-none pl-4" placeholder="First Name" />
                                    </div>
                                    <div>
                                        <label htmlFor="last-name" className="uppercase text-black text-sm font-medium">Last Name</label>
                                        <input type="text" id="last-name" name="last-name" autoComplete="family-name" className="w-full bg-white h-12 text-gray-600 placeholder-gray-400 shadow-sm bg-transparent text-lg font-normal leading-7 rounded-md border border-gray-200 focus:outline-none pl-4" placeholder="Last Name" />
                                    </div>
                                </div>

                                {/* Email and Phone in one row */}
                                <div className="grid grid-cols-2 gap-4 mb-4">
                                    <div>
                                        <label htmlFor="email" className="uppercase text-black text-sm font-medium">Email Id</label>
                                        <input type="email" id="email" name="email" autoComplete="email" className="w-full bg-white h-12 text-gray-600 placeholder-gray-400 shadow-sm bg-transparent text-lg font-normal leading-7 rounded-md border border-gray-200 focus:outline-none pl-4" placeholder="Email" />
                                    </div>
                                    <div>
                                        <label htmlFor="phone" className="uppercase text-black text-sm font-medium">Phone</label>
                                        <input type="tel" id="phone" name="phone" autoComplete="tel" className="w-full bg-white h-12 text-gray-600 placeholder-gray-400 shadow-sm bg-transparent text-lg font-normal leading-7 rounded-md border border-gray-200 focus:outline-none pl-4" placeholder="Phone" />
                                    </div>
                                </div>

                                {/* Subject Field */}
                                <label htmlFor="subject" className="uppercase text-black text-sm font-medium">Subject</label>
                                <input type="text" id="subject" name="subject" autoComplete="off" className="w-full bg-white h-12 text-gray-600 placeholder-gray-400 shadow-sm bg-transparent text-lg font-normal leading-7 rounded-md border border-gray-200 focus:outline-none pl-4 mb-4" placeholder="Subject" />

                                {/* Message Field */}
                                <label htmlFor="message" className="uppercase text-black text-sm font-medium">Message</label>
                                <textarea id="message" name="message" autoComplete="off" className="w-full bg-white h-32 text-gray-600 placeholder-gray-400 bg-transparent text-lg shadow-sm font-normal leading-7 rounded-md border border-gray-200 focus:outline-none pl-4 pt-2 mb-4" placeholder="Message" />

                                {/* Submit Button */}
                                <button className="px-4 h-12 text-white text-base font-medium leading-6 rounded transition-all duration-700 hover:bg-[#2b5f5a] bg-[#008073] uppercase shadow-sm">Send Message</button>
                            </div>

                            {/* Image: 40% width */}
                            <div className="lg:col-span-2 ">
                                <div className="group w-full h-full">
                                    <div className="relative h-full">
                                        <iframe
                                            src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d349522.7640578663!2d75.93076099305328!3d10.976930758328841!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMTHCsDAxJzM2LjIiTiA3NsKwMDQnMTUuMSJF!5e0!3m2!1sen!2sin!4v1706551329973!5m2!1sen!2sin"
                                            width="100%" height="100%"
                                            className="w-full h-full max-lg:rounded-xl max-lg:h-96 lg:rounded-r-lg bg-blend-multiply bg-indigo-700"
                                            allowFullScreen="" loading="lazy"
                                            referrerPolicy="strict-origin-when-cross-origin"
                                        ></iframe>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                {/* Icons Section */}
                <div className="flex flex-col justify-between mt-10 space-y-4 md:space-y-0 md:flex-row md:space-x-10 md:px-20 lg:px-8 xl:px-20">
                    {/* Location Icon */}
                    <div className="flex flex-col items-center">
                        <div className="flex items-center justify-center w-14 h-14 bg-[#008073] rounded-full text-white">
                            <FaMapMarkerAlt size={24} className="md:text-3xl lg:text-4xl" />
                        </div>
                        <p className="mt-2 text-sm text-gray-700 max-w-64 text-center"><span className="font-semibold">Address : </span> Palliparamban House, Chemmankadavu, Kodur, pin:676504</p>
                    </div>

                    {/* Phone Icon */}
                    <div className="flex flex-col items-center">
                        <div className="flex items-center justify-center w-14 h-14 bg-[#008073] rounded-full text-white">
                            <FaPhoneAlt size={24} className="md:text-3xl lg:text-4xl" />
                        </div>
                        <p className="mt-2 text-sm text-gray-700 max-w-64 text-center"><span className="font-semibold">Phone : </span> +91 7511152129</p>
                    </div>

                    {/* Telegram Icon */}
                    <div className="flex flex-col items-center">
                        <div className="flex items-center justify-center w-14 h-14 bg-[#008073] rounded-full text-white">
                            <FaTelegramPlane size={24} className="md:text-3xl lg:text-4xl" />
                        </div>
                        <p className="mt-2 text-sm text-gray-700 max-w-64 text-center"><span className="font-semibold">Email : </span> arifzaidaiju@gmail.com</p>
                    </div>

                    {/* Globe Icon */}
                    <div className="flex flex-col items-center">
                        <div className="flex items-center justify-center w-14 h-14 bg-[#008073] rounded-full text-white">
                            <FaGlobe size={24} className="md:text-3xl lg:text-4xl" />
                        </div>
                        <p className="mt-2 text-sm text-gray-700 max-w-64 text-center"><span className="font-semibold">Website : </span> arifzaidpp.com</p>
                    </div>
                </div>
                </section>
            </form>
        </>
    );
};

export default Contact;
