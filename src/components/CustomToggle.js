import React from "react";
import { useAccordionToggle } from "react-bootstrap";

const CustomToggle = ({ children, eventKey }) => {
	const customOnClick = useAccordionToggle(eventKey);

	return <div onClick={customOnClick}>{children}</div>;
};

export default CustomToggle;
