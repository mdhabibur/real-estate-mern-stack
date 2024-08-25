import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { deleteListing } from '../../redux/listing/listingApi'

const ShowListing = ({index, listing}) => {

const dispatch = useDispatch()

 const handleDeleteListing = async (listingId) => {
    console.log(listingId)

    dispatch(deleteListing({url: `/api/user/listing/delete/${listingId}`}))

 }   

  return (
        <div className='flex border rounded-lg p-3 m-3 items-center'>

            <Link to={`/listing/${listing._id}`} className='flex flex-1 items-center text-start hover:underline'>
                <img className='w-16 h-16 rounded-lg' src={listing.images[0]} alt="listing image" />
                <h4 className='font-semibold text-lg flex-1 mx-3'>{listing.name}</h4>
            </Link>

            <div className='flex flex-col gap-3'>
                <button onClick={() => handleDeleteListing(listing._id)} className='uppercase text-red-600 font-semibold'>Delete</button>
                <button className='uppercase text-green-600 font-semibold'>Edit</button>
            </div>

        </div>

  )
}

export default ShowListing