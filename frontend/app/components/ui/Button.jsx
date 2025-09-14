const Button = ({ children, onClick, variant, type, className }) => {
  return (
    <button
      onClick={onClick}
      type={type}
      className={`h-9 px-4 py-2 flex items-center justify-center rounded-lg bg-primary hover:bg-primary/90 ${variant === 'secondary' && 'bg-secondary hover:bg-secondary/90'} text-background cursor-pointer gap-2 duration-100 ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
