import { stem } from "../../../src/morphology/indonesian/stem";
import getMorphologyData from "../../specHelpers/getMorphologyData";

const morphologyDataIN = getMorphologyData( "in" ).in;

const wordsToStem = [
	// Words with prefix men- or pen- and is in the exception list.
	[ "menalar", "nalar" ],
	[ "penikmat", "nikmat" ],
	// Words with prefix men- or pen- and suffix -kan/-an/-i and is in the exception list.
	[ "menasihati", "nasihat" ],
	[ "menaikkan", "naik" ],
	[ "penalaran", "nalar" ],
	// Words with prefix men- or pen- which start with vowel and not in the exception list.
	[ "menukar", "tukar" ],
	[ "penukar", "tukar" ],
	// Words with prefix men- or pen- and suffix -kan/-an/-i which start with vowel and not in the exception list.
	[ "menukarkan", "tukar" ],
	[ "menangisi", "tangis" ],
	[ "penukaran", "tukar" ],
	// Words with prefix men- or pen- which start with consonant and not in the exception list.
	[ "mencuci", "cuci" ],
	[ "pencuci", "cuci" ],
	// Words with prefix men- or pen- and suffix -kan/-an/-i which start with consonant and not in the exception list.
	[ "mencucikan", "cuci" ],
	[ "mencakari", "cakar" ],
	[ "pencakupan", "cakup" ],
	// Words with prefix meng- or peng- and is in the exception list.
	[ "mengeduk", "keduk" ],
	[ "pengecam", "kecam" ],
	// Words with prefix meng- or peng- and suffix -kan/-an/-i and is in the exception list.
	[ "mengenalkan", "kenal" ],
	[ "mengenali", "kenal" ],
	[ "pengenalan", "kenal" ],
	// Words with prefix meng- or peng- which are not in the exception list.
	[ "mengambil", "ambil" ],
	[ "pengambil", "ambil" ],
	// Words with prefix meng- or peng- and suffix -kan/-an/-i which are not in the exception list.
	[ "mengambilkan", "ambil" ],
	[ "mengambili", "ambil" ],
	[ "pengambilan", "ambil" ],
	// Words which do not have derivational affixes with particles -kah, -lah, -pun
	[ "bukalah", "buka" ],
	[ "satupun", "satu" ],
	[ "bukankah", "bukan" ],

];


describe( "Test for stemming Indonesian words", () => {
	for ( let i = 0; i < wordsToStem.length; i++ ) {
		const wordToCheck = wordsToStem[ i ];
		it( "stems the word " + wordToCheck[ 0 ], () => {
			expect( stem( wordToCheck[ 0 ], morphologyDataIN ) ).toBe( wordToCheck[ 1 ] );
		} );
	}
} );
