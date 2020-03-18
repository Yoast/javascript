// External dependencies.
import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { __ } from "@wordpress/i18n";
import noop from "lodash/noop";

/* Yoast dependencies */
import { addFocusStyle, SvgIcon, InputField } from "@yoast/components";
import { getDirectionalStyle } from "@yoast/helpers";
import { colors } from "@yoast/style-guide";

const errorColor = colors.$color_red;
const greyColor = colors.$color_grey_text_light;

const KeywordInputContainer = styled.div`
	display: flex;
	flex-direction: column;
`;

const KeywordFieldLabel = styled.label`
	font-size: 1em;
	font-weight: bold;
	${ getDirectionalStyle( "margin-right: 4px", "margin-left: 4px" ) };
`;

const KeywordFieldLabelContainer = styled.span`
	margin-bottom: 0.5em;
`;

const KeywordField = styled( InputField )`
	flex: 1 !important;
	box-sizing: border-box;
	max-width: 100%;
	margin: 0; // Reset margins inherited from WordPress.

	// Hide native X in Edge and IE11.
	&::-ms-clear {
		display: none;
	}

	&.has-error {
		border-color: ${ errorColor } !important;
		box-shadow: 0 0 2px ${ errorColor } !important;
	}
`;

const ErrorText = styled.p`
	color: ${ errorColor };
	margin: 0.5em 0 0 0;
	min-height: 1.8em;
`;

const BorderlessButton = addFocusStyle(
	styled.button`
		border: 1px solid transparent;
		box-shadow: none;
		background: none;
		flex: 0 0 32px;
		height: 32px;
		max-width: 32px;
		padding: 0;
		cursor: pointer;
	`
);

BorderlessButton.propTypes = {
	type: PropTypes.string,
	focusColor: PropTypes.string,
	focusBackgroundColor: PropTypes.string,
	focusBorderColor: PropTypes.string,
};

BorderlessButton.defaultProps = {
	type: "button",
	focusColor: colors.$color_button_text_hover,
	focusBackgroundColor: colors.$color_white,
	focusBorderColor: colors.$color_blue,
};

const RemoveIcon = styled( SvgIcon )`
	margin-top: 4px;
`;

export const YoastInputButtonContainer = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;

	&.has-remove-keyword-button {
		${ KeywordField } {
			${ getDirectionalStyle( "padding-right: 40px", "padding-left: 40px" ) };
		}

		${ BorderlessButton } {
			${ getDirectionalStyle( "margin-left: -32px", "margin-right: -32px" ) };
		}
	}
`;

/**
 * An input component for the keyphrase.
 */
class KeywordInput extends React.Component {
	/**
	 * Constructs a KeywordInput component.
	 *
	 * @param {Object}   props           The props for the KeywordInput.
	 * @param {string}   props.id        The id of the KeywordInput.
	 * @param {string}   props.label     The label of the KeywordInput.
	 * @param {boolean}  props.showLabel Toggle between an actual label or an aria-label on the input.
	 * @param {string}   props.keyword   The initial keyword passed to the state.
	 * @param {Function} props.onChange  The function that is triggered when the keyword input field is changed.
	 *
	 * @returns {void}
	 */
	constructor( props ) {
		super( props );

		this.handleChange = this.handleChange.bind( this );
		this.displayErrorMessage = this.displayErrorMessage.bind( this );
	}

	/**
	 * Checks the keyword input for comma-separated words.
	 *
	 * @param {string} keywordText The text of the input.
	 *
	 * @returns {boolean} Returns true if a comma was found.
	 */
	checkKeywordInput( keywordText ) {
		return keywordText.includes( "," );
	}

	/**
	 * Displays the error message
	 *
	 * @param {boolean} showErrorMessage Whether or not the error message has to be shown.
	 *
	 * @returns {ReactElement} ErrorText The error message element.
	 */
	displayErrorMessage( showErrorMessage ) {
		if ( showErrorMessage && this.props.keyword !== "" ) {
			return (
				<ErrorText role="alert">
					{ __( "Are you trying to use multiple keyphrases? You should add them separately below.", "yoast-components" ) }
				</ErrorText>
			);
		}
	}

	/**
	 * Handles changes in the KeywordInput, sets the state if a change has been made.
	 *
	 * @param {SyntheticEvent} event The onChange event.
	 *
	 * @returns {void}
	 */
	handleChange( event ) {
		this.props.onChange( event.target.value );
	}

	/**
	 * Renders the input's label.
	 *
	 * @returns {ReactElement} The input label.
	 */
	renderLabel() {
		const {
			id,
			label,
			helpLink,
		} = this.props;
		return (
			<KeywordFieldLabelContainer>
				<KeywordFieldLabel htmlFor={ id }>
					{ label }
				</KeywordFieldLabel>
				{ helpLink }
			</KeywordFieldLabelContainer>
		);
	}

	/**
	 * Renders an input field, a label, and if the condition is met, an error message.
	 *
	 * @returns {ReactElement} The KeywordField react component including its label and eventual error message.
	 */
	render() {
		const { id, showLabel, keyword, onRemoveKeyword, onBlurKeyword, onFocusKeyword } = this.props;
		const showErrorMessage = this.checkKeywordInput( keyword );

		// The aria label should not be shown if there is a visible label.
		const showAriaLabel = ! showLabel;

		const showRemoveKeywordButton = onRemoveKeyword !== noop;

		return (
			<KeywordInputContainer>
				{ showLabel && this.renderLabel() }
				<YoastInputButtonContainer
					className={ showRemoveKeywordButton ? "has-remove-keyword-button" : null }
				>
					<KeywordField
						aria-label={ showAriaLabel ? this.props.label : null }
						type="text"
						id={ id }
						className={ showErrorMessage ? "has-error" : null }
						onChange={ this.handleChange }
						onFocus={ onFocusKeyword }
						onBlur={ onBlurKeyword }
						value={ keyword }
						autoComplete="off"
					/>
					{ showRemoveKeywordButton && (
						<BorderlessButton onClick={ onRemoveKeyword }>
							<RemoveIcon
								size="18px"
								icon="times-circle"
								color={ greyColor }
							/>
						</BorderlessButton>
					) }
				</YoastInputButtonContainer>
				{ this.displayErrorMessage( showErrorMessage ) }
			</KeywordInputContainer>
		);
	}
}

KeywordInput.propTypes = {
	id: PropTypes.string.isRequired,
	showLabel: PropTypes.bool,
	keyword: PropTypes.string,
	onChange: PropTypes.func.isRequired,
	onRemoveKeyword: PropTypes.func,
	onBlurKeyword: PropTypes.func,
	onFocusKeyword: PropTypes.func,
	label: PropTypes.string.isRequired,
	helpLink: PropTypes.node,
};

KeywordInput.defaultProps = {
	showLabel: true,
	keyword: "",
	onRemoveKeyword: noop,
	onBlurKeyword: noop,
	onFocusKeyword: noop,
	helpLink: null,
};

export default KeywordInput;
