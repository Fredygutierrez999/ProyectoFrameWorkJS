import React, { Component } from 'react';
import logo from './InicioSesion.svg';
import './InicioSesion.css';

class Regristro extends Component {

    /**
     * Constructor
     * @param {*} props 
     */
    constructor(props){
        super();
        this.state = {
            Usuario:'@',
            Clave:'',
            Recordarme: false
        };
        this.UsuarioCambia = this.UsuarioCambia.bind(this);
        this.ClaveCambia = this.ClaveCambia.bind(this);
    }

    /**
     * Cambia parametro usuario
     * @param {*} event 
     */
    UsuarioCambia(event) {
        this.setState({Usuario: event.target.value});
    }

    /**
     * Cambia parametro clave
     * @param {*} event 
     */
    ClaveCambia(event) {
        this.setState({Clave: event.target.value});
    }

    /**
     * Cambia parametro clave
     * @param {*} event 
     */
    RecordarmeCambia(event) {
        this.setState({Recordarme: event.target.value});
    }

    /**
     * Renderiza HTML
     */
    render() {
        return (
            <form href="" method="POST">
                <section>
                    <picture>
                        <img src={logo} className="App-logo" alt="logo" width="80%" height="250px" />
                    </picture>
                    <section className="fila left">
                        <small><span className="fa fa-user"></span> Usuario</small>
                    </section>
                    <section className="fila">    
                        <input type="email" placeholder="Usuario" title="Ingrese su correo electrónico." required onChange={this.UsuarioCambia} ></input>
                    </section>
                    <section className="fila left">
                        <small><span className="fa fa-key"></span> Clave</small>
                    </section>
                    <section className="fila">    
                        <input type="Password"  placeholder="Clave" title="Ingrese una contraseña." required onChange={this.ClaveCambia}></input>
                    </section>
                    <br/>
                    <section className="fila">    
                        <input type="checkbox" onChange={this.RecordarmeCambia}></input><small><span className="fa fa-sd-card"></span> Recordarme</small>
                    </section>
                    <br/>
                    <section className="fila">    
                        <input type="submit" value="Iniciar sesión "></input>
                    </section>
                </section>
            </form>
        );
    }
}

export default Regristro;
