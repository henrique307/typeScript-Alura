export function inspect(
	target: any,
	propertyKey: string,
	descriptor: PropertyDescriptor
) {
	const metodoOriginal = descriptor.value;
	descriptor.value = function (...args: Array<any>) {
		console.log(`--- MÉTODOS: ${propertyKey}`);
		console.log(`------ PARÂMETROS: ${JSON.stringify(args)}`);
		const retorno = metodoOriginal.apply(this, args);
		console.log(`------ RETORNO: ${JSON.stringify(retorno)}`);
		return retorno;
	};
	return descriptor;
}
