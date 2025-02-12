import { Box, Flex } from '@ag.ds-next/box';

import { SiteHeader } from '../components/SiteHeader';
import { SiteFooter } from '../components/SiteFooter';

export const Layout: React.FC = ({ children }) => {
	return (
		<Flex
			flexDirection="column"
			fontFamily="body"
			theme="light"
			minHeight="100vh"
		>
			<SiteHeader />

			<Box as="main" flexGrow={1}>
				{children}
			</Box>

			<SiteFooter />
		</Flex>
	);
};
