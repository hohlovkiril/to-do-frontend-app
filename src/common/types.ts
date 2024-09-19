import { TASK_STATUS } from "./enums";

export type Color = 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'error';

export type ListType = {
	id: number;
	icon?: string;
	title: string;
	tasks: TaskType[];
}

export type TaskType = {
	id: number;
	content: string;
	status: TASK_STATUS;
	createdAt: Date;
	updatedAt: Date;
	deadlineAt?: Date;
	list: ListType;
}