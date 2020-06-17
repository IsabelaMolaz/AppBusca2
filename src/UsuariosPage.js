import React from 'react';
import Header from './Header';

function UsuariosPage() { 
    return <div>
        <Header/>
        <table>
            {
                usuarios.map(item => (
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