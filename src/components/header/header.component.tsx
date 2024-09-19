import { useState, useEffect } from "react"
import { ListApi } from "../../api/list.api";
import { ListType } from "../../common/types";
import { Select, SelectItem } from "../select/select.component";
import { useList } from "../../hooks/useList.hook";

export const Header: React.FC = () => {
	/** Context */
	const { list, setList } = useList();

	/** States */
	const [lists, setLists] = useState<ListType[]>([]);
	const [newList, setNewList] = useState<{ newTitle: string, formEnable: boolean }>({
		newTitle: '',
		formEnable: false,
	});

	const handleApiCreateList = () => {

		if (newList.formEnable && newList.newTitle.length !== 0) {
			ListApi.createOne({ title: newList.newTitle})
				.then((res) => setLists([...lists, res]))
				.catch((err) => alert(JSON.parse(err.message).message))
				.finally(() => setNewList({ newTitle: '', formEnable: false }))

			ListApi.getMany()
				.then((res) => setLists(res));
		}
	}

	const handleApiDeleteList = (id: number) => {
		ListApi.deleteOne(id)
			.then((res) => setLists([...lists.filter((list) => list.id !== id)]))
			.catch((err) => alert(JSON.parse(err.message).message))
			.finally(() => setList());
	}

	const handleDiscardCreate = () => {
		setNewList({ newTitle: '', formEnable: false })
	}

	useEffect(() => {
		ListApi.getMany()
			.then((res) => setLists(res));
	}, []);

	return (
		<>
			<header className="flex flex row flex-start gap-1" style={{ padding: '0em .5em' }}>

				{lists && newList.formEnable === false ? (
					<>
						<div className="flex column flex-center">
							<Select
								className="btn"
								defaultLabel="Select list"
								defaultValue={list ? String(list.id) : undefined}
								onChangeValue={(data) => {
									const findList = lists.find((list) => list.id === Number(data));

									if (findList) {
										setList(findList);
									} else if (data === 'create') {
										setNewList({ ...newList, formEnable: true })
									}
								}}
							>
								<SelectItem value="create">Add new list</SelectItem>
								{lists.map((list, key) => (
									<SelectItem key={key} value={String(list.id)}>{list.title}</SelectItem>
								))}
							</Select>
						</div>
						{list && (
							<>
								<div className="flex column flex-center" onClick={() => handleApiDeleteList(list.id)}>
									<button className="btn">Delete</button>
								</div>
							</>
						)}
					</>
				) : lists ? (
					<div className="flex column flex-center">
						{newList.formEnable ? (
							<>
								<div className="create__list_form flex row gap-1">
									<input
										type="text"
										placeholder="Title"
										value={newList.newTitle}
										onChange={(evt) => setNewList({ ...newList, newTitle: evt.target.value })}
									/>
									<button className="btn" onClick={handleApiCreateList} >
										Create
									</button>
									<button className="btn" onClick={handleDiscardCreate} >
										Cancel
									</button>
								</div>
							</>
						) : (
							<>
								<div
									id="create__list_btn"
									className="btn"
									onClick={() => setNewList({ ...newList, formEnable: true })}
								>
									Create new list
								</div>
							</>
						)}
					</div>
				) : null}

			</header>
		</>
	)
}