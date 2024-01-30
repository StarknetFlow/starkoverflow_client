import React, { CSSProperties, LegacyRef } from 'react'
import styled from '@emotion/styled';

interface TypographyProps extends React.HTMLProps<HTMLDivElement> {
    children?: React.ReactNode
    fontWeight?: string | number
    fontSize?: string | number
    variant:
    | "caption1"
    | "caption2"
    | "subtitle1"
    | "subtitle2"
    | "faded"
    | "text"
    color?: "black" | "white" | "faded1" | "faded2" | "blue"
    className?: string
    ref?: LegacyRef<HTMLDivElement>
    wrap?: string
    lineHeight?: string,
    tag?: string
    maxLineHeight?: string
    hoverColor?: string
    cursor?: boolean,
    styles?: CSSProperties | undefined
}

const StyledTypography = styled.div<TypographyProps>`
  margin: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  width:min-content;

  ${({ variant, lineHeight }) => {
        if (lineHeight)
            switch (variant) {

                case 'caption1':
                    return `
            line-height: ${(lineHeight ? (lineHeight) : (`34px`))};
            font-family: 'Roboto Slab', serif;
            `;
                case 'caption2':
                    return `
                line-height: ${(lineHeight ? (lineHeight) : (`32px`))};
                font-family: 'Roboto Slab', serif;
            `;
                case 'subtitle1':
                    return `
                line-height: ${(lineHeight ? (lineHeight) : (`30px`))};
                font-family: 'Open Sans', sans-serif;
            `;
                case 'subtitle2':
                    return `
                line-height: ${(lineHeight ? (lineHeight) : (`28px`))};
                font-family: 'Roboto Slab', sans;
            `;
                case 'text':
                    return `
                line-height: ${(lineHeight ? (lineHeight) : (`24px`))};
                font-family: 'Open Sans', sans-serif;
            `;
                case 'faded':
                    return `
                line-height: ${(lineHeight ? (lineHeight) : (`28px`))};
                font-family: 'Open Sans', sans-serif;
            font-style: italic;
            `;
                default: return ``
            }
    }}

    ${({ fontSize, variant }) => {
        if (fontSize) return `font-size: ${fontSize};`
        else {
            switch (variant) {
                case 'caption1':
                    return `
                font-size: 28px; 
                `;
                case 'caption2':
                    return `
                font-size: 20px; 
                `;
                case 'subtitle1':
                    return `
                font-size: 16px; 
                `;
                case 'subtitle2':
                    return `
                font-size: 16px; 
                `;
                case 'text':
                    return `
                font-size: 14px; 
                `;
                case 'faded':
                    return `
                font-size: 20px; 
                `;
                default: return ``;

            }
        }
    }}

   ${({ color }) => {
        switch (color) {
            case "faded1":
                return `
            color:#cccccc;
            `
            case "faded2":
                return `
            color:#666666;
            `
            case "white":
                return `
            color:#fff;    
            `
            case "blue":
                return `
            color:#0d0c4e;    
            `
            default:
                return `
            color:#000;
            `
        }
    }}

    ${({ fontWeight, variant }) => {
        if (fontWeight) return `font-weight: ${fontWeight};`
        else {
            switch (variant) {
                case 'caption1':
                    return `
                font-weight: 400; 
                `;
                case 'caption2':
                    return `
                font-weight: 400;
                `;
                case 'subtitle1':
                    return `
                font-weight: 500;
                `;
                case 'subtitle2':
                    return `
                font-weight: 400; 
                `;
                case 'text':
                    return `
                font-weight: 400;      
                `;
                case 'faded':
                    return `
                font-weight: 400;
                `;
                default: return ``;

            }
        }
    }}

  ${({ fontWeight }) => (fontWeight && `font-weight: ${fontWeight};`)}

  ${({ cursor }) => (cursor && `cursor: pointer;`)}


  ${({ hoverColor }) => (hoverColor && `&:hover{
    color: ${hoverColor};
  }`)}

  ${({ wrap, tag }) => ((!tag && wrap) ? `display:contents` : `white-space: nowrap;`)}
  
  ${({ maxLineHeight }) => (maxLineHeight && `max-height: ${maxLineHeight};`)}

`;

const Typography: React.FC<TypographyProps> = (props) => {
    return (
        <div className={props.className} ref={props.ref} style={props.styles}>

            <StyledTypography variant={props.variant} color={props.color} cursor={props.cursor} fontSize={props.fontSize} lineHeight={props.lineHeight} fontWeight={props.fontWeight} maxLineHeight={props.maxLineHeight} hoverColor={props.hoverColor} wrap={props.wrap} tag={props.tag}>
                {props.children}
            </StyledTypography>
        </div>
    )
}

export default Typography