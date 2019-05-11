import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Registro from './Registro';
import InicioSesion from './InicioSesion';
import * as serviceWorker from './serviceWorker';

class RegistroSesion extends Component {

    constructor(props){
        super();
        this.state = {Registro:false}
    }

    /**
     * Cambia opción en formulario
     * @param {*} event 
     */
    even_CambiarOpcion(event){
        this.setState({
            Registro : !this.state.Registro
        });
    }
    
    render() {
        return ( 
            <section className="Contenedor">
                <section>
                    <section 
                        className={this.state.Registro == false ? 'Opcion Seleccionado':'Opcion'}  
                        onClick={this.even_CambiarOpcion.bind(this)}
                    >
                        Iniciar sesión 
                    </section> 
                    <section 
                        className={this.state.Registro ? 'Opcion Seleccionado':'Opcion'}
                        onClick={this.even_CambiarOpcion.bind(this)}
                    >
                        Registrarme 
                    </section>
                </section>
                <section>
                    {this.state.Registro && <Registro/>}
                    {this.state.Registro == false && <InicioSesion/>}
                </section>
            </section>
        );
    }

}

class SeccionFooter extends Component{
    render(){
        return (
            <section className="centrado">
                <span className="contenidoDerecha"><a href="#"><small>Política de privacidad</small></a></span>
                <div className="oculto">Icons made by <a href="https://www.flaticon.es/autores/vectors-market" title="Vectors Market">Vectors Market</a> from <a href="https://www.flaticon.es/" 			    title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" 			    title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a></div>
                <div className="oculto">Icons made by <a href="https://www.flaticon.es/autores/vectors-market" title="Vectors Market">Vectors Market</a> from <a href="https://www.flaticon.es/" 			    title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" 			    title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a></div>
            </section>
        );
    };
}

ReactDOM.render(<RegistroSesion/> , document.getElementById('root'));
ReactDOM.render(<SeccionFooter/> , document.getElementById('footerSec'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();