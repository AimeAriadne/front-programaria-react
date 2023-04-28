import { useState, useEffect } from 'react'
import listaImg from '../assets/lista.svg'
import { Header } from './Header.jsx'
import { Footer } from './Footer.jsx'

import Axios from 'axios'

import styles from '../styles/content.module.css'

export function Content() {
  const [repositories, setRepositories] = useState([])
  const [name, setNome] = useState('')
  const [bio, setminibio] = useState('')
  const [quote, setCitacao] = useState('')
  const [image, setImagem] = useState('')
  const [success, setSuccess] = useState(false)
  const baseURL = 'https://programaria-backend.onrender.com/women'

  useEffect(() => {
    async function getData() {
      const response = await Axios.get(baseURL)
      setRepositories(response.data)
    }
    getData()
  }, [])

  function handleInputValueNome(event) {
    setNome(event.target.value)
  }

  function handleInputValueminibio(event) {
    setminibio(event.target.value)
  }

  function handleInputValueImagem(event) {
    setImagem(event.target.value)
  }

  function handleInputValueCitacao(event) {
    setCitacao(event.target.value)
  }

  function handleCreateMessage(event) {
    event.preventDefault()

    console.log('mensagem enviada', name, image, bio, quote)

    async function sendData() {
      await Axios.post(baseURL, {
        name: name,
        image: image,
        bio: bio,
        quote: quote,
      })
      const response = await Axios.get(baseURL)
      setRepositories(response.data)
    }
    sendData()

    setSuccess(true)
    setNome('')
    setminibio('')
    setImagem('')
    setCitacao('')
  }

  return (
    <>
      <Header
        title='Mulheres em Tech Brasil'
        subtitle='Conheça personalidades femininas que estão transformando a tecnologia no Brasil'
        image={listaImg}
      />
      <div className={styles.projectsContainer}>
        <div className={styles.projectsContainer}>
          <div className={styles.cardsRepoContainer}>
            {repositories.map((repo) => {
              return(
                <div key={repo._id} className={styles.cardRepo}>
                <div className={styles.cardImgContainer}>
                  <img className={styles.cardRepoImage} src={repo.image} />
                </div>
                <details>
                  <summary className={styles.cardRepoSummary}>
                    {repo.name}
                  </summary>
                  <p className={styles.cardRepoText}>{repo.bio}</p>
                  <q className={styles.cardRepoQuote}>{repo.quote}</q>
                </details>
              </div>
              )
            })}
          </div>
        </div>
      </div>
      <div >
        <h2 className={styles.projectsTitle}>Cadastre uma rainha tech:</h2>
        <form  className={styles.form} onSubmit={handleCreateMessage}>
          <input 
            onChange={handleInputValueNome} 
            placeholder="Digite o nome"
            value={name}
            className={styles.formInput}
          />
          <textarea 
            onChange={handleInputValueImagem} 
            placeholder="Digite o link da imagem"
            value={image}
            className={styles.formTextArea}
          />
          <textarea 
            onChange={handleInputValueminibio} 
            placeholder="Digite a minibiografia"
            value={bio}
            className={styles.formTextArea}
          />
          <textarea 
            onChange={handleInputValueCitacao} 
            placeholder="Digite a citação"
            value={quote}
            className={styles.formTextArea}
          />
          <button className={styles.formButton} type="submit">Enviar mensagem</button>
          {success && <p>Cadastro realizado com sucesso.</p>}
        </form>
      </div>
      <Footer />
    </>
  )
}
