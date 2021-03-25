import Sentence from "../../src/values/Sentence.js";
import Clause from "../../src/values/Clause";

describe( "constructor", () => {
	it( "creates a new assessment instance", () => {
		const assessment = new Sentence( "Cats are angels." );
		expect( assessment._sentenceText ).toEqual( "Cats are angels." );
	} );
} );

describe( "Creates an empty sentence object", function() {
	it( "returns an object containing no text", function() {
		const sentence = new Sentence();
		expect( sentence.getSentenceText() ).toBe( "" );
	} );
} );

describe( "Creates a sentence object", function() {
	it( "returns an object containing text", function() {
		const sentence = new Sentence( "Team Lingo is happy because the research was finished." );
		expect( sentence.getSentenceText() ).toBe( "Team Lingo is happy because the research was finished." );
	} );

	it( "checks if the sentence is passive when one of the clauses is passive.", function() {
		const sentence = new Sentence( "Team Lingo is happy because the research was finished." );
		const mockClause = new Clause( "because the research was finished", [ "was" ] );
		mockClause.setPassive( true );
		const clauses = [ mockClause ];

		sentence.setClauses( clauses );
		sentence.checkClauseIsPassive();
		expect( sentence.getSentenceText() ).toBe( "Team Lingo is happy because the research was finished." );
		expect( sentence.getClauses() ).toEqual( clauses );
		expect( sentence.isPassive() ).toEqual( true );
	} );

	it( "returns an object containing text and serializes and parses it.", function() {
		const sentence = new Sentence( "Cats are adored." );
		const mockClause = new Clause( "Cats are adored", [ "are" ] );
		mockClause.setPassive( true );
		const clauses = [ mockClause ];

		sentence.setClauses( clauses );
		sentence.checkClauseIsPassive();
		expect( sentence.getClauses() ).toEqual( clauses );
		expect( sentence.serialize() ).toEqual( {
			_parseClass: "Sentence",
			clauses: [ {
				_auxiliaries: [ "are" ],
				_clauseText: "Cats are adored",
				_isPassive: true,
				_participles: [] },
			],
			isPassive: true,
			sentenceText: "Cats are adored.",
		} );
		expect( sentence.parse( sentence.serialize() ) ).toEqual( {
			_clauses: [
				{ _auxiliaries: [ "are" ],
					_clauseText: "Cats are adored",
					_isPassive: true,
					_participles: [],
				} ],
			_isPassive: true,
			_sentenceText: "Cats are adored.",
		} );
	} );
} );

