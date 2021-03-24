import { BlockValidation, BlockValidationResult } from "../../../src/core/validation";
import { BlockInstance } from "@wordpress/blocks";

describe( "BlockValidationResult", () => {
	it( "can create a BlockValidationResult using the default constructor, with no message", () => {
		const result = new BlockValidationResult(
			"12345",
			"Block",
			BlockValidation.Invalid,
		);

		expect( result.name ).toEqual( "Block" );
		expect( result.result ).toEqual( BlockValidation.Invalid );
		expect( result.clientId ).toEqual( "12345" );
		expect( result.issues ).toHaveLength( 0 );
		expect( result.message ).toBeUndefined();
	} );

	it( "can create a BlockValidationResult using the default constructor, with a message", () => {
		const result = new BlockValidationResult(
			"12345",
			"Block",
			BlockValidation.Invalid,
			"A message.",
		);

		expect( result.name ).toEqual( "Block" );
		expect( result.result ).toEqual( BlockValidation.Invalid );
		expect( result.clientId ).toEqual( "12345" );
		expect( result.issues ).toHaveLength( 0 );
		expect( result.message ).toEqual( "A message." );
	} );

	it( "can create a BlockValidationResult using the MissingBlock constructor", () => {
		const result = BlockValidationResult.MissingBlock( "Block" );

		expect( result.name ).toEqual( "Block" );
		expect( result.result ).toEqual( BlockValidation.MissingBlock );
		expect( result.clientId ).toBeNull();
		expect( result.issues ).toHaveLength( 0 );
		expect( result.message ).toEqual( "The 'Block' block is required but missing." );
	} );

	it( "can create a BlockValidationResult using the MissingAttribute constructor", () => {
		const block: BlockInstance = {
			clientId: "12345",
			name: "Block",
			attributes: [],
			isValid: true,
			innerBlocks: [],
		};
		const result = BlockValidationResult.MissingAttribute( block );

		expect( result.name ).toEqual( "Block" );
		expect( result.result ).toEqual( BlockValidation.MissingAttribute );
		expect( result.clientId ).toEqual( "12345" );
		expect( result.issues ).toHaveLength( 0 );
		expect( result.message ).toBeUndefined();
	} );

	it( "can create a BlockValidationResult using the Valid constructor", () => {
		const block: BlockInstance = {
			clientId: "12345",
			name: "Block",
			attributes: [],
			isValid: true,
			innerBlocks: [],
		};
		const result = BlockValidationResult.Valid( block );

		expect( result.name ).toEqual( "Block" );
		expect( result.result ).toEqual( BlockValidation.Valid );
		expect( result.clientId ).toEqual( "12345" );
		expect( result.issues ).toHaveLength( 0 );
		expect( result.message ).toBeUndefined();
	} );
} );
