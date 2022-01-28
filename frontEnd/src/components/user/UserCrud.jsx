import React, { Component } from "react";
import Main from '../template/Main'
import axios from 'axios'

const headerProps = {
    icon: 'users',
    title: 'Usuarios',
    subtitle: 'Cadastro de usuarios: Incluir, Listar, Alterar e Excluir'
}

const URL ='http://localhost:3001/users'
const initialState ={
    user : {name:'' , email:''},
    list:[]
}
export default class UserCrud extends Component{

    state = {...initialState}
    componentWillMount(){
            axios(URL).then(resp=>this.setState({list:resp.data}))
    }
    clear(){
        this.setState({user:initialState.user})
    }
    getUpdatedList(user,add=true){
        const list = this.state.list.filter(u=>u.id!==user.id )
        if(add)list.unshift(user)
        return list 
    }
    save(){
        const user = this.state.user
        const method =  user.id ?'put':'post';
        const url = user.id ? `${URL}/${user.id}` : URL
        axios[method](url,user).then(resp=>{
            const list = this.getUpdatedList(resp.data)
            this.setState({user:initialState.user ,list} )
        })
    }
    updateField(event){
        const user = {...this.state.user}
        user[event.target.name]=event.target.value
        this.setState({user})
    }
    renderForm(){
        return (
            <div className="form">
                <div className="row">
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label >Nome  </label>
                            <input type='text' name='name' classname='form-control' value={this.state.user.name} onChange={e=>this.updateField(e)} placeholder="Digite o Nome"/>
                        </div>
                    </div>
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label >Email  </label>
                            <input type='text' name='email' classname='form-control' value={this.state.user.email} onChange={e=>this.updateField(e)} placeholder="Digite o Email"/>
                        </div>
                    </div>
                </div>
                <hr />
                <div className="row">
                    <div className="col-12 d-flex justify-content-end">
                        <button className="btn btn-primary" onClick={(e)=>this.save(e)}>
                            Salvar
                        </button>
                        <button className="btn btn-secondary ml-2" onClick={(e)=>this.clear(e)}>
                            Cancelar
                        </button>
                    </div>
                </div>
            </div>
        )
    }
    load(user){
        this.setState({user})
    }
    remove(user){
        axios.delete(`${URL}/${user.id}`).then(resp=>{
            const list = this.getUpdatedList(user , false )
            this.setState({list})
        })
    }
    renderRows(){
        return this.state.list.map(user=>{
            return (
                <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>
                        <button className="btn btn-warning" onClick={()=>this.load(user)}>
                            <i className="fa fa-pencil"></i>
                        </button>
                        <button className="btn btn-danger ml-2" onClick={()=>this.remove(user)}>
                            <i className="fa fa-trash-o"></i>
                        </button>
                    </td>
                </tr>
            )
        })
    }
    renderTable(){
        return (
            <table className="table mt-4">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nome</th>
                        <th>Email</th>
                        <th>Açoes</th>
                    </tr>
                </thead>
                <tbody>
                    {this.renderRows()}
                </tbody>
            </table>
        )
    }
    render(){
        return(
            <Main {...headerProps}>
                {this.renderForm()}
                {this.renderTable()}
            </Main>
        )
    }
}