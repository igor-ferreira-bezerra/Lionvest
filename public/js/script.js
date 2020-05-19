
/*------------------------ Register ------------------------*/

function check_cpf() {
    var soma_digito = 0;
    var digito = 0;
    var cpf = document.getElementById("input_cpf").value;
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
            }
        }
    } else {
        cpf_alert();
    }
    function cpf_alert() {
        alert_cpf.innerHTML = "CPF INVÁLIDO";
        alert_cpf.style.color = "red";
    }
}

function change_type() {
    document.getElementById("input_date").type = "date";
}