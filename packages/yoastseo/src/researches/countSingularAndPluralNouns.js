import filterFunctionWordsFromArray from "../helpers/filterFunctionWordsFromArray";
import { determineIrregularStem, determineIrregularVerbStem } from "../morphology/english/determineStem";
import getSentences from "../stringProcessing/getSentences";
import getWords from "../stringProcessing/getWords";
import getMorphologyData from "../../spec/specHelpers/getMorphologyData";
import { searchAndReplaceWithRegex } from "../morphology/morphoHelpers/regexHelpers";
import { markWordsInSentences } from "../stringProcessing/markWordsInSentences";
import matchTextWithWord from "../stringProcessing/matchTextWithWord";
import { flattenDeep } from "lodash-es";

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
 * Creates the singular form of the plural nouns in the keyphrase or the other way around.
 * E.g. keyphrase: plant pots -> [[ plant, pots ], [ plants, pot ]]
 *
 * @param {string} keyphrase        The paper's keyphrase
 * @param {Object} morphologyData   The morphology data file for English
 *
 * @returns {[]}    An array containing the original form of the noun and the other form.
 * If the original form is singular, then the other form is plural and the other way around.
 */
const createSingularAndPlural = function( keyphrase, morphologyData ) {
	const nounsInKeyphrase = determineWordIsNoun( keyphrase, morphologyData );
	const originalNouns = [];
	const modifiedNouns = [];
	if ( nounsInKeyphrase ) {
		for ( const noun of nounsInKeyphrase ) {
			// Stem a plural noun into a singular form
			const singularNoun = searchAndReplaceWithRegex( noun, morphologyData.nouns.regexNoun.singularize );
			// Create the plural form of the noun
			const pluralNoun = searchAndReplaceWithRegex( noun, morphologyData.nouns.regexNoun.pluralize );

			if ( singularNoun ) {
				originalNouns.push( noun );
				modifiedNouns.push( singularNoun );
			} else if ( pluralNoun ) {
				originalNouns.push( noun );
				modifiedNouns.push( pluralNoun );
			} else {
				originalNouns.push( noun );
				modifiedNouns.push( noun.concat( "s" ) );
			}
		}
	}
	return [ originalNouns, modifiedNouns ];
};

/**
 * Calculates the occurrences of each form of the nouns in the text.
 * E.g. plant pots -> [ plant, pots ], [ plants, pot ] -> [ 7 , 8 ], [ 5, 5 ]
 *
 * @param {String} paper      The text to match
 *
 * @returns {{count: *, markings: *}} The number of occurrences of each form of the nouns in the text
 * and the markings of each occurrence in the text.
 */
export default function( paper ) {
	const morphologyData = getMorphologyData( "en" ).en;
	const keyphrase = paper.getKeyword();
	const text = paper.getText();
	const locale = "en";

	const arrayOfForms = createSingularAndPlural( keyphrase, morphologyData );
	const count = new Array( arrayOfForms.length ).fill( 0 ).map( () => new Array( arrayOfForms[ 0 ].length ).fill( 0 ) );

	const matchedSentences = [];
	let matches = [];
	const sentences = getSentences( text );
	sentences.forEach( sentence => {
		for ( let i = 0; i < arrayOfForms.length; i++ ) {
			for ( let j = 0; j < arrayOfForms[ i ].length; j++ ) {
				const occurrence = matchTextWithWord( sentence, arrayOfForms[ i ][ j ], locale );
				if ( occurrence.count > 0 ) {
					count[ i ][ j ] += occurrence.count;
					matches.push( occurrence.matches );
					matchedSentences.push( sentence );
				}
			}
		}
	} );
	matches = flattenDeep( matches );
	return {
		count: count,
		markings: markWordsInSentences( matches, matchedSentences, locale ),
	};
}
