import React, { Component } from 'react';
import logo from './Registro.svg';
import './Registro.css';

class Regristro extends Component {
    render() {
        return (
            <form href="" method="POST">
                <section>
                    <br/>
                    <small>Información registro</small>
                    <picture>
                        <img src={logo} className="App-logo" alt="logo" width="80%" height="180px" />
                    </picture>
                    <section className="fila left">
                        <small>Usuario</small>
                    </section>
                    <section className="fila">    
                        <input type="email" placeholder="Usuario" required ></input>
                    </section>
                    <section className="fila left">
                        <small>Clave</small>
                    </section>
                    <section className="fila">    
                        <input type="Password"  placeholder="Clave" required></input>
                    </section>
                    <section className="fila left">
                        <small>Repetir clave</small>
                    </section>
                    <section className="fila">    
                        <input type="Password"  placeholder="Repetir clave" required></input>
                    </section>
                    <section className="fila left">
                        <small>Nombres y apellidos</small>
                    </section>
                    <section className="fila">    
                        <input type="text"  placeholder="Nombre" required></input>
                    </section>
                    <section className="fila">    
                        <input type="checkbox" required title="Debe aceptar los terminos y condiciones." ></input><small>
                            Aceptar  
                            <a href="#"> terminos y condiciones</a>
                        </small>
                    </section>
                    <br/>
                    <section className="fila">    
                        <input type="submit" value="Registrarme"></input>
                    </section>
                </section>
            </form>
        );
    }
}

export default Regristro;


