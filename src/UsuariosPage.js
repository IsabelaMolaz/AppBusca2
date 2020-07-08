import React, { useState, useMemo } from 'react';
import Header from './Header';
import api from './api';
import { 
    Table, 
    TableRow, 
    TableCell, 
    TableHead,
    Button, 
    Dialog, 
    DialogTitle, 
    DialogContent, 
    DialogContentText, 
    DialogActions,  
    TextField} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import AddCircle from '@material-ui/icons/AddCircle';
import EditIcon from '@material-ui/icons/Edit';
import SaveAltIcon from '@material-ui/icons/SaveAlt';
import CancelIcon from '@material-ui/icons/Cancel';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import { purple } from '@material-ui/core/colors';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#e91e63',
    },
    secondary: {
      main: '#fff59d',
    },
  },
});

function UsuariosPage() {

    const [ usuario, setUsuario ] = useState([]);
    const [ loading, setLoading ] = useState(true);
    const [ open, setOpen ] = useState(false);
    const [ openUpdate , setOpenUpdate ] = useState(false); 
    const [ Nome, setNome ] = useState('');
    const [ Telefone, setTelefone ] = useState('');
    const [ Email, setEmail ] = useState('');
    const [ Senha, setSenha] = useState(''); 
    const [ IdUsuario, setIdUsuario] = useState(null); 

    async function loadData(){       
            const response = await api.get('/usuario');
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
        console.log("a", IdUsuario, Nome, Telefone, Email, Senha);  
        if(IdUsuario == null)
            await api.post('/usuario', {Nome, Telefone, Email, Senha}); 
        else
            await api.put(`/usuario/idUsuario/${IdUsuario}`, {Nome, Telefone, Email, Senha}); 

        loadData();
        closeDialog();
        
        setNome('');
        setTelefone('');
        setEmail('');
        setSenha('');

        setIdUsuario(null);
       
    }

      function openDialogUpdate(nome, telefone, email, senha, idusuario)
    {
        setNome(nome);
        setTelefone(telefone);
        setEmail(email);
        setSenha(senha);
        setIdUsuario(idusuario);

        setOpen(true);
    }

    async function apagar(idUsuario) {
        await api.delete(`/usuario/${idUsuario}`);
        loadData();
    }

    return <>

        <Header/>

        { loading ?<span>Carregando usuários...</span> : <div/>}

        <ThemeProvider theme={theme}>

        <Table style={{marginTop: '80px'}}>
            <TableHead>
                    <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>NOME</TableCell>
                    <TableCell>TELEFONE</TableCell>
                    <TableCell>EMAIL</TableCell>
                    <TableCell>SENHA</TableCell>
                    </TableRow>
            </TableHead>
            
            {   
                usuario.map(item => (
                   
                    <TableRow>
                        <TableCell>{item.idusuario}</TableCell>
                        <TableCell>{item.nome}</TableCell>
                        <TableCell>{item.telefone}</TableCell>
                        <TableCell>{item.email}</TableCell>
                        <TableCell>{item.senha}</TableCell>
                        <TableCell><Button onClick ={()=>apagar(item.idusuario)} variant="contained" color="secondary" size="small">
                        <DeleteIcon>Apagar</DeleteIcon>
                        </Button>
                        <Button onClick={()=>openDialogUpdate(item.nome,item.telefone,item.email,item.senha,item.idusuario)}
                         variant="contained" color="secondary" size="small">
                        <EditIcon>Editar</EditIcon>
                        </Button></TableCell>
                    </TableRow>
                ))
            }
        </Table>
        
        <Button  onClick={openDialog} variant="contained" color="secondary" size="small">
        <AddCircle>Adicionar</AddCircle>
        </Button>

            <Dialog open={open} onClose={closeDialog} size="lg">
                <DialogTitle>Novo Usuário</DialogTitle>
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
                        <Button onClick={salvar} variant="contained" color="secondary" size="small">
                        <SaveAltIcon>Salvar</SaveAltIcon>
                        </Button>

                        <Button onClick={closeDialog} variant="contained" color="secondary" size="small">
                        <CancelIcon>Cancelar</CancelIcon>
                        </Button>
                    </DialogActions>
            </Dialog>
        </ThemeProvider>
   
    </>
}

export default UsuariosPage;