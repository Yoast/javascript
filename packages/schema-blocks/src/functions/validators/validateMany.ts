import { isValidResult } from ".";
import { BlockValidation, BlockValidationResult } from "../../core/validation";

/**
 * Analyzes many validations to draw a single conclusion.
 *
 * @param validation The BlockValidationResult whose issues should determine the outcome.
 *
 * @returns {BlockValidationResult} The result of the validation.
 */
export function validateMany( validation: BlockValidationResult ): BlockValidationResult {
	validation.result = validation.issues.some( issue =>
		! isValidResult( issue.result ) )
		? BlockValidation.Invalid
		: BlockValidation.Valid;
	return validation;
}
