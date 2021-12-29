import React, { useContext, useState } from 'react'
import styles from './MyTodos.module.css'
import Item from '../../components/item/Item'
import Search from '../../components/search/Search'
import Modal from '../../components/modal/Modal'
import AddForm from '../../components/addForm/AddForm'
import { useMutation, useQuery } from '@apollo/client'
import { GET_ALL_POSTS, GET_CURRENT_USER } from '../../graphql/query'
import { ADD_NEW_POST, UPDATE_POST } from '../../graphql/mutation'
import { AuthContext } from '../../context/context'
import { useHistory } from 'react-router-dom'
import Loading from '../../components/loading/Loading'

const Home = () => {
  const history = useHistory()

  const { data: currentUserData, loading: currentUserLoading } = useQuery(GET_CURRENT_USER)

  const [todos, setTodos] = useState([])

  const { loading } = useQuery(GET_ALL_POSTS, {
    onCompleted: ({ posts }) => {
      setTodos(posts)
    },
  })
  const [addNewPost] = useMutation(ADD_NEW_POST, {
    onCompleted: ({ addPost: newPost }) => {
      setTodos([...todos, newPost])
    },
  })
  const [updatePost] = useMutation(UPDATE_POST)

  const [search, setSearch] = useState('')
  const [modal, setModal] = useState(false)

  const { setIsAuth } = useContext(AuthContext)

  const toggleModal = React.useCallback(() => setModal(!modal), [modal])
  const setSearchText = React.useCallback((text) => setSearch(text), [])

  const addNewTask = React.useCallback(
    async (title, desc, completed) => {
      try {
        await addNewPost({
          variables: {
            title: title,
            body: desc,
            completed: completed,
          },
        })
        setModal(false)
      } catch (error) {
        alert(error)
        console.log(error)
      }
    },
    [addNewPost]
  )

  const insideModal = React.useMemo(() => {
    return <AddForm addNew={addNewTask} />
  }, [addNewTask])

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

  console.log('61ccd70f9d023aefafb34aa5' === currentUserData?.getCurrentUser.id)

  const filterItems = () => {
    return todos?.filter(
      (item) =>
        item?.title.toUpperCase().includes(search.toUpperCase()) &
        (item?.author.id === currentUserData?.getCurrentUser.id)
    )
  }

  console.log(filterItems())

  if (loading || currentUserLoading) {
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
        {filterItems()?.length === 0 && <p>Посты не были найдены</p>}
        {filterItems()?.map((i, index) => {
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
        })}
      </div>
    </div>
  )
}

export default Home
