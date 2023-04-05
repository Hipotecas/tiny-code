import { EditorAutoClosingEditStrategy, EditorAutoClosingStrategy, EditorAutoSurroundStrategy, IBracketPairColorizationOptions, IDropIntoEditorOptions, IEditorCommentsOptions, IEditorFindOptions, IEditorHoverOptions, IEditorInlayHintsOptions, IEditorLightbulbOptions, IEditorMinimapOptions, IEditorPaddingOptions, IEditorParameterHintOptions, IEditorScrollbarOptions, IEditorStickyScrollOptions, IGotoLocationOptions, IGuidesOptions, IInlineSuggestOptions, IQuickSuggestionsOptions, IRulerOption, ISmartSelectOptions, ISuggestOptions, IUnicodeHighlightOptions, LineNumbersType } from "vs/editor/common/config/editorOptions";

/**
 * Configuration options for the editor.
 */
export interface IEditorOptions {
	/**
	 * This editor is used inside a diff editor.
	 */
	inDiffEditor?: boolean;
	/**
	 * The aria label for the editor's textarea (when it is focused).
	 */
	ariaLabel?: string;
	/**
	 * Control whether a screen reader announces inline suggestion content immediately.
	 */
	screenReaderAnnounceInlineSuggestion?: boolean;
	/**
	 * The `tabindex` property of the editor's textarea
	 */
	tabIndex?: number;
	/**
	 * Render vertical lines at the specified columns.
	 * Defaults to empty array.
	 */
	rulers?: (number | IRulerOption)[];
	/**
	 * A string containing the word separators used when doing word navigation.
	 * Defaults to `~!@#$%^&*()-=+[{]}\\|;:\'",.<>/?
	 */
	wordSeparators?: string;
	/**
	 * Enable Linux primary clipboard.
	 * Defaults to true.
	 */
	selectionClipboard?: boolean;
	/**
	 * Control the rendering of line numbers.
	 * If it is a function, it will be invoked when rendering a line number and the return value will be rendered.
	 * Otherwise, if it is a truthy, line numbers will be rendered normally (equivalent of using an identity function).
	 * Otherwise, line numbers will not be rendered.
	 * Defaults to `on`.
	 */
	lineNumbers?: LineNumbersType;
	/**
	 * Controls the minimal number of visible leading and trailing lines surrounding the cursor.
	 * Defaults to 0.
	*/
	cursorSurroundingLines?: number;
	/**
	 * Controls when `cursorSurroundingLines` should be enforced
	 * Defaults to `default`, `cursorSurroundingLines` is not enforced when cursor position is changed
	 * by mouse.
	*/
	cursorSurroundingLinesStyle?: 'default' | 'all';
	/**
	 * Render last line number when the file ends with a newline.
	 * Defaults to 'on' for Windows and macOS and 'dimmed' for Linux.
	*/
	renderFinalNewline?: 'on' | 'off' | 'dimmed';
	/**
	 * Remove unusual line terminators like LINE SEPARATOR (LS), PARAGRAPH SEPARATOR (PS).
	 * Defaults to 'prompt'.
	 */
	unusualLineTerminators?: 'auto' | 'off' | 'prompt';
	/**
	 * Should the corresponding line be selected when clicking on the line number?
	 * Defaults to true.
	 */
	selectOnLineNumbers?: boolean;
	/**
	 * Control the width of line numbers, by reserving horizontal space for rendering at least an amount of digits.
	 * Defaults to 5.
	 */
	lineNumbersMinChars?: number;
	/**
	 * Enable the rendering of the glyph margin.
	 * Defaults to true in vscode and to false in monaco-editor.
	 */
	glyphMargin?: boolean;
	/**
	 * The width reserved for line decorations (in px).
	 * Line decorations are placed between line numbers and the editor content.
	 * You can pass in a string in the format floating point followed by "ch". e.g. 1.3ch.
	 * Defaults to 10.
	 */
	lineDecorationsWidth?: number | string;
	/**
	 * When revealing the cursor, a virtual padding (px) is added to the cursor, turning it into a rectangle.
	 * This virtual padding ensures that the cursor gets revealed before hitting the edge of the viewport.
	 * Defaults to 30 (px).
	 */
	revealHorizontalRightPadding?: number;
	/**
	 * Render the editor selection with rounded borders.
	 * Defaults to true.
	 */
	roundedSelection?: boolean;
	/**
	 * Class name to be added to the editor.
	 */
	extraEditorClassName?: string;
	/**
	 * Should the editor be read only. See also `domReadOnly`.
	 * Defaults to false.
	 */
	readOnly?: boolean;
	/**
	 * Should the textarea used for input use the DOM `readonly` attribute.
	 * Defaults to false.
	 */
	domReadOnly?: boolean;
	/**
	 * Enable linked editing.
	 * Defaults to false.
	 */
	linkedEditing?: boolean;
	/**
	 * deprecated, use linkedEditing instead
	 */
	renameOnType?: boolean;
	/**
	 * Should the editor render validation decorations.
	 * Defaults to editable.
	 */
	renderValidationDecorations?: 'editable' | 'on' | 'off';
	/**
	 * Control the behavior and rendering of the scrollbars.
	 */
	scrollbar?: IEditorScrollbarOptions;
	/**
	 * Control the behavior of sticky scroll options
	 */
	stickyScroll?: IEditorStickyScrollOptions;
	/**
	 * Control the behavior and rendering of the minimap.
	 */
	minimap?: IEditorMinimapOptions;
	/**
	 * Control the behavior of the find widget.
	 */
	find?: IEditorFindOptions;
	/**
	 * Display overflow widgets as `fixed`.
	 * Defaults to `false`.
	 */
	fixedOverflowWidgets?: boolean;
	/**
	 * The number of vertical lanes the overview ruler should render.
	 * Defaults to 3.
	 */
	overviewRulerLanes?: number;
	/**
	 * Controls if a border should be drawn around the overview ruler.
	 * Defaults to `true`.
	 */
	overviewRulerBorder?: boolean;
	/**
	 * Control the cursor animation style, possible values are 'blink', 'smooth', 'phase', 'expand' and 'solid'.
	 * Defaults to 'blink'.
	 */
	cursorBlinking?: 'blink' | 'smooth' | 'phase' | 'expand' | 'solid';
	/**
	 * Zoom the font in the editor when using the mouse wheel in combination with holding Ctrl.
	 * Defaults to false.
	 */
	mouseWheelZoom?: boolean;
	/**
	 * Control the mouse pointer style, either 'text' or 'default' or 'copy'
	 * Defaults to 'text'
	 */
	mouseStyle?: 'text' | 'default' | 'copy';
	/**
	 * Enable smooth caret animation.
	 * Defaults to 'off'.
	 */
	cursorSmoothCaretAnimation?: 'off' | 'explicit' | 'on';
	/**
	 * Control the cursor style, either 'block' or 'line'.
	 * Defaults to 'line'.
	 */
	cursorStyle?: 'line' | 'block' | 'underline' | 'line-thin' | 'block-outline' | 'underline-thin';
	/**
	 * Control the width of the cursor when cursorStyle is set to 'line'
	 */
	cursorWidth?: number;
	/**
	 * Enable font ligatures.
	 * Defaults to false.
	 */
	fontLigatures?: boolean | string;
	/**
	 * Enable font variations.
	 * Defaults to false.
	 */
	fontVariations?: boolean | string;
	/**
	 * Disable the use of `transform: translate3d(0px, 0px, 0px)` for the editor margin and lines layers.
	 * The usage of `transform: translate3d(0px, 0px, 0px)` acts as a hint for browsers to create an extra layer.
	 * Defaults to false.
	 */
	disableLayerHinting?: boolean;
	/**
	 * Disable the optimizations for monospace fonts.
	 * Defaults to false.
	 */
	disableMonospaceOptimizations?: boolean;
	/**
	 * Should the cursor be hidden in the overview ruler.
	 * Defaults to false.
	 */
	hideCursorInOverviewRuler?: boolean;
	/**
	 * Enable that scrolling can go one screen size after the last line.
	 * Defaults to true.
	 */
	scrollBeyondLastLine?: boolean;
	/**
	 * Enable that scrolling can go beyond the last column by a number of columns.
	 * Defaults to 5.
	 */
	scrollBeyondLastColumn?: number;
	/**
	 * Enable that the editor animates scrolling to a position.
	 * Defaults to false.
	 */
	smoothScrolling?: boolean;
	/**
	 * Enable that the editor will install a ResizeObserver to check if its container dom node size has changed.
	 * Defaults to false.
	 */
	automaticLayout?: boolean;
	/**
	 * Control the wrapping of the editor.
	 * When `wordWrap` = "off", the lines will never wrap.
	 * When `wordWrap` = "on", the lines will wrap at the viewport width.
	 * When `wordWrap` = "wordWrapColumn", the lines will wrap at `wordWrapColumn`.
	 * When `wordWrap` = "bounded", the lines will wrap at min(viewport width, wordWrapColumn).
	 * Defaults to "off".
	 */
	wordWrap?: 'off' | 'on' | 'wordWrapColumn' | 'bounded';
	/**
	 * Override the `wordWrap` setting.
	 */
	wordWrapOverride1?: 'off' | 'on' | 'inherit';
	/**
	 * Override the `wordWrapOverride1` setting.
	 */
	wordWrapOverride2?: 'off' | 'on' | 'inherit';
	/**
	 * Control the wrapping of the editor.
	 * When `wordWrap` = "off", the lines will never wrap.
	 * When `wordWrap` = "on", the lines will wrap at the viewport width.
	 * When `wordWrap` = "wordWrapColumn", the lines will wrap at `wordWrapColumn`.
	 * When `wordWrap` = "bounded", the lines will wrap at min(viewport width, wordWrapColumn).
	 * Defaults to 80.
	 */
	wordWrapColumn?: number;
	/**
	 * Control indentation of wrapped lines. Can be: 'none', 'same', 'indent' or 'deepIndent'.
	 * Defaults to 'same' in vscode and to 'none' in monaco-editor.
	 */
	wrappingIndent?: 'none' | 'same' | 'indent' | 'deepIndent';
	/**
	 * Controls the wrapping strategy to use.
	 * Defaults to 'simple'.
	 */
	wrappingStrategy?: 'simple' | 'advanced';
	/**
	 * Configure word wrapping characters. A break will be introduced before these characters.
	 */
	wordWrapBreakBeforeCharacters?: string;
	/**
	 * Configure word wrapping characters. A break will be introduced after these characters.
	 */
	wordWrapBreakAfterCharacters?: string;
	/**
	 * Sets whether line breaks appear wherever the text would otherwise overflow its content box.
	 * When wordBreak = 'normal', Use the default line break rule.
	 * When wordBreak = 'keepAll', Word breaks should not be used for Chinese/Japanese/Korean (CJK) text. Non-CJK text behavior is the same as for normal.
	 */
	wordBreak?: 'normal' | 'keepAll';
	/**
	 * Performance guard: Stop rendering a line after x characters.
	 * Defaults to 10000.
	 * Use -1 to never stop rendering
	 */
	stopRenderingLineAfter?: number;
	/**
	 * Configure the editor's hover.
	 */
	hover?: IEditorHoverOptions;
	/**
	 * Enable detecting links and making them clickable.
	 * Defaults to true.
	 */
	links?: boolean;
	/**
	 * Enable inline color decorators and color picker rendering.
	 */
	colorDecorators?: boolean;
	/**
	 * Controls the max number of color decorators that can be rendered in an editor at once.
	 */
	colorDecoratorsLimit?: number;
	/**
	 * Control the behaviour of comments in the editor.
	 */
	comments?: IEditorCommentsOptions;
	/**
	 * Enable custom contextmenu.
	 * Defaults to true.
	 */
	contextmenu?: boolean;
	/**
	 * A multiplier to be used on the `deltaX` and `deltaY` of mouse wheel scroll events.
	 * Defaults to 1.
	 */
	mouseWheelScrollSensitivity?: number;
	/**
	 * FastScrolling mulitplier speed when pressing `Alt`
	 * Defaults to 5.
	 */
	fastScrollSensitivity?: number;
	/**
	 * Enable that the editor scrolls only the predominant axis. Prevents horizontal drift when scrolling vertically on a trackpad.
	 * Defaults to true.
	 */
	scrollPredominantAxis?: boolean;
	/**
	 * Enable that the selection with the mouse and keys is doing column selection.
	 * Defaults to false.
	 */
	columnSelection?: boolean;
	/**
	 * The modifier to be used to add multiple cursors with the mouse.
	 * Defaults to 'alt'
	 */
	multiCursorModifier?: 'ctrlCmd' | 'alt';
	/**
	 * Merge overlapping selections.
	 * Defaults to true
	 */
	multiCursorMergeOverlapping?: boolean;
	/**
	 * Configure the behaviour when pasting a text with the line count equal to the cursor count.
	 * Defaults to 'spread'.
	 */
	multiCursorPaste?: 'spread' | 'full';
	/**
	 * Controls the max number of text cursors that can be in an active editor at once.
	 */
	multiCursorLimit?: number;
	/**
	 * Configure the editor's accessibility support.
	 * Defaults to 'auto'. It is best to leave this to 'auto'.
	 */
	accessibilitySupport?: 'auto' | 'off' | 'on';
	/**
	 * Controls the number of lines in the editor that can be read out by a screen reader
	 */
	accessibilityPageSize?: number;
	/**
	 * Suggest options.
	 */
	suggest?: ISuggestOptions;
	inlineSuggest?: IInlineSuggestOptions;
	/**
	 * Smart select options.
	 */
	smartSelect?: ISmartSelectOptions;
	/**
	 *
	 */
	gotoLocation?: IGotoLocationOptions;
	/**
	 * Enable quick suggestions (shadow suggestions)
	 * Defaults to true.
	 */
	quickSuggestions?: boolean | IQuickSuggestionsOptions;
	/**
	 * Quick suggestions show delay (in ms)
	 * Defaults to 10 (ms)
	 */
	quickSuggestionsDelay?: number;
	/**
	 * Controls the spacing around the editor.
	 */
	padding?: IEditorPaddingOptions;
	/**
	 * Parameter hint options.
	 */
	parameterHints?: IEditorParameterHintOptions;
	/**
	 * Options for auto closing brackets.
	 * Defaults to language defined behavior.
	 */
	autoClosingBrackets?: EditorAutoClosingStrategy;
	/**
	 * Options for auto closing quotes.
	 * Defaults to language defined behavior.
	 */
	autoClosingQuotes?: EditorAutoClosingStrategy;
	/**
	 * Options for pressing backspace near quotes or bracket pairs.
	 */
	autoClosingDelete?: EditorAutoClosingEditStrategy;
	/**
	 * Options for typing over closing quotes or brackets.
	 */
	autoClosingOvertype?: EditorAutoClosingEditStrategy;
	/**
	 * Options for auto surrounding.
	 * Defaults to always allowing auto surrounding.
	 */
	autoSurround?: EditorAutoSurroundStrategy;
	/**
	 * Controls whether the editor should automatically adjust the indentation when users type, paste, move or indent lines.
	 * Defaults to advanced.
	 */
	autoIndent?: 'none' | 'keep' | 'brackets' | 'advanced' | 'full';
	/**
	 * Emulate selection behaviour of tab characters when using spaces for indentation.
	 * This means selection will stick to tab stops.
	 */
	stickyTabStops?: boolean;
	/**
	 * Enable format on type.
	 * Defaults to false.
	 */
	formatOnType?: boolean;
	/**
	 * Enable format on paste.
	 * Defaults to false.
	 */
	formatOnPaste?: boolean;
	/**
	 * Controls if the editor should allow to move selections via drag and drop.
	 * Defaults to false.
	 */
	dragAndDrop?: boolean;
	/**
	 * Enable the suggestion box to pop-up on trigger characters.
	 * Defaults to true.
	 */
	suggestOnTriggerCharacters?: boolean;
	/**
	 * Accept suggestions on ENTER.
	 * Defaults to 'on'.
	 */
	acceptSuggestionOnEnter?: 'on' | 'smart' | 'off';
	/**
	 * Accept suggestions on provider defined characters.
	 * Defaults to true.
	 */
	acceptSuggestionOnCommitCharacter?: boolean;
	/**
	 * Enable snippet suggestions. Default to 'true'.
	 */
	snippetSuggestions?: 'top' | 'bottom' | 'inline' | 'none';
	/**
	 * Copying without a selection copies the current line.
	 */
	emptySelectionClipboard?: boolean;
	/**
	 * Syntax highlighting is copied.
	 */
	copyWithSyntaxHighlighting?: boolean;
	/**
	 * The history mode for suggestions.
	 */
	suggestSelection?: 'first' | 'recentlyUsed' | 'recentlyUsedByPrefix';
	/**
	 * The font size for the suggest widget.
	 * Defaults to the editor font size.
	 */
	suggestFontSize?: number;
	/**
	 * The line height for the suggest widget.
	 * Defaults to the editor line height.
	 */
	suggestLineHeight?: number;
	/**
	 * Enable tab completion.
	 */
	tabCompletion?: 'on' | 'off' | 'onlySnippets';
	/**
	 * Enable selection highlight.
	 * Defaults to true.
	 */
	selectionHighlight?: boolean;
	/**
	 * Enable semantic occurrences highlight.
	 * Defaults to true.
	 */
	occurrencesHighlight?: boolean;
	/**
	 * Show code lens
	 * Defaults to true.
	 */
	codeLens?: boolean;
	/**
	 * Code lens font family. Defaults to editor font family.
	 */
	codeLensFontFamily?: string;
	/**
	 * Code lens font size. Default to 90% of the editor font size
	 */
	codeLensFontSize?: number;
	/**
	 * Control the behavior and rendering of the code action lightbulb.
	 */
	lightbulb?: IEditorLightbulbOptions;
	/**
	 * Timeout for running code actions on save.
	 */
	codeActionsOnSaveTimeout?: number;
	/**
	 * Enable code folding.
	 * Defaults to true.
	 */
	folding?: boolean;
	/**
	 * Selects the folding strategy. 'auto' uses the strategies contributed for the current document, 'indentation' uses the indentation based folding strategy.
	 * Defaults to 'auto'.
	 */
	foldingStrategy?: 'auto' | 'indentation';
	/**
	 * Enable highlight for folded regions.
	 * Defaults to true.
	 */
	foldingHighlight?: boolean;
	/**
	 * Auto fold imports folding regions.
	 * Defaults to true.
	 */
	foldingImportsByDefault?: boolean;
	/**
	 * Maximum number of foldable regions.
	 * Defaults to 5000.
	 */
	foldingMaximumRegions?: number;
	/**
	 * Controls whether the fold actions in the gutter stay always visible or hide unless the mouse is over the gutter.
	 * Defaults to 'mouseover'.
	 */
	showFoldingControls?: 'always' | 'never' | 'mouseover';
	/**
	 * Controls whether clicking on the empty content after a folded line will unfold the line.
	 * Defaults to false.
	 */
	unfoldOnClickAfterEndOfLine?: boolean;
	/**
	 * Enable highlighting of matching brackets.
	 * Defaults to 'always'.
	 */
	matchBrackets?: 'never' | 'near' | 'always';
	/**
	 * Enable experimental whitespace rendering.
	 * Defaults to 'svg'.
	 */
	experimentalWhitespaceRendering?: 'svg' | 'font' | 'off';
	/**
	 * Enable rendering of whitespace.
	 * Defaults to 'selection'.
	 */
	renderWhitespace?: 'none' | 'boundary' | 'selection' | 'trailing' | 'all';
	/**
	 * Enable rendering of control characters.
	 * Defaults to true.
	 */
	renderControlCharacters?: boolean;
	/**
	 * Enable rendering of current line highlight.
	 * Defaults to all.
	 */
	renderLineHighlight?: 'none' | 'gutter' | 'line' | 'all';
	/**
	 * Control if the current line highlight should be rendered only the editor is focused.
	 * Defaults to false.
	 */
	renderLineHighlightOnlyWhenFocus?: boolean;
	/**
	 * Inserting and deleting whitespace follows tab stops.
	 */
	useTabStops?: boolean;
	/**
	 * The font family
	 */
	fontFamily?: string;
	/**
	 * The font weight
	 */
	fontWeight?: string;
	/**
	 * The font size
	 */
	fontSize?: number;
	/**
	 * The line height
	 */
	lineHeight?: number;
	/**
	 * The letter spacing
	 */
	letterSpacing?: number;
	/**
	 * Controls fading out of unused variables.
	 */
	showUnused?: boolean;
	/**
	 * Controls whether to focus the inline editor in the peek widget by default.
	 * Defaults to false.
	 */
	peekWidgetDefaultFocus?: 'tree' | 'editor';
	/**
	 * Controls whether the definition link opens element in the peek widget.
	 * Defaults to false.
	 */
	definitionLinkOpensInPeek?: boolean;
	/**
	 * Controls strikethrough deprecated variables.
	 */
	showDeprecated?: boolean;
	/**
	 * Controls whether suggestions allow matches in the middle of the word instead of only at the beginning
	 */
	matchOnWordStartOnly?: boolean;
	/**
	 * Control the behavior and rendering of the inline hints.
	 */
	inlayHints?: IEditorInlayHintsOptions;
	/**
	 * Control if the editor should use shadow DOM.
	 */
	useShadowDOM?: boolean;
	/**
	 * Controls the behavior of editor guides.
	*/
	guides?: IGuidesOptions;

	/**
	 * Controls the behavior of the unicode highlight feature
	 * (by default, ambiguous and invisible characters are highlighted).
	 */
	unicodeHighlight?: IUnicodeHighlightOptions;

	/**
	 * Configures bracket pair colorization (disabled by default).
	*/
	bracketPairColorization?: IBracketPairColorizationOptions;

	/**
	 * Controls dropping into the editor from an external source.
	 *
	 * When enabled, this shows a preview of the drop location and triggers an `onDropIntoEditor` event.
	 */
	dropIntoEditor?: IDropIntoEditorOptions;

	/**
	 * Controls whether the editor receives tabs or defers them to the workbench for navigation.
	 */
	tabFocusMode?: boolean;
}