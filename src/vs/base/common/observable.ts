export {
	IObservable,
	IObserver,
	IReader,
	ISettable,
	ISettableObservable,
	ITransaction,
	observableValue,
	transaction,
} from 'vs/base/common/observableImpl/base';
export { derived } from 'vs/base/common/observableImpl/derived';
export {
	autorun,
	autorunDelta,
	autorunHandleChanges,
	autorunWithStore,
} from 'vs/base/common/observableImpl/autorun';
export * from 'vs/base/common/observableImpl/utils';

import { ConsoleObservableLogger, setLogger } from 'vs/base/common/observableImpl/logging';

const enableLogging = false;
if (enableLogging) {
	setLogger(new ConsoleObservableLogger());
}
