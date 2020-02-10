import stem from "../../../src/morphology/spanish/stem";
import getMorphologyData from "../../specHelpers/getMorphologyData";

const morphologyDataES = getMorphologyData( "es" ).es;

const wordsToStem = [
	// Suffix step 1 (non-plurals in -s).
	[ "", "" ],
	// Suffix step 2 (clitic pronouns).
	[ "", "" ],
	// Suffix step 3 (diminutives).
	[ "", "" ],
	// Suffix step 4 verb suffixes preceded by y.
	[ "", "" ],
	// Suffix step 2 category a (-est)
	[ "", "" ],
	// Suffix step 2 category b (-st)
	[ "", "" ],
	// Suffix as defined in step 1 (-ern) that is not within the R1.
	[ "", "" ],
	// Suffix as defined in step 2 (-est) that is not within the R1.
	[ "", "" ],
	// A word without an R1.
	[ "", "" ],
	// An irregular verb.
	[ "", "" ],
	// A word with a vowel that should be treated like a consonant
	[ "", "" ],
];

describe( "Test for stemming Spanish words", () => {
	it( "stems Spanish nouns", () => {
		wordsToStem.forEach( wordToStem => expect( stem( morphologyDataES, wordToStem[ 0 ] ) ).toBe( wordToStem[ 1 ] ) );
	} );
} );
