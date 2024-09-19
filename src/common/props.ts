import { Color, ListType } from "./types";

export interface IChildrenProps {
	children?: React.ReactNode;
}

export interface IClassNameProps {
	className?: string;
}

export interface ICssProps {
	style?: React.CSSProperties;
}

export interface IColorProps {
	color?: Color;
}

/** Context */

export interface IListContext {
	list?: ListType;
	setList: (list?: ListType) => void;
}