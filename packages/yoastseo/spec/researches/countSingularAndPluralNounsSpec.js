/* global describe it expect */
import countForms from "../../src/researches/countSingularAndPluralNouns.js";


import Paper from "../../src/values/Paper.js";
import Mark from "../../src/values/Mark";
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
const paper = new Paper(
	sentences.join( " " ),
	{
		keyword: "plant pots",
	}
);

describe( "Test for counting the singular and plural nouns in a text", function() {
	it( "counts/marks a string of text with a keyword in it.", function() {
		expect( countForms( paper, morphologyDataEN ).count ).toEqual( [ [ 2, 0 ], [ 1, 2 ] ] );
		expect( countForms( paper, morphologyDataEN ).markings ).toEqual( [
			{ _properties: { marked: "An ethnic model of <yoastmark class='yoast-text-mark'>plant pot</yoastmark> is pretty.",
				original: "An ethnic model of plant pot is pretty." } },
			{ _properties: { marked: "An ethnic model of <yoastmark class='yoast-text-mark'>plant pot</yoastmark> is pretty.",
				original: "An ethnic model of plant pot is pretty." } },
			{ _properties: { marked: "The <yoastmark class='yoast-text-mark'>pot</yoastmark> for " +
						"<yoastmark class='yoast-text-mark'>plants</yoastmark> " +
						"can be bought in a <yoastmark class='yoast-text-mark'>plant</yoastmark> store.",
			original: "The pot for plants can be bought in a plant store." } },
			{ _properties: { marked: "The <yoastmark class='yoast-text-mark'>pot</yoastmark> for " +
						"<yoastmark class='yoast-text-mark'>plants</yoastmark> " +
						"can be bought in a <yoastmark class='yoast-text-mark'>plant</yoastmark> store.",
			original: "The pot for plants can be bought in a plant store." } },
			{ _properties: { marked: "The <yoastmark class='yoast-text-mark'>pot</yoastmark> for " +
						"<yoastmark class='yoast-text-mark'>plants</yoastmark> " +
						"can be bought in a <yoastmark class='yoast-text-mark'>plant</yoastmark> store.",
			original: "The pot for plants can be bought in a plant store." } },
		] );
	} );
	//
	// It( "counts a string of text with no keyword in it.", function() {
	// 	Const mockPaper = new Paper( "a string of text" );
	// 	Expect( keywordCount( mockPaper, mockResearcher ).count ).toBe( 0 );
	// 	Expect( keywordCount( mockPaper, mockResearcher ).markings ).toEqual( [] );
	// } );
	//
	// It( "counts multiple occurrences of a keyphrase consisting of multiple words.", function() {
	// 	Const mockPaper = new Paper( "a string of text with the key word in it, with more key words." );
	// 	Expect( keywordCount( mockPaper, mockResearcherKeyWord ).count ).toBe( 2 );
	// 	Expect( keywordCount( mockPaper, mockResearcherKeyWord ).markings ).toEqual( [
	// 		New Mark( { marked: "a string of text with the <yoastmark class='yoast-text-mark'>key word</yoastmark> in it, " +
	// 				"with more <yoastmark class='yoast-text-mark'>key words</yoastmark>.",
	// 			Original: "a string of text with the key word in it, with more key words." } ) ]
	// 	);
	// } );
	//
	// It( "counts a string of text with German diacritics and eszett as the keyword", function() {
	// 	Const mockPaper = new Paper( "Waltz keepin auf mitz auf keepin äöüß weiner blitz deutsch spitzen." );
	// 	Expect( keywordCount( mockPaper, mockResearcherGermanDiacritics ).count ).toBe( 1 );
	// 	Expect( keywordCount( mockPaper, mockResearcherGermanDiacritics ).markings ).toEqual( [
	// 		New Mark( { marked: "Waltz keepin auf mitz auf keepin <yoastmark class='yoast-text-mark'>äöüß</yoastmark> weiner blitz deutsch spitzen.",
	// 			Original: "Waltz keepin auf mitz auf keepin äöüß weiner blitz deutsch spitzen." } )	]
	// 	);
	// } );
	//
	// It( "counts a string with multiple keyword morphological forms", function() {
	// 	Const mockPaper = new Paper( "A string of text with a keyword and multiple keywords in it." );
	// 	Expect( keywordCount( mockPaper, mockResearcher ).count ).toBe( 2 );
	// 	Expect( keywordCount( mockPaper, mockResearcher ).markings ).toEqual( [
	// 		New Mark( { marked: "A string of text with a <yoastmark class='yoast-text-mark'>keyword</yoastmark> and multiple <yoastmark class='yoast-text-mark'>keywords</yoastmark> in it.",
	// 			Original: "A string of text with a keyword and multiple keywords in it." } ) ]
	// 	);
	// } );
	//
	// It( "counts a string with a keyword with a '-' in it", function() {
	// 	Const mockPaper = new Paper( "A string with a key-word." );
	// 	Expect( keywordCount( mockPaper, mockResearcherMinus ).count ).toBe( 1 );
	// 	Expect( keywordCount( mockPaper, mockResearcherMinus ).markings ).toEqual( [
	// 		New Mark( { marked: "A string with a <yoastmark class='yoast-text-mark'>key-word</yoastmark>.",
	// 			Original: "A string with a key-word." } ) ]
	// 	);
	// } );
	//
	// It( "counts 'key word' in 'key-word'.", function() {
	// 	Const mockPaper = new Paper( "A string with a key-word." );
	// 	Expect( keywordCount( mockPaper, mockResearcherKeyWord ).count ).toBe( 1 );
	// 	// Note: this behavior might change in the future.
	// } );
	//
	// It( "counts a string with a keyword with a '_' in it", function() {
	// 	Const mockPaper = new Paper( "A string with a key_word." );
	// 	Expect( keywordCount( mockPaper, mockResearcherUnderscore ).count ).toBe( 1 );
	// 	Expect( keywordCount( mockPaper, mockResearcherUnderscore ).markings ).toEqual( [
	// 		New Mark( { marked: "A string with a <yoastmark class='yoast-text-mark'>key_word</yoastmark>.",
	// 			Original: "A string with a key_word." } ) ]
	// 	);
	// } );
	//
	// It( "counts a string with with 'kapaklı' as a keyword in it", function() {
	// 	Const mockPaper = new Paper( "A string with kapaklı." );
	// 	Expect( keywordCount( mockPaper, mockResearcherKaplaki ).count ).toBe( 1 );
	// 	Expect( keywordCount( mockPaper, mockResearcherKaplaki ).markings ).toEqual( [
	// 		New Mark( { marked: "A string with <yoastmark class='yoast-text-mark'>kapaklı</yoastmark>.",
	// 			Original: "A string with kapaklı." } ) ]
	// 	);
	// } );
	//
	// It( "counts a string with with '&' in the string and the keyword", function() {
	// 	Const mockPaper = new Paper( "A string with key&word." );
	// 	Expect( keywordCount( mockPaper, mockResearcherAmpersand ).count ).toBe( 1 );
	// 	Expect( keywordCount( mockPaper, mockResearcherAmpersand ).markings ).toEqual( [
	// 		New Mark( { marked: "A string with <yoastmark class='yoast-text-mark'>key&word</yoastmark>.",
	// 			Original: "A string with key&word." } )	]
	// 	);
	// } );
	//
	// It( "does not count images as keywords.", function() {
	// 	Const mockPaper = new Paper( "<img src='http://image.com/image.png'>" );
	// 	Expect( keywordCount( mockPaper, mockResearcherAmpersand ).count ).toBe( 0 );
	// 	Expect( keywordCount( mockPaper, mockResearcherAmpersand ).markings ).toEqual( [] );
	// } );
	//
	// It( "keyword counting is blind to CApiTal LeTteRs.", function() {
	// 	Const mockPaper = new Paper( "A string with KeY worD." );
	// 	Expect( keywordCount( mockPaper, mockResearcherKeyWord ).count ).toBe( 1 );
	// 	Expect( keywordCount( mockPaper, mockResearcherKeyWord ).markings ).toEqual( [
	// 		New Mark( { marked: "A string with <yoastmark class='yoast-text-mark'>KeY worD</yoastmark>.",
	// 			Original: "A string with KeY worD." } )	]
	// 	);
	// } );
	//
	// It( "keyword counting is blind to types of apostrophe.", function() {
	// 	Const mockPaper = new Paper( "A string with quotes to match the key'word, even if the quotes differ." );
	// 	Expect( keywordCount( mockPaper, mockResearcherApostrophe ).count ).toBe( 1 );
	// 	Expect( keywordCount( mockPaper, mockResearcherApostrophe ).markings ).toEqual( [
	// 		New Mark( { marked: "A string with quotes to match the <yoastmark class='yoast-text-mark'>key'word</yoastmark>, even if the quotes differ.",
	// 			Original: "A string with quotes to match the key'word, even if the quotes differ." } ) ]
	// 	);
	// } );
	//
	// It( "counts can count dollar sign as in '$keyword'.", function() {
	// 	Const mockPaper = new Paper( "A string with a $keyword." );
	// 	Expect( keywordCount( mockPaper, mockResearcherDollarSign ).count ).toBe( 1 );
	// 	// Markings do not currently work in this condition.
	// } );
	//
	// It( "counts 'key word' also in 'key-word'.)", function() {
	// 	Const mockPaper = new Paper( "Lorem ipsum dolor sit amet, key word consectetur key-word adipiscing elit." );
	// 	Expect( keywordCount( mockPaper, mockResearcherKeyWord ).count ).toBe( 2 );
	// 	// Note: this behavior might change in in the future.
	// } );
	//
	// It( "doesn't count 'key-word' in 'key word'.", function() {
	// 	Const mockPaper = new Paper( "Lorem ipsum dolor sit amet, key word consectetur key-word adipiscing elit." );
	// 	Expect( keywordCount( mockPaper, mockResearcherMinus ).count ).toBe( 1 );
	// 	// Note: this behavior might change in in the future.
	// } );
	//
	// It( "only counts full key phrases (when all keywords are in the sentence once, twice etc.) as matches.", function() {
	// 	Const mockPaper = new Paper( "A string with three keys (key and another key) and one word." );
	// 	Expect( keywordCount( mockPaper, mockResearcherKeyWord ).count ).toBe( 1 );
	// 	Expect( keywordCount( mockPaper, mockResearcherKeyWord ).markings ).toEqual( [
	// 		New Mark( { marked: "A string with three <yoastmark class='yoast-text-mark'>keys</yoastmark> (<yoastmark class='yoast-text-mark'>key</yoastmark> and another <yoastmark class='yoast-text-mark'>key</yoastmark>) and one <yoastmark class='yoast-text-mark'>word</yoastmark>.",
	// 			Original: "A string with three keys (key and another key) and one word." } ) ]
	// 	);
	// } );
	//
	// It( "doesn't match singular forms in reduplicated plurals in Indonesian", function() {
	// 	Const mockPaper = new Paper( "Lorem ipsum dolor sit amet, consectetur keyword-keyword, keyword adipiscing elit.", { locale: "id_ID" } );
	// 	Expect( keywordCount( mockPaper, mockResearcher ).count ).toBe( 1 );
	// } );
} );
