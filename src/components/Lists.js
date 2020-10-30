import { observer } from "mobx-react-lite";
import React from "react";
import { useListsStore } from "../store/ListContext";
import { NewListForm } from "./NewListForm";
import ListItem from "./ListItem";

const Grid = observer(() => {
	const listStore = useListsStore();
	return (
		<div>
			<h2 className="mt-4">Listat</h2>
			<NewListForm />
			{listStore.lists.map(
				({ id, name, isEditing, completed, children, type, level }) => {
					return (
						<ListItem
							key={id}
							id={id}
							name={name}
							isEditing={isEditing}
							completed={completed}
							children={children}
							type={type}
							level={level}
						/>
					);
				}
			)}
		</div>
	);
});

export default Grid;
