import React, { useCallback, useEffect, useState, useMemo } from 'react'
import { Modal, Descriptions, Input, Button, Row, Col, Switch, Radio, message, Tag } from 'antd'
import axios from 'axios'

import { WindowDeleteModalProps } from './type'

import { getTimeStamp, BASE_PATH } from './utils/utils'

const WindowDeleteModal: React.FC<WindowDeleteModalProps> = ({ show, setWindowList, deletedRowKeys, onClickClose }) => {
  /**
   * 에러 얼럿
   */
  const showRequestError = useCallback((errorMsg = '') => {
    message.error('요청에 실패하였습니다. ' + errorMsg)
  }, [])

  /**
   * 추가 버튼 클릭
   */
  const onClickDelete = () => {
    const deleteRequests = deletedRowKeys.map(seq => {
      return axios.delete(`http://localhost:4000/windows/${seq}`)
    })

    axios
      .all([...deleteRequests])
      .then(() => {
        console.log('delete!!')
        setWindowList(prevWindowList => {
          const filteredWindowList = prevWindowList.filter(window => {
            // console.log('window is', window, window.seq, deletedRowKeys);
            // console.log('filter condition is', deletedRowKeys.includes(`${window.seq}`));
            return !deletedRowKeys.includes(`${window.seq}`)
          })
          console.log('filteredWindowList', filteredWindowList)
          return filteredWindowList
        })
      })
      .catch(e => {
        console.log('%c message', e.message)
      })
    onClickClose()
    // const mockUrl = 'http://localhost:4000/windows/'
    // const param = {
    //   name: windowName,
    //   type: windowType,
    //   url: windowUrl,
    //   expose: windowExpose,
    //   registerDate: getTimeStamp(),
    //   lastModifierId: 'KR33333',
    //   lastModifiedDate: getTimeStamp()
    // }

    // axios
    //   // .post(`${BASE_PATH}.nhn`, wordGroup)
    //   .post(`${mockUrl}`, param)
    //   .then(response => {
    //     // const { error, result } = response.data
    //     // if (error || !result) {
    //     //   showRequestError(error.msg)
    //     //   return
    //     // }
    //     // if (result < 0) {
    //     //   message.error('해당 표제어와 동일한 정보를 가진 단어가 이미 등록되어있습니다.')
    //     //   return
    //     // }
    //     // message.info('등록되었습니다')
    //     // onClickClose()
    //     console.log('response is',response);

    //     const record = {
    //       ...param,
    //       seq: response.data.id,
    //     }

    //     setWindowList((prevWindowList) => [...prevWindowList, record])
    //   })
    //   .catch(() => {
    //     showRequestError()
    //   })
    //   .finally(() => {
    //     onClickClose();
    //   })
  }

  return (
    <>
      <Modal title={'삭제'} visible={show} onOk={onClickDelete} onCancel={onClickClose} okText="삭제" cancelText="취소">
        <p>선택한 몰을 삭제 하시겠습니까?</p>
      </Modal>
    </>
  )
}

export default WindowDeleteModal
