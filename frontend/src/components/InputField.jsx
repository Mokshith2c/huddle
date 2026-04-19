const InputField = ({
  type = "text",
  placeholder,
  onChange,
  value,
  ref = null,
  wrapperClassName = "",
  inputClassName = "",
}) => {
  return (
    <div className={`w-full mb-4 ${wrapperClassName}`.trim()}>
      <input
        ref = {ref}
        onChange={onChange}
        type={type}
        value = {value}
        placeholder={placeholder}
        className={`w-full px-4 py-3 rounded-lg bg-[#151a22] border border-[#2a3340] text-gray-100 placeholder-gray-500 text-sm focus:outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 transition ${inputClassName}`.trim()}
      />
    </div>
  );
};

export default InputField;