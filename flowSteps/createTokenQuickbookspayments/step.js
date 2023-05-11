step.createTokenQuickbookspayments = function (inputs) {

	var inputsLogic = {
		bankAccount: inputs.bankAccount || 0,
		card: inputs.card || 0
	};

	var options = {
		body: {
			bankAccount: inputsLogic.bankAccount,
			card: inputsLogic.card
		}
	}

	return endpoint.payments.tokens.post(options)
};