

export const USUAL_WORD_SEPARATORS = '`~!@#$%^&*()-=+[{]}\\|;:\'",.<>/?';

/**
 * Word inside a model.
 */
export interface IWordAtPosition {
	/**
	 * The word.
	 */
	readonly word: string;
	/**
	 * The column where the word starts.
	 */
	readonly startColumn: number;
	/**
	 * The column where the word ends.
	 */
	readonly endColumn: number;
}
