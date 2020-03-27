import React, { useEffect, useState } from "react"
import { FiPower, FiTrash2 } from "react-icons/fi"
import { Link, useHistory } from "react-router-dom"

import "./style.css"
import logoImg from "../../assets/logo.svg"
import api from "../../services/api"

export default function Profile() {
    const [incidents, setIncidents] = useState([])
    let ongNome = localStorage.getItem("ongNome")
    let ongId = localStorage.getItem("ongId")
    const history = useHistory()
    useEffect(() => {
        ;(async () => {
            try {
                const res = await api.get("profile", {
                    headers: {
                        Authorization: ongId
                    }
                })
                setIncidents(res.data)
            } catch (err) {
                alert(err)
            }
        })()
    }, [ongId])

    async function handlerDeleteIncident(id) {
        try {
            await api.delete(`incidents/${id}`, {
                headers: {
                    Authorization: ongId
                }
            })
            setIncidents(incidents.filter(x => x.id !== id))
        } catch (err) {
            alert("Erro ao deletar caso.")
        }
    }
    function handlerLogout() {
        localStorage.clear()
        history.push("/")
    }
    return (
        <div className="profile-container">
            <header>
                <img src={logoImg} alt="Be the Hero" />
                <span>Bem vinda , {ongNome}</span>

                <Link className="button" to="/incidents/new">
                    Cadastrar novo caso
                </Link>
                <button onClick={handlerLogout}>
                    <FiPower size={18} color="#E02041" />
                </button>
            </header>

            <h1>Casos Cadastrados:</h1>

            <ul>
                {incidents.map(incident => (
                    <li key={incident.id}>
                        <strong>Caso:</strong>
                        <p>{incident.title}</p>

                        <strong>Descrição:</strong>
                        <p>{incident.description}</p>

                        <strong>Valor:</strong>
                        <p>
                            {Intl.NumberFormat("pt-BR", {
                                style: "currency",
                                currency: "BRL"
                            }).format(incident.value)}
                        </p>

                        <button
                            onClick={() => handlerDeleteIncident(incident.id)}
                        >
                            <FiTrash2 size={20} color="#a8a8b3" />
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    )
}
