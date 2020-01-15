import theme from 'styled-theming';
import { css, CSSObject, SimpleInterpolation, InterpolationFunction, ThemeProps, ThemedCssFunction, DefaultTheme, Interpolation } from 'styled-components';

const breakpointPositions = {
    small: '30rem',
    large: '48rem'
};

const breakpoints = {
    phone: `(max-width:${breakpointPositions.small})`,
    tablet: `(min-width:${breakpointPositions.small}) and (max-width:${breakpointPositions.large})`,
    desktop: `(min-width:${breakpointPositions.large})`,
    notPhone: `(min-width:${breakpointPositions.small})`,
    notDesktop: `(max-width:${breakpointPositions.large})`
} as const;

type BreakpointKeys = keyof typeof breakpoints;
interface MediaQueryGenerator {
    (first: CSSObject | TemplateStringsArray, ...properties: SimpleInterpolation[]): ReturnType<typeof css>;
}
type MediaQueryGeneratorMap = Record<BreakpointKeys, MediaQueryGenerator>;

export const media: MediaQueryGeneratorMap = Object.keys(breakpoints).reduce((stylers, key) => {
    const mediaName: keyof MediaQueryGeneratorMap = key as keyof MediaQueryGeneratorMap;
    stylers[mediaName] = (first, ...interpolations) => css`
        @media ${breakpoints[key as BreakpointKeys]} {
            ${css(first, ...interpolations)}
        }`;
    return stylers;
}, {} as MediaQueryGeneratorMap);

export const fontFamily = {
    serif: '"mandrel-normal", serif',
    sans: '"mr-eaves-modern", sans-serif',
} as const;

export const fontSize = {
    phone: {
        title: '1.5rem',
        header: '1rem',
        subhead: '1rem',
        normal: '1rem',
        small: '.85rem'
    },
    tablet: {
        title: '2rem',
        header: '1.5rem',
        subhead: '1rem',
        normal: '1rem',
        small: '.85rem'
    },
    desktop: {
        title: '3rem',
        header: '2rem',
        subhead: '1.5rem',
        normal: '1.5rem',
        small: '1.25rem'
    }
} as const;

export const fontWeight = {
    bold: 900,
    semiBold: 700,
    normal: 500,
    light: 100
} as const;

export const lineHeight = 1.5;

const colorTheme = (light: string, dark: string) => theme('mode', { light, dark });

export const colors = {
    canvas: colorTheme('#FFF', '#FFF'),
    text: colorTheme('#246', '#246'),
    accentDark: colorTheme('#356', '#356'),
    accentMedium: colorTheme('#689', '#689'),
    accentLight: colorTheme('#9AC', '#9AC'),
    accentPale: colorTheme('#DEF', '#DEF'),
    highlight: colorTheme('#F60', '#F60'),
    active: colorTheme('#C00', '#C00')
}
