import { Footer as AgDsFooter } from '@ag.ds-next/footer';
import { Flex } from '@ag.ds-next/box';
import { LinkList } from '@ag.ds-next/link-list';

const footerLinks = [
	{ label: 'Home', href: '/' },
	{ label: 'Storybook', href: '/storybook/index.html' },
	{ label: 'Playroom', href: '/playroom/index.html' },
];

export const SiteFooter = () => {
	return (
		<AgDsFooter>
			<Flex gap={1}>
				<LinkList links={footerLinks} inline />
			</Flex>
		</AgDsFooter>
	);
};
