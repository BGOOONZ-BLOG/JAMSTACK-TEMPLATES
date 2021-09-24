import React, { lazy, Suspense } from "react";
import { Provider } from "./modules/common";
import { ReactComponent as SvgComponent } from "./logo.svg";
const Dashboard = lazy(() => import("./modules/Dashboard"));

const App = () => (
	<Provider>
		<div style={{ textAlign: "center", paddingTop: "2rem" }}>
			<SvgComponent height="48" width="48" />
		</div>
		<Suspense fallback={<h4>Loading...</h4>}>
			<Dashboard />
		</Suspense>
	</Provider>
);

export default App;
