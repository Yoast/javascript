import { merge } from "lodash-es";

import Assessment from "../../assessment";
import AssessmentResult from "../../values/AssessmentResult";
import { createAnchorOpeningTag } from "../../helpers/shortlinker";
import countWords from "../../stringProcessing/countWords";
import formatNumber from "../../helpers/formatNumber";
import { inRangeEndInclusive as inRange } from "../../helpers/inRange";

/**
 * Represents the assessment that will look if the keyphrase density is within the recommended range.
 */
class SingularPluralAssessment extends Assessment {
	/**
	 * Sets the identifier and the config.
	 *
	 * @param {Object} [config] The configuration to use.
	 *
	 * @param {number} [config.scores.good] The score to return if there are way too many instances of keyphrase in the text.
	 * @param {number} [config.scores.okay] The score to return if there are too many instances of keyphrase in the text.
	 * @param {number} [config.scores.bad] The score to return if there is a good number of keyphrase instances in the text.
	 *
	 * @param {string} [config.url] The URL to the relevant KB article.
	 *
	 * @returns {void}
	 */
	constructor( config = {} ) {
		super();

		const defaultConfig = {
			scores: {
				good: 9,
				okay: 6,
				bad: 3,
			},
			urlTitle: createAnchorOpeningTag( "https://yoa.st/33v" ),
			urlCallToAction: createAnchorOpeningTag( "https://yoa.st/33w" ),
		};

		this.identifier = "singularPlural";
		this._config = merge( defaultConfig, config );
	}

	/**
	 * Runs the keyphrase density module, based on this returns an assessment
	 * result with score.
	 *
	 * @param {Paper} paper The paper to use for the assessment.
	 * @param {Researcher} researcher The researcher used for calling the
	 *                                research.
	 * @param {Jed} i18n The object used for translations.
	 *
	 * @returns {AssessmentResult} The result of the assessment.
	 */
	getResult( paper, researcher, i18n ) {
		this.singularAndPlural = researcher.getResearch( "singularAndPlural" );
		console.log( this.singularAndPlural );

		const calculateResult = this.calculateResult( i18n );

		const assessmentResult = new AssessmentResult();

		assessmentResult.setScore( calculateResult.score );
		assessmentResult.setText( calculateResult.text );
		assessmentResult.setHasMarks( this.determinePercentage() > 0 );

		return assessmentResult;
	}

	determinePercentage() {
		let percentage;

		// Prevent division by zero errors.
		if ( this.singularAndPlural.length !== 0 ) {
			for ( let i = 0; i < this.singularAndPlural.count[ 0 ].length; i++ ) {
				const originalFormCount = this.singularAndPlural.count[ 0 ][ i ];
				const modifiedFormCount = this.singularAndPlural.count[ 1 ][ i ];
				percentage = formatNumber( ( originalFormCount * 100 ) / ( originalFormCount + modifiedFormCount ) );
			}
			return percentage;
		}
	}
	/**
	 * Returns the score for the keyphrase density.
	 *
	 * @param {Jed} i18n The object used for translations.
	 *
	 * @returns {Object} The object with calculated score and resultText.
	 */
	calculateResult( i18n ) {
		const percentage = this.determinePercentage();
		if ( percentage >= 65 ) {
			return {
				score: this._config.scores.good,
				text: i18n.sprintf(
					/* Translators: %1$s expands to a link on yoast.com, %2$s expands to the anchor end tag. */
					i18n.dgettext(
						"js-text-analysis",
						"%1$sRanking intention%2$s: Your text reflects your intention. That's great!" ),
					this._config.urlTitle,
					"</a>"
				),
			};
		}

		if ( inRange( percentage, 45, 64 ) ) {
			return {
				score: this._config.scores.okay,
				text: i18n.sprintf(
					/* Translators: %1$s expands to a link on yoast.com, %2$s expands to the anchor end tag. */
					i18n.dgettext(
						"js-text-analysis",
						"%1$sRanking intention%2$s: You are not sure what to rank for. Change it!" ),
					this._config.urlTitle,
					"</a>"
				),
			};
		}
		return {
			score: this._config.scores.bad,
			text: i18n.sprintf(
				/* Translators: %1$s and %5$s expand to a link on yoast.com, %2$s expands to the anchor end tag,
				%3$s expands to the percentage of sentences in passive voice, %4$s expands to the recommended value. */
				i18n.dgettext(
					"js-text-analysis",
					"%1$sRanking intention%2$s: Your text does not reflect your intention. Change it!"

				),
				this._config.urlTitle,
				"</a>",
				percentage + "%",
				this._config.urlCallToAction,
			),
		};
	}

	/**
	 * Marks keywords in the text for the keyword density assessment.
	 *
	 * @returns {Array<Mark>} Marks that should be applied.
	 */
	getMarks() {
		return this.singularAndPlural.markings;
	}

	/**
	 * Checks whether the paper has a text with at least 100 words and a keyword
	 * is set.
	 *
	 * @param {Paper} paper The paper to use for the assessment.
	 *
	 * @returns {boolean} True if applicable.
	 */
	isApplicable( paper ) {
		return paper.hasText() && paper.hasKeyword() && countWords( paper.getText() ) >= 100;
	}
}
export default SingularPluralAssessment;
