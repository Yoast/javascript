import { buildOneFormFromRegex } from "../morphoHelpers/buildFormRule";
import createRulesFromMorphologyData from "../morphoHelpers/createRulesFromMorphologyData";

const vowelCharacters = [ "a", "e", "i", "o", "u" ];

/**
 * Determines if an input character is a vowel.
 *
 * @param {string} character The character to check.
 *
 * @returns {boolean} Whether the input character is an Indonesian vowel.
 */
const isVowel = function( character ) {
	return vowelCharacters.includes( character );
};


/**
 * Calculates the total number of syllables in the input word.
 *
 * @param {string} word The word to calculate the number of syllables in.
 *
 * @returns {int} The total number of syllables in the word.
 */
export function calculateTotalNumberOfSyllables( word ) {
	let result = 0;

	for ( let i = 0; i < word.length; i++ ) {
		if ( isVowel( word[ i ] ) ) {
			result++;
		}
	}

	return result;
}

/**
 * Stems the ending of a word based on some regexRules after checking if the word is in the exception list.
 *
 * @param {string} word         The word to stem.
 * @param {Array} regexRules    The list of regex-based rules to apply to the word in order to stem it.
 * @param {string[]} exceptions The list of words that should not get the ending removed.
 *
 * @returns {string} The stemmed word.
 */
export function removePart( word, regexRules, exceptions ) {
	if ( exceptions.some( exception => word.endsWith( exception ) ) ) {
		return word;
	}

	const removePartRegex = createRulesFromMorphologyData( regexRules );
	const withRemovedPart = buildOneFormFromRegex( word, removePartRegex );

	return withRemovedPart || word;
}
