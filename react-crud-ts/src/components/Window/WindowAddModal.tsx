import React, { useCallback, useEffect, useState, useMemo } from 'react'
import { Modal, Descriptions, Input, Button, Row, Col, Switch, Radio, message, Tag } from 'antd'
import axios from 'axios'

import { WordAddModalProps, Window } from './type'

import { getTimeStamp, BASE_PATH } from './utils/utils'

const WindowAddModal: React.FC<WordAddModalProps> = ({ show, setWindowList, onClickClose }) => {
  const [windowName, setWindowName] = useState<string>('')
  const [windowType, setWindowType] = useState<string>('')
  const [windowUrl, setWindowUrl] = useState<string>('')
  const [windowExpose, setWindowExpose] = useState<boolean>(true)

  /**
   * 초기화
   */
  useEffect(() => {
    if (!show) {
      resetAllStates()
    }
  }, [show])

  /**
   * 에러 얼럿
   */
  const showRequestError = useCallback((errorMsg = '') => {
    message.error('요청에 실패하였습니다. ' + errorMsg)
  }, [])

  /**
   * 사용여부 변경
   */
  const handleChangeDelYn = (checked: boolean) => setWindowExpose(checked)

  const handleChangeUrl = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWindowUrl(e.target.value)
  }

  /**
   * 모달의 모든 상태 초기화
   */
  const resetAllStates = () => {
    setWindowName('')
    setWindowType('')
    setWindowUrl('')
    setWindowExpose(true)
  }

  /**
   * 추가 버튼 클릭
   */
  const handleClickOk = () => {
    if (!windowName || !windowType || !windowUrl) {
      Modal.warn({
        centered: true,
        content: '필수정보가 입력되지 않았습니다.',
        okText: '확인',
      })
      return
    }

    const mockUrl = 'http://localhost:4000/windows/'
    const param = {
      name: windowName,
      type: windowType,
      url: windowUrl,
      expose: windowExpose,
      registerDate: getTimeStamp(),
      lastModifierId: 'KR33333',
      lastModifiedDate: getTimeStamp(),
    }

    axios
      // .post(`${BASE_PATH}.nhn`, wordGroup)
      .post(`${mockUrl}`, param)
      .then(response => {
        // const { error, result } = response.data
        // if (error || !result) {
        //   showRequestError(error.msg)
        //   return
        // }
        // if (result < 0) {
        //   message.error('해당 표제어와 동일한 정보를 가진 단어가 이미 등록되어있습니다.')
        //   return
        // }
        // message.info('등록되었습니다')
        // onClickClose()
        console.log('response is', response)

        const record = {
          ...param,
          seq: response.data.id,
        }

        setWindowList(prevWindowList => [...prevWindowList, record])
      })
      .catch(() => {
        showRequestError()
      })
      .finally(() => {
        onClickClose()
      })
  }

  return (
    <>
      <Modal visible={show} centered={true} width={600} title="윈도우 추가" onOk={handleClickOk} onCancel={onClickClose} okText="확인" cancelText="취소">
        <Descriptions column={1} bordered={true}>
          <Descriptions.Item label="윈도우명">
            <Row>
              <Col span={18}>
                <Input
                  value={windowName}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setWindowName(e.target.value)
                  }}
                />
              </Col>
            </Row>
          </Descriptions.Item>
          <Descriptions.Item label="타입">
            <Row>
              <Col span={18}>
                <Input
                  value={windowType}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setWindowType(e.target.value)
                  }}
                />
              </Col>
            </Row>
          </Descriptions.Item>
          <Descriptions.Item label="URL">
            <Row>
              <Col span={18}>
                <Input value={windowUrl} onChange={handleChangeUrl} />
              </Col>
            </Row>
          </Descriptions.Item>
          <Descriptions.Item label="사용">
            <Switch checked={windowExpose} onChange={handleChangeDelYn} />
          </Descriptions.Item>
        </Descriptions>
      </Modal>
    </>
  )
}

export default WindowAddModal
