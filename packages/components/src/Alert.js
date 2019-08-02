/* External dependencies */
import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import Cookies from "js-cookie";
import { defineMessages, injectIntl, intlShape } from "react-intl";

/* Internal dependencies */
import infoIcon from "./icons/alert-info.svg";
import errorIcon from "./icons/alert-error.svg";
import successIcon from "./icons/alert-success.svg";
import warningIcon from "./icons/alert-warning.svg";
import closeIconInfo from "./icons/times-info.svg";
import closeIconError from "./icons/times-error.svg";
import closeIconWarning from "./icons/times-warning.svg";
import closeIconSuccess from "./icons/times-succes.svg";

const messages = defineMessages( {
	close: {
		id: "alert.close",
		defaultMessage: "close",
	},
} );

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
		color: #004973;

		&:hover,
		&:focus {
			color: #004973;
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
`;

const StyledCloseButtonTopRight = styled.button`
	border: 0;
	border-radius: 4px;
	cursor: pointer;
	vertical-align: top;
	background-repeat: no-repeat;
	background-image: url( ${ props => props.iconSource } );
	background-size: ${ props => props.iconSize };
	background-color: transparent;

	align-self: flex-start;
	background-position: 50%;
	height: 1.25rem;
	max-width: 1.25rem;
	margin: 0 0 0 1em;

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
					color: "#8F1919",
					background: "#F9DCDC",
					icon: errorIcon,
					closeIcon: closeIconError,
				};
			case "success":
				return {
					color: "#395315",
					background: "#E2F2CC",
					icon: successIcon,
					closeIcon: closeIconSuccess,
				};
			case "warning":
				return {
					color: "#674E00",
					background: "#FFF3CD",
					icon: warningIcon,
					closeIcon: closeIconWarning,
				};
			case "info":
			default:
				return {
					color: "#00468F",
					background: "#CCE5FF",
					icon: infoIcon,
					closeIcon: closeIconInfo,
				};
		}
	}

	/**
	 * Called on cross click, hides the alert and saves this setting in a cookie.
	 *
	 * @returns {void}
	 */
	onCrossClick() {
		Cookies.set( this.props.cookieName, "true", { expires: 7 } );
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
							aria-label={ this.props.intl.formatMessage( messages.close ) }
						/>
					}
				</AlertBody>
		);
	}
}

Alert.propTypes = {
	intl: intlShape.isRequired,
	children: PropTypes.any.isRequired,
	dismissable: PropTypes.any.isRequired,
	cookieName: PropTypes.string,
	type: PropTypes.string.isRequired,
};

Alert.defaultProps = {
	cookieName: "",
};

export default injectIntl( Alert );
