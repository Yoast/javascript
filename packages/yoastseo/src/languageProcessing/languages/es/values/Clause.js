import Clause from "../../../../values/Clause.js";
import getParticiples from "../helpers/internal/getParticiples.js";

/**
 * Creates a Spanish-specific sentence part.
 *
 * @param {string} sentencePartText The text from the sentence part.
 *
 * @param {Array} auxiliaries The list with auxiliaries.
 * @constructor
 */
const SpanishSentencePart = function( sentencePartText, auxiliaries ) {
	Clause.call( this, sentencePartText, auxiliaries );
};

require( "util" ).inherits( SpanishSentencePart, Clause );

/**
 * Returns the participles found in the sentence part.
 *
 * @returns {Array} The array of Participle Objects.
 */
SpanishSentencePart.prototype.getParticiples = function() {
	return getParticiples( this.getSentencePartText(), this.getAuxiliaries() );
};

export default SpanishSentencePart;
