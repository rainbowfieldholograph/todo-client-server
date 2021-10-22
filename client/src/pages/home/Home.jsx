import React, { useState } from 'react'
import styles from './Home.module.css'
import Item from '../../components/item/Item'
import Search from '../../components/search/Search'
import Modal from '../../components/modal/Modal'
import AddForm from '../../components/addForm/AddForm'
import { useMutation, useQuery } from '@apollo/client'
import { GET_ALL_POSTS, GET_INFO_FROM_TOKEN } from '../../graphql/query'
import { ADD_NEW_POST } from '../../graphql/mutation'
import { Redirect } from 'react-router'

const Home = () => {
  const { data, loading } = useQuery(GET_ALL_POSTS)
  const { data: currentUserData, loading: currentUserDataLoading } = useQuery(GET_INFO_FROM_TOKEN, {
    variables: { token: localStorage.getItem('token') },
  })
  const [addNewPost] = useMutation(ADD_NEW_POST)
  const [redir, setRedir] = useState(false)
  const [search, setSearch] = useState('')

  !currentUserDataLoading && console.log('currentUserData: ', currentUserData)

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

  // const onToggleCompleted = (index) => {
  //   setItems((prevItems) =>
  //     prevItems.map((task, curIdx) =>
  //       index === curIdx
  //         ? {
  //             ...task,
  //             completed: !task.completed,
  //           }
  //         : task
  //     )
  //   )
  // }

  const onClickLogOut = () => {
    console.log('userLogOut')
    localStorage.removeItem('token')
    setRedir(true)
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

  return (
    <div className={styles.home}>
      {redir && <Redirect to="/" />}
      {loading & currentUserData ? (
        <div>Loading...</div>
      ) : (
        <>
          {console.log('Data: ', data)}
          {/* {console.log('Token: ', localStorage.getItem('token'))} */}
          <Modal visible={modal} setVisible={setModal}>
            <AddForm setModal={setModal} addNew={addNewItem} />
          </Modal>
          <button onClick={() => onClickLogOut()}>LOGOUT</button>
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
          {filterItems().map((i, index) => {
            console.log(i.id)
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
          })}
        </>
      )}
    </div>
  )
}

export default Home
