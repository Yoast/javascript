/* eslint-disable no-console */
import stem from "../../../../src/morphology/italian/stem";
import filterFunctionWordsFromArray from "../../../../src/helpers/filterFunctionWordsFromArray.js";
import sampleVocabulary from "./sampleVocabulary.json";
import getMorphologyData from "../../../specHelpers/getMorphologyData";

const morphologyDataIT = getMorphologyData( "it" ).it;
const wordsToStemWithoutFunctionWords = filterFunctionWordsFromArray( sampleVocabulary.words, "it" );

describe( "Generate stems for Italian words", () => {
	const corpusWithStems = wordsToStemWithoutFunctionWords.map( word => [ word, stem( word, morphologyDataIT ) ] );

	console.log( JSON.stringify( corpusWithStems ) );
} );
