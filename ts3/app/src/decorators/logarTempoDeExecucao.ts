export function logarTempoDeExecucao(parametro:any = null) {
	return function (
		// tambem pode ser uma arrow function
		target: any,
		propertyKey: string,
		descriptor: PropertyDescriptor
	) {
		const metodoOriginal = descriptor.value;
		descriptor.value = function (...args: any[]) {
			const t1 = performance.now();
			const retorno = metodoOriginal.apply(this, args);
			const t2 = performance.now();
			console.log(`prop:${propertyKey}
tempo de execução: ${(t2 - t1) / 1000} segundos`);
			retorno;
		};
		return descriptor;
	};
}
