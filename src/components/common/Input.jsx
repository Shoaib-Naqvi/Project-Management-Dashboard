import { forwardRef } from 'react';
import './Input.css';

const Input = forwardRef(({ multiline, className = '', ...props }, ref) => {
  const baseClassName = `common-input ${className}`;
  
  if (multiline) {
    return (
      <textarea
        ref={ref}
        className={baseClassName}
        {...props}
      />
    );
  }

  return (
    <input
      ref={ref}
      className={baseClassName}
      {...props}
    />
  );
});

Input.displayName = 'Input';

export default Input;
