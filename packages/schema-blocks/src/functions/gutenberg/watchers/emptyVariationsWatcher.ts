import { BlockInstance } from "@wordpress/blocks";
import { isUndefined } from "lodash";

import { mapBlocksRecursively } from "../../innerBlocksHelper";
import recurseOverBlocks from "../../blocks/recurseOverBlocks";
import { getBlockType } from "../../BlockHelper";
import { ExtendedBlock } from "../../../type-adapters/ExtendedBlock";
import { dispatch, select } from "@wordpress/data";

/**
 * Watches the empty variation containers.
 *
 *
 * @param blocks The current list of blocks.
 * @param previousBlocks The previous list of blocks.
 */
export default function emptyVariationsWatcher( blocks: BlockInstance[], previousBlocks: BlockInstance[] ) {
	const currentBlockIds: string[] = mapBlocksRecursively( blocks, block => block.clientId );

	if ( ! previousBlocks ) {
		return;
	}

	recurseOverBlocks( previousBlocks, ( block: BlockInstance ) => {
		// Is it a Yoast block?
		if ( isUndefined( block.attributes[ "is-yoast-schema-block" ] ) ) {
			return;
		}

		const removedInnerBlocks: BlockInstance[] = block.innerBlocks
			.filter( innerBlock => ! currentBlockIds.includes( innerBlock.clientId ) );

		// Nothing has been removed.
		if ( removedInnerBlocks.length === 0 ) {
			return;
		}

		// Does the block have variations.
		const blockType = getBlockType( block.name ) as ExtendedBlock;
		if ( isUndefined( blockType.variations )  ) {
			return;
		}

		const currentBlock = select( "core/block-editor" ).getBlock( block.clientId );
		if ( currentBlock.innerBlocks.length === 0 ) {
			dispatch( "core/block-editor" ).removeBlock( currentBlock.clientId );
		}
	} );
}
