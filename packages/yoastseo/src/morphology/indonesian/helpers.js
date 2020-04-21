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
function isVowel( character ) {
	return vowelCharacters.includes( character );
}

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
	if ( exceptions.includes( word ) ) {
		return word;
	}

	const removePartRegex = createRulesFromMorphologyData( regexRules );
	const withRemovedPart = buildOneFormFromRegex( word, removePartRegex );
	return withRemovedPart || word;
}

/**
 * Checks if the beginning of the word is present in an exception list.
 *
 * @param {string}   word         The word to stem.
 * @param {int}      prefixLength The length of the prefix to be trimmed before checking in the list.
 * @param {string[]} beginnings   The list of word beginnings that should be checked.
 *
 * @returns {boolean} Whether the word is found in the list with beginnings.
 */
export function checkBeginningsList( word, prefixLength, beginnings ) {
	const wordWithoutPrefix = word.slice( prefixLength );
	return beginnings.some( beginning => wordWithoutPrefix.startsWith( beginning ) );
}
