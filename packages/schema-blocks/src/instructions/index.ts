export * from "./blocks";

export {
	Attribute,
	BlockID,
	HTML,
	// Need to rename this, since `./blocks` already exports an `InnerBlocks` `BlockInstruction`.
	InnerBlocks as InnerBlocksSchema,
	InnerBlocksHTML,
	InnerBlocksID,
	JobEmploymentType,
	List,
	Permalink,
	Schema,
} from  "./schema";
