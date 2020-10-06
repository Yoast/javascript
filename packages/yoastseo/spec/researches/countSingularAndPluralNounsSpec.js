/* global describe it expect */
import countForms from "../../src/researches/countSingularAndPluralNouns.js";

import Paper from "../../src/values/Paper.js";
import getMorphologyData from "../specHelpers/getMorphologyData";
const morphologyDataEN = getMorphologyData( "en" ).en;

const sentences = [
	"How remarkable!",
	"Remarkable is a funny word.",
	"I have found a key and a remarkable word.",
	"And again a key something.",
	"Here comes something that has nothing to do with a keyword.",
	"Ha, a key!",
	"Again nothing!",
	"Words, words, words, how boring!",
	"An ethnic model of plant pot is pretty.",
	"The pot for plants can be bought in a plant store.",
];
const paper1 = new Paper(
	sentences.join( " " ),
	{
		keyword: "plant pots",
	}
);
const paper2 = new Paper(
	sentences.join( " " ),
	{
		keyword: "fluffy cat",
	}
);


describe( "Test for counting the singular and plural nouns in a text", function() {
	it( "counts/marks a string of text with a keyword in it.", function() {
		expect( countForms( paper1, morphologyDataEN ) ).toEqual(
			[
				{ modified: "plants", modifiedCount: 1, original: "plant", originalCount: 2 },
				{ modified: "pot", modifiedCount: 2, original: "pots", originalCount: 0 },
			],
		);
	} );
	it( "counts/marks a string of text without a keyword in it.", function() {
		expect( countForms( paper2, morphologyDataEN ) ).toEqual( [
			 { modified: "fluffies", modifiedCount: 0, original: "fluffy", originalCount: 0 },
		     { modified: "cats", modifiedCount: 0, original: "cat", originalCount: 0 },
		] );
	} );
} );
