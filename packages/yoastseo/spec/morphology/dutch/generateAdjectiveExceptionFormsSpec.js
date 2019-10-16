import { generateAdjectiveExceptionForms } from "../../../src/morphology/dutch/generateAdjectiveExceptionForms";
import getMorphologyData from "../../specHelpers/getMorphologyData";

const morphologyDataNL = getMorphologyData( "nl" ).nl;

describe( "Test for checking adjective exceptions in Dutch", () => {
	it( "creates forms for adjectives which only take partitive suffix -s", () => {
		expect( generateAdjectiveExceptionForms( morphologyDataNL.adjectives, "halal" ) ).toEqual(
			[ "halals" ]
		);
	} );
	it( "creates forms for adjectives ending in -en which take all adjective suffixes", () => {
		expect( generateAdjectiveExceptionForms( morphologyDataNL.adjectives, morphologyDataNL.addSuffixes.stemModifications, "feminien" ) ).toEqual(
			[ "feminiener", "feminieners", "feminienere", "feminieneres", "feminienst", "feminienste", "feminiene", "feminiens" ]
		);
	} );
	it( "creates forms for adjectives ending in -en which take 5 adjective suffixes (s, er, ers, st, ste)", () => {
		expect( generateAdjectiveExceptionForms( morphologyDataNL.adjectives, morphologyDataNL.addSuffixes.stemModifications, "even" ) ).toEqual(
			[ "evens", "evener", "eveners", "evenst", "evenste" ]
		);
	} );
	it( "created forms for adjectives ending in -en which only take partitive and inflected suffixes", () => {
		expect( generateAdjectiveExceptionForms( morphologyDataNL.adjectives, morphologyDataNL.addSuffixes.stemModifications, "neopreen" ) ).toEqual(
			[ "neopreens", "neoprene" ]
		);
	} );
} );
