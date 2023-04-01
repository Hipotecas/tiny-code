
import { SmartLinesDiffComputer } from 'vs/editor/common/diff/smartLinesDiffComputer';
import { StandardLinesDiffComputer } from 'vs/editor/common/diff/standardLinesDiffComputer';

export const linesDiffComputers = {
	smart: new SmartLinesDiffComputer(),
	experimental: new StandardLinesDiffComputer(),
};
