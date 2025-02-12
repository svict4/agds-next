import {
	themeVars,
	mapSpacing,
	outline,
	mq,
	mapResponsiveProp,
} from '@ag.ds-next/core';
import { Box } from '@ag.ds-next/box';
import type { ReactNode } from 'react';

import { localVars } from './utils';

export function NavItem({
	children,
	active,
}: {
	children: ReactNode;
	active?: boolean;
}) {
	return (
		<Box
			as="li"
			paddingBottom={{ md: 0.5 }}
			css={mq({
				// TODO: may also need to support button element
				' a': {
					position: 'relative',
					display: 'block',
					color: themeVars.foreground[active ? 'text' : 'action'],
					padding: mapSpacing(1),
					textDecoration: 'none',

					fontWeight: mapResponsiveProp({
						xs: active ? 'bold' : undefined,
						md: 'normal',
					}),

					// Underline overlay for active menu item
					'&:after': {
						content: mapResponsiveProp({ xs: undefined, md: '""' }),
						height: mapSpacing(0.5),
						position: 'absolute',
						top: '100%',
						left: 0,
						right: 0,
						backgroundColor: active
							? `var(${localVars.linkActiveBorder})`
							: 'transparent',
					},

					// Focus styles
					'&:focus': {
						outline: 'none',

						'&:before': {
							content: '""',
							position: 'absolute',
							zIndex: 100,
							top: 0,
							left: 0,
							height: '100%',
							width: '100%',
							...outline,
						},
						'&::-moz-focus-inner': {
							border: 0,
						},
					},

					'&:hover': {
						textDecoration: 'underline',
						textDecorationSkipInk: 'auto',
						color: themeVars.foreground.text,
						backgroundColor: `var(${localVars.linkHoverBg})`,

						'&::after': {
							background: active
								? `var(${localVars.linkHoverBg})`
								: 'transparent',
						},
					},
				},
			})}
		>
			{children}
		</Box>
	);
}
