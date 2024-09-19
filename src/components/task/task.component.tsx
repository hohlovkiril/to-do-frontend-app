import { useState } from "react";
import { TASK_STATUS } from "../../common/enums";
import { IClassNameProps } from "../../common/props";
import { TaskType } from "../../common/types"
import { Chip } from "../chip/chip.component";
import { Select, SelectItem } from "../select/select.component";

interface IProps extends
	IClassNameProps {
		task: TaskType;
		handleUpdate: (taskId: number, paylaod: { content?: string, status?: TASK_STATUS, deadline?: Date, deleteDeadline?: true }, callback?: () => void) => void;
		handleDelete: (taskId: number) => void;
}

export const Task: React.FC<IProps> = (props) => {
	/** Props */
	const { task, handleUpdate, handleDelete } = props;

	/** States */
	const [mode, setMode] = useState<'VIEW' | 'EDIT'>('VIEW');
	const [updateData, setUpdateData] = useState<TaskType & { updated: boolean }>({
		...task,
		updated: false
	})
	
	const makePrettyDate = (date: Date) => {
		const currentDate = new Date(date);

		return currentDate.toLocaleDateString('en-US', { 
			hour: '2-digit', minute: '2-digit',
			day: 'numeric', month: '2-digit', year: 'numeric'
		 })
	}

	return (
		<>
			<div className={`task ${props.className ? props.className : ''}`}>
				<div className="flex column flex-center text-center  task__id">
					#{task.id}
				</div>

				<div className="flex column flex-center text-center task__status">
					{mode === 'VIEW' ? (
						<Chip
							color={task.status === TASK_STATUS.BLOCKED
								? 'warning' : task.status === TASK_STATUS.CANCELED
								? 'error' : task.status === TASK_STATUS.COMPLETED
								? 'success' : task.status === TASK_STATUS.PROGRESS
								? 'primary' : 'default'
							}
							variant='outlined'
							label={TASK_STATUS[task.status]}
						/>
					) : (
						<Select
							className="btn"
							defaultLabel="Select status"
							defaultValue={updateData.updated === true ? String(updateData.status) : String(task.status)}
							onChangeValue={(data) => {

								if (!isNaN(Number(data)) && Object.keys(TASK_STATUS).includes(data)) {
									const newStatus = Number(data) as TASK_STATUS;
									setUpdateData({ ...updateData, status: newStatus, updated: true })
								}
							}}
						>
							{Object.values(TASK_STATUS).map((status, key) => {

								if (!isNaN(Number(status)))
									return (
										<SelectItem key={key} value={String(status)}>{TASK_STATUS[Number(status)]}</SelectItem>
								)

								return null;
							})}
						</Select>
					)}
				</div>

				<div className="flex column flex-center text-start task__content">
					{mode === 'VIEW' ? task.content : (
						<>
							<input
								type="text" 
								className="btn"
								value={updateData.updated === true && task.content !== updateData.content
									? updateData.content
									: task.content	
								}
								onChange={(evt) => setUpdateData({ ...updateData, content: evt.target.value, updated: true })}
							/>
						</>
					)}
				</div>

				<div className="flex column flex-center text-center task__created">
					{mode === 'VIEW' ? makePrettyDate(task.createdAt) : null}
				</div>

				<div className="flex column flex-center text-center task__updated">
					{mode === 'VIEW' && task.createdAt !== task.updatedAt ? makePrettyDate(task.updatedAt) : null}
				</div>

				<div className="flex column flex-center text-center task__deadline">
					{mode === 'VIEW' ? (
						<>
							{task.deadlineAt ? (
								<Chip
									color='default'
									variant='outlined'
									label={task.deadlineAt ? makePrettyDate(task.deadlineAt) : ''}
								/>
							) : null}
						</>
					) : (
						<>
							<input
								type="date"
								className="btn"
								value={updateData.updated === true && task.deadlineAt !== updateData.deadlineAt
									? String(updateData.deadlineAt)
									: task.deadlineAt !== undefined
									? new Date(task.deadlineAt).toDateString() : ''
								}
								onChange={(evt) => {
									console.log(evt)
									setUpdateData({ ...updateData, deadlineAt: evt.target.value !== '' ? new Date(evt.target.value) : undefined, updated: evt.target.value !== '' && true })
								}}
							/>
						</>
					)}
				</div>

				<div className="flex column flex-center text-center task__options">
					<div className="flex row flex-center gap-1">
						{mode === 'VIEW' ? (
							<>
								<button
									className="btn"
									onClick={() => setMode('EDIT')}
								>
									Update
								</button>
								<button
									className="btn"
									onClick={() => handleDelete(task.id)}
								>
									Delete
								</button>
							</>
						) : (
							<>
								<button
									className="btn"
									onClick={() => {
										setMode('VIEW');
										setUpdateData({ ...updateData, updated: false })
									}}
								>
									Cancel
								</button>
								<button
									className="btn"
									onClick={() => {
										handleUpdate(task.id,
											{
												content: updateData.content,
												status: updateData.status,
												deadline: updateData.deadlineAt,
												deleteDeadline: updateData.deadlineAt === undefined ? true : undefined,
											},
											() => {
												setMode('VIEW');
												setUpdateData({ ...updateData, updated: false })
											}
										)
									}}
								>
									Save
								</button>
							</>
						)}
					</div>
				</div>
			</div>
		</>
	)
}