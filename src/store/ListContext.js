import React from "react";
import { createListStore } from "./listStore";
import { useLocalObservable } from "mobx-react";

const ListsContext = React.createContext(null);

export const ListsProvider = ({ children }) => {
	const listStore = useLocalObservable(createListStore);
	return (
		<ListsContext.Provider value={listStore}>{children}</ListsContext.Provider>
	);
};

export const useListsStore = () => React.useContext(ListsContext);
