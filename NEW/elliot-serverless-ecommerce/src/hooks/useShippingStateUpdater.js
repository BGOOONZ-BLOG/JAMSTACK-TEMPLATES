import { useEffect } from "react";
import {
	useGlobalState,
	useDispatchGlobalState
} from "providers/GlobalStateProvider";
import isEmpty from "helpers/isEmpty";
import {
	BULK_UPDATE,
	CLEAR_SHIPPING_INFO
} from "reducers/globalStateReducer.js/types";

const useShippingStateUpdater = ({
	selectedShippingOptionIndex,
	shippingOption = {}
}) => {
	const {
		tax,
		duty,
		shippingOptions,
		freeShipping,
		flatRate: flatRateShipping
	} = shippingOption;
	const { state: globalState } = useGlobalState();
	const { dispatch } = useDispatchGlobalState();
	useEffect(() => {
		const { shippingCost: existingShippingInfo } = globalState;

		if (!isEmpty(shippingOption)) {
			dispatch({
				type: BULK_UPDATE,
				payload: {
					tax,
					duty,
					shippingCost: shippingOptions[selectedShippingOptionIndex].amount,
					freeShipping,
					flatRateShipping
				}
			});
		} else if (existingShippingInfo) {
			dispatch({
				type: CLEAR_SHIPPING_INFO
			});
		}
	}, [JSON.stringify(shippingOption)]);
};

export default useShippingStateUpdater;
