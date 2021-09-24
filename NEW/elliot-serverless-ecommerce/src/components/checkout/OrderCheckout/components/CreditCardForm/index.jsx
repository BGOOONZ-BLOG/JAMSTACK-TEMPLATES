import Link from "next/link";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useState, useMemo } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { CardElement, injectStripe } from "react-stripe-elements";
import { Flex, Item } from "react-flex-ready";
import { Formik, Field, Form, FastField, ErrorMessage } from "formik";
import * as Yup from "yup";
import PhoneInput from "react-phone-input-2";
import { useCart } from "providers/CartProvider";
import { useCurrency } from "providers/CurrencyProvider";
import { useDispatchCheckout, useCheckout } from "providers/CheckoutProvider";
import isEmpty from "helpers/isEmpty";
import getShippingPayload from "helpers/shipping/getShippingPayload";
import getShippingOptions from "helpers/shipping/getShippingOptions";
import getDisplayedShippingOptions from "helpers/shipping/getDisplayedShippingOptions";
import adjustShippingOptionsForChoices from "helpers/shipping/adjustShippingOptionsForChoices";
import useShippingStateUpdater from "hooks/useShippingStateUpdater";
import useOrderSummary from "hooks/useOrderSummary";
import useShippingInfo from "hooks/useShippingInfo";
import InputField from "components/common/InputField";
import Button from "components/common/Button";
import ErrorField from "components/common/ErrorField";
import Loader from "components/common/Loader";
import BuyButton from "components/checkout/OrderCheckout/components/BuyButton";
import LocationSearchInput from "components/checkout/OrderCheckout/components/LocationSearchInput";
import ShippingAddress from "components/checkout/OrderCheckout/components/ShippingAddress";
const PaymentButtons = dynamic(
	() => import("components/checkout/PaymentButtons"),
	{
		ssr: false
	}
);
import {
	Wrapper,
	FieldWrapper,
	CreditCardWrap,
	CheckboxWrapper,
	CheckBox
} from "./styles";
import RadioButton from "components/common/RadioButton";

const CreditCardForm = ({ stripe, checkout }) => {
	const { locale, formatMessage } = useIntl();
	const router = useRouter();
	const {
		state: { data: cart }
	} = useCart();
	const {
		state: currency,
		exchangeRate,
		loading: loadingCurrency
	} = useCurrency();
	const { setOrderStatus } = useDispatchCheckout();
	const [loadingShippingInfo, setLoadingShippingInfo] = useState(false);
	const [paymentLoading, setPaymentLoading] = useState(false);
	const [cardError, setCardError] = useState(false);
	const [paymentState, setPaymentState] = useState(null);
	const [validCard, setCardValidity] = useState(false);
	const [cardOnBlurMessage, setCardOnBlurMessage] = useState("");
	const [shippingOptions, setShippingOptions] = useState([]);
	const [
		selectedShippingOptionIndex,
		setSelectedShippingOptionIndex
	] = useState(0);
	const [
		lastAddressUsedToFetchShipping,
		setLastAddressUsedToFetchShipping
	] = useState({
		city: "",
		state: "",
		country: "",
		zipCode: ""
	});
	const [touchedErrors, setTouchedErrors] = useState({});
	const [optionalShippingAddress, setOptionalShippingAddress] = useState(false);

	const hasAddressErrors = errors => {
		return (
			Object.keys(errors).filter(
				key =>
					["addressLine1", "city", "state", "country", "zipCode"].indexOf(
						key
					) !== -1
			).length > 0
		);
	};

	const isAddressDirty = (fieldName, value) => {
		return (
			["city", "country", "state", "zipCode"].indexOf(fieldName) !== -1 &&
			value !== lastAddressUsedToFetchShipping[fieldName]
		);
	};

	const shippingOption = useMemo(
		() => getDisplayedShippingOptions({ shippingOptions, checkout }),
		[JSON.stringify(shippingOptions)]
	);

	const {
		shippingOptions: displayedShippingOptions,
		freeShipping
	} = shippingOption;

	const { shippingTotal } = useShippingInfo();
	const { promotion } = useCheckout();

	const { orderTotal } = useOrderSummary({
		shippingTotal,
		exchangeRate,
		cart,
		promotion
	});

	useShippingStateUpdater({
		selectedShippingOptionIndex,
		shippingOption
	});

	const handleAddressSelected = async (
		addressLine1,
		addressLine2,
		city,
		selectedState,
		selectedCountry,
		zipCode
	) => {
		setLoadingShippingInfo(true);
		const shippingDestination = {
			line1: addressLine1,
			line2: addressLine2,
			city,
			state: selectedState,
			country: selectedCountry,
			zip: zipCode
		};

		const shippingOptions = await getShippingOptions({
			shippingDestination,
			cart,
			checkout
		});

		setShippingOptions(shippingOptions);

		setLoadingShippingInfo(false);
		setLastAddressUsedToFetchShipping({
			city,
			state: selectedState,
			country: selectedCountry,
			zipCode: zipCode
		});
	};

	const onFieldBlur = async (fieldName, values, dirty, errors) => {
		const updatedTouchedErrors = { ...touchedErrors };
		if (fieldName in errors) {
			updatedTouchedErrors[fieldName] = true;
		} else if (fieldName in touchedErrors) {
			delete updatedTouchedErrors[fieldName];
		}

		const shippingDestination = {
			line1: values.addressLine1,
			line2: values.addressLine2,
			city: values.city,
			state: values.state,
			country: values.country,
			zip: values.zipCode
		};

		setTouchedErrors(updatedTouchedErrors);
		if (dirty && !hasAddressErrors(errors)) {
			if (
				!displayedShippingOptions ||
				isAddressDirty(fieldName, values[fieldName])
			) {
				const shippingOptions = await getShippingOptions({
					shippingDestination,
					cart,
					checkout
				});

				setShippingOptions(shippingOptions);
			}
			const updatedLastAddressUsedToFetchShipping = {
				...lastAddressUsedToFetchShipping
			};
			updatedLastAddressUsedToFetchShipping[fieldName] = values[fieldName];
			setLastAddressUsedToFetchShipping(updatedLastAddressUsedToFetchShipping);
		}
	};

	const checkValidCard = ({ error, complete }) => {
		if (cardOnBlurMessage) {
			setCardOnBlurMessage("");
		}

		setCardError(error && error.message);

		if (!complete) {
			setCardOnBlurMessage(formatMessage({ id: "validation.cc.fields" }));
		} else {
			setCardValidity(true);
		}
	};

	const locationSearchInputComponent = ({
		field,
		form,
		onBlur,
		value,
		fieldsToUpdate,
		optional
	}) => {
		return (
			<LocationSearchInput
				field={field}
				form={form}
				fieldsToUpdate={fieldsToUpdate}
				placeholder="33 Irving Place"
				onBlur={onBlur}
				onSelect={handleAddressSelected}
				value={value}
				optional={optional}
			/>
		);
	};

	return (
		<Formik
			initialValues={{
				name: "",
				email: "",
				phone: "",
				addressLine1: "",
				addressLine2: "",
				city: "",
				state: "",
				country: "",
				zipCode: "",
				addressLine1_optional: "",
				addressLine2_optional: "",
				city_optional: "",
				state_optional: "",
				country_optional: "",
				zipCode_optional: ""
			}}
			validationSchema={Yup.object().shape({
				name: Yup.string()
					.max(100, formatMessage({ id: "validation.full_name" }))
					.required(formatMessage({ id: "validation.required" })),
				email: Yup.string()
					.email(formatMessage({ id: "validation.invalid_email" }))
					.required(formatMessage({ id: "validation.required" })),
				phone: Yup.string(),
				addressLine1: Yup.string().required(
					formatMessage({ id: "validation.required" })
				),
				addressLine2: Yup.string(),
				city: Yup.string().required(
					formatMessage({ id: "validation.required" })
				),
				state: Yup.string().required(),
				country: Yup.string().required(
					formatMessage({ id: "validation.required" })
				),
				zipCode: Yup.string().required(
					formatMessage({ id: "validation.required" })
				),
				addressLine1_optional: !optionalShippingAddress
					? Yup.string()
					: Yup.string().required(formatMessage({ id: "validation.required" })),
				addressLine2_optional: !optionalShippingAddress
					? Yup.string()
					: Yup.string(),
				city_optional: !optionalShippingAddress
					? Yup.string()
					: Yup.string().required(formatMessage({ id: "validation.required" })),
				state_optional: !optionalShippingAddress
					? Yup.string()
					: Yup.string().required(),
				country_optional: !optionalShippingAddress
					? Yup.string()
					: Yup.string().required(formatMessage({ id: "validation.required" })),
				zipCode_optional: !optionalShippingAddress
					? Yup.string()
					: Yup.string().required(formatMessage({ id: "validation.required" }))
			})}
			onSubmit={async values => {
				try {
					// Within the context of `Elements`, this call to createToken knows which Element to
					// tokenize, since there's only one in this group.
					const { token } = await stripe.createToken({ name: values.name });
					setPaymentLoading(true);

					if (!token) {
						console.error("NO TOKEN");
						return;
					}

					const {
						name,
						addressLine1: line1,
						addressLine2: line2,
						city,
						state,
						country,
						zipCode: postalCode,
						phone,
						email,
						shipToAddress,
						shipToCity,
						shipToCountry,
						shipToState,
						shipToZipCode,
						addressLine1_optional,
						addressLine2_optional,
						city_optional,
						state_optional,
						country_optional,
						zipCode_optional
					} = values;

					const data = {
						email,
						line1: optionalShippingAddress ? addressLine1_optional : line1,
						line2: optionalShippingAddress ? addressLine2_optional : line2,
						city: optionalShippingAddress ? city_optional : city,
						state: optionalShippingAddress ? state_optional : state,
						country: optionalShippingAddress ? country_optional : country,
						postalCode: optionalShippingAddress ? zipCode_optional : postalCode,
						phone,
						name: name.slice(0, 100),
						shipToAddress,
						shipToCity,
						shipToCountry,
						shipToState,
						shipToZipCode
					};

					const payload = getShippingPayload({
						checkout,
						cart,
						data,
						token,
						shippingOptions: adjustShippingOptionsForChoices({
							displayedShippingOptions,
							shippingOptions,
							checkout,
							selectedShippingOptionIndex
						}),
						selectedShippingOptionIndex
					});

					const res = await fetch(
						"https://us-east1-elliot-192017.cloudfunctions.net/createOrderShipping",
						{
							method: "post",
							body: JSON.stringify(payload),
							headers: { "Content-Type": "application/json" }
						}
					);

					if (res.ok) {
						setPaymentState("PAYMENT SUCCESSFUL");
						setOrderStatus("PAYMENT SUCCESSFUL");
						router.push(`/${locale}/successful-order`);
					} else {
						setPaymentState("PAYMENT FAILED");
						setOrderStatus("PAYMENT FAILED");
						router.push(`/${locale}/order-failed`);
					}
				} catch (error) {
					setPaymentState("PAYMENT FAILED");
					setOrderStatus("PAYMENT FAILED");
					router.push(`/${locale}/order-failed`);
				} finally {
					setPaymentLoading(false);
				}
			}}
			render={({ dirty, errors, setFieldValue, values, setFieldTouched }) => {
				const canSubmit =
					dirty &&
					isEmpty(errors) &&
					validCard &&
					!cardError &&
					displayedShippingOptions &&
					!paymentLoading;

				return (
					<Form>
						<>
							{[
								"name",
								"email",
								"phone",
								"addressLine1",
								"addressLine2",
								"city",
								"state",
								"country",
								"zipCode",
								"addressLine1_optional",
								"addressLine2_optional",
								"city_optional",
								"state_optional",
								"country_optional",
								"zipCode_optional"
							].map(field => (
								<FastField
									key={field}
									name={field}
									autoComplete="on"
									style={{ display: "none" }}
								/>
							))}
						</>
						<Wrapper>
							<PaymentButtons />
							<h4>
								<FormattedMessage id="checkout.enter_payment_details" />
							</h4>
							<Flex align="flex-start">
								<Item col={6} colTablet={12} colMobile={12} gap={2}>
									<FieldWrapper>
										<label>
											<FormattedMessage id="checkout.form.email" />
										</label>
										<Field
											name="email"
											type="email"
											autoComplete="new-password"
											as={InputField}
											placeholder="dublin@elliot.store"
										/>
										<ErrorMessage component={ErrorField} name="email" />
									</FieldWrapper>
								</Item>
								<Item col={6} colTablet={12} colMobile={12} gap={2}>
									<FieldWrapper>
										<label>
											<FormattedMessage id="checkout.form.phone" />
										</label>
										<Field
											country="us"
											name="phone"
											autoComplete="new-password"
											value={values.phone}
											component={PhoneInput}
											placeholder={3477150728}
											onBlur={() => setFieldTouched("phone")}
											onChange={value => setFieldValue("phone", value)}
											buttonStyle={{
												background: "#fafafa",
												border: "2px solid #eaeaea",
												borderRadius: 0
											}}
											dropdownStyle={{ background: "#fff" }}
											inputStyle={{
												width: "100%",
												lineHeight: 49,
												fontSize: "12px",
												color: "#222",
												height: 50,
												border: "2px solid #eaeaea",
												borderRadius: "0"
											}}
										/>
										<ErrorMessage component={ErrorField} name="phone" />
									</FieldWrapper>
								</Item>
							</Flex>
							<FieldWrapper>
								<label>
									<FormattedMessage id="checkout.form.full_name" />
								</label>
								<Field
									name="name"
									as={InputField}
									autoComplete="new-password"
									placeholder="Dublin Skywalker"
								/>
								<ErrorMessage component={ErrorField} name="name" />
							</FieldWrapper>
							<ShippingAddress
								locationComponent={locationSearchInputComponent}
								fieldsToUpdate={[
									"addressLine1",
									"city",
									"state",
									"country",
									"zipCode"
								]}
								onFieldBlur={onFieldBlur}
								values={values}
								dirty={dirty}
								errors={errors}
							/>
							<CheckboxWrapper>
								<CheckBox>
									<input
										type="checkbox"
										onChange={() =>
											setOptionalShippingAddress(!optionalShippingAddress)
										}
									/>
									<span>
										<FormattedMessage id="checkout.ship_to_different_address" />
									</span>
								</CheckBox>
							</CheckboxWrapper>
							{optionalShippingAddress && (
								<ShippingAddress
									locationComponent={locationSearchInputComponent}
									fieldsToUpdate={[
										"addressLine1_optional",
										"city_optional",
										"state_optional",
										"country_optional",
										"zipCode_optional"
									]}
									onFieldBlur={onFieldBlur}
									values={values}
									dirty={dirty}
									errors={errors}
									optional
								/>
							)}
							<FieldWrapper>
								<label style={{ marginRight: "1rem" }}>
									<FormattedMessage id="checkout.shipping_method" />
								</label>
								{loadingShippingInfo && <Loader />}
								{freeShipping ? (
									<RadioButton>
										<input
											type="radio"
											id="shipping-free"
											value="free"
											name="shipping"
											checked
										/>
										<label htmlFor="shipping-free">
											<FormattedMessage id="shipping.free" />
										</label>
									</RadioButton>
								) : displayedShippingOptions ? (
									displayedShippingOptions.map(
										({ provider, type, days }, i) => {
											let label = `${provider} ${type}`;

											if (days) {
												label += ` - Arrives in ${days} day(s)`;
											}

											return (
												<RadioButton key={i}>
													<input
														type="radio"
														id={`shipping-${i}`}
														value={selectedShippingOptionIndex}
														name="shipping"
														onChange={e =>
															setSelectedShippingOptionIndex(e.target.value)
														}
													/>
													<label htmlFor={`shipping-${i}`}>{label}</label>
												</RadioButton>
											);
										}
									)
								) : (
									!loadingShippingInfo && (
										<div>
											<strong>
												<FormattedMessage id="checkout.form.complete_shipping_info" />
											</strong>
										</div>
									)
								)}
							</FieldWrapper>
							<FieldWrapper>
								<label>
									<FormattedMessage id="checkout.form.credit_card" />
									{cardError && (
										<span>
											&nbsp; - &nbsp;
											<span
												style={{
													color: "#e10007",
													fontSize: "small"
												}}
											>
												{cardError}
											</span>
										</span>
									)}
								</label>
								<CreditCardWrap>
									<div>
										<CardElement
											style={{
												base: {
													"::placeholder": {
														color: "#cfcfcf"
													},
													fontSize: "16px"
												}
											}}
											onChange={checkValidCard}
											onBlur={() => {
												if (!cardError && cardOnBlurMessage) {
													setCardError(cardOnBlurMessage);
												}
											}}
										/>
									</div>
								</CreditCardWrap>
							</FieldWrapper>
							<div>
								<BuyButton
									canSubmit={canSubmit}
									price={orderTotal}
									currency={currency}
									paymentState={paymentState}
									loadingCurrency={loadingCurrency}
									paymentLoading={paymentLoading}
								/>
								<Link href="/[lang]/" as={`/${locale}/`}>
									<Button as="a" wide variant="secondary">
										<FormattedMessage id="button.go_back" />
									</Button>
								</Link>
							</div>
						</Wrapper>
					</Form>
				);
			}}
		/>
	);
};

export default injectStripe(CreditCardForm);
