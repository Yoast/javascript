import { buildOneFormFromRegex } from "../morphoHelpers/buildFormRule";
import createRulesFromMorphologyData from "../morphoHelpers/createRulesFromMorphologyData";
import { calculateTotalNumberOfSyllables, removeEnding, checkBeginningsList } from "./helpers";

/**
 * MIT License
 *
 * Adapted from: Copyright (c) 2013 Adinda Praditya
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software
 * and associated documentation files (the \"Software\"), to deal in the Software without restriction,
 * including without limitation the rights to use, copy, modify, merge, publish,  distribute, sublicense,
 * and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so,
 * subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 * THE SOFTWARE IS PROVIDED \"AS IS\", WITHOUT WARRANTY OF ANY KIND,  EXPRESS OR IMPLIED,
 * INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
 * IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
 * TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE."
 */

/**
 * Tries stemming prefixes ke- and ter-. Ke- is always stemmed, and ter- only if it is a prefix and not part of the stem.
 * Also if the stem of the word begins with r-, only te- is stemmed, not ter-.
 *
 * @param {Object}	morphologyData	The Indonesian morphology data file.
 * @param {string}	word			The word to check.
 *
 * @returns {string|null}	The stem or null if the word did not start with ter/keter.
 */
const tryStemmingKeAndTer = function( morphologyData, word ) {
	const terException = morphologyData.stemming.doNotStemWords.doNotStemPrefix.doNotStemTer;

	// If prefix -ter is preceded by prefix -ke, remove it first.
	if ( word.startsWith( "keter" ) ) {
		word = word.substring( 2, word.length );
	}
	if ( word.startsWith( "ter" ) ) {
		// If word is on an exception list of words where -ter should not be stemmed, do not stem -ter and return the word.
		if ( terException.some( wordWithTer => word.startsWith( wordWithTer ) ) )  {
			return word;
		}
		// If word (without prefixes) is on the list of words beginning with -r, remove only -te instead of -ter.
		if ( checkBeginningsList( word, 3, morphologyData.stemming.beginningModification.rBeginning ) ) {
			return word.replace( /^ter/i, "r" );
		}
		// Otherwise, remove -ter.
		return word.substring( 3, word.length );
	}
};
/**
 * Checks whether a word has a first order prefix and whether it is on an exception list of words which require a stem mofification
 * after removing the prefix. Returns the stem if the prefix was found and the word was matched on an exception list.
 *
 *
 * @param {string}	word			The word to check.
 * @param {Object}	morphologyData	The Indonesian morphology data file.
 *
 * @returns {string|null}	The stem or null if a prefix was not found, or was found but the word was not on the exception list.
 */
const checkFirstOrderPrefixExceptions = function( word, morphologyData ) {
	const beginningModification = morphologyData.stemming.beginningModification;

	// If a word starts with "men" or "pen" and is present in the nBeginning exception list, the prefix should be replaced with "n".
	if ( /^[mp]en/i.test( word ) ) {
		if ( checkBeginningsList( word, 3, beginningModification.nBeginning ) ) {
			return word.replace( /^[mp]en/i, "n" );
		}
	}
	if ( /^[mp]eng/i.test( word ) && checkBeginningsList( word, 4, beginningModification.kBeginning ) ) {
		return word.replace( /^[mp]eng/i, "k" );
	}

	if ( /^[mp]em/i.test( word ) ) {
		if ( checkBeginningsList( word, 3, beginningModification.pBeginning ) ) {
			return word.replace( /^(mem|pem)/i, "p" );
		} else if ( checkBeginningsList( word, 3, beginningModification.mBeginning ) ) {
			return word.replace( /^(mem|pem)/i, "m" );
		}
	}
	// Stem prefix ke- if found. Stem te(r)- unless the word was found on the exception list of words with stem beginning in -ter.
	const wordAfterKeTerCheck = tryStemmingKeAndTer( morphologyData, word );
	if ( wordAfterKeTerCheck ) {
		return wordAfterKeTerCheck;
	}
};

/**
 * Stems the first-order prefix of a word based on regexRules. If the word is found in an exception list, implements a stem modification.
 *
 * @param {string} word           The word to stem.
 * @param {Object} morphologyData The object that contains regex-based rules and exception lists for Indonesian stemming.
 *
 * @returns {string} The stemmed word.
 */
const removeFirstOrderPrefix = function( word, morphologyData ) {
	// Checks whether the word has a first order prefix and requires a stem modification.
	const firstOrderPrefixException = checkFirstOrderPrefixExceptions( word, morphologyData );

	if ( firstOrderPrefixException ) {
		return firstOrderPrefixException;
	}
	const regex = createRulesFromMorphologyData( morphologyData.stemming.regexRules.removeFirstOrderPrefixes );
	const withRemovedFirstOrderPrefix = buildOneFormFromRegex( word, regex );

	return withRemovedFirstOrderPrefix || word;
};

/**
 * Stems the second-order prefix of a word based on regexRules. If the word is found in an exception list, implements a stem modification.
 *
 * @param {string} word           The word to stem.
 * @param {Object} morphologyData The object that contains regex-based rules and exception lists for Indonesian stemming.
 *
 * @returns {string} The stemmed word.
 */
const removeSecondOrderPrefix = function( word, morphologyData ) {
	// If a word starts with "ber" or "per" and is present in the rBeginning exception list, the prefix should be replaced with "r".
	if ( ( word.startsWith( "ber" ) || word.startsWith( "per" ) ) &&
		checkBeginningsList( word, 3, morphologyData.stemming.beginningModification.rBeginning ) ) {
		return word.replace( /^(ber|per)/i, "r" );
	}
	// If a word starts with a first order prefix preceded by peng- and is in the kBeginning exception list, then peng- should be replaced with k.
	if ( /^peng/i.test( word ) && checkBeginningsList( word, 4, morphologyData.stemming.beginningModification.kBeginning ) ) {
		return word.replace( /^peng/i, "k" );
	}
	const regex = createRulesFromMorphologyData( morphologyData.stemming.regexRules.removeSecondOrderPrefixes );
	const withRemovedSecondOrderPrefix = buildOneFormFromRegex( word, regex );

	return withRemovedSecondOrderPrefix || word;
};

/**
 * Stems derivational affixes of Indonesian words.
 *
 * @param {string} word           The word to stem.
 * @param {Object} morphologyData The object that contains regex-based rules and exception lists for Indonesian stemming.
 *
 * @returns {string} The stemmed word.
 */
const stemDerivational = function( word, morphologyData ) {
	let wordLength = word.length;
	const removeSuffixRules = morphologyData.stemming.regexRules.removeSuffixes;
	const removeSuffixExceptions = morphologyData.stemming.doNotStemWords.doNotStemSuffix;

	/*
	 * If the word has more than 2 syllables and starts with one of first order prefixes (i.e. meng-, meny-, men-, mem-, me-,
	 * peng-, peny-, pen-, pem-, di-, ter-, ke- ), the prefix will be stemmed here. e.g. penyebaran -> sebaran, diperlebarkan -> perlebarkan
	 */
	word = removeFirstOrderPrefix( word, morphologyData );

	if ( wordLength === word.length ) {
		/**
		 * If the word does not start with one of the first order prefixes but starts with one of the second order prefixes,
		 * the prefix will be stemmed here, e.g., peranakan -> anakan
		 */
		word = removeSecondOrderPrefix( word, morphologyData );

		// If the word has more than 2 syllables and ends in either -kan, -an, or -i suffixes, the suffix will be deleted here, e.g., anakan -> anak
		if ( calculateTotalNumberOfSyllables( word ) > 2 ) {
			word = removeEnding( word, removeSuffixRules, removeSuffixExceptions, morphologyData );
		}
	} else {
		// If the word previously had a first order prefix, assign wordLength to the length of the word after prefix deletion.
		wordLength = word.length;
		/**
		 * If the word after first order prefix deletion is bigger than 2 and ends in either -kan, -an, or -i suffixes,
		 * the suffix will be stemmed here. e.g. penyebaran - sebar.
 		 */
		if ( calculateTotalNumberOfSyllables( word ) > 2 ) {
			word = removeEnding( word, removeSuffixRules, removeSuffixExceptions, morphologyData );
		}
		/**
		 * If the word previously had a suffix, we check further if the word after first order prefix and suffix deletion has more than 2 syllables.
		 * If it does have more than 2 syllables and starts with one of the second order prefixes (i.e. ber-, be-, per-, pe-), the prefix will
		 * be stemmed here.
		 */
		if ( wordLength !== word.length ) {
			if ( calculateTotalNumberOfSyllables( word ) > 2 ) {
				word = removeSecondOrderPrefix( word, morphologyData );
			}
		}
	}
	return word;
};

/**
 * Stems Indonesian words
 *
 * @param {string} word           The word to stem.
 * @param {Object} morphologyData The object that contains regex-based rules and exception lists for Indonesian stemming.
 *
 * @returns {string} The stem of Indonesian word.
 */
export default function stem( word, morphologyData ) {
	if ( calculateTotalNumberOfSyllables( word ) <= 2 ) {
		return word;
	}

	/**
	 * If the word has more than 2 syllables and ends in of the particle endings (i.e. -kah, -lah, -pun), stem the particle here.
	 * e.g. bajumulah -> bajumu, bawalah -> bawa
	 */
	word = removeEnding( word, morphologyData.stemming.regexRules.removeParticle,
		morphologyData.stemming.doNotStemWords.doNotStemParticle, morphologyData );

	// If the word (still) has more than 2 syllables and ends in of the possessive pronoun endings (i.e. -ku, -mu, -nya), stem the ending here.
	if ( calculateTotalNumberOfSyllables( word ) > 2 ) {
		// E.g. bajumu -> baju
		word = removeEnding( word, morphologyData.stemming.regexRules.removePronoun,
			morphologyData.stemming.doNotStemWords.doNotStemPronounSuffix, morphologyData );
	}
	// If the word (still) has more than 2 syllables and has derivational affixes, the affix(es) will be stemmed here.
	if ( calculateTotalNumberOfSyllables( word ) > 2 ) {
		word = stemDerivational( word, morphologyData );
	}

	return word;
}
