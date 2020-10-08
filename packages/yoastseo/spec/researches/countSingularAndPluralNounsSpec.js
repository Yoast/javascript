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
	it( "counts a string of text with a keyword in it.", function() {
		const text = "Living in Sydney? Need a garden shed? Here we cover all you need to know about EasyShed Garden Sheds for Sydney residents. " +
		"Are you looking for durable and affordable steel " +
		"garden sheds in Sydney? Check out the deals on our SHOP page where you can get HUGE SAVINGS on EasyShed workshops, " +
		"garages, carports, aviaries, garden lockers, pool pump covers, bike sheds, and garden sheds in Sydney. Our Select Shed " +
		"Designer, which is found at the top part of our SHOP page, will let you choose a specific width, depth, height, shed type " +
		"and colour that you would need in a garden shed. Once you’ve chosen your specifications, you’ll see all the available EasyShed models " +
		"that meet your requirements. EasyShed garden sheds are 100% Australian made and are suited for the harsh Australian climate. " +
		"They are manufactured from high-tensile BlueScope steel that can go through great strain without breaking or being deformed. " +
		"Do I need Council Approval for my garden shed? It’s best to contact the City of Sydney at 02 9265 9333 just to let them know " +
		"you’d like to put up a garden shed. You can also visit the City of Sydney website for more information. Usually, a garden shed " +
		"that’s 3m (w) x 3m (d) or less will not need Council Approval, but it’s still best to check with them if Council Approval is required.\n";
		const attributes = {
			keyword: "garden sheds",
			locale: "en",
		};
		const testPaper = new Paper( text, attributes );
		const researcher = new Researcher( testPaper );
		researcher.addResearchData( "morphology", morphologyDataEN );
		expect( countForms( testPaper, researcher ) ).toEqual( [
			{ modified: "gardens", modifiedCount: 0, original: "garden", originalCount: 10 },
			{ modified: "shed", modifiedCount: 7, original: "sheds", originalCount: 5 } ] );
	} );
} );
