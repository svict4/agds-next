import { themeVars } from '@ag.ds-next/core';
import { HTMLProps } from 'react';

export function textLinkStyles() {
	return {
		color: themeVars.foreground.action,
		textDecoration: 'underline',

		'&:hover': {
			color: themeVars.foreground.action,
			textDecoration: 'none',
		},

		// @include AU-focus();
	};
}

type TextLinkProps = HTMLProps<HTMLAnchorElement>;

export const TextLink = (props: TextLinkProps) => {
	const styles = textLinkStyles();
	return <a css={styles} {...props} />;
};
