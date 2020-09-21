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
		expect( countForms( paper1, morphologyDataEN ).count ).toEqual( [ [ 2, 0 ], [ 1, 2 ] ] );
		expect( countForms( paper1, morphologyDataEN ).markings ).toEqual( [
			{
				_properties: {
					marked: "An ethnic model of <yoastmark class='yoast-text-mark'>plant pot</yoastmark> is pretty.",
					original: "An ethnic model of plant pot is pretty.",
				},
			},
			{
				_properties: {
					marked: "An ethnic model of <yoastmark class='yoast-text-mark'>plant pot</yoastmark> is pretty.",
					original: "An ethnic model of plant pot is pretty.",
				},
			},
			{
				_properties: {
					marked: "The <yoastmark class='yoast-text-mark'>pot</yoastmark> for " +
						"<yoastmark class='yoast-text-mark'>plants</yoastmark> " +
						"can be bought in a <yoastmark class='yoast-text-mark'>plant</yoastmark> store.",
					original: "The pot for plants can be bought in a plant store.",
				},
			},
			{
				_properties: {
					marked: "The <yoastmark class='yoast-text-mark'>pot</yoastmark> for " +
						"<yoastmark class='yoast-text-mark'>plants</yoastmark> " +
						"can be bought in a <yoastmark class='yoast-text-mark'>plant</yoastmark> store.",
					original: "The pot for plants can be bought in a plant store.",
				},
			},
			{
				_properties: {
					marked: "The <yoastmark class='yoast-text-mark'>pot</yoastmark> for " +
						"<yoastmark class='yoast-text-mark'>plants</yoastmark> " +
						"can be bought in a <yoastmark class='yoast-text-mark'>plant</yoastmark> store.",
					original: "The pot for plants can be bought in a plant store.",
				},
			},

		] );
	} );
	it( "counts/marks a string of text without a keyword in it.", function() {
		expect( countForms( paper2, morphologyDataEN ).count ).toEqual( [ [ 0, 0 ], [ 0, 0 ] ] );
		expect( countForms( paper2, morphologyDataEN ).markings ).toEqual( [] );
	} );
} );
