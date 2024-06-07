import app from "@/app";


//Chama a instancia do nosso App e inicializa o servidor
export function init() {
    app.start(3333);
}

init();