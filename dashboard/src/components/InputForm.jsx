const InputForm = ({ type = "text", name, value, className = "", placeholder, onChange, loader }) => {
    return <input type={type} name={name} value={value} onChange={onChange} className={`${className} ${loader ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`} placeholder={placeholder} disabled={loader} />
}

export default InputForm