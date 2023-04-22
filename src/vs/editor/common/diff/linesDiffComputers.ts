
import { SmartLinesDiffComputer } from 'vs/editor/common/diff/smartLinesDiffComputer';
import { StandardLinesDiffComputer } from 'vs/editor/common/diff/standardLinesDiffComputer';

export const linesDiffComputers = {
	legacy: new SmartLinesDiffComputer(),
	advanced: new StandardLinesDiffComputer(),
};
