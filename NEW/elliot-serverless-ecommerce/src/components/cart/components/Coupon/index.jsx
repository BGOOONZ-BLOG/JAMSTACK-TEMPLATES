import { FormattedMessage, useIntl } from "react-intl";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import InputField from "components/common/InputField";
import ErrorField from "components/common/ErrorField";
import { Wrapper, CouponWrapper } from "./styles";

export default () => {
	const { formatMessage } = useIntl();

	return (
		<Formik
			initialValues={{
				coupon: ""
			}}
			validationSchema={Yup.object().shape({
				coupon: Yup.string().required(
					formatMessage({ id: "validation.required" })
				)
			})}
			onSubmit={async ({ coupon }, { setSubmitting }) => {
				try {
					console.log(coupon);
					setSubmitting(false);
				} catch (err) {
					console.log(err);
					setSubmitting(false);
				}
			}}
		>
			{({ isSubmitting }) => (
				<Wrapper as={Form}>
					<label>{formatMessage({ id: "checkout.coupon.label" })}</label>
					<CouponWrapper>
						<Field
							as={InputField}
							name="coupon"
							type="text"
							placeholder={formatMessage({ id: "checkout.coupon.placeholder" })}
						/>
						<button type="submit" disabled={isSubmitting}>
							<FormattedMessage id="button.checkout.apply" />
						</button>
					</CouponWrapper>
					<ErrorMessage component={ErrorField} name="coupon" />
				</Wrapper>
			)}
		</Formik>
	);
};
