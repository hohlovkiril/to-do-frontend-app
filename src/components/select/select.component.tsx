import React, { useEffect, useRef, useState } from "react";
import { IChildrenProps, ICssProps } from "../../common/props";

interface ISelectProps extends
	IChildrenProps,
	ICssProps {
		className?: string;
		defaultValue?: string;
		defaultLabel?: string;
		onChangeValue?: (data: any) => void;
	}

export const Select: React.FC<ISelectProps> = (props) => {
	/** Props */
	const { children, defaultValue, defaultLabel, style, onChangeValue } = props;

	/** States */
	const [selectedValue, setSelectedValue] = useState<string | undefined>(defaultValue);
	const [isOpen, setOpen] = useState<boolean>(false);

	/** Refs */
	const selectRef = useRef<HTMLDivElement>(null);
	const selectListRef = useRef<HTMLDivElement>(null);

	let label = '';

	const enchanedChildren = React.Children.map(children, (child) => {
		if (React.isValidElement(child)) {

			if (child.props.value === defaultValue) {
				label = child.props.children;
			}

			return React.cloneElement(child as React.ReactElement, {
				active: child.props.value === selectedValue, onClick: () => {
					onChangeValue && onChangeValue(child.props.value);
					setSelectedValue(child.props.value);
					setOpen(false);
				} 
			});
		}

		return child;
	})

	useEffect(() => {

		if (selectRef.current !== null && selectListRef.current !== null) {
			const pos = selectRef.current.getBoundingClientRect();

			selectListRef.current.style.top = `${pos.top + selectRef.current.clientHeight}px`;
			selectListRef.current.style.left = `${pos.left}px`;
		}
	}, [selectRef, selectListRef])

	const renderLabel = label.length > 0
		? label : defaultLabel ? defaultLabel : '';

	return (
		<>
			<div className={`select ${props.className} ${isOpen ? 'open' : 'hidden'}`} style={style} ref={selectRef}>
				<div className="select__toggle flex row flex-around gap-1" onClick={() => setOpen(!isOpen)}>
					<div className="flex column flex-center">
						<span>{renderLabel}
						</span>
					</div>
					<div className="select__arrow flex column flex-center">
						<span></span>
						<span></span>
					</div>
				</div>
				<div className="select__list" ref={selectListRef}>
					{enchanedChildren}
				</div>
			</div>
		</>
	)
}

interface ISelectItemProps extends
	IChildrenProps,
	ICssProps {
		active?: true;
		value: string;
		onClick?: () => void;
	}

export const SelectItem: React.FC<ISelectItemProps> = (props) => {
	/** Props */
	const { children, style, onClick } = props;

	return (
		<>
			<div className="select__item" style={style} onClick={onClick}>
				{children}
			</div>
		</>
	)
}