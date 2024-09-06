import React from "react";
import { FaMapMarkerAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

const SingleListingCardView = ({ index, listing }) => {
	return (
		<div className="bg-white rounded-lg shadow-lg w-full sm:max-w-[350px] flex flex-col gap-5 overflow-hidden border-0 border-yellow-200">

            <Link to={`/listing/${listing._id}`}>
                <img
                    src={listing.images[0]}
                    alt="listing image"
                    className="w-full h-[280px] rounded-lg 
                    transition ease-in-out delay-150 hover:scale-110 cursor-pointer duration-300"
                />
            </Link>

			<div className="flex flex-col gap-3 px-3 py-5 text-start">

            <Link to={`/listing/${listing._id}`}>
                <span className="text-2xl font-semibold hover:underline">{listing.name}</span>
            </Link>

                <div className="flex flex-row gap-3">
                    <FaMapMarkerAlt size={20} color="green" />
                    <span className="text-sm">{listing.address}</span>
                    
                </div>

                <span className="text-base">{listing.description}</span>

                <div className="flex flex-row gap-3">
                    <span className="text-xl font-semibold"> ${listing.regularPrice}</span>
                    <span className="text-xl font-semibold"> {listing.sellOrRent === 'rent' ? "/ month" : "" }</span>
                </div>

                <div className="flex flex-row row gap-5">

                    <div className="flex flex-row gap-3">
                        <span className="text-sm font-bold">{listing.beds}</span>
                        <span className="text-sm font-bold">{listing.beds > 1 ? "beds" : "bed"}</span>
                    </div>

                    <div className="flex flex-row gap-3">
                        <span className="text-sm font-bold">{listing.baths}</span>
                        <span className="text-sm font-bold">{listing.baths > 1 ? "baths" : "bath"}</span>
                    </div>

                </div>


            </div>
		</div>
	);
};

export default SingleListingCardView;
