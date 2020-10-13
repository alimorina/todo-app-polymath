import React from "react";
import { useListsStore } from "../store/ListContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faSave,
	faTrashAlt,
	faPen,
	faCheck,
	faPlus,
	faArchive,
	faChevronRight,
	faBars,
} from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
	Accordion,
	Button,
	ButtonGroup,
	Card,
	Dropdown,
	DropdownButton,
} from "react-bootstrap";
import CustomToggle from "./CustomToggle";

library.add(
	faSave,
	faTrashAlt,
	faPen,
	faCheck,
	faPlus,
	faArchive,
	faChevronRight,
	faBars
);

const ListItem = ({
	id,
	name,
	isEditing,
	completed,
	children,
	type,
	level,
}) => {
	const listStore = useListsStore();
	const changeName = (name, id) => {
		listStore.editName(name, id);
	};
	return (
		<div>
			<Accordion>
				<Card>
					<Card.Header>
						<div className="input-group-prepend">
							<div className="input-group-text">
								<CustomToggle eventKey={id}>
									<FontAwesomeIcon
										icon={["fas", type === "List" ? "archive" : "save"]}
										style={{ marginRight: "5px" }}
									/>
									<FontAwesomeIcon
										onClick={() => console.log("Clicked", name)}
										icon={["fas", "chevron-right"]}
										style={{ marginRight: "5px" }}
									/>
								</CustomToggle>
								<input
									type="checkbox"
									checked={completed}
									onChange={() => listStore.toggleComplete(id)}
								/>
							</div>
							<input
								type="text"
								className="form-control"
								value={name}
								readOnly={!isEditing}
								style={{
									textDecoration: completed ? "line-through" : null,
								}}
								onChange={(e) => changeName(e.target.value, id)}
							/>
							<ButtonGroup>
								<Button
									variant="light"
									onClick={() => listStore.toggleEdit(id)}
								>
									<FontAwesomeIcon
										icon={["fas", isEditing ? "check" : "pen"]}
									/>
								</Button>
								<Button
									variant="danger"
									onClick={() => listStore.removeList(id)}
								>
									<FontAwesomeIcon icon={["fas", "trash-alt"]} />
								</Button>
								{level <= 1 && (
									<Button
										variant="link"
										onClick={() => listStore.toggleEdit(id)}
									>
										<FontAwesomeIcon icon={["fas", "plus"]} />
									</Button>
								)}
							</ButtonGroup>
							<DropdownButton
								id="dropdown-button-drop-right"
								as={ButtonGroup}
								key="right"
								drop="right"
								title={<FontAwesomeIcon icon={["fas", "bars"]} />}
								style={{
									overflow: "visible",
									display: "none",
								}}
							>
								<Dropdown.Item onClick={() => listStore.toggleEdit(id)}>
									<FontAwesomeIcon
										icon={["fas", isEditing ? "check" : "pen"]}
									/>{" "}
									{isEditing ? "Save" : "Edit"} Item
								</Dropdown.Item>
								<Dropdown.Item onClick={() => listStore.removeList(id)}>
									<FontAwesomeIcon icon={["fas", "trash-alt"]} /> Delete
								</Dropdown.Item>
								{level <= 1 && (
									<Dropdown.Item onClick={() => listStore.toggleEdit(id)}>
										<FontAwesomeIcon icon={["fas", "plus"]} /> Add{" "}
										{type === "List" ? "Task" : "Subtask"}
									</Dropdown.Item>
								)}
							</DropdownButton>
						</div>
					</Card.Header>
					<Accordion.Collapse eventKey={id}>
						<Card.Body>
							{children && children.length
								? children.map((child) => {
										return (
											<div
												style={{
													textDecoration: child.completed
														? "line-through"
														: null,
												}}
												key={child.id}
											>
												{child.name}
												{child.completed}
											</div>
										);
								  })
								: "No Tasks"}
						</Card.Body>
					</Accordion.Collapse>
				</Card>
			</Accordion>
			<div style={{ display: "none" }} className="input-group mb-3">
				<div className="input-group-prepend">
					<div className="input-group-text">
						<FontAwesomeIcon
							icon={["fas", type === "List" ? "archive" : "save"]}
							style={{ marginRight: "5px" }}
						/>
						{/* <button
							className="btn btn-sm"
							style={{ margin: 0, padding: 0 }}
							onClick={() => console.log("clicked")}
						 > */}
						<FontAwesomeIcon
							onClick={() => console.log("Clicked", name)}
							icon={["fas", "chevron-right"]}
							style={{ marginRight: "5px" }}
						/>
						{/* </button> */}
						<input
							type="checkbox"
							checked={completed}
							onChange={() => listStore.toggleComplete(id)}
						/>
					</div>
				</div>
				<input
					type="text"
					className="form-control"
					value={name}
					readOnly={!isEditing}
					style={{
						textDecoration: completed ? "line-through" : null,
					}}
					onChange={(e) => changeName(e.target.value, id)}
				/>
				<DropdownButton
					id="dropdown-menu"
					title={<FontAwesomeIcon icon={["fas", "bars"]} />}
				>
					<Dropdown.Item onClick={() => listStore.toggleEdit(id)}>
						<FontAwesomeIcon icon={["fas", isEditing ? "check" : "pen"]} />{" "}
						{isEditing ? "Save" : "Edit"} Item
					</Dropdown.Item>
					<Dropdown.Item onClick={() => listStore.removeList(id)}>
						<FontAwesomeIcon icon={["fas", "trash-alt"]} /> Delete
					</Dropdown.Item>
					{level <= 1 && (
						<Dropdown.Item onClick={() => listStore.toggleEdit(id)}>
							<FontAwesomeIcon icon={["fas", "plus"]} /> Add{" "}
							{type === "List" ? "Task" : "Subtask"}
						</Dropdown.Item>
					)}
				</DropdownButton>
			</div>
		</div>
	);
};

export default ListItem;
