var input_global = {
    "type_investment": "tesouro_selic",
    "time_all": 12,
    "initial": 5000,
    "monthly": 500
}

var result_global = {
    "all_savings": 11000,
    "yield_savings": 159.38,
    "all_investment": 11190.65,
    "yield_investment": 190.65,
    "year": 2021,
    "graphic": 0.71,
}

var interest_rates = {
    "saving": 0.001733,
    "tesouro_prefixado": 0.005654,
    "tesouro_selic": 0.001856,
    "tesouro_ipca": 0.005654,
    "cdb_lc": 0.003955
}

var information = {
    "tesouro_prefixado": `*Considerações utilizadas na simulação: <br>
    1. de rentabilidade da Poupança: 0,17% a.m. <br>
    2.Tesouro Prefixado: 7% a.a.`,
    "tesouro_selic": `*Considerações utilizadas na simulação: <br>
    1. de rentabilidade da Poupança: 0,17% a.m. <br>
    2. Tesouro Selic: 2,25% a.a.`,
    "tesouro_ipca": `*Considerações utilizadas na simulação: <br>
    1. de rentabilidade da Poupança: 0,17% a.m. <br>
    2. Tesouro IPCA+: IPCA + 3% a.a. (Inflação 4% a.a.)`,
    "cdb_lc": `*Considerações utilizadas na simulação: <br>
    1. de rentabilidade da Poupança: 0,17% a.m. <br>
    2. CDB e LC: 100% do CDI`
}


function click_investments(type) {
    tesouro_pre.className = 'item_select';
    tesouro_selic.className = 'item_select';
    tesouro_ipca.className = 'item_select';
    cdb_lc.className = 'item_select';
    if (type == 'tesouro_pre') {
        tesouro_pre.className += ' select';
        input_global.type_investment = type;
        type_investment_0.innerHTML = 'Tesouro Prefixado';
        type_investment_1.innerHTML = 'Tesouro Prefixado';
        p_information.innerHTML = information.tesouro_prefixado;
    } else if (type == 'tesouro_selic') {
        tesouro_selic.className += ' select';
        input_global.type_investment = type;
        type_investment_0.innerHTML = 'Tesouro Selic';
        type_investment_1.innerHTML = 'Tesouro Selic';
        p_information.innerHTML = information.tesouro_selic;
    } else if (type == 'tesouro_ipca') {
        tesouro_ipca.className += ' select';
        input_global.type_investment = type;
        type_investment_0.innerHTML = 'Tesouro IPCA+';
        type_investment_1.innerHTML = 'Tesouro IPCA+';
        p_information.innerHTML = information.tesouro_ipca;
    } else if (type == 'cdb_lc') {
        cdb_lc.className += ' select';
        input_global.type_investment = type;
        type_investment_0.innerHTML = 'CDB e LC';
        type_investment_1.innerHTML = 'CDB e LC';
        p_information.innerHTML = information.cdb_lc;
    }
    calculator();
}

function change_time() {
    let value_input_time = input_time.value;
    if (value_input_time == 0) {
        time_all.innerHTML = '3 Meses';
        input_global.time_all = 3;
    } else if (value_input_time == 1) {
        time_all.innerHTML = '6 Meses';
        input_global.time_all = 6;
    } else if (value_input_time == 2) {
        time_all.innerHTML = '12 Meses';
        input_global.time_all = 12;
    } else if (value_input_time == 3) {
        time_all.innerHTML = '18 Meses';
        input_global.time_all = 18;
    } else if (value_input_time == 4) {
        time_all.innerHTML = '24 Meses';
        input_global.time_all = 24;
    } else if (value_input_time == 5) {
        time_all.innerHTML = '36 Meses';
        input_global.time_all = 36;
    }
    calculator();
}

function click_plus_initial() {
    let value_initial = Number(manipulation_value('pull', input_initial.value));
    value_initial += 500;
    input_global.initial = value_initial;
    let value_push = manipulation_value('push', value_initial);
    input_initial.value = value_push;
    calculator();
}

function click_minus_initial() {
    let value_initial = Number(manipulation_value('pull', input_initial.value));
    if (value_initial > 0) {
        value_initial -= 500;
        input_global.initial = value_initial;
        let value_push = manipulation_value('push', value_initial);
        input_initial.value = value_push;
    }
    calculator();
}

function click_plus_monthly() {
    let value_monthly = Number(manipulation_value('pull', input_monthly.value));
    value_monthly += 100;
    input_global.monthly = value_monthly;
    let value_push = manipulation_value('push', value_monthly);
    input_monthly.value = value_push;
    calculator();
}

function click_minus_monthly() {
    let value_monthly = Number(manipulation_value('pull', input_monthly.value));
    if (value_monthly > 0) {
        value_monthly -= 100;
        input_global.monthly = value_monthly;
        let value_push = manipulation_value('push', value_monthly);
        input_monthly.value = value_push;
    }
    calculator();
}

function manipulation_value(action, value) {
    if (action == 'pull') {
        let value_manipulation = value.split('').reverse();
        value_manipulation.splice(0, 3);
        value_manipulation.reverse();
        return value_manipulation.join([separador = '']);
    } else if (action == 'push') {
        let value_manipulation = `${value},00`;
        return value_manipulation;
    }
}

function calculator() {
    savings_calculator();
    investment_calculator();
    calculator_graphic();
    calculator_years()
    show_screen();
}

function savings_calculator() {
    result_global.all_savings = (input_global.initial + input_global.monthly * input_global.time_all).toFixed(2);
    let result_initial = input_global.initial * (1 + interest_rates.saving) ** input_global.time_all
    let result_monthly = input_global.monthly * [(1 + interest_rates.saving) ** input_global.time_all - 1] / interest_rates.saving;
    let savings_investment = result_initial + result_monthly;
    result_global.yield_savings = (savings_investment - result_global.all_savings).toFixed(2);
}

function investment_calculator() {
    //F = P.(1+i)n + M.[(1+i)n - 1]/i
    if (input_global.type_investment == 'tesouro_pre') {
        let result_initial = input_global.initial * (1 + interest_rates.tesouro_prefixado) ** input_global.time_all;
        let result_monthly = input_global.monthly * [(1 + interest_rates.tesouro_prefixado) ** input_global.time_all - 1] / interest_rates.tesouro_prefixado;
        result_global.all_investment = (result_initial + result_monthly).toFixed(2);
    } else if (input_global.type_investment == 'tesouro_selic') {
        let result_initial = input_global.initial * (1 + interest_rates.tesouro_selic) ** input_global.time_all;
        let result_monthly = input_global.monthly * [(1 + interest_rates.tesouro_selic) ** input_global.time_all - 1] / interest_rates.tesouro_selic;
        result_global.all_investment = (result_initial + result_monthly).toFixed(2);
    } else if (input_global.type_investment == 'tesouro_ipca') {
        let result_initial = input_global.initial * (1 + interest_rates.tesouro_ipca) ** input_global.time_all;
        let result_monthly = input_global.monthly * [(1 + interest_rates.tesouro_ipca) ** input_global.time_all - 1] / interest_rates.tesouro_ipca;
        result_global.all_investment = (result_initial + result_monthly).toFixed(2);
    } else if (input_global.type_investment == 'cdb_lc') {
        let result_initial = input_global.initial * (1 + interest_rates.cdb_lc) ** input_global.time_all;
        let result_monthly = input_global.monthly * [(1 + interest_rates.cdb_lc) ** input_global.time_all - 1] / interest_rates.cdb_lc;
        result_global.all_investment = (result_initial + result_monthly).toFixed(2);
    }
    result_global.yield_investment = (result_global.all_investment - result_global.all_savings).toFixed(2);
}

function calculator_graphic() {
    let yield_savings_invenstment = ((result_global.yield_investment * 100) / result_global.yield_savings) - 100;
    result_global.graphic = yield_savings_invenstment.toFixed(2);
}


function calculator_years() {
    let date_now = new Date();
    date_now.setMonth(date_now.getMonth() + input_global.time_all);
    result_global.year = date_now.getFullYear();
}

function show_screen() {
    all_savings.innerHTML = manipulation_result(result_global.all_savings);
    yield_savings.innerHTML = manipulation_result(result_global.yield_savings);
    all_investment.innerHTML = manipulation_result(result_global.all_investment);
    yield_investment.innerHTML = manipulation_result(result_global.yield_investment);
    year_result.innerHTML = result_global.year;
    info_yield_result.innerHTML = `+ ${result_global.graphic}%`
    graphic_result_show.style.height = `${result_global.graphic}%`;
}

function manipulation_result(result) {
    let result_manipulation = result.toString().split('').reverse();
    result_manipulation.splice(2, 1, ',');
    if (result_manipulation.length > 6) {
        result_manipulation.splice(6, 0, '.')
    }
    result_manipulation.reverse();
    return result_manipulation.join([separador = '']);
}