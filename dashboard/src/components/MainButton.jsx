import { PulseLoader } from 'react-spinners'

const MainButton = ({ text, type, className = "", onClick, loader = false, loaderSize = 10 }) => {
    return <button type={type} onClick={onClick} className={` ${className} ${loader ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`} disabled={loader}>
        {loader ? (
            <PulseLoader color='#ffffff' size={loaderSize} />
        ) : (
            text
        )}
    </button>
}

export default MainButton