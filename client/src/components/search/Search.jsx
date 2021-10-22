import React from 'react'
import styles from './Search.module.css'
import searchImg from '../../img/search.svg'

const Search = ({ setSearch, search }) => {
  return (
    <div className={styles.search}>
      <input
        value={search}
        onChange={(e) => {
          setSearch(e.target.value)
        }}
        className={styles.input}
        type="text"
      />
      <img width={20} height={20} src={searchImg} alt="search" />
    </div>
  )
}

export default Search
