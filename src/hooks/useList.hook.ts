import { useContext } from "react"
import { ListContext } from "../context/list.context"

export const useList = () => {
	const context = useContext(ListContext);

	if (!context) {
		throw new Error('useList must be wrapped on ListProvider!');
	}

	return context;
}