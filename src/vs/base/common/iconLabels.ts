import { ThemeIcon } from "vs/base/common/themables";

const iconStartMarker = '$(';

const iconsRegex = new RegExp(`\\$\\(${ThemeIcon.iconNameExpression}(?:${ThemeIcon.iconModifierExpression})?\\)`, 'g'); // no capturing groups

const escapeIconsRegex = new RegExp(`(\\\\)?${iconsRegex.source}`, 'g');
export function escapeIcons(text: string): string {
	return text.replace(escapeIconsRegex, (match, escaped) => escaped ? match : `\\${match}`);
}
