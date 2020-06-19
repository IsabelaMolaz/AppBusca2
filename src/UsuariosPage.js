import React, { useEffect, useState } from 'react';
import Header from './Header';
import api from './api';

function UsuariosPage() {

    const [ usuario, setUsuarios ] = useState([]);

    async function loadData() {
            const response = await api.get('/');
            const usuario = response.data;
            setUsuarios(usuario);
        }
    
    useEffect(loadData, []);

    return <div>
        <Header/>
        <table style={{border: '1px solid blue'}}>
            {
                usuario.map(item => (
                    <tr>
                        <td>{item.idUsuario}</td>
                        <td>{item.Nome}</td>
                        <td>{item.Telefone}</td>
                        <td>{item.Email}</td>
                        <td>{item.Senha}</td>
                    </tr>
                
                ))
            }
        </table>
    </div>
}

export default UsuariosPage;