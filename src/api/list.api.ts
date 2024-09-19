import { SERVER_URI } from "../common/data";
import { ListType } from "../common/types";

export class ListApi {

	private static url = `${SERVER_URI}/list`;

	static async getMany(): Promise<ListType[]> {
		const path = `${this.url}`;
		const method = 'GET';

		const response = await fetch(path, { method });

		if (response.ok) {
			return await response.json();
		} else {
			throw new Error(JSON.stringify(await response.json()));
		}
	}

	static async createOne(payload: { icon?: string, title: string }): Promise<ListType> {
		const path = `${this.url}`;
		const method = 'POST';
		const headers = new Headers();

		headers.append('Content-Type', 'application/json');

		const body = JSON.stringify(payload);

		const response = await fetch(path, { method, headers, body });

		if (response.ok) {
			return await response.json();
		} else {
			throw new Error(JSON.stringify(await response.json()));
		}
	}

	static async deleteOne(id: number): Promise<ListType> {
		const path = `${this.url}/${id}`;
		const method = 'DELETE';
		
		const response = await fetch(path, { method });

		if (response.ok) {
			return await response.json();
		} else {
			throw new Error(JSON.stringify(await response.json()));
		}
	}
}