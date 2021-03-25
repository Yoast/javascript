import Clause from "../../../../values/Clause.js";
import getParticiples from "../helpers/internal/getParticiples.js";

/**
 * Creates a Polish-specific sentence part.
 *
 * @param {string} sentencePartText The text from the sentence part.
 * @param {Array} auxiliaries The list with auxiliaries.
 * @constructor
 */
const PolishSentencePart = function( sentencePartText, auxiliaries ) {
	Clause.call( this, sentencePartText, auxiliaries );
};

require( "util" ).inherits( PolishSentencePart, Clause );

/**
 * Returns the participles found in the sentence part.
 *
 * @returns {Array} The array of Participle Objects.
 */
PolishSentencePart.prototype.getParticiples = function() {
	return getParticiples( this.getSentencePartText(), this.getAuxiliaries() );
};

export default PolishSentencePart;