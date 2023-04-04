import {DisposableStore, IDisposable} from "vs/base/common/lifecycle";
import {URI} from "vs/base/common/uri";
import {PLAINTEXT_LANGUAGE_ID} from "vs/editor/common/languages/modesRegistry";
import {
  BracketPairColorizationOptions,
  DefaultEndOfLine,
  ITextBufferFactory,
  ITextModelCreationOptions
} from "vs/editor/common/model";
import {TextModel} from "vs/editor/common/model/textModel";
import {IInstantiationService} from "vs/platform/instantiation/common/instantiation";
import {ServiceIdCtorPair, createServices} from "vs/platform/instantiation/test/common/instantiationServiceMock";
import { INotificationService } from "vs/platform/notification/common/notification";
import { TestNotificationService } from "vs/platform/notification/test/common/testNotificationService";


class TestTextModel extends TextModel {
  public registerDisposable(disposable: IDisposable): void {
    this._register(disposable);
  }
}

export interface IRelaxedTextModelCreationOptions {
  tabSize?: number;
  indentSize?: number | 'tabSize';
  insertSpaces?: boolean;
  detectIndentation?: boolean;
  trimAutoWhitespace?: boolean;
  defaultEOL?: DefaultEndOfLine;
  isForSimpleWidget?: boolean;
  largeFileOptimizations?: boolean;
  bracketColorizationOptions?: BracketPairColorizationOptions;
}


function resolveOptions(_options: IRelaxedTextModelCreationOptions): ITextModelCreationOptions {
  const defaultOptions = TextModel.DEFAULT_CREATION_OPTIONS;
  return {
    tabSize: (typeof _options.tabSize === 'undefined' ? defaultOptions.tabSize : _options.tabSize),
    indentSize: (typeof _options.indentSize === 'undefined' ? defaultOptions.indentSize : _options.indentSize),
    insertSpaces: (typeof _options.insertSpaces === 'undefined' ? defaultOptions.insertSpaces : _options.insertSpaces),
    detectIndentation: (typeof _options.detectIndentation === 'undefined' ? defaultOptions.detectIndentation : _options.detectIndentation),
    trimAutoWhitespace: (typeof _options.trimAutoWhitespace === 'undefined' ? defaultOptions.trimAutoWhitespace : _options.trimAutoWhitespace),
    defaultEOL: (typeof _options.defaultEOL === 'undefined' ? defaultOptions.defaultEOL : _options.defaultEOL),
    isForSimpleWidget: (typeof _options.isForSimpleWidget === 'undefined' ? defaultOptions.isForSimpleWidget : _options.isForSimpleWidget),
    largeFileOptimizations: (typeof _options.largeFileOptimizations === 'undefined' ? defaultOptions.largeFileOptimizations : _options.largeFileOptimizations),
    bracketPairColorizationOptions: (typeof _options.bracketColorizationOptions === 'undefined' ? defaultOptions.bracketPairColorizationOptions : _options.bracketColorizationOptions),
  };
}

export function withEditorModel(text: string[], callback: (model: TextModel) => void): void {
  const model = createTextModel(text.join('\n'))
  callback(model)
  model.dispose()
}

export function createTextModel(text: string | ITextBufferFactory, languageId: string | null = null, options: IRelaxedTextModelCreationOptions = TextModel.DEFAULT_CREATION_OPTIONS, uri: URI | null = null): TextModel {
  const disposables = new DisposableStore()
  const instantiationService = createModelServices(disposables)
  const model = instantiateTextModel(instantiationService, text, languageId, options, uri)
  model.registerDisposable(disposables)
  return model
}

export function instantiateTextModel(instantiationService: IInstantiationService, text: string | ITextBufferFactory, languageId: string | null = null, _options: IRelaxedTextModelCreationOptions = TextModel.DEFAULT_CREATION_OPTIONS, uri: URI | null = null): TestTextModel {
  const options = resolveOptions(_options)
  return instantiationService.createInstance(TestTextModel, text, languageId || PLAINTEXT_LANGUAGE_ID, options, uri)
}

export function createModelServices(disposables: DisposableStore, services: ServiceIdCtorPair<any>[] = []): IInstantiationService {
  return createServices(disposables, services.concat([
    INotificationService, TestNotificationService 
  ]))
}