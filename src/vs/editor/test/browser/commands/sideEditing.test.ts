// @vitest-environment jsdom

import { Selection} from "vs/editor/common/core/selection";
import {EditOperation, ISingleEditOperation} from "vs/editor/common/core/editOperation";
import { withTestCodeEditor } from 'vs/editor/test/browser/testCodeEditor';
import { Range } from 'vs/editor/common/core/range';
import { Position } from 'vs/editor/common/core/position';
import { expect, describe, test } from 'vitest'

function testCommand(lines: string[], selections: Selection[], edits: ISingleEditOperation[], expectedLines: string[], expectedSelections: Selection[]) {
  withTestCodeEditor(lines, {}, (editor, viewModel) => {
    const model = editor.getModel()

    viewModel.setSelections('tests', selections)

    model.applyEdits(edits)

    expect(model.getLinesContent()).toStrictEqual(expectedLines)

    const actualSelections = viewModel.getSelections()

    expect(actualSelections.map(s => s.toString())).toStrictEqual(expectedSelections.map(s => s.toString()))
  })
}


describe("Editor Side Editing - collapsed selection", () => {
  beforeAll(() => {
    Object.defineProperty(window, "matchMedia", {
      writable: true,
      value: vi.fn().mockImplementation(query => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: vi.fn(), // Deprecated
        removeListener: vi.fn(), // Deprecated
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      }))
    });
  });
	test('replace at selection', () => {
		testCommand(
			[
				'first',
				'second line',
				'third line',
				'fourth'
			],
			[new Selection(1, 1, 1, 1)],
			[
				EditOperation.replace(new Selection(1, 1, 1, 1), 'something ')
			],
			[
				'something first',
				'second line',
				'third line',
				'fourth'
			],
			[new Selection(1, 11, 1, 11)]
		);
	});

	test('replace at selection 2', () => {
		testCommand(
			[
				'first',
				'second line',
				'third line',
				'fourth'
			],
			[new Selection(1, 1, 1, 6)],
			[
				EditOperation.replace(new Selection(1, 1, 1, 6), 'something')
			],
			[
				'something',
				'second line',
				'third line',
				'fourth'
			],
			[new Selection(1, 1, 1, 10)]
		);
	});

	test('insert at selection', () => {
		testCommand(
			[
				'first',
				'second line',
				'third line',
				'fourth'
			],
			[new Selection(1, 1, 1, 1)],
			[
				EditOperation.insert(new Position(1, 1), 'something ')
			],
			[
				'something first',
				'second line',
				'third line',
				'fourth'
			],
			[new Selection(1, 11, 1, 11)]
		);
	});

	test('insert at selection sitting on max column', () => {
		testCommand(
			[
				'first',
				'second line',
				'third line',
				'fourth'
			],
			[new Selection(1, 6, 1, 6)],
			[
				EditOperation.insert(new Position(1, 6), ' something\nnew ')
			],
			[
				'first something',
				'new ',
				'second line',
				'third line',
				'fourth'
			],
			[new Selection(2, 5, 2, 5)]
		);
	});

	test('issue #3994: replace on top of selection', () => {
		testCommand(
			[
				'$obj = New-Object "system.col"'
			],
			[new Selection(1, 30, 1, 30)],
			[
				EditOperation.replaceMove(new Range(1, 19, 1, 31), '"System.Collections"')
			],
			[
				'$obj = New-Object "System.Collections"'
			],
			[new Selection(1, 39, 1, 39)]
		);
	});

	test('issue #15267: Suggestion that adds a line - cursor goes to the wrong line ', () => {
		testCommand(
			[
				'package main',
				'',
				'import (',
				'	"fmt"',
				')',
				'',
				'func main(',
				'	fmt.Println(strings.Con)',
				'}'
			],
			[new Selection(8, 25, 8, 25)],
			[
				EditOperation.replaceMove(new Range(5, 1, 5, 1), '\t\"strings\"\n')
			],
			[
				'package main',
				'',
				'import (',
				'	"fmt"',
				'	"strings"',
				')',
				'',
				'func main(',
				'	fmt.Println(strings.Con)',
				'}'
			],
			[new Selection(9, 25, 9, 25)]
		);
	});

	test('issue #15236: Selections broke after deleting text using vscode.TextEditor.edit ', () => {
		testCommand(
			[
				'foofoofoo, foofoofoo, bar'
			],
			[new Selection(1, 1, 1, 10), new Selection(1, 12, 1, 21)],
			[
				EditOperation.replace(new Range(1, 1, 1, 10), ''),
				EditOperation.replace(new Range(1, 12, 1, 21), ''),
			],
			[
				', , bar'
			],
			[new Selection(1, 1, 1, 1), new Selection(1, 3, 1, 3)]
		);
	});
})

