/* global describe it expect */
import SingularPluralAssessmentPrototype from "../../src/assessments/seo/SingularPluralAssessmentPrototype";
import Researcher from "../../src/researcher";
import Paper from "../../src/values/Paper.js";
import factory from "../specHelpers/factory.js";


const i18n = factory.buildJed();

describe( "Tests for the ranking intention assessment for English", function() {
	it( "runs the ranking intention on the paper with keyword", function() {
		const paper = new Paper( "There are many pots for plant that you can choose. Pots with tribal pattern is our bestseller.",
			{ keyword: "plant pots" } );
		const researcher = new Researcher( paper );
		const result = new SingularPluralAssessmentPrototype().getResult( paper, researcher, i18n );
		expect( result.getScore() ).toBe( 9 );
		expect( result.getText() ).toBe( "<a href='https://yoa.st/33v' target='_blank'>Ranking intention</a>: " +
			"Your text reflects your intention. That's great!" );
	} );
	it( "runs the ranking intention on the paper with keyword", function() {
		const paper = new Paper( "There are many pots for plant that you can choose. The pot with tribal pattern is our bestseller.",
			{ keyword: "plant pots" } );
		const researcher = new Researcher( paper );
		const result = new SingularPluralAssessmentPrototype().getResult( paper, researcher, i18n );
		expect( result.getScore() ).toBe( 6 );
		expect( result.getText() ).toBe( "<a href='https://yoa.st/33v' target='_blank'>Ranking intention</a>: " +
			"Your text does not reflect any particular ranking intention. " +
			"If your keywords is singular, use more singular occurrences; if your keyphrase is plural, use more plural occurrences!" );
	} );
	it( "runs the ranking intention on the paper with keyword", function() {
		const paper = new Paper( "There is more than a pot you can choose for your plant. The pot with tribal pattern is our bestseller.",
			{ keyword: "plant pots" } );
		const researcher = new Researcher( paper );
		const result = new SingularPluralAssessmentPrototype().getResult( paper, researcher, i18n );
		expect( result.getScore() ).toBe( 3 );
		expect( result.getText() ).toBe( "<a href='https://yoa.st/33v' target='_blank'>Ranking intention</a>: " +
			"Your text does not reflect your ranking intention. Change your keyphrase occurrences!" );
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
} );
