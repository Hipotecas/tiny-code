import { Event } from 'vs/base/common/event';

export interface ILanguageSelection {
	readonly languageId: string;
	readonly onDidChange: Event<string>;
}
