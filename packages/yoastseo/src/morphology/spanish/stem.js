/* eslint-disable max-statements, require-jsdoc, complexity */
// The function will be further adjected anyways, so it makes no sense to randomly split it in smaller functions now.
/**
 * Copyright (C) 2018 Domingo Martín Mancera
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 */


const isVowel = function( c ) {
	const regex = /[aeiouáéíóú]/gi;

	return regex.test( c );
};

const nextVowelPosition = function( word, start = 0 ) {
	const length = word.length;

	for ( let position = start; position < length; position++ ) {
		if ( isVowel( word[ position ] ) ) {
			return position;
		}
	}

	return length;
};

const nextConsonantPosition = function( word, start = 0 ) {
	const length = word.length;

	for ( let position = start; position < length; position++ ) {
		if ( ! isVowel( word[ position ] ) ) {
			return position;
		}
	}

	return length;
};

const endsIn = function( word, suffix ) {
	if ( word.length < suffix.length ) {
		return false;
	}

	return ( word.slice( -suffix.length ) === suffix );
};

const endsInArr = function( word, suffixes ) {
	const matches = [];
	for ( const i in suffixes ) {
		if ( endsIn( word, suffixes[ i ] ) ) {
			matches.push( suffixes[ i ] );
		}
	}

	const longest = matches.sort( function( a, b ) {
		return b.length - a.length;
	} )[ 0 ];

	if ( longest ) {
		return longest;
	}
	return "";
};

const removeAccent = function( word ) {
	const accentedVowels = [ "á", "é", "í", "ó", "ú" ];
	const vowels = [ "a", "e", "i", "o", "u" ];

	for ( let i = 0; i < accentedVowels.length; i++ ) {
		word = word.replace( accentedVowels[ i ], vowels[ i ] );
	}

	return word;
};


/**
 * Stems Spanish words.
 *
 * @param {Object} morphologyData  The Spanish morphology data.
 * @param {string} word            The word to stem.
 *
 * @returns {string} The stemmed word.
 */
export default function stem( morphologyData, word ) {
	const length = word.length;

	word.toLowerCase();

	if ( length < 2 ) {
		return this.removeAccent( word );
	}

	let r1 = length;
	let r2 = length;
	let rv = length;

	/**
	 * R1 is the region after the first non-vowel following a vowel, or is the null region at the end of the word if
	 * there is no such non-vowel.
	 */
	for ( let i = 0; i < ( length - 1 ) && r1 === length; i++ ) {
		if ( isVowel( word[ i ] ) && ! isVowel( word[ i + 1 ] ) ) {
			r1 = i + 2;
		}
	}

	/**
	 * R2 is the region after the first non-vowel following a vowel in R1, or is the null region at the end of the
	 * word if there is no such non-vowel.
	 */
	for ( let i = r1; i < ( length - 1 ) && r2 === length; i++ ) {
		if ( isVowel( word[ i ] ) && ! isVowel( word[ i + 1 ] ) ) {
			r2 = i + 2;
		}
	}

	if ( length > 3 ) {
		if ( ! isVowel( word[ 1 ] ) ) {
			rv = nextVowelPosition( word, 2 ) + 1;
		} else if ( isVowel( word[ 0 ] ) && isVowel( word[ 1 ] ) ) {
			rv = nextConsonantPosition( word, 2 ) + 1;
		} else {
			rv = 3;
		}
	}

	let r1Text = word.slice( r1 );
	let r2Text = word.slice( r2 );
	let rvText = word.slice( rv );
	const originalWord = word;

	// Step 0: Attached pronoun
	const pronounSuffix = [ "me", "se", "sela", "selo", "selas", "selos", "la", "le", "lo", "las", "les", "los", "nos" ];
	const pronounSuffixPre1 = [ "iéndo", "ándo", "ár", "ér", "ír" ];
	const pronounSuffixPre2 = [ "iendo", "ando", "ar", "er", "ir" ];

	const suffix = endsInArr( word, pronounSuffix );

	if ( suffix !== "" ) {
		let preSuffix = endsInArr( rvText.slice( 0, -suffix.length ), pronounSuffixPre1 );

		if ( preSuffix === "" ) {
			preSuffix = endsInArr( rvText.slice( 0, -suffix.length ), pronounSuffixPre2 );

			if ( preSuffix !== "" || ( endsIn( word.slice( 0, -suffix.length ), "uyendo" ) ) ) {
				word = word.slice( 0, -suffix.length );
			}
		} else {
			word = removeAccent( word.slice( 0, -suffix.length ) );
		}
	}

	if ( word !== originalWord ) {
		r1Text = word.slice( r1 );
		r2Text = word.slice( r2 );
		rvText = word.slice( rv );
	}

	const wordAfter0 = word;

	const suf1 = endsInArr( r2Text, [ "anza", "anzas", "ico", "ica", "icos", "icas", "ismo", "ismos",
		"able", "ables", "ible", "ibles", "ista", "istas", "oso", "osa",
		"osos", "osas", "amiento", "amientos", "imiento", "imientos" ] );
	const suf2 = endsInArr( r2Text, [ "icadora", "icador", "icación", "icadoras", "icadores", "icaciones",
		"icante", "icantes", "icancia", "icancias", "adora", "ador", "ación",
		"adoras", "adores", "aciones", "ante", "antes", "ancia", "ancias" ] );
	const suf3 = endsInArr( r2Text, [ "logía", "logías" ] );
	const suf4 = endsInArr( r2Text, [ "ución", "uciones" ] );
	const suf5 = endsInArr( r2Text, [ "encia", "encias" ] );
	const suf6 = endsInArr( r2Text, [ "ativamente", "ivamente", "osamente", "icamente", "adamente" ] );
	const suf7 = endsInArr( r1Text, [ "amente" ] );
	const suf8 = endsInArr( r2Text, [ "antemente", "ablemente", "iblemente", "mente" ] );
	const suf9 = endsInArr( r2Text, [ "abilidad", "abilidades", "icidad", "icidades", "ividad", "ividades", "idad", "idades" ] );
	const suf10 = endsInArr( r2Text, [ "ativa", "ativo", "ativas", "ativos", "iva", "ivo", "ivas", "ivos" ] );


	if ( suf1 !== "" ) {
		word = word.slice( 0, -suf1.length );
	} else if ( suf2 !== "" ) {
		word = word.slice( 0, -suf2.length );
	} else if ( suf3 !== "" ) {
		word = word.slice( 0, -suf3.length ) + "log";
	} else if ( suf4 !== "" ) {
		word = word.slice( 0, -suf4.length ) + "u";
	} else if ( suf5 !== "" ) {
		word = word.slice( 0, -suf5.length ) + "ente";
	} else if ( suf6 !== "" ) {
		word = word.slice( 0, -suf6.length );
	} else if ( suf7 !== "" ) {
		word = word.slice( 0, -suf7.length );
	} else if ( suf8 !== "" ) {
		word = word.slice( 0, -suf8.length );
	} else if ( suf9 !== "" ) {
		word = word.slice( 0, -suf9.length );
	} else if ( suf10 !== "" ) {
		word = word.slice( 0, -suf10.length );
	}

	if ( word !== wordAfter0 ) {
		rvText = word.slice( rv );
	}

	const wordAfter1 = word;

	if ( wordAfter0 === wordAfter1 ) {
		// Do step 2a if no ending was removed by step 1.
		const suf = endsInArr( rvText, [ "ya", "ye", "yan", "yen", "yeron", "yendo", "yo", "yó", "yas", "yes", "yais", "yamos" ] );

		if ( suf !== "" && ( word.slice( -suf.length - 1, -suf.length ) === "u" ) ) {
			word = word.slice( 0, -suf.length );
		}

		if ( word !== wordAfter1 ) {
			rvText = word.slice( rv );
		}

		// Do Step 2b if step 2a was done, but failed to remove a suffix.
		if ( word === wordAfter1 ) {
			const suf11 = endsInArr( rvText, [ "arían", "arías", "arán", "arás", "aríais", "aría", "aréis",
				"aríamos", "aremos", "ará", "aré", "erían", "erías", "erán",
				"erás", "eríais", "ería", "eréis", "eríamos", "eremos", "erá",
				"eré", "irían", "irías", "irán", "irás", "iríais", "iría", "iréis",
				"iríamos", "iremos", "irá", "iré", "aba", "ada", "ida", "ía", "ara",
				"iera", "ad", "ed", "id", "ase", "iese", "aste", "iste", "an",
				"aban", "ían", "aran", "ieran", "asen", "iesen", "aron", "ieron",
				"ado", "ido", "ando", "iendo", "ió", "ar", "er", "ir", "as", "abas",
				"adas", "idas", "ías", "aras", "ieras", "ases", "ieses", "ís", "áis",
				"abais", "íais", "arais", "ierais", "  aseis", "ieseis", "asteis",
				"isteis", "ados", "idos", "amos", "ábamos", "íamos", "imos", "áramos",
				"iéramos", "iésemos", "ásemos" ] );
			const suf12 = endsInArr( rvText, [ "en", "es", "éis", "emos" ] );
			if ( suf11 !== "" ) {
				word = word.slice( 0, -suf11.length );
			} else if ( suf12 !== "" ) {
				word = word.slice( 0, -suf12.length );
				if ( endsIn( word, "gu" ) ) {
					word = word.slice( 0, -1 );
				}
			}
		}
	}

	rvText = word.slice( rv );

	const suf13 = endsInArr( rvText, [ "os", "a", "o", "á", "í", "ó" ] );
	if ( suf13 !== "" ) {
		word = word.slice( 0, -suf13.length );
	} else if ( ( endsInArr( rvText, [ "e", "é" ] ) ) !== "" ) {
		word = word.slice( 0, -1 );
		rvText = word.slice( rv );
		if ( endsIn( rvText, "u" ) && endsIn( word, "gu" ) ) {
			word = word.slice( 0, -1 );
		}
	}

	return removeAccent( word );
}
