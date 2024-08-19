export const loadingMsg = () => {
    return <div className="bg-indigo-300 font-semibold text-lg rounded-lg p-3 mx-5 mt-4">loading....</div>
}

export const errorMsg = (error) => {
    if(error === null) {
        return ""
    }
    return <div className="bg-red-500 font-semibold text-lg rounded-lg p-3 mx-5 mt-4">{error}</div>
}

export const successMsg = (success) => {
    if(success === null){
        return ""
    }
    return <div className="bg-pink-300 font-semibold text-lg rounded-lg p-3 mx-5 mt-4">{success}</div>
}