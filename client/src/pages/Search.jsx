import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getListings } from "../redux/listing/listingApi";
import SingleListingCardView from "../components/listings/SingleListingCardView";
import { useNavigate } from "react-router-dom";
import { errorMsg, loadingMsg, successMsg } from "../utils/messages";
import { resetListings, setListingTimerOff } from "../redux/listing/listingSlice";

const Search = () => {

	const { listings, getListingsLoading, getListingsError, getListingsSuccess } =
		useSelector((state) => state.listing);



	const dispatch = useDispatch();
    const navigate = useNavigate()



    const [formData, setFormData] = useState({
        searchTerm: "",
        type: "",
        parking: false,
        furnished: false,
        offer: false,
        sortBy: "",
		limit: 0

    })

    const handleInputChange = (e) => {
        if(e.target.name === "searchText"){
            setFormData((prevData) => ({...prevData, searchTerm: e.target.value}))
        }

        if(e.target.id === "rentOrSale" || e.target.id === "rent" || e.target.id === "sell"){
            console.log("name: ", e.target.name)
            setFormData((prevData) => ({...prevData, type: e.target.id}))
        }

        if(e.target.id === "parking" || e.target.id === "furnished" || e.target.id === "offer"){
            setFormData((prevData) => ({...prevData, [e.target.name] : e.target.checked}))

        }


    }

	const handleSortChange = (e) => {
		const value = e.target.value;
		setFormData((prevData) => ({...prevData, sortBy: value }))
	};


    const handleInputSubmit = (e) => {
        
      const urlStringParams =  new URLSearchParams(formData).toString()
      console.log("urlStringParams: ", urlStringParams)
      navigate(`/search?${urlStringParams}`)

    }



    useEffect(() => {

        const fetchSearchedResult = async () => {
		
		//first clear the previous listings
		dispatch(resetListings())

        console.log("query string from url: ", window.location.search)


        const queryParamsFromUrl = new URLSearchParams(window.location.search)
        console.log("querySearchParamsObj: ", queryParamsFromUrl)
        const queryObject = Object.fromEntries(queryParamsFromUrl.entries())
        console.log("query object from FE url", queryObject)

        setFormData((prevData) => ({
            ...prevData,
            searchTerm: queryObject.searchTerm,
            type: queryObject.type,
            parking: queryObject.parking,
            furnished: queryObject.furnished,
            offer: queryObject.offer,
            sortBy: queryObject.sortBy,
			limit: queryObject.limit

        }))


        dispatch(getListings({ url: "/api/user/listing/search", queryParams: window.location.search }));

    };

    fetchSearchedResult();


    }, [window.location.search])



	useEffect(() => {
		//timer object
		let timer;
		if (getListingsError || getListingsSuccess) {
			timer = setTimeout(() => {
				dispatch(setListingTimerOff());
			}, 3000);
		}

		//cleanup timer on unmount
		return () => clearTimeout(timer);
	}, [getListingsError, getListingsSuccess, dispatch]);



	return (
		<div className="flex flex-col sm:flex-row">


			<div className="leftDiv sm:border-r-2 sm:border-gray-200 flex flex-col gap-8 px-5 py-8 sm:max-h-full">


				<div className="flex gap-3 items-center">
					<span className="font-semibold text-lg whitespace-nowrap">
						Search Term:{" "}
					</span>

					<input
						type="search"
						className="p-3 rounded-lg max-w-full"
						name="searchText"
						id="searchText"
						placeholder="Search Text"
                        value={formData.searchTerm}
                        onChange={handleInputChange}
					/>
				</div>


				<div className="flex gap-3 items-center flex-wrap">
					<span className="font-semibold text-lg">Type: </span>

					<div className="flex gap-2 items-center">
						<input
							className="w-5 h-5"
							type="radio"
							name="rentOrSale"
							id="rentOrSale"
                            checked = {formData.type === 'rentOrSale'}
                            value={formData.type}
                            onChange={handleInputChange}
						/>
						<span className="text-base">Rent Or Sale</span>
					</div>

					<div className="flex gap-2 items-center">
						<input
							className="w-5 h-5 rounded-lg"
							type="radio"
							name="rentOrSale"
							id="rent"
                            checked = {formData.type === 'rent'}
                            value={formData.type}
                            onChange={handleInputChange}
						/>
						<span className="text-base">Rent</span>
					</div>

					<div className="flex gap-2 items-center">
						<input
							className="w-5 h-5 rounded-lg"
							type="radio"
							name="rentOrSale"
							id="sell"
                            checked = {formData.type === "sell"}
                            value={formData.type}
                            onChange={handleInputChange}
						/>
						<span className="text-base">Sale</span>
					</div>
				</div>



				<div className="flex gap-3 items-center flex-wrap">
					<span className="font-semibold text-lg">Amenities: </span>

					<div className="flex gap-2 items-center">
						<input
							className="w-5 h-5 rounded-lg"
							type="checkbox"
							name="parking"
							id="parking"
                            checked = {formData.parking === true || formData.parking === "true"}
                            value={formData.parking}
                            onChange={handleInputChange}
						/>
						<span className="text-base">Parking</span>
					</div>

					<div className="flex gap-2 items-center">
						<input
							className="w-5 h-5 rounded-lg"
							type="checkbox"
							name="furnished"
							id="furnished"
                            checked = {formData.furnished === true || formData.furnished === "true"}
                            value={formData.furnished}
                            onChange={handleInputChange}
						/>
						<span className="text-base">Furnished</span>
					</div>

					<div className="flex gap-2 items-center">
						<input
							className="w-5 h-5 rounded-lg"
							type="checkbox"
							name="offer"
							id="offer"
                            checked = {formData.offer === true || formData.offer === "true"}
                            value={formData.offer}
                            onChange={handleInputChange}
						/>
						<span className="text-base">Offer</span>
					</div>
				</div>

				<div className="flex gap-3 items-center flex-wrap">
					<span className="font-semibold text-lg">Sort By: </span>

					<div className="flex gap-2 items-center">
						<div className="relative inline-block text-left">
							<select
								className="block w-full p-3 border border-gray-200 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-base rounded-lg"
								value={formData.sortBy}
								onChange={handleSortChange}
							>
								<option value="price-high-to-low">Price High to Low</option>
								<option value="price-low-to-high">Price Low to High</option>
								<option value="latest">Latest</option>
								<option value="oldest">Oldest</option>
							</select>
						</div>
					</div>
				</div>

				<div className="flex gap-3 items-center flex-wrap">
					<button type="submit" onClick={handleInputSubmit} className="bg-slate-600 p-3 rounded-lg text-white w-full uppercase">
						Search
					</button>
				</div>
			</div>


			<div className="rightDiv flex flex-col gap-5 flex-1 p-3">
				<h3 className="text-3xl font-semibold text-center py-5">
					Listing Results:{" "}
				</h3>
				{console.log("listings: ", listings)}
                {console.log("formData: ", formData)}

				{getListingsLoading && loadingMsg()}
				{getListingsError && errorMsg(getListingsError)}
				{/* {getListingsSuccess && successMsg(getListingsSuccess)} */}



				<div className="flex flex-row flex-wrap justify-center gap-5 p-3 rounded-lg">

					{listings.map((listing, index) => (
						<SingleListingCardView
							key={listing._id}
							index={index}
							listing={listing}
						/>
					))}
				</div>

			</div>

		</div>
	);
};

export default Search;
