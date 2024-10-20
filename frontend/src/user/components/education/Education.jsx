import React from "react";
import SectionHeaders from "../sectionHeaders/SectionHeaders";
import "./Education.css";
import useGetAllEducations from "../../../hooks/education/useGetAllEducations";

const Education = () => {
    // Get all education from the API
    const { educations, loading, error } = useGetAllEducations();

    return (
        <>
            <SectionHeaders section="Education" />
            <ul className="timeline timeline-snap-icon max-md:timeline-compact timeline-vertical py-20  bg-[url('./src/assets/bg.png')]">
                {educations.map((edu, index) => (
                    <li key={index}>
                        {/* Remove the first hr for the first item */}
                        {index === 0 ? null : <hr className={edu.status ? "bg-indigo-500" : "bg-gray-800"} />}
                        <div className="timeline-middle">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                className={edu.status ? "text-indigo-500 h-5 w-5" : " h-5 w-5"}>
                                <path
                                    fillRule="evenodd"
                                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </div>
                        <div className={index % 2 === 0 ? `timeline-start mb-10 md:text-end timeline-box text-gray-300 ${edu.status ? "bg-blue-500 text-rgb-white" : "bg-gray-800"} shadow-lg border-none ` : `timeline-end timeline-box text-gray-300 ${edu.status ? "bg-blue-500 text-rgb-white" : "bg-gray-800"} shadow-lg border-none`}>
                            <time className="font-mono italic">{edu.year}</time>
                            <div className="text-lg font-black">{edu.education}</div>
                           {edu.institution}
                        </div>

                        <div className="flex-grow h-1 bg-gray-300"></div>
                        
                        {/* Add the last hr for the last item */}
                        {index === educations.length - 1 ? null : (
                            <hr className={
                                educations[index + 1].status ? "bg-indigo-500" : "bg-gray-800"
                            } />
                        )}
                    </li>
                ))}
            </ul>
        </>
    );
};

export default Education;
