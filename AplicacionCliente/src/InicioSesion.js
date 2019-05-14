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
            Recordarme: false,
            conErrores:false,
            mensajeErro:""
        };
        this.UsuarioCambia = this.UsuarioCambia.bind(this);
        this.ClaveCambia = this.ClaveCambia.bind(this);
        this.ValidarUsuario = this.ValidarUsuario.bind(this);
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
     * Función utilizada para validar datos del usuario
     */
    ValidarUsuario(event){
        //VALIDACION DE DATOS
        this.setState({conErrores: false, mensajeErro:""})
        if(this.state.Clave.trim() ==""){
            this.setState({conErrores: true, mensajeErro:"Ingrese la clave"})
        }
        if(this.state.Usuario.trim() ==""){
            this.setState({conErrores: true, mensajeErro:"Ingrese el usuario"})
        }

        //VALIDACION DEL SERVIDOR
        if(this.state.conErrores == false){
            fetch('http://localhost:3001/usuarios/validarUsuario?usuario='+this.state.Usuario+'&clave='+this.state.Clave, {
                method: 'get',
                dataType: 'json',
                headers: {
                  //'Accept': 'application/json',
                  //'Content-Type': 'application/json'
                }
              })
              .then((response) => {
                return response.json()
              })
              .then((respuesta) => {
                    if(respuesta.Proceso == false){
                        this.setState({conErrores: true, mensajeErro:"El usuario no existe"})
                    }else{
                        this.setState({conErrores: true, mensajeErro:"Bienvenido...! - " + respuesta.Nombre})
                    }
              })
        }
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
                        <input type="email" placeholder="Usuario" title="Ingrese su correo electrónico." value={this.state.Usuario} required onChange={this.UsuarioCambia} ></input>
                    </section>
                    <section className="fila left">
                        <small><span className="fa fa-key"></span> Clave</small>
                    </section>
                    <section className="fila">    
                        <input type="Password"  placeholder="Clave" title="Ingrese una contraseña." value={this.state.Clave} required onChange={this.ClaveCambia}></input>
                    </section>
                    <br/>
                    {this.state.conErrores && <h5 className="alertaError">{this.state.mensajeErro}</h5>}
                    <br/>
                    <section className="fila">    
                        <div className="btn" onClick={this.ValidarUsuario}>
                            Iniciar sesión
                        </div>
                    </section>
                </section>
            </form>
        );
    }
}

export default Regristro;
