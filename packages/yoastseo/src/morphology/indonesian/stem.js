import {
	totalSyllables,
	removeFirstOrderPrefix,
	removeSecondOrderPrefix,
	removeSuffix,
	removeParticle,
	removePossessivePronoun,
} from


/**
 * Stems derivational affixes of Indonesian words.
 *
 * @param {string} word The word to stem.
 * @returns {string} The stemmed word.
 */
const stemDerivational = function( word ) {
	let wordLength = word.length;
	/*
	 * If the word has more than 2 syllables and starts with one of first order prefixes (i.e. meng-, meny-, men-, mem-, me-,
	 * peng-, peny-, pen-, pem-, di-, ter-, ke- ), the prefix will be stemmed here.
	 */
	if ( totalSyllables( word ) > 2 ) {
		// e.g. kesenangan -> senang
		word = removeFirstOrderPrefix( word );
	}
	if ( wordLength !== word.length ) {
		// If the word previously had a first order prefix, assign wordLength to the length of the word after prefix deletion.
		wordLength = word.length;
		// If the word after first order prefix deletion is bigger than 2 and ends in either -kan, -an, or -i suffixes, the suffix will be stemmed here. e.g. penyebaran - sebar
		if ( totalSyllables( word ) > 2 ) {
			word = removeSuffix( word );
		}
		/*
		 * If the word previously had a suffix, we check further if the word after first order prefix and suffix deletion has more than 2 syllables.
		 * If it does have more than 2 syllables and starts with one of the second order prefixes (i.e. ber-, be-, per-, pe-), the prefix will be stemmed here.
		 */
		if ( wordLength !== word.length ) {
			if ( totalSyllables( word ) > 2 ) {
				word = removeSecondOrderPrefix( word );
			}
		}
	} else {
		/*
		 * If the word has more than 2 syllables, does not start with one of the first order prefixes
		 * but starts with one of the second order prefixes, the prefix will be stemmed here. e.g. peranakan -> anakan
		 */
		if ( totalSyllables( word ) > 2 ) {
			word = removeSecondOrderPrefix( word );
		}
		// If the word has more than 2 syllables and ends in either -kan, -an, or -i suffixes, the suffix will be deleted here. e.g. e.g. anakan -> anak
		if ( totalSyllables( word ) > 2 ) {
			word = removeSuffix( word );
		}
	}
	return word;
};

/**
 * Stems Indonesian words
 *
 * @param {string} word The word to stem
 *
 * @returns {string}    The stem of Indonesian word.
 */
const stem = function ( word ) {
	// If the word has more than 2 syllables and ends in of the particle endings (i.e. -kah, -lah, -pun), stem the particle here.
	if ( totalSyllables( word ) > 2 ) {
		// e.g. bajumulah -> bajumu, bawalah -> bawa
		word = removeParticle( word );
	}
	// If the word has more than 2 syllables and ends in of the possessive pronoun endings (i.e. -ku, -mu, -nya), stem the ending here.
	if ( totalSyllables( word ) > 2 ) {
		// e.g. bajumu -> baju
		word = removePossessivePronoun( word );
	}
	// If the word has derivational affixes, the affix(es) will be stemmed here.
	word = stemDerivational( word );
	return word;
};
