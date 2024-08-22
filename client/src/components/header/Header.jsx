/* eslint-disable no-unused-vars */
import React from "react";
import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { useSelector } from "react-redux";

const Header = () => {
	const { currentUser } = useSelector((state) => state.auth);

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

				<form className="bg-slate-100 p-3 rounded-lg">
					<input
						type="text"
						placeholder="Search..."
						className="bg-transparent w-24 sm:w-64 focus:outline-none"
					/>
					<button>
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
