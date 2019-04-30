/* External dependencies */
import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

/* Internal dependencies */
import TwitterTitle from "./TwitterTitle";
import TwitterDescription from "./TwitterDescription";
import TwitterSiteName from "./TwitterSiteName";

const TwitterTextContainerWrapper = styled.div`
	background-color: #ffffff;
	${props => props.isLarge && `
		width: 504px;
		height: ${ props.hasDescription ? "102px" : "61px" };
	`}
	${props => ! props.isLarge && `
		width: 378px;
		height: 120px;
	`}
	border-radius: ${ props => props.isLarge ? "0 0 .85714em .85714em" : "0 .85714em .85714em 0" };
    border-width: 1px;
    border-style: solid;
    border-color: #e1e8ed;
`;

const TwitterTextContent = styled.div`
	padding: .75em;
`;

/**
 * Renders a TwitterTextContainer component.
 *
 * @param {object} props The props.
 *
 * @returns {React.Element} The rendered element.
 */
const TwitterTextContainer = ( props ) => {
	return (
		<TwitterTextContainerWrapper isLarge={ props.isLarge } hasDescription={ props.description !== "" }>
			<TwitterTextContent>
				<TwitterTitle title={ props.title } />
				<TwitterDescription isLarge={ props.isLarge } hasDescription={ props.description !== ""}>
					{ props.description }
				</TwitterDescription>
				<TwitterSiteName siteName={ props.siteName } />
			</TwitterTextContent>
		</TwitterTextContainerWrapper>
	);
};

TwitterTextContainer.propTypes = {
	title: PropTypes.string.isRequired,
	isLarge: PropTypes.bool.isRequired,
	description: PropTypes.string,
	siteName: PropTypes.string.isRequired,
};

TwitterTextContainer.defaultProps = {
	description: "",
};

export default TwitterTextContainer;
