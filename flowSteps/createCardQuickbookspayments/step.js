step.createCardQuickbookspayments = function (inputs) {

	var inputsLogic = {
		costumerId: inputs.costumerId || 0,
		number: inputs.number || "",
		expMonth: inputs.expMonth || 0,
		expYear: inputs.expYear || 0,
		cvc: inputs.cvc || 0
	};

	var options = {
		body: {
			number: inputsLogic.number,
			expMonth: inputsLogic.expMonth,
			expYear: inputsLogic.expYear,
			cvc: inputsLogic.cvc
		}
	}

	return endpoint.customers.cards.post(inputsLogic.costumerId, options)
};