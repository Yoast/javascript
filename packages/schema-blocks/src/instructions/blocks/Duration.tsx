import { BlockConfiguration } from "@wordpress/blocks";
import { RichText } from "@wordpress/block-editor";
import { __, sprintf } from "@wordpress/i18n";
import moment from "moment";

import { ReactElement, createElement, useCallback, Fragment } from "react";
import BlockInstruction from "../../core/blocks/BlockInstruction";
import { RenderEditProps, RenderSaveProps } from "../../core/blocks/BlockDefinition";

/**
 * Duration instruction.
 */
export default class Duration extends BlockInstruction {
	public options: {
		/**
		 * The attribute name the value selected in the select control should be saved as.
		 */
		name: string;
		/**
		 * If it is required that a value is selected.
		 */
		required?: boolean;
		/**
		 * An optional extra class name or class names.
		 */
		className?: string;
	};

	/**
	 * Renders saving the element.
	 *
	 * @param props The props.
	 *
	 * @returns {JSX.Element} The element to render.
	 */
	save( props: RenderSaveProps ): ReactElement | string {
		const { name } = this.options;

		const value = props.attributes.value as string || "";

		return <RichText.Content
			name={ name }
			value={ sprintf( __( "%d minutes", "wordpress-seo" ), value ) }
			tagName="p"
		/>;
	}

	/**
	 * Renders editing the element.
	 *
	 * @param props The props.
	 *
	 * @returns {JSX.Element} The element to render.
	 */
	edit( props: RenderEditProps ): ReactElement | string {
		const onChange = useCallback(
			value => {
				const parsedValue = parseInt( value, 10 );
				console.log( parsedValue, value );
				if ( isNaN( parsedValue ) ) {
					props.setAttributes( { value: props.attributes.value } );
				}
				props.setAttributes( {
					value: parsedValue,
					iso8601Value: moment.duration( parsedValue, "minutes" ).toISOString(),
				} );
			},
			[ props.attributes.value ],
		);

		console.log( props.attributes.value );

		return (
			<p>
				<RichText
					keepPlaceholderOnFocus={ true }
					multiline={ false }
					placeholder="#"
					tagName="span"
					aria-label={ __( "Cooking time", "wordpress-seo" ) }
					className="minutes-input"
					onChange={ onChange }
					value={ props.attributes.value as string }
				/>{ " " }minutes
			</p>
		);
	}

	/**
	 * Adds the select to the block configuration.
	 *
	 * @returns The block configuration.
	 */
	configuration(): Partial<BlockConfiguration> {
		return {
			attributes: {
				value: {
					type: "string",
				},
				iso8601Value: {
					type: "string",
				},
			},
		};
	}
}

BlockInstruction.register( "duration", Duration );
