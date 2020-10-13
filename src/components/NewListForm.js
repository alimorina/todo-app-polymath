import React, { useState } from "react";
import { Button, Container } from "react-bootstrap";
import { useListsStore } from "../store/ListContext";

export const NewListForm = () => {
	const [listName, setListName] = useState("");
	const listStore = useListsStore();
	return (
		<Container fluid>
			<div className="input-group mb-3">
				<input
					value={listName}
					onChange={(e) => setListName(e.target.value)}
					type="text"
					className="form-control"
				/>
				<div className="input-group-append">
					<Button variant="primary" onClick={() => listStore.addList(listName)}>
						Add List
					</Button>
				</div>
			</div>
		</Container>
	);
};
