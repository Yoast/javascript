import { BlockInstance } from "@wordpress/blocks";
import { dispatch, select } from "@wordpress/data";
import { recurseOverBlocks } from "./blocks";

/**
 * Searches recursively in the inner blocks to get all instances of blocks whose name occurs in blockNames.
 *
 * @param blockInstance The array of blocks you're searching in.
 * @param blockNames    The names of the blocks you're searching for.
 *
 * @returns {BlockInstance[]} The block instances that have a name that occurs in blockNames.
 */
function getInnerblocksByName( blockInstance: BlockInstance, blockNames: string[] ): BlockInstance[] {
	return filterBlocksRecursively( blockInstance, block => blockNames.includes( block.name ) );
}

/**
 * Finds all innerblocks of a blockinstance that conform to the predicate.
 *
 * @param blockInstance The block whose innerblocks should be searched
 * @param predicate     The function to decide which blocks should be kept.
 * @returns {BlockInstance[]} The subset of innerblocks that conform to predicate.
 */
function filterBlocksRecursively( blockInstance: BlockInstance, predicate: ( blockInstance: BlockInstance ) => boolean ): BlockInstance[] {
	const foundBlocks: BlockInstance[] = [];

	recurseOverBlocks( blockInstance.innerBlocks, ( block: BlockInstance ) => {
		// Checks if the current block is one of the required types.
		if ( predicate( block ) ) {
			foundBlocks.push( block );
		}
	} );

	return foundBlocks;
}

/**
 * Maps the given callback function over all the blocks (including all innerBlocks) and returns the results as a flat array.
 *
 * @param blocks The blocks.
 * @param callback The callback function.
 *
 * @returns The transformed blocks, in a flat array.
 */
function mapBlocksRecursively<T>( blocks: BlockInstance[], callback: ( block: BlockInstance ) => T ): T[] {
	const result: T[] = [];
	recurseOverBlocks( blocks, ( block: BlockInstance ) => {
		// eslint-disable-next-line callback-return
		result.push( callback( block ) );
	} );
	return result;
}

/**
 * Inserts a block to the inner block.
 *
 * @param {BlockInstance} block    The block to insert.
 * @param {string}        clientId Id of the element to insert the block to.
 * @param {number}        index    The location of the block.
 */
function insertBlock( block: BlockInstance, clientId: string, index?: number ): void {
	dispatch( "core/block-editor" ).insertBlock( block, index, clientId );
}

/**
 * Gets attributes of inner blocks.
 *
 * @param clientId The client ID of the parent block.
 * @param blocks   A mapping of block name to attribute key.
 *
 * @returns An array contain block names and values.
 */
function getInnerBlocksAttributes( clientId: string, blocks: Record<string, string> ): { name: string; value: unknown }[] {
	let innerBlocks = select( "core/block-editor" ).getBlock( clientId ).innerBlocks;
	innerBlocks     = innerBlocks.filter( block => block.name in blocks );

	const values = [];

	for ( const block of innerBlocks ) {
		const key   = blocks[ block.name ];
		values.push( { name: block.name, value: block.attributes[ key ] } );
	}

	return values;
}

export { filterBlocksRecursively, getInnerblocksByName, mapBlocksRecursively, insertBlock, getInnerBlocksAttributes };
