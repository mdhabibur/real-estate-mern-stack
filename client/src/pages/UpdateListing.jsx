import React, { useEffect, useState } from 'react'
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage'
import { app } from '../firebase/firebase'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { errorMsg, loadingMsg, successMsg } from '../utils/messages'

const UpdateListing = () => {

    const {currentUser} = useSelector((state) => state.auth)

    const [fetchListingLoading, setFetchListingLoading] = useState(false)
    const [fetchListingError, setFetchListingError] = useState(null)
    const [fetchListingSuccess, setFetchListingSuccess] = useState(null)

    const [selectedImgFiles, setSelectedImgFiles] = useState(null)
    const [selectedImgLoading, setSelectedImgLoading] = useState(false)
    const [selectedImgError, setSelectedImgError] = useState(null)
    const [imgUrls, setImgUrls] = useState([])

    const [formSubmitLoading, setFormSubmitLoading] = useState(false)
    const [formSubmitError, setFormSubmitError] = useState(null)
    const [formSubmitSuccess, setFormSubmitSuccess] = useState(null)
    const [idOfListingUpdated, setIdOfListingUpdated] = useState(null)

    const navigate = useNavigate()

    const {listingId} = useParams()
    console.log("listing id: ", listingId)

    const [formData, setFormData] = useState({
        name: '',
        description: '',
        address: '',
        sellOrRent: '',
        parking: false,
        furnished: false,
        offer: false,
        beds: 1,
        baths: 1,
        regularPrice: '',
        discountedPrice: '',
        images: [],
        userRef: ''

    })


    //get the listing when the page mounts
    useEffect(() => {

        const fetchListing = async (listingId) => {
            try {
            
               setFetchListingLoading(true)
               const response = await fetch(`/api/user/listing/${listingId}`,{
                    method: "GET"
                })
                const data = await response.json()

                if(data.success === false){
                    setFetchListingLoading(false)
                    setFetchListingError(data?.error || "error fetching listing FE")
                    return
                }

                setFetchListingLoading(false)
                setFetchListingSuccess(data?.message || "fetched listing successful")

                setFormData(data.listing)
                setImgUrls((prevUrls) => [...prevUrls, ...data.listing.images])
                console.log("listing: ", data)
                
            } catch (error) {
                setFetchListingLoading(false)
                setFetchListingError(error || "error fetching listing FE")
                
            }


        }

        fetchListing(listingId)

    },[listingId])


    useEffect(() => {
        //timer object
        let timer 
        if(fetchListingError || fetchListingSuccess){

          timer = setTimeout(() => {
            setFetchListingError(null)
            setFetchListingSuccess(null)
          }, 3000)
        }
    
        //cleanup timer on unmount
        return () => clearTimeout(timer)

    
      }, [fetchListingError, fetchListingSuccess ])
    


    const handleImageChange = (e) => {
        console.log("images files:", e.target.files)
        setSelectedImgFiles(e.target.files)
    }

    const handleImageUpload = async (e) => {
        if(!selectedImgFiles) {
            return setSelectedImgError("no image selected")
        }
        if(selectedImgFiles.length < 0 || (selectedImgFiles.length + imgUrls.length > 6)){
            return setSelectedImgError("can not upload more that 6 images")
        }

        const storage = getStorage(app)
        const uploadPromises = []

        for(let i = 0; i < selectedImgFiles.length; i++){

            const file = selectedImgFiles[i]
            const fileRef = ref(storage, `listings/${currentUser._id}/${Date.now()}-${file.name}`)

            //return the promise of uploading and getting download url
            const uploadTask = uploadBytes(fileRef, file).then(async (snapshot) => {
                const downloadUrl = await getDownloadURL(snapshot.ref)
                return downloadUrl
            })

            uploadPromises.push(uploadTask)

        }

        //Resolve all the promises and get the download urls
        try {
           setSelectedImgLoading(true)
           const resolvedImgUrls =  await Promise.all(uploadPromises)
           setImgUrls([...imgUrls, ...resolvedImgUrls])
           setFormData((prevData) => ({
            ...prevData,
            images: [...prevData.images, ...resolvedImgUrls]

           }))

           console.log('Uploaded URLs:', imgUrls);
           setSelectedImgLoading(false)

        } catch (error) {
            setSelectedImgError("could not get resolve the image upload promise")
            console.error('Upload error:', error);
            setSelectedImgLoading(false)
            
        }



    }

    useEffect(() => {

        //timer object
        let timer 
        if(selectedImgError){
          timer = setTimeout(() => {
            setSelectedImgError(null)
          }, 3000)
        }
    
        //cleanup timer on unmount
        return () => clearTimeout(timer)
    
    
      }, [selectedImgError])

    const handleImgDelete = async (index) => {
        setImgUrls(imgUrls.filter((url, i) => i != index))
        setFormData((prevData) => ({
            ...prevData,
            images: prevData.images.filter((url, i) => i !== index)

        }))
    }

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        console.log("event type :", type)
        console.log(" name :",  name)
        console.log(" value :",  value)
        console.log(" checked :",  checked)

        setFormData((prevData) => ({
            ...prevData,
            [name] : type === 'checkbox' ? checked : value
        }) )



    }

    const handleFormSubmit = async (e) => {
        e.preventDefault()

        console.log("form submitted")

        if(+formData.discountedPrice > +formData.regularPrice){
            return setFormSubmitError("Regular price must be greater than discounted price")
        }

        if(formData.images.length < 1){
            return setFormSubmitError("upload at least one image")
        }

        try {
            setFormSubmitLoading(true)
            const response = await fetch(`/api/user/listing/edit/${listingId}`,{
                method: 'PUT',
                headers: {"Content-Type": 'application/json'},
                body: JSON.stringify({...formData, userRef: currentUser._id}),
                credentials: 'include'
            })
            
			const data = await response.json();

			console.log("data: ", data);

			if (data.success === false) {
                setFormSubmitLoading(false)
				return setFormSubmitError(data?.error || "listing update failed");
			}

            setFormSubmitLoading(false)
            setFormSubmitSuccess(data?.message || "listing updated")
            setIdOfListingUpdated(data?.listing._id)
			return data;
		} catch (error) {
			console.log("error: ", error);
            setFormSubmitLoading(false)
			return setFormSubmitError("an error occurred during listing updating in CE");
		}


    }


    useEffect(() => {

        //timer object
        let timer 
        if(formSubmitError || formSubmitSuccess){

          if(formSubmitSuccess){
            navigate(`/listing/${idOfListingUpdated}`)
            setFormSubmitSuccess(null)
            return
          }  

          timer = setTimeout(() => {
            setFormSubmitError(null)
          }, 3000)
        }
    
        //cleanup timer on unmount
        return () => clearTimeout(timer)
    
    
      }, [formSubmitError, formSubmitSuccess, navigate ])


    console.log("formData: ", formData)
    console.log("user id: ", currentUser._id)

  return (
    <>
    <div id='main' className='max-w-4xl mx-auto items-center p-3 m-3'>
        <h3 className='text-center text-2xl font-semibold py-5'>Update Listing</h3>


        {/* fetch listing messages  */}

        {fetchListingLoading && loadingMsg() }
        {fetchListingError && errorMsg(fetchListingError)}
        {/* {fetchListingSuccess && successMsg(fetchListingSuccess)} */}

        <form onSubmit={handleFormSubmit} className='flex flex-col sm:flex-row gap-3 border rounded-lg shadow-md p-5'>

            <div className="leftSide flex flex-1 flex-col gap-5 p-3 mb-3 pb-10">

                <input 
                type="text"
                name="name"
                id="name" 
                placeholder='name'
                className='p-3 rounded-lg'
                required
                value={formData.name}
                onChange={handleInputChange}/>

                <textarea 
                name="description" 
                id="description"
                placeholder='description'
                className='p-3 rounded-lg'
                required
                value={formData.description}
                onChange={handleInputChange}/>


                <input 
                type="text"
                name="address"
                id="address"
                placeholder='address' 
                className='p-3 rounded-lg'
                required
                value={formData.address}
                onChange={handleInputChange}/>

                <div className='flex gap-10 items-center'>
                    <div className='flex gap-2 items-center'>
                        <input type="radio"
                        name="sellOrRent" 
                        id=""
                        value="sell"
                        className='w-5 h-5'
                        checked={formData.sellOrRent === 'sell'}
                        onChange={handleInputChange}
                        required
                        />
                      <span>Sell</span>
                    </div>

                    <div className='flex gap-2 items-center'>
                        <input 
                        type="radio"
                        name="sellOrRent"
                        id="" 
                        value="rent"
                        className='w-5 h-5'
                        required
                        checked={formData.sellOrRent === "rent"}
                        onChange={handleInputChange}
                        />
                      <span>Rent</span>
                    </div>
                </div>

                <div className='flex gap-4 flex-wrap items-center my-3'>
                    <div className='flex gap-2 items-center'>

                        <input
                        type="checkbox" 
                        name="parking"
                        id="parking"
                        className='w-5 h-5 rounded-lg'
                        checked={formData.parking}
                        onChange={handleInputChange}
                        />
                    <span>Parking Spot</span>
                    </div>

                    <div className='flex gap-2 items-center'>

                        <input 
                        type="checkbox"
                        name="furnished" 
                        className='w-5 h-5 rounded-lg '
                        id="furnished" 
                        checked={formData.furnished}
                        onChange={handleInputChange} 
                        />

                    <span>Furnished</span>
                    </div>

                    <div className='flex gap-2 items-center'>
                        <input 
                        type="checkbox" 
                        name="offer"
                        id="offer"
                        className='w-5 h-5 rounded-lg'
                        checked={formData.offer}
                        onChange={handleInputChange}
                        />

                    <span>Offer</span>
                    </div>

                </div>

                <div className='flex gap-4'>
                    <div className='flex gap-2 items-center'>

                        <input 
                        type="number" 
                        name="beds" 
                        id="beds" 
                        min='1' 
                        max='10' 
                        className='rounded-lg p-3'
                        required
                        value={formData.beds}
                        onChange={handleInputChange}
                        />

                    <span>Beds</span>
                    </div>

                    <div className='flex gap-2 items-center'>

                        <input 
                        type="number"
                        name="baths" 
                        id="baths"
                        min='1' 
                        max='10' 
                        className='rounded-lg p-3'
                        required
                        value={formData.baths}
                        onChange={handleInputChange}
                        />

                    <span>Baths</span>
                    </div>

                </div>


                <div className='flex gap-2 items-center'>

                        <input 
                        type="number"
                        name="regularPrice"
                        id="regularPrice"
                        min='0'
                        max='1000000' 
                        className='rounded-lg p-3'
                        placeholder='0'
                        required
                        value={formData.regularPrice}
                        onChange={handleInputChange}
                        />

                    <span>Regular price</span>
                   {formData.sellOrRent === "rent" && (
                     <span>($ / month)</span>
                   )}
                </div>

                {formData.offer && (

                    <div className='flex gap-2 items-center'>

                    <input 
                    type="number" 
                    name="discountedPrice" 
                    id="discountedPrice" 
                    min='0'
                    max='1000000'
                    placeholder='0'
                    className='rounded-lg p-3' 
                    required 
                    value={formData.discountedPrice}
                    onChange={handleInputChange}
                    />

                    <span>Discounts</span>
                
                    </div>
                    )}



            </div>


            <div className="rightSide flex flex-1 flex-col gap-5 p-3 mb-3 pb-10 ">

                <div className='flex gap-2'>
                <h3 className='font-bold'>Images: </h3>
                <span>The first image will be the cover (max 6)</span>
                </div>

                <div className='flex gap-5'>

                    <input type="file" name="listingImages" multiple
                    accept='image/*' id="listingImages" className='border border-slate-300 p-2 rounded-lg' onChange={handleImageChange}/>

                    <button type='button' className='border border-green-500 p-3 text-green-500 uppercase rounded-lg'
                    disabled={selectedImgLoading}
                    onClick={handleImageUpload}
                    >{selectedImgLoading ? "uploading..." : "upload"}</button>


                </div>

                {selectedImgLoading && loadingMsg()}
                {selectedImgError && errorMsg(selectedImgError)}

                <div className='flex flex-col gap-3'>
                    {imgUrls.map((url, index) => (

                        <div key={url} className='border p-3 rounded-lg flex justify-between'>
                            <img src={url} alt="uploaded images" className='w-20 h-20 object-cover rounded-lg' />

                            <button type='button' className='uppercase text-red-600' onClick={() => handleImgDelete(index)}>Delete</button>

                        </div>


                    ))}

                </div>

                <button disabled = {selectedImgLoading || formSubmitLoading} className='bg-slate-600 text-white rounded-lg p-3 uppercase hover:opacity-80 disabled:opacity-50'>{formSubmitLoading ? "updating..." : "update listing" }</button>

                {formSubmitLoading && loadingMsg()}
                {formSubmitError && errorMsg(formSubmitError)}
                {formSubmitSuccess && successMsg(formSubmitSuccess)}


            </div>

        </form>


       { console.log('Uploaded URLs:', imgUrls)}

    

    </div>
    </>


  )
}

export default UpdateListing