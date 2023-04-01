import { LanguageId } from "vs/editor/common/encodedTokenAttributes";

/**
 * Interface used to format a model
 */
export interface FormattingOptions {
	/**
	 * Size of a tab in spaces.
	 */
	tabSize: number;
	/**
	 * Prefer spaces over tabs.
	 */
	insertSpaces: boolean;
	/**
	 * The list of multiple ranges to format at once, if the provider supports it.
	 */
	ranges?: Range[];
}

/**
 * @internal
 */
export interface ILanguageIdCodec {
	encodeLanguageId(languageId: string): LanguageId;
	decodeLanguageId(languageId: LanguageId): string;
}
