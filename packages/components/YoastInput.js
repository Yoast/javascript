// External dependencies.
import styled from "styled-components";

// Internal dependencies.
import { colors, rgba } from "./style-guide";

export const YoastInputContainer = styled.div`
	display: flex;
	flex-direction: column;
	margin: 1em 0;
`;

export const YoastInputLabel = styled.label`
	font-size: 1em;
	font-weight: bold;
	margin-bottom: 0.5em;
	display: block;
`;

export const YoastInputField = styled.input`
	&&& {
		padding: 8px;
		font-size: 1em;
		box-shadow: inset 0 1px 2px ${ rgba( colors.$color_black, 0.07 ) };
		border: 1px solid ${ colors.$color_input_border };
		border-radius: 0;

		&:focus {
			border-color: #5b9dd9;
			box-shadow: 0 0 2px ${ rgba( colors.$color_snippet_focus, 0.8 ) };
		}
	}
`;
