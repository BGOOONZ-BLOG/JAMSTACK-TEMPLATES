import styled from 'styled-components'

export const Wrapper = styled.div`
  z-index: 5;
  top: 1.85rem;
  right: 1.8rem;
  display: none;
  cursor: pointer;
  transition: left 500ms cubic-bezier(0.6, 0.05, 0.28, 0.91);
  position: absolute;

  @media (max-width: 960px) {
    display: block;
  }

  ${({ banner }) =>
    banner &&
    `
		@media (max-width: 960px) {
			top: 7.1rem;
		}

		@media (max-width: 680px) {
			top: 8.1rem;
		}
	`}

  ${({ sidebar }) =>
    sidebar &&
    `
		right: 18%;
	
		@media (max-width: 960px) {
			right: 35%;
			top: 1.1rem;
		}
	
		@media (max-width: 600px) {
			right: 66%;
			top: 1.1rem;
		}
	`}
`

export const Bar = styled.div`
	width: 1.6rem;
	height: .15rem;
	margin-bottom: .3rem;
	background-color: #212121;
	transition: transform 500ms cubic-bezier(0.6, 0.05, 0.28, 0.91),
				opacity 500ms,
				box-shadow 250ms,
				background-color 500ms;

	@media (max-width: 600px){
		width: 1.6rem;
	}

	${({ top, sidebar }) =>
    top &&
    sidebar &&
    `
		transform: translateY(8px) rotate(-135deg);
	`}

	${({ mid, sidebar }) =>
    mid &&
    sidebar &&
    `
		transform: scale(0);
	`}

	${({ bottom, sidebar }) =>
    bottom &&
    sidebar &&
    `
		transform: translateY(-6px) rotate(-45deg);
	`}
`
