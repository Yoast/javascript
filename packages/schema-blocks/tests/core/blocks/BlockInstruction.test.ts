import { BlockInstance } from "@wordpress/blocks";
import { BlockInstruction } from "../../../src/core/blocks/BlockInstruction";
import { BlockValidation } from "../../../src/core/validation";

/**
 * Test class, to be able to test the non-abstract BlockInstruction methods.
 */
class TestBlockInstruction extends BlockInstruction {
}

describe( "The BlockInstruction class", () => {
	describe( "validate method", () => {
		it( "considers a core block with no required attributes Valid, if Gutenberg seems to think so.", () => {
			const blockInstruction = new TestBlockInstruction( 11, null );

			const blockInstance: BlockInstance = {
				clientId: "clientid",
				name: "core/whatever",
				innerBlocks: [],
				isValid: true,
				attributes: {},
			};

			const result = blockInstruction.validate( blockInstance );
			expect( result.name ).toEqual( "core/whatever" );
			expect( result.result ).toEqual( BlockValidation.Valid );
			expect( result.issues.length ).toEqual( 0 );
		} );

		it( "considers a core block with no required attributes Invalid, if Gutenberg seems to think so.", () => {
			const blockInstruction = new TestBlockInstruction( 11, null );

			const blockInstance: BlockInstance = {
				clientId: "clientid",
				name: "core/whatever",
				innerBlocks: [],
				isValid: false,
				attributes: {},
			};

			const result = blockInstruction.validate( blockInstance );
			expect( result.name ).toEqual( "core/whatever" );
			expect( result.result ).toEqual( BlockValidation.Invalid );
			expect( result.issues.length ).toEqual( 0 );
		} );

		it( "considers a required attribute to be valid if it exists and is not empty", () => {
			const blockInstruction = new TestBlockInstruction( 11, { name: "title", required: true } );

			const blockInstance: BlockInstance = {
				clientId: "clientid",
				name: "blockName",
				innerBlocks: [],
				isValid: true,
				attributes: {
					title: "Hello, world!",
				},
			};

			const result = blockInstruction.validate( blockInstance );
			expect( result.name ).toEqual( "blockName" );
			expect( result.result ).toEqual( BlockValidation.Valid );
			expect( result.issues.length ).toEqual( 1 );
			expect( result.issues[ 0 ].name ).toEqual( "title" );
			expect( result.issues[ 0 ].result ).toEqual( BlockValidation.Valid );
		} );

		it( "considers a core block with a required attribute to be valid if the attribute exists and is not empty", () => {
			const blockInstruction = new TestBlockInstruction( 11, { name: "title", required: true } );

			const blockInstance: BlockInstance = {
				clientId: "clientid",
				name: "core/whatever",
				innerBlocks: [],
				isValid: true,
				attributes: {
					title: "Hello, world!",
				},
			};

			const result = blockInstruction.validate( blockInstance );
			expect( result.name ).toEqual( "core/whatever" );
			expect( result.result ).toEqual( BlockValidation.Valid );
			expect( result.issues.length ).toEqual( 1 );
			expect( result.issues[ 0 ].name ).toEqual( "title" );
			expect( result.issues[ 0 ].result ).toEqual( BlockValidation.Valid );
		} );

		it( "considers a required attribute to be invalid if it does not exist", () => {
			const blockInstruction = new TestBlockInstruction( 11, { name: "title", required: true } );

			const blockInstance: BlockInstance = {
				clientId: "clientid",
				name: "blockName",
				innerBlocks: [],
				isValid: true,
				attributes: {},
			};

			const result = blockInstruction.validate( blockInstance );
			expect( result.name ).toEqual( "blockName" );
			expect( result.result ).toEqual( BlockValidation.Invalid );
			expect( result.issues.length ).toEqual( 1 );
			expect( result.issues[ 0 ].name ).toEqual( "title" );
			expect( result.issues[ 0 ].result ).toEqual( BlockValidation.MissingAttribute );
		} );

		it( "considers a required attribute to be invalid if it is empty", () => {
			const blockInstruction = new TestBlockInstruction( 11, { name: "title", required: true } );

			const blockInstance: BlockInstance = {
				clientId: "clientid",
				name: "blockName",
				innerBlocks: [],
				isValid: true,
				attributes: {
					title: "",
				},
			};

			const result = blockInstruction.validate( blockInstance );
			expect( result.name ).toEqual( "blockName" );
			expect( result.result ).toEqual( BlockValidation.Invalid );
			expect( result.issues.length ).toEqual( 1 );
			expect( result.issues[ 0 ].name ).toEqual( "title" );
			expect( result.issues[ 0 ].result ).toEqual( BlockValidation.MissingAttribute );
		} );

		it( "skips validation for a block with no attributes and no attribute requirements", () => {
			const blockInstruction = new TestBlockInstruction( 11, { name: "title", required: false } );

			const blockInstance: BlockInstance = {
				clientId: "clientid",
				name: "blockName",
				innerBlocks: [],
				isValid: true,
				attributes: {},
			};

			const result =  blockInstruction.validate( blockInstance );
			expect( result.name ).toEqual( "blockName" );
			expect( result.result ).toEqual( BlockValidation.Skipped );
			expect( result.issues.length ).toEqual( 0 );
		} );

		it( "skips validation for a block with an attribute but no attribute requirements.", () => {
			const blockInstruction = new TestBlockInstruction( 11, { name: "title" } );

			const blockInstance: BlockInstance = {
				clientId: "clientid",
				name: "blockName",
				innerBlocks: [],
				isValid: true,
				attributes: {
					title: "",
				},
			};

			const result = blockInstruction.validate( blockInstance );
			expect( result.name ).toEqual( "blockName" );
			expect( result.result ).toEqual( BlockValidation.Skipped );
			expect( result.issues.length ).toEqual( 0 );
		} );
	} );
} );
