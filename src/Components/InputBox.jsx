const InputBox = ({type, required, className, placeholder}) => {
  return (
    <div>
      <input
        type={type}
        required={required}
        className={className}
        placeholder={placeholder}
      />
    </div>
  );
};

export default InputBox;
