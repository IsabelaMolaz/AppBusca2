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
                        <td>{item.idusuario}</td>
                        <td>{item.nome}</td>
                        <td>{item.telefone}</td>
                        <td>{item.email}</td>
                        <td>{item.senha}</td>
                    </tr>
                
                ))
            }
        </table>
    </div>
}

export default UsuariosPage;