import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { errorMsg, loadingMsg, successMsg } from '../utils/messages'
import { FaMapMarkerAlt, FaBed, FaBath, FaParking, FaChair  } from 'react-icons/fa'
import { FaShareFromSquare } from "react-icons/fa6";


const ListingDetails = () => {

  const {currentUser} = useSelector((state) => state.auth)

  const [fetchListingLoading, setFetchListingLoading] = useState(false)
  const [fetchListingError, setFetchListingError] = useState(null)
  const [fetchListingSuccess, setFetchListingSuccess] = useState(null)

  const [currentUrlCopied, setCurrentUrlCopied] = useState(false)


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

  console.log("form data: ", formData)

  const handleShareClick = (e) => {
    console.log("window: ", window)

    const currentUrl = window.location.href
    window.navigator.clipboard.writeText(currentUrl).then(() => {
      setCurrentUrlCopied(true)
      console.log("copied")
      setTimeout(() => {
        setCurrentUrlCopied(false)
      }, 3000)

    })
    .catch((err) => console.log("failed to share the url",error))

  }



  return (
    <>
    {fetchListingLoading && loadingMsg()}
    {fetchListingError && errorMsg(fetchListingError)}
    {fetchListingSuccess && successMsg(fetchListingSuccess)}

    <div>

      <div className='relative self-center w-full'>
        <div className='absolute top-10 right-10 flex flex-col items-center p-3 gap-3'>
          <FaShareFromSquare  size={40} className='text-gray-500 cursor-pointer ' onClick={handleShareClick}/>
          <span className='text-lg font-semibold text-violet-600'>{currentUrlCopied ? "Copied!" : " "}</span>
        </div>


        <img className='w-full max-h-[650px] mx-auto object-cover rounded-lg' src={formData.images[0]} alt="listing image" />
      </div>

      <div className='flex flex-col gap-5 my-3 p-3 max-w-2xl mx-auto border-4 border-green-100 shadow-lg rounded-lg'>

        <div className='flex gap-3 flex-wrap'>
        <h4 className='font-bold text-xl'>{formData.name} - $</h4>
        <h4 className='font-bold text-xl'> {formData.regularPrice}</h4>
        <h4 className='font-bold text-xl'> {formData.sellOrRent === 'rent' ? '/ month' : ""}</h4>
        </div>

        <div className='flex gap-3 items-center'>
          <FaMapMarkerAlt size={25} color='green' />
          <span className='text-xl font-semibold text-green-700'> {formData.address}</span>
        </div>

        <div>
          <button className='bg-red-800 px-10 py-1 rounded-lg uppercase font-semibold text-white'>{formData.sellOrRent}</button>
        </div>

        <div className='flex gap-3'>
          <span className='font-semibold'>Description - </span>
          <span>{formData.description}</span>
        </div>

        <div>

          <ul className=' flex gap-5 text-green-700 flex-wrap'>


            <li className=''>
              <div className='flex gap-2 items-center'>

                <FaBed size={20} />
                <span>{formData.beds}</span>
                <span>{formData.beds > 1 ? "beds" : "bed"}</span>

              </div>
            </li>

            <li className=''>
              <div className='flex gap-2 items-center'>

                <FaBath size={20} />
                <span>{formData.baths}</span>
                <span>{formData.baths > 1 ? "baths" : "bath"}</span>

              </div>
            </li>

            <li className=''>
              <div className='flex gap-2 items-center'>

                <FaParking size={20} />
                <span>{formData.parking ? "Parking" : "No Parking"}</span>

              </div>
            </li>


            <li className=''>
              <div className='flex gap-2 items-center'>

                <FaChair size={20} />
                <span>{formData.furnished ? "Furnished" : "Not Furnished"}</span>
              </div>
            </li>


          </ul>


        </div>


      </div>

    </div>
    </>
  )
}

export default ListingDetails