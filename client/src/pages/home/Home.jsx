import React, { useContext, useState } from 'react'
import styles from './Home.module.css'
import Item from '../../components/item/Item'
import Search from '../../components/search/Search'
import Modal from '../../components/modal/Modal'
import AddForm from '../../components/addForm/AddForm'
import { useMutation, useQuery } from '@apollo/client'
import { GET_ALL_POSTS, GET_INFO_FROM_TOKEN } from '../../graphql/query'
import { ADD_NEW_POST, UPDATE_POST } from '../../graphql/mutation'
import { AuthContext } from '../../context/context'
import { useHistory } from 'react-router-dom'
import Loading from '../../components/loading/Loading'

const Home = () => {
  const history = useHistory()

  const { data, loading } = useQuery(GET_ALL_POSTS)
  const { data: currentUserData, loading: currentUserDataLoading } = useQuery(GET_INFO_FROM_TOKEN, {
    variables: { token: localStorage.getItem('token') },
  })
  const [addNewPost] = useMutation(ADD_NEW_POST)
  const [updatePost] = useMutation(UPDATE_POST)
  const [search, setSearch] = useState('')

  const [modal, setModal] = useState(false)

  const { setIsAuth } = useContext(AuthContext)

  const toggleModal = React.useCallback(() => setModal(!modal), [modal])
  const setSearchText = React.useCallback((text) => setSearch(text), [])

  const addNewItem = React.useCallback(
    async (title, desc, completed) => {
      try {
        await addNewPost({
          variables: {
            title: title,
            body: desc,
            completed: completed,
          },
        })
        window.location.reload()
        setModal(false)
      } catch (error) {
        alert(error)
      }
    },
    [addNewPost]
  )

  const insideModal = React.useMemo(() => {
    return <AddForm addNew={addNewItem} />
  }, [addNewItem])

  const onClickLogOut = () => {
    localStorage.removeItem('token')
    history.push('/')
    setIsAuth(false)
  }

  const onToggleCompleted = React.useCallback(
    async (id, completed) => {
      try {
        await updatePost({
          variables: {
            id: id,
            completed: completed,
          },
        })
        window.location.reload()
      } catch (error) {
        alert(error)
      }
    },
    [updatePost]
  )

  const filterItems = () => {
    return data?.posts?.filter((item) => {
      return (
        item?.title?.toUpperCase().includes(search.toUpperCase()) &
        (item?.author?.id === currentUserData?.getInfoFromToken?.id)
      )
    })
  }

  const renderComponent = () => {
    if (loading || currentUserDataLoading) {
      return <Loading />
    }
    return (
      <div className={styles.home}>
        <Modal visible={modal} setVisible={toggleModal}>
          {insideModal}
        </Modal>
        <button className={styles.logoutButton} onClick={onClickLogOut}>
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
          <Search search={search} setSearch={setSearchText} />
        </div>
        <h1 className={styles.title}>{search ? `Поиск по запросу: ${search}` : 'Все задачи'}</h1>
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
                  onToggleCompleted={onToggleCompleted}
                />
              )
            })
          ) : (
            <div>Задачи не были найдены</div>
          )}
        </div>
      </div>
    )
  }

  return renderComponent()
}

export default Home
