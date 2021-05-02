import React, { useState, useEffect, useCallback, useRef } from 'react'
import { Modal, Descriptions, Input, Row, Col, Switch, message, Spin } from 'antd'
import axios from 'axios'

import { Window, WindowDetailModalProps } from './type'

import { getTimeStamp, BASE_PATH } from './utils/utils'

const WindowDetailModal: React.FC<WindowDetailModalProps> = ({ show, record, setRecord, onClickClose, setWindowList }) => {
  useEffect(() => {
    console.log('record is ', record)
    if (!record) return
  }, [record])

  /**
   * 수정 버튼 클릭
   */
  const handleClickOk = () => {
    console.log('%c handleClickOk', 'color:red;')
    const makeMockUrl = (seq: number) => `http://localhost:4000/windows/${seq}`
    const mockUrl = makeMockUrl(record.seq)
    const lastModifiedDate = getTimeStamp()
    if (!record) return
    axios
      // .get(`${BASE_PATH}.nhn`)

      .put(`${mockUrl}`, {
        ...record,
        name: record.name,
        url: record.url,
        type: record.type,
        expose: record.expose,
        lastModifierId: 'KR11111',
        lastModifiedDate,
      })
      .then(response => {
        // const { error, result } = response.data
        // if (error) {
        //   showRequestError(error.msg)
        // } else {
        //   console.log("result.content : ", result.content)
        //   if (result) {
        //     setRecord(result.content)
        //     setShow(false)
        //   } else {
        //     alert("요청 실패");
        //     setShow(false)
        //     return
        //   }
        // }

        // setWindowList(updatedWindowList)
        setWindowList(prevWindowList =>
          prevWindowList.map(window => {
            if (window.seq === record.seq) {
              console.log('updatedRecord', record)
              return { ...record, lastModifiedDate }
            }
            return { ...window }
          }),
        )
      })
      .catch(() => {
        showRequestError()
      })
      .finally(() => {
        if (onClickClose) onClickClose();
        // onClickClose()
      })
  }

  /**
   * 취소 버튼 클릭
   */
  const handleClickCancel = useCallback(() => {
    if (onClickClose) onClickClose();
    // onClickClose()
    resetAllStates()
  }, [])

  /**
   * 에러 얼럿
   */
  const showRequestError = useCallback((errorMsg = '') => {
    message.error('요청에 실패하였습니다. ' + errorMsg)
  }, [])

  const handleChangeDelYn = (checked: boolean) => {
    setRecord({ ...record, expose: checked })
  }

  /**
   * 모달의 모든 상태 초기화
   */
  const resetAllStates = useCallback(() => {}, [])

  return (
    <>
      <Modal visible={show} centered={true} width={600} title={`${'수정'}`} onOk={handleClickOk} onCancel={handleClickCancel} okText="확인" cancelText="취소">
        {record && (
          <Descriptions column={1} bordered={true}>
            <Descriptions.Item label="윈도우명">
              <Row>
                <Col span={10}>
                  <Input
                    value={record.name}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      setRecord({ ...record, name: e.target.value })
                    }}></Input>
                </Col>
              </Row>
            </Descriptions.Item>
            <Descriptions.Item label="타입">
              <Row>
                <Col span={10}>
                  <Input
                    value={record.type}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      setRecord({ ...record, type: e.target.value })
                    }}></Input>
                </Col>
              </Row>
            </Descriptions.Item>
            <Descriptions.Item label="URL">
              <Row>
                <Col span={10}>
                  <Input
                    value={record.url}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      setRecord({ ...record, url: e.target.value })
                    }}></Input>
                </Col>
              </Row>
            </Descriptions.Item>
            <Descriptions.Item label="사용">
              <Switch checked={record.expose} onChange={handleChangeDelYn} />
            </Descriptions.Item>
          </Descriptions>
        )}
      </Modal>
    </>
  )
}

export default WindowDetailModal
