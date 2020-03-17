import { AnalysisWebWorker, AnalysisWorkerWrapper, createWorker } from "./worker";
import * as assessments from "./assessments";
import * as bundledPlugins from "./bundledPlugins";
import * as helpers from "./helpers";
import * as markers from "./markers";
import * as string from "./stringProcessing";
import * as interpreters from "./interpreters";
import * as config from "./config";

import App from "./app";
import Assessor from "./assessor";
import ContentAssessor from "./contentAssessor";
import SeoAssessor from "./seoAssessor";
import TaxonomyAssessor from "./taxonomyAssessor";
import Pluggable from "./pluggable";
import Researcher from "./researcher";
import SnippetPreview from "./snippetPreview";
import Paper from "./values/Paper";
import AssessmentResult from "./values/AssessmentResult";
import Assessment from "./assessment";

/*
 * Everything exported here is put on the `yoast.analysis` global in the plugin.
 */
export {
	App,
	Assessor,
	ContentAssessor,
	SeoAssessor,
	TaxonomyAssessor,
	Pluggable,
	Researcher,
	SnippetPreview,

	Paper,
	AssessmentResult,
	Assessment,

	AnalysisWebWorker,
	AnalysisWorkerWrapper,
	createWorker,

	assessments,
	bundledPlugins,
	config,
	helpers,
	markers,
	string,
	interpreters,
};

/*
 * Used for backwards compatibility reasons.
 * For new exports, please add it as a named dependency above instead.
 */
export default {
	App,
	Assessor,
	ContentAssessor,
	TaxonomyAssessor,
	Pluggable,
	Researcher,
	SnippetPreview,

	Paper,
	AssessmentResult,

	AnalysisWebWorker,
	AnalysisWorkerWrapper,
	createWorker,

	assessments,
	bundledPlugins,
	config,
	helpers,
	markers,
	string,
	interpreters,
};
