import React, { useEffect, useState } from 'react';
import Header from './Header';
import api from './api';

function UsuariosPage() {

    const [ usuario, setUsuarios ] = useState([]);

    function loadData()
    {
        api.get('/usuario').then(response =>  {

            const pegaDados = response.data;
            setUsuarios(pegaDados);

        });
        
    }
    
    useEffect(loadData, []);

    return <div>
        <Header/>
        <table style={{border: '5px solid red'}}>
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