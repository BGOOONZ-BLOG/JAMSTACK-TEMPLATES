import styled from "styled-components";

export const Wrapper = styled.div`
	h4 {
		font-weight: bold;
	}
`;

export const FieldWrapper = styled.div`
	margin-bottom: 1rem;

	input {
		margin-bottom: 0.5rem;
	}

	label {
		color: #777;
		font-size: 16px;
		margin-bottom: 1rem;
		font-weight: 400;
		display: inline-block;
	}
`;

export const CreditCardWrap = styled.div`
	display: flex;
	align-items: center;

	> div {
		width: 100%;
		border: 2px solid #eaeaea;
		padding: 1.5rem 1rem;
	}

	.shipping-preference-label .loader--simple {
		margin-left: 10px;
	}

	.checkout-button.ps-btn--black:not(:disabled) {
		background-color: #32aa44;
	}
`;

export const CheckboxWrapper = styled.div`
	margin-bottom: 1rem;
`;

export const CheckBox = styled.label`
	z-index: 0;
	position: relative;
	display: inline-block;
	color: rgba(var(--pure-material-onsurface-rgb, 0, 0, 0), 0.87);
	font-family: var(
		--pure-material-font,
		"Roboto",
		"Segoe UI",
		BlinkMacSystemFont,
		system-ui,
		-apple-system
	);
	font-size: 16px;
	line-height: 1.5;

	input {
		appearance: none;
		z-index: -1;
		position: absolute;
		left: -10px;
		top: -8px;
		display: block;
		margin: 0;
		border-radius: 50%;
		width: 40px;
		height: 40px;
		background-color: rgba(var(--pure-material-onsurface-rgb, 0, 0, 0), 0.6);
		box-shadow: none;
		outline: none;
		opacity: 0;
		transform: scale(1);
		pointer-events: none;
		transition: opacity 0.3s, transform 0.2s;
	}

	span {
		display: inline-block;
		width: 100%;
		cursor: pointer;

		&:before {
			content: "";
			display: inline-block;
			box-sizing: border-box;
			margin: 3px 11px 3px 1px;
			border: solid 2px; /* Safari */
			border-color: rgba(var(--pure-material-onsurface-rgb, 0, 0, 0), 0.6);
			border-radius: 2px;
			width: 18px;
			height: 18px;
			vertical-align: top;
			transition: border-color 0.2s, background-color 0.2s;
		}
		&:after {
			content: "";
			display: block;
			position: absolute;
			top: 3px;
			left: 1px;
			width: 10px;
			height: 5px;
			border: solid 2px transparent;
			border-right: none;
			border-top: none;
			transform: translate(3px, 4px) rotate(-45deg);
		}
	}

	> input:checked,
	> input:indeterminate {
		background-color: rgb(var(--pure-material-primary-rgb, 33, 150, 243));
	}

	> input:checked + span::before,
	> input:indeterminate + span::before {
		border-color: rgb(var(--pure-material-primary-rgb, 33, 150, 243));
		background-color: rgb(var(--pure-material-primary-rgb, 33, 150, 243));
	}

	> input:checked + span::after,
	> input:indeterminate + span::after {
		border-color: rgb(var(--pure-material-onprimary-rgb, 255, 255, 255));
	}

	> input:indeterminate + span::after {
		border-left: none;
		transform: translate(4px, 3px);
	}

	&:hover > input {
		opacity: 0.04;
	}

	> input:focus {
		opacity: 0.12;
	}

	&:hover > input:focus {
		opacity: 0.16;
	}

	> input:active {
		opacity: 1;
		transform: scale(0);
		transition: transform 0s, opacity 0s;
	}

	> input:active + span::before {
		border-color: rgb(var(--pure-material-primary-rgb, 33, 150, 243));
	}

	> input:checked:active + span::before {
		border-color: transparent;
		background-color: rgba(var(--pure-material-onsurface-rgb, 0, 0, 0), 0.6);
	}

	> input:disabled {
		opacity: 0;
	}

	> input:disabled + span {
		color: rgba(var(--pure-material-onsurface-rgb, 0, 0, 0), 0.38);
		cursor: initial;
	}

	> input:disabled + span::before {
		border-color: currentColor;
	}

	> input:checked:disabled + span::before,
	> input:indeterminate:disabled + span::before {
		border-color: transparent;
		background-color: currentColor;
	}
`;
