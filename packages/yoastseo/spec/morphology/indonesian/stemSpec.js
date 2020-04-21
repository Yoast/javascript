import { stem } from "../../../src/morphology/indonesian/stem";
import getMorphologyData from "../../specHelpers/getMorphologyData";

const morphologyDataIN = getMorphologyData( "in" ).in;

const wordsToStem = [
	// Words with prefix men- or pen- and are in the exception list.
	[ "menalar", "nalar" ],
	[ "penikmat", "nikmat" ],
	// Words with prefix men- or pen- and suffix -kan/-an/-i and are in the exception list.
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
	// Words with prefix meng- or peng- and are in the exception list.
	[ "mengeduk", "keduk" ],
	[ "pengecam", "kecam" ],
	// Words with prefix meng- or peng- and suffix -kan/-an/-i and are in the exception list.
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
	// Words with prefix mem- or pem- and is in the exception list.
	[ "memajang", "pajang" ],
	[ "pemaksa", "paksa" ],
	// Words with prefix mem- or pem- and suffix -kan/-an/-i and are in the exception list.
	[ "memaksakan", "paksa" ],
	[ "memancari", "pancar" ],
	[ "pemaksaan", "paksa" ],
	// Words with prefix mem- or pem- which are not in the exception list.
	[ "membaca", "baca" ],
	[ "pembaca", "baca" ],
	// Words with prefix mem- or pem- and suffix -kan/-an/-i which are not in the exception list.
	[ "membacakan", "baca" ],
	[ "membasahi", "basah" ],
	[ "pembacaan", "baca" ],
	// Words with first prefix mem- or pem- and second prefix ber-/per- with suffix -kan/-an/-i
	[ "memberdayakan", "daya" ],
	[ "memberdayai", "daya" ],
	[ "pemberdayaan", "daya" ],
	// Words with ter- prefix and are in the exception list.
	[ "terambah", "rambah" ],
	[ "terangkum", "rangkum" ],
	// Words with ter- prefix and are not in the exception list.
	[ "terpaksa", "paksa" ],
	[ "terdiam", "diam" ],
	// Words with ter- prefix and suffixes -kan and are not in the exception list.
	[ "terbuatkan", "buat" ],
	// Words with prefixes me-/di-/ke-
	[ "melintas", "lintas" ],
	[ "dibuat", "dibuat" ],
	[ "ketua", "tua" ],
	// Words with prefixes me-/di-/ke- and suffixes -kan/-an/-i
	[ "melintasi", "lintas" ],
	[ "merusakkan", "rusak" ],
	[ "dirusaki", "rusak" ],
	[ "ketuaan", "tua" ],
	// Word with prefix ke- and ber- and suffix -an which is in exception list
	[ "keberagaman", "ragam" ],
	// Words with prefix ber-/be-/per-/pe-
	[ "bersantap", "santap" ],
	[ "bekerja", "kerja" ],
	[ "perdaya", "daya" ],
	[ "pemain", "main" ],
	// Words with prefix ber-/per- and in exception list
	[ "peramal", "ramal" ],
	[ "beragam", "ragam" ],
	// Words with prefix per- and suffixes -an and in exception list
	[ "peramalan", "ramal" ],
	// Words with prefix ber-/per- and suffixes -kan/-an and not in exception list
	[ "bersamaan", "sama" ],
	[ "beralaskan", "alas" ],
	[ "persamaan", "sama" ],
	// Words with suffixes -kan/-i/-an
	[ "biarkan", "biar" ],
	[ "sirami", "siram" ],
	[ "makanan", "makan" ],
	// Words which do not have derivational affixes with particles -kah, -lah, -pun
	[ "bukalah", "buka" ],
	[ "satupun", "satu" ],
	[ "bukankah", "bukan" ],
	// Words which do not have derivational affixes with possessive pronoun suffixes -ku/-mu/-nya
	[ "cintaku", "cinta" ],
	[ "cintamu", "cinta" ],
	[ "cintanya", "cinta" ],
	// Words which do not have derivational affixes with both particles and possessive pronoun suffixes -ku/-mu/-nya
	[ "cintakulah", "cinta" ],
	[ "cintamukah", "cinta" ],
	[ "cintanyapun", "cinta" ],
	// Words which have derivational affixes with particles -kah, -lah, -pun
	[ "kesenanganpun", "senang" ],
	[ "biarkanlah", "biar" ],
	[ "terdiamkah", "diam" ],
	// Words which have derivational affixes with possessive pronoun suffixes -ku/-mu/-nya
	[ "pendakiannya", "daki" ],
	[ "pengorbananku", "korban" ],
	[ "pengorbananmu", "korban" ],
	// Words which have derivational affixes with both particles and possessive pronoun suffixes -ku/-mu/-nya
	[ "pengorbanankulah", "korban" ],
	[ "pengorbananmukah", "korban" ],
	[ "kebahagiaannyapun", "bahagia" ],
];


describe( "Test for stemming Indonesian words", () => {
	for ( let i = 0; i < wordsToStem.length; i++ ) {
		const wordToCheck = wordsToStem[ i ];
		it( "stems the word " + wordToCheck[ 0 ], () => {
			expect( stem( wordToCheck[ 0 ], morphologyDataIN ) ).toBe( wordToCheck[ 1 ] );
		} );
	}
} );
