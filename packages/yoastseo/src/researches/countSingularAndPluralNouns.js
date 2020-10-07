import { get } from "lodash-es";
import filterFunctionWordsFromArray from "../helpers/filterFunctionWordsFromArray";
import getLanguage from "../helpers/getLanguage";
import { determineIrregularStem, determineIrregularVerbStem } from "../morphology/english/determineStem";
import getWords from "../stringProcessing/getWords";
import { searchAndReplaceWithRegex } from "../morphology/morphoHelpers/regexHelpers";
import matchTextWithWord from "../stringProcessing/matchTextWithWord";

/**
 * Determines whether the words in the keyphrase are noun.
 *
 * @param {string} keyphrase        The paper's keyphrase
 * @param {Object} morphologyData   The morphology data file for English
 *
 * @returns {null|Array}    The Array of nouns found in the keyphrase or null if there is no noun found.
 */
const determineWordIsNoun = function( keyphrase, morphologyData ) {
	const wordsInKeyphrase = filterFunctionWordsFromArray( getWords( keyphrase ), "en" );
	const adjectiveExceptions = morphologyData.adjectives.irregularAdjectives;


	for ( const word of wordsInKeyphrase ) {
		// Check if word is an irregular adjective or verb
		if ( determineIrregularStem( word, adjectiveExceptions ) ||
			determineIrregularVerbStem( word, morphologyData.verbs ) ) {
			return null;
		}
		// Check if the word has a specific markers of other word classes
		if ( word.length > 4 && word.endsWith( "ed" ) ) {
			return null;
		}
	}
	return wordsInKeyphrase;
};

/**
 * A pair with the original and a modified version of a keyword.
 * The original might be singular and the modified the plural, or vice versa.
 */
class OriginalModifiedPair {
	/**
	 * Sets the original and modified form of a word.
	 *
	 * @param {string} original The original form of the word as it occurs in the keyphrase.
	 * @param {string} modified The modified form, i.e. either a singularized or pluralized version of the original.
	 *
	 * @returns {void}
	 * @constructor
	 */
	constructor( original, modified ) {
		this.original = original;
		this.modified = modified;
		this.originalCount = 0;
		this.modifiedCount = 0;
	}

	/**
	 * Increases the count of original occurrences.
	 *
	 * @param {string} count The number by which to increase the count.
	 *
	 * @returns {void}
	 */
	increaseOriginalCount( count ) {
		this.originalCount += count;
	}

	/**
	 * Increases the count of modified occurrences.
	 *
	 * @param {string} count The number by which to increase the count.
	 *
	 * @returns {void}
	 */
	increaseModifiedCount( count ) {
		this.modifiedCount += count;
	}
}

/**
 * Creates the singular form of the plural nouns in the keyphrase or the other way around.
 * E.g. keyphrase: plant pots -> [[ plant, plants ], [ pots, pot ]]
 *
 * @param {string} keyphrase        The paper's keyphrase
 * @param {Object} morphologyData   The morphology data file for English
 *
 * @returns {[]}    An array containing arrays of original and modified word forms.
 * If the original form is singular, then the other form is plural and the other way around.
 */
const createSingularAndPlural = function( keyphrase, morphologyData ) {
	const nounsInKeyphrase = determineWordIsNoun( keyphrase, morphologyData );
	const originalModifiedPairs = [];

	if ( nounsInKeyphrase ) {
		for ( const noun of nounsInKeyphrase ) {
			// Stem a plural noun into a singular form
			const singularNoun = searchAndReplaceWithRegex( noun, morphologyData.nouns.regexNoun.singularize );
			// Create the plural form of the noun
			const pluralNoun = searchAndReplaceWithRegex( noun, morphologyData.nouns.regexNoun.pluralize );

			if ( singularNoun ) {
				originalModifiedPairs.push( new OriginalModifiedPair( noun, singularNoun ) );
			} else if ( pluralNoun ) {
				originalModifiedPairs.push( new OriginalModifiedPair( noun, pluralNoun ) );
			} else {
				originalModifiedPairs.push( new OriginalModifiedPair( noun, noun.concat( "s" ) ) );
			}
		}
	}

	return originalModifiedPairs;
};

/**
 * Calculates the occurrences of each form of the nouns in the text.
 *
 * @param {String} paper            The text to match
 * @param {Researcher} researcher   The researcher.
 *
 * @returns {*[]}   The number of occurrences of each form of the nouns in the text
 */
export default function( paper, researcher ) {
	const language = getLanguage( paper.getLocale() );
	const morphologyData = get( researcher.getData( "morphology" ), language, false );
	const keyphrase = paper.getKeyword();
	const text = paper.getText();

	const originalModifiedPairs = createSingularAndPlural( keyphrase, morphologyData );

	for ( const originalModifiedPair of originalModifiedPairs ) {
		const originalMatch = matchTextWithWord( text, originalModifiedPair.original, language );
		const modifiedMatch = matchTextWithWord( text, originalModifiedPair.modified, language );

		originalModifiedPair.increaseOriginalCount( originalMatch.count );
		originalModifiedPair.increaseModifiedCount( modifiedMatch.count );
	}

	return originalModifiedPairs;
}
