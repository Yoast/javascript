/* External dependencies */
import styled from "styled-components";
import PropTypes from "prop-types";

/**
 * Renders a TwitterDescription component.
 *
 * @param {object} props The props.
 *
 * @returns {React.Component} The rendered element.
 */
const TwitterDescription = styled.p`
	font-size: 14px;
	max-height: ${ props => props.isLarge ? "36px" : "55px" };
	line-height: 18px;
	overflow: hidden;
	margin: 0;
	margin-bottom: ${ props => props.hasDescription ? "5px" : "0px" };
	width: ${ props => props.isLarge ? "476px" : "357px" };
`;

TwitterDescription.propTypes = {
	isLarge: PropTypes.bool.isRequired,
	hasDescription: PropTypes.string.isRequired,
};

export default TwitterDescription;
