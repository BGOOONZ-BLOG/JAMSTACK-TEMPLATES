import { Flex, Item } from "react-flex-ready";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Button from "components/common/Button";
import InputContainer from "components/common/InputContainer";
import Stars from "components/common/Stars";
import {
	FacebookIconLogin,
	TwiterIconLogin
} from "components/common/Icons/SocialIcon";
import { Addition, Description, Review } from "./styles";

const TabDescription = ({ description }) => (
	<Description>
		<div dangerouslySetInnerHTML={{ __html: description }} />
	</Description>
);

const TabAdditionInformation = ({ skus }) => (
	<Addition>
		{skus &&
			skus?.edges?.map(
				({ node: { weight, height, length, width, attributes } }, i) => (
					<table key={i}>
						<tbody>
							{weight && (
								<tr>
									<td className="td__key">Weight</td>
									<td>{weight} kg</td>
								</tr>
							)}
							{attributes &&
								Object.entries(attributes).map((value, i) => (
									<tr key={i}>
										<td className="td__key">{value[0]}</td>
										<td>{value[1]}</td>
									</tr>
								))}
							{width && height && length && (
								<tr>
									<td className="td__key">Dimensions</td>
									<td>{`${width} x ${height} x ${length}cm`}</td>
								</tr>
							)}
						</tbody>
					</table>
				)
			)}
	</Addition>
);

const TabReview = () => (
	<Review>
		<h4>1 review for Contrasting Design T-Shirt</h4>
		<Flex align="center">
			<Item className="user_image" col={1} colTablet={12} colMobile={12}>
				<img src="https://i.pravatar.cc/70?img=44" alt="" />
			</Item>
			<Item
				className="user__information"
				col={11}
				colTablet={12}
				colMobile={12}
			>
				<Stars stars={4} />
				<h4>
					Martin Katrina <span>- June 20, 2019</span>
				</h4>
				<p>Aenean sit amet odio est.</p>
			</Item>
		</Flex>
		<h5>Add a review</h5>
		<p>
			<small>Connect with:</small>
		</p>
		<ul className="social__connect">
			<li className="social__connect__item">
				<a href="#">
					<FacebookIconLogin />
				</a>
			</li>
			<li className="social__connect__item">
				<a href="#">
					<TwiterIconLogin />
				</a>
			</li>
		</ul>
		<p>
			<small>
				Your email address will not be published. Required fields are marked *
			</small>
		</p>
		<Formik
			initialValues={{ email: "", name: "", review: "" }}
			validationSchema={Yup.object().shape({
				name: Yup.string().required("This field is required"),
				email: Yup.string()
					.email("Invalid email")
					.required("This field is required"),
				review: Yup.string().required("This field is required")
			})}
			onSubmit={(values, { setSubmitting }) => {
				setTimeout(() => {
					setSubmitting(false);
				}, 400);
			}}
		>
			{({ isSubmitting, errors, touched }) => (
				<Form>
					<InputContainer>
						<Stars stars={4} />
					</InputContainer>
					<InputContainer
						className={errors.review && touched.review && "has__error"}
					>
						<label htmlFor="review">Review:</label>
						<Field type="text" name="review" component="textarea" rows="6" />
						<ErrorMessage name="review" component="span" />
					</InputContainer>
					<Flex align="start">
						<Item col={6} colTablet={12} colMobile={12}>
							<InputContainer
								className={errors.email && touched.email && "has__error"}
							>
								<label htmlFor="name">Email:</label>
								<Field type="email" name="email" />
								<ErrorMessage name="email" component="span" />
							</InputContainer>
						</Item>
						<Item col={6} colTablet={12} colMobile={12}>
							<InputContainer
								className={errors.name && touched.name && "has__error"}
							>
								<label htmlFor="name">Name:</label>
								<Field type="text" name="name" />
								<ErrorMessage name="name" component="span" />
							</InputContainer>
						</Item>
					</Flex>
					<Button variant="primary" type="submit" disabled={isSubmitting}>
						Submit
					</Button>
				</Form>
			)}
		</Formik>
	</Review>
);

export { TabDescription, TabAdditionInformation, TabReview };
