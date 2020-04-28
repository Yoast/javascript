/* eslint-disable no-console */
import { stem } from "../../../../src/morphology/indonesian/stem";
import getMorphologyData from "../../../specHelpers/getMorphologyData";
import goldStandard from "./goldStandardStems.json";

const morphologyDataIN = getMorphologyData( "id" ).id;

const coverageThreshold = 0.8;

describe( "Calculate coverage for the Indonesian stemmer", () => {
	const stemsComparison = goldStandard.map( word => [ word[ 0 ], word[ 1 ], stem( word[ 0 ], morphologyDataIN ) ] );

	const errors = stemsComparison.filter( word => word[ 1 ] !== word[ 2 ] );

	it( "checks if the coverage is above the threshold", () => {
		const coverage = ( stemsComparison.length - errors.length ) / stemsComparison.length;

		expect( coverage ).toBeGreaterThan( coverageThreshold );
		console.log( "The current coverage of the Indonesian stemmer is", coverage * 100, "%." );
	} );
} );
