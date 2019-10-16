import {
	addAllAdjectiveSuffixes,
	addSuperlativeSuffixes,
	addPartitiveSuffix,
	addInflectedSuffix,
} from "./addAdjectiveSuffixes";
import {
	applySuffixesToStem,
} from "../../../src/morphology/morphoHelpers/suffixHelpers";
/**
 * Returns form of the adjectives which only take partitive suffix -s.
 *
 * @param {Object} morphologyDataAdjectives		The Dutch morphology data for adjectives.
 * @param {string} stemmedWord					The stemmed word for which to get suffixes.
 *
 * @returns {string[]} The created adjective form.
 */
export function stemSuffixS( morphologyDataAdjectives, stemmedWord ) {
	const exceptionStems = morphologyDataAdjectives.exceptions.stemSuffixS;
	if ( exceptionStems.includes( stemmedWord ) ) {
		return [ addPartitiveSuffix( morphologyDataAdjectives, stemmedWord ) ];
	}
	return [];
}

/**
 * Returns forms of the adjectives ending in -en which get all adjective suffixes.
 *
 * @param {Object} morphologyDataAdjectives			The Dutch morphology data for adjectives.
 * @param {Object} morphologyDataStemModifications	The Dutch stem modifications data.
 * @param {string} stemmedWord						The stemmed word for which to get suffixes.
 *
 * @returns {string[]}	The created adjective forms.
 */
export function enGetAllSuffixes( morphologyDataAdjectives, morphologyDataStemModifications, stemmedWord ) {
	const exceptionStems = morphologyDataAdjectives.exceptions.enGetAllSuffixes;
	if ( exceptionStems.includes( stemmedWord ) ) {
		return addAllAdjectiveSuffixes( morphologyDataAdjectives, morphologyDataStemModifications, stemmedWord );
	}
	return [];
}

/**
 * Returns forms of the adjectives ending in -en which get 5 adjective suffixes ("s", "er", "ers", "st", "ste").
 *
 * @param {Object} morphologyDataAdjectives			The Dutch morphology data for adjectives.
 * @param {Object} morphologyDataStemModifications	The Dutch stem modifications data.
 * @param {string} stemmedWord						The stemmed word for which to get suffixes.
 *
 * @returns {string[]}	The created Adjective forms.
 */
export function enGet5Suffixes( morphologyDataAdjectives, morphologyDataStemModifications, stemmedWord ) {
	const exceptionStems = morphologyDataAdjectives.exceptions.enGet5Suffixes;
	const comparativeSuffixes = morphologyDataAdjectives.comparativeSuffixesEr.slice( 0, 2 );
	if ( exceptionStems.includes( stemmedWord ) ) {
		return [
			addPartitiveSuffix( morphologyDataAdjectives, stemmedWord ),
			...applySuffixesToStem( stemmedWord, comparativeSuffixes ),
			...addSuperlativeSuffixes( morphologyDataAdjectives, stemmedWord ),
		];
	}
	return [];
}

/**
 * Returns forms of the adjectives ending in -en which only get partitive and inflected suffix.
 *
 * @param {Object} morphologyDataAdjectives			The Dutch morphology data for adjectives.
 * @param {Object} morphologyDataStemModifications	The Dutch stem modifications data.
 * @param {string} stemmedWord						The stemmed word for which to get suffixes.
 *
 * @returns {string[]}	The created Adjective forms.
 */
export function enGet2Suffixes( morphologyDataAdjectives, morphologyDataStemModifications, stemmedWord ) {
	const exceptionStems = morphologyDataAdjectives.exceptions.enGet2Suffixes;
	if ( exceptionStems.includes( stemmedWord ) ) {
		return [
			addPartitiveSuffix( morphologyDataAdjectives, stemmedWord ),
			addInflectedSuffix( morphologyDataAdjectives, morphologyDataStemModifications, stemmedWord ),
		];
	}
	return [];
}


/**
 * Checks whether a given stem falls into any of the adjective exception categories and creates the
 * correct forms if that is the case.
 *
 * @param {Object} morphologyDataAdjectives			The Dutch morphology data for adjectives.
 * @param {Object} morphologyDataStemModifications	The Dutch stem modifications data.
 * @param {string} stemmedWord						The stemmed word for which to get suffixes.
 *
 * @returns {string[]}	The created adjective forms.
 */
export function generateAdjectiveExceptionForms( morphologyDataAdjectives, morphologyDataStemModifications, stemmedWord ) {
	const exceptionChecks = [
		stemSuffixS,
		enGetAllSuffixes,
		enGet5Suffixes,
		enGet2Suffixes,
	];

	for ( let i = 0; i < exceptionChecks.length; i++ ) {
		const exceptions = exceptionChecks[ i ]( morphologyDataAdjectives, morphologyDataStemModifications, stemmedWord );
		if ( exceptions.length > 0 ) {
			return exceptions;
		}
	}

	return [];
}
