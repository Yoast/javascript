import Clause from "../../../../values/Clause.js";
import getParticiples from "../helpers/internal/getParticiples.js";

/**
 * Creates a Portuguese-specific sentence part.
 *
 * @param {string} sentencePartText The text from the sentence part.
 * @param {Array} auxiliaries The list with auxiliaries.
 * @constructor
 */
const PortugueseSentencePart = function( sentencePartText, auxiliaries ) {
	Clause.call( this, sentencePartText, auxiliaries );
};

require( "util" ).inherits( PortugueseSentencePart, Clause );

/**
 * Returns the participles found in the sentence part.
 *
 * @returns {Array} The array of Participle Objects.
 */
PortugueseSentencePart.prototype.getParticiples = function() {
	return getParticiples( this.getSentencePartText(), this.getAuxiliaries() );
};

export default PortugueseSentencePart;