import React, { Component } from 'react';
import logo from './Registro.svg';
import './Registro.css';

class Regristro extends Component {

    /**
     * Constructor
     * @param {*} props 
     */
    constructor(props) {
        super();
        this.state = {
            Usuario: '@',
            Clave: '',
            RepiteClave: '',
            NombresApellidos: "",
            AceptaTerminos: false,
            conErrores: false,
            mensajeErro: ""
        };
        this.UsuarioCambia = this.UsuarioCambia.bind(this);
        this.ClaveCambia = this.ClaveCambia.bind(this);
        this.RepiteClaveCambia = this.RepiteClaveCambia.bind(this);
        this.NombresApellidosCambia = this.NombresApellidosCambia.bind(this);
        this.AceptaTerminosCambia = this.AceptaTerminosCambia.bind(this);
        this.RegistrarUsuario = this.RegistrarUsuario.bind(this);
    }

    /**
     * Cambia parametro usuario
     * @param {*} event 
     */
    UsuarioCambia(event) {
        this.setState({ Usuario: event.target.value });
    }

    /**
     * Cambia parametro clave
     * @param {*} event 
     */
    ClaveCambia(event) {
        this.setState({ Clave: event.target.value });
    }

    /**
     * Cambia parametro repite clave
     * @param {*} event 
     */
    RepiteClaveCambia(event) {
        this.setState({ RepiteClave: event.target.value });
    }

    /**
     * Cambia parametro nombre y apellidos
     * @param {*} event 
     */
    NombresApellidosCambia(event) {
        this.setState({ NombresApellidos: event.target.value });
    }

    /**
     * Cambia parametro nombre y apellidos
     * @param {*} event 
     */
    AceptaTerminosCambia(event) {
        this.setState({ AceptaTerminos: event.target.checked });
    }



    /**
     * Función utilizada para validar datos del usuario
     */
    RegistrarUsuario(event) {
        //VALIDACION DE DATOS
        this.setState({ conErrores: false, mensajeErro: "" });
        if (this.state.AceptaTerminos != true) {
            this.setState({ conErrores: true, mensajeErro: "Debe aceptar terminos y condiciones" });
        }
        if (this.state.NombresApellidos.trim() == "") {
            this.setState({ conErrores: true, mensajeErro: "Debe ingresar nombres y apellidos" });
        }
        if (this.state.RepiteClave.trim() == "") {
            this.setState({ conErrores: true, mensajeErro: "Ingrese la repetición de la clave" });
        }
        if (this.state.Clave.trim() == "") {
            this.setState({ conErrores: true, mensajeErro: "Ingrese la clave" });
        }
        if (this.state.Clave.trim() != this.state.RepiteClave.trim()) {
            this.setState({ conErrores: true, mensajeErro: "Segunda clave no coincide" });
        }
        if (this.state.Usuario.trim() == "") {
            this.setState({ conErrores: true, mensajeErro: "Ingrese el usuario" })
        }

        //VALIDACION DEL SERVIDOR
        if (this.state.conErrores == false) {

            var strParametros =
                "Usuario=" + this.state.Usuario.trim() +
                "&Clave=" + this.state.Clave.trim() +
                "&NombresApellidos=" + this.state.NombresApellidos.trim() +
                "&AceptaTerminos=" + this.state.AceptaTerminos;

            fetch('http://localhost:3001/usuarios/insertaNuevoUsuario?' + strParametros, {
                method: 'post',
                dataType: 'json'
            })
                .then((response) => {
                    return response.json()
                })
                .then((respuesta) => {
                    if (respuesta.Proceso == false) {
                        this.setState({ conErrores: true, mensajeErro: respuesta.mensajeErro })
                    } else {
                        this.setState({ conErrores: true, mensajeErro: respuesta.mensajeErro })
                    }
                })
        }
    }

    /**
     * Renderiza componente
     */
    render() {
        return (
            <form href="" method="POST" id="fmrDatosRegistros">
                <section>
                    <br />
                    <small>Información registro</small>
                    <picture>
                        <img src={logo} className="App-logo" alt="logo" width="80%" height="180px" />
                    </picture>
                    <section className="fila left">
                        <small>Usuario</small>
                    </section>
                    <section className="fila">
                        <input type="email" placeholder="Usuario" name="Usuario" value={this.state.Usuario} required onChange={this.UsuarioCambia} ></input>
                    </section>
                    <section className="fila left">
                        <small>Clave</small>
                    </section>
                    <section className="fila">
                        <input type="Password" placeholder="Clave" name="Clave" value={this.state.Clave} required onChange={this.ClaveCambia} ></input>
                    </section>
                    <section className="fila left">
                        <small>Repetir clave</small>
                    </section>
                    <section className="fila">
                        <input type="Password" placeholder="Repetir clave" name="RepiteClave" value={this.state.RepiteClave} required onChange={this.RepiteClaveCambia} ></input>
                    </section>
                    <section className="fila left">
                        <small>Nombres y apellidos</small>
                    </section>
                    <section className="fila">
                        <input type="text" placeholder="Nombre" name="NombresApellidos" value={this.state.NombresApellidos} required onChange={this.NombresApellidosCambia}></input>
                    </section>
                    <section className="fila">
                        <input type="checkbox" value={this.state.AceptaTerminos} name="AceptaTerminos" required onChange={this.AceptaTerminosCambia} title="Debe aceptar los terminos y condiciones." ></input><small>
                            Aceptar
                            <a href="#"> Términos y condiciones</a>
                        </small>
                    </section>
                    <br />
                    {this.state.conErrores && <h5 className="alertaError">{this.state.mensajeErro}</h5>}
                    <br />
                    <section className="fila">
                        <div className="btn" onClick={this.RegistrarUsuario}>
                            Registrarme
                        </div>
                    </section>
                </section>
            </form>
        );
    }
}

export default Regristro;


