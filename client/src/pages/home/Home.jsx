import React, { useState } from 'react'
import styles from './Home.module.css'
import Item from '../../components/item/Item'
import Search from '../../components/search/Search'
import Modal from '../../components/modal/Modal'
import AddForm from '../../components/addForm/AddForm'
import { useMutation, useQuery } from '@apollo/client'
import { GET_ALL_POSTS, GET_INFO_FROM_TOKEN } from '../../graphql/query'
import { ADD_NEW_POST } from '../../graphql/mutation'

const Home = () => {
  const { data, loading } = useQuery(GET_ALL_POSTS)
  const { data: currentUserData, loading: currentUserDataLoading } = useQuery(GET_INFO_FROM_TOKEN, {
    variables: { token: localStorage.getItem('token') },
  })
  const [addNewPost] = useMutation(ADD_NEW_POST)
  const [search, setSearch] = useState('')

  const addNewItem = async (title, desc, completed = false) => {
    try {
      await addNewPost({
        variables: {
          title: title,
          body: desc,
        },
      })
    } catch (error) {
      alert(error)
    }
  }

  const onClickLogOut = () => {
    localStorage.removeItem('token')
    window.location.assign('/')
  }

  const filterItems = () => {
    return data?.posts?.filter((item) => {
      return (
        item?.title?.toUpperCase().includes(search.toUpperCase()) &
        (item?.author?.id === currentUserData?.getInfoFromToken?.id)
      )
    })
  }

  const [modal, setModal] = useState(false)

  !localStorage.getItem('token') && window.location.assign('/')

  const renderContent = () => {
    if (loading || currentUserDataLoading) {
      return <div>Loading...</div>
    }
    return (
      <>
        <Modal visible={modal} setVisible={setModal}>
          <AddForm setModal={setModal} addNew={addNewItem} />
        </Modal>
        <button className={styles.logoutButton} onClick={() => onClickLogOut()}>
          LOGOUT
        </button>
        <div className={styles.box}>
          <button
            onClick={() => {
              setModal(true)
            }}
            className={styles.btn}
          >
            Добавить новую задачу
          </button>
          <Search search={search} setSearch={setSearch} />
        </div>
        <h1>{search ? `Поиск по запросу: ${search}` : 'Все задачи'}</h1>
        <div className={styles.contentBox}>
          {data?.posts?.length !== 0 ? (
            filterItems()?.map((i, index) => {
              return (
                <Item
                  key={i.id + index}
                  postId={i.id}
                  title={i.title}
                  desc={i.body}
                  completed={i.completed}
                  index={index}
                />
              )
            })
          ) : (
            <div>Задачи не были найдены</div>
          )}
        </div>
      </>
    )
  }

  return <div className={styles.home}>{renderContent()}</div>
}

export default Home
