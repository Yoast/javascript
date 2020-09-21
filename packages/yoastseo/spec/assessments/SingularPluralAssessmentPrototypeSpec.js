/* global describe it expect */
import SingularPluralAssessmentPrototype from "../../src/assessments/seo/SingularPluralAssessmentPrototype";
import Researcher from "../../src/researcher";
import Paper from "../../src/values/Paper.js";
import factory from "../specHelpers/factory.js";


const i18n = factory.buildJed();

describe( "Tests for the keywordDensity assessment for languages without morphology", function() {
	it( "runs the keywordDensity on the paper without keyword", function() {
		const paper = new Paper( "There are many pots for plant that you can choose. Pots with tribal pattern is our bestseller.",
			{ keyword: "plant pots" } );
		const researcher = new Researcher( paper );
		const result = new SingularPluralAssessmentPrototype().getResult( paper, researcher, i18n );
		expect( result.getScore() ).toBe( 9 );
		expect( result.getText() ).toBe( "<a href='https://yoa.st/33v' target='_blank'>Ranking intention</a>: " +
			"Your text reflects your intention. That's great!" );
	} );
} );

describe( "A test for marking the keyword", function() {
	it( "returns markers", function() {
		const SingularPluralAssessment = new SingularPluralAssessmentPrototype();
		const paper = new Paper( "An ethnic model of plant pots, ethnic model of plants pots.", { keyword: "plant pots" }  );
		const researcher = new Researcher( paper );
		SingularPluralAssessment.getResult( paper, researcher, i18n );
		const expected = [
			{ _properties: { marked: "An ethnic model of <yoastmark class='yoast-text-mark'>plant pots</yoastmark>, " +
						"ethnic model of <yoastmark class='yoast-text-mark'>plants pots</yoastmark>.",
			original: "An ethnic model of plant pots, ethnic model of plants pots." } },
			{ _properties: { marked: "An ethnic model of <yoastmark class='yoast-text-mark'>plant pots</yoastmark>, " +
						"ethnic model of <yoastmark class='yoast-text-mark'>plants pots</yoastmark>.",
			original: "An ethnic model of plant pots, ethnic model of plants pots." } },
			{ _properties: { marked: "An ethnic model of <yoastmark class='yoast-text-mark'>plant pots</yoastmark>, " +
						"ethnic model of <yoastmark class='yoast-text-mark'>plants pots</yoastmark>.",
			original: "An ethnic model of plant pots, ethnic model of plants pots." } } ];
		expect( SingularPluralAssessment.getMarks() ).toEqual( expected );
	} );

	// It( "returns markers for a keyphrase containing numbers", function() {
	// 	Const SingularPluralAssessment = new SingularPluralAssessmentPrototype();
	// 	Const paper = new Paper( "This is the release of YoastSEO 9.3.", { keyword: "YoastSEO 9.3" }  );
	// 	Const researcher = new Researcher( paper );
	// 	SingularPluralAssessment.getResult( paper, researcher, i18n );
	// 	Const expected = [
	// 		New Mark( { marked: "This is the release of <yoastmark class='yoast-text-mark'>YoastSEO 9.3</yoastmark>.",
	// 			Original: "This is the release of YoastSEO 9.3." } ) ];
	// 	Expect( SingularPluralAssessment.getMarks() ).toEqual( expected );
	// } );
} );
