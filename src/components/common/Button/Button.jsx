import './Button.css';


const Button = ({ 
  children, 
  variant = 'default', 
  size = 'medium', 
  disabled = false, 
  onClick, 
  className = '',
  ...props 
}) => {
  const buttonClass = `button button--${variant} button--${size} ${className}`;

  return (
    <button 
      className={buttonClass}
      disabled={disabled}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;