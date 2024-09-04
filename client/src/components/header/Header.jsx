/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { useSelector } from "react-redux";

const Header = () => {
	const { currentUser } = useSelector((state) => state.auth);

	const navigate = useNavigate()

	const [formData, setFormData] = useState({
		searchTerm: ""
	})

	const handleInputField = (e) => {
		
		setFormData((prevData) => ({...prevData, searchTerm: e.target.value}))

	}

	const handleSearchBoxSubmit = (e) => {
		e.preventDefault()

		const urlSearchParams = new URLSearchParams(formData).toString()

		console.log("urlSearchParams: ", urlSearchParams)

		navigate(`/search?${urlSearchParams}`)

	}

	useEffect(() => {
		const queryParams = window.location.search
		console.log("query params: ", queryParams)
		const queryParamsIteratorObj = new URLSearchParams(queryParams)
		const queryParamsObj = Object.fromEntries(queryParamsIteratorObj.entries())

		setFormData((prevData) => ({...prevData, searchTerm: queryParamsObj.searchTerm || ""}))



	}, [window.location.search])



	console.log("formData: ", formData)

	return (
		<header className="bg-slate-200 shadow-md">
			<div className=" max-w-6xl flex mx-auto items-center border  bg-slate-200 justify-between p-3 gap-3">
				<div className="tracking-wide">
					<Link to="/">
						<h1 className="font-bold text-base  sm:text-2xl">
							<span className="text-slate-500 ">Ali</span>
							<span className="text-slate-700">Estate</span>
						</h1>
					</Link>
				</div>

				<form className="bg-slate-100 p-3 rounded-lg" onSubmit={handleSearchBoxSubmit}>
					<input
						type="text"
						placeholder="Search..."
						className="bg-transparent w-24 sm:w-64 focus:outline-none"
						value={formData.searchTerm}
						onChange={handleInputField}
					/>
					<button type="submit">
						<FaSearch />
					</button>
				</form>

				<nav className="flex gap-2 sm:gap-4 items-center">
					<Link
						to="/"
						className="hidden sm:inline hover:underline text-slate-700"
					>
						Home
					</Link>
					<Link
						to="/about"
						className="hidden sm:inline hover:underline text-slate-700"
					>
						About
					</Link>

					{currentUser ? (
						<Link to="/profile" className="">
							<img className="rounded-full w-8 h-8 object-cover aspect-square" src={currentUser.avatar} />
						</Link>
					) : (
						<Link to="/signin" className="hover:underline text-slate-700">
							Sign In
						</Link>
					)}
				</nav>
			</div>
		</header>
	);
};

export default Header;
