/*
 *  Power BI Visualizations
 *
 *  Copyright (c) Microsoft Corporation
 *  All rights reserved.
 *  MIT License
 *
 *  Permission is hereby granted, free of charge, to any person obtaining a copy
 *  of this software and associated documentation files (the ""Software""), to deal
 *  in the Software without restriction, including without limitation the rights
 *  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 *  copies of the Software, and to permit persons to whom the Software is
 *  furnished to do so, subject to the following conditions:
 *
 *  The above copyright notice and this permission notice shall be included in
 *  all copies or substantial portions of the Software.
 *
 *  THE SOFTWARE IS PROVIDED *AS IS*, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 *  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 *  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 *  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 *  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 *  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 *  THE SOFTWARE.
 */

module powerbi.extensibility.visual {
    export interface IDotPlotDataPoints {
        dataPoints: IDotPlotViewModel[];
        xTitleText: string;
        yTitleText: string;
        minValue: number;
        maxValue: number;
    }

    export interface ITooltipDataPoints {
        name: string;
        value: string;
    }

    export interface ILegendDataPoint {
        category: string;
        value: number;
        color: string;
        identity: powerbi.visuals.ISelectionId;
        selected: boolean;
    }

    export interface IDotPlotViewModel {
        category: string;
        categoryGroup: string;
        value: number;
        selectionId: ISelectionId;
        categoryColor: string;
        categorySize: number;
        tooltipData: ITooltipDataPoints[];
        xCategoryParent: string;
        updatedXCategoryParent: string;
        highlights: {};
        key: number;
    }

    export interface IAxisSettings {
        show: boolean;
        position: string;
        scale: string;
        start: number;
        end: number;
        fontColor: string;
        fontSize: number;
        labelsFontFamily: string;
        decimalPlaces: number;
        displayUnits: number;
        minWidth: number;
        showTitle: boolean;
        titleText: string;
        titleColor: string;
        titleSize: number;
        titleFontFamily: string;
    }

    export interface IParentAxisSettings {
        split: boolean;
        fontColor: string;
        fontSize: number;
        fontFamily: string;
    }

    export interface IBackgroundSettings {
        bgPrimaryColor: string;
        bgSecondaryColor: string;
        bgTransparency: number;
        show: boolean;
    }

    export interface IGridLinesSettings {
        showAxisGridLines: boolean;
        axisStyle: string;
        thickness: number;
        color: string;
        showCategoryGridLines: boolean;
        categoryStyle: string;
        categoryThickness: number;
        categoryColor: string;
    }

    export interface ITickSettings {
        showAxisTicks: boolean;
        thickness: number;
        color: string;
        showCategoryTicks: boolean;
        categoryTickThickness: number;
        categoryTickColor: string;
    }

    export interface IGradientSelectorSettings {
        minColor: string;
        maxColor: string;
    }

    export interface IRangeSettings {
        dotsColor: string;
        style: string;
        shape: string;
        border: boolean;
        borderColor: string;
        min: number;
        max: number;
        hoverColor: string;
        transparency: number;
    }

    export interface ILegendConfig {
        show: boolean;
        legendName: string;
        showTitle: boolean;
        labelColor: string;
        fontSize: number;
        fontFamily: string;
        sizeLegendColor: string;
        displayUnits: number;
        decimalPlaces: number;
    }

    export interface IFlipSettings {
        orient: string;
        flipText: boolean;
        flipParentText: boolean;
    }

    export interface ISortSettings {
        axis: string;
        parent: string;
    }

    export interface IHighlightSettings {
        show: boolean;
    }

    export interface IJitterSettings {
        show: boolean;
    }
}
