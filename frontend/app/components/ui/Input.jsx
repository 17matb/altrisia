const Input = ({ type, value, setValue, placeholder, className }) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={(e) => setValue(e.target.value)}
      className={`bg-foreground/5 border border-foreground/10 h-9 p-2 flex w-full items-center justify-center rounded-lg ${className}`}
    />
  );
};

export default Input;
