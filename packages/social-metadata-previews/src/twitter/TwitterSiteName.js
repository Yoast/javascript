/* External dependencies */
import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const TwitterSiteNameWrapper = styled.p`
	font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
	font-size: 14px;
	line-height: 18px;
	font-weight: 400;
	text-transform: lowercase;
	color: #8899a6;
	max-height: 18px;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
	margin-top: 5px;
`;

/**
 * Renders a TwitterSiteName component.
 *
 * @param {object} props The props.
 *
 * @returns {React.Element} The rendered element.
 */
const TwitterSiteName = ( props ) => {
	return (
		<TwitterSiteNameWrapper>
			{ props.siteName }
		</TwitterSiteNameWrapper>
	);
};

TwitterSiteName.propTypes = {
	siteName: PropTypes.string.isRequired,
};

export default TwitterSiteName;
