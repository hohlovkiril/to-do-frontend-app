import { useEffect, useState } from "react";
import { useList } from "../../hooks/useList.hook"
import { TaskType } from "../../common/types";
import { TaskApi } from "../../api/task.api";
import { Task } from "../task/task.component";
import { TASK_STATUS } from "../../common/enums";
import { Chip } from "../chip/chip.component";

export const Content: React.FC = () => {
	/** Context */
	const { list, setList } = useList();

	/** States */
	const [tasks, setTasks] = useState<TaskType[]>([]);
	const [newTask, setTask] = useState<{ content: string, deadline?: string }>({
		content: '',
		deadline: undefined,
	})

	/** Handlers */

	const handleApiCreateTask = () => {

		if (list && newTask.content.length !== 0) {

			TaskApi.createOne({
					listId: list.id,
					content: newTask.content,
					deadline: newTask.deadline !== undefined ? new Date(newTask.deadline) : undefined
				})
				.then((res) => setTasks([...tasks, res]))
				.finally(() => setTask({ content: '', deadline: undefined }))
		}
	}

	const handleApiUpdateTask = (taskId: number, payload: { content?: string, status?: TASK_STATUS, deadline?: Date, deleteDeadline?: true }, callback?: () => void) => {

		TaskApi.updateOne(taskId, payload)
			.then((res) => setTasks(tasks.map((task) => task.id === res.id ? res : task)))
			.finally(() => callback && callback())
	}

	const handleApiDeleteTask = (taskId: number) => {
		
		if (list && tasks && taskId) {

			TaskApi.deleteOne(taskId)
				.then((res) => setTasks(tasks.filter((task) => task.id !== taskId)))
		}
	}

	/** Effects */
	
	useEffect(() => {

		if (list) {
			TaskApi.getMany(list.id)
				.then((res) => setTasks(res))
		}
	}, [list, setList])

	return (
		<>
			{list && tasks ? (
				<>
					<div className="content">

						<div className="content__form flex row flex-between">
							<div className="flex column flex-center">
								<input
									type="text"
									placeholder="Just do it!"
									value={newTask.content}
									onChange={(evt) => setTask({ ...newTask, content: evt.target.value})} 
								/>
							</div>

							<div className="flex column flex-center">
								<input
									type='datetime-local'
									value={newTask.deadline ? newTask.deadline : ''}
									onChange={(evt) => setTask({ ...newTask, deadline: evt.target.value !== '' ? evt.target.value : undefined })} 
								/>
							</div>

							<div className="flex column flex-center">
								<button className="btn" onClick={handleApiCreateTask}>
									Save
								</button>
							</div>
						</div>

						{list && tasks.length > 0 && (
							<div className="content__header flex row">
								<div className="flex column flex-center task__id">
									<Chip color='default' variant='outlined' label="#ID" />
								</div>
								<div className="flex column flex-center task__status">
									<Chip color='default' variant='outlined' label="Status" />
								</div>
								<div className="flex column flex-center task__content">
									<Chip color='default' variant='outlined' label="Content" />
								</div>
								<div className="flex column flex-center task__created">
									<Chip color='default' variant='outlined' label="Created At" />
								</div>
								<div className="flex column flex-center task__updated">
									<Chip color='default' variant='outlined' label="Updated At" />
								</div>
								<div className="flex column flex-center task__deadline">
									<Chip color='default' variant='outlined' label="Deadline" />
								</div>
								<div className="flex column flex-center task__options">
									<Chip color='default' variant='outlined' label="Options" />
								</div>
							</div>
						)}

						<div className="content__scroll">
							{tasks.map((task, key) => (
								<Task
									key={key}
									task={task}
									className="flex row flex-start"
									handleUpdate={handleApiUpdateTask}
									handleDelete={handleApiDeleteTask}
								/>
							))}
						</div>

					</div>
				</>
			) : null}
		</>
	)
}