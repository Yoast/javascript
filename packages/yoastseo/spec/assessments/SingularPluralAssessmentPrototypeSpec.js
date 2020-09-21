/* global describe it expect */
import SingularPluralAssessmentPrototype from "../../src/assessments/seo/SingularPluralAssessmentPrototype";
import Researcher from "../../src/researcher";
import Paper from "../../src/values/Paper.js";
import Mark from "../../src/values/Mark.js";
import factory from "../specHelpers/factory.js";
import getMorphologyData from "../specHelpers/getMorphologyData";


const i18n = factory.buildJed();
const nonkeyword = "nonkeyword, ";
const keyword = "keyword, ";

describe( "Tests for the keywordDensity assessment for languages without morphology", function() {
	it( "runs the keywordDensity on the paper without keyword", function() {
		const paper = new Paper( nonkeyword.repeat( 1000 ), { keyword: "keyword" } );
		const researcher = new Researcher( paper );
		const result = new SingularPluralAssessmentPrototype().getResult( paper, researcher, i18n );
		expect( result.getScore() ).toBe( 4 );
		expect( result.getText() ).toBe( "<a href='https://yoa.st/33v' target='_blank'>Keyphrase density</a>: " +
			"The focus keyphrase was found 0 times. That's less than the recommended minimum of 5 times for a text of this length." +
			" <a href='https://yoa.st/33w' target='_blank'>Focus on your keyphrase</a>!" );
	} );
} );

describe( "A test for marking the keyword", function() {
	it( "returns markers", function() {
		const SingularPluralAssessment = new SingularPluralAssessmentPrototype();
		const paper = new Paper( "This is a very interesting paper with a keyword and another keyword.", { keyword: "keyword" }  );
		const researcher = new Researcher( paper );
		SingularPluralAssessment.getResult( paper, researcher, i18n );
		const expected = [
			new Mark( {
				marked: "This is a very interesting paper with a " +
					"<yoastmark class='yoast-text-mark'>keyword</yoastmark> and another " +
					"<yoastmark class='yoast-text-mark'>keyword</yoastmark>.",
				original: "This is a very interesting paper with a keyword and another keyword.",
			} ) ];
		expect( SingularPluralAssessment.getMarks() ).toEqual( expected );
	} );

	it( "returns markers for a keyphrase containing numbers", function() {
		const SingularPluralAssessment = new SingularPluralAssessmentPrototype();
		const paper = new Paper( "This is the release of YoastSEO 9.3.", { keyword: "YoastSEO 9.3" }  );
		const researcher = new Researcher( paper );
		SingularPluralAssessment.getResult( paper, researcher, i18n );
		const expected = [
			new Mark( { marked: "This is the release of <yoastmark class='yoast-text-mark'>YoastSEO 9.3</yoastmark>.",
				original: "This is the release of YoastSEO 9.3." } ) ];
		expect( SingularPluralAssessment.getMarks() ).toEqual( expected );
	} );
} );
