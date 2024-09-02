import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getListings } from "../redux/listing/listingApi";
import SingleListingCardView from "../components/listings/SingleListingCardView";

const Search = () => {
	const { listings, getListingsLoading, getListingsError, getListingsSuccess } =
		useSelector((state) => state.listing);

	const dispatch = useDispatch();

	const [selectedOption, setSelectedOption] = useState("");

	const handleSortChange = (e) => {
		const value = e.target.value;
		setSelectedOption(value);
	};

	useEffect(() => {
		const fetchSearchedResult = async () => {
			dispatch(getListings({ url: "/api/user/listing/search" }));
		};

		fetchSearchedResult();
	}, []);

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
					/>
				</div>

				<div className="flex gap-3 items-center flex-wrap">
					<span className="font-semibold text-lg">Type: </span>

					<div className="flex gap-2 items-center">
						<input
							className="w-5 h-5"
							type="checkbox"
							name="rentOrSale"
							id="rentOrSale"
						/>
						<span className="text-base">Rent Or Sale</span>
					</div>

					<div className="flex gap-2 items-center">
						<input
							className="w-5 h-5 rounded-lg"
							type="checkbox"
							name="rent"
							id="rent"
						/>
						<span className="text-base">Rent</span>
					</div>

					<div className="flex gap-2 items-center">
						<input
							className="w-5 h-5 rounded-lg"
							type="checkbox"
							name="sale"
							id="sale"
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
						/>
						<span className="text-base">Parking</span>
					</div>

					<div className="flex gap-2 items-center">
						<input
							className="w-5 h-5 rounded-lg"
							type="checkbox"
							name="furnished"
							id="furnished"
						/>
						<span className="text-base">Furnished</span>
					</div>

					<div className="flex gap-2 items-center">
						<input
							className="w-5 h-5 rounded-lg"
							type="checkbox"
							name="offer"
							id="offer"
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
								value={selectedOption}
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
					<button className="bg-slate-600 p-3 rounded-lg text-white w-full uppercase">
						Search
					</button>
				</div>
			</div>

			<div className="rightDiv flex flex-col gap-5 flex-1 p-3">
				<h3 className="text-3xl font-semibold text-center py-5">
					Listing Results:{" "}
				</h3>
				{console.log("listings: ", listings)}

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
