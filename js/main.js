const camposdelformulario = document.querySelectorAll("[required]");
const formContacto = document.getElementById("formulario__boton");
const forms = document.querySelector("#formulario");


const tiposError = [
    "valueMissing",
    "typeMissmatch",
    "patternMismatch",
    "tooShort",
    "customError",
]

const mensajes = {
    nombre: {
      valueMissing: "El campo nombre no puede estar vacío.",
      patternMismatch: "Por favor, ingrese hasta 50 letras y espacios, pueden llevar acentos.",
      typeMismatch: "Por favor, ingrese un nombre válido.",
      tooShort: "Por favor, ingrese mas de tres caracteres",
    },
    email: {
      valueMissing: "El email no puede estar vacío.",
      patternMismatch: "Por favor, ingrese un email valido Ej: contacto@aluracursos.com",
      tooShort: "Por favor, ingrese mas de cinco caracteres",
      typeMismatch: "Incluye una '@' en la dirección de correo electrónico.",
    },
    asunto: {
        valueMissing: "El asunto no puede estar vacío.",
        patternMismatch: "Por favor, ingrese hasta 50 letras y espacios, pueden llevar acentos.",
        tooShort: "Por favor, ingrese más de tres caracteres",
      },
    mensaje: {
        valueMissing: "El mensaje no puede estar vacío.",
        patternMismatch: "Por favor, ingrese hasta 300 caracteres",
        tooShort: "Por favor, ingrese más de diez caracteres",
      },
}   


camposdelformulario.forEach((campo) => {
    campo.addEventListener("blur", () => verificarCampo(campo))
    campo.addEventListener("keyup", () => verificarCampo(campo))
    campo.addEventListener("invalid", evento => evento.preventDefault())
});


function verificarCampo(campo) {
  let mensaje="";
  campo.setCustomValidity("")

  //campos validity
  tiposError.forEach((error) => {
    if (campo.validity[error]) {
      mensaje = mensajes[campo.name][error];
    }
  });

  const mensajeError = campo.parentNode.querySelector(".mensaje-error");
  const validarInputCheck = campo.checkValidity();

    if (!validarInputCheck) {
    mensajeError.textContent = mensaje;
    campo.style.borderColor = 'red';

    } else {
    mensajeError.textContent = "";
    campo.style.borderColor = 'green';

    }
    if (document.querySelector("#nombre").style.borderColor == "green" && 
        document.querySelector("#email").style.borderColor == "green" && 
        document.querySelector("#asunto").style.borderColor == "green" && 
        document.querySelector("#mensaje").style.borderColor == "green") {
            formContacto.disabled = false
        } else {
            formContacto.disabled = true
        }
}

forms.addEventListener("submit", handleSubmit)

async function handleSubmit(e) {
    e.preventDefault()
    const form = new FormData(forms)
    const response = await fetch(forms.action, {
        method: forms.method,
        body: form,
        headers: {
            "Accept": "application/json"
        }
    })
    if (response.ok) {
        this.reset()
        alert("Gracias por contactarme, te escribiré pronto!")
    }
}