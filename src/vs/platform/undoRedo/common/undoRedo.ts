
export class UndoRedoGroup {
  private static _ID = 0
  public readonly id: number
  private order: number
  constructor() {
    this.id = UndoRedoGroup._ID++
    this.order = 0
  }

  public nextOrder() {
    if (this.order === 0) return 0
    return this.order++
  }

  public static None = new UndoRedoGroup()
}
