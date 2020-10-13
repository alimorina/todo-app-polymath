import React from "react";
// import { Route, Switch } from "react-router-dom";
import Home from "./components/Home";
import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
	return (
		<div className="container">
			<Home />
			{/* <Switch>
				<Route component={Home} exact path="/" />
				<Route component={About} exact path="/about" />
			</Switch> */}
			<ToastContainer limit={1} />
		</div>
	);
};

export default App;
