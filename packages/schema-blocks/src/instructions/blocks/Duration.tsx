import { BlockConfiguration } from "@wordpress/blocks";
import { TextControl } from "@wordpress/components";
import { RichText } from "@wordpress/block-editor";
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

		return <Fragment>
				<RichText.Content
					type="number"
					value={ value }
					tagName="p"
				/>
			</Fragment>;

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
				const n = parseInt( value, 10 );
				if ( isNaN( n ) ) {
					return;
				}
				props.setAttributes( {
					value,
					iso8601Value: moment.duration( n, "minutes" ).toISOString(),
				} );
			},
			[ props ],
		);

		return <Fragment>
			<RichText
				multiline={ false }
				placeholder="#"
				style={{ display: "inline-block" }}
				tagName="p"
				label="Cooking time"
				className="minutes-input"
				onChange={ onChange }
				value={ props.attributes.value as string }
			/><p style={{ display: "inline-block" }}>{ " " }minutes</p>
		</Fragment>;
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
