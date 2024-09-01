import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import About from "./pages/About";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Header from "./components/header/Header";
import PrivateRoute from "./components/privateRoutes/PrivateRoute";
import PublicRoute from "./components/privateRoutes/PublicRoute";
import CreateListing from "./pages/CreateListing";
import ListingDetails from "./pages/listingDetails";
import UpdateListing from "./pages/UpdateListing";

function App() {
	return (
		<Router>
			<Header />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route
					path="/profile"
					element={
						<PrivateRoute>
							<Profile />
						</PrivateRoute>
					}
				/>

				<Route
					path="/listing/create"
					element={
						<PrivateRoute>
							<CreateListing />
						</PrivateRoute>
					}
				/>

				<Route
					path="/listing/edit/:listingId"
					element={
						<PrivateRoute>
							<UpdateListing />
						</PrivateRoute>
					}
				/>

				<Route
					path="/listing/:listingId"
					element={
						<PrivateRoute>
							<ListingDetails />
						</PrivateRoute>
					}
				/>

				<Route path="/about" element={<About />} />
				<Route path="/signin" element={<SignIn />} />
				<Route path="/signup" element={<SignUp />} />
			</Routes>
		</Router>
	);
}

export default App;
