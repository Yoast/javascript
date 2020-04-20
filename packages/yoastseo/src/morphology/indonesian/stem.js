import { buildOneFormFromRegex } from "../morphoHelpers/buildFormRule";
import createRulesFromMorphologyData from "../morphoHelpers/createRulesFromMorphologyData";
import { calculateTotalNumberOfSyllables, removePart, checkBeginningsList } from "./helpers";

/**
 * Stems the first-order prefix of a word based on regexRules. If the word is found in an exception list, implements a stem modification.
 *
 * @param {string} word           The word to stem.
 * @param {Object} morphologyData The object that contains regex-based rules and exception lists for Indonesian stemming.
 *
 * @returns {string} The stemmed word.
 */
const removeFirstOrderPrefix = function( word, morphologyData ) {
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

	if ( /^[mp]em/i.test( word ) && checkBeginningsList( word, 3, beginningModification.pBeginning ) ) {
		return word.replace( /^(mem|pem)/i, "p" );
	}


	// If a word starts with "ter" and is present in the rBeginning exception list, the prefix should be replaced with "r".
	if ( word.startsWith( "ter" ) || checkBeginningsList( word, 3, beginningModification.rBeginning ) ) {
		return word.replace( /^ter/i, "r" );
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
	// If a word starts with "ter" and is present in the rBeginning exception list, the prefix should be replaced with "r".
	if ( ( word.startsWith( "ber" ) || word.startsWith( "per" ) ) &&
		checkBeginningsList( word, 3, morphologyData.stemming.beginningModification.rBeginning ) ) {
		return word.replace( /^(ber|per)/i, "r" );
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
			word = removePart( word, removeSuffixRules, removeSuffixExceptions );
		}
	} else {
		// If the word previously had a first order prefix, assign wordLength to the length of the word after prefix deletion.
		wordLength = word.length;
		/**
		 * If the word after first order prefix deletion is bigger than 2 and ends in either -kan, -an, or -i suffixes,
		 * the suffix will be stemmed here. e.g. penyebaran - sebar.
 		 */
		if ( calculateTotalNumberOfSyllables( word ) > 2 ) {
			word = removePart( word, removeSuffixRules, removeSuffixExceptions );
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
export function stem( word, morphologyData ) {
	if ( calculateTotalNumberOfSyllables( word ) <= 2 ) {
		return word;
	}

	/**
	 * If the word has more than 2 syllables and ends in of the particle endings (i.e. -kah, -lah, -pun), stem the particle here.
	 * e.g. bajumulah -> bajumu, bawalah -> bawa
	 */
	word = removePart( word, morphologyData.stemming.regexRules.removeParticle, morphologyData.stemming.doNotStemWords.doNotStemParticle );

	// If the word (still) has more than 2 syllables and ends in of the possessive pronoun endings (i.e. -ku, -mu, -nya), stem the ending here.
	if ( calculateTotalNumberOfSyllables( word ) > 2 ) {
		// E.g. bajumu -> baju
		word = removePart( word, morphologyData.stemming.regexRules.removePronoun, morphologyData.stemming.doNotStemWords.doNotStemPronounSuffix );
	}
	// If the word (still) has more than 2 syllables and has derivational affixes, the affix(es) will be stemmed here.
	if ( calculateTotalNumberOfSyllables( word ) > 2 ) {
		word = stemDerivational( word, morphologyData );
	}

	return word;
}
