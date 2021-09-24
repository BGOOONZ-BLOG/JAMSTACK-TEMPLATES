import React from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { Wrapper } from "./styles";

function TabMenu({ content }) {
	const titles = [];
	const panels = [];

	content.map(item => {
		titles.push(item.title);
		panels.push(item.content);
	});

	return (
		<Wrapper>
			<Tabs>
				<TabList>
					{titles.map((item, i) => (
						<Tab key={`tab-${i}`}>{item}</Tab>
					))}
				</TabList>
				{panels.map((item, i) => (
					<TabPanel key={`content-${i}`}>{item}</TabPanel>
				))}
			</Tabs>
		</Wrapper>
	);
}

export default TabMenu;
