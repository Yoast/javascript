import { pullAll } from "lodash-es";

import { ignoredHtmlElements } from "../html/htmlConstants";
import getElementContent from "./getElementContent";

/**
 * Gathers all elements that can be closed given the position of the current element in the source code.
 *
 * Elements that can be closed are all elements that are opened before this element, but in which this element is
 * not nested.
 * E.g.
 * ```html
 * <strong>Hello</strong><em>World<b>!!!</b></em>`
 * ```
 * with `<b>!!!</b>` as the current element,
 * means that the `<strong>` needs to be closed, but `<em>` **not**.
 *
 * @param {module:parsedPaper/structure.FormattingElement} currentElement The current element.
 * @param {module:parsedPaper/structure.FormattingElement[]} openElements The elements that are currently open.
 *
 * @returns {module:parsedPaper/structure.FormattingElement[]} The elements that can be closed.
 */
const elementsThatCanBeClosed = function( currentElement, openElements ) {
	return openElements.filter( el => {
		const endTag = el.location.endTag;
		return endTag.endOffset <= currentElement.location.startOffset;
	} );
};

/**
 * Closes the elements that can be closed given the position of the current element within the source code.
 *
 * This does two things:
 *  1. The closed element's text end index is calculated based on the current offset.
 *  2. The closed element's end tag lengths are counted towards the current offset, to make sure that the computed position
 * of the formatting elements are still correct.
 *
 * @param {module:parsedPaper/structure.FormattingElement[]} elementsToClose The list of open elements that need to be closed
 * @param {number} currentOffset                                      The current offset when parsing the formatting elements
 *
 * @returns {number} The updated current offset
 *
 * @private
 */
const closeElements = function( elementsToClose, currentOffset ) {
	// Sort, so we close all elements in the right order.
	elementsToClose.sort( ( a, b ) => a.location.endTag.endOffset - b.location.endTag.endOffset );

	elementsToClose.forEach( elementToClose => {
		const endTag = elementToClose.location.endTag;
		// Set the end position as seen in the text.
		elementToClose.textEndIndex = endTag.startOffset - currentOffset;
		/*
		  Add the end tag length of the to be closed element to the total offset.
		 */
		const endTagLength = endTag.endOffset - endTag.startOffset;
		currentOffset += endTagLength;
	} );

	return currentOffset;
};

/**
 * Adds the content length of the given element (the part between the tags) to the current offset
 * and adds the content to the element as a parameter.
 *
 * @param {module:parsedPaper/structure.FormattingElement} element The element of which to add the content length.
 * @param {string} html                                     The original html source code.
 * @param {number} currentOffset                            The current offset to which to add the length to.
 *
 * @returns {number} The updated current offset
 */
const handleIgnoredContent = function( element, html, currentOffset ) {
	// Has 0 length in text, so end = start.
	element.textEndIndex = element.textStartIndex;

	// Set content.
	const content = getElementContent( element, html );
	element.content = content;

	// Update current offset.
	currentOffset += content.length;

	return currentOffset;
};


/**
 * Sets the start and end text positions of a comment.
 *
 * @param {module:parsedPaper/structure.FormattingElement}	comment			The formatting element to assign start and end text positions to.
 * @param {int}												currentOffset	A sum of all characters in the source code that don't get rendered
 * 																			(e.g., tags, comments).
 *
 * @returns {number} The new current offset after taking this comment into account.
 *
 * @private
 */
const computeCommentStartEndTextIndices = function( comment, currentOffset ) {
	comment.textStartIndex = comment.location.startOffset - currentOffset;
	comment.textEndIndex = comment.textStartIndex;

	const length = comment.location.endOffset - comment.location.startOffset;

	const newOffset = currentOffset + length;

	return newOffset;
};

/**
 * Sets the start and end text positions of one formatting element.
 *
 * @param {module:parsedPaper/structure.FormattingElement}	element			The formatting element to assign start and end text positions to.
 * @param {int}												currentOffset	A sum of all characters in the source code that don't get rendered
 * 																			(e.g., tags, comments).
 *
 * @returns {int} The updated currentOffset.
 *
 * @private
 */
const computeElementStartTextIndex = function( element, currentOffset ) {
	const startTag = element.location.startTag;

	// For example: "<strong>".length
	const startTagLength = startTag.endOffset - startTag.startOffset;

	currentOffset += startTagLength;

	// Set start position of element in heading's / paragraph's text.
	element.textStartIndex = startTag.endOffset - currentOffset;

	/*
	  Elements that have no end tags (e.g., void element like <img/> or self-closing elements) can be closed immediately.
	  The text length of those elements will be automatically 0.
	 */
	if ( ! element.location.endTag ) {
		element.textEndIndex = element.textStartIndex;
	}

	return currentOffset;
};

/**
 * Sets the start and end position of the text in formatting elements of the given node.
 *
 * @param {module:parsedPaper/structure.LeafNode} node The node containing a TextContainer
 * @param {string} html                         The source code
 *
 * @returns {void}
 *
 * @private
 */
const calculateTextIndices = function( node, html ) {
	if ( ! node.textContainer.formatting || node.textContainer.formatting.length === 0 ) {
		return;
	}

	const openElements = [];

	/*
	  Keeps track of the current total size of the start and end tags (and the ignored content)
	  These should not be counted towards the start and end position of the elements in the text.
	 */
	let currentOffset = node.location.startTag ? node.location.startTag.endOffset : node.location.startOffset;

	node.textContainer.formatting.forEach( element => {
		// Close elements that can be closed and remove them from the list of open elements.
		const elementsToClose = elementsThatCanBeClosed( element, openElements );
		currentOffset = closeElements( elementsToClose, currentOffset );
		pullAll( openElements, elementsToClose );

		// Comments are self-closing formatting elements that are completely ignored in rendering.
		if ( element.tag === "comment" ) {
			currentOffset = computeCommentStartEndTextIndices( element, currentOffset );
			return;
		}

		currentOffset = computeElementStartTextIndex( element, currentOffset );

		// If there is an endTag, the element should be closed in one of the next iterations of the loop.
		if (  element.location.endTag ) {
			openElements.push( element );
		}

		/*
		 * If this element is an ignored element its contents are not in the text,
		 * so its content should be added to the respective formatting element instead,
		 * and the current offset should be updated.
		 */
		if ( ignoredHtmlElements.includes( element.tag ) ) {
			currentOffset = handleIgnoredContent( element, html, currentOffset );
		}
	} );
	// Close all remaining elements.
	closeElements( openElements, currentOffset );
};

export default calculateTextIndices;
