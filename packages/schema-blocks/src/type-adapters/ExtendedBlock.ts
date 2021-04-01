import { Block } from "@wordpress/blocks";
import { BlockVariation } from "./ExtendedBlockConfiguration";

export type ExtendedBlock = Block & {
	variations: BlockVariation[];
};
