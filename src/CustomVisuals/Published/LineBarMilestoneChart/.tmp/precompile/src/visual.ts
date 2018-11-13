/*
 *  Power BI Visual CLI
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

module powerbi.extensibility.visual.lineBarMilestoneChart406DB93C13C94724B65458578706FC21_1  {
    'use strict';
    import legend = powerbi.extensibility.utils.chart.legend;
    import IColorPalette = powerbi.extensibility.IColorPalette;
    import createLegend = powerbi.extensibility.utils.chart.legend.createLegend;
    import position = powerbi.extensibility.utils.chart.legend.positionChartArea;
    import LegendData = powerbi.extensibility.utils.chart.legend.LegendData;
    import ILegend = powerbi.extensibility.utils.chart.legend.ILegend;
    import legendIcon = powerbi.extensibility.utils.chart.legend.LegendIcon;
    import LegendPosition = powerbi.extensibility.utils.chart.legend.LegendPosition;
    import IValueFormatter = powerbi.extensibility.utils.formatting.IValueFormatter;
    import valueFormatter = powerbi.extensibility.utils.formatting.valueFormatter;
    import AxisHelper = powerbi.extensibility.utils.chart.axis;
    import textMeasurementService = powerbi.extensibility.utils.formatting.textMeasurementService;
    import TextProperties = powerbi.extensibility.utils.formatting.TextProperties;
    import DataViewObjects = powerbi.extensibility.utils.dataview.DataViewObjects;
    import TooltipEventArgs = powerbi.extensibility.utils.tooltip.TooltipEventArgs;
    import ITooltipServiceWrapper = powerbi.extensibility.utils.tooltip.ITooltipServiceWrapper;
    import TooltipEnabledDataPoint = powerbi.extensibility.utils.tooltip.TooltipEnabledDataPoint;
    import createTooltipServiceWrapper = powerbi.extensibility.utils.tooltip.createTooltipServiceWrapper;
    import SelectableDataPoint = powerbi.extensibility.utils.interactivity.SelectableDataPoint;
    import IInteractivityService = powerbi.extensibility.utils.interactivity.IInteractivityService;
    import createInteractivityService = powerbi.extensibility.utils.interactivity.createInteractivityService;
    import appendClearCatcher = powerbi.extensibility.utils.interactivity.appendClearCatcher;
    import IInteractiveBehavior = powerbi.extensibility.utils.interactivity.IInteractiveBehavior;
    import ISelectionHandler = powerbi.extensibility.utils.interactivity.ISelectionHandler;

    let maxValue: number;
    let minValue: number;
    let barMaxValue: number;
    let lineMaxValue: number;
    let barMinValue: number;
    let lineMinvalue: number;
    let legendData: LegendData;
    let uniqueValuesLegend: PrimitiveValue[];
    let colors: IColors[] = [];
    // tslint:disable-next-line:no-any
    let colorsNew: any[][];
    // tslint:disable-next-line:no-any
    let yTextFormatterNew: any[][];
    let width: number;
    let height: number;
    // To check date hierarchy
    let dateFlag: boolean = false;
    // To check whether data is numeric or not
    let dataTypeNumberFlag: boolean = true;
    let staticHost: IVisualHost;
    let maxValueFormat: string;
    const scaleArray: string[] = [];
    let visualHost: IVisualHost;
    // tslint:disable-next-line:prefer-const
    let mileStoneGroupCategory: DataViewValueColumn;
    let legendCategory: DataViewCategoryColumn;
    let uniqueValues: string[];
    let mileStoneData: IMileStonePoint[];
    let mileStoneGroupData: IMileStonePoint[];
    let innerDivMaxValueArray: number[] = [];
    let innerDivMinValueArray: number[] = [];
    let outerDivMaxValueArray: number[] = [];
    let outerDivMinValueArray: number[] = [];
    // To check whether milestones are present or not.
    let mileStoneFlag: boolean;
    // To check whether milestone group data is present or not.
    let mileStoneGroupFlag: boolean;
    // To check whether legend column is present or not.
    let legendFlag: boolean;
    let dataLength: number;
    let selectionManager: ISelectionManager;
    // tslint:disable-next-line:no-any
    let xStart: any = null;
    // tslint:disable-next-line:no-any
    let xEnd: any = null;
    let actualWidth: number = 0;
    // X axis labels height
    let xAxisLabelsHeight: number;
    let xAxisLabelsWidth: number;
    let yAxisWidthNew: number = 0;
    // tslint:disable-next-line:prefer-const
    let yAxisLabelHeight: number = 0;
    // tslint:disable-next-line
    let ySecAxisLabelHeight: number = 0;
    let yHeight: number;
    // tslint:disable-next-line:prefer-const
    let ySecHeight: number;
    // tslint:disable-next-line:prefer-const
    let yTitleWidth: number = 0;
    // tslint:disable-next-line:prefer-const
    let ySecTitleWidth: number = 0;
    let ySecPosition: string = null;
    let legendTitle: string = '';
    let mileStoneTitle: string = '';
    let mileStoneGroupTitle: string = '';
    let xAxisStartRange: number;
    let todayHeight: number;
    // tslint:disable-next-line:prefer-const
    let todayLineFlag: boolean = true;
    // To check the type of x scale
    let categoryFlag: boolean;
    // To determine whether data is present in line column or not.
    let renderLineFlag: boolean;
    // To determine whether data is present in bar column or not.
    let renderBarFlag: boolean;
    // To determine whether data is present in tooltip column or not.
    let tooltipFlag: boolean;
    // X axis label max-width
    const xAxisLabelWidth: number = 100;
    // y axis width
    let yAxisWidth: number;
    let ySecAxisWidth: number;
    let leftAxisWidth: number;
    let rightAxisWidth: number;
    // To display dynamic labels on x axis
    let xTitleName: string;
    let noOfWeeks: number;
    let noOfMonths: number;
    let noOfDays: number;
    let noOfQuarter: number;
    let noOfYears: number;
    let noOFHalfYears: number;
    const monthsPerYear: number = 12;
    const quartersPerYear: number = 4;
    const daysPerWeek: number = 7;
    const daysPerYear: number = 365;
    const daysPerMonth: number = 30;
    let numberOfCategoryColumn: number = 0;
    let selectionClear: ISelectionHandler;
    let startDate: Date;
    let endDate: Date;
    let adjustedLegendHeight: number = 0;
    let xAxisTitleHeight: number = 0;
    let tooltipDataItem: VisualTooltipDataItem[] = [];
    let sectionalHeight: number;
    const lowOpacity: number = 0.5;
    const highOpacity: number = 1;
    let dateValues: string[][] = [];
    // tslint:disable-next-line:prefer-const
    let isSecondary: boolean = false;
    let todayPosition: string = 'below';
    // tslint:disable-next-line:prefer-const
    let milestoneIndex: number = 0;
    let globalIndex: number = 1;
    // tslint:disable-next-line:no-any
    let categoryValues: any[] = [];
    let columnNames: string[] = [];
    let nullValuesIndex: number[] = [];
    let legendWidth: number;
    const colorName: string[] = ['#01B8AA', '#374649', '#FD625F', '#5F6B6D', '#8AD4EB', '#FE9666', '#A66999', '#3599B8',
        '#DFBFBF', '#4AC5BB', '#5F6B6D', '#FB8281', '#F4D25A', '#7F898A', '#A4DDEE', '#FDAB89', '#B687AC', '#28738A', '#A78F8F', '#168980',
        '#293537', '#BB4A4A', '#B59525', '#475052', '#6A9FB0', '#BD7150', '#7B4F71', '#1B4D5C', '#706060', '#0F5C55'];
    const colorLength: number = 30;
    const monthName: string[] = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    export class LineBarChartBehavior implements IInteractiveBehavior {
        private options: ILineBarChartBehaviorOptions;
        /**
         * Function to bind the visual to the interactivityService.
         * @function
         * @param {ILineBarChartBehaviorOptions} options    - contain data which required to bind the visual to the interactivityService..
         * @namespace {ISelectionHandler} selectionHandler  - handles a selection event by selecting the given data point.
         */
        public bindEvents(options: ILineBarChartBehaviorOptions, selectionHandler: ISelectionHandler): void {
            this.options = options;
            selectionClear = selectionHandler;
            options.lineSelection.on('click', (d: SelectableDataPoint) => {
                selectionManager.clear();
                d3.selectAll(`.rectangle`).classed('selected', false);
                d3.selectAll('.lineClass').style('opacity', highOpacity);
                d3.selectAll('.mileLineToday').style('opacity', highOpacity);
                d3.selectAll(`.todayText, .todayLine, .mLine`).style('opacity', highOpacity);
                d3.selectAll('.rectangle').style('opacity', highOpacity);
                //selectionHandler.handleSelection(d, (d3.event as MouseEvent).ctrlKey);
                selectionHandler.handleSelection(d, false);
                (<Event>d3.event).stopPropagation();
            });

            d3.selectAll('.legendItem').on('click', (d: SelectableDataPoint) => {
                selectionManager.clear();
                d3.selectAll(`.rectangle`).classed('selected', false);
                d3.selectAll('.lineClass').style('opacity', highOpacity);
                d3.selectAll('.mileLineToday').style('opacity', highOpacity);
                d3.selectAll(`.todayText, .todayLine, .mLine`).style('opacity', highOpacity);
                d3.selectAll('.rectangle').style('opacity', highOpacity);
                //selectionHandler.handleSelection(d, (d3.event as MouseEvent).ctrlKey);
                selectionHandler.handleSelection(d, false);
                (<Event>d3.event).stopPropagation();
            });

            options.clearCatcher.on('click', () => {
                selectionManager.clear();
                selectionHandler.handleClearSelection();
                d3.selectAll('.rectangle').style('opacity', highOpacity);
                d3.selectAll('.mileLineToday').style('opacity', highOpacity);
                d3.selectAll('lineClass').style('opacity', highOpacity);
                d3.selectAll('.todayLine, .mLine').style('opacity', highOpacity);
            });
        }
        /**
         * Function to check whether there is at least one item selected and apply the respective property to the selected items.
         * @function
         * @param {boolean} hasSelection - Checks whether there is at least one item selected.
         *
         */
        public renderSelection(hasSelection: boolean): void {
            // tslint:disable-next-line:no-any
            this.options.lineSelection.style('opacity', (d: any) => {
                d3.selectAll('.mileLineToday').style('opacity', (hasSelection) ? lowOpacity : highOpacity);
                d3.selectAll(`.todayText, .todayLine, .mLine`).style('opacity', (hasSelection) ? lowOpacity : highOpacity);

                return (hasSelection && !d.selected) ? lowOpacity : highOpacity;
            });
            // tslint:disable-next-line:no-any
            this.options.barSelection.style('opacity', (d: any) => {
                d3.selectAll('.mileLineToday').style('opacity', (hasSelection) ? lowOpacity : highOpacity);
                d3.selectAll(`.todayText, .todayLine, .mLine`).style('opacity', (hasSelection) ? lowOpacity : highOpacity);

                return (hasSelection && !d.selected) ? lowOpacity : highOpacity;
            });
            // tslint:disable-next-line:no-any
            this.options.legendSelection.style('opacity', (d: any) => {
                d3.selectAll('.mileLineToday').style('opacity', (hasSelection) ? lowOpacity : highOpacity);
                d3.selectAll(`.todayText, .todayLine, .mLine`).style('opacity', (hasSelection) ? lowOpacity : highOpacity);

                return (hasSelection && !d.selected) ? lowOpacity : highOpacity;
            });
        }
    }
    /**
     * Gets property value for a particular object.
     *
     * @function
     * @param {DataViewObjects} objects - Map of defined objects.
     * @param {string} objectName       - Name of desired object.
     * @param {string} propertyName     - Name of desired property.
     * @param {T} defaultValue          - Default value of desired property.
     */
    export function getValue<T>(objects: DataViewObjects, objectName: string, propertyName: string, defaultValue: T): T {
        if (objects) {
            let object: DataViewObject;
            object = objects[objectName];
            if (object) {
                // tslint:disable-next-line:no-any
                let property: any;
                property = object[propertyName];
                if (property !== undefined) {
                    return property;
                }
            }
        }

        return defaultValue;
    }
    /**
     * Gets property value for a particular object in a category.
     *
     * @function
     * @param {DataViewCategoryColumn} category - List of category objects.
     * @param {number} index                    - Index of category object.
     * @param {string} objectName               - Name of desired object.
     * @param {string} propertyName             - Name of desired property.
     * @param {T} defaultValue                  - Default value of desired property.
     */
    export function getCategoricalObjectValue<T>(category: DataViewCategoryColumn, index: number, objectName: string,
                                                 propertyName: string, defaultValue: T): T {
        let categoryObjects: DataViewObjects[];
        categoryObjects = category.objects;
        if (categoryObjects) {
            let categoryObject: DataViewObject;
            categoryObject = categoryObjects[index];
            if (categoryObject) {
                let object: DataViewPropertyValue;
                object = categoryObject[objectName];
                if (object) {
                    let property: T;
                    property = <T>object[propertyName];
                    if (property !== undefined) {
                        return property;
                    }
                }
            }
        }

        return defaultValue;
    }
    /**
     * Function to return date value.
     *
     * @function
     * @param {string[]} value - List of inputs containing year, quarter, month and day.
     *
     */
    function dateConverter(value: string[]): Date {
        let monthNumber: number;
        if (value.length === 4) {
            return new Date(Number(value[0]), (monthName.indexOf(value[2].substr(0, 3))), Number(value[3]));
        } else if (value.length === 3) {
            return new Date(Number(value[0]), (monthName.indexOf(value[2].substr(0, 3))));
        } else if (value.length === 2) {
            monthNumber = value[1] === 'Qtr 1' ? 0 : value[1] === 'Qtr 2' ? 3 : value[1] === 'Qtr 3' ? 6 : 9;

            return new Date(Number(value[0]), monthNumber);
        }
    }
    /**
     * Function to return list of date category column values.
     *
     * @function
     * @param {DataViewCategoryColumn} category - List of inputs containing year, quarter, month and day.
     *
     */
    // tslint:disable-next-line:no-any
    function getCategoricalDateValues(category: DataViewCategoryColumn): void {
        const lengthOfCategory: number = category.values.length;
        let startIndexFlag: boolean = true;
        for (let index: number = 0; index < lengthOfCategory; index++) {
            // tslint:disable-next-line:no-any
            let tempDate: any = null;
            if (nullValuesIndex.indexOf(index) === -1) {
                if ((<Date>category.values[index]) instanceof Date) {
                    dateFlag = true;
                    if (startIndexFlag) {
                        startDate = <Date>category.values[index];
                        endDate = <Date>category.values[index];
                        startIndexFlag = false;
                    } else {
                        if (startDate > <Date>category.values[index]) {
                            startDate = <Date>category.values[index];
                        }
                        if (endDate < <Date>category.values[index]) {
                            endDate = <Date>category.values[index];
                        }
                    }
                } else if (numberOfCategoryColumn === 1) {
                    dateFlag = false;
                    if (!(typeof (category.values[index]) === 'number')) {
                        dataTypeNumberFlag = false;
                    } else {
                        tempDate = category.values[index];
                        dataTypeNumberFlag = true;
                    }
                } else {
                    dateFlag = true;
                    tempDate = dateConverter(dateValues[index]);
                    if (index === 0) {
                        startDate = <Date>tempDate;
                        endDate = <Date>tempDate;
                    } else {
                        if (startDate > <Date>tempDate) {
                            startDate = <Date>tempDate;
                        }
                        if (endDate < <Date>tempDate) {
                            endDate = <Date>tempDate;
                        }
                    }
                }
                if (numberOfCategoryColumn === 1) {
                    categoryValues.push(<Date>category.values[index]);
                } else {
                    categoryValues.push(tempDate);
                }
            } else {
                categoryValues.push(null);
            }
        }
    }
    /**
     * Function to return data model after categorized data.
     *
     * @function
     * @param {DataViewCategoryColumn} categoryColumn - category column cantaining category data for legend field.
     * @param {string} role - a string which contains information regarding role of data.
     * @param {DataViewValueColumn} valueColumn - value column containing measure data.
     */
    function getLegendData(categoryColumn: DataViewCategoryColumn, role: string[], valueColumn: DataViewValueColumn): IVisualViewModel[] {
        const tempViewModel: IVisualViewModel[] = [];
        const legendUniqueValues: string[] = [];
        const lengthCategoryData: number = categoryColumn.values.length;
        for (let index: number = 0; index < lengthCategoryData; index++) {
            if ((legendCategory.values[index] !== null && legendCategory.values[index] !== '') &&
                legendUniqueValues.indexOf(<string>legendCategory.values[index]) === -1) {
                legendUniqueValues.push(<string>legendCategory.values[index]);
            } else if ((legendCategory.values[index] === null || legendCategory.values[index] === '') &&
                legendUniqueValues.indexOf('(Blank)') === -1) {
                legendUniqueValues.push('(Blank)');
            }
        }
        let increment: number = 0;
        // legendUniqueValues.forEach(function (data: PrimitiveValue): void {
        //     let tempDataPoints: IVisualDataPoint[] = [];
        //     let dataRole: string[] = [];
        //     dataRole = role;
        //     for (let iterator: number = 0; iterator < lengthCategoryData; iterator++) {
        //         if (legendCategory.values[iterator] !== null && legendCategory.values[iterator] !== '' &&
        //             legendCategory.values[iterator].toString() === data.toString()) {
        //             tempDataPoints.push({
        //                 dates: numberOfCategoryColumn === 1 ? categoryValues[iterator] === null ? '(Blank)' :
        //                     categoryValues[iterator] : columnNames[iterator],
        //                 actualDates: categoryValues[iterator],
        //                 yvalue: valueColumn.values[iterator],
        //                 CL: null,
        //                 LCL1: null,
        //                 LCL2: null,
        //                 LCL3: null,
        //                 UCL1: null,
        //                 UCL2: null,
        //                 UCL3: null,
        //                 selected: false,
        //                 identity: visualHost.createSelectionIdBuilder().withCategory(
        //                     categoryColumn, iterator).createSelectionId()
        //             });
        //         } else if ((legendCategory.values[iterator] === null || legendCategory.values[iterator] === '') &&
        //             data.toString() === '(Blank)') {
                    
        //             tempDataPoints.push({
        //                 dates: numberOfCategoryColumn === 1 ? categoryValues[iterator] === null ? '(Blank)' :
        //                     categoryValues[iterator] : columnNames[iterator],
        //                 actualDates: categoryValues[iterator],
        //                 yvalue: valueColumn.values[iterator],
        //                 CL: null,
        //                 LCL1: null,
        //                 LCL2: null,
        //                 LCL3: null,
        //                 UCL1: null,
        //                 UCL2: null,
        //                 UCL3: null,
        //                 selected: false,
        //                 identity: visualHost.createSelectionIdBuilder().withCategory(
        //                     categoryColumn, iterator).createSelectionId()
        //             });
        //         } else {
                    
        //             tempDataPoints.push({
        //                 dates: numberOfCategoryColumn === 1 ? categoryValues[iterator] === null ? '(Blank)' :
        //                     categoryValues[iterator] : columnNames[iterator],
        //                 actualDates: categoryValues[iterator],
        //                 yvalue: 0,
        //                 CL: null,
        //                 LCL1: null,
        //                 LCL2: null,
        //                 LCL3: null,
        //                 UCL1: null,
        //                 UCL2: null,
        //                 UCL3: null,
        //                 selected: false,
        //                 identity: visualHost.createSelectionIdBuilder().withCategory(
        //                     categoryColumn, iterator).createSelectionId()
        //             });
        //         }
        //     }
        //     tempDataPoints = aggregateData(tempDataPoints);
        //     for (let index: number = 0; index < tempDataPoints.length; index++) {
        //         if (increment === 0) {
        //             innerDivMaxValueArray.push(<number>tempDataPoints[index].yvalue);
        //             innerDivMinValueArray.push(<number>tempDataPoints[index].yvalue > 0 ? 0 :
        //                 <number>tempDataPoints[index].yvalue);
        //         } else {
        //             innerDivMaxValueArray[index] = innerDivMaxValueArray[index] +
        //                 <number>tempDataPoints[index].yvalue;
        //             innerDivMinValueArray[index] = innerDivMinValueArray[index] +
        //                 (<number>tempDataPoints[index].yvalue > 0
        //                     ? 0 : <number>tempDataPoints[index].yvalue);
        //         }
        //     }
        //     tempViewModel.push({
        //         dataPoints: tempDataPoints,
        //         keyName: <string>data,
        //         dataRole: dataRole,
        //         selectionId: visualHost.createSelectionIdBuilder().withMeasure(<string>data).createSelectionId(),
        //         selected: false,
        //         identity: visualHost.createSelectionIdBuilder().withMeasure(<string>data).createSelectionId()
        //     });
        //     increment++;
        // });

        return tempViewModel;
    }
    /**
     * Function to return list of aggregate dataPoints.
     *
     * @function
     * @param {IVisualDataPoint[]} dataPoints - List of dataPoints.
     *
     */
    function aggregateData(dataPoints: IVisualDataPoint[]): IVisualDataPoint[] {
        const length: number = dataPoints.length;
        const aggregateDataPoint: IVisualDataPoint[] = [];
        let tempDate: string;
        let tempActualDates: Date;
        let tempValue: number;
        let tempIdentity: ISelectionId;
        const dateArray: string[] = [];
        for (let index: number = 0; index < length; index++) {
            if (dataPoints[index].dates !== '(Blank)' && dateArray.indexOf(dataPoints[index].dates.toString()) === -1) {
                
                aggregateDataPoint.push({
                    dates: dataPoints[index].dates,
                    actualDates: dataPoints[index].actualDates,
                    yvalue: dataPoints[index].yvalue,
                    CL: null,
                    LCL1: null,
                    LCL2: null,
                    LCL3: null,
                    UCL1: null,
                    UCL2: null,
                    UCL3: null,
                    selected: dataPoints[index].selected,
                    identity: dataPoints[index].identity
                });
                dateArray.push(dataPoints[index].dates.toString());
            } else if (dataPoints[index].dates !== '(Blank)') {
                const dataIndex: number = dateArray.indexOf(dataPoints[index].dates.toString());
                aggregateDataPoint[dataIndex].yvalue = <number>aggregateDataPoint[dataIndex].yvalue + <number>dataPoints[index].yvalue;
                if (maxValue <= <number>aggregateDataPoint[dataIndex].yvalue) {
                    maxValue = <number>aggregateDataPoint[dataIndex].yvalue;
                }
            } else if (dataPoints[index].dates === '(Blank)') {
                
                aggregateDataPoint.push({
                    dates: '(Blank)',
                    actualDates: null,
                    yvalue: dataPoints[index].yvalue,
                    CL: null,
                    LCL1: null,
                    LCL2: null,
                    LCL3: null,
                    UCL1: null,
                    UCL2: null,
                    UCL3: null,
                    selected: dataPoints[index].selected,
                    identity: dataPoints[index].identity
                });
                dateArray.push('(Blank)');
            }
        }
        const aggregateDataLength: number = aggregateDataPoint.length;
        if (dateFlag) {
            for (let index: number = 0; index < aggregateDataLength; index++) {
                for (let iterator: number = index; iterator < aggregateDataLength; iterator++) {
                    if (aggregateDataPoint[index].actualDates > aggregateDataPoint[iterator].actualDates) {
                        tempDate = aggregateDataPoint[index].dates;
                        tempActualDates = aggregateDataPoint[index].actualDates;
                        tempValue = <number>aggregateDataPoint[index].yvalue;
                        tempIdentity = aggregateDataPoint[index].identity,
                            aggregateDataPoint[index].actualDates = aggregateDataPoint[iterator].actualDates;
                        aggregateDataPoint[index].dates = aggregateDataPoint[iterator].dates;
                        aggregateDataPoint[index].yvalue = aggregateDataPoint[iterator].yvalue;
                        aggregateDataPoint[index].identity = aggregateDataPoint[index].identity;
                        aggregateDataPoint[iterator].actualDates = tempActualDates;
                        aggregateDataPoint[iterator].dates = tempDate;
                        aggregateDataPoint[iterator].yvalue = tempValue;
                        aggregateDataPoint[iterator].identity = tempIdentity;
                    }
                }
            }
        }

        return aggregateDataPoint;
    }
    /**
     * Function to create data view model
     * @function
     * @param {VisualUpdateOptions} options - contains references to the size of the container
     *                                        and the dataView which contains all the data
     *                                        the visual had queried.
     * @param {IVisualHost} host            - contains references to the host which contains services
     */
    // tslint:disable-next-line:cyclomatic-complexity
    function visualTransform(options: VisualUpdateOptions, host: IVisualHost, thisObj: any): IVisualViewModel[] {
        const dataViews: DataView[] = options.dataViews;
        const viewModel: IVisualViewModel[] = [];
        let dataPoints: IVisualDataPoint[] = [];
        // tslint:disable-next-line:prefer-const
        let tempBarDataModel: IVisualViewModel[] = [];
        mileStoneData = [];
        mileStoneGroupData = [];
        categoryValues = [];
        const mileStoneGroup: string[] = [];
        nullValuesIndex = [];
        innerDivMaxValueArray = [];
        innerDivMinValueArray = [];
        outerDivMaxValueArray = [];
        outerDivMinValueArray = [];
        mileStoneTitle = '';
        mileStoneGroupTitle = '';
        if (!dataViews
            || !dataViews[0]
            || !dataViews[0].categorical
            || !dataViews[0].categorical.categories
            || !dataViews[0].categorical.categories[0].source
            || !dataViews[0].categorical.values
            || !dataViews[0].metadata) { return viewModel; }

        const view: DataViewCategorical = dataViews[0].categorical;
        const numberOfCategory: number = view.categories.length;
        const numberOfValues: number = view.values.length;
        let categories: DataViewCategoryColumn;
        // tslint:disable-next-line:prefer-const
        let mileStoneCategory: DataViewValueColumn;
        categoryFlag = false;
        renderBarFlag = false;
        renderLineFlag = false;
        tooltipFlag = false;
        mileStoneFlag = false;
        mileStoneGroupFlag = false;
        legendFlag = false;
        numberOfCategoryColumn = 0;
        columnNames = [];
        dateValues = [];
        const innerDivLCL1: boolean = thisObj.settings.innerDiv.LCL1;
        const innerDivLCL2: boolean = thisObj.settings.innerDiv.LCL2;
        const innerDivLCL3: boolean = thisObj.settings.innerDiv.LCL3;
        const innerDivUCL1: boolean = thisObj.settings.innerDiv.UCL1;
        const innerDivUCL2: boolean = thisObj.settings.innerDiv.UCL2;
        const innerDivUCL3: boolean = thisObj.settings.innerDiv.UCL3;
        const outerDivLCL1: boolean = thisObj.settings.outerDiv.LCL1;
        const outerDivLCL2: boolean = thisObj.settings.outerDiv.LCL2;
        const outerDivLCL3: boolean = thisObj.settings.outerDiv.LCL3;
        const outerDivUCL1: boolean = thisObj.settings.outerDiv.UCL1;
        const outerDivUCL2: boolean = thisObj.settings.outerDiv.UCL2;
        const outerDivUCL3: boolean = thisObj.settings.outerDiv.UCL3;
        for (let index: number = 0; index < numberOfCategory; index++) {
            if (view.categories[index].source.roles[`Dates`]) {
                numberOfCategoryColumn++;
                categories = view.categories[index];
                const categoryColumnLength: number = view.categories[index].values.length;
                for (let iterator: number = 0; iterator < categoryColumnLength; iterator++) {
                    if (index === 0) {
                        dateValues[iterator] = [];
                    }
                    if (view.categories[index].values[iterator] !== null && view.categories[index].values[iterator] !== '') {
                        dateValues[iterator].push(view.categories[index].values[iterator].toString());
                        columnNames[iterator] = (columnNames[iterator] === undefined ? '' : `${columnNames[iterator]} `) +
                            view.categories[index].values[iterator].toString();
                    } else if (view.categories[index].values[iterator] === null || view.categories[index].values[iterator] === '') {
                        columnNames[iterator] = `${(columnNames[iterator] === undefined ? '' : columnNames[iterator])}(Blank)`;
                        nullValuesIndex.push(iterator);
                    }
                }
            } else if (view.categories[index].source.roles[`Legend`]) {
                legendFlag = true;
                legendCategory = view.categories[index];
                legendTitle = view.categories[index].source.displayName;
            }
        }
        getCategoricalDateValues(categories);
        const objects: DataViewObject[] = categories.objects;
        const metadata: DataViewMetadata = dataViews[0].metadata;
        const categoryValueLength: number = categories.values.length;
        maxValue = 0;
        barMaxValue = 0;
        lineMaxValue = 0;
        lineMinvalue = 0;
        barMinValue = 0;
        minValue = <number>view.values[0].minLocal;
        uniqueValues = [];
        //let barIncrement: number = 0;
        let lineIncrement: number = 0;
        let measureValues: any[] = [];
        let measureFlag: number = 0;
        let LCL1Values: any[] = [];
        let LCL2Values: any[] = [];
        let LCL3Values: any[] = [];
        let UCL1Values: any[] = [];
        let UCL2Values: any[] = [];
        let UCL3Values: any[] = [];
        let CLValues: any[] = [];
        for (let iCount: number = 0; iCount < numberOfValues; iCount++) {
            if (view.values[iCount].source.roles[`Line`]) {
                measureValues.push(view.values[iCount].values);
            }
            if (view.values[iCount].source.roles[`CL`]) {
                CLValues.push(view.values[iCount].values);
            }
            if (view.values[iCount].source.roles[`LCL1`]) {
                LCL1Values.push(view.values[iCount].values);
            }
            if (view.values[iCount].source.roles[`LCL2`]) {
                LCL2Values.push(view.values[iCount].values);
            }
            if (view.values[iCount].source.roles[`LCL3`]) {
                LCL3Values.push(view.values[iCount].values);
            }
            if (view.values[iCount].source.roles[`UCL1`]) {
                UCL1Values.push(view.values[iCount].values);
            }
            if (view.values[iCount].source.roles[`UCL2`]) {
                UCL2Values.push(view.values[iCount].values);
            }
            if (view.values[iCount].source.roles[`UCL3`]) {
                UCL3Values.push(view.values[iCount].values);
            }

        }
        
        for (let step: number = 0; step < measureValues.length; step++) {
            const tempColors: string[] = [];
            const values: DataViewValueColumn = view.values[step];
            const valuesLength: number = values.values.length;
            dataPoints = [];
            const role: string[] = [];
            const tempRole: string[] = [];
            let min1: number = 0;
            let min2: number = 0;
            let min3: number = 0;
            let max1: number = 0;
            let max2: number = 0;
            let max3: number = 0;
            
            if (innerDivLCL1 || outerDivLCL1) {
                min1 = LCL1Values[step].reduce(function (a, b) {
                    return Math.max(a, b);
                });
            }
            if (innerDivLCL2 || outerDivLCL2) {
                min2 = LCL2Values[step].reduce(function (a, b) {
                    return Math.max(a, b);
                });
            }
            if (innerDivLCL3 || outerDivLCL3) {
                min3 = LCL3Values[step].reduce(function (a, b) {
                    return Math.max(a, b);
                });
            }
            if (innerDivUCL1 || outerDivUCL1) {
                max1 = UCL1Values[step].reduce(function(a, b) {
                    return Math.max(a, b);
                });
            }
            if (innerDivUCL2 || outerDivUCL2) {
                max2 = UCL2Values[step].reduce(function(a, b) {
                    return Math.max(a, b);
                });
            }
            if (innerDivUCL3 || outerDivUCL3) {
                max3 = UCL3Values[step].reduce(function(a, b) {
                    return Math.max(a, b);
                });
            }

            if (maxValue < <number>values.maxLocal) {
                maxValue = <number>values.maxLocal;
                maxValueFormat = values.source.format;
            }
            if (minValue > <number>view.values[step].minLocal) {
                minValue = <number>view.values[step].minLocal;
            }
            if (view.values[step].source.roles[`Line`]) {
                role.push('line');
                renderLineFlag = true;

                if (innerDivLCL1 && <number>view.values[step].minLocal > min1) {
                    innerDivMinValueArray[lineIncrement] = min1;
                } else if (innerDivLCL2 && <number>view.values[step].minLocal > min2) {
                    innerDivMinValueArray[lineIncrement] = min2;
                } else if (innerDivLCL3 && <number>view.values[step].minLocal > min3) {
                    innerDivMinValueArray[lineIncrement] = min3;
                } else {
                    innerDivMinValueArray[lineIncrement] = <number>view.values[step].minLocal;
                }

                if (innerDivUCL3 && <number>view.values[step].maxLocal < max3) {
                    innerDivMaxValueArray[lineIncrement] = max3;
                } else if (innerDivUCL2 && <number>view.values[step].maxLocal < max2) {
                    innerDivMaxValueArray[lineIncrement] = max2;
                } else if (innerDivUCL1 && <number>view.values[step].maxLocal < max1) {
                    innerDivMaxValueArray[lineIncrement] = max1;
                } else {
                    innerDivMaxValueArray[lineIncrement] = <number>view.values[step].maxLocal;
                }

                if (outerDivLCL1 && <number>view.values[step].minLocal > min1) {
                    outerDivMinValueArray[lineIncrement] = min1;
                } else if (outerDivLCL2 && <number>view.values[step].minLocal > min2) {
                    outerDivMinValueArray[lineIncrement] = min2;
                } else if (outerDivLCL3 && <number>view.values[step].minLocal > min3) {
                    outerDivMinValueArray[lineIncrement] = min3;
                } else {
                    outerDivMinValueArray[lineIncrement] = <number>view.values[step].minLocal;
                }

                if (outerDivUCL3 && <number>view.values[step].maxLocal < max3) {
                    outerDivMaxValueArray[lineIncrement] = max3;
                } else if (outerDivUCL2 && <number>view.values[step].maxLocal < max2) {
                    outerDivMaxValueArray[lineIncrement] = max2;
                } else if (outerDivUCL1 && <number>view.values[step].maxLocal < max1) {
                    outerDivMaxValueArray[lineIncrement] = max1;
                } else {
                    outerDivMaxValueArray[lineIncrement] = <number>view.values[step].maxLocal;
                }


                lineIncrement++;
            }
            // if (view.values[step].source.roles[`LCL1`]) {
            //     barIncrement++;
            //     role.push('LCL1');
            //     renderBarFlag = true;
            // }
            // if (view.values[step].source.roles[`Tooltips`]) {
            //     role.push('tooltips');
            //     tooltipFlag = true;
            // }
            if (!(legendFlag && role.length === 0)) {
                const len: number = Math.max(categoryValueLength, valuesLength);
                for (let iterator: number = 0; iterator < len; iterator++) {
                    //let valuesMax: any[] = [];
                    if (nullValuesIndex.indexOf(iterator) === -1) {
                        dataPoints.push({
                            dates: numberOfCategoryColumn === 1 ? categoryValues[iterator] : columnNames[iterator],
                            actualDates: categoryValues[iterator],
                            yvalue: values.values[iterator],
                            CL: CLValues[step] === undefined ? null : CLValues[step][iterator],
                            LCL1: LCL1Values[step] === undefined ? null : LCL1Values[step][iterator],
                            LCL2: LCL2Values[step] === undefined ? null : LCL2Values[step][iterator],
                            LCL3: LCL3Values[step] === undefined ? null : LCL3Values[step][iterator],
                            UCL1: UCL1Values[step] === undefined ? null : UCL1Values[step][iterator],
                            UCL2: UCL2Values[step] === undefined ? null : UCL2Values[step][iterator],
                            UCL3: UCL3Values[step] === undefined ? null : UCL3Values[step][iterator],
                            selected: false,
                            identity: visualHost.createSelectionIdBuilder().withCategory(
                                categories, iterator).createSelectionId()
                        });
                    } else {
                        dataPoints.push({
                            dates: '(Blank)',
                            actualDates: null,
                            yvalue: values.values[iterator],
                            CL: CLValues[step] === undefined ? null : CLValues[step][iterator],
                            LCL1: LCL1Values[step] === undefined ? null : LCL1Values[step][iterator],
                            LCL2: LCL2Values[step] === undefined ? null : LCL2Values[step][iterator],
                            LCL3: LCL3Values[step] === undefined ? null : LCL3Values[step][iterator],
                            UCL1: UCL1Values[step] === undefined ? null : UCL1Values[step][iterator],
                            UCL2: UCL2Values[step] === undefined ? null : UCL2Values[step][iterator],
                            UCL3: UCL3Values[step] === undefined ? null : UCL3Values[step][iterator],
                            selected: false,
                            identity: visualHost.createSelectionIdBuilder().withCategory(
                                categories, iterator).withMeasure('Blank').createSelectionId()
                        });
                    }
                }
            }
            // if ((!dateFlag || numberOfCategoryColumn > 1) && dataPoints.length !== 0) {
            //     dataPoints = aggregateData(dataPoints);
            // }
            if (role.length !== 0) {
                viewModel.push({
                    dataPoints: dataPoints,
                    keyName: values.source.displayName,
                    dataRole: role,
                    selectionId: visualHost.createSelectionIdBuilder().withMeasure(
                        options.dataViews[0].categorical.values[step].source.displayName).createSelectionId(),
                    selected: false,
                    identity: visualHost.createSelectionIdBuilder().withMeasure(
                        options.dataViews[0].categorical.values[step].source.displayName).createSelectionId()
                });
            }
        }

        return viewModel;
    }

    export class LineBarChart implements IVisual {
        private prevDataViewObjects: DataViewObjects = {};
        private target: HTMLElement;
        private updateCount: number;
        private settings: VisualSettings;
        private host: IVisualHost;
        public static thisObj: LineBarChart;
        private textNode: Text;
        private svg: d3.Selection<SVGElement>;
        private mainChart: d3.Selection<SVGElement>;
        private xAxisChartNew: d3.Selection<SVGElement>;
        private yAxisChartNew: d3.Selection<SVGElement>;
        private yAxisChart: d3.Selection<SVGElement>;
        private ySecAxisChart: d3.Selection<SVGElement>;
        private chart: d3.Selection<SVGElement>;
        private rootDiv: d3.Selection<SVGElement>;
        private baseDiv: d3.Selection<SVGElement>;
        private xAxis: d3.Selection<SVGElement>;
        private yAxis: d3.Selection<SVGElement>;
        private xAxisGroup: d3.Selection<SVGElement>;
        private locale: string;
        private yAxisGroup: d3.Selection<SVGElement>;
        private ySecAxisGroup: d3.Selection<SVGElement>;
        private selectionManager: ISelectionManager;
        private lineGroup: d3.Selection<SVGElement>;
        private clickFlag: boolean = false;
        // To render circle at the middle of graph in case of one element in data set
        private midPoint: number;
        private mouseG: d3.Selection<SVGElement>;
        private xScale: d3.scale.Ordinal<string, number>;
        private xScaleNew: d3.scale.Ordinal<string, number>;
        // tslint:disable-next-line:no-any
        private xScale2: any;
        // tslint:disable-next-line:no-any
        private yScale: any;
        // tslint:disable-next-line:no-any
        private yScaleSingle: any;
        // tslint:disable-next-line:no-any
        private yScaleNew: any[];
        // tslint:disable-next-line:no-any
        private yAxisRange: any[][];
        // tslint:disable-next-line:no-any
        private ySecScale: any;
        private targetLines: d3.Selection<SVGElement>;
        private mileStoneLine: d3.Selection<SVGElement>;
        private lineBarData: IVisualViewModel[];
        private tooltipServiceWrapper: ITooltipServiceWrapper;
        private tooltipData: ITooltip[] = [];
        private formatter: IValueFormatter;
        private xFormatter: IValueFormatter;
        private yFormatter: IValueFormatter;
        private yTextFormatter: IValueFormatter;
        private ySecFormatter: IValueFormatter;
        private dataFormatter: IValueFormatter;
        private interactivityService: IInteractivityService;
        private lineSelection: d3.selection.Update<IVisualViewModel>;
        private behavior: LineBarChartBehavior;
        private clearCatcher: d3.Selection<SVGElement>;
        // tslint:disable-next-line:no-any
        private line: any[] = [];
        private lcl1Line: any[] = [];
        private clLine: any[] = [];
        private lcl2Line: any[] = [];
        private lcl3Line: any[] = [];
        private ucl1Line: any[] = [];
        private ucl2Line: any[] = [];
        private ucl3Line: any[] = [];
        private yTextWidth: number;
        private yAxisStart: number;
        private ySecStart: number;
        private ySecEnd: number;
        private yAxisEnd: number;
        private xAxisTitle: string;
        private yAxisPadding: number;
        private ySecAxisPadding: number;
        private mainChartWidth: number;
        private halfBarWidth: number = 0;
        private maxBarWidth: number = 0;
        private legend: ILegend;
        private dataViews: DataView;
        private mileStoneTextwidth: number = 0;
        private mileStoneTextHeight: number = 15;
        private mileStoneTextPadding: number = 5;
        private zeroValue: number = 0;
        private maxTicksOnX: number = 10;
        private maxTicksOnY: number = 10;
        private yDisplayUnit: number[] = [];
        // Paddings for scale range bounds
        private outerPadding: number = 0;
        private padding: number = 0.3;
        private yTicksHeight: number = 25;
        // to check available width for x axis label
        private xTickWidth: number = 0;
        private polygonfullWidth: number = 10;
        private polygonHalfWidth: number = 5;
        private chartPadding: number = 15;
        private xAxisTitleWidth: number = 0;
        private tooltipModel: IVisualViewModel[];
        private decimalValuePrimary: String = '';
        private mileStoneOpacity: number;
        private viewLineModel: IVisualViewModel[];
        private viewBarModel: IVisualViewModel[];
        private returnFlag: boolean = false;
        private todayLine: d3.Selection<SVGElement>;
        private loopOne: boolean;

        // tslint:disable-next-line:typedef
        private settingsAxis = {
            axis: {
                x: {
                    padding: 25
                }
            },
            border: {
                top: 30,
                halfOfTop: 15
            }
        };

        constructor(options: VisualConstructorOptions) {
            this.target = options.element;
            visualHost = this.host = options.host;
            staticHost = options.host;
            this.interactivityService = createInteractivityService(options.host);
            this.legend = createLegend(options.element, false, this.interactivityService, true);
            this.selectionManager = options.host.createSelectionManager();
            this.tooltipServiceWrapper = createTooltipServiceWrapper(this.host.tooltipService, options.element);
            let svg: d3.Selection<SVGElement>;
            this.behavior = new LineBarChartBehavior();
            let yAxisChart: d3.Selection<SVGElement>;
            // tslint:disable-next-line:prefer-const
            let xAxisChartNew: d3.Selection<SVGElement>;
            // tslint:disable-next-line:prefer-const
            let yAxisChartNew: d3.Selection<SVGElement>;
            let rootDiv: d3.Selection<SVGElement>;
            svg = this.svg = d3.select(this.target)
                .append('div').classed('LineBarChart', true);
            this.locale = options.host.locale;

            yAxisChart = this.yAxisChart = this.svg.append('svg').classed('yAxisSVG', true);
            let mainChart: d3.Selection<SVGElement>;
            rootDiv = this.rootDiv = this.svg.append('div').classed('rootDivClass', true)
                .style('overflow-x', 'hidden');
            mainChart = this.mainChart = this.rootDiv.append('div').classed('scrollClass', true);
            let chart: d3.Selection<SVGElement>;
            chart = this.chart = this.mainChart.append('div').classed('chartClass', true);
            this.clearCatcher = appendClearCatcher(this.chart);
        }
        /**
         * Function to update the position of legend and rest of visual.
         * @function
         * @param {VisualUpdateOptions} options - contains references to the size of the container
         *
         */
        public legendPosition(options: VisualUpdateOptions): void {
            let legendHeight: IViewport;
            legendHeight = this.legend.getMargins();
            switch (this.settings.legend.position) {
                case 'Top':
                    height = options.viewport.height - legendHeight.height;
                    width = options.viewport.width;
                    adjustedLegendHeight = legendHeight.height;
                    d3.selectAll('.LineBarChart').style('margin-top', `${legendHeight.height}px`)
                        .style('margin-left', 0).style('margin-right', 0);
                    this.legend.changeOrientation(LegendPosition.Top);
                    break;
                case 'Top center':
                    height = options.viewport.height - legendHeight.height;
                    legendWidth = legendHeight.width + 30;
                    width = options.viewport.width;
                    adjustedLegendHeight = legendHeight.height;
                    d3.selectAll('.LineBarChart').style('margin-top', `${legendHeight.height}px`)
                        .style('margin-left', 0).style('margin-right', 0);
                    this.legend.changeOrientation(LegendPosition.TopCenter);
                    break;
                case 'Bottom':
                    height = options.viewport.height - legendHeight.height;
                    width = options.viewport.width;
                    adjustedLegendHeight = 0;
                    d3.selectAll('.LineBarChart').style('margin-top', 0)
                        .style('margin-left', 0).style('margin-right', 0);
                    this.legend.changeOrientation(LegendPosition.Bottom);
                    break;
                case 'Bottom center':
                    height = options.viewport.height - legendHeight.height;
                    legendWidth = legendHeight.width + 30;
                    width = options.viewport.width;
                    adjustedLegendHeight = 0;
                    d3.selectAll('.LineBarChart').style('margin-top', 0)
                        .style('margin-left', 0).style('margin-right', 0);
                    this.legend.changeOrientation(LegendPosition.BottomCenter);
                    break;
                case 'Left':
                    height = options.viewport.height;
                    width = options.viewport.width - legendHeight.width;
                    adjustedLegendHeight = 0;
                    d3.selectAll('.LineBarChart').style('margin-top', 0)
                        .style('margin-left', `${legendHeight.width}px`).style('margin-right', 0);
                    this.legend.changeOrientation(LegendPosition.Left);
                    break;
                case 'Left center':
                    height = options.viewport.height;
                    width = options.viewport.width - legendHeight.width;
                    adjustedLegendHeight = 0;
                    d3.selectAll('.LineBarChart').style('margin-top', 0)
                        .style('margin-left', `${legendHeight.width}px`).style('margin-right', 0);
                    this.legend.changeOrientation(LegendPosition.LeftCenter);
                    break;
                case 'Right':
                    height = options.viewport.height;
                    width = options.viewport.width - legendHeight.width;
                    adjustedLegendHeight = 0;
                    d3.selectAll('.LineBarChart').style('margin-top', 0)
                        .style('margin-left', 0).style('margin-right', `${legendHeight.width}px`);
                    this.legend.changeOrientation(LegendPosition.Right);
                    break;
                case 'Right center':
                    height = options.viewport.height;
                    width = options.viewport.width - legendHeight.width;
                    adjustedLegendHeight = 0;
                    d3.selectAll('.LineBarChart').style('margin-top', 0)
                        .style('margin-left', 0).style('margin-right', `${legendHeight.width}px`);
                    this.legend.changeOrientation(LegendPosition.RightCenter);
                    break;
                default:
                    break;
            }
        }
        /**
         * Function to create legend data points
         * @function
         * @param {VisualUpdateOptions} options - contains references to the size of the container
         *                                        and the dataView which contains all the data
         *                                        the visual had queried.
         *
         */
        // tslint:disable-next-line:cyclomatic-complexity
        public createLegendDataPoint(options: VisualUpdateOptions, visualhost: IVisualHost): void {
            let uniquevaluesArray: string[] = [];
            const metadataColumns: DataViewMetadataColumn[] = options.dataViews[0].metadata.columns;
            uniqueValuesLegend = [];
            let step: number = 0;
            for (let iterator: number = 0; iterator < this.viewBarModel.length; iterator++) {
                if (legendFlag) {
                    for (let index: number = 0; index < legendCategory.values.length; index++) {
                        if (legendCategory.values[index] !== null && legendCategory.values[index] !== '' &&
                            legendCategory.values[index].toString() ===
                            this.viewBarModel[iterator].keyName.toString() && uniquevaluesArray.indexOf(
                                this.viewBarModel[iterator].keyName) === -1) {
                            colors.push({
                                key: this.viewBarModel[iterator].keyName,
                                color: <string>getCategoricalObjectValue<Fill>(legendCategory, index, 'dataColors', 'fillBarColor', {
                                    solid: {
                                        color: colorName[iterator % colorLength]
                                    }
                                }).solid.color,
                                selectionId: staticHost.createSelectionIdBuilder().withCategory(legendCategory, index).createSelectionId()
                            });
                            uniqueValuesLegend.push(this.viewBarModel[iterator].keyName);
                            uniquevaluesArray.push(this.viewBarModel[iterator].keyName);
                            step++;
                            globalIndex++;
                            break;
                        } else if ((legendCategory.values[index] === null || legendCategory.values[index] !== '') &&
                            this.viewBarModel[iterator].keyName.toString() === '(Blank)' && uniquevaluesArray.indexOf(
                                this.viewBarModel[iterator].keyName) === -1) {
                            colors.push({
                                key: this.viewBarModel[iterator].keyName,
                                color: <string>getCategoricalObjectValue<Fill>(legendCategory, index, 'dataColors',
                                                                               'fillBarColor', {
                                        solid: {
                                            color: colorName[iterator % colorLength]
                                        }
                                    }).solid.color,
                                selectionId: staticHost.createSelectionIdBuilder().withCategory(legendCategory, index)
                                    .createSelectionId()
                            });
                            uniqueValuesLegend.push(this.viewBarModel[iterator].keyName);
                            uniquevaluesArray.push(this.viewBarModel[iterator].keyName);
                            step++;
                            globalIndex++;
                            break;
                        }
                    }
                } else {
                    uniqueValuesLegend.push(this.viewBarModel[iterator].keyName);
                    for (let index: number = 0; index < metadataColumns.length; index++) {
                        let colName: string;
                        colName = this.viewBarModel[iterator].keyName;
                        if (metadataColumns[index].displayName === colName) {
                            colors.push({
                                key: colName,
                                color: <string>getValue<Fill>(metadataColumns[index].objects, 'dataColors', 'fillBarColor', {
                                    solid: {
                                        color: colorName[iterator % colorLength]
                                    }
                                }).solid.color,
                                selectionId: { metadata: metadataColumns[index].queryName }
                            });
                            step++;
                            globalIndex++;
                            break;
                        }
                    }
                }
            }
            uniquevaluesArray = [];
            for (let iterator: number = 0; iterator < this.viewLineModel.length; iterator++) {
                uniqueValuesLegend.push(this.viewLineModel[iterator].keyName);
                for (let index: number = 0; index < metadataColumns.length; index++) {
                    let colName: string;
                    colName = this.viewLineModel[iterator].keyName;
                    if (metadataColumns[index].displayName === colName) {
                        colors.push({
                            key: colName,
                            color: <string>getValue<Fill>(metadataColumns[index].objects, 'dataColors', 'fillLineColor', {
                                solid: {
                                    color: colorName[(this.viewBarModel.length + iterator) % colorLength]
                                }
                            }).solid.color,
                            selectionId: { metadata: metadataColumns[index].queryName }
                        });
                        step++;
                        globalIndex++;
                        break;
                    }
                }
            }
            LineBarChart.thisObj.settings.legend.titleText = LineBarChart.thisObj.settings.legend.titleText !== '' ?
                LineBarChart.thisObj.settings.legend.titleText : legendTitle;
            legendData = {
                title: LineBarChart.thisObj.settings.legend.title ? LineBarChart.thisObj.settings.legend.titleText : '',
                dataPoints: [],
                labelColor: LineBarChart.thisObj.settings.legend.color,
                fontSize: LineBarChart.thisObj.settings.legend.fontSize
            };
            uniqueValuesLegend.forEach(function (data: PrimitiveValue, iterator: number): void {
                legendData.dataPoints.push({
                    label: <string>data,
                    color: colors[iterator].color,
                    icon: powerbi.extensibility.utils.chart.legend.LegendIcon.Circle,
                    selected: false,
                    identity: LineBarChart.thisObj.host.createSelectionIdBuilder().withMeasure(
                        `${data} ${iterator}`).createSelectionId()
                });
            });
            if (this.settings.legend.show) {
                this.loopOne = true;
                this.legendPosition(options);
                //this.legend.drawLegend(legendData, options.viewport);
                this.loopOne = false;
                this.legendPosition(options);
            } else {
                d3.selectAll('.LineBarChart').style('margin-top', 0)
                    .style('margin-left', 0).style('margin-right', 0);
                height = options.viewport.height;
                width = options.viewport.width;
            }
        }
        /**
         * Function to apply all the configurations for x axis
         * @function
         * @param {VisualUpdateOptions} options - contains references to the size of the container
         */
        // tslint:disable-next-line:cyclomatic-complexity
        public applyXAxisConfiguration(options: VisualUpdateOptions, viewModel: IVisualViewModel[]): void {
            let xTitleProp: TextProperties;
            let xAxisProp: TextProperties;
            const categoryLength: number = options.dataViews[0].categorical.categories.length;
            for (let index: number = 0; index < categoryLength; index++) {
                const categoryCol: DataViewCategoryColumn = options.dataViews[0].categorical.categories[index];
                if (categoryCol.source.roles[`Dates`]) {
                    xTitleName = this.xAxisTitle = this.dataViews.categorical.categories[index].source.displayName;
                    this.settings.xAxis.titleText = this.settings.xAxis.titleText === '' ? this.xAxisTitle : this.settings.xAxis.titleText;
                    this.formatter = valueFormatter.create({
                        format: options.dataViews[0].categorical.categories[0].source.format
                    });
                }
            }
            if (categoryFlag) {
                for (let index: number = 0; index < dataLength; index++) {
                    let tempHeight: number;
                    xAxisProp = {
                        text: this.formatter.format(viewModel[0].dataPoints[index].dates),
                        fontFamily: this.settings.xAxis.fontFamily,
                        fontSize: `${this.settings.xAxis.fontSize}px`
                    };
                    tempHeight = textMeasurementService.measureSvgTextWidth(xAxisProp) + 5;
                    if (tempHeight > xAxisLabelsWidth) {
                        xAxisLabelsWidth = tempHeight;
                    }
                    this.xFormatter = valueFormatter.create({
                        format: options.dataViews[0].categorical.categories[0].source.format
                    });
                }
                xAxisLabelsHeight = textMeasurementService.measureSvgTextHeight(xAxisProp) + 5;
            } else {
                if (dateFlag) {
                    this.xFormatter = valueFormatter.create({
                        format: options.dataViews[0].categorical.categories[0].source.format
                    });
                    if ((xAxisLabelWidth * noOFHalfYears) > (width - yHeight - yAxisWidth - ySecAxisWidth)) {
                        this.xFormatter.format = d3.time.format('%Y');
                    } else if ((xAxisLabelWidth * noOfWeeks) < (width - yHeight - yAxisWidth - ySecAxisWidth)) {
                        this.xFormatter.format = d3.time.format('%d %b');
                    } else {
                        this.xFormatter.format = d3.time.format('%b %Y');
                    }
                } else {
                    this.xFormatter = valueFormatter.create({
                        format: options.dataViews[0].categorical.categories[0].source.format
                    });
                }
                xAxisProp = {
                    text: this.formatter.format(viewModel[0].dataPoints[0].dates),
                    fontFamily: this.settings.xAxis.fontFamily,
                    fontSize: `${this.settings.xAxis.fontSize}px`
                };
                xAxisLabelsHeight = textMeasurementService.measureSvgTextHeight(xAxisProp) + 5;
            }
            xTitleProp = {
                text: this.settings.xAxis.titleText,
                fontFamily: this.settings.xAxis.fontFamily,
                fontSize: `${this.settings.xAxis.titleFontSize}px`
            };
            xAxisTitleHeight = this.settings.xAxis.show && this.settings.xAxis.title ?
                textMeasurementService.measureSvgTextHeight(xTitleProp) : 0;
            this.xAxisTitleWidth = textMeasurementService.measureSvgTextWidth(xTitleProp);
            xStart = this.settings.xAxis.startValue !== null && this.settings.xAxis.startValue !== '' ?
                new Date(this.settings.xAxis.startValue) : null;
            xEnd = this.settings.xAxis.endValue !== null && this.settings.xAxis.endValue !== '' ?
                new Date(this.settings.xAxis.endValue) : null;
            if (xStart === null) {
                for (let index: number = 0; index < viewModel[0].dataPoints.length; index++) {
                    if (viewModel[0].dataPoints[index].actualDates !== null) {
                        xStart = viewModel[0].dataPoints[index].actualDates;
                        break;
                    }
                }
            }
            if (xEnd === null) {
                xEnd = viewModel[0].dataPoints[dataLength - 1].actualDates;
            }
            xAxisLabelsHeight = xAxisLabelsWidth * 1.1 * dataLength > (width) ? xAxisLabelsWidth + 5 : xAxisLabelsHeight;
            if (this.settings.xAxis.maxAxisHeight !== null && this.settings.xAxis.maxAxisHeight.toString() !== `0`) {
                xAxisLabelsHeight = height * this.settings.xAxis.maxAxisHeight / 100;
            }
            if (this.settings.xAxis.typeX === 'Categorical') {
                xAxisStartRange = xAxisLabelsWidth * dataLength > 1.1 * (width) ?
                    this.settings.xAxis.minimumCategoryWidth / 2 : xAxisLabelsWidth / 2;
                this.settingsAxis.axis.x.padding = width < this.mainChartWidth + (2 * xAxisStartRange) ? 15 : 0;
            }
            if (!this.settings.xAxis.show) {
                xAxisLabelsHeight = yAxisLabelHeight / 2;
            }
            if ((todayHeight > xAxisTitleHeight) && this.settings.todayLine.show &&
                this.settings.todayLine.labelPosition === 'below') {
                xAxisTitleHeight = todayHeight;
            }
        }
        // tslint:disable-next-line
        public applyColorAscending(index: number, length: number, tempData: any, i: number, iCounter: number, iCount: number): void {
            if (index < length && this.settings.part1.show && this.settings.part2.show) {
                if (tempData[i].yvalue <= this.settings.part1[`threshold${iCounter}`] && tempData[i].yvalue !== null) {
                    this.line[i].attr('stroke', this.settings.indicators.range1);
                    colorsNew[index][i] = this.settings.indicators.range1;
                    // if (i === tempData.length - 2) {
                    //     if (tempData[i + 1].yvalue <= this.settings.part1[`threshold${iCounter}`] && tempData[i + 1].yvalue !== null) {
                    //     colorsNew[index][i + 1] = this.settings.indicators.range1;
                    //     }
                    // }
                } else if (tempData[i].yvalue >= this.settings.part1[`threshold${iCounter + 1}`]
                    && tempData[i].yvalue !== null) {
                    this.line[i].attr('stroke', this.settings.indicators.range3);
                    colorsNew[index][i] = this.settings.indicators.range3;
                    // if (i === tempData.length - 2) {
                    //     if (tempData[i + 1].yvalue >= this.settings.part1[`threshold${iCounter + 1}`]
                    // && tempData[i + 1].yvalue !== null) {
                    //     colorsNew[index][i + 1] = this.settings.indicators.range3;
                    // }
                    // }
                } else if (tempData[i].yvalue !== null) {
                    this.line[i].attr('stroke', this.settings.indicators.range2);
                    colorsNew[index][i] = this.settings.indicators.range2;
                    // if (i === tempData.length - 2) {
                    //     if (tempData[i + 1].yvalue !== null) {
                    //     colorsNew[index][i + 1] = this.settings.indicators.range2;
                    //     }
                    // }
                }

                if ( i === tempData.length - 2) {
                    if (tempData[i + 1].yvalue <= this.settings.part1[`threshold${iCounter}`] && tempData[i + 1].yvalue !== null) {
                        colorsNew[index][i + 1] = this.settings.indicators.range1;
                    } else if (tempData[i + 1].yvalue >= this.settings.part1[`threshold${iCounter + 1}`]
                    && tempData[i + 1].yvalue !== null) {
                        colorsNew[index][i + 1] = this.settings.indicators.range3;
                    } else if (tempData[i + 1].yvalue !== null) {
                        colorsNew[index][i + 1] = this.settings.indicators.range2;
                    }
                }
            } else if (index > (length - 1) && this.settings.part1.show && this.settings.part2.show) {
                if (tempData[i].yvalue <= this.settings.part2[`threshold${iCount}`] && tempData[i].yvalue !== null) {
                    this.line[i].attr('stroke', this.settings.indicators.range1);
                    colorsNew[index][i] = this.settings.indicators.range1;
                    // if (i === tempData.length - 2) {
                    //     colorsNew[index][i + 1] = this.settings.indicators.range1;
                    // }
                } else if (tempData[i].yvalue >= this.settings.part2[`threshold${iCount + 1}`]
                    && tempData[i].yvalue !== null) {
                    this.line[i].attr('stroke', this.settings.indicators.range3);
                    colorsNew[index][i] = this.settings.indicators.range3;
                    // if (i === tempData.length - 2) {
                    //     colorsNew[index][i + 1] = this.settings.indicators.range3;
                    // }
                } else if (tempData[i].yvalue !== null) {
                    this.line[i].attr('stroke', this.settings.indicators.range2);
                    colorsNew[index][i] = this.settings.indicators.range2;
                    // if (i === tempData.length - 2) {
                    //     colorsNew[index][i + 1] = this.settings.indicators.range2;
                    // }
                }
                if ( i === tempData.length - 2) {
                    if (tempData[i + 1].yvalue <= this.settings.part2[`threshold${iCount}`] && tempData[i + 1].yvalue !== null) {
                        colorsNew[index][i + 1] = this.settings.indicators.range1;
                    } else if (tempData[i + 1].yvalue >= this.settings.part2[`threshold${iCount + 1}`]
                    && tempData[i + 1].yvalue !== null) {
                        colorsNew[index][i + 1] = this.settings.indicators.range3;
                    } else if (tempData[i + 1].yvalue !== null) {
                        colorsNew[index][i + 1] = this.settings.indicators.range2;
                    }
                }
            } else {
                this.line[i].attr('stroke', tempData[i].yvalue <= tempData[i + 1].yvalue ?
                    this.settings.indicators.positiveIndicatorColor : this.settings.indicators.negativeIndicatorColor);
                if (tempData[i].yvalue <= tempData[i + 1].yvalue) {
                    colorsNew[index][i] = this.settings.indicators.positiveIndicatorColor;
                    // if (i === tempData.length - 2) {
                    //     colorsNew[index][i + 1] = this.settings.indicators.positiveIndicatorColor;
                    // }
                } else {
                    colorsNew[index][i] = this.settings.indicators.negativeIndicatorColor;
                    // if (i === tempData.length - 2) {
                    //     colorsNew[index][i + 1] = this.settings.indicators.negativeIndicatorColor;
                    // }
                }
                if (tempData[i].yvalue === null) {
                    this.line[i].attr('stroke', 'none');
                }
                if ( i === tempData.length - 2) {
                    if (tempData[i + 1].yvalue <= tempData[i + 2].yvalue) {
                        colorsNew[index][i + 1] = this.settings.indicators.positiveIndicatorColor;
                    } else {
                        colorsNew[index][i + 1] = this.settings.indicators.negativeIndicatorColor;
                    }
                }
            }
        }
        // tslint:disable-next-line
        public applyColorDescending(index: number, length: number, tempData: any, i: number, iCounter: number, iCount: number): void {
            if (index < length && this.settings.part1.show && this.settings.part2.show) {
                if (tempData[i].yvalue >= this.settings.part1[`threshold${iCounter}`] && tempData[i].yvalue !== null) {
                    this.line[i].attr('stroke', this.settings.indicators.range1);
                    colorsNew[index][i] = this.settings.indicators.range1;
                    // if (i === tempData.length - 2) {
                    //     colorsNew[index][i + 1] = this.settings.indicators.range1;
                    // }
                } else if (tempData[i].yvalue <= this.settings.part1[`threshold${iCounter + 1}`]
                    && tempData[i].yvalue !== null) {
                    this.line[i].attr('stroke', this.settings.indicators.range3);
                    colorsNew[index][i] = this.settings.indicators.range3;
                    // if (i === tempData.length - 2) {
                    //     colorsNew[index][i + 1] = this.settings.indicators.range3;
                    // }
                } else if (tempData[i].yvalue !== null) {
                    this.line[i].attr('stroke', this.settings.indicators.range2);
                    colorsNew[index][i] = this.settings.indicators.range2;
                    // if (i === tempData.length - 2) {
                    //     colorsNew[index][i + 1] = this.settings.indicators.range2;
                    // }
                }
                if ( i === tempData.length - 2) {
                    if (tempData[i + 1].yvalue >= this.settings.part1[`threshold${iCounter}`] && tempData[i + 1].yvalue !== null) {
                        colorsNew[index][i + 1] = this.settings.indicators.range1;
                    } else if (tempData[i + 1].yvalue <= this.settings.part1[`threshold${iCounter + 1}`]
                    && tempData[i + 1].yvalue !== null) {
                        colorsNew[index][i + 1] = this.settings.indicators.range3;
                    } else if (tempData[i + 1].yvalue !== null) {
                        colorsNew[index][i + 1] = this.settings.indicators.range2;
                    }
                }
            } else if (index > (length - 1) && this.settings.part1.show && this.settings.part2.show) {
                if (tempData[i].yvalue >= this.settings.part2[`threshold${iCount}`] && tempData[i].yvalue !== null) {
                    this.line[i].attr('stroke', this.settings.indicators.range1);
                    colorsNew[index][i] = this.settings.indicators.range1;
                    // if (i === tempData.length - 2) {
                    //     colorsNew[index][i + 1] = this.settings.indicators.range1;
                    // }
                } else if (tempData[i].yvalue <= this.settings.part2[`threshold${iCount + 1}`]
                    && tempData[i].yvalue !== null) {
                    this.line[i].attr('stroke', this.settings.indicators.range3);
                    colorsNew[index][i] = this.settings.indicators.range3;
                    // if (i === tempData.length - 2) {
                    //     colorsNew[index][i + 1] = this.settings.indicators.range3;
                    // }
                } else if (tempData[i].yvalue !== null) {
                    this.line[i].attr('stroke', this.settings.indicators.range2);
                    colorsNew[index][i] = this.settings.indicators.range2;
                    // if (i === tempData.length - 2) {
                    //     colorsNew[index][i + 1] = this.settings.indicators.range2;
                    // }
                }
                if ( i === tempData.length - 2) {
                    if (tempData[i + 1].yvalue >= this.settings.part2[`threshold${iCount}`] && tempData[i + 1].yvalue !== null) {
                        colorsNew[index][i + 1] = this.settings.indicators.range1;
                    } else if (tempData[i + 1].yvalue <= this.settings.part2[`threshold${iCount + 1}`]
                    && tempData[i + 1].yvalue !== null) {
                        colorsNew[index][i + 1] = this.settings.indicators.range3;
                    } else if (tempData[i + 1].yvalue !== null) {
                        colorsNew[index][i + 1] = this.settings.indicators.range2;
                    }
                }

            } else {
                this.line[i].attr('stroke', tempData[i].yvalue <= tempData[i + 1].yvalue ?
                    this.settings.indicators.positiveIndicatorColor : this.settings.indicators.negativeIndicatorColor);
                if (tempData[i].yvalue <= tempData[i + 1].yvalue) {
                    colorsNew[index][i] = this.settings.indicators.positiveIndicatorColor;
                    // if (i === tempData.length - 2) {
                    //     colorsNew[index][i + 1] = this.settings.indicators.positiveIndicatorColor;
                    // }
                } else {
                    colorsNew[index][i] = this.settings.indicators.negativeIndicatorColor;
                    // if (i === tempData.length - 2) {
                    //     colorsNew[index][i + 1] = this.settings.indicators.negativeIndicatorColor;
                    // }
                }
                if (tempData[i].yvalue === null) {
                    this.line[i].attr('stroke', 'none');
                }
                if (i === tempData.length - 2) {
                    if (tempData[i + 1].yvalue <= tempData[i + 2].yvalue) {
                        colorsNew[index][i + 1] = this.settings.indicators.positiveIndicatorColor;
                    } else {
                        colorsNew[index][i + 1] = this.settings.indicators.negativeIndicatorColor;
                    }
                }
            }
        }
        /**
         * Function to render x axis for inner div
         * @function
         * @param {IVisualViewModel} viewModel - contains all the data
         */
        // tslint:disable-next-line:typedef
        public renderXAxisSingle(viewModel: IVisualViewModel[], index): void {
            let yTextProp: TextProperties;
            yTextProp = {
                text: yTextFormatterNew[index][0].format(this.dataViews.categorical.values[index].values[0]),
                fontFamily: this.settings.yAxis.fontFamily,
                fontSize: `${this.settings.yAxis.fontSize}px`
            };
            yAxisWidthNew = textMeasurementService.measureSvgTextWidth(yTextProp) + 7;
            // tslint:disable-next-line:prefer-const
            let xStartLabelWidth: number;
            const xAxisHeight: number = 30;
            const xAxisFontSize: number = 11;

            d3.selectAll('.xAxisSVGNew').style('height', `${xAxisHeight}px`)
            .style('width', `${actualWidth}px`).style('margin-top', '0px');

            // tslint:disable-next-line
            let xAxisGroupNew = this.xAxisChartNew.append('g').classed('xAxisNew', true);
            //.attr('transform', `translate(30, 10)`);
            let xAxisNew: d3.svg.Axis;
            let scaleNew: d3.scale.Ordinal<string, number>;
            xAxisStartRange = xAxisLabelsWidth * dataLength > 1.1 * ( width ) ?
            this.settings.xAxis.minimumCategoryWidth / 2  : xAxisLabelsWidth / 2;
            scaleNew = d3.scale.ordinal()
                .domain(viewModel[0].dataPoints.map((d: IVisualDataPoint) => d.dates))
                .rangeRoundBands([xAxisLabelsWidth, actualWidth - xAxisLabelsWidth], this.padding, this.outerPadding);
            this.xScaleNew = d3.scale.ordinal()
                .domain(viewModel[0].dataPoints.map((d: IVisualDataPoint) => d.dates))
                .rangeRoundBands([yAxisWidthNew - 10, actualWidth - yAxisWidthNew - 8], this.padding, this.outerPadding);
            xAxisNew = d3.svg.axis()
                    .scale(this.xScaleNew)
                    .orient('bottom')
                    .ticks(viewModel[0].dataPoints.length)
                    .tickFormat(this.xFormatter.format)
                    .tickSize(1)
                    .tickPadding(-5);

            // tslint:disable-next-line:typedef
            const category = this.dataViews.categorical.categories[0].source.type[`category`];
            xAxisGroupNew
                .call(xAxisNew)
                .attr({
                    transform: `translate (${yAxisWidthNew - 20}, ${xAxisHeight - xAxisFontSize - 5})`
                })
                .selectAll('text')
                .classed('xAxisGroup', true)
                .style({
                    'text-anchor': 'start',
                    'font-size': `${xAxisFontSize}px`,
                    fill: '#333333',
                    'font-Family': 'Segoe UI'
                });
            // tslint:disable-next-line
            let numberValues = Math.floor((actualWidth - yAxisWidthNew) / xAxisLabelsWidth);
            // tslint:disable-next-line
            let numberLables = Math.round(dataLength / numberValues);
            if (xAxisLabelsWidth * 1.1 * dataLength > actualWidth) {
            // tslint:disable-next-line:no-shadowed-variable
            d3.selectAll('.xAxisSVGNew .tick').each(function(d: Date, index: number): void {
                if (index % numberLables !== 0 ) {
                    this.remove();
                }
            });
        }
            d3.select('.domain').remove();
    }

        /**
         * Function to render x axis for outer div
         * @function
         * @param {IVisualViewModel} viewModel - contains all the data
         */
        // tslint:disable-next-line:cyclomatic-complexity
        public renderXAxis(viewModel: IVisualViewModel[]): void {
            let xStartLabelWidth: number;
            let xAxis: d3.svg.Axis;
            let xScale: d3.scale.Ordinal<string, number>;
            let xScale2: d3.time.Scale<number, number>;
            if (categoryFlag) {
                xAxisStartRange = xAxisLabelsWidth * dataLength > 1.1 * (width) ?
                this.settings.xAxis.minimumCategoryWidth / 2 : xAxisLabelsWidth / 2;
                actualWidth = width - this.yAxisPadding - yAxisWidth;
                this.maxBarWidth = (actualWidth * 0.9) / dataLength;
                xAxisStartRange = xAxisStartRange + 10;
                actualWidth = actualWidth - 10;
                d3.selectAll('.scrollClass').style('width', `${actualWidth}px`);
                xScale = this.xScale = d3.scale.ordinal()
                    .domain(viewModel[0].dataPoints.map((d: IVisualDataPoint) => d.dates))
                    .rangeBands([5, actualWidth + (actualWidth * 0.063)], this.padding, this.outerPadding);
                xAxis = d3.svg.axis()
                    .scale(xScale)
                    .orient('bottom')
                    .ticks(viewModel[0].dataPoints.length)
                    .tickFormat(this.xFormatter.format)
                    .tickSize(1)
                    .tickPadding(-3);
            } else {
                actualWidth = width - yHeight - yAxisWidth - ySecAxisWidth;
                let xTick: number = dataLength;
                this.maxBarWidth = (actualWidth * 0.9) / dataLength;
                if (this.maxBarWidth > 150) {
                    this.maxBarWidth = 150;
                }
                d3.selectAll('.scrollClass').style('width', `${actualWidth}px`);
                let xStartLabelProp: TextProperties;
                xStartLabelProp = {
                    text: this.xFormatter.format(xStart),
                    fontFamily: this.settings.xAxis.fontFamily,
                    fontSize: `${this.settings.xAxis.fontSize}px`
                };
                xStartLabelWidth = textMeasurementService.measureSvgTextWidth(xStartLabelProp);
                if (dateFlag) {
                    xScale2 = this.xScale2 = d3.time.scale()
                        .domain([xStart, xEnd])
                        .range([this.chartPadding + this.maxBarWidth, actualWidth - this.chartPadding - this.maxBarWidth]);
                } else {
                    const xEndLabelProp: TextProperties = {
                        text: xEnd,
                        fontFamily: this.settings.xAxis.fontFamily,
                        fontSize: `${this.settings.xAxis.fontSize}px`
                    };
                    const xEndLabelWidth: number = textMeasurementService.measureSvgTextWidth(xEndLabelProp);
                    xTick = actualWidth / (xEndLabelWidth * 2);
                    this.xScale2 = d3.scale.linear()
                        .domain([xStart, xEnd])
                        .range([this.chartPadding + (this.maxBarWidth), actualWidth - this.chartPadding - this.maxBarWidth]);
                }
                xAxis = d3.svg.axis()
                    .scale(this.xScale2)
                    .orient('bottom')
                    .ticks(xTick)
                    .tickFormat(this.xFormatter.format)
                    .tickSize(1)
                    .tickPadding(-5);
            }
            // if (categoryFlag) {
            //     if (xAxisLabelsWidth * 1.1 * dataLength <= width) {
            //         d3.selectAll('.rootDivClass').style('overflow', 'hidden');
            //         const availableWidthForText: number = xAxisLabelsWidth * dataLength > 1.1 * (actualWidth) ? xAxisLabelsWidth :
            //             actualWidth / dataLength;
            //     } else {
            //         todayPosition = 'up';
            //     }
            // } else {
            //     todayPosition = 'below';
            // }
        }

        /**
         * Function to apply all the configurations for primary y axis
         * @function
         *
         */
        // tslint:disable-next-line:cyclomatic-complexity
        public applyYAxisConfiguration(): void {
            for (let iIndex: number = 0; iIndex < this.viewLineModel.length; iIndex++) {
                const maxValueLength: number = (((innerDivMaxValueArray[iIndex] * 1.1).toString()).split('.')[0]).length;
                if (maxValueLength > 12 && maxValueLength <= 15) {
                    this.yDisplayUnit[iIndex] = 1e+12;
                } else if (maxValueLength > 9 && maxValueLength <= 12) {
                    this.yDisplayUnit[iIndex] = 1e+9;
                } else if (maxValueLength > 6 && maxValueLength <= 9) {
                    this.yDisplayUnit[iIndex] = 1e+6;
                } else if (maxValueLength > 3 && maxValueLength <= 6) {
                    this.yDisplayUnit[iIndex] = 1e+3;
                } else {
                    this.yDisplayUnit[iIndex] = 10;
                }
            }

            d3.selectAll('.yAxisSVG').style('display', 'none');
            this.yAxisPadding = 3;
            yAxisWidth = 0;
            yHeight = 0;

        }

        /**
         * Function to render y axis of individual sparkline for inner div
         * @function
         * @param {VisualUpdateOptions} options - contains references to the size of the container
         * @param {number} index - contain index of sparkline(measure) from outer div
         */
        // tslint:disable-next-line
        public renderYAxisSingle(options: VisualUpdateOptions, index: number): void {
            // tslint:disable-next-line:no-any
            const yTextFormat: any = valueFormatter.create({
                format: this.dataViews.categorical.values[index].source.format,
                value: this.yDisplayUnit[index],
                precision: yTextFormatterNew[index][0].options.precision > 2 ? 2 : yTextFormatterNew[index][0].options.precision
            });
            const yAxisHeight: number = height - 150;
            //const yAxisWidthNew: number = 30;
            const yAxisFontSize: number = 11;
            this.yScaleSingle = d3.scale.linear()
                .domain([innerDivMinValueArray[index] === outerDivMaxValueArray[index] ? 0 : outerDivMinValueArray[index],
                    outerDivMaxValueArray[index] === outerDivMinValueArray[index] ?
                    outerDivMaxValueArray[index] + <number>1000 : outerDivMaxValueArray[index]])
                .range([height - 160, 10]);
            let yAxis: d3.svg.Axis;
            d3.selectAll('.yAxisSVGNew').style('height', `${yAxisHeight}px`)
            .style('width', `${yAxisWidthNew + 20}px`).style('margin-top', '0px');
            this.yAxisGroup = this.yAxisChartNew.append('g').classed('yAxisNew', true);
            yAxis = d3.svg.axis()
                .scale(this.yScaleSingle)
                .orient('left')
                .tickSize(1)
                .tickFormat(yTextFormat.format)
                .ticks(5)
                .tickPadding(1);
            this.yAxisGroup
                .call(yAxis)
                .attr({
                    transform: `translate(${yAxisWidthNew + 20}, 0)`
                })
                .classed('yAxisGroupNew', true).classed(`yAxis-${index}`, true)
                .style('margin-right', `20px`)
                .selectAll('text')
                .style({
                    'font-size': `${yAxisFontSize}px`,
                    fill: '#333333',
                    'font-Family': 'Segoe UI'
                });
            d3.select('.domain').remove();
        }
        /**
         * Function to render primary y axis for outer div
         * @function
         * @param {VisualUpdateOptions} options - contains references to the size of the container
         *
         */
        // tslint:disable-next-line:cyclomatic-complexity
        public renderYAxis(options: VisualUpdateOptions): void {
            const tempHeight: number = (height) / this.viewLineModel.length;
            let startPoint: number = height + 5;
            sectionalHeight = tempHeight;
            this.yScaleNew = [];
            this.yAxisRange = [[]];
            let endPoint: number;
            for (let index: number = 0; index < this.viewLineModel.length; index++) {

                endPoint = startPoint - tempHeight;
                this.yAxisRange[index] = [endPoint + tempHeight - 5, endPoint];
                this.yScaleNew[index] = d3.scale.linear()
                    .domain([innerDivMinValueArray[index], innerDivMaxValueArray[index]])
                    .range([endPoint + tempHeight - 15, endPoint]);

                startPoint = endPoint;

                // tslint:disable-next-line
                let min: any = options.dataViews[0].categorical.values[index].minLocal;
                // tslint:disable-next-line
                let max: any = options.dataViews[0].categorical.values[index].maxLocal;
            }
        }

        public drawLCLAndUCLForOuterDiv(tempData, i, index) {
            if (this.settings.outerDiv.CL && tempData[i].CL !== null) {
                this.clLine[i] = d3.selectAll('.chartGroup').append('path')
                        .classed(`clLine${index}`, true);
                this.clLine[i].attr({
                    // tslint:disable-next-line:prefer-template
                    d: 'M' + LineBarChart.thisObj.xScaleNew(tempData[i].actualDates) + ',' +
                        LineBarChart.thisObj.yScaleSingle(tempData[i].CL) + 'L' +
                        LineBarChart.thisObj.xScaleNew(tempData[i + 1].actualDates) + ',' +
                        LineBarChart.thisObj.yScaleSingle(tempData[i + 1].CL),
                    fill: 'none',
                    'stroke-width': this.settings.outerDiv.strokeSizeCL,
                    stroke: this.settings.outerDiv.lineColorCL,
                    'stroke-linejoin': 'round'
                });
            }
            if (this.settings.outerDiv.LCL1 && tempData[i].LCL1 !== null) {
                this.lcl1Line[i] = d3.selectAll('.chartGroup').append('path')
                        .classed(`lcl1line${index}`, true);
                this.lcl1Line[i].attr({
                    // tslint:disable-next-line:prefer-template
                    d: 'M' + LineBarChart.thisObj.xScaleNew(tempData[i].actualDates) + ',' +
                        LineBarChart.thisObj.yScaleSingle(tempData[i].LCL1) + 'L' +
                        LineBarChart.thisObj.xScaleNew(tempData[i + 1].actualDates) + ',' +
                        LineBarChart.thisObj.yScaleSingle(tempData[i + 1].LCL1),
                    fill: 'none',
                    'stroke-width': this.settings.outerDiv.strokeSizeLCL1,
                    stroke: this.settings.outerDiv.lineColorLCL1,
                    'stroke-linejoin': 'round'
                });
            }
            if (this.settings.outerDiv.LCL2 && tempData[i].LCL2 !== null) {
                this.lcl2Line[i] = d3.selectAll('.chartGroup').append('path')
                        .classed(`lcl1line${index}`, true);
                this.lcl2Line[i].attr({
                    // tslint:disable-next-line:prefer-template
                    d: 'M' + LineBarChart.thisObj.xScaleNew(tempData[i].actualDates) + ',' +
                        LineBarChart.thisObj.yScaleSingle(tempData[i].LCL2) + 'L' +
                        LineBarChart.thisObj.xScaleNew(tempData[i + 1].actualDates) + ',' +
                        LineBarChart.thisObj.yScaleSingle(tempData[i + 1].LCL2),
                    fill: 'none',
                    'stroke-width': this.settings.outerDiv.strokeSizeLCL2,
                    stroke: this.settings.outerDiv.lineColorLCL2,
                    'stroke-linejoin': 'round'
                });
            }
            if (this.settings.outerDiv.LCL3 && tempData[i].LCL3 !== null) {
                this.lcl3Line[i] = d3.selectAll('.chartGroup').append('path')
                        .classed(`lcl1line${index}`, true);
                this.lcl3Line[i].attr({
                    // tslint:disable-next-line:prefer-template
                    d: 'M' + LineBarChart.thisObj.xScaleNew(tempData[i].actualDates) + ',' +
                        LineBarChart.thisObj.yScaleSingle(tempData[i].LCL3) + 'L' +
                        LineBarChart.thisObj.xScaleNew(tempData[i + 1].actualDates) + ',' +
                        LineBarChart.thisObj.yScaleSingle(tempData[i + 1].LCL3),
                    fill: 'none',
                    'stroke-width': this.settings.outerDiv.strokeSizeLCL3,
                    stroke: this.settings.outerDiv.lineColorLCL3,
                    'stroke-linejoin': 'round'
                });
            }
            if (this.settings.outerDiv.UCL1 && tempData[i].UCL1 !== null) {
                this.ucl1Line[i] = d3.selectAll('.chartGroup').append('path')
                        .classed(`lcl1line${index}`, true);
                this.ucl1Line[i].attr({
                    // tslint:disable-next-line:prefer-template
                    d: 'M' + LineBarChart.thisObj.xScaleNew(tempData[i].actualDates) + ',' +
                        LineBarChart.thisObj.yScaleSingle(tempData[i].UCL1) + 'L' +
                        LineBarChart.thisObj.xScaleNew(tempData[i + 1].actualDates) + ',' +
                        LineBarChart.thisObj.yScaleSingle(tempData[i + 1].UCL1),
                    fill: 'none',
                    'stroke-width': this.settings.outerDiv.strokeSizeUCL1,
                    stroke: this.settings.outerDiv.lineColorUCL1,
                    'stroke-linejoin': 'round'
                });
            }
            if (this.settings.outerDiv.UCL2 && tempData[i].UCL2 !== null) {
                this.ucl2Line[i] = d3.selectAll('.chartGroup').append('path')
                        .classed(`lcl1line${index}`, true);
                this.ucl2Line[i].attr({
                    // tslint:disable-next-line:prefer-template
                    d: 'M' + LineBarChart.thisObj.xScaleNew(tempData[i].actualDates) + ',' +
                        LineBarChart.thisObj.yScaleSingle(tempData[i].UCL2) + 'L' +
                        LineBarChart.thisObj.xScaleNew(tempData[i + 1].actualDates) + ',' +
                        LineBarChart.thisObj.yScaleSingle(tempData[i + 1].UCL2),
                    fill: 'none',
                    'stroke-width': this.settings.outerDiv.strokeSizeUCL2,
                    stroke: this.settings.outerDiv.lineColorUCL2,
                    'stroke-linejoin': 'round'
                });
            }
            if (this.settings.outerDiv.UCL3 && tempData[i].UCL3 !== null) {
                this.ucl3Line[i] = d3.selectAll('.chartGroup').append('path')
                        .classed(`lcl1line${index}`, true);
                this.ucl3Line[i].attr({
                    // tslint:disable-next-line:prefer-template
                    d: 'M' + LineBarChart.thisObj.xScaleNew(tempData[i].actualDates) + ',' +
                        LineBarChart.thisObj.yScaleSingle(tempData[i].UCL3) + 'L' +
                        LineBarChart.thisObj.xScaleNew(tempData[i + 1].actualDates) + ',' +
                        LineBarChart.thisObj.yScaleSingle(tempData[i + 1].UCL3),
                    fill: 'none',
                    'stroke-width': this.settings.outerDiv.strokeSizeUCL3,
                    stroke: this.settings.outerDiv.lineColorUCL3,
                    'stroke-linejoin': 'round'
                });
            }

        }
        /**
         * Function to render individual line on inner div
         * @function
         * @param {IVisualViewModel} viewLineModel - contains all the data that required to render lines for each category
         * @param {number} index - contain index of sparkline(measure) from outer div
         */
        public renderSingleLine(viewLineModel: IVisualViewModel[], index: number): void {
            let thisObj = this;
            // tslint:disable-next-line
            let iCounter = index * 2 + 1;
            // tslint:disable-next-line
            let length = Number(viewLineModel.length / 2) === viewLineModel.length / 2
            && viewLineModel.length / 2 % 1 === 0 ? viewLineModel.length / 2
            : Math.round(viewLineModel.length / 2);
            let blankCount: number = 0;
            let tempData: IVisualDataPoint[];
            tempData = [];
            const dataPointLength: number = viewLineModel[index].dataPoints.length;
            for (let iterator: number = 0; iterator < dataPointLength; iterator++) {
                if (viewLineModel[index].dataPoints[iterator].actualDates !== null && !categoryFlag
                    && viewLineModel[index].dataPoints[iterator].yvalue !== null &&
                    viewLineModel[index].dataPoints[iterator].yvalue >=
                    innerDivMinValueArray[index] && viewLineModel[index].dataPoints[iterator].yvalue <= innerDivMaxValueArray[index]) {
                    tempData.push({
                        actualDates: viewLineModel[index].dataPoints[iterator].actualDates,
                        dates: viewLineModel[index].dataPoints[iterator].dates,
                        yvalue: <number>viewLineModel[index].dataPoints[iterator].yvalue,
                        CL: <number>viewLineModel[index].dataPoints[iterator].CL,
                        LCL1: <number>viewLineModel[index].dataPoints[iterator].LCL1,
                        LCL2: <number>viewLineModel[index].dataPoints[iterator].LCL2,
                        LCL3: <number>viewLineModel[index].dataPoints[iterator].LCL3,
                        UCL1: <number>viewLineModel[index].dataPoints[iterator].UCL1,
                        UCL2: <number>viewLineModel[index].dataPoints[iterator].UCL2,
                        UCL3: <number>viewLineModel[index].dataPoints[iterator].UCL3,
                        identity: viewLineModel[index].identity,
                        selected: viewLineModel[index].selected
                    });
                } else if (categoryFlag || viewLineModel[index].dataPoints[iterator].yvalue === null &&
                    viewLineModel[index].dataPoints[iterator].yvalue >=
                    innerDivMinValueArray[index] && viewLineModel[index].dataPoints[iterator].yvalue <= innerDivMaxValueArray[index]) {
                    tempData.push({
                        actualDates: viewLineModel[index].dataPoints[iterator].actualDates,
                        dates: viewLineModel[index].dataPoints[iterator].dates,
                        yvalue: <number>viewLineModel[index].dataPoints[iterator].yvalue,
                        CL: <number>viewLineModel[index].dataPoints[iterator].CL,
                        LCL1: <number>viewLineModel[index].dataPoints[iterator].LCL1,
                        LCL2: <number>viewLineModel[index].dataPoints[iterator].LCL2,
                        LCL3: <number>viewLineModel[index].dataPoints[iterator].LCL3,
                        UCL1: <number>viewLineModel[index].dataPoints[iterator].UCL1,
                        UCL2: <number>viewLineModel[index].dataPoints[iterator].UCL2,
                        UCL3: <number>viewLineModel[index].dataPoints[iterator].UCL3,
                        identity: viewLineModel[index].identity,
                        selected: viewLineModel[index].selected
                    });
                } else {
                    blankCount++;
                }
            }
            if ((!categoryFlag && (dataPointLength - blankCount) !== 1) || (categoryFlag && dataPointLength !== 1)) {
                d3.selectAll('.mainChartClass').style('height', `${height - 150}px`).style('width', `${actualWidth - yAxisWidthNew - 20}px`)
                .append('g').classed('chartGroup', true);
                // tslint:disable-next-line:prefer-template
                for (let i: number = 0; i < tempData.length - 1; i++) {
                    thisObj.drawLCLAndUCLForOuterDiv(tempData, i, index);
                    this.line[i] = d3.selectAll('.chartGroup').append('path')
                        .classed(`line${index}`, true)
                        .classed(`inline${i}`, true).attr('id', 'inlineClass');
                    this.line[i].attr({
                        // tslint:disable-next-line:prefer-template
                        d: 'M' + LineBarChart.thisObj.xScaleNew(tempData[i].actualDates) + ',' +
                            LineBarChart.thisObj.yScaleSingle(tempData[i].yvalue) + 'L' +
                            LineBarChart.thisObj.xScaleNew(tempData[i + 1].actualDates) + ',' +
                            LineBarChart.thisObj.yScaleSingle(tempData[i + 1].yvalue),
                        fill: 'none',
                        'stroke-width': '2px',
                        stroke: colorsNew[index][i],
                        'stroke-linejoin': 'round'
                    });
                    // thisObj.drawLCLAndUCLForOuterDiv(tempData, i, index);

                    if (this.settings.shapes.lineStyle === 'dotted') {
                        d3.selectAll('.inlineClass').style('stroke-linecap', 'round')
                            .style('stroke-dasharray', `1 ${this.settings.shapes.lineWidth + 4}`);
                    } else if (this.settings.shapes.lineStyle === 'dashed') {
                        d3.selectAll('.inlineClass').style('stroke-dasharray', '10 5');
                    }
                }
            } else if (categoryFlag) {
                this.line[index] = d3.select('.mainChartClass')
                .style('height', `${height - 80}px`).style('width', `${actualWidth - yAxisWidthNew }px`)
                .append('g').classed('chartGroup', true).append('circle')
                    .style('cursor', 'pointer')
                    .classed(`line${index}`, true).attr('id', 'inlineClass');
                this.line[index].attr('r', 4)
                    .attr('transform', `translate(${LineBarChart.thisObj.xScaleNew(tempData[0].actualDates)},
                         ${LineBarChart.thisObj.yScaleSingle(tempData[0].yvalue)})`);
                if (this.settings.part1.show && this.settings.part2.show) {
                    this.line[index].attr('fill', this.settings.indicators.range3);
                    colorsNew[index][0] = this.settings.indicators.range3;
                } else {
                    this.line[index].attr('fill', this.settings.indicators.positiveIndicatorColor);
                    colorsNew[index][0] = this.settings.indicators.positiveIndicatorColor;
                }
            } else {
                this.line[index] = this.chart.append('circle').classed(`line${index}`, true)
                    .attr('class', 'inlineClass').attr('id', `line-${index}`);
                this.line[index].attr('r', 2 + this.settings.shapes.lineWidth)
                    .style('fill', colors[this.viewBarModel.length + index].color)
                    .attr('transform', `translate(${this.xScale(tempData[0].actualDates)}, ${this.yScaleNew[index](tempData[0].yvalue)})`);
            }

            const mouseG: d3.Selection<SVGElement> = LineBarChart.thisObj.mouseG = d3.selectAll('.mainChartClass').append('g')
                .attr('class', 'mouseOver');
            mouseG.append('path').attr('class', 'mouseLine').classed('opacityOff', true);
            d3.selectAll('#circle').classed('opacityOff', true);

            let rectWidth: number;

            rectWidth = width < this.mainChartWidth ? this.mainChartWidth :
                width - yHeight - ySecHeight - yAxisWidth - ySecAxisWidth - 5;

            d3.selectAll('.mainChartClass, g.mouseOver, #inlineClass').on('mouseout', function (): void {
                d3.selectAll('.mouseLine').classed('opacityOn', false).classed('opacityOff', true);
            }).on('mouseover', function (): void {
                d3.selectAll('.mouseLine').classed('opacityOn', true).classed('opacityOff', false);
            }).on('mousemove', function (): void {
                const mouse: [number, number] = d3.mouse(this);
                tooltipDataItem = [];
                // tslint:disable-next-line:no-any
                let exact: any;
                let pointerPosition: number;
                d3.selectAll('path.mouseLine').attr('d', function (): string {
                    tooltipDataItem = [];
                    let d: string;
                    pointerPosition = 0;
                    if (categoryFlag) {
                        for (let iterator: number = 0; iterator < viewLineModel[index].dataPoints.length - 1; iterator++) {
                            const x1: number = LineBarChart.thisObj.xScaleNew(viewLineModel[index].dataPoints[iterator].dates);
                            const x2: number = LineBarChart.thisObj.xScaleNew(viewLineModel[index].dataPoints[iterator + 1].dates);
                            if (mouse[0] - x1 > 0 && mouse[0] - x2 < 0) {
                                if (Math.abs(mouse[0] - x1) > Math.abs(mouse[0] - x2)) {
                                    pointerPosition = iterator + 1;
                                    break;
                                } else {
                                    pointerPosition = iterator;
                                    break;
                                }
                            } else if (mouse[0] < x1) {
                                pointerPosition = iterator;
                                break;
                            } else if (index === viewLineModel[index].dataPoints.length - 2) {
                                pointerPosition = iterator + 1;
                                break;
                            }
                        }
                        exact = viewLineModel[index].dataPoints[pointerPosition].dates;
                        d = `M${LineBarChart.thisObj.xScaleNew(exact)},${0}
                                     ${LineBarChart.thisObj.xScaleNew(exact)},
                                     ${height - 80}`;
                    }
                    const keyName: string = viewLineModel[index].keyName;
                    tooltipDataItem.push({
                        header: LineBarChart.thisObj.formatter.format(exact),
                        displayName: keyName,
                        color: colorsNew[index][pointerPosition],
                        value: yTextFormatterNew[index][pointerPosition].format(viewLineModel[index].dataPoints[pointerPosition].yvalue)
                    });

                    return d;
                });
            });
            LineBarChart.thisObj.tooltipServiceWrapper.addTooltip(d3.selectAll(`.mainChartClass`),
                                                                  (tooltipEvent: TooltipEventArgs<number>) => tooltipDataItem,
                                                                  (tooltipEvent: TooltipEventArgs<number>) => null, true);
        }

        public drawLCLAndUCLForInnerDiv(tempData, i, viewLineModel, index) {
            if (this.settings.innerDiv.CL && tempData[i].CL !== null) {
                this.clLine[i] = d3.select(`.Measure${index}`).append('path')
                .classed(`clLine${index}`, true);
                this.clLine[i].attr({
                    // tslint:disable-next-line:prefer-template
                    d: 'M' + LineBarChart.thisObj.xScale(tempData[i].actualDates) + ',' +
                    (LineBarChart.thisObj.yScaleNew[index](tempData[i].CL) -
                    (sectionalHeight * (viewLineModel.length - index - 1))) + 'L' +
                    LineBarChart.thisObj.xScale(tempData[i + 1].actualDates) + ',' +
                    (LineBarChart.thisObj.yScaleNew[index](tempData[i + 1].CL) -
                    (sectionalHeight * (viewLineModel.length - index - 1))),
                    fill: 'none',
                    'stroke-width': this.settings.innerDiv.strokeSizeCL,
                    stroke: this.settings.innerDiv.lineColorCL,
                    'stroke-linejoin': 'round'
                });
            }
            if (this.settings.innerDiv.LCL1 && tempData[i].LCL1 !== null) {
                this.lcl1Line[i] = d3.select(`.Measure${index}`).append('path')
                .classed(`lcl1line${index}`, true);
                this.lcl1Line[i].attr({
                    // tslint:disable-next-line:prefer-template
                    d: 'M' + LineBarChart.thisObj.xScale(tempData[i].actualDates) + ',' +
                    (LineBarChart.thisObj.yScaleNew[index](tempData[i].LCL1) -
                    (sectionalHeight * (viewLineModel.length - index - 1))) + 'L' +
                    LineBarChart.thisObj.xScale(tempData[i + 1].actualDates) + ',' +
                    (LineBarChart.thisObj.yScaleNew[index](tempData[i + 1].LCL1) -
                    (sectionalHeight * (viewLineModel.length - index - 1))),
                    fill: 'none',
                    'stroke-width': this.settings.innerDiv.strokeSizeLCL1,
                    stroke: this.settings.innerDiv.lineColorLCL1,
                    'stroke-linejoin': 'round'
                });
            }
            if (this.settings.innerDiv.LCL2 && tempData[i].LCL2 !== null) {
                this.lcl2Line[i] = d3.select(`.Measure${index}`).append('path')
                .classed(`lcl2line${index}`, true);
                this.lcl2Line[i].attr({
                    // tslint:disable-next-line:prefer-template
                    d: 'M' + LineBarChart.thisObj.xScale(tempData[i].actualDates) + ',' +
                    (LineBarChart.thisObj.yScaleNew[index](tempData[i].LCL2) -
                    (sectionalHeight * (viewLineModel.length - index - 1))) + 'L' +
                    LineBarChart.thisObj.xScale(tempData[i + 1].actualDates) + ',' +
                    (LineBarChart.thisObj.yScaleNew[index](tempData[i + 1].LCL2) -
                    (sectionalHeight * (viewLineModel.length - index - 1))),
                    fill: 'none',
                    'stroke-width': this.settings.innerDiv.strokeSizeLCL2,
                    stroke: this.settings.innerDiv.lineColorLCL2,
                    'stroke-linejoin': 'round'
                });
            }
            if (this.settings.innerDiv.LCL3 && tempData[i].LCL3 !== null) {
                this.lcl3Line[i] = d3.select(`.Measure${index}`).append('path')
                .classed(`lcl3line${index}`, true);
                this.lcl3Line[i].attr({
                    // tslint:disable-next-line:prefer-template
                    d: 'M' + LineBarChart.thisObj.xScale(tempData[i].actualDates) + ',' +
                    (LineBarChart.thisObj.yScaleNew[index](tempData[i].LCL3) -
                    (sectionalHeight * (viewLineModel.length - index - 1))) + 'L' +
                    LineBarChart.thisObj.xScale(tempData[i + 1].actualDates) + ',' +
                    (LineBarChart.thisObj.yScaleNew[index](tempData[i + 1].LCL3) -
                    (sectionalHeight * (viewLineModel.length - index - 1))),
                    fill: 'none',
                    'stroke-width': this.settings.innerDiv.strokeSizeLCL3,
                    stroke: this.settings.innerDiv.lineColorLCL3,
                    'stroke-linejoin': 'round'
                });
            }
            if (this.settings.innerDiv.UCL1 && tempData[i].UCL1 !== null) {
                this.ucl1Line[i] = d3.select(`.Measure${index}`).append('path')
                .classed(`ucl1line${index}`, true);
                this.ucl1Line[i].attr({
                    // tslint:disable-next-line:prefer-template
                    d: 'M' + LineBarChart.thisObj.xScale(tempData[i].actualDates) + ',' +
                    (LineBarChart.thisObj.yScaleNew[index](tempData[i].UCL1) -
                    (sectionalHeight * (viewLineModel.length - index - 1))) + 'L' +
                    LineBarChart.thisObj.xScale(tempData[i + 1].actualDates) + ',' +
                    (LineBarChart.thisObj.yScaleNew[index](tempData[i + 1].UCL1) -
                    (sectionalHeight * (viewLineModel.length - index - 1))),
                    fill: 'none',
                    'stroke-width': this.settings.innerDiv.strokeSizeUCL1,
                    stroke: this.settings.innerDiv.lineColorUCL1,
                    'stroke-linejoin': 'round'
                });
            }
            if (this.settings.innerDiv.UCL2 && tempData[i].UCL2 !== null) {
                this.ucl2Line[i] = d3.select(`.Measure${index}`).append('path')
                .classed(`ucl2line${index}`, true);
                this.ucl2Line[i].attr({
                    // tslint:disable-next-line:prefer-template
                    d: 'M' + LineBarChart.thisObj.xScale(tempData[i].actualDates) + ',' +
                    (LineBarChart.thisObj.yScaleNew[index](tempData[i].UCL2) -
                    (sectionalHeight * (viewLineModel.length - index - 1))) + 'L' +
                    LineBarChart.thisObj.xScale(tempData[i + 1].actualDates) + ',' +
                    (LineBarChart.thisObj.yScaleNew[index](tempData[i + 1].UCL2) -
                    (sectionalHeight * (viewLineModel.length - index - 1))),
                    fill: 'none',
                    'stroke-width': this.settings.innerDiv.strokeSizeUCL2,
                    stroke: this.settings.innerDiv.lineColorUCL2,
                    'stroke-linejoin': 'round'
                });
            }
            if (this.settings.innerDiv.UCL3 && tempData[i].UCL3 !== null) {
                this.ucl3Line[i] = d3.select(`.Measure${index}`).append('path')
                .classed(`ucl3line${index}`, true);
                this.ucl3Line[i].attr({
                    // tslint:disable-next-line:prefer-template
                    d: 'M' + LineBarChart.thisObj.xScale(tempData[i].actualDates) + ',' +
                    (LineBarChart.thisObj.yScaleNew[index](tempData[i].UCL3) -
                    (sectionalHeight * (viewLineModel.length - index - 1))) + 'L' +
                    LineBarChart.thisObj.xScale(tempData[i + 1].actualDates) + ',' +
                    (LineBarChart.thisObj.yScaleNew[index](tempData[i + 1].UCL3) -
                    (sectionalHeight * (viewLineModel.length - index - 1))),
                    fill: 'none',
                    'stroke-width': this.settings.innerDiv.strokeSizeUCL3,
                    stroke: this.settings.innerDiv.lineColorUCL3,
                    'stroke-linejoin': 'round'
                });
            }
        }

        /**
         * Function to render lines on outer div
         * @function
         * @param {IVisualViewModel} viewLineModel - contains all the data that required to render lines for each category
         *
         */
        // tslint:disable-next-line
        public renderLines(viewLineModel: IVisualViewModel[], options: VisualUpdateOptions): void {
            colorsNew = [[]];
            yTextFormatterNew = [[]];
            // tslint:disable-next-line
            let length = Number(viewLineModel.length / 2) === viewLineModel.length / 2
            && viewLineModel.length / 2 % 1 === 0 ? viewLineModel.length / 2
            : Math.round(viewLineModel.length / 2);
            // tslint:disable-next-line
            let thisObj = this;
            const dataView: DataView = this.dataViews;
            let blankCount: number = 0;
            let iUnit: number = 1;
            const tempHeight: number = (height) / this.viewLineModel.length;
            for (let index: number = 0; index < viewLineModel.length; index++) {
                colorsNew[index] = [];
                yTextFormatterNew[index] = [];
                // tslint:disable-next-line
                let iCounter = index * 2 + 1;
                let iCount: number;
                if (index > (length - 1)) {
                    iCount = (((index * 2) + iUnit) - (index * 2));
                    iUnit = iUnit + 2;
                }
                const strokeWidth: number = this.settings.strokeWidth.strokeWidth > 5 ? 5 : this.settings.strokeWidth.strokeWidth;
                this.chart.append('div').classed('major', true).style({
                    'border-top': `${strokeWidth}px`,
                    'border-bottom': index === 0 ? `${strokeWidth}px` : 0,
                    'border-left': `${strokeWidth}px`,
                    'border-right': `${strokeWidth}px`,
                    'border-color': this.settings.strokeWidth.borderColor,
                    'border-style': 'solid'
                }).style('height', `${sectionalHeight}px`)
                    .style('position', 'absolute').style('margin-top', `${sectionalHeight * (viewLineModel.length - index - 1) - 10}px`)
                    .append('svg').attr('id', `svg-${index}`).style('height', `${sectionalHeight}px`).style('width', `${actualWidth + 4}px`)
                    .style('cursor', 'pointer')
                    .classed('Measure', true).append('g').classed(`Measure${index}`, true);
                blankCount = 0;
                let tempData: IVisualDataPoint[];
                tempData = [];
                const dataPointLength: number = viewLineModel[index].dataPoints.length;
                for (let iterator: number = 0; iterator < dataPointLength; iterator++) {
                    if (viewLineModel[index].dataPoints[iterator].actualDates !== null && !categoryFlag
                        && viewLineModel[index].dataPoints[iterator].yvalue !== null &&
                        viewLineModel[index].dataPoints[iterator].yvalue >=
                        innerDivMinValueArray[index] && viewLineModel[index].dataPoints[iterator].yvalue <= innerDivMaxValueArray[index]) {
                        tempData.push({
                            actualDates: viewLineModel[index].dataPoints[iterator].actualDates,
                            dates: viewLineModel[index].dataPoints[iterator].dates,
                            yvalue: <number>viewLineModel[index].dataPoints[iterator].yvalue,
                            CL: <number>viewLineModel[index].dataPoints[iterator].CL,
                            LCL1: <number>viewLineModel[index].dataPoints[iterator].LCL1,
                            LCL2: <number>viewLineModel[index].dataPoints[iterator].LCL2,
                            LCL3: <number>viewLineModel[index].dataPoints[iterator].LCL3,
                            UCL1: <number>viewLineModel[index].dataPoints[iterator].UCL1,
                            UCL2: <number>viewLineModel[index].dataPoints[iterator].UCL2,
                            UCL3: <number>viewLineModel[index].dataPoints[iterator].UCL3,
                            identity: viewLineModel[index].identity,
                            selected: viewLineModel[index].selected
                        });
                    } else if (categoryFlag || viewLineModel[index].dataPoints[iterator].yvalue === null &&
                        viewLineModel[index].dataPoints[iterator].yvalue >=
                        innerDivMinValueArray[index] && viewLineModel[index].dataPoints[iterator].yvalue <= innerDivMaxValueArray[index]) {
                        tempData.push({
                            actualDates: viewLineModel[index].dataPoints[iterator].actualDates,
                            dates: viewLineModel[index].dataPoints[iterator].dates,
                            yvalue: <number>viewLineModel[index].dataPoints[iterator].yvalue,
                            CL: <number>viewLineModel[index].dataPoints[iterator].CL,
                            LCL1: <number>viewLineModel[index].dataPoints[iterator].LCL1,
                            LCL2: <number>viewLineModel[index].dataPoints[iterator].LCL2,
                            LCL3: <number>viewLineModel[index].dataPoints[iterator].LCL3,
                            UCL1: <number>viewLineModel[index].dataPoints[iterator].UCL1,
                            UCL2: <number>viewLineModel[index].dataPoints[iterator].UCL2,
                            UCL3: <number>viewLineModel[index].dataPoints[iterator].UCL3,
                            identity: viewLineModel[index].identity,
                            selected: viewLineModel[index].selected
                        });
                    } else {
                        blankCount++;
                    }
                }
                if ((categoryFlag && (dataPointLength - blankCount) !== 1) || (categoryFlag && dataPointLength !== 1)) {
                    // tslint:disable-next-line:prefer-template
                    for (let i: number = 0; i < tempData.length - 1; i++) {
                        yTextFormatterNew[index][i] = valueFormatter.create({
                            format: this.dataViews.categorical.values[index].source.format,
                            value: 0,
                            precision: <number>(tempData[i].yvalue) % 1 === 0 ? 0 : 2
                        });
                        if (i === tempData.length - 2) {
                            yTextFormatterNew[index][i + 1] = valueFormatter.create({
                                format: this.dataViews.categorical.values[index].source.format,
                                value: 0,
                                precision: <number>(tempData[i + 1].yvalue) % 1 === 0 ? 0 : 2
                            });
                        }
                        thisObj.drawLCLAndUCLForInnerDiv(tempData, i, viewLineModel, index);
                        this.line[i] = d3.select(`.Measure${index}`).append('path')
                            .style('cursor', 'pointer')
                            .classed(`line${index}`, true)
                            .classed(`inline${i}`, true).attr('id', 'inlineClass');
                        this.line[i].attr({
                            // tslint:disable-next-line:prefer-template
                            d: 'M' + LineBarChart.thisObj.xScale(tempData[i].actualDates) + ',' +
                                (LineBarChart.thisObj.yScaleNew[index](tempData[i].yvalue) -
                                (sectionalHeight * (viewLineModel.length - index - 1))) + 'L' +
                                LineBarChart.thisObj.xScale(tempData[i + 1].actualDates) + ',' +
                                (LineBarChart.thisObj.yScaleNew[index](tempData[i + 1].yvalue) -
                                (sectionalHeight * (viewLineModel.length - index - 1))),
                            fill: 'none',
                            'stroke-width': '2px',
                            'stroke-linejoin': 'round'
                        });
                        // thisObj.drawLCLAndUCLForInnerDiv(tempData, i, viewLineModel, index);

                        if (index < length && this.settings.part1.show && this.settings.part2.show) {
                            if (this.settings.part1[`threshold${iCounter}`] > this.settings.part1[`threshold${iCounter + 1}`]) {
                            this.applyColorDescending(index, length, tempData, i, iCounter, iCount);
                        } else {
                            this.applyColorAscending(index, length, tempData, i, iCounter, iCount);
                        }
                    } else if (index > (length - 1) && this.settings.part1.show && this.settings.part2.show) {
                        if (this.settings.part2[`threshold${iCount}`] > this.settings.part2[`threshold${iCount + 1}`]) {
                            this.applyColorDescending(index, length, tempData, i, iCounter, iCount);
                        } else {
                            this.applyColorAscending(index, length, tempData, i, iCounter, iCount);
                        }
                    } else {
                        this.line[i].attr('stroke', tempData[i].yvalue <= tempData[i + 1].yvalue ?
                            this.settings.indicators.positiveIndicatorColor : this.settings.indicators.negativeIndicatorColor);
                        if (tempData[i].yvalue <= tempData[i + 1].yvalue) {
                            colorsNew[index][i] = this.settings.indicators.positiveIndicatorColor;
                            if (i === tempData.length - 2) {
                                colorsNew[index][i + 1] = this.settings.indicators.positiveIndicatorColor;
                            }
                        } else {
                            colorsNew[index][i] = this.settings.indicators.negativeIndicatorColor;
                            if (i === tempData.length - 2) {
                                colorsNew[index][i + 1] = this.settings.indicators.negativeIndicatorColor;
                            }
                        }
                        if (tempData[i].yvalue === null) {
                            this.line[i].attr('stroke', 'none');
                        }
                    }
                    }
                } else if (categoryFlag) {
                    yTextFormatterNew[index][0] = valueFormatter.create({
                        format: this.dataViews.categorical.values[index].source.format,
                        value: this.yDisplayUnit[index],
                        precision: <number>(tempData[0].yvalue) % 1 === 0 ? 0 : 2
                    });
                    this.line[index] = d3.select(`.Measure${index}`).append('circle')
                    .style('cursor', 'pointer')
                    .classed(`line${index}`, true).attr('id', 'inlineClass');
                    this.line[index].attr('r', 4)
                        .attr('transform', `translate(${LineBarChart.thisObj.xScale(tempData[0].actualDates)},
                         ${LineBarChart.thisObj.yScaleNew[viewLineModel.length - 1](tempData[0].yvalue)})`);
                    if (this.settings.part1.show && this.settings.part2.show) {
                        this.line[index].attr('fill', this.settings.indicators.range3);
                        colorsNew[index][0] = this.settings.indicators.range3;
                    } else {
                        this.line[index].attr('fill', this.settings.indicators.positiveIndicatorColor);
                        colorsNew[index][0] = this.settings.indicators.positiveIndicatorColor;
                    }
                } else {
                    this.line[index] = d3.select(`.Measure${index}`).append('circle')
                    .style('cursor', 'pointer')
                    .classed(`line${index}`, true).attr('id', 'inlineClass');
                    this.line[index].attr('r', 4)
                    .attr('transform', `translate(${LineBarChart.thisObj.xScale(tempData[0].actualDates)},
                     ${LineBarChart.thisObj.yScaleNew[viewLineModel.length - 1](tempData[0].yvalue)})`);
                }
                // tslint:disable-next-line
                d3.selectAll(`.Measure`).on('click', function (d: any) {
                    if (!thisObj.clickFlag) {
                    d3.selectAll('#mouseLineAll').remove();
                    d3.selectAll('.chartClass').append('div').classed('popup', true)
                        .style({
                            'z-index': 5, position: 'absolute', border: '1px', 'border-color': 'black',
                            'border-style': 'solid',
                            width: `${actualWidth}px`,
                            height: `${height - 120}px`,
                            display: 'inline-block',
                            top: '80px',
                            left: '10px',
                            'background-color': 'white'
                        });
                    thisObj.yAxisChartNew = d3.selectAll('.popup').append('svg').classed('yAxisSVGNew', true);
                    d3.select(`.popup`).append('svg').classed('mainChartClass', true);

                    thisObj.xAxisChartNew = d3.selectAll('.popup').append('svg').classed('xAxisSVGNew', true);
                    // tslint:disable-next-line
                    let index = parseInt(d3.select(this)[0][0]['id'].split("-")[1]);
                    thisObj.renderXAxisSingle(viewLineModel, index);
                    thisObj.renderYAxisSingle(options, index);
                    thisObj.renderSingleLine(viewLineModel, index);
                    thisObj.clickFlag = true;
                    } else {
                    d3.select('.popup').remove();
                    thisObj.clickFlag = false;
                    thisObj.renderLines(viewLineModel, options);
                   }
                });

                const mouseG: d3.Selection<SVGElement> = LineBarChart.thisObj.mouseG = d3.selectAll(`#svg-${index}`).append('g')
                    .attr('class', 'mouseOver');
                mouseG.append('path').attr('class', `mouseLine${index}`)
                .attr('id', 'mouseLineAll').classed('opacityOff', true);

                d3.selectAll('#circle').classed('opacityOff', true);
                // tslint:disable-next-line:typedef prefer-const
                let rectWidth: number;

                rectWidth = width < this.mainChartWidth ? this.mainChartWidth :
                    width - yHeight - ySecHeight - yAxisWidth - ySecAxisWidth - 5;
                d3.selectAll(`#svg-${index}`).on('mouseout', function (): void {
                    d3.selectAll(`.mouseLine${index}`).classed('opacityOn', false).classed('opacityOff', true);
                }).on('mouseover', function (): void {
                    d3.selectAll(`.mouseLine${index}`).classed('opacityOn', true).classed('opacityOff', false);
                }).on('mousemove', function (): void {
                    const mouse: [number, number] = d3.mouse(this);
                    // tslint:disable-next-line:no-any
                    let exact: any;
                    let pointerPosition: number;
                    d3.selectAll(`path.mouseLine${index}.opacityOn`).attr('d', function (): string {
                        tooltipDataItem = [];
                        let d: string;
                        pointerPosition = 0;
                        if (categoryFlag) {
                            for (let iterator: number = 0; iterator < viewLineModel[index].dataPoints.length - 1; iterator++) {
                                const x1: number = LineBarChart.thisObj.xScale(viewLineModel[index].dataPoints[iterator].dates);
                                const x2: number = LineBarChart.thisObj.xScale(viewLineModel[index].dataPoints[iterator + 1].dates);
                                if (mouse[0] - x1 > 0 && mouse[0] - x2 < 0) {
                                    if (Math.abs(mouse[0] - x1) > Math.abs(mouse[0] - x2)) {
                                        pointerPosition = iterator + 1;
                                        break;
                                    } else {
                                        pointerPosition = iterator;
                                        break;
                                    }
                                } else if (mouse[0] < x1) {
                                    pointerPosition = iterator;
                                    break;
                                }
                                // else if (index === viewLineModel[index].dataPoints.length - 2) {
                                //     pointerPosition = iterator;
                                //     break;
                                // }
                            }
                            exact = viewLineModel[index].dataPoints[pointerPosition].dates;
                        }
                        const keyName: string = viewLineModel[index].keyName;
                        d = `M${LineBarChart.thisObj.xScale(exact)},
                            ${LineBarChart.thisObj.yAxisRange[viewLineModel.length - 1][1] - 5}
                            ${LineBarChart.thisObj.xScale(exact)},
                            ${LineBarChart.thisObj.yAxisRange[viewLineModel.length - 1][0]}`;
                        tooltipDataItem.push({
                            header: LineBarChart.thisObj.formatter.format(exact),
                            displayName: keyName,
                            color: colorsNew[index][pointerPosition],
                            value: yTextFormatterNew[index][pointerPosition]
                            .format(viewLineModel[index].dataPoints[pointerPosition].yvalue)
                        });

                        return d;
                    })
                    .style({
                        stroke: 'black',
                        'stroke-width': '1px'
                    });

                });
                LineBarChart.thisObj.tooltipServiceWrapper.addTooltip(d3.selectAll(`#svg-${index}`),
                                                                      (tooltipEvent: TooltipEventArgs<number>) => tooltipDataItem,
                                                                      (tooltipEvent: TooltipEventArgs<number>) => null, true);
        }
        }

        /**
         * Function to set some parameters which are used by the visual
         * @function
         *
         */
        public setParameters(): void {
            const yearOne: number = startDate.getFullYear();
            const yearTwo: number = endDate.getFullYear();
            noOfYears = yearTwo - yearOne;
            const monthOne: number = startDate.getMonth();
            const monthTwo: number = endDate.getMonth();
            noOfMonths = noOfYears === 0 ? (monthTwo - monthOne + 1) : noOfYears === 1 ? (monthsPerYear - monthOne) + monthTwo + 1 :
                (noOfYears - 1) * monthsPerYear + ((monthsPerYear - monthOne) + monthTwo + 1);
            const halfYearMonthOne: number = monthOne < 6 ? 0 : 1;
            const halfYearMonthTwo: number = monthTwo < 6 ? 0 : 1;
            noOFHalfYears = noOfYears === 0 ? (halfYearMonthTwo - halfYearMonthOne + 1) : noOfYears === 1 ? (2 - halfYearMonthOne) +
                (halfYearMonthTwo + 1) : (2 - halfYearMonthOne) + (halfYearMonthTwo + 1) + (2 * noOfYears);
            const quarterOne: number = monthOne < 3 ? 0 : monthOne >= 3 && monthOne < 6 ? 1 : monthOne >= 6 && monthOne < 9 ? 2 : 3;
            const quarterTwo: number = monthTwo < 3 ? 0 : monthTwo >= 3 && monthTwo < 6 ? 1 : monthTwo >= 6 && monthTwo < 9 ? 2 : 3;
            noOfQuarter = noOfYears === 0 ? (quarterTwo - quarterOne + 1) : noOfYears === 1 ? (quartersPerYear - quarterOne) +
                quarterTwo + 1 : (noOfYears - 1) * quartersPerYear + ((quartersPerYear - quarterOne) + quarterTwo + 1);
            const dayOne: number = startDate.getDate();
            const dayTwo: number = endDate.getDate();
            noOfDays = noOfMonths === 1 ? dayTwo - dayOne + 1 : (noOfMonths - 1) * daysPerMonth + (daysPerMonth - dayOne) + dayTwo;
            noOfWeeks = Math.floor(noOfDays / daysPerWeek);
        }
        /**
         * Function to apply font settings based on height and width of viewport dimension
         * @function
         *
         */
        public applyViewportSettings(): void {
            if (height < 370 || width < 390) {
                this.settings.xAxis.fontSize = this.settings.xAxis.fontSize > 16 ? 16 : this.settings.xAxis.fontSize;
                this.settings.xAxis.titleFontSize = this.settings.xAxis.titleFontSize > 16 ? 16 : this.settings.xAxis.titleFontSize;
                this.settings.yAxis.fontSize = this.settings.yAxis.fontSize > 16 ? 16 : this.settings.yAxis.fontSize;
                this.settings.yAxis.titleFontSize = this.settings.yAxis.titleFontSize > 16 ? 16 : this.settings.yAxis.titleFontSize;
            } else if (height < 550 || width < 560) {
                this.settings.xAxis.fontSize = this.settings.xAxis.fontSize > 21 ? 21 : this.settings.xAxis.fontSize;
                this.settings.xAxis.titleFontSize = this.settings.xAxis.titleFontSize > 21 ? 21 : this.settings.xAxis.titleFontSize;
                this.settings.yAxis.fontSize = this.settings.yAxis.fontSize > 21 ? 21 : this.settings.yAxis.fontSize;
                this.settings.yAxis.titleFontSize = this.settings.yAxis.titleFontSize > 21 ? 21 : this.settings.yAxis.titleFontSize;
            } else if (height < 600 || width < 640) {
                this.settings.xAxis.fontSize = this.settings.xAxis.fontSize > 32 ? 32 : this.settings.xAxis.fontSize;
                this.settings.xAxis.titleFontSize = this.settings.xAxis.titleFontSize > 32 ? 32 : this.settings.xAxis.titleFontSize;
                this.settings.yAxis.fontSize = this.settings.yAxis.fontSize > 32 ? 32 : this.settings.yAxis.fontSize;
                this.settings.yAxis.titleFontSize = this.settings.yAxis.titleFontSize > 32 ? 32 : this.settings.yAxis.titleFontSize;
            }
            if (!categoryFlag) {
                this.settingsAxis.axis.x.padding = 0;
            } else {
                this.settingsAxis.axis.x.padding = this.settingsAxis.border.halfOfTop;
            }
        }
        public applyInnerLineWidthSettings(): void {
            if (this.settings.innerDiv.strokeSizeCL > 5) {
                this.settings.innerDiv.strokeSizeCL = 5;
            }
            if (this.settings.innerDiv.strokeSizeCL <= 0) {
                this.settings.innerDiv.strokeSizeCL = 1;
            }
            if (this.settings.innerDiv.strokeSizeLCL1 > 5) {
                this.settings.innerDiv.strokeSizeLCL1 = 5;
            }
            if (this.settings.innerDiv.strokeSizeLCL1 <= 0) {
                this.settings.innerDiv.strokeSizeLCL1 = 1;
            }
            if (this.settings.innerDiv.strokeSizeLCL2 > 5) {
                this.settings.innerDiv.strokeSizeLCL2 = 5;
            }
            if (this.settings.innerDiv.strokeSizeLCL2 <= 0) {
                this.settings.innerDiv.strokeSizeLCL2 = 1;
            }
            if (this.settings.innerDiv.strokeSizeLCL3 > 5) {
                this.settings.innerDiv.strokeSizeLCL3 = 5;
            }
            if (this.settings.innerDiv.strokeSizeLCL3 <= 0) {
                this.settings.innerDiv.strokeSizeLCL3 = 1;
            }
            if (this.settings.innerDiv.strokeSizeUCL1 > 5) {
                this.settings.innerDiv.strokeSizeUCL1 = 5;
            }
            if (this.settings.innerDiv.strokeSizeUCL1 <= 0) {
                this.settings.innerDiv.strokeSizeUCL1 = 1;
            }
            if (this.settings.innerDiv.strokeSizeUCL2 > 5) {
                this.settings.innerDiv.strokeSizeUCL2 = 5;
            }
            if (this.settings.innerDiv.strokeSizeUCL2 <= 0) {
                this.settings.innerDiv.strokeSizeUCL2 = 1;
            }
            if (this.settings.innerDiv.strokeSizeUCL3 > 5) {
                this.settings.innerDiv.strokeSizeUCL3 = 5;
            }
            if (this.settings.innerDiv.strokeSizeUCL3 <= 0) {
                this.settings.innerDiv.strokeSizeUCL3 = 1;
            }
        }

        public applyOuterLineWidthSettings(): void {
            if (this.settings.outerDiv.strokeSizeCL > 5) {
                this.settings.outerDiv.strokeSizeCL = 5;
            }
            if (this.settings.outerDiv.strokeSizeCL <= 0) {
                this.settings.outerDiv.strokeSizeCL = 1;
            }
            if (this.settings.outerDiv.strokeSizeLCL1 > 5) {
                this.settings.outerDiv.strokeSizeLCL1 = 5;
            }
            if (this.settings.outerDiv.strokeSizeLCL1 <= 0) {
                this.settings.outerDiv.strokeSizeLCL1 = 1;
            }
            if (this.settings.outerDiv.strokeSizeLCL2 > 5) {
                this.settings.outerDiv.strokeSizeLCL2 = 5;
            }
            if (this.settings.outerDiv.strokeSizeLCL2 <= 0) {
                this.settings.outerDiv.strokeSizeLCL2 = 1;
            }
            if (this.settings.outerDiv.strokeSizeLCL3 > 5) {
                this.settings.outerDiv.strokeSizeLCL3 = 5;
            }
            if (this.settings.outerDiv.strokeSizeLCL3 <= 0) {
                this.settings.outerDiv.strokeSizeLCL3 = 1;
            }
            if (this.settings.outerDiv.strokeSizeUCL1 > 5) {
                this.settings.outerDiv.strokeSizeUCL1 = 5;
            }
            if (this.settings.outerDiv.strokeSizeUCL1 <= 0) {
                this.settings.outerDiv.strokeSizeUCL1 = 1;
            }
            if (this.settings.outerDiv.strokeSizeUCL2 > 5) {
                this.settings.outerDiv.strokeSizeUCL2 = 5;
            }
            if (this.settings.outerDiv.strokeSizeUCL2 <= 0) {
                this.settings.outerDiv.strokeSizeUCL2 = 1;
            }
            if (this.settings.outerDiv.strokeSizeUCL3 > 5) {
                this.settings.outerDiv.strokeSizeUCL3 = 5;
            }
            if (this.settings.outerDiv.strokeSizeUCL3 <= 0) {
                this.settings.outerDiv.strokeSizeUCL3 = 1;
            }
        }
        /**
         * Function to apply settings
         * @function
         *
         */
        public applySettings(): void {
            if (this.settings.xAxis.typeX === 'Categorical' || dataLength === 1) {
                categoryFlag = true;
            } else {
                categoryFlag = true;
            }
            if (renderBarFlag) {
                this.halfBarWidth = 10;
                this.settings.yAxis.scaleType = 'linear';
            } else {
                this.halfBarWidth = 0;
            }
            if (this.settings.xAxis.innerPadding < 1) {
                this.settings.xAxis.innerPadding = 1;
            } else if (this.settings.xAxis.innerPadding > 50) {
                this.settings.xAxis.innerPadding = 50;
            }
            if (this.settings.yAxis.position === 'Left') {
                ySecPosition = 'Right';
            } else {
                ySecPosition = 'Left';
            }
            if (this.settings.shapes.lineWidth > 5) {
                this.settings.shapes.lineWidth = 5;
            }
            if (this.settings.shapes.lineWidth <= 0) {
                this.settings.shapes.lineWidth = 1;
            }
            if (this.settings.todayLine.fontSize > 25) {
                this.settings.todayLine.fontSize = 25;
            }
            if (this.settings.todayLine.lineWidth <= 0) {
                this.settings.todayLine.lineWidth = 1;
            } else if (this.settings.todayLine.lineWidth > 5) {
                this.settings.todayLine.lineWidth = 5;
            }

            this.settingsAxis.border.halfOfTop = this.mainChartWidth < width ? 0 : 15;
            this.applyViewportSettings();
            const todayProp: TextProperties = {
                text: 'Today',
                fontFamily: this.settings.mileStone.fontFamily,
                fontSize: `${this.settings.todayLine.fontSize}px`
            };
            todayHeight = textMeasurementService.measureSvgTextHeight(todayProp);
            if (!this.settings.todayLine.show) {
                todayHeight = 0;
            }
            if (!mileStoneFlag) {
                this.polygonfullWidth = 0;
            }
        }
        /**
         * Function to set class attribures
         * @function
         *
         */
        public setClassAttributes(): void {
            const legendAttr: IViewport = this.legend.getMargins();
            if (categoryFlag) {
                if (this.settings.yAxis.position === 'Left') {
                    d3.selectAll('.rootDivClass').style('margin-left', `${(this.yAxisPadding + yAxisWidth)}px`)
                        .style('margin-right', `${(this.ySecAxisPadding)}px`).style('overflow-x', 'hidden');
                } else {
                    d3.selectAll('.rootDivClass').style('margin-left', `${(this.ySecAxisPadding + ySecAxisWidth)}px`)
                        .style('overflow-x', 'auto').style('margin-right', `${(yAxisWidth + yHeight + 10)}px`).style('overflow-x', 'auto');
                }
            } else {
                let tempXStartLabelProp: TextProperties;
                tempXStartLabelProp = {
                    text: xStart,
                    fontFamily: this.settings.xAxis.fontFamily,
                    fontSize: `${this.settings.xAxis.fontSize}px`
                };
                const tempXStartLabelWidth: number = textMeasurementService.measureSvgTextWidth(tempXStartLabelProp);
                this.maxBarWidth = (width - yHeight - yAxisWidth * 0.9) / dataLength;
                if (this.maxBarWidth > 100) {
                    this.maxBarWidth = 100;
                }
                if (this.settings.yAxis.position === 'Left') {
                    d3.selectAll('.rootDivClass').style('margin-left', `${(this.yAxisPadding + yAxisWidth - 5)}px`)
                        .style('margin-right', `${(this.ySecAxisPadding + ySecAxisWidth)}px`).style('overflow', 'hidden');
                } else {
                    d3.selectAll('.rootDivClass').style('margin-left', `${(this.ySecAxisPadding + ySecAxisWidth)}px`)
                        .style('margin-right', `${(yAxisWidth + yHeight)}px`).style('overflow', 'hidden');
                }
            }
            this.svg.attr({
                width: width,
                height: height
            });
            this.rootDiv.attr({
                width: this.settings.yAxis.position === 'Left' ? width - this.yAxisPadding - yAxisWidth :
                    width - this.yAxisPadding - yHeight - yAxisWidth,
                height: height
            });
            d3.selectAll('.rootDivClass').style('height', `${height}px`);
            d3.selectAll('.scrollClass').style('height', `${height - xAxisTitleHeight -
                LineBarChart.thisObj.settingsAxis.axis.x.padding}px`);
            this.mainChart.attr({
                height: width < this.mainChartWidth ? height - this.yTicksHeight : height - this.settingsAxis.border.top
            });
        }
        /**
         * Function to remove elements before every update which restrict elements to overlap each other.
         * @function
         *
         */
        public removeClass(): void {
            d3.selectAll('.todayLine').remove();
            d3.selectAll('.xAxis').remove();
            d3.selectAll('.tick').remove();
            d3.selectAll('.targetLines').remove();
            d3.selectAll('.ygridLines').remove();
            d3.selectAll('.xgridLines').remove();
            d3.selectAll('.minLine').remove();
            d3.selectAll('.maxLine').remove();
            d3.selectAll('.yAxis').remove();
            d3.selectAll('.ySecAxis').remove();
            d3.selectAll('.yTitle').remove();
            d3.selectAll('.ySecTitle').remove();
            d3.selectAll('.xTitle').remove();
            d3.selectAll('rect.bar').remove();
            d3.selectAll('.legendTitle').remove();
            d3.selectAll('.legendItem').remove();
            d3.selectAll('.inlineClass').remove();
            d3.selectAll('.mouseOver').remove();
            d3.selectAll('.mileStoneClass').remove();
            d3.selectAll('.mLine').remove();
            d3.selectAll('.mileStoneLineText').remove();
            d3.selectAll('.dataLabels').remove();
            d3.selectAll('.major').remove();
            d3.selectAll('.todayText').remove();
            d3.selectAll('.message').remove();
            d3.selectAll('.lineClass').remove();
            d3.selectAll('.Measure').remove();
            d3.selectAll('.popup').remove();
            d3.selectAll('.xAxisSVGNew').remove();
            d3.selectAll('.yAxisSVGNew').remove();
        }
        /**
         * Function to display message when there is no data in Dates, Line or Bar field.
         * @function
         * @param {VisualUpdateOptions} options - contains references to the size of the container
         *                                        and the dataView which contains all the data
         *                                        the visual had queried.
         *
         */
        public displayMessage(options: VisualUpdateOptions): void {
            const categorical: DataViewCategorical = options.dataViews[0].categorical;
            let isCategory: boolean = false;
            let isMeasure: boolean = false;
            if (categorical.categories) {
                for (let iterator: number = 0; iterator < categorical.categories.length; iterator++) {
                    if (categorical.categories[iterator].source.roles[`Dates`]) {
                        isCategory = true;
                    }
                }
            }
            if (categorical.values) {
                for (let iterator: number = 0; iterator < categorical.values.length; iterator++) {
                    if (categorical.values[iterator].source.roles[`Line`] || categorical.values[iterator].source.roles[`Bar`]) {
                        isMeasure = true;
                    }
                }
            }
            if (!isCategory && !isMeasure) {
                this.returnFlag = true;
                this.mainChart.attr({
                    width: options.viewport.width
                });
                // tslint:disable-next-line:no-any
                const textElement: any = this.chart.append('text').classed('message', true).attr('transform', 'translate(20, 30)')
                    .text(`Please select a category and either line/bar values`);
                textMeasurementService.wordBreak(textElement[0][0], options.viewport.width - 10, options.viewport.height);
            } else if (isCategory && !isMeasure) {
                this.returnFlag = true;
                this.mainChart.attr({
                    width: options.viewport.width
                });
                // tslint:disable-next-line:no-any
                const textElement: any = this.chart.append('text').classed('message', true).attr('transform', 'translate(20, 30)')
                    .text(`Please select line/bar values`);
                textMeasurementService.wordBreak(textElement[0][0], options.viewport.width - 10, options.viewport.height);
            } else if (!isCategory && isMeasure) {
                this.returnFlag = true;
                this.mainChart.attr({
                    width: options.viewport.width
                });
                // tslint:disable-next-line:no-any
                const textElement: any = this.chart.append('text').classed('message', true).attr('transform', 'translate(20, 30)')
                    .text(`Please select a category`);
                textMeasurementService.wordBreak(textElement[0][0], options.viewport.width - 10, options.viewport.height);
            } else {
                this.returnFlag = false;
            }
            if (options.viewport.height < 100 || options.viewport.width < 100) {
                this.returnFlag = true;
            }
        }
        /**
         * Function to initialize the parameters.
         * @function
         * @param {VisualUpdateOptions} options - contains references to the size of the container
         *                                        and the dataView which contains all the data
         *                                        the visual had queried.
         *
         */
        public initialize(options: VisualUpdateOptions): void {
            this.lineBarData = [];
            this.tooltipModel = [];
            xAxisLabelsHeight = 0;
            xAxisLabelsWidth = 0;
            LineBarChart.thisObj = this;
            yAxisWidth = 0;
            ySecAxisWidth = 0;
            leftAxisWidth = 0;
            rightAxisWidth = 0;
            sectionalHeight = 0;
            legendTitle = '';
            selectionManager = this.selectionManager;
            this.settings = LineBarChart.parseSettings(options && options.dataViews && options.dataViews[0]);
        }
        public update(options: VisualUpdateOptions): void {
            this.removeClass();
            this.displayMessage(options);
            if (this.returnFlag) {
                d3.selectAll('rect.clearCatcher').style('height', `0px`);

                return;
            }
            this.initialize(options);
            const dataView: DataView = this.dataViews = options.dataViews[0];
            let categoryLength: number = dataView.categorical.categories.length;
            // tslint:disable-next-line:prefer-const no-any
            let values: any = this.dataViews.categorical && this.dataViews.categorical.values;
            const viewLineModel: IVisualViewModel[] = this.viewLineModel = [];
            const viewBarModel: IVisualViewModel[] = this.viewBarModel = [];
            let viewModel: IVisualViewModel[];
            viewModel = visualTransform(options, this.host, this);
            categoryLength = viewModel[0].dataPoints.length;
            let role: string[];

            for (let iterator: number = 0; iterator < viewModel.length; iterator++) {
                if (viewModel[iterator].dataRole.indexOf(`line`) !== -1) {
                    role = [];
                    role.push('line');
                    viewLineModel.push({
                        dataPoints: viewModel[iterator].dataPoints,
                        keyName: viewModel[iterator].keyName,
                        dataRole: role,
                        selectionId: visualHost.createSelectionIdBuilder().withMeasure(
                            `${viewModel[iterator].keyName} Line`).createSelectionId(),
                        selected: viewModel[iterator].selected,
                        identity: visualHost.createSelectionIdBuilder().withMeasure(
                            `${viewModel[iterator].keyName} Line`).createSelectionId()
                    });
                }
                if (categoryLength < viewModel[iterator].dataPoints.length) {
                    categoryLength = viewModel[iterator].dataPoints.length;
                }
            }
            this.viewLineModel = viewLineModel;
            this.viewBarModel = viewBarModel;
            dataLength = categoryLength;
            this.mainChartWidth = viewModel[0].dataPoints.length * this.settings.xAxis.minimumCategoryWidth;
            this.xTickWidth = viewModel[0].dataPoints.length * this.yTicksHeight;
            this.line = [];
            this.lcl1Line = [];
            this.lcl2Line = [];
            this.lcl3Line = [];
            this.ucl1Line = [];
            this.ucl2Line = [];
            this.ucl3Line = [];
            colors = [];
            if (dateFlag) {
                xStart = this.settings.xAxis.startValue !== null && this.settings.xAxis.startValue !== '' ?
                    new Date(this.settings.xAxis.startValue) : null;
                xEnd = this.settings.xAxis.endValue !== null && this.settings.xAxis.endValue !== '' ?
                    new Date(this.settings.xAxis.endValue) : null;
                startDate = xStart === null ? startDate : xStart;
                endDate = xEnd === null ? endDate : xEnd;
                this.setParameters();
            }
            this.createLegendDataPoint(options, this.host);
            this.applySettings();
            this.applyInnerLineWidthSettings();
            this.applyOuterLineWidthSettings();
            this.applyYAxisConfiguration();
            this.applyXAxisConfiguration(options, viewModel);
            this.renderYAxis(options);
            this.renderXAxis(viewModel);
            this.setClassAttributes();
            if (renderLineFlag) {
                this.renderLines(viewLineModel, options);
            }
            this.viewBarModel.forEach(function (d: IVisualViewModel): void {
                LineBarChart.thisObj.lineBarData.push({
                    dataPoints: d.dataPoints,
                    keyName: d.keyName,
                    dataRole: d.dataRole,
                    selectionId: d.selectionId,
                    selected: d.selected,
                    identity: d.identity
                });
            });
            this.viewLineModel.forEach(function (d: IVisualViewModel): void {
                LineBarChart.thisObj.lineBarData.push({
                    dataPoints: d.dataPoints,
                    keyName: d.keyName,
                    dataRole: d.dataRole,
                    selectionId: d.selectionId,
                    selected: d.selected,
                    identity: d.identity
                });
            });
            this.interactivityService.applySelectionStateToData(this.lineBarData);
            d3.selectAll('.lineClass, .bar').data(this.lineBarData);
            d3.selectAll('.mileStoneLine').data(this.lineBarData);
            d3.selectAll('.legendItem').data(this.lineBarData);
            const behaviorOptions: ILineBarChartBehaviorOptions = {
                clearCatcher: d3.selectAll('html, .clearCacher'),
                lineSelection: d3.selectAll('.lineClass, .mileStoneLine'),
                barSelection: d3.selectAll('.bar'),
                legendSelection: d3.selectAll('.legendItem'),
                interactivityService: this.interactivityService
            };
            this.interactivityService.bind(
                this.lineBarData,
                this.behavior,
                behaviorOptions,
                {
                });
        }

        private static parseSettings(dataView: DataView): VisualSettings {
            return VisualSettings.parse(dataView) as VisualSettings;
        }

        /**
         * This function gets called for each of the objects defined in the capabilities files and allows you to select which of the
         * objects and properties you want to expose to the users in the property pane.
         *
         */
        // tslint:disable-next-line:cyclomatic-complexity
        public enumerateObjectInstances(options: EnumerateVisualObjectInstancesOptions): VisualObjectInstance[]
        | VisualObjectInstanceEnumerationObject {
        // tslint:disable-next-line
        let thisObj = this;
        let objectName: string;
        objectName = options.objectName;
        let objectEnumeration: VisualObjectInstance[];
        objectEnumeration = [];

        switch (options.objectName) {
            case 'part1':
                if (this.settings.part1.show) {
                    objectEnumeration.push({
                        objectName: objectName,
                        selector: null,
                        properties: {
                            show: this.settings.part1.show
                        }
                    });
                    // tslint:disable-next-line
                    let length = Number(thisObj.viewLineModel.length / 2) === thisObj.viewLineModel.length / 2
                    && thisObj.viewLineModel.length / 2 % 1 === 0 ? thisObj.viewLineModel.length / 2
                    : Math.round(thisObj.viewLineModel.length / 2);
                    // tslint:disable-next-line
                    let index = 0;
                    for (let iCount: number = 1; iCount <= length * 2; iCount++) {
                    objectEnumeration.push({
                        objectName: objectName,
                        displayName: `threshold${iCount}`,
                        properties: {
                            [`threshold${iCount}`] : this.settings.part1[`threshold${iCount}`]
                        },
                        selector: null
                    });

                }
                } else {
                    objectEnumeration.push({
                        objectName: objectName,
                        selector: null,
                        properties: {
                            show: this.settings.part1.show
                        }
                    });
                }

                return objectEnumeration;

                case 'part2':
                if (this.settings.part2.show) {
                    objectEnumeration.push({
                        objectName: objectName,
                        selector: null,
                        properties: {
                            show: this.settings.part2.show
                        }
                    });
                    // tslint:disable-next-line
                    let length = Number(thisObj.viewLineModel.length / 2) === thisObj.viewLineModel.length / 2
                    && thisObj.viewLineModel.length / 2 % 1 === 0 ? thisObj.viewLineModel.length / 2
                    : Math.floor(thisObj.viewLineModel.length / 2);
                    // tslint:disable-next-line:prefer-const
                    let index : number = 0;
                    for (let iCount: number = 1; iCount <= length * 2; iCount++) {
                    objectEnumeration.push({
                        objectName: objectName,
                        displayName: `threshold${iCount}`,
                        properties: {
                            [`threshold${iCount}`] : this.settings.part2[`threshold${iCount}`]
                        },
                        selector: null
                    });

                }
                } else {
                    objectEnumeration.push({
                        objectName: objectName,
                        selector: null,
                        properties: {
                            show: this.settings.part2.show
                        }
                    });
                }

                return objectEnumeration;

            case 'strokeWidth':

                objectEnumeration.push({
                    objectName: objectName,
                    selector: null,
                    properties: {
                        strokeWidth : this.settings.strokeWidth.strokeWidth > 5 ? 5 : this.settings.strokeWidth.strokeWidth,
                        borderColor: this.settings.strokeWidth.borderColor
                    }
                });

                return objectEnumeration;

            case 'indicators':

                if (this.settings.part1.show || this.settings.part2.show) {
                    for (let iCount: number = 1; iCount <= 3; iCount++) {

                        objectEnumeration.push({
                            objectName: objectName,
                            displayName: `Range${iCount}`,
                            properties: {

                                [`range${iCount}`]: this.settings.indicators[`range${iCount}`]

                            },
                            selector: null
                        });
                    }
                } else {
                    const oIndicators: VisualObjectInstance = {
                        objectName: 'indicators',
                        displayName: 'Indicators',
                        selector: null,
                        properties: {
                            positiveIndicatorColor: this.settings.indicators.positiveIndicatorColor,
                            negativeIndicatorColor: this.settings.indicators.negativeIndicatorColor

                        }
                    };
                    objectEnumeration.push(oIndicators);
                }

                return objectEnumeration;

            case 'outerDiv':
                    const objOuter: {} = {};
                    objOuter[`CL`] = this.settings.outerDiv.CL;
                    if (this.settings.outerDiv.CL) {
                        objOuter[`lineColorCL`] = this.settings.outerDiv.lineColorCL;
                        objOuter[`strokeSizeCL`] = this.settings.outerDiv.strokeSizeCL;
                    }
                    objOuter[`LCL1`] = this.settings.outerDiv.LCL1;
                    if (this.settings.outerDiv.LCL1) {
                        objOuter[`lineColorLCL1`] = this.settings.outerDiv.lineColorLCL1;
                        objOuter[`strokeSizeLCL1`] = this.settings.outerDiv.strokeSizeLCL1;
                    }
                    objOuter[`LCL2`] = this.settings.outerDiv.LCL2;
                    if (this.settings.outerDiv.LCL2) {
                        objOuter[`lineColorLCL2`] = this.settings.outerDiv.lineColorLCL2;
                        objOuter[`strokeSizeLCL2`] = this.settings.outerDiv.strokeSizeLCL2;
                    }
                    objOuter[`LCL3`] = this.settings.outerDiv.LCL3;
                    if (this.settings.outerDiv.LCL3) {
                        objOuter[`lineColorLCL3`] = this.settings.outerDiv.lineColorLCL3;
                        objOuter[`strokeSizeLCL3`] = this.settings.outerDiv.strokeSizeLCL3;
                    }
                    objOuter[`UCL1`] = this.settings.outerDiv.UCL1;
                    if (this.settings.outerDiv.UCL1) {
                        objOuter[`lineColorUCL1`] = this.settings.outerDiv.lineColorUCL1;
                        objOuter[`strokeSizeUCL1`] = this.settings.outerDiv.strokeSizeUCL1;
                    }
                    objOuter[`UCL2`] = this.settings.outerDiv.UCL2;
                    if (this.settings.outerDiv.UCL2) {
                        objOuter[`lineColorUCL2`] = this.settings.outerDiv.lineColorUCL2;
                        objOuter[`strokeSizeUCL2`] = this.settings.outerDiv.strokeSizeUCL2;
                    }
                    objOuter[`UCL3`] = this.settings.outerDiv.UCL3;
                    if (this.settings.outerDiv.UCL3) {
                        objOuter[`lineColorUCL3`] = this.settings.outerDiv.lineColorUCL3;
                        objOuter[`strokeSizeUCL3`] = this.settings.outerDiv.strokeSizeUCL3;
                    }
                    objectEnumeration.push({
                        objectName: objectName,
                        properties: objOuter,
                        selector: null
                    });

                    return objectEnumeration;

            case 'innerDiv':
                    const obj: {} = {};
                    obj[`CL`] = this.settings.innerDiv.CL;
                    if (this.settings.innerDiv.CL) {
                        obj[`lineColorCL`] = this.settings.innerDiv.lineColorCL;
                        obj[`strokeSizeCL`] = this.settings.innerDiv.strokeSizeCL;
                    }
                    obj[`LCL1`] = this.settings.innerDiv.LCL1;
                    if (this.settings.innerDiv.LCL1) {
                        obj[`lineColorLCL1`] = this.settings.innerDiv.lineColorLCL1;
                        obj[`strokeSizeLCL1`] = this.settings.innerDiv.strokeSizeLCL1;
                    }
                    obj[`LCL2`] = this.settings.innerDiv.LCL2;
                    if (this.settings.innerDiv.LCL2) {
                        obj[`lineColorLCL2`] = this.settings.innerDiv.lineColorLCL2;
                        obj[`strokeSizeLCL2`] = this.settings.innerDiv.strokeSizeLCL2;
                    }
                    obj[`LCL3`] = this.settings.innerDiv.LCL3;
                    if (this.settings.innerDiv.LCL3) {
                        obj[`lineColorLCL3`] = this.settings.innerDiv.lineColorLCL3;
                        obj[`strokeSizeLCL3`] = this.settings.innerDiv.strokeSizeLCL3;
                    }
                    obj[`UCL1`] = this.settings.innerDiv.UCL1;
                    if (this.settings.innerDiv.UCL1) {
                        obj[`lineColorUCL1`] = this.settings.innerDiv.lineColorUCL1;
                        obj[`strokeSizeUCL1`] = this.settings.innerDiv.strokeSizeUCL1;
                    }
                    obj[`UCL2`] = this.settings.innerDiv.UCL2;
                    if (this.settings.innerDiv.UCL2) {
                        obj[`lineColorUCL2`] = this.settings.innerDiv.lineColorUCL2;
                        obj[`strokeSizeUCL2`] = this.settings.innerDiv.strokeSizeUCL2;
                    }
                    obj[`UCL3`] = this.settings.innerDiv.UCL3;
                    if (this.settings.innerDiv.UCL3) {
                        obj[`lineColorUCL3`] = this.settings.innerDiv.lineColorUCL3;
                        obj[`strokeSizeUCL3`] = this.settings.innerDiv.strokeSizeUCL3;
                    }
                    objectEnumeration.push({
                        objectName: objectName,
                        properties: obj,
                        selector: null
                    });

                    return objectEnumeration;

            default:
                break;
        }

        return VisualSettings.enumerateObjectInstances(this.settings || VisualSettings.getDefault(), options);
        }
    }
}
