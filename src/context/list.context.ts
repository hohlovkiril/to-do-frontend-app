import { createContext } from "react";
import { IListContext } from "../common/props";

export const ListContext = createContext<IListContext | undefined>(undefined)