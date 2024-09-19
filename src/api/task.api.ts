import { SERVER_URI } from "../common/data";
import { TASK_STATUS } from "../common/enums";
import { TaskType } from "../common/types";

export class TaskApi {

	private static url = `${SERVER_URI}/task`;

	static async getMany(listId: number) {
		const path = `${this.url}/by-list/${listId}`;
		const method = 'GET';
		const headers = new Headers();

		const response = await fetch(path, { method, headers });

		if (response.ok) {
			return await response.json();
		} else {
			throw new Error(JSON.stringify(await response.json()));
		}
	}

	static async createOne(payload: { listId: number, content: string, deadline?: Date}): Promise<TaskType> {
		const path = `${this.url}`;
		const method = 'POST';
		const headers = new Headers();
		const body = JSON.stringify(payload);

		headers.append('Content-Type', 'application/json');

		const response = await fetch(path, { method, headers, body });

		if (response.ok) {
			return await response.json();
		} else {
			throw new Error(JSON.stringify(await response.json()));
		}
	}

	static async updateOne(taskId: number, payload: { content?: string, status?: TASK_STATUS, deadline?: Date, deleteDeadline?: true }): Promise<TaskType> {
		const path = `${this.url}/${taskId}`;
		const method = 'PATCH';
		const headers = new Headers();
		const body = JSON.stringify(payload);

		headers.append('Content-Type', 'application/json');

		const response = await fetch(path, { method, headers, body });

		if (response.ok) {
			return await response.json();
		} else {
			throw new Error(JSON.stringify(await response.json()));
		}
	}

	static async deleteOne(taskId: number): Promise<TaskType> {
		const path = `${this.url}/${taskId}`;
		const method = 'DELETE';
		
		const response = await fetch(path, { method });

		if (response.ok) {
			return await response.json();
		} else {
			throw new Error(JSON.stringify(await response.json()));
		}
	}
}