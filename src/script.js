function changeSection(section) {
    for (let sec of document.getElementsByClassName("section"))
        sec.style.display = "none";
    document.getElementById(section.replace("a-", "")).style.display = "block";
    localStorage.setItem("page", section);
}

function changeODS(ods) {
    for (let sec of document.getElementsByClassName("ODS-desc"))
        sec.style.display = "none";
    for (let sec of document.getElementsByClassName(ods))
        sec.style.display = "block";
    localStorage.setItem("ods", ods);
}

changeSection(localStorage.getItem("page") || "part-1");
changeODS(localStorage.getItem("ods") || "ODS4");
document.getElementById("dark").checked = localStorage.getItem('theme') === 'true' || false;



const indicadoresRA6 = {
    pue: {
        nombre: "PUE (Eficiència Energètica)",
        formula: "Energia Total / Energia IT",
        inputs: [
            { id: 'energiaTotal', label: 'Energia Total (kWh)', tipo: 'number' },
            { id: 'energiaIT', label: 'Energia IT (kWh)', tipo: 'number' }
        ],
        calcular: (total, it) => total / it,
        umbrales: { verde: 1.15, amarillo: 1.40 },
        accionRojo: " Auditoria energètica completa. Optimizar refrigeració."
    },
    reciclaje: {
        nombre: "Tasa Reciclatge Hardware",
        formula: "(Kg Recuperats / Kg Produïts) * 100",
        inputs: [
            { id: 'kgRecuperados', label: 'Kg Recuperats', tipo: 'number' },
            { id: 'kgProducidos', label: 'Kg Produïts', tipo: 'number' }
        ],
        calcular: (rec, prod) => (rec / prod) * 100,
        umbrales: { verde: 90, amarillo: 60 },
        accionRojo: " Contracte recicladors certificats. Zero-waste."
    },
    brecha: {
        nombre: "Bretxa Salarial Gènere",
        formula: "((Salari H - Salari M) / Salari H) * 100",
        inputs: [
            { id: 'salarioH', label: 'Salari Homes (€)', tipo: 'number' },
            { id: 'salarioM', label: 'Salari Dones (€)', tipo: 'number' }
        ],
        calcular: (h, m) => ((h - m) / h) * 100,
        umbrales: { verde: 1, amarillo: 5 },
        accionRojo: "Revisió salarial urgent. Comitè equitat."
    },
    accesibilidad: {
        nombre: "Accessibilitat Producte",
        formula: "(Funcions Accessibles / Total) * 100",
        inputs: [
            { id: 'funcAccesibles', label: 'Funcions Accessibles', tipo: 'number' },
            { id: 'funcTotales', label: 'Funcions Totales', tipo: 'number' }
        ],
        calcular: (acc, total) => (acc / total) * 100,
        umbrales: { verde: 95, amarillo: 80 },
        accionRojo: "Consultors WCAG. Suspendre llançaments."
    },
    diversidad: {
        nombre: "Diversitat Consell",
        formula: "(Diversos / Total) * 100",
        inputs: [
            { id: 'diversos', label: 'Dones/Minories', tipo: 'number' },
            { id: 'totalConsejo', label: 'Total Consellers', tipo: 'number' }
        ],
        calcular: (div, total) => (div / total) * 100,
        umbrales: { verde: 40, amarillo: 25 },
        accionRojo: "Reclutament diversitat. Quotes temporals."
    },
    investigacion: {
        nombre: "Inversió I+D Verd",
        formula: "(Pressupost Verd / Total) * 100",
        inputs: [
            { id: 'presupuestoVerde', label: 'Pressupost Verd (€)', tipo: 'number' },
            { id: 'presupuestoTotal', label: 'Pressupost Total (€)', tipo: 'number' }
        ],
        calcular: (verde, total) => (verde / total) * 100,
        umbrales: { verde: 20, amarillo: 10 },
        accionRojo: "Reassignar 10% pressupost I+D verd."
    }
};

function cambiarIndicador() {
    const select = document.getElementById('indicadorSelect');
    const container = document.getElementById('inputsContainer');
    const btn = document.getElementById('btnCalcular');
    
    const semaforo = document.getElementById('semaforoRA6');
    semaforo.style.display = 'none';
    
    if (!select.value) {
        container.style.display = 'none';
        btn.style.display = 'none';
        return;
    }

    const indicador = indicadoresRA6[select.value];
    generarInputs(indicador);
    container.style.display = 'flex';
    btn.style.display = 'block';
}

function generarInputs(indicador) {
    const container = document.getElementById('inputsContainer');
    container.innerHTML = '';
    
    indicador.inputs.forEach(input => {
        const div = document.createElement('div');
        div.className = 'input-group';
        div.innerHTML = `<input type="${input.tipo}" id="${input.id}" placeholder="${input.label}" step="0.01">`;
        container.appendChild(div);
    });
}

function evaluarSemaforoRA6(valor, tipo) {
    const indicador = indicadoresRA6[tipo];
    const umbrales = indicador.umbrales;
    let color, icono, estado, rango;

    if (tipo === 'pue') {
        if (valor < umbrales.verde) { color = 'verde'; icono = '✅'; estado = 'Objectiu Complert'; rango = '< 1.15 (Excel·lent)'; }
        else if (valor <= umbrales.amarillo) { color = 'amarillo'; icono = '⚠️'; estado = 'En Progrés'; rango = '1.15-1.40 (Acceptable)'; }
        else { color = 'rojo'; icono = '🚨'; estado = 'Risc Crític'; rango = '> 1.40 (CRÍTIC)'; }
    } else {
        if (valor > umbrales.verde) { color = 'verde'; icono = '✅'; estado = 'Objectiu Complert'; rango = `> ${umbrales.verde}% (Excel·lent)`; }
        else if (valor >= umbrales.amarillo) { color = 'amarillo'; icono = '⚠️'; estado = 'En Progrés'; rango = `${umbrales.amarillo}-${umbrales.verde}% (Acceptable)`; }
        else { color = 'rojo'; icono = '🚨'; estado = 'Risc Crític'; rango = `< ${umbrales.amarillo}% (CRÍTIC)`; }
    }
    return { color, icono, estado, rango };
}

function calcularRA6() {
    const select = document.getElementById('indicadorSelect');
    const tipo = select.value;
    const indicador = indicadoresRA6[tipo];
    
    const valores = {};
    indicador.inputs.forEach(input => {
        valores[input.id] = parseFloat(document.getElementById(input.id).value);
    });

    for (let key in valores) {
        if (isNaN(valores[key]) || valores[key] <= 0) {
            alert('⚠️ Completa tots els camps amb valors vàlids');
            return;
        }
    }

    const resultado = indicador.calcular(...Object.values(valores));
    const semaforoData = evaluarSemaforoRA6(resultado, tipo);
    
    // Actualizar semáforo
    const semaforo = document.getElementById('semaforoRA6');
    semaforo.className = `semaforo-ra6 ${semaforoData.color}`;
    document.getElementById('semaforoIcon').textContent = semaforoData.icono;
    document.getElementById('indicadorNombre').textContent = indicador.nombre;
    document.getElementById('estadoTexto').textContent = semaforoData.estado;
    document.getElementById('valorResultado').textContent = 
        tipo === 'pue' ? resultado.toFixed(2) : resultado.toFixed(2) + '%';
    document.getElementById('rangoInfo').textContent = semaforoData.rango;
    document.getElementById('formulaMostrada').textContent = `Fórmula: ${indicador.formula}`;
    document.getElementById('accionesRojo').textContent = indicador.accionRojo;
    
    semaforo.style.display = 'flex';
}