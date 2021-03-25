/**
 * Construct the Sentence object and set the sentence text.
 *
 * @param {string} sentence The text of the sentence.
 * @constructor
 */
class Sentence {
	/**
	 * Constructor.
	 *
	 * @param {string} sentence The sentence
	 * @constructor
	 */
	constructor( sentence ) {
		this._sentenceText = sentence || "";
		this._isPassive = false;
		this._clauses = [];
	}

	/**
	 * Returns the sentence text.
	 *
	 * @returns {string} The sentence.
	 */
	getSentenceText() {
		return this._sentenceText;
	}

	/**
	 * Returns the passiveness of a sentence.
	 *
	 * @returns {boolean} True if passive, otherwise returns false.
	 */
	isPassive() {
		return this._isPassive;
	}

	/**
	 * Sets the passiveness of the sentence.
	 *
	 * @param {boolean} passive Whether the sentence is passive or not.
	 * @returns {void}
	 */
	setPassive( passive ) {
		this._isPassive = passive;
	}

	/**
	 * Returns an array of clauses.
	 *
	 * @returns {Array} returns array of clauses
	 */
	getClauses() {
		return this._clauses;
	}

	/**
	 * Sets the clauses.
	 *
	 * @param {Object} clauses The clauses
	 *
	 * @returns {void}
 	 */
	setClauses( clauses ) {
		this._clauses = clauses;
	}

	/**
	 * Checks whether the clause is passive. Modifies the sentence passiveness.
	 *
	 * @returns {void}
	 */
	checkClauseIsPassive() {
		const foundClauses = this.getClauses();
		let passive = false;
		for ( const clause of foundClauses ) {
			passive = passive || clause.isPassive();
		}
		this.setPassive( passive );
	}

	/**
	 * Serializes the Sentence instance to an object.
	 *
	 * @returns {Object} The serialized Participle.
	 */
	serialize() {
		return {
			_parseClass: "Sentence",
			sentenceText: this._sentenceText,
			isPassive: this._isPassive,
			clauses: this._clauses,
		};
	}

	/**
	 * Parses the object to a Sentence.
	 *
	 * @param {Object} serialized The serialized object.
	 *
	 * @returns {Sentence} The parsed Sentence.
	 */
	parse( serialized ) {
		const sentence = new Sentence( serialized.sentenceText );
		sentence.setClauses( serialized.clauses );
		sentence.setPassive( serialized.isPassive );
		return sentence;
	}
}
export default Sentence;
