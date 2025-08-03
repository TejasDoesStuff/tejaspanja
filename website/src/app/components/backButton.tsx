export default function backButton({ setCurrentPage, page }) {
    return (
        <button 
            onClick={() => setCurrentPage(page)} 
            className="flex items-center text-sm hover:underline cursor-pointer group"
        >
            <img 
                src="/left-arrow.svg" 
                alt="←" 
                className="w-4 h-4 transition-transform duration-300 ease-in-out transform translate-x-0.5 opacity-0 group-hover:opacity-100 group-hover:-translate-x-0.5" 
            />
            <span>back</span>
        </button>
    )
}