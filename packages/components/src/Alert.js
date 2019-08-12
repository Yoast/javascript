/* External dependencies */
import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import Cookies from "js-cookie";
import { __ } from "@wordpress/i18n";

/* Yoast dependencies */
import { colors } from "@yoast/style-guide";

/**
 * Returns an error icon SVG data URI.
 *
 * @param {string} color The desired color for the SVG.
 *
 * @returns {string} The SVG image data URI.
 */
const errorIcon = ( color ) =>
	"data:image/svg+xml;charset=utf8," + encodeURIComponent(
		'<svg width="1792" height="1792" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">' +
	// eslint-disable-next-line
	'<path fill="' + color + '" d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm121.6 313.1c4.7 4.7 4.7 12.3 0 17L338 377.6c-4.7 4.7-12.3 4.7-17 0L256 312l-65.1 65.6c-4.7 4.7-12.3 4.7-17 0L134.4 338c-4.7-4.7-4.7-12.3 0-17l65.6-65-65.6-65.1c-4.7-4.7-4.7-12.3 0-17l39.6-39.6c4.7-4.7 12.3-4.7 17 0l65 65.7 65.1-65.6c4.7-4.7 12.3-4.7 17 0l39.6 39.6c4.7 4.7 4.7 12.3 0 17L312 256l65.6 65.1z" />' +
	"</svg>"
	);

/**
 * Returns an info icon SVG data URI.
 *
 * @param {string} color The desired color for the SVG.
 *
 * @returns {string} The SVG image data URI.
 */
export const infoIcon = ( color ) =>
	"data:image/svg+xml;charset=utf8," + encodeURIComponent(
		'<svg width="1792" height="1792" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">' +
	// eslint-disable-next-line
	'<path fill="' + color + '" d="M256 8C119.043 8 8 119.083 8 256c0 136.997 111.043 248 248 248s248-111.003 248-248C504 119.083 392.957 8 256 8zm0 110c23.196 0 42 18.804 42 42s-18.804 42-42 42-42-18.804-42-42 18.804-42 42-42zm56 254c0 6.627-5.373 12-12 12h-88c-6.627 0-12-5.373-12-12v-24c0-6.627 5.373-12 12-12h12v-64h-12c-6.627 0-12-5.373-12-12v-24c0-6.627 5.373-12 12-12h64c6.627 0 12 5.373 12 12v100h12c6.627 0 12 5.373 12 12v24z" />' +
	"</svg>"
	);

/**
 * Returns a warning icon SVG data URI.
 *
 * @param {string} color The desired color for the SVG.
 *
 * @returns {string} The SVG image data URI.
 */
export const warningIcon = ( color ) =>
	"data:image/svg+xml;charset=utf8," + encodeURIComponent(
		'<svg width="1792" height="1792" viewBox="0 0 576 512" xmlns="http://www.w3.org/2000/svg">' +
	// eslint-disable-next-line
	'<path fill="' + color + '" d="M569.517 440.013C587.975 472.007 564.806 512 527.94 512H48.054c-36.937 0-59.999-40.055-41.577-71.987L246.423 23.985c18.467-32.009 64.72-31.951 83.154 0l239.94 416.028zM288 354c-25.405 0-46 20.595-46 46s20.595 46 46 46 46-20.595 46-46-20.595-46-46-46zm-43.673-165.346l7.418 136c.347 6.364 5.609 11.346 11.982 11.346h48.546c6.373 0 11.635-4.982 11.982-11.346l7.418-136c.375-6.874-5.098-12.654-11.982-12.654h-63.383c-6.884 0-12.356 5.78-11.981 12.654z" />' +	"</svg>"
	);

/**
 * Returns a success icon SVG data URI.
 *
 * @param {string} color The desired color for the SVG.
 *
 * @returns {string} The SVG image data URI.
 */
export const successIcon = ( color ) =>
	"data:image/svg+xml;charset=utf8," + encodeURIComponent(
		'<svg width="1792" height="1792" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">' +
	// eslint-disable-next-line
	'<path fill="' + color + '" d="M504 256c0 136.967-111.033 248-248 248S8 392.967 8 256 119.033 8 256 8s248 111.033 248 248zM227.314 387.314l184-184c6.248-6.248 6.248-16.379 0-22.627l-22.627-22.627c-6.248-6.249-16.379-6.249-22.628 0L216 308.118l-70.059-70.059c-6.248-6.248-16.379-6.248-22.628 0l-22.627 22.627c-6.248 6.248-6.248 16.379 0 22.627l104 104c6.249 6.249 16.379 6.249 22.628.001z" />' +
	"</svg>"
	);

/**
 * Returns a close icon SVG data URI.
 *
 * @param {string} color The desired color for the SVG.
 *
 * @returns {string} The SVG image data URI.
 */
export const closeIcon = ( color ) =>
	"data:image/svg+xml;charset=utf8," + encodeURIComponent(
		'<svg width="1792" height="1792" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">' +
	// eslint-disable-next-line
	'<path fill="' + color + '" d="M1490 1322q0 40-28 68l-136 136q-28 28-68 28t-68-28l-294-294-294 294q-28 28-68 28t-68-28l-136-136q-28-28-28-68t28-68l294-294-294-294q-28-28-28-68t28-68l136-136q28-28 68-28t68 28l294 294 294-294q28-28 68-28t68 28l136 136q28 28 28 68t-28 68l-294 294 294 294q28 28 28 68z" />' + "</svg>"
	);

const AlertBody = styled.div`
	display: flex;
	align-items: center;
	font-size: 14px;
	border: 1px solid rgba(0, 0, 0, 0.2);
	padding: 16px;
	color: ${ props => props.alertColor };
	background: ${ props => props.alertBackground };
	margin-bottom: 20px;

	a {
		color: ${ colors.$color_alert_blue_link };

		&:hover,
		&:focus {
			color: ${ colors.$color_alert_blue_link };
		}
	}
`;

const AlertIcon = styled.span`
	align-self: flex-start;
	background-position: 50%;
	background-repeat: no-repeat;
	background-size: 1rem;
	background-image: url( ${ props => props.icon } );
	height: 1rem;
	min-width: 1rem;
	margin: 0.125rem 1em 0 0.125rem;
`;

const AlertMessage = styled.div`
	flex: 1 1 auto;

	& p:first-child {
		margin-top: 0;
	}

	& p:last-child {
		margin-bottom: 0;
	}
`;

const StyledCloseButtonTopRight = styled.button`
	align-self: flex-start;
	height: 1.25rem;
	min-width: 1.25rem;
	margin: 0 0 0 1em;
	padding: 0;
	border: 0;
	cursor: pointer;
	background: transparent url( ${ props => props.iconSource } ) no-repeat center;
	background-size: ${ props => props.iconSize };

	&:hover,
	&:focus {
		opacity: 1;
	}
`;

/**
 * Returns the rendered Alert component.
 *
 * @param {Object} props The props to use.
 *
 * @returns {ReactElement} The rendered Alert component.
 */
class Alert extends React.Component {
	/**
	 * Initializes the class with the specified props.
	 *
	 * @param {Object} props The props to be passed to the class that was extended from.
	 *
	 * @returns {void}
	 */
	constructor( props ) {
		super( props );
		this.state = {
			hideAlert: false,
		};
		this.onCrossClick = this.onCrossClick.bind( this );
		this.options = this.getTypeDisplayOptions();
	}

	/**
	 * On init, checks for the cookie name provided in the props and if present hides the alert.
	 *
	 * @returns {void}
	 */
	componentDidMount() {
		if ( Cookies.get( this.props.cookieName ) ) {
			this.setState( { hideAlert: true } );
		}
	}

	/**
	 * Returns the colors and icon to be used based on the type provided to the props.
	 *
	 * @returns {object} Options with colors and icons to be used.
	 */
	getTypeDisplayOptions() {
		switch ( this.props.type ) {
			case "error":
				return {
					color: colors.$color_alert_error_red,
					background: colors.$color_alert_error_red_light,
					icon: errorIcon( colors.$color_alert_error_red ),
					closeIcon: closeIcon( colors.$color_alert_error_red ),
				};
			case "success":
				return {
					color: colors.$color_alert_success_green,
					background: colors.$color_alert_success_green_light,
					icon: successIcon( colors.$color_alert_success_green ),
					closeIcon: closeIcon( colors.$color_alert_success_green ),
				};
			case "warning":
				return {
					color: colors.$color_alert_warning_yellow,
					background: colors.$color_alert_warning_yellow_light,
					icon: warningIcon( colors.$color_alert_warning_yellow ),
					closeIcon: closeIcon( colors.$color_alert_warning_yellow ),
				};
			case "info":
			default:
				return {
					color: colors.$color_alert_info_blue,
					background: colors.$color_alert_info_blue_light,
					icon: infoIcon( colors.$color_alert_info_blue ),
					closeIcon: closeIcon( colors.$color_alert_info_blue ),
				};
		}
	}

	/**
	 * Called on cross click, hides the alert and saves this setting in a cookie.
	 *
	 * @returns {void}
	 */
	onCrossClick() {
		Cookies.set( this.props.cookieName, "hide", { expires: 7 } );
		this.setState( { hideAlert: true } );
	}

	/**
	 * Renders the component.
	 *
	 * @returns {ReactElement} The rendered component.
	 */
	render() {
		return (
			! this.state.hideAlert &&
				<AlertBody alertColor={ this.options.color } alertBackground={ this.options.background }>
					<AlertIcon icon={ this.options.icon } />
					<AlertMessage>
						{ this.props.children }
					</AlertMessage>
					{ this.props.dismissable &&
						<StyledCloseButtonTopRight
							onClick={ this.onCrossClick }
							iconSource={ this.options.closeIcon }
							iconSize="1rem"
							aria-label={ __( "close", "yoast-components" ) }
						/>
					}
				</AlertBody>
		);
	}
}

Alert.propTypes = {
	children: PropTypes.any.isRequired,
	dismissable: PropTypes.any.isRequired,
	cookieName: PropTypes.string,
	type: PropTypes.string.isRequired,
};

Alert.defaultProps = {
	cookieName: "",
};

export default Alert;
