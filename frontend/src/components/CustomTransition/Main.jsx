// src/components/CustomTransition.jsx

import React, { forwardRef } from 'react';
import { Transition } from 'react-transition-group';

const CustomTransition = forwardRef(({ children, ...props }, ref) => (
  <Transition {...props}>
    {(status) => (
      <div ref={ref} className={`transition-${status}`}>
        {children}
      </div>
    )}
  </Transition>
));

export default CustomTransition;
