export interface Pagination {
  current: number
  pageSize: number
  total: number
  defaultCurrent?: number
  pageSizeOptions?: string[]
}

export interface WindowDetailModalProps {
  show: boolean
  record: Window
  setRecord: React.Dispatch<React.SetStateAction<Window>>
  onClickClose?: (...args: any[]) => any
  setWindowList: React.Dispatch<React.SetStateAction<Window[]>>
}

export interface WindowDeleteModalProps {
  show: boolean
  setWindowList: React.Dispatch<React.SetStateAction<Window[]>>
  deletedRowKeys: string[]
  onClickClose: (...args: any[]) => any
}

export interface WordAddModalProps {
  show: boolean
  setWindowList: React.Dispatch<React.SetStateAction<Window[]>>
  onClickClose: (...args: any[]) => any
}

export interface WordCheckModalProps {
  show: boolean
  existWordList?: Window[]
  onClickEditWordGroup: (...args: any[]) => any
  onClickOk: (...args: any[]) => any
  onClickClose: (...args: any[]) => any
}

export interface TableParam {
  page: number
  pageSize: number
}

export interface Window {
  seq: number
  name: string
  url: string
  type: string
  expose: boolean
  registerDate?: string
  lastModifierId: string
  lastModifiedDate?: string
}

export interface WordGroup {
  id: string
  representative: string
  headword: string
  wordGroupType: string
  wordGroupTypeName?: string
  tag: string
  fullCatNm?: string
  head: Window
  allWords: Window[]
  synonyms: string[]
  lastModifiedAt: string
  lastModifierId: string
  lastModifierNm: string
}

export interface WordHistory {
  historySeq: number // 히스토리 일련번호
  operationText: string // 생성, 수정, 삭제
  representative: string
  headword: string
  blankRemovedHeadword: string
  wordGroupType: string
  tag: string
  fullCatNm?: string
  headwordYn: string
  blankRemovedWord: string
  headwordSeq: number
  wordSeq: number
  forceAddingYn: string
  forceRemovingYn: string
  word: string
  createdAt: number
  modifiedAt: number
  modifierId: string
  modifierName: string
}
