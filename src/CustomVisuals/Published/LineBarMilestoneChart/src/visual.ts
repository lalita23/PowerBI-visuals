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

module powerbi.extensibility.visual {
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
    import dataLabelManager= powerbi.extensibility.utils.chart.dataLabel.DataLabelManager;

    let maxValue: number;
    let minValue: number;
    let barMaxValue: number;
    let lineMaxValue: number;
    let barMinValue: number;
    let lineMinvalue: number;
    let legendData: LegendData;
    let uniqueValuesLegend: PrimitiveValue[];
    let colors: IColors[] = [];
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
    let mileStoneGroupCategory: DataViewValueColumn;
    let legendCategory: DataViewCategoryColumn;
    let uniqueValues: string[];
    let mileStoneData: IMileStonePoint[];
    let mileStoneGroupData: IMileStonePoint[];
    let maxValueArray: number[] = [];
    let minValueArray: number[] = [];
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
    let yAxisLabelHeight: number = 0;
    let ySecAxisLabelHeight: number = 0;
    let yHeight: number;
    let ySecHeight: number;
    let yTitleWidth: number = 0;
    let ySecTitleWidth: number = 0;
    let ySecPosition: string = null;
    let legendTitle: string = '';
    let mileStoneTitle: string = '';
    let mileStoneGroupTitle: string = '';
    let xAxisStartRange: number;
    let todayHeight: number;
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
    const resizeValue : number = 4;
    let numberOfCategoryColumn: number = 0;
    let selectionClear: ISelectionHandler;
    let startDate: Date;
    let endDate: Date;
    let adjustedLegendHeight: number = 0;
    let xAxisTitleHeight: number = 0;
    let tooltipDataItem: VisualTooltipDataItem[] = [];
    const lowOpacity: number = 0.5;
    const highOpacity: number = 1;
    let dateValues: string[][] = [];
    let isSecondary: boolean = false;
    let todayPosition: string = 'below';
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
    const regexDate : RegExp = new RegExp(/^\d{2}\-\d{2}\-\d{4}$/);

    export class ComboChartWithMilestonesBehavior implements IInteractiveBehavior {
        private options: IComboChartWithMilestonesBehaviorOptions;
        /**
         * Function to bind the visual to the interactivityService.
         * @function
         * @param {IComboChartWithMilestonesBehaviorOptions} options
         *                                  - contain data which required to bind the visual to the interactivityService.
         * @namespace {ISelectionHandler} selectionHandler  - handles a selection event by selecting the given data point.
         */
        public bindEvents(options: IComboChartWithMilestonesBehaviorOptions, selectionHandler: ISelectionHandler): void {
            this.options = options;
            selectionClear = selectionHandler;
            options.lineSelection.on('click', (d: SelectableDataPoint) => {
                selectionManager.clear();
                d3.selectAll(`.rectangle`).classed('selected', false);
                d3.selectAll('.lineClass').style('opacity', highOpacity);
                d3.selectAll('.mileLineToday').style('opacity', highOpacity);
                d3.selectAll(`.todayText, .todayLine, .mLine`).style('opacity', highOpacity);
                d3.selectAll('.rectangle').style('opacity', highOpacity);
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
        let monthNumber: number ;
        if ( value.length === 4 ) {
            return new Date(Number(value[0]), (monthName.indexOf(value[2].substr(0, 3))), Number(value[3]) );
        } else if ( value.length === 3 ) {
            return new Date(Number(value[0]), (monthName.indexOf(value[2].substr(0, 3))));
        } else if ( value.length === 2 ) {
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
            if ( nullValuesIndex.indexOf(index) === -1 ) {
                if ( (<Date>category.values[index]) instanceof Date ) {
                    dateFlag = true;
                    if ( startIndexFlag ) {
                        startDate = <Date>category.values[index];
                        endDate = <Date>category.values[index];
                        startIndexFlag = false;
                    } else {
                        if ( startDate > <Date>category.values[index] ) {
                            startDate = <Date>category.values[index];
                        }
                        if ( endDate < <Date>category.values[index] ) {
                            endDate = <Date>category.values[index];
                        }
                    }
                } else if ( numberOfCategoryColumn === 1 ) {
                    dateFlag = false;
                    if ( !(typeof(category.values[index]) === 'number')) {
                        dataTypeNumberFlag = false;
                    } else {
                        tempDate = category.values[index];
                        dataTypeNumberFlag = true;
                    }
                } else {
                    dateFlag = true;
                    tempDate = dateConverter(dateValues[index]);
                    if ( index === 0 ) {
                        startDate = <Date>tempDate;
                        endDate = <Date>tempDate;
                    } else {
                        if ( startDate > <Date>tempDate ) {
                            startDate = <Date>tempDate;
                        }
                        if ( endDate < <Date>tempDate ) {
                            endDate = <Date>tempDate;
                        }
                    }
                }
                if ( numberOfCategoryColumn === 1 ) {
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
        for ( let index: number = 0; index < lengthCategoryData; index++ ) {
            if ( (legendCategory.values[index] !== null && legendCategory.values[index] !== '') &&
             legendUniqueValues.indexOf(<string>legendCategory.values[index]) === -1 ) {
                legendUniqueValues.push(<string>legendCategory.values[index]);
            } else if ( (legendCategory.values[index] === null || legendCategory.values[index] === '') &&
             legendUniqueValues.indexOf('(Blank)') === -1 ) {
                legendUniqueValues.push('(Blank)');
            }
        }
        let increment: number = 0;
        legendUniqueValues.forEach(function (data: PrimitiveValue): void {
            let tempDataPoints: IVisualDataPoint[] = [];
            let dataRole: string[] = [];
            dataRole = role;
            for ( let iterator: number = 0; iterator < lengthCategoryData; iterator++ ) {
                if ( legendCategory.values[iterator] !== null && legendCategory.values[iterator] !== '' &&
                 legendCategory.values[iterator].toString() === data.toString() ) {
                    tempDataPoints.push({
                        dates: numberOfCategoryColumn === 1 ? categoryValues[iterator] === null ? '(Blank)' :
                         categoryValues[iterator] : columnNames[iterator],
                        actualDates: categoryValues[iterator],
                        yvalue: valueColumn.values[iterator],
                        selected: false,
                        identity: visualHost.createSelectionIdBuilder().withCategory(
                        categoryColumn, iterator).createSelectionId()
                    });
                } else if ( (legendCategory.values[iterator] === null || legendCategory.values[iterator] === '' ) &&
                 data.toString() === '(Blank)') {
                    tempDataPoints.push({
                        dates: numberOfCategoryColumn === 1 ? categoryValues[iterator] === null ? '(Blank)' :
                        categoryValues[iterator] : columnNames[iterator],
                        actualDates: categoryValues[iterator],
                        yvalue: valueColumn.values[iterator],
                        selected: false,
                        identity: visualHost.createSelectionIdBuilder().withCategory(
                        categoryColumn, iterator).createSelectionId()
                    });
                } else {
                    tempDataPoints.push({
                        dates: numberOfCategoryColumn === 1 ? categoryValues[iterator] === null ? '(Blank)' :
                        categoryValues[iterator] : columnNames[iterator],
                        actualDates: categoryValues[iterator],
                        yvalue: 0,
                        selected: false,
                        identity: visualHost.createSelectionIdBuilder().withCategory(
                        categoryColumn, iterator).createSelectionId()
                    });
                }
            }
            tempDataPoints = aggregateData(tempDataPoints);
            for (let index: number = 0; index < tempDataPoints.length; index++) {
                if ( increment === 0 ) {
                    maxValueArray.push(<number>tempDataPoints[index].yvalue);
                    minValueArray.push(<number>tempDataPoints[index].yvalue > 0 ? 0 :
                        <number>tempDataPoints[index].yvalue);
                } else {
                    maxValueArray[index] = maxValueArray[index] +
                     <number>tempDataPoints[index].yvalue;
                    minValueArray[index] = minValueArray[index] +
                     (<number>tempDataPoints[index].yvalue > 0
                         ? 0 : <number>tempDataPoints[index].yvalue);
                }
            }
            tempViewModel.push({
                dataPoints: tempDataPoints,
                keyName: <string>data,
                dataRole: dataRole,
                selectionId: visualHost.createSelectionIdBuilder().withMeasure(<string>data).createSelectionId(),
                selected: false,
                identity: visualHost.createSelectionIdBuilder().withMeasure(<string>data).createSelectionId()
            });
            increment++;
        });

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
        for ( let index: number = 0; index < length; index++ ) {
            if (dataPoints[index].dates !== '(Blank)' && dateArray.indexOf(dataPoints[index].dates.toString()) === -1) {
                aggregateDataPoint.push({
                    dates: dataPoints[index].dates,
                    actualDates: dataPoints[index].actualDates,
                    yvalue: dataPoints[index].yvalue,
                    selected: dataPoints[index].selected,
                    identity: dataPoints[index].identity
                });
                dateArray.push(dataPoints[index].dates.toString());
            } else if ( dataPoints[index].dates !== '(Blank)' ) {
                const dataIndex: number = dateArray.indexOf(dataPoints[index].dates.toString());
                aggregateDataPoint[dataIndex].yvalue = <number>aggregateDataPoint[dataIndex].yvalue + <number>dataPoints[index].yvalue;
                if ( maxValue <= <number>aggregateDataPoint[dataIndex].yvalue ) {
                    maxValue = <number>aggregateDataPoint[dataIndex].yvalue;
                }
            } else if ( dataPoints[index].dates === '(Blank)' ) {
                aggregateDataPoint.push({
                    dates: '(Blank)',
                    actualDates: null,
                    yvalue: dataPoints[index].yvalue,
                    selected: dataPoints[index].selected,
                    identity: dataPoints[index].identity
                });
                dateArray.push('(Blank)');
            }
        }
        const aggregateDataLength: number = aggregateDataPoint.length;
        if (dateFlag) {
            for ( let index: number = 0; index < aggregateDataLength; index++ ) {
                for ( let iterator: number = index; iterator < aggregateDataLength; iterator++ ) {
                    if ( aggregateDataPoint[index].actualDates > aggregateDataPoint[iterator].actualDates ) {
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
    function visualTransform(options: VisualUpdateOptions, host: IVisualHost): IVisualViewModel[] {
        const dataViews: DataView[] = options.dataViews;
        const viewModel: IVisualViewModel[] = [];
        let dataPoints: IVisualDataPoint[] = [];
        let tempBarDataModel: IVisualViewModel[] = [];
        mileStoneData = [];
        mileStoneGroupData = [];
        categoryValues = [];
        const mileStoneGroup: string[] = [];
        nullValuesIndex = [];
        maxValueArray = [];
        minValueArray = [];
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
        for (let index: number = 0; index < numberOfCategory; index++) {
            if (view.categories[index].source.roles[`Category`]) {
                numberOfCategoryColumn++;
                categories = view.categories[index];
                const categoryColumnLength: number = view.categories[index].values.length;
                for ( let iterator: number = 0; iterator < categoryColumnLength; iterator++ ) {
                    if ( index === 0) {
                        dateValues[iterator] = [];
                    }
                    if ( view.categories[index].values[iterator] !== null && view.categories[index].values[iterator] !== '') {
                        dateValues[iterator].push(view.categories[index].values[iterator].toString());
                        columnNames[iterator] = (columnNames[iterator] === undefined ? '' : `${columnNames[iterator]} `) +
                        view.categories[index].values[iterator].toString();
                    }  else if (view.categories[index].values[iterator] === null || view.categories[index].values[iterator] === '') {
                        columnNames[iterator] = `${(columnNames[iterator] === undefined ? '' : columnNames[iterator])}(Blank)`;
                        nullValuesIndex.push(iterator);
                    }
                }
            } else if ( view.categories[index].source.roles[`Legend`] ) {
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
        let barIncrement: number = 0;
        let lineIncrement: number = 0;
        for (let step: number = 0; step < numberOfValues; step++) {
            const tempColors: string[] = [];
            const values: DataViewValueColumn = view.values[step];
            const valuesLength: number = values.values.length;
            dataPoints = [];
            const role: string[] = [];
            const tempRole: string[] = [];
            if (maxValue < <number>values.maxLocal) {
                maxValue = <number>values.maxLocal;
                maxValueFormat = values.source.format;
            }
            if ( minValue >  <number>view.values[step].minLocal) {
                minValue = <number>view.values[step].minLocal;
            }
            if (view.values[step].source.roles[`Line`] ) {
                role.push('line');
                renderLineFlag = true;
                if ( lineMaxValue < <number>values.maxLocal ) {
                    lineMaxValue = <number>values.maxLocal;
                }
                if ( lineIncrement === 0 ) {
                    lineMinvalue = <number>values.minLocal;
                } else if ( lineMinvalue > <number>values.minLocal ) {
                    lineMinvalue = <number>values.minLocal;
                }
                lineIncrement++;
            }
            if (view.values[step].source.roles[`Bar`] ) {
                barMaxValue = barMaxValue + <number>values.maxLocal;
                if ( barIncrement !== 0 ) {
                    maxValue = maxValue + <number>values.maxLocal;
                    if ( barMinValue > <number>values.minLocal ) {
                        barMinValue = <number>values.minLocal;
                    }
                } else {
                    if ( legendFlag ) {
                        barMaxValue = barMaxValue + maxValue;
                    }
                    barMinValue = <number>values.minLocal;
                }
                barIncrement++;
                role.push('bar');
                renderBarFlag = true;
            }
            if (view.values[step].source.roles[`Tooltips`] ) {
                role.push('tooltips');
                tooltipFlag = true;
            }
            if ( legendFlag && view.values[step].source.roles[`Bar`] ) {
                role.pop();
                tempRole.push('bar');
                maxValue = maxValue + <number>values.maxLocal;
            }
            if ( tempRole.indexOf('bar') !== -1) {
                tempBarDataModel = getLegendData(categories, tempRole, view.values[step]);
            }
            if (view.values[step].source.roles[`Milestonename`]) {
                mileStoneTitle = view.values[step].source.displayName;
                mileStoneFlag = true;
                mileStoneCategory = view.values[step];
            }
            if ( view.values[step].source.roles[`Milestonegroup`] ) {
                mileStoneGroupTitle = view.values[step].source.displayName;
                mileStoneGroupFlag = true;
                mileStoneGroupCategory = view.values[step];
            }
            if ( !(legendFlag && role.length === 0) ) {
                const len: number = Math.max(categoryValueLength, valuesLength);
                for (let iterator: number = 0; iterator < len; iterator++) {
                    if (role.indexOf('bar') !== -1) {
                        if (barIncrement === 1) {
                            maxValueArray.push(values.values[iterator] === null ? 0 : <number>values.values[iterator]);
                            minValueArray.push(values.values[iterator] === null || values.values[iterator] > 0 ? 0 :
                                 <number>values.values[iterator]);
                        } else {
                            maxValueArray[iterator] = maxValueArray[iterator] + (values.values[iterator] === null ? 0 :
                                 <number>values.values[iterator]);
                            minValueArray[iterator] = minValueArray[iterator] + (values.values[iterator] === null ||
                                values.values[iterator] > 0  ? 0 : <number>values.values[iterator]);
                        }
                    }
                    if ( nullValuesIndex.indexOf(iterator) === -1 ) {
                        dataPoints.push({
                            dates: numberOfCategoryColumn === 1 ? categoryValues[iterator] : columnNames[iterator],
                            actualDates: categoryValues[iterator],
                            yvalue: values.values[iterator],
                            selected: false,
                            identity: visualHost.createSelectionIdBuilder().withCategory(
                                categories, iterator).createSelectionId()
                        });
                    } else {
                        dataPoints.push({
                            dates: '(Blank)',
                            actualDates: null,
                            yvalue: values.values[iterator],
                            selected: false,
                            identity: visualHost.createSelectionIdBuilder().withCategory(
                                categories, iterator).withMeasure('Blank').createSelectionId()
                        });
                    }
                }
            }
            if ( (!dateFlag || numberOfCategoryColumn > 1) && dataPoints.length !== 0 ) {
                dataPoints = aggregateData(dataPoints);
            }
            if ( legendFlag && view.values[step].source.roles[`Bar`]) {
                tempBarDataModel.forEach(function(data: IVisualViewModel): void {
                    viewModel.push({
                        dataPoints: data.dataPoints,
                        keyName: data.keyName,
                        dataRole: data.dataRole,
                        selectionId: data.selectionId,
                        selected: data.selected,
                        identity: data.identity
                    });
                });
            }
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
        if ( renderBarFlag) {
            let tempMaxValue: number = 0;
            let tempMinValue: number = 0;
            for ( let index: number = 0; index < maxValueArray.length; index++ ) {
                if ( tempMaxValue < maxValueArray[index] ) {
                    tempMaxValue = maxValueArray[index];
                }
                if ( tempMinValue > minValueArray[index] ) {
                    tempMinValue = minValueArray[index];
                }
            }
            barMaxValue = maxValue = tempMaxValue;
            barMinValue = minValue = tempMinValue;
        }
        const metadataColumn: DataViewMetadataColumn[] = options.dataViews[0].metadata.columns;
        const mileStoneDate: string[] = [];
        let increment: number = 0;
        let isDefaultIndex: number = null;
        if (mileStoneFlag) {
            for (let index: number = 0; index < categoryValueLength; index++) {
                // tslint:disable-next-line:no-any
                let tempValue: any;
                if ( numberOfCategoryColumn === 1 ) {
                    tempValue = categories.values[index] === '' ? '(Blank)' : categories.values[index];
                } else {
                    tempValue = dateConverter(dateValues[index]);
                }
                if (mileStoneGroupFlag && mileStoneGroupCategory  && <string>categories.values[index] !== null &&
                     mileStoneGroup.indexOf(<string>mileStoneGroupCategory.values[index]) === -1 &&
                      <string>mileStoneGroupCategory.values[index] !== null) {
                        mileStoneGroup.push(<string>mileStoneGroupCategory.values[index]);
                        mileStoneGroupData.push({
                             dates: null,
                             name: <string>mileStoneGroupCategory.values[index],
                             actualDates: null,
                             color: getCategoricalObjectValue<Fill>(categories, index, `mileStone`, 'fillColor', {
                                solid: {
                                    color: host.colorPalette.getColor(mileStoneGroupCategory.values[index].toString()).value
                                }
                            }).solid.color,
                            group: null,
                            selector: staticHost.createSelectionIdBuilder().withCategory(categories, index)
                            .createSelectionId()
                         });
                        increment++;
                }
                if (mileStoneCategory.values[index] && <string>categories.values[index] !== null) {
                    // tslint:disable-next-line:no-any
                    const tempDate: any = numberOfCategoryColumn === 1 ? <string>categories.values[index] : columnNames[index];
                    if ( mileStoneDate.indexOf(tempDate.toString()) === -1 ) {
                        mileStoneData.push({
                            dates: numberOfCategoryColumn === 1 ? <string>categories.values[index] === '' ? tempValue :
                             <string>categories.values[index] : columnNames[index],
                            name: <string>mileStoneCategory.values[index],
                            actualDates: numberOfCategoryColumn === 1 ? <Date>categories.values[index] : tempValue,
                            color: getCategoricalObjectValue<Fill>(categories, index, `mileStone`, 'fillColor', {
                                solid: {
                                    color: host.colorPalette.getColor(mileStoneCategory.values[index].toString()).value
                                }
                            }).solid.color,
                            group: mileStoneGroupFlag ? <string>mileStoneGroupCategory.values[index] : null,
                            selector: staticHost.createSelectionIdBuilder().withCategory(categories, index)
                                .createSelectionId()
                        });
                        mileStoneDate.push(tempDate.toString());
                        increment++;
                        if ( mileStoneGroupFlag && mileStoneGroupCategory.values[index] === null ) {
                            isDefaultIndex = index;
                        }
                    }
                }
            }
        }
        if ( isDefaultIndex !== null ) {
            mileStoneGroupData.push({
                dates: null,
                name: 'Default group',
                actualDates: null,
                color: getCategoricalObjectValue<Fill>(categories, isDefaultIndex, `mileStone`, 'fillColor', {
                   solid: {
                       color: host.colorPalette.getColor('Default').value
                   }
               }).solid.color,
               group: null,
               selector: staticHost.createSelectionIdBuilder().withCategory(categories, isDefaultIndex)
               .createSelectionId()
            });
        }

        return viewModel;
    }

    export class ComboChartWithMilestones implements IVisual {
        private prevDataViewObjects: DataViewObjects = {};
        private target: HTMLElement;
        private updateCount: number;
        private settings: VisualSettings;
        private host: IVisualHost;
        public static thisObj: ComboChartWithMilestones;
        private textNode: Text;
        private svg: d3.Selection<SVGElement>;
        private mainChart: d3.Selection<SVGElement>;
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
        // To render circle at the middle of graph in case of one element in data set
        private midPoint: number;
        private mouseG: d3.Selection<SVGElement>;
        private xScale: d3.scale.Ordinal<string, number>;
        // tslint:disable-next-line:no-any
        private xScale2: any;
        // tslint:disable-next-line:no-any
        private yScale: any;
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
        private behavior: ComboChartWithMilestonesBehavior;
        private clearCatcher: d3.Selection<SVGElement>;
        // tslint:disable-next-line:no-any
        private line: any[] = [];
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
        private yDisplayUnit: number;
        // Paddings for scale range bounds
        private outerPadding: number = 0.2;
        private padding: number = 0.99;
        private yTicksHeight: number = 50;
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
            this.behavior = new ComboChartWithMilestonesBehavior();
            let yAxisChart: d3.Selection<SVGElement>;
            let ySecAxisChart: d3.Selection<SVGElement>;
            let rootDiv: d3.Selection<SVGElement>;
            svg = this.svg = d3.select(this.target)
                               .append('div').classed('ComboChartWithMilestones', true);
            this.locale = options.host.locale;
            yAxisChart = this.yAxisChart = this.svg.append('svg').classed('yAxisSVG', true);
            ySecAxisChart = this.ySecAxisChart = this.svg.append('svg').classed('ySecAxisSVG', true);
            let mainChart: d3.Selection<SVGElement>;
            rootDiv = this.rootDiv = this.svg.append('div').classed('rootDivClass', true)
                .style('overflow-x', 'hidden');
            mainChart = this.mainChart = this.rootDiv.append('svg').classed('scrollClass', true);
            this.clearCatcher = appendClearCatcher(this.mainChart);
            let chart: d3.Selection<SVGElement>;
            chart = this.chart = this.mainChart.append('svg').classed('chartClass', true);
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
                    d3.selectAll('.ComboChartWithMilestones').style('margin-top', `${legendHeight.height}px`)
                        .style('margin-left', 0).style('margin-right', 0);
                    this.legend.changeOrientation(LegendPosition.Top);
                    break;
                case 'Top center':
                    height = options.viewport.height - legendHeight.height;
                    legendWidth = legendHeight.width + 30;
                    width = options.viewport.width;
                    adjustedLegendHeight = legendHeight.height;
                    d3.selectAll('.ComboChartWithMilestones').style('margin-top', `${legendHeight.height}px`)
                        .style('margin-left', 0).style('margin-right', 0);
                    this.legend.changeOrientation(LegendPosition.TopCenter);
                    break;
                case 'Bottom':
                    height = options.viewport.height - legendHeight.height;
                    width = options.viewport.width;
                    adjustedLegendHeight = 0;
                    d3.selectAll('.ComboChartWithMilestones').style('margin-top', 0)
                        .style('margin-left', 0).style('margin-right', 0);
                    this.legend.changeOrientation(LegendPosition.Bottom);
                    break;
                case 'Bottom center':
                    height = options.viewport.height - legendHeight.height;
                    legendWidth = legendHeight.width + 30;
                    width = options.viewport.width;
                    adjustedLegendHeight = 0;
                    d3.selectAll('.ComboChartWithMilestones').style('margin-top', 0)
                        .style('margin-left', 0).style('margin-right', 0);
                    this.legend.changeOrientation(LegendPosition.BottomCenter);
                    break;
                case 'Left':
                    height = options.viewport.height;
                    width = options.viewport.width - legendHeight.width;
                    adjustedLegendHeight = 0;
                    d3.selectAll('.ComboChartWithMilestones').style('margin-top', 0)
                        .style('margin-left', `${legendHeight.width}px`).style('margin-right', 0);
                    this.legend.changeOrientation(LegendPosition.Left);
                    break;
                case 'Left center':
                    height = options.viewport.height;
                    width = options.viewport.width - legendHeight.width;
                    adjustedLegendHeight = 0;
                    d3.selectAll('.ComboChartWithMilestones').style('margin-top', 0)
                        .style('margin-left', `${legendHeight.width}px`).style('margin-right', 0);
                    this.legend.changeOrientation(LegendPosition.LeftCenter);
                    break;
                case 'Right':
                    height = options.viewport.height;
                    width = options.viewport.width - legendHeight.width;
                    adjustedLegendHeight = 0;
                    d3.selectAll('.ComboChartWithMilestones').style('margin-top', 0)
                        .style('margin-left', 0).style('margin-right', `${legendHeight.width}px`);
                    this.legend.changeOrientation(LegendPosition.Right);
                    break;
                case 'Right center':
                    height = options.viewport.height;
                    width = options.viewport.width - legendHeight.width;
                    adjustedLegendHeight = 0;
                    d3.selectAll('.ComboChartWithMilestones').style('margin-top', 0)
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
            for ( let iterator: number = 0; iterator < this.viewBarModel.length; iterator++ ) {
                if ( legendFlag ) {
                    for (let index: number = 0; index < legendCategory.values.length; index++) {
                        if ( legendCategory.values[index] !== null && legendCategory.values[index] !== '' &&
                         legendCategory.values[index].toString() ===
                         this.viewBarModel[iterator].keyName.toString() && uniquevaluesArray.indexOf(
                             this.viewBarModel[iterator].keyName ) === -1) {
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
                        } else if ( (legendCategory.values[index] === null || legendCategory.values[index] !== '' ) &&
                             this.viewBarModel[iterator].keyName.toString() === '(Blank)' && uniquevaluesArray.indexOf(
                                this.viewBarModel[iterator].keyName ) === -1) {
                            colors.push({
                                key: this.viewBarModel[iterator].keyName,
                                color: <string>getCategoricalObjectValue<Fill>(legendCategory, index, 'dataColors',
                                                                               'fillBarColor', {solid: {
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
            for ( let iterator: number = 0; iterator < this.viewLineModel.length; iterator++ ) {
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
            ComboChartWithMilestones.thisObj.settings.legend.titleText = ComboChartWithMilestones.thisObj.settings.legend.titleText !== '' ?
            ComboChartWithMilestones.thisObj.settings.legend.titleText : legendTitle;
            legendData = {
                title: ComboChartWithMilestones.thisObj.settings.legend.title ?
                                                ComboChartWithMilestones.thisObj.settings.legend.titleText : '',
                dataPoints: [],
                labelColor: ComboChartWithMilestones.thisObj.settings.legend.color,
                fontSize: ComboChartWithMilestones.thisObj.settings.legend.fontSize
            };
            uniqueValuesLegend.forEach(function (data: PrimitiveValue, iterator: number): void {
                legendData.dataPoints.push({
                    label: <string>data,
                    color: colors[iterator].color,
                    icon: powerbi.extensibility.utils.chart.legend.LegendIcon.Circle,
                    selected: false,
                    identity: ComboChartWithMilestones.thisObj.host.createSelectionIdBuilder()
                    .withCategory(ComboChartWithMilestones.thisObj.dataViews.categorical.categories[0], iterator)
                    .withMeasure(`${data} ${iterator}`)
                    .createSelectionId()
                });
            });
            if (this.settings.legend.show) {
                this.loopOne = true;
                this.legendPosition(options);
                this.legend.drawLegend(legendData, options.viewport);
                this.loopOne = false;
                this.legendPosition(options);
            } else {
                d3.selectAll('.ComboChartWithMilestones').style('margin-top', 0)
                    .style('margin-left', 0).style('margin-right', 0);
                height = options.viewport.height;
                width = options.viewport.width;
                d3.selectAll('.navArrow').remove();
            }
        }
        /**
         * Function to render horizontal grid lines
         * @function
         * @param {IVisualViewModel} viewModel - contains all the data
         */
        public renderHorizontalGrid(viewModel: IVisualViewModel[]): void {
            if (this.settings.yAxis.horizontalLineWidth > 5) {
                this.settings.yAxis.horizontalLineWidth = 5;
            } else if (this.settings.yAxis.horizontalLineWidth <= 0) {
                this.settings.yAxis.horizontalLineWidth = 1;
            }
            // tslint:disable-next-line:no-any
            const yTicks: any = this.yAxisChart.selectAll('.yAxisGroup .tick');
            const tickLength: number = yTicks.size();
            if ( this.settings.yAxis.scaleType === 'log' ) {
                this.yAxisChart.selectAll('.yAxisGroup .tick').each(function(d: number, index: number): void {
                    if (tickLength > ComboChartWithMilestones.thisObj.maxTicksOnY
                            && (index % (ComboChartWithMilestones.thisObj.maxTicksOnY - 1) !== 0)
                            && (index !== 0)) {
                        this.remove();
                    }
                });
            }
            xAxisStartRange = xAxisLabelsWidth * dataLength > 1.1 * ( width ) ?
                this.settings.xAxis.minimumCategoryWidth / 2  : xAxisLabelsWidth / 2;
            const maxval: number = d3.max(viewModel[0].dataPoints, (d: IVisualDataPoint) => <number>d.yvalue);
            if ( this.settings.yAxis.show ) {
                for (let index: number = 0; index < tickLength; index++) {
                    let yCoordinate: number;
                    if ( this.settings.yAxis.scaleType === 'log' && tickLength > this.maxTicksOnY && ((index === 0) ||
                     ( index % 9 === 0 ))) {
                        yCoordinate = yTicks[0][index].getAttribute('transform')
                        .substring(12, (yTicks[0][index].getAttribute('transform').length) - 1);
                    } else if ( this.settings.yAxis.scaleType === 'linear' || (this.settings.yAxis.scaleType === 'log' &&
                     tickLength <= this.maxTicksOnY)) {
                        yCoordinate = yTicks[0][index].getAttribute('transform')
                        .substring(12, (yTicks[0][index].getAttribute('transform').length) - 1);
                    } else {
                        continue;
                    }
                    if (yCoordinate !== (maxval)) {
                        if (this.settings.yAxis.horizontalGridLines) {
                            this.chart.append('line').classed('ygridLines', true).attr({
                                x1: categoryFlag ? 0 : 5,
                                y1: yCoordinate,
                                x2: categoryFlag ? width < this.mainChartWidth + (2 * xAxisStartRange) ?
                                    this.mainChartWidth + (2 * xAxisStartRange) : width - ySecAxisWidth - 5 :
                                     width - yHeight - yAxisWidth - ySecAxisWidth - 5,
                                y2: yCoordinate,
                                stroke: this.settings.yAxis.horizontalLineColor,
                                'stroke-width': this.settings.yAxis.horizontalLineWidth
                            });
                        }
                    }
                }
            } else {
                this.settings.yAxis.secondaryYAxis = false;
                d3.selectAll('.yAxisSVG').style('display', 'none');
                d3.selectAll('.ySecAxisSVG').style('display', 'none');
            }
        }
        /**
         * Function to render vertical grid lines
         * @function
         *
         */
        public renderVerticalGrid(): void {
            if (this.settings.xAxis.verticalLineWidth > 5) {
                this.settings.xAxis.verticalLineWidth = 5;
            } else if (this.settings.xAxis.verticalLineWidth <= 0) {
                this.settings.xAxis.verticalLineWidth = 1;
            }
            todayPosition = this.settings.todayLine.labelPosition;
            if ( categoryFlag ) {
                todayPosition = this.settings.todayLine.labelPosition = 'top';
            }
            // tslint:disable-next-line:no-any
            const xTicks: any = this.mainChart.selectAll('.xAxis .tick');
            const xtickLength: number = xTicks.size();
            let xTicksMaxValue: number;
            this.yAxisChart.selectAll('.yAxisGroup .tick').each(function(d: number, index: number): void {
                xTicksMaxValue = d;
            });

            for (let i: number = 0; i < xtickLength; i++) {
                // tslint:disable-next-line:no-any
                let xCoordinate1 : any = xTicks[0][i].getAttribute('transform');
                // tslint:disable-next-line:no-any
                const init : any = xCoordinate1.indexOf('(');
                // tslint:disable-next-line:no-any
                const fin : any =  xCoordinate1.indexOf(')');
                xCoordinate1 = xCoordinate1.substr(init + 1 , fin - init - 1 );

                const xCoordinate: number = xTicks[0][i].getAttribute('transform')
                .substring(10, (xTicks[0][i].getAttribute('transform').length - 2) - 1);

                if (this.settings.xAxis.verticalGridLines && this.settings.xAxis.show) {
                    this.chart.append('line').classed('xgridLines', true).attr({
                        x1: parseFloat(xCoordinate1),
                        y1: this.yScale(xTicksMaxValue),
                        x2: parseFloat(xCoordinate1),
                        y2: this.yScale(this.yAxisStart),
                        stroke: this.settings.xAxis.verticalLineColor,
                        'stroke-width': this.settings.xAxis.verticalLineWidth
                    });
                }
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
                if (categoryCol.source.roles[`Category`]) {
                    xTitleName = this.xAxisTitle = this.dataViews.categorical.categories[index].source.displayName;
                    this.settings.xAxis.titleText = this.settings.xAxis.titleText === '' ? this.xAxisTitle : this.settings.xAxis.titleText;
                    this.formatter = valueFormatter.create({
                        format: options.dataViews[0].categorical.categories[0].source.format
                    });
                }
            }
            if ( categoryFlag ) {
                for (let index: number = 0; index < viewModel[0].dataPoints.length; index++) {
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
                        format : options.dataViews[0].categorical.categories[0].source.format
                    });
                }
                xAxisLabelsHeight = textMeasurementService.measureSvgTextHeight(xAxisProp) + 5;
            } else {
                if ( dateFlag ) {
                    this.xFormatter = valueFormatter.create({
                        format : options.dataViews[0].categorical.categories[0].source.format
                    });
                    if ( (xAxisLabelWidth * noOFHalfYears) > (width - yHeight - yAxisWidth - ySecAxisWidth) ) {
                        this.xFormatter.format = d3.time.format('%Y');
                    } else if ((xAxisLabelWidth * noOfWeeks) < (width - yHeight - yAxisWidth - ySecAxisWidth)) {
                        this.xFormatter.format = d3.time.format('%d %b');
                    } else {
                        this.xFormatter.format = d3.time.format('%b %Y');
                    }
                } else {
                    this.xFormatter = valueFormatter.create({
                        format : options.dataViews[0].categorical.categories[0].source.format
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
            xStart = this.settings.xAxis.startValue !== null
                            && this.settings.xAxis.startValue !== ''
                            && regexDate.test(this.settings.xAxis.startValue) ?
                    new Date(this.settings.xAxis.startValue) : null;
            xEnd = this.settings.xAxis.endValue !== null
                            && this.settings.xAxis.endValue !== ''
                            && regexDate.test(this.settings.xAxis.endValue) ?
                    new Date(this.settings.xAxis.endValue) : null;

            if (xStart > xEnd) {
                xStart = null;
                xEnd = null;
            }

            if ( xStart === null ) {
                for ( let index: number = 0; index < viewModel[0].dataPoints.length; index++ ) {
                    if ( viewModel[0].dataPoints[index].actualDates !== null ) {
                        xStart = viewModel[0].dataPoints[index].actualDates;
                        break;
                    }
                }
            }
            if ( xEnd === null ) {
                xEnd = viewModel[0].dataPoints[viewModel[0].dataPoints.length - 1].actualDates;
            }
            xAxisLabelsHeight = xAxisLabelsWidth * 1.1 * dataLength > ( width ) ? xAxisLabelsWidth + 5 : xAxisLabelsHeight;
            if ( this.settings.xAxis.maxAxisHeight !== null && this.settings.xAxis.maxAxisHeight.toString() !== `0`) {
                xAxisLabelsHeight = height * this.settings.xAxis.maxAxisHeight / 100;
            }
            if ( this.settings.xAxis.typeX === 'Categorical' ) {
                xAxisStartRange = xAxisLabelsWidth * dataLength > 1.1 * ( width ) ?
                this.settings.xAxis.minimumCategoryWidth / 2  : xAxisLabelsWidth / 2;
                this.settingsAxis.axis.x.padding = width < this.mainChartWidth + (2 * xAxisStartRange) ? 15 : 0;
            } else {
                d3.select('.rootDivClass').style('overflow-x' , 'hidden');
            }
            if (!this.settings.xAxis.show ) {
                xAxisLabelsHeight = yAxisLabelHeight / 2;
            }
            if ( (todayHeight > xAxisTitleHeight) && this.settings.todayLine.show &&
             this.settings.todayLine.labelPosition === 'below') {
                xAxisTitleHeight = todayHeight;
            }
        }
        /**
         * Function to render x axis
         * @function
         * @param {IVisualViewModel} viewModel - contains all the data
         */
        // tslint:disable-next-line:cyclomatic-complexity
        public renderXAxis(viewModel: IVisualViewModel[]): void {
            let xStartLabelWidth: number;
            this.xAxisGroup = this.mainChart.append('svg').classed('xAxisSvg', true)
            .style('width', '800px').append('g').classed('xAxis', true);
            if (this.settings.xAxis.show && this.settings.xAxis.title) {
                this.svg.append('text').classed('xTitle', true)
                    .text(this.settings.xAxis.title ? this.settings.xAxis.titleText ? this.settings.xAxis.titleText :
                        this.xAxisTitle : '');
                d3.selectAll('.xTitle').style('margin-left', `${(width - this.xAxisTitleWidth) / 2}px`)
                    .style('top', categoryFlag === false ? `${height - xAxisTitleHeight + adjustedLegendHeight}px` :
                    `${height - this.settingsAxis.border.halfOfTop - xAxisTitleHeight + adjustedLegendHeight}px`)
                    .style('font-size', `${this.settings.xAxis.titleFontSize}px`)
                    .style('color', this.settings.xAxis.titleFontColor)
                    .style('font-Family', this.settings.xAxis.fontFamily);
                if ( this.settings.xAxis.title ) {
                    d3.selectAll('.xTitle').attr('title', this.settings.xAxis.titleText ? this.settings.xAxis.titleText :
                         this.xAxisTitle);
                }
            }
            let xAxis: d3.svg.Axis;
            let xScale: d3.scale.Ordinal<string, number>;
            let xScale2: d3.time.Scale<number, number>;
            if (categoryFlag) {
                xAxisStartRange = xAxisLabelsWidth * dataLength > 1.1 * ( width ) ?
                this.settings.xAxis.minimumCategoryWidth / 2  : xAxisLabelsWidth / 2;
                actualWidth = width < this.mainChartWidth + (2 * xAxisStartRange) ? this.mainChartWidth + (2 * xAxisStartRange) :
                 width - this.yAxisPadding - yAxisWidth - ySecAxisWidth;
                this.maxBarWidth = (actualWidth * 0.9) / dataLength;
                xAxisStartRange  = xAxisStartRange + 10;
                actualWidth = actualWidth - 10;
                d3.selectAll('.scrollClass').style('width', `${actualWidth}px`);
                xScale = this.xScale = d3.scale.ordinal()
                    .domain(viewModel[0].dataPoints.map((d: IVisualDataPoint) => d.dates))
                    .rangeBands([xAxisStartRange, actualWidth - xAxisStartRange], this.padding, this.outerPadding);
                xAxis = d3.svg.axis()
                    .scale(xScale)
                    .orient('bottom')
                    .ticks(viewModel[0].dataPoints.length)
                    .tickFormat(this.xFormatter.format)
                    .tickSize(1)
                    .tickPadding(-3);
            } else {
                actualWidth = width - yHeight - yAxisWidth - ySecAxisWidth - ySecHeight;
                let xTick: number = dataLength;
                this.maxBarWidth = (actualWidth * 0.9) / dataLength;
                if ( this.maxBarWidth > 150 ) {
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
                if ( dateFlag ) {
                    xScale2 = this.xScale2 = d3.time.scale()
                        .domain([xStart, xEnd])
                        .range([this.chartPadding + this.maxBarWidth, actualWidth - (2 * this.chartPadding) - this.maxBarWidth]);
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
                        .range([this.chartPadding + (this.maxBarWidth), actualWidth - (2 * this.chartPadding) - this.maxBarWidth]);
                }
                xAxis = d3.svg.axis()
                    .scale(this.xScale2)
                    .orient('bottom')
                    .ticks(xTick)
                    .tickFormat(this.xFormatter.format)
                    .tickSize(1)
                    .tickPadding(-5);
            }
            this.xAxisGroup
                .call(xAxis)
                .attr({
                    transform: `translate (0, ${height - xAxisLabelsHeight - xAxisTitleHeight - this.settingsAxis.axis.x.padding})`
                })
                .selectAll('text')
                .classed('xAxisGroup', true)
                .style({
                    'text-anchor': 'middle',
                    'font-size': `${this.settings.xAxis.fontSize}px`,
                    fill: this.settings.xAxis.color,
                    'font-Family': this.settings.xAxis.fontFamily
                });
            if ( categoryFlag) {
                if ( xAxisLabelsWidth * 1.1 * dataLength <= width ) {
                    d3.selectAll('.rootDivClass').style('overflow', 'hidden');
                    const availableWidthForText: number = xAxisLabelsWidth * dataLength > 1.1 * ( actualWidth ) ? xAxisLabelsWidth :
                     actualWidth / dataLength ;
                    this.xAxisGroup
                        .selectAll('text')
                        .call(AxisHelper.LabelLayoutStrategy.clip, availableWidthForText, textMeasurementService.svgEllipsis)
                        .attr({
                            transform: `translate(0, 5)`
                        }).style('text-anchor', 'middle');
                } else {
                    todayPosition = 'up';
                    this.xAxisGroup
                        .selectAll('text')
                        .call(AxisHelper.LabelLayoutStrategy.clip, xAxisLabelsHeight - 8, textMeasurementService.svgEllipsis)
                        .attr({
                            transform: `translate(0, 5) rotate(-90)`
                        }).style('text-anchor', 'end');
                }
            } else {
                todayPosition = 'below';
                this.xAxisGroup
                    .selectAll('text')
                    .call(AxisHelper.LabelLayoutStrategy.clip, 100, textMeasurementService.svgEllipsis)
                    .attr({
                        transform: `translate(0, 10)`
                    });
            }
            // tslint:disable-next-line:no-any
            this.xAxisGroup.selectAll('text').append('title').text(function(d: any): string {
                return ComboChartWithMilestones.thisObj.xFormatter.format(d);
            });
            // tslint:disable-next-line:no-any
            const xTicks: any = this.xAxisGroup.selectAll('.xAxis .tick');
            const xTickLength: number = xTicks.size();
            const ticks: number = Math.round(xTickLength / 8);
            let tempMonth: number;
            let tempYear: number;
            let tempDay: number;
            let tempDate: number;
            if ( !categoryFlag && dateFlag) {
                this.xAxisGroup.selectAll('.xAxis .tick').each(function(d: Date, index: number): void {
                    if ( index === 0 && (xStartLabelWidth / 2) > (ComboChartWithMilestones.thisObj.xScale2(d))) {
                        tempMonth = d.getMonth();
                        tempYear = d.getFullYear();
                        tempDay = d.getDay();
                        tempDate = d.getDate();
                        this.remove();
                    } else if ((xTickLength <= dataLength) && (xAxisLabelWidth * xTickLength) < actualWidth) {
                        // nothing to do
                    } else if ( (xAxisLabelWidth * noOfDays) < actualWidth ) {
                        if (tempDate === d.getDate()) {
                            tempDate = d.getDate();
                            this.remove();
                        } else {
                            tempDate = d.getDate();
                        }
                    } else if ( (xAxisLabelWidth * noOfWeeks) < actualWidth ) {
                        if (tempDay !== d.getDay() && d.getDay() === 0) {
                            tempDay = d.getDay();
                        } else {
                            tempDay = d.getDay();
                            this.remove();
                        }
                    } else if ( (xAxisLabelWidth * noOfMonths) < actualWidth ) {
                        if (tempMonth !== d.getMonth()) {
                            tempMonth = d.getMonth();
                        } else {
                            this.remove();
                        }
                    } else if ( (xAxisLabelWidth * noOfQuarter) <= actualWidth ) {
                        if (d.getMonth() % 3 !== 0) {
                            this.remove();
                        } else if (tempMonth !== d.getMonth()) {
                            tempMonth = d.getMonth();
                        } else {
                            this.remove();
                        }
                    } else if ( (xAxisLabelWidth * noOFHalfYears) <= actualWidth ) {
                        if (d.getMonth() % 6 !== 0) {
                            this.remove();
                        } else if (tempMonth !== d.getMonth()) {
                            tempMonth = d.getMonth();
                        } else {
                            this.remove();
                        }
                    } else {
                        if (d.getMonth() !== 0) {
                            this.remove();
                        } else if (tempYear !== d.getFullYear()) {
                            tempYear = d.getFullYear();
                        } else {
                            this.remove();
                        }
                    }
                });
            } else if ( !categoryFlag && !dateFlag ) {
                // tslint:disable-next-line:no-any
                this.xAxisGroup.selectAll('.xAxis .tick').each(function(d: any, index: number): void {
                    if ( d % 1 !== 0 ) {
                        this.remove();
                    }
                });
            }
            if ( !this.settings.xAxis.show ) {
                d3.selectAll('.xAxis .tick text').remove();
            }
        }
        /**
         * Function to apply all the configurations for secondary y axis
         * @function
         *
         */
        public applySecondaryYAxisConfiguration(): void {
            if ( !dataTypeNumberFlag && !dateFlag ) {
                this.settings.xAxis.typeX = 'Categorical';
                categoryFlag = true;
                this.settingsAxis.axis.x.padding = this.settingsAxis.border.halfOfTop;
            }
            if ( this.settings.yAxis.secondaryDecimalPoint < 0 ) {
                this.settings.yAxis.secondaryDecimalPoint = 0;
            } else if (this.settings.yAxis.secondaryDecimalPoint > 4) {
                this.settings.yAxis.secondaryDecimalPoint = 4;
            }
            if ( renderBarFlag && renderLineFlag && this.settings.yAxis.secondaryYAxis) {
                minValue = barMinValue;
                isSecondary = true;
                let ySecTitleProp: TextProperties;
                ySecTitleProp = {
                    text: this.settings.yAxis.secondaryTitleText,
                    fontFamily: this.settings.yAxis.fontFamily,
                    fontSize: `${this.settings.yAxis.secTitleFontSize}px`
                };
                ySecHeight = this.settings.yAxis.secondaryTitleText === '' ? 0 :
                  textMeasurementService.measureSvgTextHeight(ySecTitleProp);
                ySecTitleWidth = textMeasurementService.measureSvgTextWidth(ySecTitleProp);
                this.ySecFormatter = valueFormatter.create({
                    format: maxValueFormat,
                    value: this.settings.yAxis.secondaryDisplayUnit === 0 ? this.yDisplayUnit : this.settings.yAxis.secondaryDisplayUnit,
                    precision: this.settings.yAxis.secondaryDecimalPoint
                });
                let powerTag: number = 0;
                let maxVal: number = lineMaxValue;
                for (let index: number = 0 ; Math.pow(10, index) < lineMaxValue; index++) { powerTag = index + 1; }
                if ( this.settings.yAxis.secondaryScaleType === 'log' ) {
                    maxVal = Math.pow(10, powerTag);
                }
                let tempMaxValue: number = 0;
                tempMaxValue = this.settings.yAxis.secondaryEndValue;
                let yTextProp: TextProperties;
                yTextProp = {
                     text: this.ySecFormatter.format(maxVal > tempMaxValue ? maxVal * 1.1 : tempMaxValue * 1.1),
                     fontFamily: this.settings.yAxis.secondaryFontFamily,
                     fontSize: `${this.settings.yAxis.secFontSize}px`
                };
                let yTextPropMinValue: TextProperties;
                yTextPropMinValue = {
                     text: this.ySecFormatter.format(lineMinvalue),
                     fontFamily: this.settings.yAxis.secondaryFontFamily,
                     fontSize: `${this.settings.yAxis.secFontSize}px`
                };
                const ySecTempWidth: number = textMeasurementService.measureSvgTextWidth(yTextPropMinValue);
                ySecAxisWidth = textMeasurementService.measureSvgTextWidth(yTextProp);
                ySecAxisWidth = ySecAxisWidth > ySecTempWidth ? ySecAxisWidth : ySecTempWidth;
                ySecAxisLabelHeight = textMeasurementService.measureSvgTextHeight(yTextProp);
                this.ySecAxisPadding = this.settings.yAxis.secondaryTitle ? 3 + ySecHeight : 3;
                if (ySecPosition === 'Left') {
                    d3.selectAll('.ySecAxisSVG').style('width', `${ySecAxisWidth + this.ySecAxisPadding}px`) ;
                    leftAxisWidth = ySecAxisWidth;
                } else {
                    d3.selectAll('.ySecAxisSVG').style('width', `${ySecAxisWidth + this.ySecAxisPadding}px`);
                    rightAxisWidth = ySecAxisWidth;
                }
                ySecHeight = this.settings.yAxis.secondaryTitle ? ySecHeight : 0;
                d3.selectAll('.ySecAxisSVG').style('display', 'block').style('height', `${height}px`);
            } else {
                isSecondary = false;
                d3.selectAll('.ySecAxisSVG').style('display', 'none');
                this.ySecAxisPadding = 3;
                ySecAxisWidth = 0;
                ySecHeight = 0;
            }
        }
        /**
         * Function to apply all the configurations for primary y axis
         * @function
         *
         */
        // tslint:disable-next-line:cyclomatic-complexity
        public applyYAxisConfiguration(): void {
            let yTitleProp: TextProperties;
            yTitleProp = {
                text: this.settings.yAxis.titleText,
                fontFamily: this.settings.yAxis.fontFamily,
                fontSize: `${this.settings.yAxis.titleFontSize}px`
            };
            yHeight = this.settings.yAxis.titleText === '' ? 0 :
             textMeasurementService.measureSvgTextHeight(yTitleProp);
            yTitleWidth = textMeasurementService.measureSvgTextWidth(yTitleProp);
            let powerTag: number = 0;
            for (let index: number = 0 ; Math.pow(10, index) < maxValue; index++) { powerTag = index + 1; }
            if ( this.settings.yAxis.scaleType === 'log' ) {
                maxValue = Math.pow(10, powerTag);
            }
            const maxValueLength: number = (((maxValue * 1.1).toString()).split('.')[0]).length;
            if (maxValueLength > 12 && maxValueLength <= 15) {
                this.yDisplayUnit = 1e+12;
            } else if (maxValueLength > 9 && maxValueLength <= 12) {
                this.yDisplayUnit = 1e+9;
            } else if (maxValueLength > 6 && maxValueLength <= 9) {
                this.yDisplayUnit = 1e+6;
            } else if (maxValueLength > 3 && maxValueLength <= 6) {
                this.yDisplayUnit = 1e+3;
            } else {
                this.yDisplayUnit = 10;
            }
            this.dataFormatter = valueFormatter.create({
                format: maxValueFormat,
                value: this.settings.dataLabels.displayUnit === 0 ? this.yDisplayUnit : this.settings.dataLabels.displayUnit,
                precision: this.settings.dataLabels.decimalPoints
            });
            let yFormatter: IValueFormatter;
            yFormatter = this.yFormatter = valueFormatter.create({
                format: maxValueFormat,
                value: this.settings.yAxis.displayUnit === 0 ? this.yDisplayUnit : this.settings.yAxis.displayUnit,
                precision: this.settings.yAxis.decimalPoints
            });
            this.yTextFormatter = valueFormatter.create({
                format: maxValueFormat
            });
            let tempMaxValue: number = 0;
            tempMaxValue = this.settings.yAxis.endValue !== null ? this.settings.yAxis.endValue : tempMaxValue;
            let yTextProp: TextProperties;
            yTextProp = {
                 text: yFormatter.format(maxValue > tempMaxValue ? maxValue * 1.1 : tempMaxValue * 1.1),
                 fontFamily: this.settings.yAxis.fontFamily,
                 fontSize: `${this.settings.yAxis.fontSize}px`
             };
            let yTextPropMinValue: TextProperties;
            yTextPropMinValue = {
                  text: yFormatter.format(minValue * 1.1),
                  fontFamily: this.settings.yAxis.fontFamily,
                  fontSize: `${this.settings.yAxis.fontSize}px`
              };
            yAxisWidth = textMeasurementService.measureSvgTextWidth(yTextProp);
            const yminWidth: number = textMeasurementService.measureSvgTextWidth(yTextPropMinValue);
            yAxisWidth = yAxisWidth > yminWidth ? yAxisWidth : yminWidth;
            yAxisLabelHeight = textMeasurementService.measureSvgTextHeight(yTextProp);
            if (width > 170 && this.settings.yAxis.show) {
                if (this.settings.yAxis.position === 'Left') {
                    this.yAxisPadding = this.settings.yAxis.title ? 3 + yHeight : 3;
                    d3.selectAll('.yAxisSVG').style('width', `${yAxisWidth + this.yAxisPadding}px`);
                    leftAxisWidth = yAxisWidth;
                } else {
                    this.yAxisPadding = 3;
                    d3.selectAll('.yAxisSVG').style('width', `${yAxisWidth + yHeight + 2}px`);
                    rightAxisWidth = yAxisWidth;
                }
                yHeight = this.settings.yAxis.title ? yHeight : 0;
                d3.selectAll('.yAxisSVG').style('display', 'block').style('height', `${height}px`);
            } else {
                d3.selectAll('.yAxisSVG').style('display', 'none');
                this.yAxisPadding = 3;
                yAxisWidth = 0;
                yHeight = 0;
            }
            this.applySecondaryYAxisConfiguration();
        }
        /**
         * Function to render secondary y axis
         * @function
         * @param {VisualUpdateOptions} options - contains references to the size of the container
         *
         */
        public renderSecondaryYAxis(options: VisualUpdateOptions): void {
            let ySecStart: number;
            let ySecEnd: number;
            let powerTag: number = 0;
            let lowerTag: number = 0;
            for ( let index: number = 0; Math.pow(10, index) < minValue; index++) {
                lowerTag = index;
            }
            for (let index: number = 0 ; Math.pow(10, index) < lineMaxValue; index++) { powerTag = index + 1; }
            ySecStart = this.ySecStart = this.settings.yAxis.secondaryStartValue !== null ? this.settings.yAxis.secondaryStartValue :
             lineMinvalue;
            ySecEnd = this.ySecEnd = this.settings.yAxis.secondaryEndValue !== null ? this.settings.yAxis.secondaryEndValue :
             lineMaxValue * 1.1;
            if ( renderBarFlag && renderLineFlag ) {
                if ( this.settings.yAxis.secondaryScaleType === 'linear' ) {
                    if ( ySecStart >= ySecEnd ) {
                        if ( ySecStart > maxValue ) {
                        ySecStart = 0;
                        this.settings.yAxis.startValue = 0;
                        } else {
                        this.settings.yAxis.endValue = lineMaxValue;
                        ySecEnd = this.yAxisEnd = lineMaxValue;
                        }
                    }
                    this.ySecScale = d3.scale.linear()
                    .domain([ySecStart, ySecEnd])
                    .range([height - xAxisLabelsHeight - xAxisTitleHeight - this.settingsAxis.axis.x.padding,
                         this.mileStoneTextPadding + todayHeight + this.mileStoneTextHeight + this.polygonfullWidth +
                          this.polygonHalfWidth]);
                } else {
                    ySecStart = Math.pow(10, lowerTag);
                    ySecEnd = Math.pow(10, powerTag);
                    if ( this.settings.yAxis.secondaryStartValue !== null ) {
                        ySecStart = this.settings.yAxis.secondaryStartValue;
                    }
                    if ( this.settings.yAxis.secondaryEndValue !== null ) {
                        ySecEnd = this.settings.yAxis.secondaryEndValue;
                    }
                    this.ySecScale = d3.scale.log().base(10)
                        .domain([ySecStart, ySecEnd])
                        .range([height - xAxisLabelsHeight - xAxisTitleHeight - this.settingsAxis.axis.x.padding,
                            this.mileStoneTextPadding + todayHeight + this.mileStoneTextHeight + this.polygonfullWidth +
                             this.polygonHalfWidth]);
                }
                this.ySecStart = ySecStart;
                this.ySecAxisGroup = this.ySecAxisChart.append('g').classed('ySecAxis', true);
                let yAxis: d3.svg.Axis;
                if (ySecPosition === 'Left') {
                    d3.selectAll('.ySecAxisSVG').style('margin-left', '0px');
                    yAxis = d3.svg.axis()
                        .scale(this.ySecScale)
                        .orient('left')
                        .tickSize(1)
                        .tickFormat(this.ySecFormatter.format)
                        .ticks(options.viewport.height / this.yTicksHeight)
                        .tickPadding(2);
                    this.ySecAxisGroup
                        .call(yAxis)
                        .attr({
                         transform: `translate(${this.ySecAxisPadding + ySecAxisWidth}, 0)`
                        })
                        .classed('ySecAxisGroup', true)
                        .style('margin-left', `${(this.ySecAxisPadding + ySecAxisWidth)}px`)
                        .selectAll('text')
                        .style({
                            'font-size': `${this.settings.yAxis.secFontSize}px`,
                            fill: this.settings.yAxis.secondaryColor,
                            'font-Family': this.settings.yAxis.secondaryFontFamily
                        });
                } else {
                    d3.selectAll('.ySecAxisSVG').style('margin-left', `${width - this.ySecAxisPadding - ySecAxisWidth}px`);
                    yAxis = d3.svg.axis()
                        .scale(this.ySecScale)
                        .orient('right')
                        .tickSize(1)
                        .tickFormat(this.ySecFormatter.format)
                        .ticks(options.viewport.height / this.yTicksHeight)
                        .tickPadding(ySecAxisWidth);
                    this.ySecAxisGroup
                        .call(yAxis)
                        .attr({
                            transform: `translate(0, 0)`
                        })
                        .classed('ySecAxisGroup', true)
                        .style('margin-left', `0px`)
                        .selectAll('text')
                        .style({
                            'text-anchor': 'end',
                            'font-size': `${this.settings.yAxis.secFontSize}px`,
                            fill: this.settings.yAxis.secondaryColor,
                            'font-Family': this.settings.yAxis.secondaryFontFamily
                    });
                }
                this.ySecAxisGroup.selectAll('text').append('title').text(function(d: number): string {
                    return ComboChartWithMilestones.thisObj.yTextFormatter.format(d);
                });
                // tslint:disable-next-line:no-any
                const ySecTicks: any = this.ySecAxisChart.selectAll('.ySecAxisGroup .tick');
                const secTickLength: number = ySecTicks.size();
                if ( this.settings.yAxis.secondaryScaleType === 'log' ) {
                    this.ySecAxisChart.selectAll('.ySecAxisGroup .tick').each(function(d: number, index: number): void {
                        if (secTickLength > ComboChartWithMilestones.thisObj.maxTicksOnX
                            && (index % (ComboChartWithMilestones.thisObj.maxTicksOnX - 1) !== 0)
                            && (index !== 0)) {
                            this.remove();
                        }
                    });
                }
                this.ySecAxisChart.append('text').classed('ySecTitle', true)
                    .text(this.settings.yAxis.secondaryTitle ? this.settings.yAxis.secondaryTitleText : '')
                    .attr('transform', ySecPosition === 'Left' ?
                        `translate(${this.ySecAxisPadding - 10}, ${(options.viewport.height + ySecTitleWidth) / 2}) rotate(-90)` :
                        `translate(${ySecAxisWidth + 8},
                             ${(options.viewport.height - ySecTitleWidth) / 2}) rotate(90)`)
                    .style({
                        'max-width': `${options.viewport.width / 2}px`,
                        'font-size': this.settings.yAxis.secTitleFontSize,
                        fill: this.settings.yAxis.secondaryTitleFontColor,
                        'font-Family': this.settings.yAxis.secondaryFontFamily
                    });
                d3.selectAll('.ySecTitle').append('title').text(this.settings.yAxis.secondaryTitleText);
                d3.selectAll('path.domain').style('display', 'none');
            }
        }
        /**
         * Function to render primary y axis
         * @function
         * @param {VisualUpdateOptions} options - contains references to the size of the container
         *
         */
        // tslint:disable-next-line:cyclomatic-complexity
        public renderYAxis(options: VisualUpdateOptions): void {
            let yStart: number;
            let yEnd: number;
            let powerTag: number = 0;
            if ( !renderBarFlag ) {
                maxValue = lineMaxValue;
            }
            for (let index: number = 0 ; Math.pow(10, index) < maxValue; index++) {
                powerTag = index + 1;
            }
            if ( maxValue === minValue ) {
                maxValue = maxValue * 1.1;
                const tempDiff: number = (minValue * 1.1) - minValue;
                minValue = minValue - tempDiff;
            }
            yStart = this.yAxisStart = this.settings.yAxis.startValue !== null ? this.settings.yAxis.startValue :
             renderBarFlag ? minValue < 0 ? minValue : 0 : minValue;
            yEnd = this.yAxisEnd = this.settings.yAxis.endValue !== null ? this.settings.yAxis.endValue : maxValue * 1.1;
            if (this.settings.yAxis.scaleType === 'linear') {
                if ( yStart >= yEnd ) {
                    if ( yStart > maxValue ) {
                        yStart = 0;
                        this.settings.yAxis.startValue = 0;
                    } else {
                        this.settings.yAxis.endValue = maxValue;
                        yEnd = this.yAxisEnd = maxValue;
                    }
                }
                if ( isSecondary && renderBarFlag && this.settings.yAxis.endValue === null ) {
                    yEnd = barMaxValue;
                }
                this.yScale = d3.scale.linear()
                    .domain([yStart, yEnd])
                    .range([height - xAxisLabelsHeight - xAxisTitleHeight - this.settingsAxis.axis.x.padding,
                         this.mileStoneTextPadding + this.mileStoneTextHeight + this.polygonfullWidth +
                          this.polygonHalfWidth + todayHeight]);
            } else {
                if ((yStart === yEnd  && yStart === 0) || yStart <= 0 || yEnd <= 0) {
                    yStart = 1;
                    yEnd = this.yAxisEnd =  Math.pow(10, powerTag);
                } else if ( yStart >= yEnd && yStart !== 0) {
                    yEnd = Math.pow(10, powerTag);
                }
                if ( isSecondary && renderBarFlag && barMaxValue < Math.pow(10, powerTag - 1)) {
                    yEnd = this.yAxisEnd = Math.pow(10, powerTag - 1);
                }
                this.yScale = d3.scale.log().base(10)
                    .domain([yStart, yEnd])
                    .range([height - xAxisLabelsHeight - xAxisTitleHeight - this.settingsAxis.axis.x.padding,
                        this.mileStoneTextPadding + this.mileStoneTextHeight + this.polygonfullWidth +
                         this.polygonHalfWidth + todayHeight]);
            }
            this.yAxisStart = yStart;
            this.yAxisGroup = this.yAxisChart.append('g').classed('yAxis', true);
            let yAxis: d3.svg.Axis;
            if (this.settings.yAxis.position === 'Left') {
                d3.selectAll('.yAxisSVG').style('margin-left', '0px');
                yAxis = d3.svg.axis()
                    .scale(this.yScale)
                    .orient('left')
                    .tickSize(1)
                    .tickFormat(this.yFormatter.format)
                    .ticks(options.viewport.height / this.yTicksHeight)
                    .tickPadding(2);
                this.yAxisGroup
                    .call(yAxis)
                    .attr({
                        transform: `translate(${this.yAxisPadding + yAxisWidth}, 0)`
                    })
                    .classed('yAxisGroup', true)
                    .style('margin-left', `${(this.yAxisPadding + yAxisWidth)}px`)
                    .selectAll('text')
                    .style({
                        'font-size': `${this.settings.yAxis.fontSize}px`,
                        fill: this.settings.yAxis.color,
                        'font-Family': this.settings.yAxis.fontFamily
                    });
            } else {
                d3.selectAll('.yAxisSVG').style('margin-left', `${width - this.yAxisPadding - yAxisWidth - yHeight}px`);
                yAxis = d3.svg.axis()
                    .scale(this.yScale)
                    .orient('right')
                    .tickSize(1)
                    .tickFormat(this.yFormatter.format)
                    .ticks(options.viewport.height / this.yTicksHeight)
                    .tickPadding(yAxisWidth);
                this.yAxisGroup
                    .call(yAxis)
                    .attr({
                        transform: `translate(0, 0)`
                    })
                    .classed('yAxisGroup', true)
                    .style('margin-left', `0px`)
                    .selectAll('text')
                    .style({
                        'text-anchor': 'end',
                        'font-size': `${this.settings.yAxis.fontSize}px`,
                        fill: this.settings.yAxis.color,
                        'font-Family': this.settings.yAxis.fontFamily
                });
            }
            this.yAxisGroup.selectAll('text').append('title').text(function(d: number): string {
                return ComboChartWithMilestones.thisObj.yTextFormatter.format(d);
            });
            // tslint:disable-next-line:no-any
            const yTicks: any = this.yAxisChart.selectAll('.yAxisGroup .tick');
            const tickLength: number = yTicks.size();
            if ( this.settings.yAxis.scaleType === 'log' ) {
                this.yAxisChart.selectAll('.yAxisGroup .tick').each(function(d: number, index: number): void {
                    if (tickLength > ComboChartWithMilestones.thisObj.maxTicksOnX
                        && (index % (ComboChartWithMilestones.thisObj.maxTicksOnX - 1) !== 0)
                        && (index !== 0)) {
                        this.remove();
                    }
                });
            }
            this.yAxisChart.append('text').classed('yTitle', true)
                .text(this.settings.yAxis.title ? this.settings.yAxis.titleText : '')
                .attr('transform', this.settings.yAxis.position === 'Left' ?
                    `translate(${this.yAxisPadding - 10}, ${(options.viewport.height + yTitleWidth) / 2}) rotate(-90)` :
                    `translate(${yAxisWidth + this.yAxisPadding + 5}, ${(options.viewport.height - yTitleWidth) / 2}) rotate(90)`)
                .style({
                    'max-width': `${options.viewport.width / 2}px`,
                    'font-size': this.settings.yAxis.titleFontSize,
                    fill: this.settings.yAxis.titleFontColor,
                    'font-Family': this.settings.yAxis.fontFamily
                });
            d3.selectAll('.yTitle').append('title').text(this.settings.yAxis.titleText);
            if ( dataLength === 1 ) {
                this.midPoint = width / 2.3;
            } else {
                this.midPoint = 0;
            }
            if ( this.settings.yAxis.secondaryYAxis) {
                this.renderSecondaryYAxis(options);
            }
        }

        /**
         * Function to render line chart
         * @function
         * @param {IVisualViewModel} viewLineModel - contains all the data that required to render lines for each category
         *
         */
        // tslint:disable-next-line:cyclomatic-complexity
        public renderLines(viewLineModel: IVisualViewModel[], options: VisualUpdateOptions): void {
            const dataView: DataView = this.dataViews;
            let blankCount: number = 0;
            for (let index: number = 0; index < viewLineModel.length; index++) {
                blankCount = 0;
                let tempData: IVisualDataPoint[];
                tempData = [];
                const dataPointLength: number = viewLineModel[index].dataPoints.length;
                for ( let iterator: number = 0; iterator < dataPointLength; iterator++ ) {
                    if (viewLineModel[index].dataPoints[iterator].actualDates !== null && !categoryFlag &&
                        isSecondary && viewLineModel[index].dataPoints[iterator].yvalue !== null &&
                        viewLineModel[index].dataPoints[iterator].yvalue >=
                        this.ySecStart && viewLineModel[index].dataPoints[iterator].yvalue <= this.ySecEnd) {
                        tempData.push({
                            actualDates: viewLineModel[index].dataPoints[iterator].actualDates,
                            dates: viewLineModel[index].dataPoints[iterator].dates,
                            yvalue: <number>viewLineModel[index].dataPoints[iterator].yvalue,
                            identity: viewLineModel[index].identity,
                            selected: viewLineModel[index].selected
                        });
                    } else if (viewLineModel[index].dataPoints[iterator].actualDates !== null && !categoryFlag &&
                        !isSecondary && viewLineModel[index].dataPoints[iterator].yvalue !== null &&
                        viewLineModel[index].dataPoints[iterator].yvalue >=
                        this.yAxisStart && viewLineModel[index].dataPoints[iterator].yvalue <= this.yAxisEnd) {
                       tempData.push({
                           actualDates: viewLineModel[index].dataPoints[iterator].actualDates,
                           dates: viewLineModel[index].dataPoints[iterator].dates,
                           yvalue: <number>viewLineModel[index].dataPoints[iterator].yvalue,
                           identity: viewLineModel[index].identity,
                           selected: viewLineModel[index].selected
                       });
                   } else if (categoryFlag && isSecondary && viewLineModel[index].dataPoints[iterator].yvalue !== null &&
                    viewLineModel[index].dataPoints[iterator].yvalue >=
                    this.ySecStart && viewLineModel[index].dataPoints[iterator].yvalue <= this.ySecEnd) {
                        tempData.push({
                            actualDates: viewLineModel[index].dataPoints[iterator].actualDates,
                            dates: viewLineModel[index].dataPoints[iterator].dates,
                            yvalue: <number>viewLineModel[index].dataPoints[iterator].yvalue,
                            identity: viewLineModel[index].identity,
                            selected: viewLineModel[index].selected
                        });
                    } else if (categoryFlag && !isSecondary && viewLineModel[index].dataPoints[iterator].yvalue !== null &&
                        viewLineModel[index].dataPoints[iterator].yvalue >=
                        this.yAxisStart && viewLineModel[index].dataPoints[iterator].yvalue <= this.yAxisEnd) {
                            tempData.push({
                                actualDates: viewLineModel[index].dataPoints[iterator].actualDates,
                                dates: viewLineModel[index].dataPoints[iterator].dates,
                                yvalue: <number>viewLineModel[index].dataPoints[iterator].yvalue,
                                identity: viewLineModel[index].identity,
                                selected: viewLineModel[index].selected
                            });
                    } else {
                        blankCount++;
                    }
                }
                if ( (!categoryFlag && (dataPointLength - blankCount) !== 1) || (categoryFlag && dataPointLength !== 1) ) {
                    this.line[index] = this.chart.append('path').classed(`line${index}`, true).attr('id', `line-${index}`)
                    .attr('class', 'lineClass');
                    this.line[index].attr({
                        // tslint:disable-next-line:prefer-template
                        d: 'M' + tempData.map((d: IVisualDataPoint) => {
                            if ( renderBarFlag && ComboChartWithMilestones.thisObj.settings.yAxis.secondaryYAxis ) {
                                if (categoryFlag) {
                                    return ComboChartWithMilestones.thisObj.xScale(d.dates) + ','
                                        + ComboChartWithMilestones.thisObj.ySecScale(<number>d.yvalue);
                                } else {
                                    return ComboChartWithMilestones.thisObj.xScale2(d.actualDates) + ',' +
                                     ComboChartWithMilestones.thisObj.ySecScale(<number>d.yvalue);
                                }
                            } else {
                                if (categoryFlag) {
                                    return ComboChartWithMilestones.thisObj.xScale(d.dates) + ','
                                        + ComboChartWithMilestones.thisObj.yScale(<number>d.yvalue);
                                } else {
                                    return ComboChartWithMilestones.thisObj.xScale2(d.actualDates) + ',' +
                                     ComboChartWithMilestones.thisObj.yScale(<number>d.yvalue);
                                }
                            }
                        }),
                        fill: 'none',
                        stroke: colors[this.viewBarModel.length + index].color,
                        'stroke-width': this.settings.shapes.lineWidth,
                        'stroke-linejoin' : this.settings.shapes.joinType
                    });
                    if (this.settings.shapes.lineStyle === 'dotted') {
                        d3.selectAll('.lineClass').style('stroke-linecap', 'round')
                            .style('stroke-dasharray', `1 ${this.settings.shapes.lineWidth + 4}`);
                    } else if (this.settings.shapes.lineStyle === 'dashed') {
                        d3.selectAll('.lineClass').style('stroke-dasharray', '10 5');
                    }
                } else if ( categoryFlag ) {
                    this.line[index] = this.chart.append('circle').classed(`line${index}`, true).attr('class', 'lineClass')
                        .attr('id', `line-${index}`);
                    this.line[index].attr('r', 2 + this.settings.shapes.lineWidth)
                    .style('fill', colors[this.viewBarModel.length + index].color)
                        .attr('transform', `translate(${this.xScale( tempData[0].dates)}, ${this.yScale(tempData[0].yvalue)})`);
                } else {
                    this.line[index] = this.chart.append('circle').classed(`line${index}`, true)
                        .attr('class', 'lineClass').attr('id', `line-${index}`);
                    this.line[index].attr('r', 2 + this.settings.shapes.lineWidth)
                    .style('fill', colors[this.viewBarModel.length + index].color)
                        .attr('transform', `translate(${this.xScale2( tempData[0].actualDates)}, ${this.yScale(tempData[0].yvalue)})`);
                }
            }
            // if data labels are turned 'on' and user resizes the visual, hide data labels
            if ( this.settings.dataLabels.show && options.type !== resizeValue) {
                for ( let index: number = 0; index < viewLineModel.length; index++ ) {
                    this.chart.selectAll(`.dataLabelsText${index}`).data(viewLineModel[index].dataPoints).enter().append('text')
                    .attr('class', `dataLabelsText${index}`).classed('dataLabels', true);
                    d3.selectAll(`.dataLabelsText${index}`).attr('transform', function(d: IVisualDataPoint): string {
                            let dataProp: TextProperties;
                            dataProp = {
                                text: d.yvalue.toString(),
                                fontFamily: ComboChartWithMilestones.thisObj.settings.dataLabels.fontFamily,
                                fontSize: `${ComboChartWithMilestones.thisObj.settings.dataLabels.fontSize}px`
                            };
                            const dataLabelWidth: number = textMeasurementService.measureSvgTextWidth(dataProp);
                            const dataLabelHeight: number = textMeasurementService.measureSvgTextHeight(dataProp);
                            if ( categoryFlag ) {
                                return `translate(${ComboChartWithMilestones.thisObj.xScale(d.dates) - dataLabelWidth / 2},
                                ${ComboChartWithMilestones.thisObj.yScale(d.yvalue)})`;
                            } else {
                                return `translate(${ComboChartWithMilestones.thisObj.xScale2(d.actualDates) - dataLabelWidth / 2},
                                 ${ComboChartWithMilestones.thisObj.yScale(d.yvalue)})`;
                            }
                        }).text(function(d: IVisualDataPoint): string {
                            return `${ComboChartWithMilestones.thisObj.dataFormatter.format(d.yvalue)}`;
                        }).style('font-size', `${this.settings.dataLabels.fontSize}px`)
                        .style('font-family', this.settings.dataLabels.fontFamily)
                        .style('fill', this.settings.dataLabels.color)
                        .append('title').text(function(d: IVisualDataPoint): string {
                            return `${d.yvalue}`;
                        });
                    }
            }
            // tslint:disable-next-line:typedef
            const bisectDate = d3.bisector(function (d: IVisualDataPoint): Date { return d.actualDates; }).left;
            if ( !renderBarFlag ) {
                const mouseG: d3.Selection<SVGElement> = ComboChartWithMilestones.thisObj.mouseG
                                                       = ComboChartWithMilestones.thisObj.chart.append('g')
                    .attr('class', 'mouseOver');
                mouseG.append('path').attr('class', 'mouseLine').classed('opacityOff', true);
                const mileStone: d3.Selection<IVisualViewModel> = mouseG.selectAll('.mileStoneLine')
                    .data(viewLineModel).enter().append('g').attr('class', 'mileStoneLine');
                const circle: d3.Selection<IVisualViewModel> = mileStone.append('circle').attr('id', 'circle')
                    .attr('r', 2 + this.settings.shapes.lineWidth).style('fill', function (d: IVisualViewModel, index: number): string {
                        return colors[index].color;
                    })
                    .attr('class', function (d: IVisualViewModel, index: number): string {
                        return `circle-${index}`;
                    });
                d3.selectAll('#circle').classed('opacityOff', true);
                // tslint:disable-next-line:typedef prefer-const
                let rectWidth: number;
                if (categoryFlag) {
                    rectWidth = width < this.mainChartWidth ? this.mainChartWidth :
                     width - yHeight - ySecHeight - yAxisWidth - ySecAxisWidth - 5;
                } else {
                    rectWidth = width - yHeight - yAxisWidth - ySecAxisWidth - ySecHeight;
                }
                d3.selectAll('rect.clearCatcher').style('height', `${height - xAxisLabelsHeight - xAxisTitleHeight -
                    this.settingsAxis.axis.x.padding}px`)
                    .style('width', `${rectWidth}px`);
                d3.selectAll('rect.clearCatcher, g.mouseOver, .lineClass').on('mouseout', function (): void {
                        d3.selectAll('.mouseLine, .mileStone, #circle').classed('opacityOn', false).classed('opacityOff', true);
                    }).on('mouseover', function (): void {
                        d3.selectAll('.mouseLine, .mileStone, #circle').classed('opacityOn', true).classed('opacityOff', false);
                    }).on('mousemove', function (): void {
                        const mouse: [number, number] = d3.mouse(this);
                        tooltipDataItem = [];
                        // tslint:disable-next-line:no-any
                        let exact: any;
                        let pointerPosition: number;
                        d3.select('.mouseLine').attr('d', function (): string {
                            let d: string;
                            pointerPosition = 0;
                            if (categoryFlag) {
                                for (let index: number = 0; index < viewLineModel[0].dataPoints.length - 1; index++) {
                                const x1: number = ComboChartWithMilestones.thisObj.xScale(viewLineModel[0].dataPoints[index].dates);
                                const x2: number = ComboChartWithMilestones.thisObj.xScale(viewLineModel[0].dataPoints[index + 1].dates);
                                if (mouse[0] - x1 > 0 && mouse[0] - x2 < 0) {
                                    if (Math.abs(mouse[0] - x1) > Math.abs(mouse[0] - x2)) {
                                        pointerPosition = index + 1;
                                        break;
                                    } else {
                                        pointerPosition = index;
                                        break;
                                        }
                                    } else if (mouse[0] < x1 ) {
                                        pointerPosition = index;
                                        break;
                                        } else if ( index === viewLineModel[0].dataPoints.length - 2) {
                                        pointerPosition = index + 1;
                                        break;
                                    }
                                }
                                exact = viewLineModel[0].dataPoints[pointerPosition].dates;
                                d = `M${ComboChartWithMilestones.thisObj.xScale(exact)},${height - xAxisTitleHeight - xAxisLabelsHeight -
                                     ComboChartWithMilestones.thisObj.settingsAxis.axis.x.padding}
                                     ${ComboChartWithMilestones.thisObj.xScale(exact)},
                                     ${ComboChartWithMilestones.thisObj.yScale(ComboChartWithMilestones.thisObj.yAxisEnd)}`;
                            } else {
                                // tslint:disable-next-line:no-any
                                let mouseDate: any;
                                mouseDate = ComboChartWithMilestones.thisObj.xScale2.invert(mouse[0]);
                                let k: number;
                                k = bisectDate(viewLineModel[0].dataPoints, mouseDate);
                                // tslint:disable-next-line:no-any
                                let beg: any;
                                beg = k === 0 ? viewLineModel[0].dataPoints[k].actualDates : viewLineModel[0].dataPoints[k - 1].actualDates;
                                // tslint:disable-next-line:no-any
                                let next: any;
                                next = k === viewLineModel[0].dataPoints.length ? beg : viewLineModel[0].dataPoints[k].actualDates;
                                exact = mouseDate - beg > next - mouseDate ? next : beg;
                                pointerPosition = mouseDate - beg > next - mouseDate ? k : k === 0 ? k : k - 1;
                                d = `M${ComboChartWithMilestones.thisObj.xScale2(exact)},${height - xAxisTitleHeight - xAxisLabelsHeight -
                                    ComboChartWithMilestones.thisObj.settingsAxis.axis.x.padding}
                                     ${ComboChartWithMilestones.thisObj.xScale2(exact)},
                                     ${ComboChartWithMilestones.thisObj.yScale(ComboChartWithMilestones.thisObj.yAxisEnd)}`;
                            }

                            return d;
                        });
                        d3.selectAll('.mileStoneLine')
                            .attr('transform', function (d: IVisualViewModel, iterator: number): string {
                                d3.selectAll(`.circle-${iterator}`).classed('opacityOn', false).classed('opacityOff', true);
                                let pathString: string;
                                let yPoint: number;
                                if (categoryFlag) {
                                    yPoint = <number>viewLineModel[iterator].dataPoints[pointerPosition].yvalue;
                                    if ( viewLineModel[iterator].dataPoints[pointerPosition].yvalue !== null ) {
                                        d3.selectAll(`.circle-${iterator}`).classed('opacityOn', true).classed('opacityOff', false);
                                    }
                                    pathString = `translate(${ComboChartWithMilestones.thisObj.xScale(exact)},
                                                  ${ComboChartWithMilestones.thisObj.yScale(yPoint)})`;
                                } else {
                                    // tslint:disable-next-line:no-any
                                    let mouseDate: any;
                                    mouseDate = ComboChartWithMilestones.thisObj.xScale2.invert(mouse[0]);
                                    let k: number;
                                    k = bisectDate(viewLineModel[0].dataPoints, mouseDate);
                                    // tslint:disable-next-line:no-any
                                    let beg: any;
                                    beg = k === 0 ? viewLineModel[0].dataPoints[k].actualDates :
                                     viewLineModel[0].dataPoints[k - 1].actualDates;
                                    // tslint:disable-next-line:no-any
                                    let next: any;
                                    next = k === viewLineModel[0].dataPoints.length ? beg : viewLineModel[0].dataPoints[k].actualDates;
                                    exact = mouseDate - beg > next - mouseDate ? next : beg;
                                    yPoint = mouseDate - beg > next - mouseDate ? k >= d.dataPoints.length ?
                                        <number>d.dataPoints[d.dataPoints.length - 1].yvalue : <number>d.dataPoints[k].yvalue : k === 0 ?
                                            <number>d.dataPoints[k].yvalue : <number>d.dataPoints[k - 1].yvalue;
                                    if ( yPoint !== null ) {
                                        d3.selectAll(`.circle-${iterator}`).classed('opacityOn', true).classed('opacityOff', false);
                                    }

                                    pathString = `translate(${ComboChartWithMilestones.thisObj.xScale2(exact)},
                                                    ${ComboChartWithMilestones.thisObj.yScale(yPoint)})`;
                                }
                                const keyName: string = viewLineModel[iterator].keyName;
                                if (iterator === 0 && yPoint !== null) {
                                    tooltipDataItem = [];
                                    tooltipDataItem.push({
                                        header: ComboChartWithMilestones.thisObj.formatter.format(exact),
                                        color: colors[iterator].color,
                                        displayName: keyName,
                                        value: ComboChartWithMilestones.thisObj.yTextFormatter.format(yPoint)
                                    });
                                } else if (yPoint !== null) {
                                    tooltipDataItem.push({
                                        color: colors[iterator].color,
                                        displayName: keyName,
                                        value: ComboChartWithMilestones.thisObj.yTextFormatter.format(yPoint)
                                    });
                                }

                                return pathString;
                            });
                        if ( tooltipFlag ) {
                            for ( let iterator: number = 0; iterator < ComboChartWithMilestones.thisObj.tooltipModel.length; iterator++ ) {
                                if ( pointerPosition < ComboChartWithMilestones.thisObj.tooltipModel[iterator].dataPoints.length ) {
                                    const tempYValue: number = <number>ComboChartWithMilestones.thisObj.tooltipModel[iterator]
                                        .dataPoints[pointerPosition].yvalue;
                                    if ( tempYValue !== null && tempYValue.toString() !== '') {
                                        tooltipDataItem.push({
                                            color: '#333',
                                            displayName: ComboChartWithMilestones.thisObj.tooltipModel[iterator].keyName,
                                            value: ComboChartWithMilestones.thisObj.yTextFormatter.format(tempYValue)
                                        });
                                    }
                                }
                            }
                        }
                    });
                // Plot tooltip if (both lines and bars) or only bars are drawn
                if ((renderLineFlag && renderBarFlag) || renderBarFlag) {
                    ComboChartWithMilestones.thisObj.tooltipServiceWrapper.addTooltip(
                                d3.selectAll('.lineClass, g.mouseOver'),
                                (tooltipEvent: TooltipEventArgs<number>) => tooltipDataItem,
                                (tooltipEvent: TooltipEventArgs<number>) => null, true);
                } else {
                    // Plot tooltip if only lines  are drawn
                    ComboChartWithMilestones.thisObj.tooltipServiceWrapper.addTooltip(
                                d3.selectAll('rect.clearCatcher, .lineClass, g.mouseOver'),
                                (tooltipEvent: TooltipEventArgs<number>) => tooltipDataItem,
                                (tooltipEvent: TooltipEventArgs<number>) => null, true);
                }
            } else {
                for ( let index: number = 0; index < viewLineModel.length; index++ ) {
                    d3.selectAll(`#line-${index}`).data(viewLineModel[index].dataPoints);
                    d3.selectAll(`#line-${index}`).on('mousemove', function(): void {
                        const mouse: [number, number] = d3.mouse(this);
                        tooltipDataItem = [];
                        // tslint:disable-next-line:no-any
                        let exact: any;
                        let pointerPosition: number;
                        pointerPosition = 0;
                        if (categoryFlag) {
                            for (let iterator: number = 0; iterator < viewLineModel[0].dataPoints.length - 1; iterator++) {
                            const x1: number = ComboChartWithMilestones.thisObj.xScale(viewLineModel[0].dataPoints[iterator].dates);
                            const x2: number = ComboChartWithMilestones.thisObj.xScale(viewLineModel[0].dataPoints[iterator + 1].dates);
                            if (mouse[0] - x1 > 0 && mouse[0] - x2 < 0) {
                                if (Math.abs(mouse[0] - x1) > Math.abs(mouse[0] - x2)) {
                                    pointerPosition = iterator + 1;
                                    break;
                                } else {
                                    pointerPosition = iterator;
                                    break;
                                    }
                                } else if (mouse[0] < x1 ) {
                                    pointerPosition = iterator;
                                    break;
                                } else if ( index === viewLineModel[0].dataPoints.length - 2) {
                                    pointerPosition = iterator + 1;
                                    break;
                                }
                            }
                            exact = viewLineModel[0].dataPoints[pointerPosition].dates;
                        } else {
                            // tslint:disable-next-line:no-any
                            let mouseDate: any;
                            mouseDate = ComboChartWithMilestones.thisObj.xScale2.invert(mouse[0]);
                            let k: number;
                            k = bisectDate(viewLineModel[0].dataPoints, mouseDate);
                            // tslint:disable-next-line:no-any
                            let beg: any;
                            beg = k === 0 ? viewLineModel[0].dataPoints[k].actualDates : viewLineModel[0].dataPoints[k - 1].actualDates;
                            // tslint:disable-next-line:no-any
                            let next: any;
                            next = k === viewLineModel[0].dataPoints.length ? beg : viewLineModel[0].dataPoints[k].actualDates;
                            exact = mouseDate - beg > next - mouseDate ? next : beg;
                            pointerPosition = mouseDate - beg > next - mouseDate ? k : k === 0 ? k : k - 1;
                        }
                        const keyName: string = viewLineModel[index].keyName;
                        tooltipDataItem.push({
                            header: ComboChartWithMilestones.thisObj.formatter.format(exact),
                            color: colors[ComboChartWithMilestones.thisObj.viewBarModel.length + index].color,
                            displayName: keyName,
                            value: ComboChartWithMilestones.thisObj.yTextFormatter
                                    .format(viewLineModel[index].dataPoints[pointerPosition].yvalue)
                        });
                        if ( tooltipFlag ) {
                            for ( let iterator: number = 0; iterator < ComboChartWithMilestones.thisObj.tooltipModel.length; iterator++ ) {
                                if ( pointerPosition < ComboChartWithMilestones.thisObj.tooltipModel[iterator].dataPoints.length ) {
                                    const tempYValue: number = <number>ComboChartWithMilestones.thisObj.tooltipModel[iterator]
                                        .dataPoints[pointerPosition].yvalue;
                                    if ( tempYValue !== null && tempYValue.toString() !== '') {
                                        tooltipDataItem.push({
                                            color: '#333',
                                            displayName: ComboChartWithMilestones.thisObj.tooltipModel[iterator].keyName,
                                            value: ComboChartWithMilestones.thisObj.yTextFormatter.format(tempYValue)
                                        });
                                    }
                                }
                            }
                        }
                    });
                    ComboChartWithMilestones.thisObj.tooltipServiceWrapper
                    .addTooltip(d3.selectAll(`#line-${index}`), (tooltipEvent: TooltipEventArgs<number>) => tooltipDataItem,
                                (tooltipEvent: TooltipEventArgs<number>) => null, true);
                }
            }
        }
        /**
         * Function to render bar chart
         * @function
         * @param {IVisualViewModel} viewBarModel - contains all the data that required to render bar chart
         *
         */
        public renderbars(viewBarModel: IVisualViewModel[], options : VisualUpdateOptions): void {
            let barPadding: number = 3;
            const dataView: DataView = this.dataViews;
            const barWidth: number = (actualWidth - this.halfBarWidth) / dataLength;
            let barTooltipData: VisualTooltipDataItem[];
            let minBarWidth: number = 100;
            if ( !categoryFlag ) {
                let tempBarWidth: number;
                for ( let step: number = 0; step < viewBarModel.length; step++ ) {
                    const barDataLength: number = viewBarModel[step].dataPoints.length;
                    for ( let iterator: number = 0; iterator < barDataLength; iterator++ ) {
                        if ( iterator < barDataLength - 1 && viewBarModel[step].dataPoints[iterator].actualDates !== null) {
                            tempBarWidth = ComboChartWithMilestones.thisObj
                                           .xScale2(viewBarModel[step].dataPoints[iterator + 1].actualDates) -
                                ComboChartWithMilestones.thisObj.xScale2(viewBarModel[step].dataPoints[iterator].actualDates);
                            minBarWidth = iterator === 0 && step === 0 ? tempBarWidth : minBarWidth;
                            if ( tempBarWidth <  minBarWidth) {
                                minBarWidth = tempBarWidth;
                            }
                        }
                    }
                }
                if ( minBarWidth < 1 ) {
                    minBarWidth = 1;
                } else if ( minBarWidth > this.maxBarWidth) {
                    minBarWidth = this.maxBarWidth;
                }
            } else {
                minBarWidth = this.settings.xAxis.minimumCategoryWidth;
                barPadding = minBarWidth * (this.settings.xAxis.innerPadding / 200);
            }
            for ( let index: number = 0; index < viewBarModel.length; index++ ) {
                const barDiv: d3.Selection<SVGElement> = this.chart.append('g').attr('class', 'bar');
                const bars: d3.selection.Update<IVisualDataPoint> = barDiv.selectAll(`.barDiv-${index}`)
                    .classed('bar', true).data(viewBarModel[index].dataPoints);
                bars.enter().append('rect').classed(`barDiv-${index}`, true);
                if ( categoryFlag ) {
                    bars.attr({
                        // tslint:disable-next-line:cyclomatic-complexity
                        height: function(d: IVisualDataPoint, iterator: number): string {
                            let yPoint: number = 0 ;
                            let yEndPoint: number = 0;
                            for ( let step: number = 0; step < index; step++ ) {
                                if ( viewBarModel[step].dataPoints[iterator].actualDates === d.actualDates ) {
                                    if ( d.yvalue > 0 && <number>viewBarModel[step].dataPoints[iterator].yvalue > 0) {
                                        yPoint = yPoint + <number>viewBarModel[step].dataPoints[iterator].yvalue;
                                    } else if ( d.yvalue < 0 && <number>viewBarModel[step].dataPoints[iterator].yvalue < 0 ) {
                                        yPoint = yPoint + <number>viewBarModel[step].dataPoints[iterator].yvalue;
                                    }
                                }
                            }
                            if ( ComboChartWithMilestones.thisObj.settings.yAxis.endValue ) {
                                yEndPoint = yPoint + <number>d.yvalue > ComboChartWithMilestones.thisObj.settings.yAxis.endValue ?
                            ComboChartWithMilestones.thisObj.settings.yAxis.endValue : yPoint + <number>d.yvalue;
                                if ( d.yvalue < 0 && yPoint > ComboChartWithMilestones.thisObj.settings.yAxis.endValue) {
                                    yPoint = ComboChartWithMilestones.thisObj.settings.yAxis.endValue;
                                }
                            } else {
                                yEndPoint = yPoint + <number>d.yvalue ;
                            }
                            if ( ComboChartWithMilestones.thisObj.settings.yAxis.startValue !== null ) {
                                yPoint = yPoint < ComboChartWithMilestones.thisObj.settings.yAxis.startValue ?
                                         ComboChartWithMilestones.thisObj.settings.yAxis.startValue : yPoint;
                                if ( d.yvalue < 0 ) {
                                    yEndPoint =
                                            (yPoint - ComboChartWithMilestones.thisObj.settings.yAxis.startValue) < (yPoint - yEndPoint) ?
                                             ComboChartWithMilestones.thisObj.settings.yAxis.startValue : yEndPoint;
                                }
                            }
                            if ( d.yvalue < 0 && yPoint < yEndPoint ) {
                                yPoint = yEndPoint;
                            }
                            if ( d.yvalue > 0 && ComboChartWithMilestones.thisObj.settings.yAxis.endValue < 0) {
                                yPoint = 0;
                                yEndPoint = 0;
                            }
                            if ( d.yvalue > 0 && yEndPoint < ComboChartWithMilestones.thisObj.settings.yAxis.startValue ) {
                                yEndPoint = yPoint;
                            }
                            if ( ComboChartWithMilestones.thisObj.settings.yAxis.endValue ) {
                                yPoint = yPoint > ComboChartWithMilestones.thisObj.settings.yAxis.endValue ?
                                ComboChartWithMilestones.thisObj.settings.yAxis.endValue : yPoint;
                            }
                            let barHeight: number = 0;
                            barHeight = ComboChartWithMilestones.thisObj.yScale(yPoint) -
                             ComboChartWithMilestones.thisObj.yScale(yEndPoint);

                            return `${Math.abs(barHeight)}px`;
                        },
                        width: minBarWidth - (2 * barPadding),
                        y: function(d: IVisualDataPoint, iterator: number): number {
                            let yPoint: number = 0;
                            for ( let step: number = 0; step < index; step++ ) {
                                if ( viewBarModel[step].dataPoints[iterator].actualDates === d.actualDates ) {
                                    if ( d.yvalue > 0 && <number>viewBarModel[step].dataPoints[iterator].yvalue > 0) {
                                        yPoint = yPoint + <number>viewBarModel[step].dataPoints[iterator].yvalue;
                                    } else if ( d.yvalue < 0 &&  <number>viewBarModel[step].dataPoints[iterator].yvalue < 0 ) {
                                        yPoint = yPoint + <number>viewBarModel[step].dataPoints[iterator].yvalue;
                                    }
                                }
                            }
                            if ( d.yvalue > 0) {
                                yPoint = yPoint + <number>d.yvalue;
                            }
                            if ( ComboChartWithMilestones.thisObj.settings.yAxis.endValue ) {
                                yPoint = yPoint > ComboChartWithMilestones.thisObj.settings.yAxis.endValue ?
                                    ComboChartWithMilestones.thisObj.settings.yAxis.endValue : yPoint;
                            }
                            yPoint = ComboChartWithMilestones.thisObj.yScale(yPoint);

                            return yPoint;
                        },
                        x: function(d: IVisualDataPoint): number {
                            const xPoint: number = ComboChartWithMilestones.thisObj.xScale(d.dates) - (minBarWidth / 2 ) + barPadding;

                            return xPoint;
                        }
                    }).style({
                        fill: colors[index].color
                    }).attr('class', function(d: IVisualDataPoint, iterator: number): string {
                        return `bar-${iterator}`;
                    }).classed('rectangle', true).classed(`barDiv-${index}`, true);
                } else {
                    barPadding = minBarWidth * 0.05;
                    bars.attr({
                        height: function(d: IVisualDataPoint, iterator: number): string {
                            let yPoint: number = 0 ;
                            let yEndPoint: number = 0;
                            for ( let step: number = 0; step < index; step++ ) {
                                yPoint = yPoint + <number>viewBarModel[step].dataPoints[iterator].yvalue;
                            }
                            if ( ComboChartWithMilestones.thisObj.settings.yAxis.endValue ) {
                                yEndPoint = yPoint + <number>d.yvalue > ComboChartWithMilestones.thisObj.settings.yAxis.endValue ?
                            ComboChartWithMilestones.thisObj.settings.yAxis.endValue : yPoint + <number>d.yvalue;
                            } else {
                                yEndPoint = yPoint + <number>d.yvalue ;
                            }
                            if ( ComboChartWithMilestones.thisObj.settings.yAxis.startValue ) {
                                yPoint = yPoint < ComboChartWithMilestones.thisObj.settings.yAxis.startValue ?
                                 ComboChartWithMilestones.thisObj.settings.yAxis.startValue : yPoint;
                            }
                            if ( ComboChartWithMilestones.thisObj.settings.yAxis.endValue ) {
                                yPoint = yPoint > ComboChartWithMilestones.thisObj.settings.yAxis.endValue ?
                                ComboChartWithMilestones.thisObj.settings.yAxis.endValue : yPoint;
                            }
                            let barHeight: number = 0;
                            barHeight = ComboChartWithMilestones.thisObj.yScale(yPoint) -
                             ComboChartWithMilestones.thisObj.yScale(yEndPoint);

                            return `${Math.abs(barHeight)}px`;
                        },
                        width: minBarWidth - (2 * barPadding),
                        y: function(d: IVisualDataPoint, iterator: number): number {
                            let yPoint: number = 0;
                            if ( index === 0 && <number>viewBarModel[index].dataPoints[iterator].yvalue < 0) {
                                yPoint = 0;
                            } else if ( <number>viewBarModel[index].dataPoints[iterator].yvalue < 0 ) {
                                for ( let step: number = 0; step <= index - 1; step++ ) {
                                    yPoint = yPoint + <number>viewBarModel[step].dataPoints[iterator].yvalue;
                                }
                            } else {
                                for ( let step: number = 0; step <= index; step++ ) {
                                    yPoint = yPoint + <number>viewBarModel[step].dataPoints[iterator].yvalue;
                                }
                            }
                            if ( ComboChartWithMilestones.thisObj.settings.yAxis.endValue ) {
                                yPoint = yPoint > ComboChartWithMilestones.thisObj.settings.yAxis.endValue ?
                                    ComboChartWithMilestones.thisObj.settings.yAxis.endValue : yPoint;
                            }
                            yPoint = ComboChartWithMilestones.thisObj.yScale(yPoint);

                            return yPoint;
                        },
                        x: function(d: IVisualDataPoint): number {
                            let xPoint: number;
                            if ( d.actualDates !== null) {
                                xPoint = ComboChartWithMilestones.thisObj.xScale2(d.actualDates) - (minBarWidth / 2) + barPadding;
                            } else {
                                xPoint = -1000;
                            }

                            return xPoint;
                        }
                    }).style({
                        fill: colors[index].color
                    }).attr('class', function(d: IVisualDataPoint, iterator: number): string {
                        return `bar-${iterator}`;
                    }).classed('rectangle', true).classed(`barDiv-${index}`, true);
                }
                // if data labels are turned 'on' and user resizes the visual, hide data labels
                if ( this.settings.dataLabels.show && renderBarFlag && options.type !== resizeValue) {
                    this.chart.selectAll(`.dataLabelsBar${index}`).data(viewBarModel[index].dataPoints).enter().append('text')
                    .attr('class', `dataLabelsBar${index}`).classed('dataLabels', true);
                    d3.selectAll(`.dataLabelsBar${index}`).attr('transform', function(d: IVisualDataPoint , iterator: number): string {
                        let yPoint: number = 0;
                        for ( let step: number = 0; step < index; step++ ) {
                            yPoint = yPoint + <number>viewBarModel[step].dataPoints[iterator].yvalue;
                        }
                        if ( ComboChartWithMilestones.thisObj.settings.yAxis.endValue ) {
                            yPoint = yPoint > ComboChartWithMilestones.thisObj.settings.yAxis.endValue ?
                                ComboChartWithMilestones.thisObj.settings.yAxis.endValue : yPoint;
                        }
                        let dataProp: TextProperties;
                        dataProp = {
                            text: d.yvalue.toString(),
                            fontFamily: ComboChartWithMilestones.thisObj.settings.dataLabels.fontFamily,
                            fontSize: `${ComboChartWithMilestones.thisObj.settings.dataLabels.fontSize}px`
                        };
                        const dataLabelWidth: number = textMeasurementService.measureSvgTextWidth(dataProp);
                        const dataLabelHeight: number = textMeasurementService.measureSvgTextHeight(dataProp);
                        if ( categoryFlag ) {
                            return `translate(${ComboChartWithMilestones.thisObj.xScale(d.dates) - dataLabelWidth / 2},
                            ${ComboChartWithMilestones.thisObj.yScale((yPoint + <number>d.yvalue / 2)) + (dataLabelHeight / 2)})`;
                        } else {
                            return `translate(${ComboChartWithMilestones.thisObj.xScale2(d.actualDates) - dataLabelWidth / 2},
                             ${ComboChartWithMilestones.thisObj.yScale((yPoint + <number>d.yvalue / 2)) + (dataLabelHeight / 2)})`;
                        }
                    }).text(function(d: IVisualDataPoint): string {
                        return `${ComboChartWithMilestones.thisObj.dataFormatter.format(d.yvalue)}`;
                    }).style('font-size', `${this.settings.dataLabels.fontSize}px`)
                    .style('font-family', this.settings.dataLabels.fontFamily)
                    .style('fill', this.settings.dataLabels.color)
                    .append('title').text(function(d: IVisualDataPoint): string {
                        return `${d.yvalue}`;
                    });
                }
                d3.selectAll(`.barDiv-${index}`).on('mousemove' , function(d: IVisualDataPoint, step: number): void {
                    barTooltipData = [];
                    barTooltipData.push({
                        displayName: xTitleName,
                        value: ComboChartWithMilestones.thisObj.formatter.format(d.actualDates)
                    });
                    barTooltipData.push({
                        displayName: viewBarModel[index].keyName,
                        value: ComboChartWithMilestones.thisObj.yTextFormatter.format(d.yvalue)
                    });
                    if ( tooltipFlag ) {
                        const tooltipModelLength: number = ComboChartWithMilestones.thisObj.tooltipModel.length;
                        for ( let iterator: number = 0; iterator < tooltipModelLength; iterator++ ) {
                            if ( index < ComboChartWithMilestones.thisObj.tooltipModel[iterator].dataPoints.length ) {
                                const tempYValue: number = <number>ComboChartWithMilestones.thisObj.tooltipModel[iterator]
                                        .dataPoints[index].yvalue;
                                if ( tempYValue !== null && tempYValue.toString() !== '') {
                                    barTooltipData.push({
                                        displayName: ComboChartWithMilestones.thisObj.tooltipModel[iterator].keyName,
                                        value: ComboChartWithMilestones.thisObj.yTextFormatter.format(
                                            ComboChartWithMilestones.thisObj.tooltipModel[iterator].dataPoints[index].yvalue)
                                    });
                                }
                            }
                        }
                    }
                });
                ComboChartWithMilestones.thisObj.tooltipServiceWrapper
                            .addTooltip(d3.selectAll(`.barDiv-${index}`),
                                        (tooltipEvent: TooltipEventArgs<number>) => barTooltipData,
                                        (tooltipEvent: TooltipEventArgs<number>) => null, true);
            }
        }

        /**
         * Function to render today line
         * @function
         * @param {IVisualViewModel} viewModel - contains all the data
         *
         */
        public renderTodayLine(viewModel: IVisualViewModel[]): void {
            const today: Date = new Date();
            let todayTextProp: TextProperties;
            let todayTextWidth: number;
            let todayTextHeight: number;
            let todayFlag: boolean = true;
            const strokeConst: number = 4;
            todayTextProp  = {
                text: 'Today',
                fontFamily: this.settings.mileStone.fontFamily,
                fontSize: `${this.settings.todayLine.fontSize}px`
            };
            todayTextWidth = textMeasurementService.measureSvgTextWidth(todayTextProp);
            todayTextHeight = textMeasurementService.measureSvgTextHeight(todayTextProp);
            if ( categoryFlag ) {
                // tslint:disable-next-line:no-any
                let initialDate: any = null;
                let initialValue: string = null;
                // tslint:disable-next-line:no-any
                let prevDate: any = null;
                let prevValue: string = null;
                const lengthData: number = viewModel[0].dataPoints.length;
                if ( viewModel[0].dataPoints[0].actualDates > today || viewModel[0].dataPoints[lengthData - 1].actualDates < today) {
                    todayFlag = false;
                }
                for ( let index: number = 0; index <  lengthData; index++) {
                    initialDate = viewModel[0].dataPoints[index].actualDates;
                    initialValue = viewModel[0].dataPoints[index].dates;
                    if ( initialDate >= today && index !== 0) {
                        prevDate = viewModel[0].dataPoints[index - 1].actualDates;
                        prevValue = viewModel[0].dataPoints[index - 1].dates;
                        break;
                    }
                }
                this.xScale2 = d3.time.scale()
                    .domain([prevDate, initialDate])
                    .range([this.xScale(prevValue), this.xScale(initialValue)]);
            }
            const todayValue: number = this.xScale2(today);
            if (todayFlag && todayValue && todayValue < actualWidth && todayValue > 0) {
                todayLineFlag = true;
                const todayLine: d3.Selection<SVGElement> = this.todayLine = this.chart.append('g').attr('class', 'todayLine');
                if ( todayPosition === 'below' ) {
                    todayLine.append('path').attr('class', `mileLineToday`).attr('id', 'mileStoneId')
                        .attr('d', `M${this.xScale2(today)},
                         ${height - xAxisTitleHeight - ComboChartWithMilestones.thisObj.settingsAxis.axis.x.padding - strokeConst}
                          ${this.xScale2(today)},${todayHeight + this.polygonfullWidth +
                            this.mileStoneTextPadding}`)
                        .style('stroke', this.settings.todayLine.fillColor)
                        .style('stroke-width', `${this.settings.todayLine.lineWidth}px`);
                } else {
                    todayLine.append('path').attr('class', `mileLineToday`).attr('id', 'mileStoneId')
                        .attr('d', `M${this.xScale2(today)},
                         ${height - xAxisTitleHeight - xAxisLabelsHeight - ComboChartWithMilestones.thisObj.settingsAxis.axis.x.padding}
                          ${this.xScale2(today)},${todayHeight + this.polygonfullWidth +
                            this.mileStoneTextPadding}`)
                        .style('stroke', this.settings.todayLine.fillColor)
                        .style('stroke-width', `${this.settings.todayLine.lineWidth}px`);
                }
                if (this.settings.todayLine.lineStyle === 'dotted') {
                    d3.selectAll('.todayLine').style('stroke-linecap', 'round')
                        .style('stroke-dasharray', `1 ${this.settings.todayLine.lineWidth + strokeConst}`);
                } else if (this.settings.todayLine.lineStyle === 'dashed') {
                    d3.selectAll('.todayLine').style('stroke-linecap', 'round').style('stroke-dasharray', '10 5');
                }
                if ( todayPosition === 'below' ) {
                    this.svg.append('text').classed('todayText', true)
                        .text('Today').style('margin-left', `${this.xScale2(today) - todayTextWidth / 2 + leftAxisWidth - strokeConst}px`)
                        .style('top', `${height - xAxisTitleHeight + adjustedLegendHeight - 5}px`)
                        .style('font-size', `${this.settings.todayLine.fontSize}px`)
                        .style('color', this.settings.todayLine.fillColor)
                        .style('font-Family', this.settings.mileStone.fontFamily);
                    d3.selectAll('.todayText').attr('title', `Today,${today}`);
                } else {
                    this.todayLine.append('text').classed('todayText', true)
                        .attr('transform', `translate(${this.xScale2(today) - todayTextWidth / 2},
                        ${todayHeight - (todayTextHeight / 2 ) + 5})`)
                        .text('Today');
                    d3.selectAll('.todayText').style('font-size', `${this.settings.todayLine.fontSize}px`)
                        .style('fill', this.settings.todayLine.fillColor)
                        .style('font-Family', this.settings.mileStone.fontFamily)
                        .append('title').text(`Today,${today}`);
                }
                if ( ((this.xScale2(today) + leftAxisWidth) - (width  / 2) < (this.xAxisTitleWidth + todayTextWidth) / 2)
                 && ((this.xScale2(today) + leftAxisWidth) - (width  / 2) > 0))  {
                    d3.selectAll('.xTitle').style('margin-left', `${(width - this.xAxisTitleWidth) / 2 -
                         todayTextWidth - strokeConst}px`);
                } else if (((width  / 2) - (this.xScale2(today) + leftAxisWidth) < (this.xAxisTitleWidth + todayTextWidth) / 2)
                && ( (width  / 2) - (this.xScale2(today) + leftAxisWidth) > 0)) {
                    d3.selectAll('.xTitle').style('margin-left', `${(width - this.xAxisTitleWidth) / 2 +
                         todayTextWidth + strokeConst}px`);
                }
            } else {
                todayLineFlag = false;
            }
        }

        /**
         * Function to render milestone lines for categorical scale ( xAxis )
         * @function
         */
        // tslint:disable-next-line:cyclomatic-complexity
        public renderMileStonesCategorical(): void {
            let textProp: TextProperties;
            let textWidth: number;
            let nextTextProp: TextProperties;
            let nextTextWidth: number;
            let prevTextWidth: number = null;
            let prevWidth: number = null;
            let differenceInWidth: number;
            let leftWidth: number;
            let labelWidth: number;
            let textFlag: boolean = true;
            const mileStoneDataLength: number = mileStoneData.length;
            let step: number = 0;
            let increment: number = 0;
            let tooltipDataPoint: VisualTooltipDataItem[] = [];
            this.tooltipData = [];
            leftWidth = xAxisStartRange;
            for (let index: number = 0; index < mileStoneDataLength; index++) {
                const color: string = mileStoneData[index].color;
                const mileStoneLine: d3.Selection<SVGElement> = this.chart.append('g').attr('class', 'mLine');
                textProp = {
                    text: mileStoneData[index].name,
                    fontFamily: this.settings.mileStone.fontFamily,
                    fontSize: `${this.settings.mileStone.fontSize}px`
                };
                textWidth = textMeasurementService.measureSvgTextWidth(textProp);
                if ( index < mileStoneDataLength - 1 ) {
                    nextTextProp = {
                        text: mileStoneData[index + 1].name,
                        fontFamily: this.settings.mileStone.fontFamily,
                        fontSize: `${this.settings.mileStone.fontSize}px`
                    };
                    nextTextWidth = textMeasurementService.measureSvgTextWidth(nextTextProp);
                    differenceInWidth = this.xScale(mileStoneData[index + 1].dates) -
                    this.xScale(mileStoneData[index].dates);
                } else {
                    differenceInWidth = actualWidth - this.xScale(mileStoneData[index].dates);
                }
                if ( Math.abs(differenceInWidth) < this.polygonfullWidth ) {
                    textFlag = false;
                }
                if (Math.abs(differenceInWidth) > (textWidth + nextTextWidth + this.polygonfullWidth) / 2 ) {
                    if ( (prevWidth === null) || (Math.abs(prevWidth) > (textWidth + prevTextWidth + this.polygonfullWidth) / 2 )) {
                        labelWidth = textWidth + 1;
                        if ( prevWidth === null ) {
                            labelWidth = this.xScale(mileStoneData[index].dates) > textWidth / 2 ? textWidth + 1 :
                            this.xScale(mileStoneData[index].dates);
                        }
                    } else {
                        labelWidth = 2 * (Math.abs(prevWidth) - (prevTextWidth / 2));
                    }
                } else {
                    labelWidth = Math.abs(differenceInWidth) > textWidth ? textWidth + 2 :
                     differenceInWidth > this.settings.xAxis.minimumCategoryWidth ? differenceInWidth :
                     this.settings.xAxis.minimumCategoryWidth;
                    if (prevWidth !== null) {
                        labelWidth = Math.abs(prevWidth) > labelWidth ? labelWidth : Math.abs(prevWidth);
                    } else {
                        labelWidth = Math.abs(this.xScale(mileStoneData[index].dates)) > labelWidth ? labelWidth :
                         Math.abs(this.xScale(mileStoneData[index].dates));
                    }
                }
                if ( prevWidth === null || Math.abs(prevWidth) > this.polygonfullWidth ) {
                    if ( prevWidth !== null ) {
                        this.tooltipData.push({
                            tooltip: tooltipDataPoint
                        });
                        tooltipDataPoint = [];
                        increment = 0;
                    }
                    mileStoneLine.append('path').attr('class', `mileLine-${index}`).classed('mileStones', true).style('stroke', color)
                        .style('stroke-width', `${this.settings.mileStone.lineWidth}px`)
                        .style('opacity', `${this.mileStoneOpacity}`).attr('id', 'mileStoneId')
                        .attr('d', `M${this.xScale(mileStoneData[index].dates)},
                        ${height - xAxisTitleHeight - xAxisLabelsHeight - ComboChartWithMilestones.thisObj.settingsAxis.axis.x.padding}
                         ${this.xScale(mileStoneData[index].dates)},${this.mileStoneTextHeight + todayHeight + this.polygonfullWidth +
                             this.mileStoneTextPadding}`);
                    mileStoneLine.append('polygon').classed('mileStoneRect', true).attr(`id`, `rect-${step}`)
                        .attr({
                            points: `${this.xScale(mileStoneData[index].dates)}, ${this.mileStoneTextHeight + todayHeight +
                                 this.mileStoneTextPadding} ${this.xScale(mileStoneData[index].dates) + this.polygonHalfWidth},
                                  ${this.mileStoneTextHeight + todayHeight + this.polygonHalfWidth + this.mileStoneTextPadding}
                                      ${this.xScale(mileStoneData[index].dates)}, ${this.mileStoneTextHeight + todayHeight +
                                         this.polygonfullWidth + this.mileStoneTextPadding} ${this.xScale(mileStoneData[index].dates)
                                             - this.polygonHalfWidth}, ${this.mileStoneTextHeight + todayHeight + this.polygonHalfWidth
                                                 + this.mileStoneTextPadding}`,
                            stroke: color,
                            'stroke-width': `${this.settings.mileStone.lineWidth}px`
                        }).style('opacity', this.mileStoneOpacity);
                    if ( Math.abs(differenceInWidth) < this.polygonfullWidth) {
                        if (index !== mileStoneDataLength - 1) {
                            d3.selectAll(`#rect-${step}`).attr('fill', 'grey');
                        } else {
                            d3.selectAll(`#rect-${step}`).attr('fill', 'white');
                            textFlag = true;
                            labelWidth = labelWidth + 5;
                        }
                        tooltipDataPoint.push({
                            displayName: `${mileStoneTitle}_${increment}`,
                            value: mileStoneData[index].name.toString()
                        });
                        tooltipDataPoint.push({
                            displayName: `${this.xAxisTitle}_${increment}`,
                            value: (this.formatter.format(mileStoneData[index].dates)).toString()
                        });
                        if ( mileStoneGroupFlag && mileStoneData[index].group !== null) {
                            tooltipDataPoint.push({
                                displayName: `${mileStoneGroupTitle}_${increment}`,
                                value: mileStoneData[index].group.toString()
                            });
                        }
                    } else {
                        d3.selectAll(`#rect-${step}`).attr('fill', 'white');
                        tooltipDataPoint.push({
                            displayName: mileStoneTitle.toString(),
                            value: mileStoneData[index].name.toString()
                        });
                        tooltipDataPoint.push({
                            displayName: `${this.xAxisTitle}`,
                            value: (this.formatter.format(mileStoneData[index].dates)).toString()
                        });
                        if ( mileStoneGroupFlag && mileStoneData[index].group !== null ) {
                            tooltipDataPoint.push({
                                displayName: mileStoneGroupTitle.toString(),
                                value: mileStoneData[index].group.toString()
                            });
                        }
                    }
                    step++;
                    if ( textFlag && this.settings.mileStone.verticalToggle === 'horizontal') {
                        mileStoneLine.append('text').classed('mileStoneLineText', true)
                            .attr('transform', `translate(${this.xScale(mileStoneData[index].dates) - (labelWidth / 2)},
                             ${this.mileStoneTextHeight - this.polygonHalfWidth + todayHeight})`)
                            .text(textMeasurementService.getTailoredTextOrDefault(textProp, labelWidth))
                            .style('font-size', `${this.settings.mileStone.fontSize}px`)
                            .style('font-family', this.settings.mileStone.fontFamily)
                            .attr('fill', color).append('title').text(mileStoneData[index].name);
                        } else if ( textFlag && this.settings.mileStone.verticalToggle === 'vertical') {
                            if ( this.settings.mileStone.height !== null ) {
                                labelWidth = this.settings.mileStone.height;
                            }
                            mileStoneLine.append('text').classed('mileStoneLineText', true)
                            .attr('transform', `translate(${this.xScale(mileStoneData[index].dates) + this.mileStoneTextwidth / 4},
                             ${this.mileStoneTextHeight + 10}) rotate(-90)`)
                             .text(textMeasurementService.getTailoredTextOrDefault(textProp, this.mileStoneTextHeight + 5))
                            .style('font-size', `${this.settings.mileStone.fontSize}px`)
                            .style('font-family', this.settings.mileStone.fontFamily)
                            .attr('fill', color).append('title').text(mileStoneData[index].name);
                    }
                } else {
                    tooltipDataPoint.push({
                        displayName: `${mileStoneTitle}_${increment}`,
                        value: mileStoneData[index].name.toString()
                    });
                    tooltipDataPoint.push({
                        displayName: `${this.xAxisTitle}_${increment}`,
                        value: (this.formatter.format(mileStoneData[index].dates)).toString()
                    });
                    if ( mileStoneGroupFlag && mileStoneData[index].group !== null) {
                        tooltipDataPoint.push({
                            displayName: `${mileStoneGroupTitle}_${increment}`,
                            value: mileStoneData[index].group.toString()
                        });
                    }
                }
                increment++;
                if ( index < mileStoneDataLength - 1 ) {
                    prevWidth = prevWidth < this.polygonfullWidth ? differenceInWidth + prevWidth : differenceInWidth;
                    prevTextWidth = textWidth;
                    textFlag = true;
                } else {
                    this.tooltipData.push({
                        tooltip: tooltipDataPoint
                    });
                }
            }

        }

        /**
         * Function to render milestone lines for continuous scale ( xAxis )
         * @function
         */
        // tslint:disable-next-line:cyclomatic-complexity
        public renderMileStonesContinuous(): void {
            let textProp: TextProperties;
            let textWidth: number;
            let nextTextProp: TextProperties;
            let nextTextWidth: number;
            let prevTextWidth: number = null;
            let prevWidth: number = null;
            let leftWidth: number;
            let differenceInWidth: number;
            let labelWidth: number;
            let textFlag: boolean = true;
            let tooltipDataPoint: VisualTooltipDataItem[] = [];
            let step: number = 0;
            let increment: number = 0;
            this.tooltipData = [];
            const mileStoneDataLength: number = mileStoneData.length;
            leftWidth = this.chartPadding + this.maxBarWidth;
            for (let index: number = 0; index < mileStoneDataLength; index++) {
                const color: string = mileStoneData[index].color;
                const mileStoneLine: d3.Selection<SVGElement> = this.chart.append('g').attr('class', 'mLine');
                textProp = {
                    text: mileStoneData[index].name,
                    fontFamily: this.settings.mileStone.fontFamily,
                    fontSize: `${this.settings.mileStone.fontSize}px`
                };
                textWidth = textMeasurementService.measureSvgTextWidth(textProp);
                if ( index < mileStoneDataLength - 1 ) {
                    nextTextProp = {
                        text: mileStoneData[index + 1].name,
                        fontFamily: this.settings.mileStone.fontFamily,
                        fontSize: `${this.settings.mileStone.fontSize}px`
                    };
                    nextTextWidth = textMeasurementService.measureSvgTextWidth(nextTextProp);
                    differenceInWidth = this.xScale2(mileStoneData[index + 1].actualDates) -
                    this.xScale2(mileStoneData[index].actualDates);
                } else {
                    differenceInWidth = actualWidth - this.chartPadding - this.maxBarWidth -
                    this.xScale2(mileStoneData[index].actualDates);
                }
                if ( Math.abs(differenceInWidth) < this.polygonfullWidth ) {
                    textFlag = false;
                }
                if (Math.abs(differenceInWidth) > (textWidth + nextTextWidth + 2) / 2 ) {
                    if ( (prevWidth === null) || (Math.abs(prevWidth) > (textWidth + prevTextWidth + 2) / 2 )) {
                        labelWidth = textWidth + 1;
                        if ( prevWidth === null ) {
                            labelWidth = this.xScale2(mileStoneData[index].actualDates) > textWidth / 2 ? textWidth + 1 :
                            this.xScale2(mileStoneData[index].actualDates) - leftWidth;
                        }
                    } else {
                        labelWidth = 2 * (Math.abs(prevWidth) - (prevTextWidth / 2));
                    }
                } else {
                    labelWidth = Math.abs(differenceInWidth) > textWidth ? textWidth : Math.abs(differenceInWidth);
                    labelWidth = Math.abs(prevWidth) > labelWidth ? labelWidth : Math.abs(prevWidth);
                }
                if ( prevWidth === null || Math.abs(prevWidth) > this.polygonfullWidth ) {
                    if ( prevWidth !== null ) {
                        this.tooltipData.push({
                            tooltip: tooltipDataPoint
                        });
                        tooltipDataPoint = [];
                        increment = 0;
                    }
                    mileStoneLine.append('path').attr('class', `mileLine-${index}`).classed('mileStones', true).style('stroke', color)
                        .style('stroke-width', `${this.settings.mileStone.lineWidth}px`)
                        .style('opacity', `${this.mileStoneOpacity}`).attr('id', 'mileStoneId')
                        .attr('d', `M${this.xScale2(mileStoneData[index].actualDates)},
                        ${height - xAxisTitleHeight - xAxisLabelsHeight - ComboChartWithMilestones.thisObj.settingsAxis.axis.x.padding}
                         ${this.xScale2(mileStoneData[index].actualDates)},${this.mileStoneTextHeight + this.polygonfullWidth +
                        todayHeight + this.mileStoneTextPadding }`);
                    mileStoneLine.append('polygon').classed('mileStoneRect', true).attr(`id`, `rect-${step}`)
                        .attr({
                            points: `${this.xScale2(mileStoneData[index].actualDates)}, ${this.mileStoneTextHeight + todayHeight +
                                 this.mileStoneTextPadding} ${this.xScale2(mileStoneData[index].actualDates) + this.polygonHalfWidth},
                                 ${this.mileStoneTextHeight + this.polygonHalfWidth + todayHeight + this.mileStoneTextPadding}
                                ${this.xScale2(mileStoneData[index].actualDates)}, ${this.mileStoneTextHeight + this.polygonfullWidth +
                                     + todayHeight + this.mileStoneTextPadding} ${this.xScale2(mileStoneData[index].actualDates) -
                                         this.polygonHalfWidth}, ${this.mileStoneTextHeight + this.polygonHalfWidth +
                                            + todayHeight + this.mileStoneTextPadding}`,
                            stroke: color,
                            'stroke-width': `${this.settings.mileStone.lineWidth}px`
                        }).style('opacity', this.mileStoneOpacity);
                    if ( Math.abs(differenceInWidth) < this.polygonfullWidth ) {
                        if (index !== mileStoneDataLength - 1) {
                            d3.selectAll(`#rect-${step}`).attr('fill', 'grey');
                        } else {
                            d3.selectAll(`#rect-${step}`).attr('fill', 'white');
                            textFlag = true;
                            labelWidth = labelWidth + 5;
                        }
                        tooltipDataPoint.push({
                            displayName: `${mileStoneTitle}_${increment}`,
                            value: mileStoneData[index].name.toString()
                        });
                        tooltipDataPoint.push({
                            displayName: `${this.xAxisTitle}_${increment}`,
                            value: (this.formatter.format(mileStoneData[index].dates)).toString()
                        });
                        if ( mileStoneGroupFlag && mileStoneData[index].group !== null) {
                            tooltipDataPoint.push({
                                displayName: `${mileStoneGroupTitle}_${increment}`,
                                value: mileStoneData[index].group.toString()
                            });
                        }
                    } else {
                        d3.selectAll(`#rect-${step}`).attr('fill', 'white');
                        tooltipDataPoint.push({
                            displayName: mileStoneTitle.toString(),
                            value: mileStoneData[index].name.toString()
                        });
                        tooltipDataPoint.push({
                            displayName: `${this.xAxisTitle}`,
                            value: (this.formatter.format(mileStoneData[index].dates)).toString()
                        });
                        if ( mileStoneGroupFlag && mileStoneData[index].group !== null) {
                            tooltipDataPoint.push({
                                displayName: mileStoneGroupTitle.toString(),
                                value: mileStoneData[index].group.toString()
                            });
                        }
                    }
                    step++;
                    if (textFlag && this.settings.mileStone.verticalToggle === 'horizontal') {
                        mileStoneLine.append('text').classed('mileStoneLineText', true)
                            .attr('transform', `translate(${this.xScale2(mileStoneData[index].actualDates) - (labelWidth / 2)},
                             ${this.mileStoneTextHeight - 5 + todayHeight})`)
                            .text(textMeasurementService.getTailoredTextOrDefault(textProp, labelWidth))
                            .style('font-size', `${this.settings.mileStone.fontSize}px`)
                            .style('font-family', this.settings.mileStone.fontFamily)
                            .attr('fill', color).append('title').text(mileStoneData[index].name);
                    } else if (textFlag && this.settings.mileStone.verticalToggle === 'vertical') {
                        mileStoneLine.append('text').classed('mileStoneLineText', true)
                            .attr('transform', `translate(${this.xScale2(mileStoneData[index].actualDates) + (this.mileStoneTextwidth / 4)},
                             ${this.mileStoneTextHeight + todayHeight}) rotate(-90)`)
                            .text(textMeasurementService.getTailoredTextOrDefault(textProp, this.mileStoneTextHeight + 5))
                            .style('font-size', `${this.settings.mileStone.fontSize}px`)
                            .style('font-family', this.settings.mileStone.fontFamily)
                            .attr('fill', color).append('title').text(mileStoneData[index].name);
                    }
                } else {
                    tooltipDataPoint.push({
                        displayName: `${mileStoneTitle}_${increment}`,
                        value: mileStoneData[index].name.toString()
                    });
                    tooltipDataPoint.push({
                        displayName: `${this.xAxisTitle}_${increment}`,
                        value: (this.formatter.format(mileStoneData[index].dates)).toString()
                    });
                    if ( mileStoneGroupFlag && mileStoneData[index].group !== null) {
                        tooltipDataPoint.push({
                            displayName: `${mileStoneGroupTitle}_${increment}`,
                            value: mileStoneData[index].group.toString()
                        });
                    }
                }
                increment++;
                if ( index < mileStoneDataLength - 1 ) {
                    prevWidth = prevWidth < this.polygonfullWidth ? differenceInWidth + prevWidth : differenceInWidth;
                    prevTextWidth = labelWidth;
                    textFlag = true;
                }
            }
            this.tooltipData.push({
                tooltip: tooltipDataPoint
            });
        }
        /**
         * Function to set configurations for milestonelabels which are used by visual
         * @function
         *
         */
        public mileStoneConfigurations(): void {
            let textProperty: TextProperties;
            const todayDate: Date = new Date();
            const mileStoneDataLength: number = mileStoneData.length;
            if ( this.settings.mileStone.show && mileStoneFlag ) {
                this.mileStoneOpacity = this.settings.mileStone.opacity / 100;
                this.polygonHalfWidth = 5;
                this.polygonfullWidth = 10;
                if (this.settings.mileStone.lineWidth <= 0) {
                    this.settings.mileStone.lineWidth = 1;
                } else if (this.settings.mileStone.lineWidth > 5) {
                    this.settings.mileStone.lineWidth = 5;
                }
                milestoneIndex = 0;
                let maxMileStoneHeight: number = 0;
                this.polygonHalfWidth = this.polygonHalfWidth + this.settings.mileStone.lineWidth;
                this.polygonfullWidth = this.polygonfullWidth + 2 * this.settings.mileStone.lineWidth;
                for ( let index: number = 0; index < mileStoneDataLength; index++) {
                    textProperty = {
                        text: mileStoneData[index].name,
                        fontFamily: this.settings.mileStone.fontFamily,
                        fontSize:  `${this.settings.mileStone.fontSize}px`
                    };
                    this.mileStoneTextHeight = textMeasurementService.measureSvgTextHeight(textProperty);
                    if ( this.settings.mileStone.verticalToggle === 'vertical') {
                        this.mileStoneTextwidth = textMeasurementService.measureSvgTextHeight(textProperty);
                        const tempTextHeight: number = textMeasurementService.measureSvgTextWidth(textProperty);
                        if ( tempTextHeight > maxMileStoneHeight ) {
                            maxMileStoneHeight = tempTextHeight;
                        }
                        this.mileStoneTextPadding = 5;
                    } else {
                        this.mileStoneTextPadding = 0;
                    }
                    for ( let iterator: number = 0; iterator < mileStoneGroupData.length; iterator++ ) {
                        if ( mileStoneData[index].group === mileStoneGroupData[iterator].name &&
                             this.settings.mileStone.colorSettings === 'milestoneGroup') {
                                 mileStoneData[index].color = mileStoneGroupData[iterator].color;
                        } else if ( mileStoneData[index].group === null &&
                             this.settings.mileStone.colorSettings === 'milestoneGroup') {
                                mileStoneData[index].color = mileStoneGroupData[mileStoneGroupData.length - 1].color;
                            }
                    }
                    if ( this.settings.todayLine.colorBeforeTodayToggle && mileStoneData[index].actualDates < todayDate) {
                        mileStoneData[index].color = this.settings.todayLine.colorBeforeToday;
                    }
                }
                if ( this.settings.mileStone.height !== null && this.settings.mileStone.verticalToggle === 'vertical') {
                    if ( this.settings.mileStone.height < 0 ) {
                        this.settings.mileStone.height = 20; //this.mileStoneTextHeight + 5;
                    }
                    this.mileStoneTextHeight = this.settings.mileStone.height;
                }
                if ( this.settings.mileStone.height === null && this.settings.mileStone.verticalToggle === 'vertical') {
                    this.mileStoneTextHeight = maxMileStoneHeight;
                }
            } else {
                this.mileStoneTextHeight = 0;
                this.polygonHalfWidth = 0;
            }
        }
        /**
         * Function to render milestone lines and today line
         * @function
         * @param {IVisualViewModel} viewModel - contains all the data
         *
         */
        public mileStonelines(viewModel: IVisualViewModel[]): void {
            const mileStoneDataPoint: IMileStonePoint[] = [];
            if (this.settings.mileStone.show) {
                if ( !categoryFlag ) {
                    let step: number = 0;
                    const arrayOfIndex: number[] = [];
                    let maxIndex: number = 0;
                    // tslint:disable-next-line:no-any
                    let maxDate: any;
                    for ( let index: number = 0; index < mileStoneData.length; index++ ) {
                        // tslint:disable-next-line:no-any
                        let tempDate: any;
                        tempDate = mileStoneData[maxIndex].actualDates;
                        step = maxIndex;
                        maxDate = mileStoneData[maxIndex].actualDates;
                        for ( let iterator: number = 0; iterator < mileStoneData.length; iterator++ ) {
                            if ( monthName.indexOf((mileStoneData[0].dates.toString()).substr(0, 3)) !== -1 ) {
                                if ( monthName.indexOf((tempDate.toString()).substr(0, 3)) >
                                 monthName.indexOf((mileStoneData[iterator].actualDates.toString()).substr(0, 3)) &&
                                  arrayOfIndex.indexOf(iterator) === -1) {
                                    tempDate = mileStoneData[iterator].actualDates;
                                    step = iterator;
                                }
                                if ( index === 0 && monthName.indexOf((maxDate.toString()).substr(0, 3)) <
                                monthName.indexOf((mileStoneData[iterator].actualDates.toString()).substr(0, 3)) ) {
                                    maxDate = mileStoneData[iterator].actualDates;
                                    maxIndex = iterator;
                                }
                            } else {
                                if ( tempDate >= mileStoneData[iterator].actualDates && arrayOfIndex.indexOf(iterator) === -1) {
                                    tempDate = mileStoneData[iterator].actualDates;
                                    step = iterator;
                                }
                                if ( index === 0 && maxDate < mileStoneData[iterator].actualDates ) {
                                    maxDate = mileStoneData[iterator].actualDates;
                                    maxIndex = iterator;
                                }
                            }
                        }
                        if ( arrayOfIndex.indexOf(step) === -1 ) {
                            mileStoneDataPoint.push({
                                actualDates: mileStoneData[step].actualDates,
                                dates: mileStoneData[step].dates,
                                color: mileStoneData[step].color,
                                name: mileStoneData[step].name,
                                group: mileStoneData[step].group,
                                selector: mileStoneData[step].selector
                            });
                            arrayOfIndex.push(step);
                        }
                    }
                    mileStoneData = [];
                    mileStoneData = mileStoneDataPoint;
                }
                if ( categoryFlag) {
                    this.renderMileStonesCategorical();
                    } else {
                    this.renderMileStonesContinuous();
                }
                if (this.settings.mileStone.lineStyle === 'dotted') {
                    d3.selectAll('.mileStones').style('stroke-linecap', 'round')
                        .style('stroke-dasharray', `1 ${this.settings.mileStone.lineWidth + 4}`);
                } else if (this.settings.mileStone.lineStyle === 'dashed') {
                    d3.selectAll('.mileStones').style('stroke-linecap', 'round').style('stroke-dasharray', '10 5');
                }
            }
            for ( let index: number = 0; index < this.tooltipData.length; index++ ) {
                const tempTooltip: VisualTooltipDataItem[] = this.tooltipData[index].tooltip;
                this.tooltipServiceWrapper.addTooltip(
                    d3.selectAll(`#rect-${index}`),
                    (tooltipEvent: TooltipEventArgs<number>) => tempTooltip,
                    (tooltipEvent: TooltipEventArgs<number>) => null
                );
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
            const quarterOne: number  = monthOne < 3 ? 0 : monthOne >= 3 && monthOne < 6 ? 1 : monthOne >= 6 && monthOne < 9 ? 2 : 3;
            const quarterTwo: number  = monthTwo < 3 ? 0 : monthTwo >= 3 && monthTwo < 6 ? 1 : monthTwo >= 6 && monthTwo < 9 ? 2 : 3;
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
            if ( height < 370 || width < 390 ) {
                this.settings.xAxis.fontSize = this.settings.xAxis.fontSize > 16 ? 16 : this.settings.xAxis.fontSize;
                this.settings.xAxis.titleFontSize = this.settings.xAxis.titleFontSize > 16 ? 16 : this.settings.xAxis.titleFontSize;
                this.settings.yAxis.fontSize = this.settings.yAxis.fontSize > 16 ? 16 : this.settings.yAxis.fontSize;
                this.settings.yAxis.titleFontSize = this.settings.yAxis.titleFontSize > 16 ? 16 : this.settings.yAxis.titleFontSize;
            } else if ( height < 550 || width < 560 ) {
                this.settings.xAxis.fontSize = this.settings.xAxis.fontSize > 21 ? 21 : this.settings.xAxis.fontSize;
                this.settings.xAxis.titleFontSize = this.settings.xAxis.titleFontSize > 21 ? 21 : this.settings.xAxis.titleFontSize;
                this.settings.yAxis.fontSize = this.settings.yAxis.fontSize > 21 ? 21 : this.settings.yAxis.fontSize;
                this.settings.yAxis.titleFontSize = this.settings.yAxis.titleFontSize > 21 ? 21 : this.settings.yAxis.titleFontSize;
            } else if ( height < 600 || width < 640 ) {
                this.settings.xAxis.fontSize = this.settings.xAxis.fontSize > 32 ? 32 : this.settings.xAxis.fontSize;
                this.settings.xAxis.titleFontSize = this.settings.xAxis.titleFontSize > 32 ? 32 : this.settings.xAxis.titleFontSize;
                this.settings.yAxis.fontSize = this.settings.yAxis.fontSize > 32 ? 32 : this.settings.yAxis.fontSize;
                this.settings.yAxis.titleFontSize = this.settings.yAxis.titleFontSize > 32 ? 32 : this.settings.yAxis.titleFontSize;
            }
            if ( !categoryFlag ) {
                this.settingsAxis.axis.x.padding = 0;
            } else {
                this.settingsAxis.axis.x.padding = this.settingsAxis.border.halfOfTop;
            }
        }
        /**
         * Function to apply settings
         * @function
         *
         */
        public applySettings(): void {
            if ( this.settings.xAxis.typeX === 'Categorical' || dataLength === 1) {
                categoryFlag = true;
            } else {
                categoryFlag = false;
            }
            if ( renderBarFlag ) {
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
            if ( this.settings.yAxis.position === 'Left' ) {
                ySecPosition = 'Right';
            } else {
                ySecPosition = 'Left';
            }
            if ( this.settings.shapes.lineWidth > 5 ) {
                this.settings.shapes.lineWidth = 5;
            }
            if ( this.settings.shapes.lineWidth <= 0 ) {
                this.settings.shapes.lineWidth = 1;
            }
            if ( this.settings.todayLine.fontSize > 25 ) {
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
            if ( !this.settings.todayLine.show ) {
                todayHeight = 0;
            }
            if ( !mileStoneFlag ) {
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
                        .style('margin-right', `${(this.ySecAxisPadding  + ySecAxisWidth)}px`).style('overflow-x', 'auto');
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
                        .style('margin-right', `${(this.ySecAxisPadding  + ySecAxisWidth)}px`).style('overflow', 'hidden');
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
                 ComboChartWithMilestones.thisObj.settingsAxis.axis.x.padding}px`);
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
            d3.selectAll('.xAxisSvg').remove();
            d3.selectAll('.todayLine').remove();
            d3.selectAll('.xAxis').remove();
            d3.selectAll('.tick').remove();
            d3.selectAll('.targetLines').remove();
            d3.selectAll('.ygridLines').remove();
            d3.selectAll('.xgridLines').remove();
            d3.selectAll('.yAxis').remove();
            d3.selectAll('.ySecAxis').remove();
            d3.selectAll('.yTitle').remove();
            d3.selectAll('.ySecTitle').remove();
            d3.selectAll('.xTitle').remove();
            d3.selectAll('rect.bar').remove();
            d3.selectAll('.legendTitle').remove();
            d3.selectAll('.legendItem').remove();
            d3.selectAll('.lineClass').remove();
            d3.selectAll('.mouseOver').remove();
            d3.selectAll('.mileStoneClass').remove();
            d3.selectAll('.mLine').remove();
            d3.selectAll('.mileStoneLineText').remove();
            d3.selectAll('.dataLabels').remove();
            d3.selectAll('.bar').remove();
            d3.selectAll('.todayText').remove();
            d3.selectAll('.message').remove();
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
            if ( categorical.categories ) {
                for ( let iterator: number = 0; iterator < categorical.categories.length; iterator++ ) {
                    if ( categorical.categories[iterator].source.roles[`Category`]) {
                        isCategory = true;
                    }
                }
            }
            if ( categorical.values ) {
                for ( let iterator: number = 0; iterator < categorical.values.length; iterator++ ) {
                    if ( categorical.values[iterator].source.roles[`Line`] || categorical.values[iterator].source.roles[`Bar`] ) {
                        isMeasure = true;
                    }
                }
            }
            if ( !isCategory && !isMeasure ) {
                this.returnFlag = true;
                this.mainChart.attr({
                    width: options.viewport.width
                });
                // tslint:disable-next-line:no-any
                const textElement: any = d3.select(this.target).append('p').classed('message', true)
                .text(`Please select a category and either line/bar values`);
            } else if ( isCategory && !isMeasure ) {
                this.returnFlag = true;
                this.mainChart.attr({
                    width: options.viewport.width
                });
                // tslint:disable-next-line:no-any
                const textElement: any = d3.select(this.target).append('p').classed('message', true)
                .text(`Please select line/bar values`);
            } else if ( !isCategory && isMeasure ) {
                this.returnFlag = true;
                this.mainChart.attr({
                    width: options.viewport.width
                });
                // tslint:disable-next-line:no-any
                const textElement: any = d3.select(this.target).append('p').classed('message', true)
                .text(`Please select a category`);
            } else {
                this.returnFlag = false;
            }
            if ( options.viewport.height < 100  || options.viewport.width < 100) {
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
            ComboChartWithMilestones.thisObj = this;
            yAxisWidth = 0;
            ySecAxisWidth = 0;
            leftAxisWidth = 0;
            rightAxisWidth = 0;
            legendTitle = '';
            selectionManager = this.selectionManager;
            this.settings = ComboChartWithMilestones.parseSettings(options && options.dataViews && options.dataViews[0]);
        }
        // tslint:disable-next-line:cyclomatic-complexity
        public update(options: VisualUpdateOptions): void {
            this.removeClass();
            this.displayMessage(options);
            if ( this.returnFlag ) {
                d3.selectAll('rect.clearCatcher').style('height', `0px`);

                return;
            }
            this.initialize(options);
            const dataView: DataView = this.dataViews = options.dataViews[0];
            let categoryLength: number = dataView.categorical.categories.length;
            // tslint:disable-next-line:prefer-const no-any
            let values: any = this.dataViews.categorical && this.dataViews.categorical.values;
            const viewLineModel: IVisualViewModel[]  = this.viewLineModel = [];
            const viewBarModel: IVisualViewModel[] = this.viewBarModel = [];
            let viewModel: IVisualViewModel[];
            viewModel = visualTransform(options, this.host);
            categoryLength = viewModel[0].dataPoints.length;
            let role: string[];
            for ( let iterator: number = 0; iterator < viewModel.length; iterator++ ) {
                if ( viewModel[iterator].dataRole.indexOf(`line`) !== -1 ) {
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
                if ( viewModel[iterator].dataRole.indexOf(`bar`) !== -1 ) {
                    role = [];
                    role.push('bar');
                    viewBarModel.push({
                        dataPoints: viewModel[iterator].dataPoints,
                        keyName: viewModel[iterator].keyName,
                        dataRole: role,
                        selectionId: visualHost.createSelectionIdBuilder().withMeasure(
                            `${viewModel[iterator].keyName} Bar`).createSelectionId(),
                        selected: viewModel[iterator].selected,
                        identity: visualHost.createSelectionIdBuilder().withMeasure(
                            `${viewModel[iterator].keyName} Bar`).createSelectionId()
                    });
                }
                if ( viewModel[iterator].dataRole.indexOf(`tooltips`) !== -1 ) {
                    role = [];
                    role.push('tooltips');
                    this.tooltipModel.push({
                        dataPoints: viewModel[iterator].dataPoints,
                        keyName: viewModel[iterator].keyName,
                        dataRole: role,
                        selectionId: viewModel[iterator].selectionId,
                        selected: viewModel[iterator].selected,
                        identity: viewModel[iterator].identity
                    });
                }
                if ( categoryLength < viewModel[iterator].dataPoints.length ) {
                    categoryLength = viewModel[iterator].dataPoints.length;
                }
            }
            this.viewLineModel = viewLineModel;
            this.viewBarModel = viewBarModel;
            dataLength = categoryLength;
            this.mainChartWidth = viewModel[0].dataPoints.length * this.settings.xAxis.minimumCategoryWidth;
            this.xTickWidth = viewModel[0].dataPoints.length * this.yTicksHeight;
            this.line = [];
            colors = [];
            if ( dateFlag ) {
                xStart = this.settings.xAxis.startValue !== null
                            && this.settings.xAxis.startValue !== ''
                            && regexDate.test(this.settings.xAxis.startValue) ?
                    new Date(this.settings.xAxis.startValue) : null;
                xEnd = this.settings.xAxis.endValue !== null
                            && this.settings.xAxis.endValue !== ''
                            && regexDate.test(this.settings.xAxis.endValue) ?
                    new Date(this.settings.xAxis.endValue) : null;

                if (xStart > xEnd) {
                    xStart = null;
                    xEnd = null;
                }
                this.setParameters();
            }
            this.mileStoneConfigurations();
            this.createLegendDataPoint(options, this.host);
            this.applySettings();
            this.applyYAxisConfiguration();
            this.applyXAxisConfiguration(options, viewModel);
            this.renderYAxis(options);
            this.renderHorizontalGrid(viewModel);
            this.renderXAxis(viewModel);
            this.renderVerticalGrid();
            this.setClassAttributes();
            this.mileStonelines(viewModel);
            if ( renderBarFlag ) {
                d3.selectAll('rect.clearCatcher').style('height', `0px`);
                this.renderbars(viewBarModel, options);

                for ( let index: number = 0; index < viewBarModel[0].dataPoints.length; index++ ) {
                    d3.selectAll(`.bar-${index}`).on('click', function(d: IVisualDataPoint): void {
                        selectionClear.handleClearSelection();
                        selectionManager.select(d.identity).then((ids: ISelectionId[]) => {
                        d3.selectAll('.lineClass').style('opacity', ids.length > 0 ? lowOpacity : highOpacity);
                        d3.selectAll(`.todayText, .todayLine, .mLine`).style('opacity', ids.length > 0 ? lowOpacity : highOpacity);
                        d3.selectAll('.rectangle').style('opacity', ids.length > 0 ? lowOpacity : highOpacity);
                        d3.selectAll(`.rectangle`).classed('selected', false);
                        d3.selectAll(`.bar-${index}`).classed('selected', true);
                        d3.selectAll(`.selected`).style('opacity', highOpacity);
                        });
                        (<Event>d3.event).stopPropagation();
                    });
                }
            }
            if (this.settings.todayLine.show) {
                this.renderTodayLine(viewModel);
            }
            if ( renderLineFlag ) {
                this.renderLines(viewLineModel, options);
            }
            this.viewBarModel.forEach(function (d: IVisualViewModel): void {
                ComboChartWithMilestones.thisObj.lineBarData.push({
                    dataPoints: d.dataPoints,
                    keyName: d.keyName,
                    dataRole: d.dataRole,
                    selectionId: d.selectionId,
                    selected: d.selected,
                    identity: d.identity
                });
            });
            this.viewLineModel.forEach(function (d: IVisualViewModel): void {
                ComboChartWithMilestones.thisObj.lineBarData.push({
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
            const behaviorOptions: IComboChartWithMilestonesBehaviorOptions = {
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
            let objectName: string;
            objectName = options.objectName;
            let objectEnumeration: VisualObjectInstance[];
            objectEnumeration = [];
            switch (options.objectName) {
                case 'legend':
                    if (this.settings.legend.show) {
                        objectEnumeration.push({
                            objectName: objectName,
                            selector: null,
                            properties: {
                                show: this.settings.legend.show,
                                fontSize: this.settings.legend.fontSize,
                                title: this.settings.legend.title
                            }
                        });
                        if ( this.settings.legend.title ) {
                            objectEnumeration.push({
                                objectName: objectName,
                                selector: null,
                                properties: {
                                    titleText: this.settings.legend.titleText
                                }
                            });
                        }
                        objectEnumeration.push({
                            objectName: objectName,
                            selector: null,
                            properties: {
                                color: this.settings.legend.color,
                                position: this.settings.legend.position
                            }
                        });
                    } else {
                        objectEnumeration.push({
                            objectName: objectName,
                            selector: null,
                            properties: {
                                show: this.settings.legend.show
                            }
                        });
                    }

                    return objectEnumeration;
                case 'dataColors':
                    for (let index: number = 0; index < colors.length; index++) {
                        if ( renderBarFlag && index < this.viewBarModel.length ) {
                            if ( legendFlag ) {
                                objectEnumeration.push({
                                    objectName: objectName,
                                    displayName: colors[index].key,
                                    properties: {
                                        fillBarColor: {
                                            solid: {
                                                color: colors[index].color
                                            }
                                        }
                                    },
                                    selector: colors[index].selectionId.getSelector()
                                });
                            } else {
                                objectEnumeration.push({
                                    objectName: objectName,
                                    displayName: colors[index].key,
                                    properties: {
                                        fillBarColor: {
                                            solid: {
                                                color: colors[index].color
                                            }
                                        }
                                    },
                                    selector: colors[index].selectionId
                                });
                            }
                        } else {
                            objectEnumeration.push({
                                objectName: objectName,
                                displayName: colors[index].key,
                                properties: {
                                    fillLineColor: {
                                        solid: {
                                            color: colors[index].color
                                        }
                                    }
                                },
                                selector: colors[index].selectionId
                            });
                        }
                    }

                    return objectEnumeration;
                case 'xAxis':
                    if (this.settings.xAxis.show) {
                        objectEnumeration.push({
                            objectName: objectName,
                            selector: null,
                            properties: {
                                show: this.settings.xAxis.show
                            }
                        });
                        if ( dataTypeNumberFlag || dateFlag ) {
                            objectEnumeration.push({
                                objectName: objectName,
                                selector: null,
                                properties: {
                                    typeX: this.settings.xAxis.typeX
                                }
                            });
                        }
                        if ( !categoryFlag ) {
                            objectEnumeration.push({
                                objectName: objectName,
                                selector: null,
                                properties: {
                                    startValue: this.settings.xAxis.startValue,
                                    endValue: this.settings.xAxis.endValue
                                }
                            });
                        }
                        objectEnumeration.push({
                            objectName: objectName,
                            selector: null,
                            properties: {
                                fontSize: this.settings.xAxis.fontSize,
                                color: this.settings.xAxis.color,
                                fontFamily: this.settings.xAxis.fontFamily,
                                title: this.settings.xAxis.title
                            }
                        });
                        if (this.settings.xAxis.title) {
                            objectEnumeration.push({
                                objectName: objectName,
                                selector: null,
                                properties: {
                                    titleText: this.settings.xAxis.titleText,
                                    titleFontSize: this.settings.xAxis.titleFontSize,
                                    titleFontColor: this.settings.xAxis.titleFontColor
                                }
                            });
                        }
                        objectEnumeration.push({
                            objectName: objectName,
                            selector: null,
                            properties: {
                                verticalGridLines: this.settings.xAxis.verticalGridLines
                            }
                        });
                        if (this.settings.xAxis.verticalGridLines) {
                            objectEnumeration.push({
                                objectName: objectName,
                                selector: null,
                                properties: {
                                    verticalLineColor: this.settings.xAxis.verticalLineColor,
                                    verticalLineWidth: this.settings.xAxis.verticalLineWidth
                                }
                            });
                        }
                        if ( categoryFlag ) {
                            objectEnumeration.push({
                                objectName: objectName,
                                selector: null,
                                properties: {
                                    maxAxisHeight: this.settings.xAxis.maxAxisHeight
                                }
                            });
                        }
                        if ( renderBarFlag && categoryFlag) {
                            objectEnumeration.push({
                                objectName: objectName,
                                selector: null,
                                properties: {
                                    minimumCategoryWidth: this.settings.xAxis.minimumCategoryWidth,
                                    innerPadding: this.settings.xAxis.innerPadding
                                },
                                validValues: {
                                    minimumCategoryWidth : {
                                        numberRange : {
                                            min: 20,
                                            max: 100
                                        }
                                    }
                                }
                            });
                        }
                    } else {
                        objectEnumeration.push({
                            objectName: objectName,
                            selector: null,
                            properties: {
                                show: this.settings.xAxis.show
                            }
                        });
                    }

                    return objectEnumeration;
                case 'yAxis':
                    if (this.settings.yAxis.show) {
                        objectEnumeration.push({
                            objectName: objectName,
                            selector: null,
                            properties: {
                                show: this.settings.yAxis.show,
                                position: this.settings.yAxis.position,
                                scaleType: this.settings.yAxis.scaleType,
                                startValue: this.settings.yAxis.startValue,
                                endValue: this.settings.yAxis.endValue,
                                fontSize: this.settings.yAxis.fontSize,
                                color: this.settings.yAxis.color,
                                fontFamily: this.settings.yAxis.fontFamily,
                                displayUnit: this.settings.yAxis.displayUnit,
                                decimalPoints: this.settings.yAxis.decimalPoints,
                                title: this.settings.yAxis.title
                            },
                            validValues: {
                                decimalPoints : {
                                    numberRange : {
                                        min: 0,
                                        max: 4
                                    }
                                }
                            }
                        });
                        if (this.settings.yAxis.title) {
                            objectEnumeration.push({
                                objectName: objectName,
                                selector: null,
                                properties: {
                                    titleText: this.settings.yAxis.titleText,
                                    titleFontSize: this.settings.yAxis.titleFontSize,
                                    titleFontColor: this.settings.yAxis.titleFontColor
                                }
                            });
                        }
                        objectEnumeration.push({
                            objectName: objectName,
                            selector: null,
                            properties: {
                                horizontalGridLines: this.settings.yAxis.horizontalGridLines
                            }
                        });
                        if (this.settings.yAxis.horizontalGridLines) {
                            objectEnumeration.push({
                                objectName: objectName,
                                selector: null,
                                properties: {
                                    horizontalLineColor: this.settings.yAxis.horizontalLineColor,
                                    horizontalLineWidth: this.settings.yAxis.horizontalLineWidth
                                }
                            });
                        }
                        objectEnumeration.push({
                            objectName: objectName,
                            selector: null,
                            properties: {
                                secondaryYAxis: this.settings.yAxis.secondaryYAxis
                            }
                        });
                        if ( this.settings.yAxis.secondaryYAxis && renderLineFlag && renderBarFlag ) {
                            objectEnumeration.push({
                                objectName: objectName,
                                selector: null,
                                properties: {
                                    secondaryScaleType: this.settings.yAxis.secondaryScaleType,
                                    secondaryStartValue: this.settings.yAxis.secondaryStartValue,
                                    secondaryEndValue: this.settings.yAxis.secondaryEndValue,
                                    secFontSize: this.settings.yAxis.secFontSize,
                                    secondaryColor: this.settings.yAxis.secondaryColor,
                                    secondaryFontFamily: this.settings.yAxis.secondaryFontFamily,
                                    secondaryDisplayUnit: this.settings.yAxis.secondaryDisplayUnit,
                                    secondaryDecimalPoint: this.settings.yAxis.secondaryDecimalPoint,
                                    secondaryTitle: this.settings.yAxis.secondaryTitle
                                },
                                validValues: {
                                    secondaryDecimalPoint : {
                                        numberRange : {
                                            min: 0,
                                            max: 4
                                        }
                                    }
                                }
                            });
                            if (this.settings.yAxis.secondaryTitle) {
                                objectEnumeration.push({
                                    objectName: objectName,
                                    selector: null,
                                    properties: {
                                        secondaryTitleText: this.settings.yAxis.secondaryTitleText,
                                        secTitleFontSize: this.settings.yAxis.secTitleFontSize,
                                        secondaryTitleFontColor: this.settings.yAxis.secondaryTitleFontColor
                                    }
                                });
                            }
                        }
                    } else {
                        objectEnumeration.push({
                            objectName: objectName,
                            selector: null,
                            properties: {
                                show: this.settings.yAxis.show
                            }
                        });
                    }

                    return objectEnumeration;
                case 'dataLabels':
                    objectEnumeration.push({
                        objectName: objectName,
                        selector: null,
                        properties: {
                            show: this.settings.dataLabels.show
                        }
                    });
                    if (this.settings.dataLabels.show) {
                        objectEnumeration.push({
                            objectName: objectName,
                            selector: null,
                            properties: {
                                fontSize: this.settings.dataLabels.fontSize,
                                fontFamily: this.settings.dataLabels.fontFamily,
                                color: this.settings.dataLabels.color,
                                displayUnit: this.settings.dataLabels.displayUnit,
                                decimalPoints: this.settings.dataLabels.decimalPoints
                            },
                            validValues: {
                                decimalPoints : {
                                    numberRange : {
                                        min: 0,
                                        max: 4
                                    }
                                }
                            }
                        });
                    }

                    return objectEnumeration;
                case 'mileStone':
                    if ( mileStoneFlag ) {
                        if ( this.settings.mileStone.show ) {
                            objectEnumeration.push({
                                objectName: objectName,
                                selector: null,
                                properties: {
                                    show: this.settings.mileStone.show,
                                    opacity: this.settings.mileStone.opacity,
                                    lineWidth: this.settings.mileStone.lineWidth,
                                    lineStyle: this.settings.mileStone.lineStyle,
                                    fontFamily: this.settings.mileStone.fontFamily,
                                    fontSize: this.settings.mileStone.fontSize,
                                    verticalToggle: this.settings.mileStone.verticalToggle
                                },
                                validValues: {
                                    opacity : {
                                        numberRange : {
                                            min: 0,
                                            max: 100
                                        }
                                    }
                                }
                            });
                            if ( this.settings.mileStone.verticalToggle === 'vertical' ) {
                                objectEnumeration.push({
                                    objectName: objectName,
                                    selector: null,
                                    properties: {
                                        height: this.settings.mileStone.height
                                    }
                                });
                            }
                            if (mileStoneGroupFlag) {
                                objectEnumeration.push({
                                    objectName: objectName,
                                    selector: null,
                                    properties: {
                                        colorSettings: this.settings.mileStone.colorSettings
                                    }
                                });
                                if ( this.settings.mileStone.colorSettings === 'milestoneGroup' ) {
                                    for (let index: number = 0; index < mileStoneGroupData.length; index++) {
                                        objectEnumeration.push({
                                            objectName: objectName,
                                            displayName: mileStoneGroupData[index].name,
                                            properties: {
                                                fillColor: mileStoneGroupData[index].color
                                            },
                                            selector: mileStoneGroupData[index].selector.getSelector()
                                        });
                                    }
                                } else {
                                    for (let index: number = 0; index < mileStoneData.length; index++) {
                                        objectEnumeration.push({
                                            objectName: objectName,
                                            displayName: mileStoneData[index].name,
                                            properties: {
                                                fillColor: mileStoneData[index].color
                                            },
                                            selector: mileStoneData[index].selector.getSelector()
                                        });
                                    }
                                }
                            } else {
                                for (let index: number = 0; index < mileStoneData.length; index++) {
                                    objectEnumeration.push({
                                        objectName: objectName,
                                        displayName: mileStoneData[index].name,
                                        properties: {
                                            fillColor: mileStoneData[index].color
                                        },
                                        selector: mileStoneData[index].selector.getSelector()
                                    });
                                }
                            }
                        } else {
                            objectEnumeration.push({
                                objectName: objectName,
                                selector: null,
                                properties: {
                                    show: this.settings.mileStone.show
                                }
                            });
                        }
                    }

                    return objectEnumeration;
                case 'todayLine':
                    if (this.settings.todayLine.show && todayLineFlag) {
                        objectEnumeration.push({
                            objectName: objectName,
                            selector: null,
                            properties: {
                                show: this.settings.todayLine.show,
                                lineWidth: this.settings.todayLine.lineWidth,
                                lineStyle: this.settings.todayLine.lineStyle,
                                fillColor: this.settings.todayLine.fillColor,
                                fontSize: this.settings.todayLine.fontSize
                            }
                        });
                        if ( !categoryFlag ) {
                            objectEnumeration.push({
                                objectName: objectName,
                                selector: null,
                                properties: {
                                    labelPosition: this.settings.todayLine.labelPosition
                                }
                            });
                        }
                        objectEnumeration.push({
                            objectName: objectName,
                            selector: null,
                            properties: {
                                colorBeforeTodayToggle: this.settings.todayLine.colorBeforeTodayToggle
                            }
                        });
                        if ( this.settings.todayLine.colorBeforeTodayToggle && mileStoneFlag) {
                            objectEnumeration.push({
                                objectName: objectName,
                                selector: null,
                                properties: {
                                    colorBeforeToday: this.settings.todayLine.colorBeforeToday
                                }
                            });
                        }
                    } else if ( todayLineFlag ) {
                        objectEnumeration.push({
                            objectName: objectName,
                            selector: null,
                            properties: {
                                show: this.settings.todayLine.show
                            }
                        });
                    }

                    return objectEnumeration;
                default:
                    break;
            }

            return VisualSettings.enumerateObjectInstances(this.settings || VisualSettings.getDefault(), options);
        }
    }
}
