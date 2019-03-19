import React, { Fragment } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { colors } from "@yoast/components/style-guide";
import { getRtlStyle, makeOutboundLink } from "@yoast/components";

const CardRegularButton = styled.a`
	color: ${ colors.$color_black };
	white-space: nowrap;
	display: block;
	border-radius: 4px;
	background-color: ${ colors.$color_grey_cta };
	padding: 12px 16px;
	box-shadow: inset 0 -4px 0 rgba(0, 0, 0, 0.2);
	border: none;
	text-decoration: none;
	font-weight: bold;
	font-size: inherit;
	margin-bottom: 8px;

	&:hover,
	&:focus,
	&:active {
		color: ${ colors.$color_black };
		background-color: ${ colors.$color_grey_hover };
	}

	&:active {
		background-color: ${ colors.$color_grey_hover };
		transform: translateY( 1px );
		box-shadow: none;
		filter: none;
	}
`;

const CardUpsellButton = styled.a`
	cursor: pointer;
	color: ${ colors.$color_black };
	white-space: nowrap;
	display: block;
	border-radius: 4px;
	background-color: ${ colors.$color_button_upsell };
	padding: 12px 16px;
	box-shadow: inset 0 -4px 0 rgba(0, 0, 0, 0.2);
	border: none;
	text-decoration: none;
	font-weight: bold;
	font-size: inherit;
	margin-top: 0;
	margin-bottom: 8px;

	&:hover,
	&:focus,
	&:active {
		color: ${ colors.$color_black };
		background: ${ colors.$color_button_upsell_hover };
	}

	&:active {
		background-color: ${ colors.$color_button_hover_upsell };
		transform: translateY( 1px );
		box-shadow: none;
		filter: none;
	}
`;

const CardInfoLink = styled.a`
	font-weight: bold;
`;

const OutboundInfoLink = makeOutboundLink( CardInfoLink );

const ActionBlock = styled.div`
	text-align: center;
`;

const CourseFeatureList = styled.div`
	ul {
		list-style-type: none;
		margin: 0;
		padding: 0;
	}

	li {
		position: relative;
		${ getRtlStyle( "margin-left", "margin-right" ) }: 16px;

		&:before {
			content: "✓";
			color: ${ colors.$color_green };
			position: absolute;
			font-weight: bold;
			display: inline-block;
			${ getRtlStyle( "left", "right" ) }: -16px;
		}
	}
`;

const Details = styled.div`
	margin-bottom: 12px;
	border-bottom: 1px ${ colors.$color_grey } solid;
	flex-grow: 1;
`;

/**
 * CardDetails component.
 */
class CardDetails extends React.Component {
	/**
	 * Sets the CourseCard object.
	 *
	 * @returns {void}
	 */
	constructor() {
		super();
	}

	/**
	 * Renders the component.
	 *
	 * @returns {ReactElement} The rendered component.
	 */
	render() {
		const buttonType = this.props.ctaButtonData.ctaButtonType === "regular" ? CardRegularButton : CardUpsellButton;

		return (
			<Fragment>
				<Details>
					<CourseFeatureList
						dangerouslySetInnerHTML={ { __html: this.props.description } }
					/>
				</Details>
				{ this.getActionBlock( buttonType, this.props.isBundle ) }
			</Fragment>
		);
	}

	/**
	 * Returns the correct Action Block based on whether an item is a bundle or a single course.
	 *
	 * @param {string} buttonType The type of the button. Either regular or sale.
	 * @param {boolean} isBundle True when the it's a bundle.
	 *
	 * @returns {ReactElement} The ActionBlock component.
	 */
	getActionBlock( buttonType, isBundle ) {
		const OutboundLinkButton = makeOutboundLink( buttonType );

		// Bundles don't have an OutboundInfoLink and use a different property from the feed for the OutboundLinkButton.
		if ( isBundle === "true" ) {
			return <ActionBlock>
				<OutboundLinkButton href={ this.props.courseUrl } rel={ null }>
					{ this.props.ctaButtonData.ctaButtonCopy }
				</OutboundLinkButton>
			</ActionBlock>;
		}
		return <ActionBlock>
			<OutboundLinkButton href={ this.props.ctaButtonData.ctaButtonUrl } rel={ null }>
				{ this.props.ctaButtonData.ctaButtonCopy }
			</OutboundLinkButton>
			<OutboundInfoLink href={ this.props.courseUrl } rel={ null }>
				{ this.props.readMoreLinkText }
			</OutboundInfoLink>
		</ActionBlock>;
	}
}

export default CardDetails;

CardDetails.propTypes = {
	description: PropTypes.string,
	courseUrl: PropTypes.string,
	ctaButtonData: PropTypes.object,
	readMoreLinkText: PropTypes.string,
	isBundle: PropTypes.bool,
};

CardDetails.defaultProps = {
	description: "",
	courseUrl: "",
	ctaButtonData: {},
	readMoreLinkText: "",
	isBundle: false,
};
