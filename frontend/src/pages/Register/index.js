import React, { useState } from "react"
import { Link, useHistory } from "react-router-dom"
import { FiArrowLeft } from "react-icons/fi"

import "./style.css"
import logoImg from "../../assets/logo.svg"

import api from "../../services/api"
export default function Register() {
    const history = useHistory()
    const [nome, setNome] = useState("")
    const [email, setEmail] = useState("")
    const [whatsapp, setWhatsapp] = useState("")
    const [city, setCity] = useState("")
    const [uf, setUf] = useState("")

    async function handlerRegister(e) {
        e.preventDefault()

        var data = {
            nome,
            email,
            whatsapp,
            city,
            uf
        }
        console.log(data)

        try {
            var res = await api.post("/ongs", data)
            var id = res.data.id
            alert(`Ong cadastrada com sucesso. Id ${id}`)
            history.push("/")
        } catch (err) {
            alert("Erro ao gravar ong")
        }
    }
    return (
        <div className="register-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="Be The Hero" />
                    <h1>Cadastro</h1>
                    <p>
                        Faça seu cadastro, entre na plataforma e ajude pessoas a
                        encontrarem os casos da sua ONG.
                    </p>
                    <Link className="back-link" to="/">
                        <FiArrowLeft size={16} color="#E02041" />
                        Não tenho cadastro
                    </Link>
                </section>
                <form onSubmit={handlerRegister}>
                    <input
                        value={nome}
                        onChange={e => setNome(e.target.value)}
                        placeholder="Nome"
                    />
                    <input
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        type="email"
                        placeholder="Email"
                    />
                    <input
                        value={whatsapp}
                        onChange={e => setWhatsapp(e.target.value)}
                        placeholder="WhatsApp"
                    />

                    <div className="input-group">
                        <input
                            value={city}
                            onChange={e => setCity(e.target.value)}
                            placeholder="Cidade"
                        />
                        <input
                            value={uf}
                            onChange={e => setUf(e.target.value)}
                            placeholder="UF"
                            style={{ width: 80 }}
                        />
                    </div>

                    <button type="submit" className="button">
                        Cadastrar
                    </button>
                </form>
            </div>
        </div>
    )
}
