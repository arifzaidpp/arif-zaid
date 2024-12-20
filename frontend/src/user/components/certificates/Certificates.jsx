import React, { useState } from 'react';
import SectionHeaders from '../sectionHeaders/SectionHeaders';
import { AiOutlineClose } from 'react-icons/ai';
import useGetAllCertificates from '../../../hooks/certificate/useGetAllCertificate';

const Certificates = () => {
  const [selectedImage, setSelectedImage] = useState(null); // For full-screen image display

  // Get all certificates from the API
  const { certificates, loading, error } = useGetAllCertificates();

  const openFullScreen = (image) => {
    setSelectedImage(image);
  };

  const closeFullScreen = () => {
    setSelectedImage(null);
  };

  return (
    <>
      <SectionHeaders section="Certificates" />

<div className=" bg-[url('./src/assets/bg.png')]">
      {/* Certificates Gallery */}
      <div className="columns-1 sm:columns-2 md:columns-3 xl:columns-4 mx-auto pb-10 w-full max-w-[90%] gap-4 space-y-4 py-10  ">
        {certificates.map((cert, index) => (
          <div key={index} className="relative mb-4 cursor-pointer overflow-hidden shadow-lg transform transition-transform duration-300 hover:scale-105" onClick={() => openFullScreen(cert.image)}>
            <img 
              className="rounded-md w-full"
              src={cert.image} 
              alt={cert.title} 
            />
            <div className="absolute inset-0 bg-black bg-opacity-50 rounded-md flex items-center justify-center text-white opacity-0 hover:opacity-100 transition-opacity duration-300">
              <div className="text-center p-2">
                <h3 className="font-bold text-lg">{cert.name}</h3>
                <p className="text-sm">{cert.category}</p>
                <p className="text-sm">{new Date(cert.date).toLocaleDateString('en-CA')}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Full-Screen Image Modal */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50">
          <img
            src={selectedImage}
            alt="Certificate Fullscreen"
            className="w-auto h-auto max-w-full max-h-full"
          />
          <button
            className="absolute top-4 right-4 text-white text-3xl"
            onClick={closeFullScreen}
          >
            <AiOutlineClose />
          </button>
        </div>
      )}
      </div>
    </>
  );
};

export default Certificates;
