import "babel-polyfill";

import React from "react";
import { IntlProvider } from "react-intl";

import Wizard from "./composites/OnboardingWizard/OnboardingWizard";
import Config from "./composites/OnboardingWizard/config/production-config";
import SearchResultsEditor from "./composites/SearchResultEditor/SearchResultEditor";
import SnippetPreview from "./composites/Plugin/SnippetPreview/components/SnippetPreview";
import ContentAnalysis from "./composites/Plugin/ContentAnalysis/components/ContentAnalysis";
import apiConfig from "./composites/OnboardingWizard/config/api-config";
import Loader from "./composites/basic/Loader";

// Required to make Material UI work with touch screens.
import injectTapEventPlugin from "react-tap-event-plugin";

function cloneDeep( object ) {
	return JSON.parse( JSON.stringify( object ) );
}

const WizardWrapper = () => {
	let config = cloneDeep( Config );

	// @todo: Add customComponents manually, because cloneDeep is clearing the value of it. Should be solved.
	config.customComponents = Config.customComponents;
	config.endpoint = apiConfig;

	return <Wizard { ...config } />;
};

const components = [
	{
		id: "search-results-editor",
		name: "Search results editor",
		component: <SearchResultsEditor />,
	},
	{
		id: "snippet-preview",
		name: "Snippet preview",
		component: <SnippetPreview />,
	},
	{
		id: "wizard",
		name: "Wizard",
		component: <WizardWrapper />,
	},
	{
		id: "loader",
		name: "Loader",
		component: <Loader />,
	},
	{
		id: "content-analysis",
		name: "Content analysis",
		component: <ContentAnalysis />,
	},
]

class App extends React.Component {

	constructor() {
		super();

		injectTapEventPlugin();

		this.state = {
			activeComponent: "content-analysis",
		};
	}

	getContent() {
		const activeComponent = this.state.activeComponent;
		for( var i = 0; i < components.length; i++ )  {
			if( activeComponent === components[ i ].id ) {
				return components[ i ].component;
			}
		}
	}

	navigate( activeComponent, event ) {
		this.setState( {
			activeComponent: activeComponent,
		} );
	}

	renderButton( id, title ) {
		const isActive = this.state.activeComponent === id;
		const style = {};
		if( isActive ) {
			style.backgroundColor = "#006671";
			style.color = "#FFF";
			style.borderRadius = "5px";
			style.border = "1px solid white";
			style.outline = "none";
		}
		return (
			<button style={ style } key={ id } type="button" onClick={ this.navigate.bind( this, id ) }>
				{ title }
			</button>
		);
	}

	getMenu() {
		return (
			<nav style={ { margin: "0 0 2rem 0", textAlign: "center" } }>
				{
					components.map( config => {
						return this.renderButton( config.id, config.name );
					} )
				}
			</nav>
		);
	}

	render() {
		return (
			<IntlProvider locale="en">
				<div>
					{ this.getMenu() }
					{ this.getContent() }
				</div>
			</IntlProvider>
		);
	}
}

export default App;
