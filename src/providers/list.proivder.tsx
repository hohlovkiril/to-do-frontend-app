import { useState } from "react";
import { IChildrenProps } from "../common/props";
import { ListContext } from "../context/list.context";
import { ListType } from "../common/types";

interface IProviderProps extends
	IChildrenProps {

	}

export const ListProvider: React.FC<IProviderProps> = ({ children }) => {
	/** States */
	const [list, setList] = useState<ListType | undefined>(undefined);

	return (
		<>
			<ListContext.Provider value={{ list, setList }}>
				{children}
			</ListContext.Provider>
		</>
	)
}