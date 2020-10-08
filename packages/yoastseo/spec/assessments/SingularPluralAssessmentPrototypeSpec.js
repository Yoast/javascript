/* global describe it expect */
import SingularPluralAssessmentPrototype from "../../src/assessments/seo/SingularPluralAssessmentPrototype";
import Researcher from "../../src/researcher";
import Paper from "../../src/values/Paper.js";
import factory from "../specHelpers/factory.js";
import getMorphologyData from "../specHelpers/getMorphologyData";

const morphologyDataEN = getMorphologyData( "en" );

const i18n = factory.buildJed();

describe( "Tests for the ranking intention assessment for English", function() {
	it( "runs the ranking intention on the paper with keyword", function() {
		const paper = new Paper( "There are many pots for plant that you can choose. Pots with tribal pattern is our bestseller.",
			{ keyword: "plant pots", locale: "en" } );
		const researcher = new Researcher( paper );
		researcher.addResearchData( "morphology", morphologyDataEN );
		const result = new SingularPluralAssessmentPrototype().getResult( paper, researcher, i18n );
		expect( result.getScore() ).toBe( 9 );
		expect( result.getText() ).toBe( "<a href='https://yoa.st/33v' target='_blank'>Ranking intention</a>:" +
			" Your text reflects your ranking intention. Good job!" );
	} );
	it( "runs the ranking intention on the paper with keyword", function() {
		const paper = new Paper( "There are many pots for plant that you can choose. The pot with tribal pattern is our bestseller.",
			{ keyword: "plant pots", locale: "en" } );
		const researcher = new Researcher( paper );
		researcher.addResearchData( "morphology", morphologyDataEN );
		const result = new SingularPluralAssessmentPrototype().getResult( paper, researcher, i18n );
		expect( result.getScore() ).toBe( 9 );
		expect( result.getText() ).toBe( "<a href='https://yoa.st/33v' target='_blank'>Ranking intention</a>:" +
			" Your text reflects your ranking intention. Good job!" );
	} );
	it( "runs the ranking intention on the paper with keyword", function() {
		const paper = new Paper( "There is more than a pot you can choose for your plant. The pot with tribal pattern is our bestseller.",
			{ keyword: "plant pots", locale: "en" } );
		const researcher = new Researcher( paper );
		researcher.addResearchData( "morphology", morphologyDataEN );
		const result = new SingularPluralAssessmentPrototype().getResult( paper, researcher, i18n );
		expect( result.getScore() ).toBe( 6 );
		expect( result.getText() ).toBe( "<a href='https://yoa.st/33v' target='_blank'>Ranking intention</a>: Your text does not reflect " +
			"any particular ranking intention. If your keywords is singular, use more singular occurrences; " +
			"if your keyphrase is plural, use more plural occurrences!" );
	} );
	it( "runs the ranking intention on the paper with keyword", function() {
		const paper = new Paper( "Tortie or tortoiseshell  cats are very special cats. 99% of torties are female.",
			{ keyword: "tortie cat", locale: "en" } );
		const researcher = new Researcher( paper );
		researcher.addResearchData( "morphology", morphologyDataEN );
		const result = new SingularPluralAssessmentPrototype().getResult( paper, researcher, i18n );
		expect( result.getScore() ).toBe( 3 );
		expect( result.getText() ).toBe( "<a href='https://yoa.st/33v' target='_blank'>Ranking intention</a>: " +
			"Your text does not reflect your ranking intention. Change your keyphrase occurrences!" );
	} );
	it( "runs the ranking intention on the paper with keyword", function() {
		const paper = new Paper( "Living in Sydney? Need a garden shed? Here we cover all you need to know about EasyShed Garden Sheds " +
			"for Sydney residents. Are you looking for durable and affordable steel " +
			"garden sheds in Sydney? Check out the deals on our SHOP page where you can get HUGE SAVINGS on EasyShed workshops, " +
			"garages, carports, aviaries, garden lockers, pool pump covers, bike sheds, and garden sheds in Sydney. Our Select Shed " +
			"Designer, which is found at the top part of our SHOP page, will let you choose a specific width, depth, height, shed type " +
			"and colour that you would need in a garden shed. Once you’ve chosen your specifications, you’ll see all the available EasyShed models " +
			"that meet your requirements. EasyShed garden sheds are 100% Australian made and are suited for the harsh Australian climate. " +
			"They are manufactured from high-tensile BlueScope steel that can go through great strain without breaking or being deformed. " +
			"Do I need Council Approval for my garden shed? It’s best to contact the City of Sydney at 02 9265 9333 just to let them know " +
			"you’d like to put up a garden shed. You can also visit the City of Sydney website for more information. Usually, a garden shed " +
			"that’s 3m (w) x 3m (d) or less will not need Council Approval, but it’s still best to check with them " +
			"if Council Approval is required.\n", { keyword: "garden sheds", locale: "en" } );
		const researcher = new Researcher( paper );
		researcher.addResearchData( "morphology", morphologyDataEN );
		const result = new SingularPluralAssessmentPrototype().getResult( paper, researcher, i18n );
		expect( result.getScore() ).toBe( 9 );
		expect( result.getText() ).toBe( "<a href='https://yoa.st/33v' target='_blank'>Ranking intention</a>: " +
			"Your text reflects your ranking intention. Good job!" );
	} );
	it( "runs the ranking intention on the paper without keyword occurrence", function() {
		const paper = new Paper( "A paper with no keyphrase occurrence.",
			{ keyword: "plant pots", locale: "en" } );
		const researcher = new Researcher( paper );
		researcher.addResearchData( "morphology", morphologyDataEN );
		const result = new SingularPluralAssessmentPrototype().getResult( paper, researcher, i18n );
		expect( result.getScore() ).toBe( 0 );
		expect( result.getText() ).toBe( "<a href='https://yoa.st/33v' target='_blank'>Ranking intention</a>: " +
			"Include your keyphrase in the text so that we can check ranking intention." );
	} );
} );

describe( "A test for marking the keyword", function() {
	it( "returns markers", function() {
		const SingularPluralAssessment = new SingularPluralAssessmentPrototype();
		const paper = new Paper( "An ethnic model of plant pots, ethnic model of plants pots.", { keyword: "plant pots" }  );
		const researcher = new Researcher( paper );
		researcher.addResearchData( "morphology", morphologyDataEN );
		SingularPluralAssessment.getResult( paper, researcher, i18n );
		const expected = [
			{
				_properties: {
					marked: "An ethnic model of plant pots, ethnic model of <yoastmark class='yoast-text-mark'>plants</yoastmark> pots.",
					original: "An ethnic model of plant pots, ethnic model of plants pots.",
				},
			} ];
		expect( SingularPluralAssessment.getMarks( paper ) ).toEqual( expected );
	} );
} );

describe( "Checks if the assessment is applicable", function() {
	const SingularPluralAssessment = new SingularPluralAssessmentPrototype();

	it( "is applicable when there is a text of 100+ words and the keyphrase is set", function() {
		const mockPaper = new Paper( "word ".repeat( 100 ) + "fluffy cat", { keyword: "fluffy cat", locale: "en" } );
		const isApplicable = SingularPluralAssessment.isApplicable( mockPaper );
		expect( isApplicable ).toBe( true );
	} );

	it( "is not applicable when there is no text", function() {
		const mockPaper = new Paper( "", { keyword: "fluffy cat", locale: "en" } );
		const isApplicable = SingularPluralAssessment.isApplicable( mockPaper );
		expect( isApplicable ).toBe( false );
	} );

	it( "is not applicable when the text is shorter than 100 words", function() {
		const mockPaper = new Paper( "word ".repeat( 50 ) + "fluffy cat", { keyword: "fluffy cat", locale: "en" } );
		const isApplicable = SingularPluralAssessment.isApplicable( mockPaper );
		expect( isApplicable ).toBe( false );
	} );

	it( "is not applicable when no keyphrase is set", function() {
		const mockPaper = new Paper( "word ".repeat( 100 ) );
		const isApplicable = SingularPluralAssessment.isApplicable( mockPaper );
		expect( isApplicable ).toBe( false );
	} );
	it( "is not applicable when locale is not English", function() {
		const mockPaper = new Paper( "kucing jantan ".repeat( 100 ), { keyword: "kucing", locale: "id" } );
		const isApplicable = SingularPluralAssessment.isApplicable( mockPaper );
		expect( isApplicable ).toBe( false );
	} );
} );
