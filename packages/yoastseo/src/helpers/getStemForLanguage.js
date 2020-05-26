import { determineStem as englishDetermineStem } from "../morphology/english/determineStem";
import { determineStem as germanDetermineStem } from "../morphology/german/determineStem";
import { determineStem as dutchDetermineStem } from "../morphology/dutch/determineStem";
import spanishDetermineStem from "../morphology/spanish/stem";
import frenchDetermineStem from "../morphology/french/stem";
import russianDetermineStem from "../morphology/russian/stem";
import italianDetermineStem from "../morphology/italian/stem";

/**
 * Collects all functions for determining a stem per language and returns this collection to a Researcher
 *
 * @returns {Object} Forms to be searched for keyword-based assessments for all available languages.
 */
export default function() {
	return {
		en: englishDetermineStem,
		de: germanDetermineStem,
		nl: dutchDetermineStem,
		es: spanishDetermineStem,
		fr: frenchDetermineStem,
		ru: russianDetermineStem,
		it: italianDetermineStem,
	};
}
