import { ErrorMessage, Field } from "formik";
import { FormattedMessage } from "react-intl";
import { Flex, Item } from "react-flex-ready";
import InputField from "components/common/InputField";
import ErrorField from "components/common/ErrorField";
import { FieldWrapper } from "components/checkout/OrderCheckout/components/CreditCardForm/styles";

export default ({
	locationComponent,
	fieldsToUpdate,
	onFieldBlur,
	values,
	dirty,
	errors,
	optional
}) => (
	<>
		<FieldWrapper>
			<label>
				<FormattedMessage id="checkout.form.address" />
			</label>
			<Field
				name={optional ? "addressLine1_optional" : "addressLine1"}
				component={locationComponent}
				fieldsToUpdate={fieldsToUpdate}
				onBlur={() => {
					onFieldBlur(
						optional ? "addressLine1_optional" : "addressLine1",
						values,
						dirty,
						errors
					);
				}}
				optional={optional}
			/>
			<ErrorMessage
				component={ErrorField}
				name={optional ? "addressLine1_optional" : "addressLine1"}
			/>
		</FieldWrapper>
		<FieldWrapper>
			<label>
				<FormattedMessage id="checkout.form.address_2" />
			</label>
			<Field
				name={optional ? "addressLine2_optional" : "addressLine2"}
				as={InputField}
				autoComplete="new-password"
				placeholder="Suite 101"
			/>
			<ErrorMessage
				component={ErrorField}
				name={optional ? "addressLine2_optional" : "addressLine2"}
			/>
		</FieldWrapper>
		<FieldWrapper>
			<label>
				<FormattedMessage id="checkout.form.city" />
			</label>
			<Field
				name={optional ? "city_optional" : "city"}
				as={InputField}
				autoComplete="new-password"
				placeholder="New York"
			/>
			<ErrorMessage
				component={ErrorField}
				name={optional ? "city_optional" : "city"}
			/>
		</FieldWrapper>
		<FieldWrapper>
			<label>
				<FormattedMessage id="checkout.form.state" />
			</label>
			<Field
				name={optional ? "state_optional" : "state"}
				as={InputField}
				autoComplete="new-password"
				placeholder="New York"
			/>
			<ErrorMessage
				component={ErrorField}
				name={optional ? "state_optional" : "state"}
			/>
		</FieldWrapper>
		<Flex align="flex-start">
			<Item col={6} colTablet={12} colMobile={12} gap={2}>
				<FieldWrapper>
					<label>
						<FormattedMessage id="checkout.form.country" />
					</label>
					<Field
						name={optional ? "country_optional" : "country"}
						autoComplete="new-password"
						as={InputField}
						placeholder="United State"
					/>
					<ErrorMessage
						component={ErrorField}
						name={optional ? "country_optional" : "country"}
					/>
				</FieldWrapper>
			</Item>
			<Item col={6} colTablet={12} colMobile={12} gap={2}>
				<FieldWrapper>
					<label>
						<FormattedMessage id="checkout.form.postal_code" />
					</label>
					<Field
						name={optional ? "zipCode_optional" : "zipCode"}
						as={InputField}
						type="number"
						autoComplete="new-password"
						placeholder={10003}
					/>
					<ErrorMessage
						component={ErrorField}
						name={optional ? "zipCode_optional" : "zipCode"}
					/>
				</FieldWrapper>
			</Item>
		</Flex>
	</>
);
