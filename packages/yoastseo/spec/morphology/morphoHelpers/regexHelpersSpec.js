import { doesWordMatchRegex, searchAndReplaceWithOneRegex, searchAndReplaceWithRegex } from "../../../src/morphology/morphoHelpers/regexHelpers";

describe( "A test to return a regex match", () => {
	it( "Appends multiple suffixes to a stem", () => {
		expect( doesWordMatchRegex( "balletje", "etje$" ) ).toEqual( true );
	} );
} );

describe( "A test to apply multiple suffixes to a stem", () => {
	it( "Appends multiple suffixes to a stem", () => {
		expect( searchAndReplaceWithRegex( "balletje", [ [ "(et)(je)$", "$1" ], [ "(nn)(en)$", "$1" ] ] ) ).toEqual( "ballet" );
	} );
} );

describe( "A test to apply one regex suffix to a stem", () => {
	it( "Appends a suffixes to a stem", () => {
		expect( searchAndReplaceWithOneRegex( "balletje", [ "(et)(je)$", "$1" ] ) ).toEqual( "ballet" );
	} );

	it( "Returns null if there is no match", () => {
		expect( searchAndReplaceWithOneRegex( "balletje", [ "(nn)(en)$", "$1" ] ) ).toBeUndefined();
	} );
} );
