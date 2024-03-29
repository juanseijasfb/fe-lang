const ROOT_URL_5000 = "https://fleetbooster.net:5000";

export const getTags = async () => {
	return fetch(`${ROOT_URL_5000}/getTagIndex`, {
		headers: {
			"Content-Type": "application/json",
		},
	})
		.then((x) => x.json())
		.then((res) => res)
		.catch(() => {
			throw new Error();
		});
};

export const getLabels = async (lang) => {
	return fetch(`${ROOT_URL_5000}/getLabels?LNG=${lang}`, {
		headers: {
			"Content-Type": "application/json",
		},
	})
		.then((x) => x.json())
		.then((res) => res)
		.catch(() => {
			throw new Error();
		});
};

export const getTagsList = async (tags) => {
	return fetch(`${ROOT_URL_5000}/getTagList?TagList=${tags}`, {
		headers: {
			"Content-Type": "application/json",
		},
	})
		.then((x) => x.json())
		.then((res) => res)
		.catch(() => {
			throw new Error();
		});
};

export const addTag = async (tag) => {
	const params = new URLSearchParams();
	params.append("tag", tag);
	params.append("attributes", JSON.stringify({ isDate: 0, sComplexObject: 0 }));
	return fetch(`${ROOT_URL_5000}/addTag?${params.toString()}`, {
		headers: {
			"Content-Type": "application/json",
		},
	})
		.then((x) => x.json())
		.then((res) => res)
		.catch(() => {
			throw new Error();
		});
};
export const removeTag = async (tag) => {
	const params = new URLSearchParams();
	params.append("Tag", tag);
	return fetch(`${ROOT_URL_5000}/removeTag?${params.toString()}`, {
		headers: {
			"Content-Type": "application/json",
		},
	})
		.then((x) => x.json())
		.then((res) => res)
		.catch(() => {
			throw new Error();
		});
};

export const loadTranslations = async (lang, json) => {
	const params = new URLSearchParams();
	params.append("LNG", lang);
	params.append("attributes", JSON.stringify(json));
	console.log(params.toString());
	return fetch(`${ROOT_URL_5000}/createTranslation?${params.toString()}`, {
		headers: {
			"Content-Type": "application/json",
		},
	})
		.then((x) => x.json())
		.then((res) => res)
		.catch(() => {
			throw new Error();
		});
};

export const getCarriersList = async (carrierName = "") => {
	return fetch(`${ROOT_URL_5000}/getCarriersList?carrier=${carrierName}`, {
		headers: {
			"Content-Type": "application/json",
		},
	})

		.then((res) => {
			console.log(res);
		})
		.catch(() => {
			throw new Error();
		});
};

export const createDriver = async (payload) => {
	return fetch(`${ROOT_URL_5000}/addDriver`, {
		method: "POST",
		headers: {
			"Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
		},
		body: new URLSearchParams({
			firstName: payload.firstName,
			lastName: payload.lastName,
			mcNumber: payload.mcNumber,
			email: payload.email,
			carrierName: payload.carrierName,
			trailerType: payload.trailerType,
			maxWeight: payload.maxWeight,
		}),
	})
		.then((x) => x.json())
		.then((res) => res)
		.catch(() => {
			throw new Error("Hubo un error al intentar crear el driver.");
		});
};

export const getDispatcher = async (userEmail) => {
	return fetch(`${ROOT_URL_5000}/getDispatcher?dispatcher=${userEmail}`, {
		headers: {
			"Content-Type": "application/json",
		},
	})
		.then((x) => x.json())
		.then((res) => res)
		.catch(() => {
			throw new Error();
		});
};

export const addCarrier = async (payload) => {
	return fetch(`${ROOT_URL_5000}/addCarrier`, {
		method: "POST",
		headers: {
			"Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
		},
		body: new URLSearchParams({
			mcNumber: payload.mcNumber,
			carrierName: payload.carrierName,
		}),
	})
		.then((x) => x.json())
		.then((res) => res)
		.catch(() => {
			throw new Error("Hubo un error al intentar crear el carrier.");
		});
};

export const addDispatcher = async (payload) => {
	return fetch(`${ROOT_URL_5000}/addDispatcher`, {
		method: "POST",
		headers: {
			"Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
		},
		body: new URLSearchParams({
			firstName: payload.firstName,
			lastName: payload.lastName,
			dispatcherEmail: payload.dispatcherEmail,
			role: payload.role,
			enabled: payload.enabled === true ? "1" : "0",
			port: payload.port,
		}),
	})
		.then((x) => x.json())
		.then((res) => res)
		.catch(() => {
			throw new Error("Hubo un error al intentar crear el carrier.");
		});
};

export const getBrokerDetails = async (brokerMc = "") => {
	return fetch(`${ROOT_URL_5000}/getBroker?MCNumber=${brokerMc}`, {
		headers: {
			"Content-Type": "application/json",
		},
	})
		.then((x) => x.json())
		.then((res) => res)
		.catch(() => {
			throw new Error();
		});
};

export const addRestriction = async ({
	subject = "D",
	type, // CI, ST, B
	subjectValue, // driver name
	typeValue,
}) => {
	// dispatcher debe venir como parametro, pero no esta definido como.
	return fetch(
		`${ROOT_URL_5000}/addRestriction?subject=${subject}&type=${type}&subjectValue=${subjectValue}&typeValue=${typeValue}&validUntil=2099-12-31 00:00:00`,
		{
			headers: {
				Accept: "text/html; charset=utf-8",
				"Content-Type": "text/html; charset=utf-8",
			},
		},
	)
		.then((x) => x.json())
		.then((res) => res)
		.catch(() => {
			throw new Error();
		});
};

// sample payload:
// [
// {
//     subject = "D",
//     type, // CI, ST, B
//     subjectValue, // driver name
//     typeValue,
//     validUntil = "2099-12-31 00:00:00"
// },
// ]
export const addRestrictions = async (restrictions) => {
	return fetch(`${ROOT_URL_5000}/addRestrictions`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(restrictions),
	})
		.then((x) => x.json())
		.then((res) => res)
		.catch(() => {
			throw new Error();
		});
};

export const addBroker = async ({ MCNumber, brokerName }) => {
	return fetch(`${ROOT_URL_5000}/addBroker`, {
		method: "POST",
		headers: {
			"Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
		},
		body: new URLSearchParams({
			mcNumber: MCNumber,
			brokerName: brokerName,
		}),
	})
		.then((x) => x.json())
		.then((res) => res)
		.catch(() => {
			throw new Error("Hubo un error al intentar crear el broker.");
		});
};

export const deleteDispatcher = async () => {
	return "ok";
	// return fetch(`${ROOT_URL_5000}/addBroker`, {
	//     method: "PUT",
	//     headers: {
	//         "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
	//     },
	//     body: new URLSearchParams({
	//         "mcNumber": MCNumber,
	//         "brokerName": brokerName,
	//     })
	// })
	//     .then((x) => x.json())
	//     .then((res) => res)
	//     .catch((err) => {
	//         throw new Error("Hubo un error al intentar crear el broker.");
	//     })
};

export const removeRestriction = async ({
	subject, // D, C
	type, // CI, ST, B
	subjectValue, // driver name
	typeValue,
}) => {
	return fetch(
		`${ROOT_URL_5000}/removeRestriction?subject=${subject}&type=${type}&subjectValue=${subjectValue}&typeValue=${typeValue}`,
		{
			headers: {
				Accept: "text/html; charset=utf-8",
				"Content-Type": "text/html; charset=utf-8",
			},
		},
	)
		.then((x) => x.text())
		.then((res) => res)
		.catch(() => {
			throw new Error("Hubo un error al intentar remover la restriccion.");
		});
};

export const removeRestrictions = async (restrictionsToRemove) => {
	return fetch(`${ROOT_URL_5000}/removeRestrictions`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(restrictionsToRemove),
	})
		.then((x) => x.json())
		.then((res) => res)
		.catch(() => {
			throw new Error("Hubo un error al intentar remover la restriccion.");
		});
};

export const getRestrictions = async ({ carrier = "", driverName = "" }) => {
	return fetch(
		`${ROOT_URL_5000}/getRestrictions?carrier=${carrier}&driver=${driverName}`,
		{
			headers: {
				"Content-Type": "application/json",
			},
		},
	)
		.then((x) => x.json())
		.then((res) => res)
		.catch(() => {
			throw new Error();
		});
};

export const getBrokerRestrictionDetails = async (brokerMcList = "") => {
	return fetch(`${ROOT_URL_5000}/getBrokerList?MCNumbers=${brokerMcList}`, {
		headers: {
			"Content-Type": "application/json",
		},
	})
		.then((x) => x.json())
		.then((res) => res)
		.catch(() => {
			throw new Error();
		});
};

export const addDriverToDispatcher = async (payload) => {
	return fetch(`${ROOT_URL_5000}/addDriverToDispatcher`, {
		method: "POST",
		headers: {
			"Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
		},
		body: new URLSearchParams({
			dispatcher: payload.dispatcher,
			driversList: payload.driversList,
		}),
	})
		.then((x) => x.json())
		.then((res) => res)
		.catch(() => {
			throw new Error(
				"Hubo un error al intentar intentar vincular el driver con el dispatcher.",
			);
		});
};

export const getMyDriversList = async (userEmail) => {
	// dispatcher debe venir como parametro, pero no esta definido como.
	return fetch(`${ROOT_URL_5000}/getMyDriversList?dispacher=${userEmail}`, {
		headers: {
			"Content-Type": "application/json",
		},
	})
		.then((x) => x.json())
		.then((res) => res)
		.catch(() => {
			throw new Error();
		});
};

export const getUnassignedDriversList = async (dispatcher = "") => {
	return fetch(
		`${ROOT_URL_5000}/getUnassignedDriversList?dispatcher=${dispatcher}`,
		{
			headers: {
				"Content-Type": "application/json",
			},
		},
	)
		.then((x) => x.json())
		.then((res) => res)
		.catch(() => {
			throw new Error();
		});
};

export const removeDriverFromDispatcher = async (payload) => {
	return fetch(`${ROOT_URL_5000}/removeDriverFromDispatcher`, {
		method: "POST",
		headers: {
			Accept: "text/html; charset=utf-8",
			"Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
		},
		body: new URLSearchParams({
			dispatcher: payload.dispatcher,
			driversList: payload.driversList,
		}),
	})
		.then((x) => x.text())
		.then((res) => res)
		.catch(() => {
			throw new Error("Hubo un error al intentar borrar el driver.");
		});
};

export const getDispatcherList = async (dispatcher = "") => {
	return fetch(`${ROOT_URL_5000}/getDispatcherList?dispatcher=${dispatcher}`, {
		headers: {
			"Content-Type": "application/json",
		},
	})
		.then((x) => x.json())
		.then((res) => res)
		.catch(() => {
			throw new Error();
		});
};

export const getDriversList = async (driver = "") => {
	return fetch(`${ROOT_URL_5000}/getDriversList?driver=${driver}`, {
		headers: {
			"Content-Type": "application/json",
		},
	})
		.then((x) => x.json())
		.then((res) => res)
		.catch(() => {
			throw new Error();
		});
};

export const getCities = async ({ cityToSearch, state }) => {
	return fetch(
		`${ROOT_URL_5000}/getCitiesList?city=${cityToSearch}&state=${state}`,
		{
			headers: {
				"Content-Type": "application/json",
			},
		},
	)
		.then((x) => x.json())
		.then((res) => res.data())
		.catch(() => {
			throw new Error();
		});
};

export const getCitiesByState = async ({ state }) => {
	return fetch(`${ROOT_URL_5000}/getCitiesListByState?state=${state}`, {
		headers: {
			"Content-Type": "application/json",
		},
	})
		.then((x) => x.json())
		.then((res) => res.map((x) => x.city).sort())
		.catch(() => {
			throw new Error();
		});
};

export const getPendingApprovals = () => {
	return fetch(`${ROOT_URL_5000}/getPendingApprovalUsers`, {
		headers: {
			"Content-Type": "application/json",
		},
	})
		.then((x) => x.json())
		.then((res) => res)
		.catch(() => {
			throw new Error();
		});
};

export const acceptDriver = async (payload) => {
	return fetch(`${ROOT_URL_5000}/approveUser`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify([payload]),
	})
		.then((x) => x.json())
		.then((res) => res)
		.catch(() => {
			throw new Error();
		});
};

export const editDriver = async (payload) => {
	return fetch(`${ROOT_URL_5000}/changeDriver`, {
		method: "POST",
		headers: {
			"Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
		},
		body: new URLSearchParams({
			firstName: payload.firstName,
			lastName: payload.lastName,
			mcNumber: payload.mcNumber,
			email: payload.email,
			trailerType: payload.trailerType,
			carrier: payload.carrierName,
			maxWeight: payload.maxWeight,
		}),
	})
		.then((x) => x.json())
		.then((res) => res)
		.catch(() => {
			throw new Error("Hubo un error al intentar actualizar el driver.");
		});
};

export const getDisabledDrivers = () => {
	return fetch(`${ROOT_URL_5000}/getDisabledDrivers`, {
		headers: {
			"Content-Type": "application/json",
		},
	})
		.then((x) => x.json())
		.then((res) => res)
		.catch(() => {
			throw new Error();
		});
};

export const getEnabledDrivers = () => {
	return fetch(`${ROOT_URL_5000}/getEnabledDrivers`, {
		headers: {
			"Content-Type": "application/json",
		},
	})
		.then((x) => x.json())
		.then((res) => res)
		.catch(() => {
			throw new Error();
		});
};

export const postEnableDrivers = async (driverIds) => {
	return fetch(`${ROOT_URL_5000}/enableDrivers`, {
		method: "POST",
		headers: {
			"Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
		},
		body: new URLSearchParams({
			driversId: driverIds,
		}),
	})
		.then((x) => x.json())
		.then((res) => res)
		.catch(() => {
			throw new Error();
		});
};

export const postDisableDrivers = async (driverIds) => {
	return fetch(`${ROOT_URL_5000}/disableDrivers`, {
		method: "POST",
		headers: {
			"Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
		},
		body: new URLSearchParams({
			driversId: driverIds,
		}),
	})
		.then((x) => x.json())
		.then((res) => res)
		.catch(() => {
			throw new Error();
		});
};
