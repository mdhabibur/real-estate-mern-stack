import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { errorMsg, loadingMsg, successMsg } from '../utils/messages'
import { FaMapMarkerAlt, FaBed, FaBath, FaParking, FaChair  } from 'react-icons/fa'
import { FaShareFromSquare } from "react-icons/fa6";

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';



import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { getListingDetails } from '../redux/listing/listingApi'
import { setListingTimerOff } from '../redux/listing/listingSlice'



const ListingDetails = () => {

  const {currentUser} = useSelector((state) => state.auth)
  const {listing, fetchListingLoading, fetchListingError, fetchListingSuccess} = useSelector((state) => state.listing)

  const [currentUrlCopied, setCurrentUrlCopied] = useState(false)
  const dispatch = useDispatch()


  const {listingId} = useParams()
  console.log("listing id: ", listingId)

  const [contactMessage, setContactMessage] = useState(null)

  // const [formData, setFormData] = useState({
  //     name: '',
  //     description: '',
  //     address: '',
  //     sellOrRent: '',
  //     parking: false,
  //     furnished: false,
  //     offer: false,
  //     beds: 1,
  //     baths: 1,
  //     regularPrice: '',
  //     discountedPrice: '',
  //     images: [],
  //     userRef: ''

  // })


  //get the listing when the page mounts
  useEffect(() => {

      const fetchListing = async (listingId) => {
        dispatch(getListingDetails({url: `/api/user/listing/${listingId}`}))
        // setFormData(listing)
      }

      fetchListing(listingId)

  },[listingId])


  useEffect(() => {
    //timer object
    let timer 
    if(fetchListingError || fetchListingSuccess){

      timer = setTimeout(() => {
        dispatch(setListingTimerOff())
      }, 3000)
    }

    //cleanup timer on unmount
    return () => clearTimeout(timer)


  }, [fetchListingError, fetchListingSuccess ])

  // console.log("form data: ", formData)

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
    .catch((err) => console.log("failed to share the url", err))

  }

  const handleContactFormChange = (e) => {
    console.log(e.target.value)
    setContactMessage(e.target.value)
  }


  console.log("contact msg: ", contactMessage)


  return (
    <>
    {fetchListingLoading && loadingMsg()}
    {fetchListingError && errorMsg(fetchListingError)}
    {/* {fetchListingSuccess && successMsg(fetchListingSuccess)} */}

    <div>

      <div className='relative self-center w-full'>

        <div className='absolute top-10 right-10 flex flex-col items-center p-3 gap-3 z-10'>
          <FaShareFromSquare  size={40} className='text-yellow-600 cursor-pointer ' onClick={handleShareClick}/>
          <span className='text-lg font-semibold text-violet-600'>{currentUrlCopied ? "Copied!" : " "}</span>
        </div>



        <Swiper 
          modules={[Navigation, Pagination, Scrollbar, A11y]}
          spaceBetween={50}
          slidesPerView={1}
          navigation
          pagination = {{ clickable: true }}
          scrollbar = {{ draggable: true }}
          onSlideChange={() => console.log('slide changed')}
          onSwiper={(swiper) => console.log(swiper)}
          >

            {listing && listing?.images?.map((image, index) => (
              <SwiperSlide key={index}>
                <img className='w-full max-h-[650px] mx-auto object-cover rounded-lg' src={image} alt={`listing image in slide ${index}`} />
              </SwiperSlide>
            ))}


        </Swiper>


      </div>

      <div className='flex flex-col gap-5 my-3 p-3 max-w-2xl mx-auto border-4 border-green-100 shadow-lg rounded-lg'>

        <div className='flex gap-3 flex-wrap'>
        <h4 className='font-bold text-xl'>{listing.name} - $</h4>
        <h4 className='font-bold text-xl'> {listing.regularPrice}</h4>
        <h4 className='font-bold text-xl'> {listing.sellOrRent === 'rent' ? '/ month' : ""}</h4>
        </div>

        <div className='flex gap-3 items-center'>
          <FaMapMarkerAlt size={25} color='green' />
          <span className='text-xl font-semibold text-green-700'> {listing.address}</span>
        </div>

        <div className='flex flex-row gap-3'>
          <button className='bg-red-800 px-10 py-1 rounded-lg uppercase font-semibold text-white'>{listing.sellOrRent}</button>

          {listing.offer && (<button className='bg-green-700 px-10 py-1 rounded-lg uppercase font-semibold text-white'> ${listing.discountedPrice} Discount</button>)}


        </div>

        <div className='flex gap-3'>
          <span className='font-semibold'>Description - </span>
          <span>{listing.description}</span>
        </div>

        <div>

          <ul className=' flex gap-5 text-green-700 flex-wrap'>


            <li className=''>
              <div className='flex gap-2 items-center'>

                <FaBed size={20} />
                <span>{listing.beds}</span>
                <span>{listing.beds > 1 ? "beds" : "bed"}</span>

              </div>
            </li>

            <li className=''>
              <div className='flex gap-2 items-center'>

                <FaBath size={20} />
                <span>{listing.baths}</span>
                <span>{listing.baths > 1 ? "baths" : "bath"}</span>

              </div>
            </li>

            <li className=''>
              <div className='flex gap-2 items-center'>

                <FaParking size={20} />
                <span>{listing.parking ? "Parking" : "No Parking"}</span>

              </div>
            </li>


            <li className=''>
              <div className='flex gap-2 items-center'>

                <FaChair size={20} />
                <span>{listing.furnished ? "Furnished" : "Not Furnished"}</span>
              </div>
            </li>


          </ul>


        </div>

        {console.log("current singed in user: " , currentUser?._id?.toString())}
        {console.log("listing owner: ", listing?.user?._id.toString())}

        {currentUser?._id?.toString() !== listing?.user?._id.toString() && (
          
          <div className='flex flex-col gap-3'>

            <div className='flex flex-row gap-3'>
               <p>Contact </p>
               <span className='font-semibold text-blue-700'>{listing?.user?.username}</span>
               for 
               <span className='font-semibold text-blue-700'>{listing?.name}</span>
            </div>

            <textarea name="contactLandlord" id="contactLandlord" className ="p-3 rounded-lg" placeholder='Enter Your Messages To Contact With Owner' 
            value = {contactMessage}
            onChange={handleContactFormChange}></textarea>

            <a 
              href={`mailto:${listing?.user?.email}?subject=${encodeURIComponent(`Regarding ${listing.name}`)}&body=${encodeURIComponent(contactMessage)}`} 
              className="bg-slate-600 p-3 rounded-lg text-white uppercase text-center"
            >
              Send Message
            </a>


          </div>
        )}


      </div>

    </div>
    </>
  )
}

export default ListingDetails