/**
 * Sentence clause which should be checked for passiveness.
 *
 */
class Clause {
	/**
	 * Constructs a clause object.
	 *
	 * @param {string} clauseText The text in the clause.
	 * @param {Array} auxiliaries The list of auxiliaries from the sentence part.
	 *
	 * @constructor
	 */
	constructor( clauseText, auxiliaries ) {
		this._clauseText = clauseText;
		this._auxiliaries = auxiliaries;
		this._isPassive = false;
		this._participles = [];
	}
	/**
	 * Returns the clause text.
	 *
	 * @returns {string} The clause text.
	 */
	getClauseText() {
		return this._clauseText;
	}

	/**
	 * Returns true if the clause is passive.
	 *
	 * @returns {boolean} Whether the clause is passive.
	 */
	isPassive() {
		return this._isPassive;
	}

	/**
	 * Returns the auxiliaries of the clause.
	 *
	 * @returns {Array} The auxiliaries present in the clause.
	 */
	getAuxiliaries() {
		return this._auxiliaries;
	}

	/**
	 *
	 *
	 * @param passive
	 */
	setPassive( passive ) {
		this._isPassive = passive;
	}

	/**
	 *
	 * @param participles
	 */
	setParticiples( participles ) {
		this._participles = participles;
	}

	/**
	 *
	 * @returns {[]}
	 */
	getParticiples() {
		return this._participles;
	}

	/**
	 *
	 * @param isParticiplePassive
	 */
	checkParticiples( isParticiplePassive ) {
		const foundParticiples = this.getParticiples();

		let passive = false;
		for ( const participle of foundParticiples ) {
			if ( this.checkParticiplePassiveness( isParticiplePassive( this.getClauseText(), participle ) ) ) {
				passive = true;
			}
		}
		this.setPassive( passive );
	}

	/**
	 *
	 * @param isParticiplePassive
	 * @returns {*}
	 */
	checkParticiplePassiveness( isParticiplePassive ) {
		return isParticiplePassive;
	}

	/**
	* Serializes the Clause instance to an object.
	*
	* @returns {Object} The serialized Clause.
	*/
	serialize() {
		return {
			_parseClass: "Clause",
			clauseText: this._clauseText,
			auxiliaries: this._auxiliaries,
			isPassive: this._isPassive,
			participles: this._participles,

		};
	}

	/**
	 *
	 * @param serialized
	 * @returns {Clause}
	 */
	parse( serialized ) {
		const clause = new Clause( serialized.clauseText, serialized.auxiliaries );
		clause.setPassive( serialized.isPassive );

		return clause;
	}
}

export default Clause;

/*
/!**
 * Constructs a sentence part object.
 *
 * @param {string} sentencePartText The text in the sentence part.
 * @param {Array} auxiliaries The list of auxiliaries from the sentence part.
 *
 * @constructor
 *!/
const Clause = function( sentencePartText, auxiliaries ) {
	this._sentencePartText = sentencePartText;
	this._auxiliaries = auxiliaries;
	this._isPassive = false;
};

/!**
 * Returns the sentence part string.
 *
 * @returns {string} The sentence part.
 *!/
Clause.prototype.getSentencePartText = function() {
	return this._sentencePartText;
};

/!**
 * Returns the passiveness of a sentence part.
 *
 * @returns {boolean} returns true if passive, otherwise returns false.
 *!/
Clause.prototype.isPassive = function() {
	return this._isPassive;
};

/!**
 * Returns the list of auxiliaries from a sentence part.
 *
 * @returns {Array} The list of auxiliaries.
 *!/
Clause.prototype.getAuxiliaries = function() {
	return this._auxiliaries;
};

/!**
 * Sets the passiveness of the sentence part.
 *
 * @param {boolean} passive Whether the sentence part is passive or not.
 *
 * @returns {void}
 *!/
Clause.prototype.setPassive = function( passive ) {
	this._isPassive = passive;
};

/!**
 * Serializes the Clause instance to an object.
 *
 * @returns {Object} The serialized Clause.
 *!/
Clause.prototype.serialize = function() {
	return {
		_parseClass: "Clause",
		sentencePartText: this._sentencePartText,
		auxiliaries: this._auxiliaries,
		isPassive: this._isPassive,
	};
};

/!**
 * Parses the object to a Clause.
 *
 * @param {Object} serialized The serialized object.
 *
 * @returns {Clause} The parsed Clause.
 *!/
Clause.parse = function( serialized ) {
	const sentencePart = new Clause( serialized.sentencePartText, serialized.auxiliaries );
	sentencePart.setPassive( serialized.isPassive );

	return sentencePart;
};

export default Clause;
*/
