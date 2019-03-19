/*
 * Composites imports.
 */
// Composites/OnboardingWizard imports.
import { default as OnboardingWizard, MessageBox, LoadingIndicator, sendRequest, decodeHTML } from "@yoast/configuration-wizard";

// Import colors from the style guide.
import { colors } from "@yoast/components/style-guide";

// Composites/AngoliaSearch imports.
import AlgoliaSearcher from "@yoast/algolia-search";
// Composites/Plugin imports.
import { default as Collapsible } from "./composites/Plugin/Shared/components/Collapsible";
import { default as ButtonSection } from "./composites/Plugin/Shared/components/ButtonSection";

import { default as ContentAnalysis } from "./composites/Plugin/ContentAnalysis/components/ContentAnalysis";
import { default as HelpCenter } from "./composites/Plugin/HelpCenter/HelpCenter.js";
import CornerstoneToggle from "./composites/Plugin/CornerstoneContent/components/CornerstoneToggle";

// Composites/LinkSuggestions imports.
import { default as LinkSuggestions } from "./composites/LinkSuggestions/LinkSuggestions";
// Composites/KeywordSuggestions imports.
import { default as KeywordSuggestions } from "./composites/KeywordSuggestions/KeywordSuggestions";
// Composites/basic imports.
export {
	getRtlStyle,
	HelpText,
	Icon,
	LanguageNotice,
	Loader,
	ScoreAssessments,
	SvgIcon,
	SynonymsInput,
	Toggle,
	UpsellButton,
	UpsellLinkButton,
	YoastButton,
	YoastModal,
	YoastWarning,
	YoastSeoIcon,
} from "@yoast/components";

// Composites/CoursesOverview imports
import { default as Card, FullHeightCard } from "./composites/CoursesOverview/Card";
import { default as CardBanner } from "./composites/CoursesOverview/CardBanner";
import { default as CardDetails } from "./composites/CoursesOverview/CardDetails";

export {
	OnboardingWizard,
	HelpCenter,
	MessageBox,
	LinkSuggestions,
	KeywordSuggestions,
	ContentAnalysis,
	Collapsible,
	ButtonSection,
	LoadingIndicator,
	CornerstoneToggle,
	sendRequest,
	decodeHTML,
	Card,
	FullHeightCard,
	CardBanner,
	CardDetails,
	AlgoliaSearcher,
	colors,
};

export * from "./composites/Plugin/SnippetPreview";
export * from "./composites/Plugin/SnippetEditor";
export * from "./forms";
export * from "./composites/Plugin/ContentAnalysis";
export { default as utils } from "./utils";
export { localize } from "./utils/i18n";
export { setTranslations } from "./utils/i18n";
export { translate } from "./utils/i18n";
export * from "./composites/Plugin/DashboardWidget";
export { replacementVariablesShape, recommendedReplacementVariablesShape } from "./composites/Plugin/SnippetEditor/constants";
export { default as analysis } from "./composites/Plugin/ContentAnalysis/reducers/contentAnalysisReducer";
export { default as WordpressFeed } from "./composites/Plugin/DashboardWidget/components/WordpressFeed";
export { default as SeoAssessment } from "./composites/Plugin/DashboardWidget/components/SeoAssessment";
export { default as VideoTutorial } from "./composites/HelpCenter/views/VideoTutorial";
export { default as KeywordInput } from "./composites/Plugin/Shared/components/KeywordInput";
export { insightsReducer } from "./redux/reducers/insights";
export { setProminentWords } from "./redux/actions/insights";
export { setReadabilityResults,
	setSeoResultsForKeyword,
	setOverallReadabilityScore,
	setOverallSeoScore } from "./composites/Plugin/ContentAnalysis/actions/contentAnalysis";
