// External dependencies.
import React from "react";
import renderer from "react-test-renderer";

// Internal dependencies.
import Alert from "../src/Alert.js";
import { makeOutboundLink } from "@yoast/helpers";

test( "the default info Alert matches the snapshot", () => {
	const component = renderer.create(
		<Alert dismissable={ true } cookieName="infoAlert" type="info">
			Norway knighted a penguin &
			<br />
			Sweden has a rabbit show-jumping competition called Kaninhoppning.
			<p>End of <b>info</b> alert </p>
		</Alert>
	);

	const tree = component.toJSON();
	expect( tree ).toMatchSnapshot();
} );

test( "the undismissable warning alert matches the snapshot", () => {
	const component = renderer.create(
		<Alert dismissable={ false } cookieName="warningAlert" type="warning">
			<i>Watch out where the huskies go,
				and don&apos;t you eat that yellow snow. </i>
			This <b>warning</b> alert cannot be dismissed.
		</Alert>
	);

	const tree = component.toJSON();
	expect( tree ).toMatchSnapshot();
} );

test( "the success alert with link matches the snapshot", () => {
	const YoastLink = makeOutboundLink();
	const component = renderer.create(
		<Alert dismissable={ true } cookieName="successAlert" type="success">
			This is a <b>success</b> alert with a link in it: &nbsp;
			<YoastLink href="https://yoast.com">yoast.com </YoastLink>
		</Alert>
	);

	const tree = component.toJSON();
	expect( tree ).toMatchSnapshot();
} );

test( "the error alert matches the snapshot", () => {
	const component = renderer.create(
		<Alert dismissable={ true } cookieName="errorAlert" type="error">
			This is an <b>error</b> alert! <b>Something went wrong </b> 😢 <br />
		</Alert>
	);

	const tree = component.toJSON();
	expect( tree ).toMatchSnapshot();
} );
