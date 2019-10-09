// External dependencies.
import React from "react";
import PropTypes from "prop-types";
import uniqueId from "lodash/uniqueId";
import { __ } from "@wordpress/i18n";

// Yoast dependencies.
import { SvgIcon } from "@yoast/components";

// Internal dependencies.
import ReplacementVariableEditorStandalone from "./ReplacementVariableEditorStandalone";
import {
	SimulatedLabel,
	TitleInputContainer,
	DescriptionInputContainer,
	TriggerReplacementVariableSuggestionsButton,
	withCaretStyles,
} from "../shared";
import {
	replacementVariablesShape,
	recommendedReplacementVariablesShape,
} from "./constants";

/**
 * The replacement variable editor.
 */
class ReplacementVariableEditor extends React.Component {
	/**
	 * The constructor.
	 *
	 * @param {Object} props The component props.
	 */
	constructor( props ) {
		super( props );

		this.uniqueId = uniqueId();

		switch ( props.type ) {
			case "description":
				this.InputContainer = DescriptionInputContainer;
				break;
			case "title":
				this.InputContainer = TitleInputContainer;
				break;
			default:
				this.InputContainer = TitleInputContainer;
		}

		if ( props.withCaret ) {
			this.InputContainer = withCaretStyles( this.InputContainer );
		}

		this.triggerReplacementVariableSuggestions = this.triggerReplacementVariableSuggestions.bind( this );
	}

	/**
	 * Inserts a % into a ReplacementVariableEditor to trigger the replacement variable suggestions.
	 *
	 * @returns {void}
	 */
	triggerReplacementVariableSuggestions() {
		this.ref.triggerReplacementVariableSuggestions();
	}

	/**
	 * Renders the components.
	 *
	 * @returns {ReactElement} The rendered element.
	 */
	render() {
		const {
			label,
			onChange,
			content,
			onFocus,
			onBlur,
			isActive,
			isHovered,
			replacementVariables,
			recommendedReplacementVariables,
			editorRef,
			placeholder,
			fieldId,
		} = this.props;

		const InputContainer = this.InputContainer;

		const addVariableButton = <TriggerReplacementVariableSuggestionsButton
			onClick={ () => this.triggerReplacementVariableSuggestions() }
		>
			<SvgIcon icon="plus-circle" />
			{ __( "Insert snippet variable", "yoast-components" ) }
		</TriggerReplacementVariableSuggestionsButton>;

		return (
			<React.Fragment>
				<SimulatedLabel
					id={ this.uniqueId }
					onClick={ onFocus }
				>
					{ label }
				</SimulatedLabel>
				{ replacementVariables.length > 0 && addVariableButton }
				<InputContainer
					onClick={ onFocus }
					isActive={ isActive }
					isHovered={ isHovered }
				>
					<ReplacementVariableEditorStandalone
						fieldId={ fieldId }
						placeholder={ placeholder }
						content={ content }
						onChange={ onChange }
						onFocus={ onFocus }
						onBlur={ onBlur }
						replacementVariables={ replacementVariables }
						recommendedReplacementVariables={ recommendedReplacementVariables }
						ref={ ref => {
							this.ref = ref;
							editorRef( ref );
						} }
						ariaLabelledBy={ this.uniqueId }
					/>
				</InputContainer>
			</React.Fragment>
		);
	}
}

ReplacementVariableEditor.propTypes = {
	editorRef: PropTypes.func,
	content: PropTypes.string.isRequired,
	onChange: PropTypes.func.isRequired,
	onBlur: PropTypes.func,
	replacementVariables: replacementVariablesShape,
	recommendedReplacementVariables: recommendedReplacementVariablesShape,
	isActive: PropTypes.bool,
	isHovered: PropTypes.bool,
	withCaret: PropTypes.bool,
	onFocus: PropTypes.func,
	label: PropTypes.string,
	placeholder: PropTypes.string,
	type: PropTypes.oneOf( [ "title", "description" ] ),
	fieldId: PropTypes.string,
};

ReplacementVariableEditor.defaultProps = {
	replacementVariables: [],
};

export default ReplacementVariableEditor;
