/* global describe it expect */
import Researcher from "../../src/researcher";
import countForms from "../../src/researches/countSingularAndPluralNouns.js";

import Paper from "../../src/values/Paper.js";
import getMorphologyData from "../specHelpers/getMorphologyData";
const morphologyDataEN = getMorphologyData( "en" );

describe( "Test for counting the singular and plural nouns in a text", function() {
	it( "counts a string of text with a keyword in it.", function() {
		const text = "An ethnic model of plant pot is pretty. The pot for plants can be bought in a plant store.";
		const attributes = {
			keyword: "plant pots",
			locale: "en",
		};
		const testPaper = new Paper( text, attributes );
		const researcher = new Researcher( testPaper );
		researcher.addResearchData( "morphology", morphologyDataEN );

		expect( countForms( testPaper, researcher ) ).toEqual(
			[
				{ modified: "plants", modifiedCount: 1, original: "plant", originalCount: 2 },
				{ modified: "pot", modifiedCount: 2, original: "pots", originalCount: 0 },
			],
		);
	} );
	it( "counts a string of text with a keyword containing non noun.", function() {
		const text = "A good model of plant pot is pretty. The pot for plants can be bought in a plant store.";
		const attributes = {
			keyword: "good pots",
			locale: "en",
		};
		const testPaper = new Paper( text, attributes );
		const researcher = new Researcher( testPaper );
		researcher.addResearchData( "morphology", morphologyDataEN );

		expect( countForms( testPaper, researcher ) ).toEqual(
			[
				{ modified: "pot", modifiedCount: 2, original: "pots", originalCount: 0 },
			],
		);
	} );
	it( "counts a string of text without a keyword in it.", function() {
		const text = "An ethnic model of plant pot is pretty." +
			"The pot for plants can be bought in a plant store.";
		const attributes = {
			keyword: "fluffy cats",
			locale: "en",
		};
		const testPaper = new Paper( text, attributes );
		const researcher = new Researcher( testPaper );
		researcher.addResearchData( "morphology", morphologyDataEN );
		expect( countForms( testPaper, researcher ) ).toEqual( [
			{ modified: "fluffies", modifiedCount: 0, original: "fluffy", originalCount: 0 },
			{ modified: "cat", modifiedCount: 0, original: "cats", originalCount: 0 } ] );
	} );
} );
