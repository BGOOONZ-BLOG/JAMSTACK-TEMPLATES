import React, { useContext, createContext, useState, useEffect } from "react";
import axios from "axios";
import currencies from "helpers/payment/currencies.json";
import getDefaultCurrency from "helpers/runtime/getDefaultCurrency";

const CurrencyContext = createContext();

export const CurrencyProvider = ({ children }) => {
	const [state, setState] = useState("$");
	const [loading, setLoading] = useState(true);
	const [exchangeRate, setRate] = useState(1);

	useEffect(() => {
		const fetchDefaultCurency = async () => {
			const currency = await getDefaultCurrency();
			setState(
				currencies.find(({ value }) => value === currency.toUpperCase()).symbol
			);
		};

		fetchDefaultCurency();
	}, []);

	useEffect(() => {
		const fetchExchangeRate = async () => {
			const url = `https://admin.elliot.store/exchange-rates?base_currency=USD&dest_currency=${
				currencies.find(({ symbol }) => symbol === state).value
			}`;

			const { data } = await axios.get(url);

			setRate(Number.parseFloat(data.rate).toFixed(2));
			setLoading(false);
		};

		fetchExchangeRate();
	}, [state]);

	return (
		<CurrencyContext.Provider
			value={{ state, setState, exchangeRate, loading }}
		>
			{children}
		</CurrencyContext.Provider>
	);
};

export const useCurrency = () => useContext(CurrencyContext);
