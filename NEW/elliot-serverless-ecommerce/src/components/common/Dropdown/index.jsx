import React, { useRef, useState, useEffect } from "react";
import { Wrapper, Label, List, Item, Arrow, DefaultValue } from "./styles";
import { ChevronDownIcon } from "../Icons";
import Link from "next/link";
import { useIntl } from "react-intl";

const Dropdown = ({
	displayDefaultValue,
	label,
	options,
	standalone,
	languages,
	currency,
	setCurrency,
	sorting,
	setSorting
}) => {
	const { locale } = useIntl();
	const listEl = useRef(null);
	const [labelOrValue, setLabelOrValue] = useState(label);
	const [defaultValue, setDefaultValue] = useState(
		languages ? locale : options[0]
	);
	const [open, setOpen] = useState(false);

	useEffect(() => {
		if (open) {
			document.addEventListener("mousedown", handleClickOutside);
		} else {
			document.removeEventListener("mousedown", handleClickOutside);
		}

		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, [open]);

	const handleClickOutside = e => {
		if (!listEl.current.contains(e.target)) {
			setOpen(false);
		}
	};

	const toggleOpen = () => {
		setOpen(!open);
	};

	const pickElement = e => {
		if (displayDefaultValue) {
			setDefaultValue(e.target.innerText);
		} else {
			setLabelOrValue(e.target.innerText);
		}
		setOpen(false);
	};

	return (
		<Wrapper ref={listEl} open={open} standalone={standalone}>
			<Label onClick={toggleOpen}>
				{labelOrValue}
				{displayDefaultValue && (
					<DefaultValue>
						{languages
							? options.find(({ code }) => code === locale).title
							: currency
							? options.find(({ symbol }) => symbol === currency).value
							: defaultValue}
					</DefaultValue>
				)}
				<Arrow>
					<ChevronDownIcon width={10} height={10} color="#6f6f6f" />
				</Arrow>
			</Label>
			<List hidden={!open}>
				{options.map((item, index) =>
					languages ? (
						<Item key={`option-${index}`} onClick={pickElement}>
							<Link href="/[lang]/" as={`/${item.code}/`}>
								<a>{item.title}</a>
							</Link>
						</Item>
					) : currency ? (
						<Item
							key={`option-${index}`}
							onClick={e => {
								setCurrency(item.symbol);
								pickElement(e);
							}}
						>
							{item.value}
						</Item>
					) : sorting ? (
						<Item
							key={`option-${index}`}
							onClick={e => {
								setSorting(item);
								pickElement(e);
							}}
						>
							{item}
						</Item>
					) : (
						<Item key={`option-${index}`} onClick={pickElement}>
							{item}
						</Item>
					)
				)}
			</List>
		</Wrapper>
	);
};

export default Dropdown;
