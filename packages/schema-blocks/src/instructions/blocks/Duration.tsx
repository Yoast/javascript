import { BlockConfiguration } from "@wordpress/blocks";
import { RichText } from "@wordpress/block-editor";
import { __, sprintf } from "@wordpress/i18n";
import { TextControl } from "@wordpress/components";
import moment from "moment";
import interpolateComponents from "interpolate-components";

import { ReactElement, createElement, useCallback } from "react";
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
	 * The format to be displayed.
	 */
	/* translators: %d will be replaced with the number of minutes. */
	private format: string = __( "%d minutes", "wordpress-seo" );

	/**
	 * Renders saving the element.
	 *
	 * @param props The props.
	 *
	 * @returns {JSX.Element} The element to render.
	 */
	save( props: RenderSaveProps ): ReactElement | string {
		const { name } = this.options;

		const value = props.attributes.value as number || 0;

		return <RichText.Content
			name={ name }
			value={ sprintf( this.format, value ) }
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
			( value = 0 ) => {
				props.setAttributes( {
					value,
					iso8601Value: moment.duration( value, "minutes" ).toISOString(),
				} );
			},
			[ props.attributes.value ],
		);

		return (
			<div className="yoast-schema-flex">
				{ interpolateComponents( {
					/* translators: {{input/}} will be replaced with an input field, {{p}} and {{/p}} will be replaced with opening and closing
					paragraph tags. Note: The input field cannot be within the paragraph tags. */
					mixedString: __( "{{input/}}{{p}} minutes{{/p}}", "wordpress-seo" ),
					components: {
						input: <TextControl
							type="number"
							placeholder="#"
							aria-label={ __( "Cooking time", "wordpress-seo" ) }
							className="minutes-input"
							onChange={ onChange }
							value={ props.attributes.value as number || "" }
						/>,
						p: <p />,
					},
				} ) }
			</div>
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
					type: "number",
				},
				iso8601Value: {
					type: "string",
				},
			},
		};
	}
}

BlockInstruction.register( "duration", Duration );
