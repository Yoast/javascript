import matchKeywordInSubheadings from "../../researches/base/matchKeywordInSubheadings.js";
import getProminentWordsForInsights from "../../researches/base/getProminentWordsForInsights";
import getProminentWordsForInternalLinking from "../../researches/base/getProminentWordsForInternalLinking";
import getWordForms from "../../researches/_todo/getWordForms";
import findKeywordInPageTitle from "../../researches/base/findKeywordInPageTitle";
import { keyphraseDistributionResearcher as keyphraseDistribution } from "../../researches/base/keyphraseDistribution";

import AbstractResearcher from "../../AbstractResearcher";

import getLinkStatistics from "./researches/getLinkStatistics";
import functionWordsInKeyphrase from "./researches/functionWordsInKeyphrase";

/**
 * The researches contains all the researches
 */
export default class Researcher extends AbstractResearcher {
	/**
	 * Constructor
	 * @param {Paper} paper The Paper object that is needed within the researches.
	 * @constructor
	 */
	constructor( paper ) {
		super( paper );

		Object.assign( this.defaultResearches, {
			functionWordsInKeyphrase: functionWordsInKeyphrase,
			matchKeywordInSubheadings: matchKeywordInSubheadings,
			getLinkStatistics: getLinkStatistics,
			keyphraseDistribution: keyphraseDistribution,
			findKeywordInPageTitle: findKeywordInPageTitle,
			morphology: getWordForms,
			prominentWordsForInsights: getProminentWordsForInsights,
			prominentWordsForInternalLinking: getProminentWordsForInternalLinking,
		} );
	}
}
