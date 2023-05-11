step.createBankAccountQuickbookspayments = function (inputs) {

	var inputsLogic = {
		costumerId: inputs.costumerId || 0,
		name: inputs.name || "",
		accountNumber: inputs.accountNumber || 0,
		accountType: inputs.accountType || 0,
		phone: inputs.phone || 0,
		routingNumber: inputs.routingNumber || 0
	};

	var options = {
		body: {
			name: inputsLogic.name,
			accountNumber: inputsLogic.accountNumber,
			accountType: inputsLogic.accountType,
			phone: inputsLogic.phone,
			routingNumber: inputsLogic.routingNumber
		}
	}

	return endpoint.customers.bankAccounts.post(inputsLogic.costumerId, options)
};