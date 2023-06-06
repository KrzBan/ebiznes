function Error({msg, onClick}){

    return( 
        <div className="bg-red-300 p-4 m-1 rounded-lg relative">
          <label className="m-4">{msg}</label>
          <button type="button" onClick={onClick} className="absolute right-1 top-1 bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
              <span className="sr-only">Close menu</span>
              <svg className="h-1 w-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
        </div>
    )
}

export default Error;