import styled from 'styled-components'

export const Links = styled.div`
  ${({ desktop }) =>
    desktop
      ? `
		display: flex;
		align-items: center;

		.css-vj8t7z, .css-2o5izw {
				width: 150px;
				margin: 0 .5rem;
		}

		@media (max-width: 960px) {
				display: none;
		}

		a {
				margin-right: 1rem;

				&:last-child {
						margin-right: unset;
				}
		}
	`
      : `
		padding: 3rem;
		display: flex;
		flex-direction: column;

		.css-vj8t7z, .css-2o5izw {
				width: 100%;
				margin: 0 0 1rem 0;
		}

		a {
				margin-bottom: 1rem;

				&:last-child {
						margin-bottom: unset;
				}
		}
	`}
`

export const Avatar = styled.a`
  border: 2px solid #eee;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  overflow: hidden;

  img {
    width: 40px;
    height: 40px;
    object-fit: contain;
    border-radius: 50%;
  }
`
