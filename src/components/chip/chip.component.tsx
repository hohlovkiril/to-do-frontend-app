import { IClassNameProps, IColorProps, ICssProps } from "../../common/props";

interface IProps extends
	IClassNameProps,
	ICssProps,
	IColorProps {
		label: string;
		variant: 'outlined' | 'contained';
	}

export const Chip: React.FC<IProps> = (props) => {

	return (
		<>
			<div
				className={`chip flex column flex-center ${props.className ? props.className : ''} ${props.color} ${props.variant}`}
				style={props.style}
			>
				{props.label}
			</div>
		</>
	)
}