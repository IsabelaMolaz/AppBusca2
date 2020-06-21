import React, { useState, useMemo } from 'react';
import Header from './Header';
import api from './api';
import { Table, TableRow, TableCell, Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, TextField} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
function UsuariosPage() {

    const [ usuario, setUsuario ] = useState([]);
    const [ loading, setLoading ] = useState(true);
    const [ open, setOpen ] = useState(false);

    const [ Nome, setNome ] = useState('');
    const [ Telefone, setTelefone ] = useState('');
    const [ Email, setEmail ] = useState('');
    const [ Senha, setSenha] = useState(''); 

    async function loadData(){       
            const response = await api.get('/');
            setUsuario(response.data);
            setLoading(false);
    }

    useMemo(loadData, []);

    function openDialog() {
        setOpen(true);
    }

    function closeDialog() {
        setOpen(false);
    }

    async function salvar() {
        await api.post('/', {Nome, Telefone, Email, Senha})
        loadData();
        setNome('');
        setTelefone('');
        setEmail('');
        setSenha('');
        closeDialog();
    }

    async function apagar(idUsuario) {
        await api.delete(`/${idUsuario}`);
        loadData();
    }


    return <>
        <Header/>
        { loading ?<span>Carregando usuários...</span> : <div/>}
        <Table style={{marginTop: '80px'}}>
            <h3>Registro</h3>
            {   
                usuario.map(item => (
                    <TableRow>
                        <TableCell>{item.idUsuario}</TableCell>
                        <TableCell>{item.Nome}</TableCell>
                        <TableCell>{item.Telefone}</TableCell>
                        <TableCell>{item.Email}</TableCell>
                        <TableCell>{item.Senha}</TableCell>
                    </TableRow>
                ))
            }
                <Button onClick={() => apagar(item.idUsuario)} variant="contained" color="primary" size="small">
                  <DeleteIcon>Apagar</DeleteIcon>
                </Button>
                <Dialog open={open} onClose={closeDialog} size="lg">
                    <DialogTitle>Novo Uusário</DialogTitle>
                    <DialogContent>
                        <DialogContentText>Preencha os dados para cadastrar um novo usuário</DialogContentText>
                        <TextField
                        autoFocus
                        margin="dense"
                        id="nome"
                        label="Nome"
                        type="text"
                        fullWidth 
                        value={Nome}
                        onChange={e => setNome(e.target.value)}
                        />
                        
                        <TextField 
                        autoFocus
                        margin="dense"
                        id="telefone"
                        label="Telefone"
                        type="text"
                        fullWidth 
                        value={Telefone}
                        onChange={e => setTelefone(e.target.value)}

                        />

                        <TextField 
                        autoFocus
                        margin="dense"
                        id="email"
                        label="Email"
                        type="text"
                        fullWidth 
                        value={Email}
                        onChange={e => setEmail(e.target.value)}
                        />

                        <TextField 
                        autoFocus
                        margin="dense"
                        id="senha"
                        label="Senha"
                        type="password"
                        fullWidth 
                        value={Senha}
                        onChange={e => setSenha(e.target.value)}
                        />

                    </DialogContent>
                    <DialogActions>
                        <Button onClick={closeDialog}>Cancelar</Button>
                        <Button onClick={salvar}>Salvar</Button>
                    </DialogActions>
                </Dialog>
        </Table>
    </>
}

export default UsuariosPage;