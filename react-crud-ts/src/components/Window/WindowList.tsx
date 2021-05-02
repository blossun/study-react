import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Button, Icon, Form, Input, Row, Table, Divider, message, Modal, Switch, Checkbox, Select, Col } from 'antd'
import axios from 'axios'
import { WrappedFormUtils } from 'antd/lib/form/Form'

import { Window, Pagination, TableParam } from './type/index'
import WindowAddModal from './WindowAddModal'
import WindowDetailModal from './WindowDetailModal'
// import { getNumberFormatWithComma } from 'service/utils/format'

import { BASE_PATH } from './utils/utils'
import WindowDeleteModal from './WindowDeleteModal'
import { getNumberFormatWithComma } from '../../service/utils/format'

interface Props {
  form: WrappedFormUtils
}

const WindowList: React.FC<Props> = ({ form }) => {
  const [pagination, setPagination] = useState<Pagination>({
    current: 1,
    defaultCurrent: 1,
    pageSize: 20,
    total: 0,
    pageSizeOptions: ['20', '50', '100'],
  })
  const prevPage = useRef<Pagination>()

  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [showWindowDetailModal, setShowWindowDetailModal] = useState<boolean>(false)
  const [showWindowAddModal, setShowWindowAddModal] = useState<boolean>(false)
  const [showWindowDeleteModal, setShowWindowDeleteModal] = useState<boolean>(false)
  const [selectedRecord, setSelectedRecord] = useState<Window>(null!)

  const [totalDocumentsNumber, setTotalDocumentsNumber] = useState<number>(0)

  const [windowList, setWindowList] = useState<Window[]>([])
  const [deletedRowKeys, setDeletedRowKeys] = useState<string[]>([])

  /**
   * 에러 얼럿
   */
  const showRequestError = useCallback((errorMsg = '') => {
    message.error('요청에 실패하였습니다. ' + errorMsg)
  }, [])

  /**
   * 데이터 목록 조회
   */
  const fetchWindowList = useCallback(
    (tableParams?: TableParam) => {
      const { keyword, partialMatch, modifierId, forceRemovingYn } = form.getFieldsValue()
      const params = {
        keyword,
        partialMatch,
        modifierId,
        forceRemovingYn: !forceRemovingYn ? '' : forceRemovingYn === 'N' ? 'Y' : 'N',
        pagingSize: (tableParams && tableParams.pageSize) || pagination.pageSize,
        page: (tableParams && tableParams.page) || pagination.current,
      }
      setIsLoading(true)
      axios
        // .get(`${BASE_PATH}/windows.nhn`, { params })
        .get(`http://localhost:4000/windows`, { params })
        .then(response => {
          // const { error, result } = response.data
          console.log('response.data : ', response.data[0])

          // const nextPagination = {
          //   ...pagination,
          //   current: result.pageable.pageNumber + 1,
          //   total: result.totalElements < 10000 ? result.totalElements : 10000,
          // }
          //setPagination(nextPagination)
          //prevPage.current = nextPagination
          setWindowList(response.data)
          setTotalDocumentsNumber(response.data.length)
        })
        .catch(() => {
          showRequestError()
        })
        .finally(() => {
          setIsLoading(false)
        })
    },
    [pagination],
  )

  /**
   * 데이터 조회 호출
   */
  useEffect(() => {
    if (pagination.current !== (prevPage.current && prevPage.current.current) || pagination.pageSize !== (prevPage.current && prevPage.current.pageSize)) {
      fetchWindowList()
    }
  }, [fetchWindowList, pagination])

  /**
   * 조회
   */
  const onSubmit = useCallback(
    event => {
      event.preventDefault()
      fetchWindowList()
    },
    [fetchWindowList],
  )

  /**
   * 추가 모달
   */
  const handleClickAddWindow = () => {
    setShowWindowAddModal(true)
  }

  /**
   * Modal 닫기
   */
  const onClickModalClose = useCallback(() => {
    setShowWindowDetailModal(false)
    setShowWindowAddModal(false)
    setShowWindowDeleteModal(false)
  }, [])

  /**
   * 데이터 삭제
   */
  const handleClickDeleteWindow = () => {
    setShowWindowDeleteModal(true)
    // axios
    //   .post(`${BASE_PATH}/mall/delete.nhn`, {
    //     // idList: selectedRowKeys,
    //   })
    //   .then(response => {
    //     if (response.data.result) {
    //       message.info('삭제 하였습니다.')
    //     }
    //   })
    //   .catch(() => {
    //     message.error('요청이 실패하였습니다.')
    //   })
    //   .finally(() => {
    //     setIsLoading(false)
    //     fetchWindowList()
    //     setShowDeleteConfirmModal(false)
    //   })
  }

  /**
   * 테이블 페이지 변경
   */
  const handleChangePage = useCallback(pagination => {
    setPagination(pagination)
  }, [])

  /**
   * Columns 정의
   */
  const windowListColumns = useMemo(() => {
    const allColumns = [
      {
        title: '윈도우명',
        dataIndex: 'name',
        key: 'name',
        render: (name: string, record: Window) => {
          console.log('name is ', name)
          return (
            <>
              <a href={record.url}>{name}</a>
            </>
          )
        },
      },
      {
        title: '타입',
        dataIndex: 'type',
        key: 'type',
        render: (type: string) => <span>{type}</span>,
      },
      {
        title: '노출여부',
        dataIndex: 'expose',
        key: 'expose',
        width: 100,
        render: (expose: string) => <span>{expose ? 'Y' : 'N'}</span>,
      },
      {
        title: '최종 수정일시',
        key: 'lastModifiedDate',
        dataIndex: 'lastModifiedDate',
        render: (lastModifiedDate: string) => <span>{lastModifiedDate}</span>,
      },
      {
        title: '작업자ID',
        key: 'lastModifierId',
        dataIndex: 'lastModifierId',
        render: (lastModifierId: string) => <span>{lastModifierId || 'System'}</span>,
      },
    ]
    return allColumns
  }, [])

  return (
    <>
      <Form onSubmit={onSubmit} layout="inline">
        <Row justify="space-between" type="flex">
          <Col>
            <Form.Item label="윈도우명">{form.getFieldDecorator('windowName')(<Input placeholder="키워드" allowClear={true} />)}</Form.Item>

            <Form.Item label="키워드">{form.getFieldDecorator('keyword')(<Input placeholder="키워드" allowClear={true} />)}</Form.Item>
            <Form.Item label="일치조건">
              {form.getFieldDecorator('partialMatch', {
                initialValue: true,
              })(<Checkbox checked={form.getFieldValue('partialMatch')}>부분매치</Checkbox>)}
            </Form.Item>
            <Form.Item label="작업자">{form.getFieldDecorator('modifierId')(<Input placeholder="작업자Id" allowClear={true} />)}</Form.Item>
            <Form.Item label="사용여부">
              {form.getFieldDecorator('forceRemovingYn', {
                initialValue: '',
              })(
                <Select style={{ width: 120 }}>
                  <Select.Option value="">전체</Select.Option>
                  <Select.Option value="Y">Y</Select.Option>
                  <Select.Option value="N">N</Select.Option>
                </Select>,
              )}
            </Form.Item>
          </Col>
        </Row>
      </Form>
      <Row justify="end" type="flex" gutter={8} style={{ paddingTop: '10px' }}>
        <Col>
          <Button type="primary" htmlType="submit">
            검색
          </Button>
        </Col>
        <Col>
          <Button type="primary" onClick={handleClickAddWindow}>
            추가
          </Button>
        </Col>
        <Col>
          <Button type="primary" style={{ backgroundColor: 'red', borderColor: 'red' }} onClick={handleClickDeleteWindow}>
            삭제
          </Button>
        </Col>
      </Row>
      <Divider />
      <Table
        onRow={record => {
          return {
            onClick: e => {
              setSelectedRecord(record)
              setShowWindowDetailModal(true)
            },
          }
        }}
        title={() => `전체 ${getNumberFormatWithComma(totalDocumentsNumber || 0)} 건`}
        rowKey={row => `${row.seq}`}
        columns={windowListColumns}
        pagination={pagination}
        dataSource={windowList}
        onChange={handleChangePage}
        loading={isLoading}
        rowSelection={{
          onChange: selectedRowKeys => {
            console.log('selectedRowKeys : ', selectedRowKeys)
            setDeletedRowKeys(selectedRowKeys as string[])
            // @todo: 서버에 Delete 요청 보내기 delete index 배열을 받을 수 있게 api제작
            // setSelectedRowKeys(selectedRowKeys)
          },
        }}
      />
      <WindowAddModal show={showWindowAddModal} setWindowList={setWindowList} onClickClose={onClickModalClose} />
      <WindowDetailModal show={showWindowDetailModal} setWindowList={setWindowList} record={selectedRecord} setRecord={setSelectedRecord} onClickClose={onClickModalClose} />
      <WindowDeleteModal show={showWindowDeleteModal} setWindowList={setWindowList} deletedRowKeys={deletedRowKeys} onClickClose={onClickModalClose} />
    </>
  )
}

export default Form.create({ name: 'window' })(WindowList)
