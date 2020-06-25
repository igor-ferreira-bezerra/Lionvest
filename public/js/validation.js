var valid_cpf = false;

function check_cpf() {
    let soma_digito = 0;
    let digito = 0;
    let cpf = document.getElementById("input_cpf").value;
    const alert_cpf = document.getElementById("alert_cpf");
    if (cpf.length == 11) {
        alert_cpf.innerHTML = "Somente números";
        alert_cpf.style.color = "#cca367"

        for (i = 0; i <= 8; i++) {
            soma_digito += cpf[i] * (i + 1);
        }
        digito = soma_digito % 11;
        console.log(soma_digito, digito)
        if (digito == 10) {
            digito = 0;
        }
        if (digito != cpf[9]) {
            cpf_alert();
        } else {
            soma_digito = 0;
            digito = 0;
            for (i = 0; i <= 9; i++) {
                soma_digito += cpf[i] * (i);
            }
            digito = soma_digito % 11;
            console.log(soma_digito, digito)
            if (digito == 10) {
                digito = 0;
            }
            if (digito != cpf[10]) {
                cpf_alert();
            } else {
                valid_cpf = true;
            }
        }
    } else {
        cpf_alert();
    }
}
function cpf_alert() {
    input_cpf.style.border = '2px solid #25559f';
    alert_cpf.innerHTML = "CPF INVÁLIDO";
    alert_cpf.style.color = "red";
    valid_cpf = false;
}



/*------------------------ Login ------------------------*/

function check_login() {
    check_cpf();
    if (valid_cpf == false) {
        cpf_alert();
        return false;
    }
    if (input_password.value.length <= 7) {
        input_password.style.border = '2px solid #25559f';
        return false;
    }
    return true;
}

/*------------------------ Register ------------------------*/

function check_register() {
    let erro = false;
    let value_name = input_name.value;
    let value_email = input_email.value;
    let value_date = input_date.value;
    if (value_name.length < 10) {
        input_name.style.border = '2px solid #25559f';
        erro = true;
    }
    if (value_email.length < 5 || value_email.typeOf('@') == -1 || value_email.typeOf('.') == -1) {
        input_email.style.border = '2px solid #25559f';
        erro = true;
    }
    if (value_date.length < 8) {
        input_date.style.border = '2px solid #25559f';
        erro = true;
    }
    if (valid_cpf == false) {
        cpf_alert();
        erro = true;
    }
    if (erro) {
        return false;
    } else {
        return true;
    }

}

function check_register_pwd() {
    let erro = false;
    let value_password = input_password.value;
    let value_subscription = input_subscription.value;

    if (value_password.length < 8) {
        input_password.style.border = '2px solid #25559f';
        erro = true;
    }
    if (value_subscription.length < 8) {
        input_subscription.style.border = '2px solid #25559f';
        erro = true;
    }
    if (erro) {
        return false;
    } else {
        return true;
    }
}

function change_type() {
    document.getElementById("input_date").type = "date";
}