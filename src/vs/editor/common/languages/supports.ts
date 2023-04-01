export class ScopedLineTokens {
  _scopedLineTokensBrand: void = undefined

  public readonly languageId: string;
	private readonly _actual: LineTokens;
	private readonly _firstTokenIndex: number;
	private readonly _lastTokenIndex: number;
	public readonly firstCharOffset: number;
	private readonly _lastCharOffset: number;

	constructor(
		actual: LineTokens,
		languageId: string,
		firstTokenIndex: number,
		lastTokenIndex: number,
		firstCharOffset: number,
		lastCharOffset: number
	) {
		this._actual = actual;
		this.languageId = languageId;
		this._firstTokenIndex = firstTokenIndex;
		this._lastTokenIndex = lastTokenIndex;
		this.firstCharOffset = firstCharOffset;
		this._lastCharOffset = lastCharOffset;
	}

  public getLineContent(): string {
		const actualLineContent = this._actual.getLineContent();
		return actualLineContent.substring(this.firstCharOffset, this._lastCharOffset);
	}

	public getActualLineContentBefore(offset: number): string {
		const actualLineContent = this._actual.getLineContent();
		return actualLineContent.substring(0, this.firstCharOffset + offset);
	}

	public getTokenCount(): number {
		return this._lastTokenIndex - this._firstTokenIndex;
	}

	public findTokenIndexAtOffset(offset: number): number {
		return this._actual.findTokenIndexAtOffset(offset + this.firstCharOffset) - this._firstTokenIndex;
	}

	public getStandardTokenType(tokenIndex: number): StandardTokenType {
		return this._actual.getStandardTokenType(tokenIndex + this._firstTokenIndex);
	}
}
