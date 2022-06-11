import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
	:root {
		--light: #eeeeee;
		--dark: #222222;
		--primary: #861388;
		--primary-dark: #621064;

		--transparent-background: rgba(238, 238, 238, 0.7);

		--red-50: #FEC7C7;
		--red-500: #FF2B2B;
	}

	* {
		margin: 0;
		padding: 0;
		box-sizing: border-box;
		font-family: 'Roboto', sans-serif;
	}

	html, body {
		margin: 0;
		padding: 0;
		background: var(--light);
	}

	.modal-overlay {
		top: 0;
		left: 0;
		position: fixed;
		width: 100%;
		height: 100vh;
		background: var(--transparent-background);

		padding: 20px 20px;

		display: flex;
		justify-content: center;
		align-items: center;

	}

	.modal-content {
		width: 100%;
		height: 100%;
		max-width: 600px;
		max-height: 400px;

		background: var(--light);
		border: solid 2px #aaa;
		border-radius: 12px;

		padding: 20px;
	}
`;