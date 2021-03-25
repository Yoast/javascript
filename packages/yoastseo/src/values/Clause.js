/**
 * Constructs a sentence part object.
 *
 * @param {string} sentencePartText The text in the sentence part.
 * @param {Array} auxiliaries The list of auxiliaries from the sentence part.
 *
 * @constructor
 */
const Clause = function( sentencePartText, auxiliaries ) {
	this._sentencePartText = sentencePartText;
	this._auxiliaries = auxiliaries;
	this._isPassive = false;
};

/**
 * Returns the sentence part string.
 *
 * @returns {string} The sentence part.
 */
Clause.prototype.getSentencePartText = function() {
	return this._sentencePartText;
};

/**
 * Returns the passiveness of a sentence part.
 *
 * @returns {boolean} returns true if passive, otherwise returns false.
 */
Clause.prototype.isPassive = function() {
	return this._isPassive;
};

/**
 * Returns the list of auxiliaries from a sentence part.
 *
 * @returns {Array} The list of auxiliaries.
 */
Clause.prototype.getAuxiliaries = function() {
	return this._auxiliaries;
};

/**
 * Sets the passiveness of the sentence part.
 *
 * @param {boolean} passive Whether the sentence part is passive or not.
 *
 * @returns {void}
 */
Clause.prototype.setPassive = function( passive ) {
	this._isPassive = passive;
};

/**
 * Serializes the Clause instance to an object.
 *
 * @returns {Object} The serialized Clause.
 */
Clause.prototype.serialize = function() {
	return {
		_parseClass: "Clause",
		sentencePartText: this._sentencePartText,
		auxiliaries: this._auxiliaries,
		isPassive: this._isPassive,
	};
};

/**
 * Parses the object to a Clause.
 *
 * @param {Object} serialized The serialized object.
 *
 * @returns {Clause} The parsed Clause.
 */
Clause.parse = function( serialized ) {
	const sentencePart = new Clause( serialized.sentencePartText, serialized.auxiliaries );
	sentencePart.setPassive( serialized.isPassive );

	return sentencePart;
};

export default Clause;
