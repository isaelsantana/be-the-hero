import React, { useState } from "react"
import { FiArrowLeft } from "react-icons/fi"
import { Link, useHistory } from "react-router-dom"

import "./style.css"
import logoImg from "../../assets/logo.svg"
import api from "../../services/api"

export default function NewIncident() {
    const history = useHistory()
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [value, setValue] = useState("")
    let ongId = localStorage.getItem("ongId")

    async function handlerNewIncident(e) {
        e.preventDefault()

        var data = {
            title,
            description,
            value
        }
        console.log(data)

        try {
            var res = await api.post("/incidents", data, {
                headers: {
                    Authorization: ongId
                }
            })
            var id = res.data.id
            alert(`Caso cadastrada com sucesso. Id ${id}`)
            history.push("/profile")
        } catch (err) {
            alert("Erro ao gravar caso")
        }
    }
    return (
        <div className="new-incident-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="Be The Hero" />
                    <h1>Cadastrar Novo Caso</h1>
                    <p>
                        Descreva o caso detalhadamente para encontrar um herói
                        para resolver isso.
                    </p>
                    <Link className="back-link" to="/profile">
                        <FiArrowLeft size={16} color="#E02041" />
                        Voltar para home
                    </Link>
                </section>
                <form onSubmit={handlerNewIncident}>
                    <input
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                        placeholder="Titulo do Caso"
                    />
                    <textarea
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                        placeholder="Descrição"
                    />
                    <input
                        value={value}
                        onChange={e => setValue(e.target.value)}
                        placeholder="Valor em Reais"
                    />

                    <button className="button">Cadastrar</button>
                </form>
            </div>
        </div>
    )
}
