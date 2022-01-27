import React from "react";
import Main from "../template/Main";

export default props => (
    <Main icon='home' title='inicio' subtitle='Segundo projeto crud React.'>
        <div className="display-4">
            Bem vindo
        </div>
        <hr />
        <p className="mb-0">
            Sistema CRUD feito com React !
        </p>
    </Main>
)