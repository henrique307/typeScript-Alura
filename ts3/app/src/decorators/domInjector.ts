export function domInjector(seletor:string) {
    return function(
        target:any,
        propertyKey:string,
        // descriptor: PropertyDescriptor

        /*
            em propriedades o PropertyDescriptor
            causa um erro, visto que não é um 
            método com funções ativas
        */
    ) {
        console.log(` Modificando o Prototype ${target.constructor.name} e adicionando o getter na propriedade ${propertyKey}`)
        let elemento:HTMLElement;
        const getter = function() {
            if(!elemento) {
                elemento = /*<HTMLInputElement>*/document.querySelector(seletor) as HTMLElement;
                console.log(`buscando elemento do DOM usando o seletor ${seletor} para injetar em ${propertyKey}`)
            }
            return elemento;
        }

        Object.defineProperty(
            target,
            propertyKey,
            { get: getter}
        )
    }
}
