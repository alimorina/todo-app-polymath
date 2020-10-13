import { v4 as uuidv4 } from "uuid";
import { toast } from "react-toastify";

const existingLists = JSON.parse(localStorage.getItem("lists"));

export function createListStore() {
	return {
		lists: existingLists || [],
		addList(name) {
			if (!name || name === null) {
				notify("List name can not be empty!", "warning");
			} else if (!exists(name, this.lists)) {
				this.lists.push({
					id: uuidv4(),
					name,
					isEditing: false,
					completed: false,
					type: "List",
					level: 0,
					children: [
						{
							id: uuidv4(),
							name: "subtask",
							isEditing: false,
							completed: false,
							type: "Task",
							level: 1,
						},
					],
				});
				notify("List added successfully!", "success");
				setLocalStorageLists(this.lists);
			} else {
				notify("List already exists!", "warning");
			}
		},
		removeList(id) {
			this.lists = this.lists.filter((list) => list.id !== id);
			setLocalStorageLists(this.lists);
		},
		toggleEdit(id) {
			this.lists = this.lists.map((list) => ({
				...list,
				isEditing: list.id === id ? !list.isEditing : list.isEditing,
			}));
		},
		toggleComplete(id) {
			this.lists = this.lists.map((list) => ({
				...list,
				completed: list.id === id ? !list.completed : list.completed,
			}));
			setLocalStorageLists(this.lists);
		},
		editName(name, id) {
			this.lists = this.lists.map((list) => {
				if (id === list.id) {
					return {
						...list,
						name,
					};
				}
				return list;
			});
		},
	};
}

const setLocalStorageLists = (lists) =>
	localStorage.setItem("lists", JSON.stringify(lists));

const exists = (name, list) => {
	let exists = false;
	list.forEach((item) => {
		if (item.name === name) exists = true;
	});
	return exists;
};

const notify = (message, type) => {
	const properties = {
		position: "top-center",
		autoClose: 2500,
		hideProgressBar: true,
		closeOnClick: true,
		pauseOnHover: true,
		draggable: false,
	};
	switch (type) {
		case "success":
			toast.success(message, properties);
			break;
		case "warning":
			toast.warning(message, properties);
			break;
		default:
			toast(message, properties);
	}
};
