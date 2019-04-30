/* External dependencies */
import React, { Fragment } from "react";
import PropTypes from "prop-types";

/* Internal dependencies */
import TwitterImage from "../twitter/TwitterImage";
import TwitterTextContainer from "../twitter/TwitterTextContainer";

/**
 * Renders a TwitterPreview component.
 *
 * @param {object} props The props.
 *
 * @returns {React.Element} The rendered element.
 */
const TwitterPreview = ( props ) => {
	return (
		<Fragment>
			<TwitterImage src={ props.src } alt={ props.alt } />
			<TwitterTextContainer
				title={ props.title }
				isLarge={ props.isLarge }
				siteName={ props.siteName }
				description={ props.description }
			/>
		</Fragment>
	);
};

TwitterPreview.propTypes = {
	title: PropTypes.string.isRequired,
	description: PropTypes.string,
	isLarge: PropTypes.bool.isRequired,
	siteName: PropTypes.string.isRequired,
	src: PropTypes.string.isRequired,
	alt: PropTypes.string,
};

TwitterPreview.defaultProps = {
	alt: "",
};

TwitterPreview.defaultProps = {
	description: "",
};

export default TwitterPreview;
