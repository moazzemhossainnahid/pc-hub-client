const InputField = ({ label, id, placeholder, type, register, errors }) => {
  return (
    <div>
      <label
        htmlFor={id}
        className="mt-4 block text-base leading-relaxed text-zinc-900"
      >
        {label}
      </label>

      <input
        id={id}
        type={type}
        placeholder={placeholder}
        className="w-full placeholder:italic placeholder:text-sm placeholder:text-zinc-400 px-4 py-3 rounded-md text-gray-800 border border-gray-700 bg-gray-50"
        {...register(id, { required: `${label}` })}
      />

      <p className="text-red-500">{errors[id] ? errors[id]?.message : ""}</p>
    </div>
  );
};

export default InputField;
