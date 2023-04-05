

export interface ICodeEditorWidgetOptions {
	/**
	 * Is this a simple widget (not a real code editor)?
	 * Defaults to false.
	 */
	isSimpleWidget?: boolean;

  // TODO: use any replace IEditorContributionDescription
	/**
	 * Contributions to instantiate.
	 * Defaults to EditorExtensionsRegistry.getEditorContributions().
	 */
	contributions?: any[];

	/**
	 * Telemetry data associated with this CodeEditorWidget.
	 * Defaults to null.
	 */
	telemetryData?: object;
}
