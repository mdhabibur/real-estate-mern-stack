import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { getListings, getRecentOfferListings, getRecentRentListings, getRecentSellListings } from "../redux/listing/listingApi"

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';



import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import SingleListingCardView from "../components/listings/SingleListingCardView";

const Home = () => {

  const {recentOfferListings, getRecentOfferListingsLoading, getRecentOfferListingsError, getRecentOfferListingsSuccess, recentRentListings, getRecentRentListingsLoading, getRecentRentListingsError, getRecentRentListingsSuccess, recentSellListings, getRecentSellListingsLoading,  getRecentSellListingsError, getRecentSellListingsSuccess } = useSelector((state) => state.listing)


  const dispatch = useDispatch()


  useEffect(() => {

    const fetchRecentOffer = async () => {

      const searchParams = new URLSearchParams({
        offer: "true",
        limit: 5
      }).toString()

      console.log(searchParams)

      dispatch(getRecentOfferListings({ url: "/api/user/listing/search?", queryParams: searchParams }))

    }

    const fetchRecentRent = async () => {

      const searchParams = new URLSearchParams({
        type: "rent",
        limit: 5
      }).toString()

      console.log(searchParams)

      dispatch(getRecentRentListings({ url: "/api/user/listing/search?", queryParams: searchParams }))

    }

    const fetchRecentSale = async () => {

      const searchParams = new URLSearchParams({
        type: "sell",
        limit: 5
      }).toString()

      console.log(searchParams)

      dispatch(getRecentSellListings({ url: "/api/user/listing/search?", queryParams: searchParams }))

    }

    fetchRecentOffer()
    fetchRecentRent()
    fetchRecentSale()

  }, [])


  console.log("recent offer listings: ", recentOfferListings)
  console.log("recent rent listings: ", recentRentListings)
  console.log("recent sell listings: ", recentSellListings)

  return (
    <div className="">

      <div className="max-w-xs sm:max-w-5xl mx-auto flex flex-col gap-5 py-20">

        <h4 className="font-bold text-3xl text-gray-700">Find your next <span className="text-gray-500">perfect </span>
        <br />
        place with ease</h4>

        <p className="text-sm text-gray-500">Sahand Estate will help you find your home fast, easy and comfortable.
        <br />
        Our expert support are always available.</p>

        <Link to='/search' className="text-blue-700 text-base font-semibold">Lets Start Now...</Link>

      </div>

      <div className="max-w-xs mx-auto sm:max-w-full ">
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

            {recentOfferListings && recentOfferListings?.map((listing, index) => (
              <SwiperSlide key={index}>
                <img className='w-full max-h-[650px] mx-auto object-cover rounded-lg' src={listing.images[0]} alt={`recentOfferListings image in slide ${index}`} />
              </SwiperSlide>
            ))}


        </Swiper>
      </div>


      <div className="max-w-xs sm:max-w-6xl py-8 mx-auto border text-center">

        <h3 className="text-2xl font-semibold">Recent Offer</h3>
        <Link to="/search?offer=true" className="text-sm text-blue-600 ">Show More Offers</Link>

        <div className="flex flex-row flex-wrap justify-center gap-5 p-3 rounded-lg">

          {recentOfferListings &&  recentOfferListings.map((listing, index) => (
            <SingleListingCardView
              key={listing._id}
              index={index}
              listing={listing}
            />
          ))}
        </div>
      </div>



      <div className="max-w-xs sm:max-w-6xl py-8 mx-auto border text-center">

      <h3 className="text-2xl font-semibold">Recent Places For Rent</h3>
      <Link to="/search?type=rent" className="text-sm text-blue-600">Show More Places For Rent</Link>

        <div className="flex flex-row flex-wrap justify-center gap-5 p-3 rounded-lg">

          {recentRentListings &&  recentRentListings.map((listing, index) => (
            <SingleListingCardView
              key={listing._id}
              index={index}
              listing={listing}
            />
          ))}
        </div>
      </div>


      <div className="max-w-xs sm:max-w-6xl py-8 mx-auto border text-center">

      <h3 className="text-2xl font-semibold">Recent Places For Sale</h3>
      <Link to="/search?type=sell" className="text-sm text-blue-600  ">Show More Places For Sale</Link>

        <div className="flex flex-row flex-wrap justify-center gap-5 p-3 rounded-lg">

          {recentSellListings &&  recentSellListings.map((listing, index) => (
            <SingleListingCardView
              key={listing._id}
              index={index}
              listing={listing}
            />
          ))}
        </div>
      </div>


    </div>
  )
}

export default Home