import React from 'react'

const SectionHeaders = ( {section} ) => {
  return (
    <h3
            className="text-2xl sm:text-3xl md:text-4xl lg:text-4xl leading-10 py-4 px-6 md:py-7 md:px-10 uppercase text-white tracking-wide"
            style={{
              fontWeight: 100,
              backgroundColor: '#008073',
            }}
          >{section}</h3>
  )
}

export default SectionHeaders