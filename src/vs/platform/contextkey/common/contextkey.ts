

export interface ContextKeyInfo {
	readonly key: string;
	readonly type?: string;
	readonly description?: string;
}
export type ContextKeyValue = null | undefined | boolean | number | string
	| Array<null | undefined | boolean | number | string>
	| Record<string, null | undefined | boolean | number | string>;

export class RawContextKey<T extends ContextKeyValue> {
  constructor(key: string,defaultValue: T | undefined, metaOrHide?: string | true | { type: string; description: string }) {}
}
