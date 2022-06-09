import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
	:root {
		--light: #eeeeee;
		--dark: #222222;
		--primary: #861388;
		--primary-dark: #621064;
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
`;