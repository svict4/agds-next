import { css } from '@emotion/react';
import {
	tokens,
	outline,
	BoxTheme,
	themes,
	themeVars,
	ResponsiveProp,
	mapResponsiveProp,
	mapSpacing,
	mq,
	fontGrid,
	Spacing,
} from '@ag.ds-next/core';

type ThemeProps = Partial<{
	theme: BoxTheme;
}>;

type ColorProps = Partial<{
	color: keyof typeof themeVars.foreground;
	background: keyof typeof themeVars.background;
}>;

function colorStyles({ color, background }: ColorProps) {
	return {
		color: color ? themeVars.foreground[color] : undefined,
		backgroundColor: background ? themeVars.background[background] : undefined,
	};
}

type TypographyProps = Partial<{
	fontWeight: ResponsiveProp<keyof typeof tokens.fontWeight>;
	fontFamily: ResponsiveProp<keyof typeof tokens.font>;
	fontSize: ResponsiveProp<keyof typeof tokens.fontSize>;
	lineHeight: keyof typeof tokens.lineHeight;
}>;

function typographyStyles({
	fontWeight,
	fontFamily,
	fontSize: _fontSize,
	lineHeight: _lineHeight = 'default',
}: TypographyProps) {
	const responsiveFontGrid = mapResponsiveProp(_fontSize, (t) =>
		fontGrid(t, _lineHeight)
	);

	const { fontSize, lineHeight } = responsiveFontGrid?.reduce<{
		fontSize: (string | null)[];
		lineHeight: (number | null)[];
	}>(
		(acc, entry, index) => {
			acc.fontSize[index] = isEntry(entry) ? entry.fontSize : null;
			acc.lineHeight[index] = isEntry(entry) ? entry.lineHeight : null;
			return acc;
		},
		{ fontSize: [], lineHeight: [] }
	) ?? { fontSize: undefined, lineHeight: undefined };

	return {
		fontWeight: mapResponsiveProp(fontWeight, (t) => tokens.fontWeight[t]),
		fontFamily: mapResponsiveProp(fontFamily, (t) => tokens.font[t]),
		fontSize,
		lineHeight,
	};
}

function isEntry(a: unknown): a is {
	fontSize: string;
	lineHeight: number;
} {
	return !!a; // ie. not null or undefined
}
type LayoutProps = Partial<{
	display: ResponsiveProp<
		'block' | 'flex' | 'inline' | 'inline-block' | 'inline-flex' | 'none'
	>;
	flexDirection: ResponsiveProp<'row' | 'column'>;
	flexWrap: ResponsiveProp<'nowrap' | 'wrap' | 'wrap-reverse'>;
	flexGrow: ResponsiveProp<number>;
	flexShrink: ResponsiveProp<number>;
	justifyContent: ResponsiveProp<
		| 'flex-start'
		| 'flex-end'
		| 'center'
		| 'space-between'
		| 'space-around'
		| 'space-evenly'
	>;
	alignItems: ResponsiveProp<
		'stretch' | 'flex-start' | 'flex-end' | 'center' | 'baseline'
	>;
	gap: ResponsiveProp<Spacing>;
	width: ResponsiveProp<number | string>;
	minWidth: ResponsiveProp<number | string>;
	maxWidth: ResponsiveProp<number | string>;
	height: ResponsiveProp<number | string>;
	minHeight: ResponsiveProp<number | string>;
	maxHeight: ResponsiveProp<number | string>;
}>;

function layoutStyles({
	display,
	flexDirection,
	flexWrap,
	flexGrow,
	flexShrink,
	justifyContent,
	alignItems,
	gap,
	width,
	minWidth,
	maxWidth,
	height,
	minHeight,
	maxHeight,
}: LayoutProps) {
	return {
		display: mapResponsiveProp(display),
		flexDirection: mapResponsiveProp(flexDirection),
		flexWrap: mapResponsiveProp(flexWrap),
		flexGrow: mapResponsiveProp(flexGrow),
		flexShrink: mapResponsiveProp(flexShrink),
		justifyContent: mapResponsiveProp(justifyContent),
		alignItems: mapResponsiveProp(alignItems),
		gap: mapResponsiveProp(gap, mapSpacing),
		width: mapResponsiveProp(width),
		minWidth: mapResponsiveProp(minWidth),
		maxWidth: mapResponsiveProp(maxWidth),
		height: mapResponsiveProp(height),
		minHeight: mapResponsiveProp(minHeight),
		maxHeight: mapResponsiveProp(maxHeight),
	};
}

type BorderProps = Partial<{
	border: boolean;
	borderLeft: boolean;
	borderRight: boolean;
	borderTop: boolean;
	borderBottom: boolean;
	borderX: boolean;
	borderY: boolean;
	rounded: boolean;
}>;

function borderStyles({
	border,
	borderLeft,
	borderRight,
	borderTop,
	borderBottom,
	borderX,
	borderY,
	rounded,
}: BorderProps) {
	const anyBorder =
		border || borderLeft || borderRight || borderBottom || borderX || borderY;
	return {
		borderWidth: 0,
		borderLeftWidth: border ?? borderX ?? borderLeft ? `1px` : undefined,
		borderRightWidth: border ?? borderX ?? borderRight ? `1px` : undefined,
		borderTopWidth: border ?? borderY ?? borderTop ? `1px` : undefined,
		borderBottomWidth: border ?? borderY ?? borderBottom ? `1px` : undefined,
		borderColor: anyBorder ? themeVars.border : undefined,
		borderStyle: anyBorder ? 'solid' : undefined,
		borderRadius: rounded ? tokens.borderRadius : undefined,
	};
}

type PaddingProps = Partial<{
	paddingTop: ResponsiveProp<Spacing>;
	paddingBottom: ResponsiveProp<Spacing>;
	paddingRight: ResponsiveProp<Spacing>;
	paddingLeft: ResponsiveProp<Spacing>;
	paddingX: ResponsiveProp<Spacing>;
	paddingY: ResponsiveProp<Spacing>;
	padding: ResponsiveProp<Spacing>;
}>;

// TODO: Explain how overlapping shorthands padding is applied.
function paddingStyles({
	paddingTop,
	paddingBottom,
	paddingRight,
	paddingLeft,
	paddingX,
	paddingY,
	padding,
}: PaddingProps) {
	return {
		paddingTop: mapResponsiveProp(
			paddingTop ?? paddingY ?? padding,
			mapSpacing
		),
		paddingBottom: mapResponsiveProp(
			paddingBottom ?? paddingY ?? padding,
			mapSpacing
		),
		paddingRight: mapResponsiveProp(
			paddingRight ?? paddingX ?? padding,
			mapSpacing
		),
		paddingLeft: mapResponsiveProp(
			paddingLeft ?? paddingX ?? padding,
			mapSpacing
		),
	};
}

type FocusProps = Partial<{ focus: boolean }>;
export function focusStyles({ focus }: FocusProps) {
	return focus
		? {
				':focus': outline,
				'&::-moz-focus-inner': {
					border: 0,
				},
		  }
		: undefined;
}

export type BoxProps = ThemeProps &
	ColorProps &
	BorderProps &
	FocusProps &
	TypographyProps &
	LayoutProps &
	PaddingProps;

export function boxStyles({
	theme,
	color,
	background,
	border,
	borderLeft,
	borderRight,
	borderTop,
	borderBottom,
	borderX,
	borderY,
	rounded,
	display,
	flexDirection,
	flexWrap,
	flexGrow,
	flexShrink,
	justifyContent,
	alignItems,
	gap,
	width,
	minWidth,
	maxWidth,
	height,
	minHeight,
	maxHeight,
	paddingTop,
	paddingBottom,
	paddingRight,
	paddingLeft,
	paddingX,
	paddingY,
	padding,
	fontWeight,
	fontFamily,
	fontSize,
	focus,
	lineHeight,
	...restProps
}: BoxProps) {
	return [
		css([
			theme ? themes[theme] : undefined,

			// common resets
			{
				boxSizing: 'border-box',
				listStyle: 'none',
				margin: 0,
				padding: 0,
			},

			mq({
				...colorStyles({ background, color }),

				...borderStyles({
					border,
					borderLeft,
					borderRight,
					borderTop,
					borderBottom,
					borderX,
					borderY,
					rounded,
				}),

				...layoutStyles({
					display,
					flexDirection,
					flexWrap,
					flexGrow,
					flexShrink,
					justifyContent,
					alignItems,
					gap,
					width,
					minWidth,
					maxWidth,
					height,
					minHeight,
					maxHeight,
				}),

				...paddingStyles({
					paddingTop,
					paddingBottom,
					paddingRight,
					paddingLeft,
					paddingX,
					paddingY,
					padding,
				}),

				...typographyStyles({
					fontWeight,
					fontFamily,
					fontSize,
					lineHeight,
				}),

				...focusStyles({ focus }),
			}),
		]),
		restProps,
	];
}
