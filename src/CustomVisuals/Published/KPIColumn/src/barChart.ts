
module powerbi.extensibility.visual {

    import valueFormatter = powerbi.extensibility.utils.formatting.valueFormatter;
    import tooltipUtils = powerbi.extensibility.utils.tooltip;
    import ISelectionId = powerbi.visuals.ISelectionId;

    let fytargetChecker: boolean = false;
    let xAxisName: string = 'X-Axis';
    let yAxisName: string = 'Y-Axis';
    let columnValue: DataViewValueColumn;
  /* do not update*/
    export module DataViewObjects {
        /** Gets the value of the given object/property pair. */
        export function getValue<T>(objects: DataViewObjects, propertyId: DataViewObjectPropertyIdentifier, defaultValue?: T): T {

            if (!objects) { return defaultValue; }

            let objectOrMap: DataViewObject;
            objectOrMap = objects[propertyId.objectName];

            let object: DataViewObject;
            object = <DataViewObject>objectOrMap;

            return DataViewObject.getValue(object, propertyId.propertyName, defaultValue);
        }

        /** Gets an object from objects. */
        export function getObject(objects: DataViewObjects, objectName: string, defaultValue?: DataViewObject): DataViewObject {
            if (objects && objects[objectName]) {
                let object: DataViewObject;
                object = <DataViewObject>objects[objectName];

                return object;
            } else {
                return defaultValue;
            }
        }

        /** Gets a map of user-defined objects. */
        export function getUserDefinedObjects(objects: DataViewObjects, objectName: string): DataViewObjectMap {
            if (objects && objects[objectName]) {
                let map: DataViewObjectMap;
                map = <DataViewObjectMap>objects[objectName];

                return map;
            }
        }

        /** Gets the solid color from a fill property. */
        export function getFillColor(
            objects: DataViewObjects, propertyId: DataViewObjectPropertyIdentifier, defaultColor?: string): string {
            let value: Fill;
            value = getValue(objects, propertyId);
            if (!value || !value.solid) {
                return defaultColor;
            }

            return value.solid.color;
        }
    }

    export module DataViewObject {
        export function getValue<T>(object: DataViewObject, propertyName: string, defaultValue?: T): T {

            if (!object) { return defaultValue; }

            // tslint:disable-next-line:no-any
            let propertyValue: any;
            propertyValue = <T>object[propertyName];
            if (propertyValue === undefined) { return defaultValue; }

            return propertyValue;
        }

        /** Gets the solid color from a fill property using only a propertyName */
        export function getFillColorByPropertyName(objects: DataViewObjects, propertyName: string, defaultColor?: string): string {
            let value: Fill;
            value = DataViewObject.getValue(objects, propertyName);
            if (!value || !value.solid) { return defaultColor; }

            return value.solid.color;
        }

    }
    import ValueFormatter = powerbi.extensibility.utils.formatting.valueFormatter;
    import TextProperties = powerbi.extensibility.utils.formatting.TextProperties;
    import IValueFormatter = powerbi.extensibility.utils.formatting.IValueFormatter;
    import textMeasurementService = powerbi.extensibility.utils.formatting.textMeasurementService;
    /* do not update*/
    interface IBarChartViewModel {
        dataPoints: IBarChartDataPoint[];
        dataMax: number;
        dataMin: number;
        fytarget: number;
        settings: IBarChartSettings;
    }

    interface IBarChartDataPoint {

        value: PrimitiveValue;
        ytd: PrimitiveValue;
        forecasted: PrimitiveValue;
        category: string;
        color: string;
        selectionId: ISelectionId;
        // tslint:disable-next-line:no-any
        tooltip: any;
    }

    interface IIndividualTargetData {

        value: PrimitiveValue;
        ytd: PrimitiveValue;
        forecasted: PrimitiveValue;
        category: string;
        color: string;
        selectionId: ISelectionId;
        // tslint:disable-next-line:no-any
        tooltip: any;
    }

    interface IBarChartSettings {
        enableAxis: {
            show: boolean;
        };
    }

    // tslint:disable-next-line:no-any
    export let chartProperties: any = {
        enableAxis: {
            show: <DataViewObjectPropertyIdentifier>{ objectName: 'enableAxis', propertyName: 'show' }
        },
        legendSettings: {
            show: <DataViewObjectPropertyIdentifier>{ objectName: 'legend', propertyName: 'show' },
            labelSize: <DataViewObjectPropertyIdentifier>{ objectName: 'legend', propertyName: 'fontSize' },
            labelColor: <DataViewObjectPropertyIdentifier>{ objectName: 'legend', propertyName: 'labelColor' },
            title: <DataViewObjectPropertyIdentifier>{ objectName: 'legend', propertyName: 'title' },
            fontFamily: <DataViewObjectPropertyIdentifier>{ objectName: 'legend', propertyName: 'fontFamily' }
        },
        zoneSettings: {
            zone1Value: <DataViewObjectPropertyIdentifier>{ objectName: 'zoneSettings', propertyName: 'zone1Value' },
            zone2Value: <DataViewObjectPropertyIdentifier>{ objectName: 'zoneSettings', propertyName: 'zone2Value' },
            zone1Color: <DataViewObjectPropertyIdentifier>{ objectName: 'zoneSettings', propertyName: 'zone1Color' },
            zone2Color: <DataViewObjectPropertyIdentifier>{ objectName: 'zoneSettings', propertyName: 'zone2Color' },
            zone3Color: <DataViewObjectPropertyIdentifier>{ objectName: 'zoneSettings', propertyName: 'zone3Color' },
            defaultColor: <DataViewObjectPropertyIdentifier>{ objectName: 'zoneSettings', propertyName: 'defaultColor' }
        },
        yAxisConfig: {
            fontColor: <DataViewObjectPropertyIdentifier>{ objectName: 'yAxis', propertyName: 'fill' },
            decimalPlaces: <DataViewObjectPropertyIdentifier>{ objectName: 'yAxis', propertyName: 'decimalPlaces' },
            displayUnits: <DataViewObjectPropertyIdentifier>{ objectName: 'yAxis', propertyName: 'displayUnits' },
            fontSize: <DataViewObjectPropertyIdentifier>{ objectName: 'yAxis', propertyName: 'fontSize' },
            gridLines: <DataViewObjectPropertyIdentifier>{ objectName: 'yAxis', propertyName: 'gridLines' },
            title: <DataViewObjectPropertyIdentifier>{ objectName: 'yAxis', propertyName: 'title' },
            start: <DataViewObjectPropertyIdentifier>{ objectName: 'yAxis', propertyName: 'start' },
            end: <DataViewObjectPropertyIdentifier>{ objectName: 'yAxis', propertyName: 'end' },
            fontFamily: <DataViewObjectPropertyIdentifier>{ objectName: 'yAxis', propertyName: 'fontFamily' }
        },
        xAxisConfig: {
            fontColor: <DataViewObjectPropertyIdentifier>{ objectName: 'xAxis', propertyName: 'fill' },
            title: <DataViewObjectPropertyIdentifier>{ objectName: 'xAxis', propertyName: 'title' },
            fontSize: <DataViewObjectPropertyIdentifier>{ objectName: 'xAxis', propertyName: 'fontSize' },
            fontFamily: <DataViewObjectPropertyIdentifier>{ objectName: 'xAxis', propertyName: 'fontFamily' }
        },
        yTDConfig: {
            show: <DataViewObjectPropertyIdentifier>{ objectName: 'yTDTarget', propertyName: 'show' },
            lineColor: <DataViewObjectPropertyIdentifier>{ objectName: 'yTDTarget', propertyName: 'lineColor' },
            strokeSize: <DataViewObjectPropertyIdentifier>{ objectName: 'yTDTarget', propertyName: 'strokeSize' }
        },
        fullTargetConfig: {
            show: <DataViewObjectPropertyIdentifier>{ objectName: 'fullYearTarget', propertyName: 'show' },
            lineColor: <DataViewObjectPropertyIdentifier>{ objectName: 'fullYearTarget', propertyName: 'lineColor' },
            strokeSize: <DataViewObjectPropertyIdentifier>{ objectName: 'fullYearTarget', propertyName: 'strokeSize' }
        },
        dataLabels: {
            show: <DataViewObjectPropertyIdentifier>{ objectName: 'dataLabels', propertyName: 'show' },
            fontColor: <DataViewObjectPropertyIdentifier>{ objectName: 'dataLabels', propertyName: 'fontColor' },
            fontSize: <DataViewObjectPropertyIdentifier>{ objectName: 'dataLabels', propertyName: 'fontSize' },
            fontFamily: <DataViewObjectPropertyIdentifier>{ objectName: 'dataLabels', propertyName: 'fontFamily' },
            valueDecimal: <DataViewObjectPropertyIdentifier>{ objectName: 'dataLabels', propertyName: 'valueDecimal' },
            displayUnits: <DataViewObjectPropertyIdentifier>{ objectName: 'dataLabels', propertyName: 'displayUnits' },
            position: <DataViewObjectPropertyIdentifier>{ objectName: 'dataLabels', propertyName: 'position' }
        },
        analytics: {
            min: <DataViewObjectPropertyIdentifier>{ objectName: 'analytics', propertyName: 'min' },
            lineColorMin: <DataViewObjectPropertyIdentifier>{ objectName: 'analytics', propertyName: 'lineColorMin' },
            strokeSizeMin: <DataViewObjectPropertyIdentifier>{ objectName: 'analytics', propertyName: 'strokeSizeMin' },
            max: <DataViewObjectPropertyIdentifier>{ objectName: 'analytics', propertyName: 'max' },
            lineColorMax: <DataViewObjectPropertyIdentifier>{ objectName: 'analytics', propertyName: 'lineColorMax' },
            strokeSizeMax: <DataViewObjectPropertyIdentifier>{ objectName: 'analytics', propertyName: 'strokeSizeMax' },
            avg: <DataViewObjectPropertyIdentifier>{ objectName: 'analytics', propertyName: 'avg' },
            lineColorAvg: <DataViewObjectPropertyIdentifier>{ objectName: 'analytics', propertyName: 'lineColorAvg' },
            strokeSizeAvg: <DataViewObjectPropertyIdentifier>{ objectName: 'analytics', propertyName: 'strokeSizeAvg' },
            median: <DataViewObjectPropertyIdentifier>{ objectName: 'analytics', propertyName: 'median' },
            lineColorMedian: <DataViewObjectPropertyIdentifier>{ objectName: 'analytics', propertyName: 'lineColorMedian' },
            strokeSizeMedian: <DataViewObjectPropertyIdentifier>{ objectName: 'analytics', propertyName: 'strokeSizeMedian' }
        },
        horizontal: {
            show: <DataViewObjectPropertyIdentifier>{ objectName: 'horizontal', propertyName: 'show' }
        },
        animation: {
            show: <DataViewObjectPropertyIdentifier>{ objectName: 'animation', propertyName: 'show' }
        },
        backgroundImage: {
            show: <DataViewObjectPropertyIdentifier>{ objectName: 'backgroundImage', propertyName: 'show' },
            imageUrl: <DataViewObjectPropertyIdentifier>{ objectName: 'backgroundImage', propertyName: 'imageUrl' },
            transparency: <DataViewObjectPropertyIdentifier>{ objectName: 'backgroundImage', propertyName: 'transparency' }
        }
    };

    export interface IZoneSettings {
        zone1Value: number;
        zone2Value: number;
        zone1Color: string;
        zone2Color: string;
        zone3Color: string;
        defaultColor: string;
    }

    export interface IXAxisSettings {
        fontColor: string;
        fontSize: number;
        title: boolean;
        fontFamily: string;
    }
    export interface IYAxisSettings {
        fontColor: string;
        fontSize: number;
        decimalPlaces: number;
        displayUnits: number;
        gridLines: boolean;
        start: number;
        end: number;
        title: boolean;
        fontFamily: string;
    }

    export interface ITargetSettings {
        show: boolean;
        lineColor: string;
        strokeSize: number;
    }

    export interface ILegendSettings {
        show: boolean;
        labelSize: number;
        labelColor: string;
        title: boolean;
        fontFamily: string;
    }
    export interface IDataLabels {
        show: boolean;
        fontColor: string;
        fontSize: number;
        fontFamily: string;
        valueDecimal: number;
        displayUnits: number;
        position: string;
    }
    export interface IBackgroundImage {
        show: boolean;
        imageUrl: string;
        transparency: number;
    }
    export interface IAnalyticsSettings {
        min: boolean;
        lineColorMin: string;
        strokeSizeMin: number;
        max: boolean;
        lineColorMax: string;
        strokeSizeMax: number;
        avg: boolean;
        lineColorAvg: string;
        strokeSizeAvg: number;
        median: boolean;
        lineColorMedian: string;
        strokeSizeMedian: number;
    }
    export interface IHorizontal {
        show: boolean;
    }
    export interface IAnimation {
        show: boolean;
    }
    export interface ITooltipDataPoints {
        name: string;
        value: string;
    }
    // tslint:disable-next-line:cyclomatic-complexity
    function visualTransform(options: VisualUpdateOptions, host: IVisualHost, context: BarChart): IBarChartViewModel {
        let dataViews: DataView[];
        dataViews = options.dataViews;
        let zoneSettings: IZoneSettings;
        zoneSettings = context.getZoneSettings(dataViews[0]);
        let defaultSettings: IBarChartSettings;
        defaultSettings = {
            enableAxis: {
                show: false
            }
        };
        let viewModel: IBarChartViewModel;
        viewModel = {
            dataPoints: [],
            dataMax: 0,
            dataMin: 0,
            fytarget: 0,
            settings: <IBarChartSettings>{}
        };
        if (!dataViews
            || !dataViews[0]
            || !dataViews[0].categorical
            || !dataViews[0].categorical.categories
            || !dataViews[0].categorical.categories[0].source
            || !dataViews[0].categorical.values
            || !dataViews[0].metadata) { return viewModel; }
        let categorical: DataViewCategorical;
        categorical = dataViews[0].categorical;
        const iNumberOfCategory: number = categorical.categories.length;
        const iNumberOfValues: number = categorical.values.length;
        context.setYtdTarget = 0;
        let category: DataViewCategoryColumn = null;
        let forecasted: DataViewCategoryColumn = null;
        const tooltip: DataViewCategoryColumn = null;
        let categoryRoleLiteral: string;
        let forecastedRoleLiterral: string;
        let measureRoleLiteral: string;
        let fytargetLiteral: string;
        let ytdtargetLiteral: string;
        // tslint:disable-next-line:prefer-const, typedef
        columnValue = categorical.values[2];
        categoryRoleLiteral = 'category';
        forecastedRoleLiterral = 'forecasted';
        measureRoleLiteral = 'measure';
        fytargetLiteral = 'fytarget';
        ytdtargetLiteral = 'ytdtarget';
        const tooltipData: string = 'tooltipData';
        const tooltipValues: ITooltipDataPoints[] = [];
        const tooltipIndividualTargetValues: ITooltipDataPoints[] = [];
        let cnt: number = 0;
        let lengthValues: number = 1;
        for (let iCounter: number = 0; iCounter < iNumberOfCategory; iCounter++) {
            if (categorical.categories[iCounter].source.roles[categoryRoleLiteral]) {
                category = categorical.categories[iCounter];
            } else if (categorical.categories[iCounter].source.roles[forecastedRoleLiterral]) {
                forecasted = categorical.categories[iCounter];
            }
        }
        for (let iCounter: number = 0; iCounter < iNumberOfValues; iCounter++) {
            if (categorical.values[iCounter].source.roles[tooltipData]) {
                cnt++;
                lengthValues = categorical.values[iCounter].values.length;
                for (let jCnt: number = 0; jCnt < lengthValues; jCnt++) {
                    const tooltipDataPoint: ITooltipDataPoints = {
                        name: categorical.values[iCounter].source.displayName,
                        value: <string>categorical.values[iCounter].values[jCnt]
                    };
                    tooltipValues.push(tooltipDataPoint);
                }
            }
        }
        // tslint:disable-next-line:no-any
        const tooltips: any = [];
        xAxisName = categorical.categories[0].source.displayName;
        yAxisName = categorical.values[0].source.displayName;

        for (let j: number = 0; j < lengthValues; j++) {
            // tslint:disable-next-line:no-any
            const newValues: any = [];
            for (let iCnt: number = 0; iCnt < cnt; iCnt++) {
                if (iCnt === 0) {
                    newValues.push(tooltipValues[j]);
                } else {
                    newValues.push(tooltipValues[j + iCnt * lengthValues]);
                }
            }
            tooltips.push(newValues);
        }
        // tslint:disable-next-line:no-any
        const tooltipsIndividual: any = [];
        xAxisName = categorical.categories[0].source.displayName;
        yAxisName = categorical.values[0].source.displayName;

        for (let j: number = 0; j < lengthValues; j++) {
            // tslint:disable-next-line:no-any
            const newValues: any = [];
            for (let iCnt: number = 0; iCnt < cnt; iCnt++) {
                if (iCnt === 0) {
                    newValues.push(tooltipIndividualTargetValues[j]);
                } else {
                    newValues.push(tooltipIndividualTargetValues[j + iCnt * lengthValues]);
                }
            }
            tooltipsIndividual.push(newValues);
        }
        // tslint:disable-next-line:no-any
        let values: any = [];

        let dataValue: DataViewValueColumn = null;
        let fytarget: PrimitiveValue = null;
        let targetValue: DataViewValueColumn = null;
        let sum: number = 0;
        let length: number = 0;
        for (let iCounter: number = 0; iCounter < iNumberOfValues; iCounter++) {
            if (categorical.values[iCounter].source.roles[measureRoleLiteral]) {
                length = categorical.values[iCounter].values.length;
                // tslint:disable-next-line:no-any
                categorical.values[iCounter].values.forEach(function (d: any, iVal: number): void {
                    if (iVal === 0) {
                        context.min = d;
                        context.max = d;
                    }
                    if (d < context.min) {
                        context.min = d;
                    }
                    if (d > context.max) {
                        context.max = d;
                    }
                    values.push(d);
                    sum = sum + d;
                });
                BarChart.thisObj.measureFormat = options.dataViews[0].categorical.values[iCounter].source.format;
                dataValue = categorical.values[iCounter];
            } else if (categorical.values[iCounter].source.roles[fytargetLiteral]) {
                fytarget = categorical.values[iCounter].maxLocal;
                context.isTargetAvailable = true;
                context.targetText = categorical.values[iCounter].source.displayName ? categorical.values[iCounter].source.displayName : '';
            } else if (categorical.values[iCounter].source.roles[ytdtargetLiteral]) {
                BarChart.thisObj.targetFormat = options.dataViews[0].categorical.values[iCounter].source.format;
                context.setYtdTarget = 1;
                targetValue = categorical.values[iCounter];
                context.isITAvailable = true;
                context.itText = categorical.values[iCounter].source.displayName ? categorical.values[iCounter].source.displayName : '';
            }
        }
        values = values.sort();
        const median: number = 0;
        if (values.length % 2 === 0) {
            context.median = (values[values.length / 2 - 1] + values[values.length / 2]) / 2;
        } else {
            context.median = values[Math.floor(values.length / 2)];
        }
        context.average = sum / length;
        let barChartDataPoints: IBarChartDataPoint[];
        barChartDataPoints = [];
        let dataMax: number;
        let dataMin: number;
        let objects: DataViewObjects;
        objects = dataViews[0].metadata.objects;
        let barChartSettings: IBarChartSettings;
        barChartSettings = {
            enableAxis: {
                show: getValue<boolean>(objects, 'enableAxis', 'show', defaultSettings.enableAxis.show)
            }
        };
        let i: number;
        i = 0;
        let len: number = 0;
        for (i = 0, len = Math.max(category.values.length, dataValue.values.length); i < len; i++) {
            let defaultColor: string;
            if (targetValue) {
                let colorValue: number;
                colorValue = <number>dataValue.values[i] / (<number>targetValue.values[i]);
                if (colorValue < zoneSettings.zone1Value / 100) {
                    defaultColor = zoneSettings.zone1Color;
                } else if (colorValue < zoneSettings.zone2Value / 100) {
                    defaultColor = zoneSettings.zone2Color;
                } else {
                    defaultColor = zoneSettings.zone3Color;
                }
            } else {
                defaultColor = zoneSettings.defaultColor;
            }
            let formatter: IValueFormatter;

            formatter = ValueFormatter.create({ format: options.dataViews[0].categorical.categories[0].source.format });
            const newValues: ITooltipDataPoints[] = [];
            for (let j: number = 0; j < cnt; j++) {
                if (j === 0) {
                    newValues.push(tooltipValues[i]);
                } else {
                    newValues.push(tooltipValues[i + j * lengthValues]);
                }
            }
            barChartDataPoints.push({
                category: formatter.format(category.values[i]),
                forecasted: forecasted ? forecasted.values[i] : null,
                value: dataValue.values[i],
                ytd: targetValue ? targetValue.values[i] : null,
                color: defaultColor,
                selectionId: host.createSelectionIdBuilder()
                    .withCategory(category, i)
                    .createSelectionId(),
                tooltip: newValues

            });
        }
        const fontstyle: string = 'Segoe UI,wf_segoe-ui_normal,helvetica,arial,sans-serif';
        let xAxisHeight: void;
        xAxisHeight =
            category.values.forEach((element: number) => {
                // tslint:disable-next-line:no-any
                let measureTextProperties: any;
                measureTextProperties = {
                    text: category.values[element],
                    fontFamily: fontstyle,
                    fontSize: '12px'
                };
                let xAxisWidth: number;
                xAxisWidth = textMeasurementService.measureSvgTextWidth(measureTextProperties);
            });
        let yAxisHeight: void;
        yAxisHeight =
            category.values.forEach((element: number) => {
                // tslint:disable-next-line:no-any
                let measureTextProperties: any;
                measureTextProperties = {
                    text: category.values[element],
                    fontFamily: fontstyle,
                    fontSize: '12px'
                };
                let yAxisWidth: number;
                yAxisWidth = textMeasurementService.measureSvgTextWidth(measureTextProperties);
            });
        let dataValMax: number = 0;
        let targetValMax: number = 0;
        let fytargetValMax: number = 0;
        let dataValMin: number = 0;
        let targetValMin: number = 0;
        let fytargetValMin: number = 0;
        if (!!dataValue && !!dataValue.maxLocal) {
            dataValMax = <number>dataValue.maxLocal;
        }
        if (!!targetValue && !!targetValue.maxLocal) {
            targetValMax = <number>targetValue.maxLocal;
        }
        if (fytarget) {
            fytargetValMax = <number>fytarget;
        }
        if (!!dataValue && !!dataValue.minLocal) {
            dataValMin = <number>dataValue.minLocal;
        }
        if (!!targetValue && !!targetValue.minLocal) {
            targetValMin = <number>targetValue.minLocal;
        }
        if (fytarget) {
            fytargetValMin = <number>fytarget;
        }
        dataMax = Math.max(dataValMax, targetValMax, fytargetValMax);
        dataMin = Math.min(dataValMin, targetValMin, fytargetValMin);

        return {
            dataPoints: barChartDataPoints,
            dataMax: dataMax,
            dataMin: dataMin,
            fytarget: <number>fytarget,
            settings: barChartSettings
        };
    }

    export class BarChart implements IVisual {
        private svg: d3.Selection<SVGElement>;
        private host: IVisualHost;
        private selectionManager: ISelectionManager;
        private barChartContainer: d3.Selection<SVGElement>;
        private barContainer: d3.Selection<SVGElement>;
        private xAxis: d3.Selection<SVGElement>;
        private targetLines: d3.Selection<SVGElement>;
        private yAxis: d3.Selection<SVGElement>;
        private barDataPoints: IBarChartDataPoint[];
        private barChartSettings: IBarChartSettings;
        private tooltipServiceWrapper: tooltipUtils.ITooltipServiceWrapper;
        private locale: string;
        private dataViews: DataView;
        private xAxisFormatter: IValueFormatter;
        private yAxisFormatter: IValueFormatter;
        public setYtdTarget: number;
        private baseDiv: d3.Selection<SVGElement>;
        private rootDiv: d3.Selection<SVGElement>;
        // objects to handle selections
        private barSelection: d3.selection.Update<IBarChartDataPoint>;
        private barforecastedSelection: d3.selection.Update<IBarChartDataPoint>;
        // tslint:disable-next-line:no-any
        private bars: any;
        // tslint:disable-next-line:no-any
        private barforecasted: any;
        public measureFormat: string;
        public targetFormat: string;
        public isTargetAvailable: boolean;
        public targetText: string;
        public isITAvailable: boolean;
        public itText: string;
        public static thisObj: BarChart;
        public min: number = 0;
        public max: number = 0;
        public average: number = 0;
        public median: number = 0;
        public bContainer: d3.Selection<SVGElement>;
        public yMin: number = 0;
        public yMax: number = 0;
        // tslint:disable-next-line:no-any
        public static config: any = {
            xScalePadding: 0.1,
            yScalePadding: 0.1,
            solidOpacity: 1,
            transparentOpacity: 0.5,
            forecastedSolidOpacity: 0.6,
            forecastedTransparentOpacity: 0.4,
            margins: {
                top: 0,
                right: 0,
                bottom: 90,
                left: 50
            },
            xAxisFontMultiplier: 0.04
        };

        public getDecimalPlacesCount(value: string): number {
            let decimalPlaces: number = 0;
            if (value && value.split('.').length > 1) {
                decimalPlaces = value.split('.')[1].length;
            }

            return decimalPlaces;
        }

        constructor(options: VisualConstructorOptions) {
            this.host = options.host;
            this.selectionManager = options.host.createSelectionManager();
            this.selectionManager.registerOnSelectCallback(() => {
                this.barSelection = this.bars;
                this.barforecastedSelection = this.barforecasted;
                this.syncSelectionState(
                    this.barSelection,
                    this.barforecastedSelection,
                    this.selectionManager.getSelectionIds() as ISelectionId[]
                );
            });

            this.tooltipServiceWrapper = tooltipUtils.createTooltipServiceWrapper(this.host.tooltipService, options.element);

            this.rootDiv = d3.select(options.element)
                .append('div')
                .classed('rootDiv', true);

            this.rootDiv.append('div')
                .classed('legend', true);

            this.baseDiv = this.rootDiv
                .append('div')
                .classed('baseDiv', true);

            let svg: d3.Selection<SVGElement>;
            svg = this.svg = this.baseDiv
                .append('svg')
                .classed('barChart', true)
                .style('width', 0);

            this.locale = options.host.locale;

            this.yAxis = svg.append('g')
                .classed('yAxis', true);

            this.xAxis = svg.append('g')
                .classed('xAxis', true);

            this.barContainer = svg.append('g')
                .classed('barContainer', true);

            this.targetLines = svg.append('g')
                .classed('targetLines', true);
        }

        // tslint:disable-next-line:cyclomatic-complexity
        public update(options: VisualUpdateOptions): void {
            const thisObj: this = this;
            this.svg.attr({
                width: 0,
                height: 0
            });
            $('#textToDisplay').remove();
            this.baseDiv.style('width', 0);
            this.svg.selectAll('.yTitle').remove();
            this.svg.selectAll('.xTitle').remove();
            const fontstyle: string = 'Segoe UI,wf_segoe-ui_normal,helvetica,arial,sans-serif';
            let measureRoleLiteral: string;
            let ytdtargetLiteral: string;
            let pxLiteral: string;
            let doubleSpaceLiteral: string;
            const transitionDuration: number = 1000;
            const marginForLegend: number = 60;
            const labelYVal: number = 5;
            measureRoleLiteral = 'measure';
            ytdtargetLiteral = 'ytdtarget';
            pxLiteral = 'px';
            doubleSpaceLiteral = '  ';
            BarChart.thisObj = this;
            this.isITAvailable = false;
            this.itText = '';
            this.targetText = '';
            this.isTargetAvailable = false;
            let dataView: DataView;
            dataView = this.dataViews = options.dataViews[0];
            this.xAxis.selectAll('*').remove();
            this.yAxis.selectAll('*').remove();
            this.targetLines.selectAll('*').remove();
            this.svg.selectAll('.barContainer').selectAll('*').remove();
            let iNumberOfValues: number = -1;
            let iNumberOfCategory: number = -1;
            if (dataView.categorical.values) {
                iNumberOfValues = dataView.categorical.values.length;
            }
            if (dataView.categorical.categories) {
                iNumberOfCategory = dataView.categorical.categories.length;
            }
            let iIndex: number;
            let iIndexOfCategory: number = -1;
            let iIndexOfForecasted: number = -1;
            let iIndexOfYtd: number = -1;
            this.rootDiv.selectAll
                ('.legend .yTDTargetLegend,.legend .fullYearTargetLegend, .minLegend, .maxLegend, .avgLegend, .medianLegend').remove();
            if (iNumberOfValues !== -1) {
                for (let iCounter: number = 0; iCounter < iNumberOfValues; iCounter++) {
                    if (dataView.categorical.values[iCounter].source.roles[measureRoleLiteral]) {
                        this.measureFormat = options.dataViews[0].categorical.values[iCounter].source.format;

                    } else if (dataView.categorical.values[iCounter].source.roles[ytdtargetLiteral]) {
                        this.targetFormat = options.dataViews[0].categorical.values[iCounter].source.format;

                    }
                }
            }
            // assigning proper index for category KPI Name
            if (iNumberOfCategory !== -1) {
                for (iIndex = 0; iIndex < iNumberOfCategory; iIndex++) {
                    if (dataView.categorical.categories[iIndex].source.roles[`category`]) {
                        iIndexOfCategory = iIndex;
                    } else if (dataView.categorical.categories[iIndex].source.roles[`forecasted`]) {
                        iIndexOfForecasted = iIndex;
                    }
                }
            }
            // assigning proper index for measures
            if (iNumberOfValues !== -1) {
                for (iIndex = 0; iIndex < iNumberOfValues; iIndex++) {
                    // assigning index for measure KPI Current Value
                    if (dataView.categorical.values[iIndex].source.roles[`measure`]) { // assigning index for measure KPI Last Value
                        iIndexOfYtd = iIndex;
                    }
                }
            }
            if (iIndexOfCategory === -1 && iIndexOfYtd === -1) {
                this.displayBasicRequirement(0);

                return;
            } else if (iIndexOfCategory === -1) {
                this.displayBasicRequirement(1);
            } else if (iIndexOfYtd === -1) {
                this.displayBasicRequirement(2);

                return;
            }
            // if status column has values other than 0 and 1
            if (iIndexOfForecasted !== -1) {
                const oStatusData: PrimitiveValue[] = dataView.categorical.categories[iIndexOfForecasted].values;
                const iLengthOfData: number = oStatusData.length;
                for (iIndex = 0; iIndex < iLengthOfData; iIndex++) {
                    if (oStatusData[iIndex] === null || !(oStatusData[iIndex] === 1 ||
                        oStatusData[iIndex] === 0)) {
                        this.displayBasicRequirement(3);

                        return;
                    }
                }
            }
            this.min = 0;
            this.max = 0;
            if (options.viewport.height > 100) {
                let viewModel: IBarChartViewModel;
                viewModel = visualTransform(options, this.host, this);
                this.yMin = viewModel.dataMin;
                this.yMax = viewModel.dataMax;
                let settings: IBarChartSettings;
                settings = this.barChartSettings = viewModel.settings;
                this.barDataPoints = viewModel.dataPoints;
                let width: number = options.viewport.width;
                let height: number = options.viewport.height;
                const xAxisConfig: IXAxisSettings = this.getXAxisSettings(this.dataViews);
                const yAxisConfig: IYAxisSettings = this.getYAxisSettings(this.dataViews);
                const fullTargetConfig: ITargetSettings = this.getFullTargetSettings(this.dataViews);
                const yTDTargetConfig: ITargetSettings = this.getYTDSettings(this.dataViews);
                const legendSettings: ILegendSettings = this.getLegendSettings(this.dataViews);
                const dataLabels: IDataLabels = this.getDataLabelSettings(this.dataViews);
                const analytics: IAnalyticsSettings = this.getAnalyticsSettings(this.dataViews);
                const horizontal: IHorizontal = this.getHorizontalSettings(this.dataViews);
                const animation: IAnimation = this.getAnimationSettings(this.dataViews);
                const backgroundImage: IBackgroundImage = this.getBackgroundImageSettings(this.dataViews);
                let legendHeight: number = 0;
                let legendNumber: number = 0;
                if (legendSettings.show) {
                        if (analytics.min || analytics.max || analytics.avg) {
                            legendNumber = legendNumber + 1;
                        }
                        let legendItemWidth: number;
                        if (this.isITAvailable && this.isTargetAvailable) {
                            legendNumber = legendNumber + 2;
                            legendItemWidth = (options.viewport.width) / 2 - marginForLegend > 0
                                ? (options.viewport.width) / 2 - marginForLegend : 0;
                        } else {
                            legendNumber = legendNumber + 1;
                            legendItemWidth = options.viewport.width - legendSettings.labelSize - (marginForLegend / 2);
                        }

                        // this is for solid line
                        let iTargetText: string = this.isITAvailable ? this.itText : '';
                        let ytdtargetTextProps: TextProperties;
                        ytdtargetTextProps = {
                            text: iTargetText,
                            fontFamily: legendSettings.fontFamily,
                            fontSize: legendSettings.labelSize + pxLiteral
                        };
                        iTargetText = textMeasurementService.getTailoredTextOrDefault(ytdtargetTextProps, legendItemWidth);
                        let ytdtargetHeight: number;
                        ytdtargetHeight = textMeasurementService.measureSvgTextHeight(ytdtargetTextProps);

                        // this is for dashed line
                        let fyTargetText: string = this.isTargetAvailable ? this.targetText : '';
                        let fytargetTextProps: TextProperties;
                        fytargetTextProps = {
                            text: fyTargetText,
                            fontFamily: legendSettings.fontFamily,
                            fontSize: legendSettings.labelSize + pxLiteral
                        };
                        fyTargetText = textMeasurementService.getTailoredTextOrDefault(fytargetTextProps, legendItemWidth);
                        let fyTargetTextHeight: number;
                        fyTargetTextHeight = textMeasurementService.measureSvgTextHeight(fytargetTextProps);

                        if (this.isITAvailable && yTDTargetConfig.show) {
                            // this is for solid line
                            legendHeight = ytdtargetHeight;
                            this.rootDiv.select('.legend')
                                .append('div')
                                .classed('yTDTargetLegend', true)
                                .append('span')
                                .classed('legendInnerPart', true)
                                .style({
                                    'margin-top': ytdtargetHeight / 2 + pxLiteral,
                                    width: legendSettings.labelSize + pxLiteral,
                                    'background-color': legendSettings.labelColor,
                                    'font-family': legendSettings.fontFamily
                                })
                                .attr('title', this.itText);
                            if (legendSettings.title) {
                                // this is for individual target legend
                                this.rootDiv.select('.legend div')
                                    .append('span')
                                    .classed('legendInnerPart', true)
                                    .text(doubleSpaceLiteral + iTargetText)
                                    .attr('title', this.itText)
                                    .style({
                                        'font-size': legendSettings.labelSize + pxLiteral,
                                        color: legendSettings.labelColor,
                                        'font-family': legendSettings.fontFamily,
                                        'max-width': legendItemWidth + pxLiteral,
                                        height: legendHeight + pxLiteral
                                    });
                            }
                        }
                        if (this.isTargetAvailable && fullTargetConfig.show) {
                            legendHeight = fyTargetTextHeight;
                            // this is for dashed line
                            this.rootDiv.select('.legend')
                                .append('div')
                                .classed('fullYearTargetLegend', true)
                                .append('span')
                                .text('---')
                                .classed('legendInnerPart', true)
                                .style({
                                    color: legendSettings.labelColor,
                                    'line-height': fyTargetTextHeight + pxLiteral,
                                    'font-size': legendSettings.labelSize + pxLiteral,
                                    'font-family': legendSettings.fontFamily
                                })
                                .attr('title', this.targetText);
                        }
                        if (legendSettings.title) {
                            // this is for target legend
                            this.rootDiv.select('.legend .fullYearTargetLegend')
                                .append('span')
                                .classed('legendInnerPart', true)
                                .text(fyTargetText)
                                .attr('title', this.targetText)
                                .style({
                                    'font-size': legendSettings.labelSize + pxLiteral,
                                    color: legendSettings.labelColor,
                                    'font-family': legendSettings.fontFamily,
                                    'max-width': legendItemWidth + pxLiteral,
                                    height: fyTargetTextHeight + pxLiteral
                                });
                        }
                        if (analytics.min) {
                            let minLineText: string = 'Min';
                            let minLineProp: TextProperties;
                            minLineProp = {
                                text: 'Min',
                                fontFamily: legendSettings.fontFamily,
                                fontSize: legendSettings.labelSize + pxLiteral
                            };
                            minLineText = textMeasurementService.getTailoredTextOrDefault(minLineProp, legendItemWidth);
                            const minLineTextHeight: number = textMeasurementService.measureSvgTextHeight(minLineProp);
                            this.rootDiv.select('.legend')
                                .append('div')
                                .classed('minLegend', true)
                                .style({
                                    'max-width': options.viewport.width / 2 + pxLiteral
                                })
                                .append('span')
                                .classed('legendInnerPart', true)
                                .style({
                                    'margin-top': ytdtargetHeight / 2 + pxLiteral,
                                    width: legendSettings.labelSize + pxLiteral,
                                    'background-color': analytics.lineColorMin,
                                    'font-family': legendSettings.fontFamily
                                })
                                .attr('title', 'Min Line');
                            if (legendSettings.title) {
                                this.rootDiv.select('.legend .minLegend')
                                    .append('span')
                                    .classed('legendInnerPart', true)
                                    .text(minLineText)
                                    .attr('title', 'Min')
                                    .style({
                                        'font-size': legendSettings.labelSize + pxLiteral,
                                        color: legendSettings.labelColor,
                                        'font-family': legendSettings.fontFamily,
                                        'max-width': legendItemWidth + pxLiteral,
                                        height: minLineTextHeight + pxLiteral
                                    });
                            }
                        }
                        if (analytics.max) {
                            let maxLineText: string = 'Max';
                            let maxLineProp: TextProperties;
                            maxLineProp = {
                                text: 'Max',
                                fontFamily: legendSettings.fontFamily,
                                fontSize: legendSettings.labelSize + pxLiteral
                            };
                            maxLineText = textMeasurementService.getTailoredTextOrDefault(maxLineProp, legendItemWidth);
                            let maxLineTextHeight: number;
                            maxLineTextHeight = textMeasurementService.measureSvgTextHeight(maxLineProp);

                            this.rootDiv.select('.legend')
                                .append('div')
                                .classed('maxLegend', true)
                                .style({
                                    'max-width': options.viewport.width / 2 + pxLiteral
                                })
                                .append('span')
                                .classed('legendInnerPart', true)
                                .style({
                                    'margin-top': ytdtargetHeight / 2 + pxLiteral,
                                    width: legendSettings.labelSize + pxLiteral,
                                    'background-color': analytics.lineColorMax,
                                    'font-family': legendSettings.fontFamily
                                })
                                .attr('title', 'Max Line');
                            if (legendSettings.title) {
                                this.rootDiv.select('.legend .maxLegend')
                                    .append('span')
                                    .classed('legendInnerPart', true)
                                    .text(maxLineText)
                                    .attr('title', 'Max')
                                    .style({
                                        'font-size': legendSettings.labelSize + pxLiteral,
                                        color: legendSettings.labelColor,
                                        'font-family': legendSettings.fontFamily,
                                        'max-width': legendItemWidth + pxLiteral,
                                        height: maxLineTextHeight + pxLiteral
                                    });
                            }
                        }
                        if (analytics.avg) {
                            let avgLineText: string = 'Avg';
                            let avgLineProp: TextProperties;
                            avgLineProp = {
                                text: 'Avg',
                                fontFamily: legendSettings.fontFamily,
                                fontSize: legendSettings.labelSize + pxLiteral
                            };
                            avgLineText = textMeasurementService.getTailoredTextOrDefault(avgLineProp, legendItemWidth);
                            let avgLineTextHeight: number;
                            avgLineTextHeight = textMeasurementService.measureSvgTextHeight(avgLineProp);
                            this.rootDiv.select('.legend')
                                .append('div')
                                .classed('avgLegend', true)
                                .style({
                                    'max-width': options.viewport.width / 2 + pxLiteral
                                })
                                .append('span')
                                .classed('legendInnerPart', true)
                                .style({
                                    'margin-top': ytdtargetHeight / 2 + pxLiteral,
                                    width: legendSettings.labelSize + pxLiteral,
                                    'background-color': analytics.lineColorAvg,
                                    'font-family': legendSettings.fontFamily
                                })
                                .attr('title', 'Average Line');
                            if (legendSettings.title) {
                                this.rootDiv.select('.legend .avgLegend')
                                    .append('span')
                                    .classed('legendInnerPart', true)
                                    .text(avgLineText)
                                    .attr('title', 'Average')
                                    .style({
                                        'font-size': legendSettings.labelSize + pxLiteral,
                                        color: legendSettings.labelColor,
                                        'font-family': legendSettings.fontFamily,
                                        'max-width': legendItemWidth + pxLiteral,
                                        height: avgLineTextHeight + pxLiteral
                                    });
                            }
                        }
                        if (analytics.median) {
                            let medianLineText: string = 'Median';
                            let medianLineProp: TextProperties;
                            medianLineProp = {
                                text: 'Median',
                                fontFamily: legendSettings.fontFamily,
                                fontSize: legendSettings.labelSize + pxLiteral
                            };
                            medianLineText = textMeasurementService.getTailoredTextOrDefault(medianLineProp, legendItemWidth);
                            let medianLineTextHeight: number;
                            medianLineTextHeight = textMeasurementService.measureSvgTextHeight(medianLineProp);
                            this.rootDiv.select('.legend')
                                .append('div')
                                .classed('medianLegend', true)
                                .style({
                                    'max-width': options.viewport.width / 2 + pxLiteral
                                })
                                .append('span')
                                .classed('legendInnerPart', true)
                                .style({
                                    'margin-top': ytdtargetHeight / 2 + pxLiteral,
                                    width: legendSettings.labelSize + pxLiteral,
                                    'background-color': analytics.lineColorMedian,
                                    'font-family': legendSettings.fontFamily
                                })
                                .attr('title', 'Median Line');
                            if (legendSettings.title) {
                                this.rootDiv.select('.legend .medianLegend')
                                    .append('span')
                                    .classed('legendInnerPart', true)
                                    .text(medianLineText)
                                    .attr('title', 'Median')
                                    .style({
                                        'font-size': legendSettings.labelSize + pxLiteral,
                                        color: legendSettings.labelColor,
                                        'font-family': legendSettings.fontFamily,
                                        'max-width': legendItemWidth + pxLiteral,
                                        height: medianLineTextHeight + pxLiteral
                                    });
                            }
                        }
                    }
                const legendInnerPart: JQuery = $('.legendInnerPart');
                if (legendInnerPart.length > 0) {
                        const dimension: ClientRect = $(legendInnerPart)[legendInnerPart.length - 1].getBoundingClientRect();
                        legendHeight = dimension.height + dimension.top;
                    } else {
                        legendHeight = 0;
                    }
                height = height - legendHeight > 0 ? height - legendHeight : 0;
                this.svg.attr({
                        width: width,
                        height: height
                    });

                    // tslint:disable-next-line:no-any
                let margins: any;
                margins = BarChart.config.margins;
                height -= margins.bottom;

                let displayVal: number = 0;
                if (yAxisConfig.displayUnits === 0) {
                        const valLen: number = viewModel.dataMax.toString().length;
                        displayVal = this.getAutoDisplayUnits(valLen);
                    }
                if (options.dataViews[0].categorical.values[0].source.format &&
                        options.dataViews[0].categorical.values[0].source.format.indexOf('%') !== -1) {
                        this.yAxisFormatter = valueFormatter.create({
                            format: options.dataViews[0].categorical.values[0].source.format,
                            value: yAxisConfig.displayUnits === 0 ? 0 : yAxisConfig.displayUnits,
                            precision: yAxisConfig.decimalPlaces
                        });
                    } else {
                        this.yAxisFormatter = valueFormatter.create({
                            format: options.dataViews[0].categorical.values[0].source.format,
                            value: yAxisConfig.displayUnits === 0 ? displayVal : yAxisConfig.displayUnits,
                            precision: yAxisConfig.decimalPlaces
                        });
                    }
                let formattedMaxMeasure: string;
                const yAxisStartLength: number = yAxisConfig.start.toString().length;
                const yAxisEndLength: number = yAxisConfig.end.toString().length;
                const yAxisFormatMaxValue: number = yAxisStartLength > yAxisEndLength ? yAxisConfig.start : yAxisConfig.end;
                const dataSetMaxLength: number = viewModel.dataMax.toString().length;
                const dataSetMinLength: number = viewModel.dataMin.toString().length;
                const dataSetFormatMaxValue: number = dataSetMaxLength > dataSetMinLength ? viewModel.dataMax : viewModel.dataMin;
                const maxValue: number = yAxisFormatMaxValue.toString().length > dataSetFormatMaxValue.toString().length
                        ? yAxisFormatMaxValue : dataSetFormatMaxValue;
                formattedMaxMeasure = this.yAxisFormatter.format(parseFloat(maxValue.toString()) * 1.3);
                let measureTextProperties: TextProperties;
                measureTextProperties = {
                        text: formattedMaxMeasure,
                        fontFamily: fontstyle,
                        fontSize: '12px'
                    };
                const yAxisWidth: number = textMeasurementService.measureSvgTextWidth(measureTextProperties);
                margins.left = yAxisWidth + 10;
                this.yAxis.classed('yAxis', true).style({
                        fill: yAxisConfig.fontColor
                    });
                fytargetChecker = false;
                if (viewModel.fytarget) {
                        fytargetChecker = true;
                    }
                this.xAxis.classed('xAxis', true).style({
                        fill: xAxisConfig.fontColor
                    });
                    // tslint:disable-next-line:no-any
                let xScale: any;
                let xAxis: d3.svg.Axis;
                let barWidths: number;
                    // tslint:disable-next-line:no-any
                let yScale: any;
                    // tslint:disable-next-line:no-any
                let yAxis: any;
                    // tslint:disable-next-line:no-any
                let lineDataPoints: any;
                let linePoints: string = '';
                let ytdLine: d3.Selection<SVGElement>;
                let minVisibleBarWidth: number = 19;
                const marginForWidth: number = 25;
                let barOrigin: number = 0;
                const minWidthForHorizontal: number = 800;
                const widthForScroll: number = 20;
                const minHeightForHorizontal: number = 330;
                const minWidthForVertical: number = 40;
                const minHeightForVertical: number = 70;
                const marginForXAxis: number = 40;
                const marginForyAxis: number = 50;
                const marginForYAxis: number = 70;
                const marginForDataLabel: number = 10;
                const parseIntValue: number = 10;
                const horizontalEndRange: number = 10;
                const textWordBreakWidth: number = 50;
                const textTailoredWidth: number = 70;
                if (yAxisConfig.start > 0) {
                        barOrigin = <number>yAxisConfig.start;
                    }
                if (horizontal.show) {
                        // hide overflow initially
                        this.rootDiv.style('overflow-y', 'auto').style('overflow-x', 'hidden');
                        margins.left = 30;
                        xScale = d3.scale.ordinal()
                            .domain(viewModel.dataPoints.reverse().map((d: IBarChartDataPoint) => d.category))
                            .rangeBands([height, horizontalEndRange], 0.2, 0.3);

                        barWidths = xScale.rangeBand();
                        let scrollableHeight: number;
                        let flag: boolean = true;
                        const axisDisplayHeight: number = 50;
                        if (barWidths < minVisibleBarWidth) {
                            barWidths = minVisibleBarWidth;
                            height = minHeightForHorizontal;
                            scrollableHeight = height;
                            xScale.rangeBands([scrollableHeight, horizontalEndRange], 0.2, 0.3);
                        } else {
                            scrollableHeight = height;
                            flag = false;
                            xScale.rangeBands([scrollableHeight, horizontalEndRange], 0.2, 0.3);
                        }
                        this.rootDiv.select('.barChart').style('height', (scrollableHeight + axisDisplayHeight) + pxLiteral);
                        this.rootDiv.select('.baseDiv').style('height', (scrollableHeight + axisDisplayHeight) + pxLiteral);
                        if (width < minWidthForHorizontal) {
                            width = minWidthForHorizontal;
                        }
                        this.rootDiv.select('.baseDiv').style('width', (width - widthForScroll) + pxLiteral);
                        this.rootDiv.select('.barChart').style('width', (width - widthForScroll) + pxLiteral);

                        let xAxisTitleShift: number = 0;
                        const xAxisTitleMargin: number = 140;
                        const xAxisTitleXPosition: number = 17;

                        if (xAxisConfig.title) {
                            xAxisTitleShift = xAxisConfig.fontSize * 1.2;
                            innerWidth -= margins.left;
                            this.svg.append('text')
                                .classed('xTitle', true)
                                .text(xAxisName)
                                .attr('transform', `translate(${xAxisTitleXPosition},
                                    ${(scrollableHeight + xAxisTitleMargin) / 2}) rotate(-90)`)
                                .style({
                                    'max-width': options.viewport.width / 2 + pxLiteral,
                                    'font-size': xAxisConfig.fontSize + pxLiteral,
                                    color: xAxisConfig.fontColor,
                                    'font-family': xAxisConfig.fontFamily
                                })
                                .append('title').text(xAxisName);
                        }
                        // Y scale
                        if (width <= minWidthForHorizontal) {
                            //set overflow to auto when width gets lower than limit
                            this.rootDiv.style('overflow-x', 'auto');
                            const endRange: number = width;
                            yScale = d3.scale.linear()
                                .domain([(<number>yAxisConfig.start), <number>(yAxisConfig.end) * 1.12])
                                .range([margins.left, endRange - margins.left - marginForYAxis]);
                        } else {
                            const endRange: number = width;
                            yScale = d3.scale.linear()
                                .domain([(<number>yAxisConfig.start), <number>(yAxisConfig.end) * 1.12])
                                .range([margins.left, endRange - margins.left]);
                        }

                        const displayRightAdjuster: number = 18 + xAxisTitleShift;
                        const rightShift: number = 70 + xAxisTitleShift;
                        const fyTargetLineStartShift: number = marginForWidth + xAxisTitleShift;
                        const fyTargetTextStartShift: number = 15;
                        const analyticsStartAdjust: number = 8;
                        const analyticsEndAdjust: number = 12 + xAxisTitleShift;
                        const analyticsTextAdjust: number = analyticsStartAdjust + 2;

                        let xTargetAxis: d3.Selection<SVGElement>;
                        xTargetAxis = this.targetLines.append('line')
                            .classed('xTargetAxis', true);
                        if (fullTargetConfig.show && viewModel.fytarget) {
                            let yVal: number;
                            yVal = yScale(<number>viewModel.fytarget);
                            xTargetAxis.attr({
                                x1: yVal + rightShift + pxLiteral,
                                y1: 0,
                                x2: yVal + rightShift + pxLiteral,
                                y2: scrollableHeight + pxLiteral,
                                stroke: fullTargetConfig.lineColor,
                                'stroke-width': fullTargetConfig.strokeSize
                            })
                                .append('title')
                                .text(viewModel.fytarget);

                            let targetLineDataLabel: d3.Selection<SVGElement>;
                            targetLineDataLabel = this.targetLines.append('text').text(this.yAxisFormatter.format(viewModel.fytarget))
                                .classed('TargetdataLabel', true);
                            targetLineDataLabel.attr({
                                x: yVal - labelYVal - displayRightAdjuster + rightShift + xAxisTitleShift + pxLiteral,
                                y: margins.left - analyticsTextAdjust + pxLiteral,
                                fill: fullTargetConfig.lineColor
                            });
                            targetLineDataLabel.append('title').text(viewModel.fytarget);
                        }

                        if (analytics.min) {
                            let minLine: d3.Selection<SVGElement>;
                            minLine = this.targetLines.append('line')
                                .classed('minLine', true);
                            let yValMin: number;
                            yValMin = yScale(<number>this.min);
                            minLine.attr({
                                x1: yValMin + rightShift + pxLiteral,
                                y1: 0,
                                x2: yValMin + rightShift + pxLiteral,
                                y2: scrollableHeight + pxLiteral,
                                stroke: analytics.lineColorMin,
                                'stroke-width': analytics.strokeSizeMin
                            });
                            let minLinedataLabel: d3.Selection<SVGElement>;
                            minLinedataLabel = this.targetLines.append('text').text(this.yAxisFormatter.format(this.min))
                                .classed('minLinedataLabel', true);
                            minLinedataLabel.attr({
                                x: yValMin - labelYVal - displayRightAdjuster + rightShift + xAxisTitleShift + pxLiteral,
                                y: margins.left - analyticsTextAdjust + pxLiteral,
                                fill: analytics.lineColorMin
                            });
                            if (this.min === this.yMin) {
                                minLinedataLabel.attr({
                                    x: yValMin - labelYVal - displayRightAdjuster + rightShift
                                        + xAxisTitleShift + marginForWidth + pxLiteral
                                });
                            }
                            minLinedataLabel.append('title').text(this.min);
                        }

                        if (analytics.max) {
                            let maxLine: d3.Selection<SVGElement>;
                            maxLine = this.targetLines.append('line')
                                .classed('maxLine', true);
                            let yValMax: number;
                            yValMax = yScale(<number>this.max);
                            maxLine.attr({
                                x1: yValMax + rightShift + pxLiteral,
                                y1: 0,
                                x2: yValMax + rightShift + pxLiteral,
                                y2: scrollableHeight + pxLiteral,
                                stroke: analytics.lineColorMax,
                                'stroke-width': analytics.strokeSizeMax
                            });
                            let maxLinedataLabel: d3.Selection<SVGElement>;
                            maxLinedataLabel = this.targetLines.append('text').text(this.yAxisFormatter.format(this.max))
                                .classed('maxLinedataLabel', true);
                            maxLinedataLabel.attr({
                                x: yValMax - labelYVal - displayRightAdjuster + rightShift + xAxisTitleShift + pxLiteral,
                                y: margins.left - analyticsTextAdjust + pxLiteral,
                                fill: analytics.lineColorMax
                            });
                            maxLinedataLabel.append('title').text(this.max);
                        }

                        if (analytics.avg) {
                            let avgLine: d3.Selection<SVGElement>;
                            avgLine = this.targetLines.append('line')
                                .classed('avgLine', true);
                            let yValAvg: number;
                            yValAvg = yScale(<number>this.average);
                            avgLine.attr({
                                x1: yValAvg + rightShift + pxLiteral,
                                y1: 0,
                                x2: yValAvg + rightShift + pxLiteral,
                                y2: scrollableHeight + pxLiteral,
                                stroke: analytics.lineColorAvg,
                                'stroke-width': analytics.strokeSizeAvg
                            });
                            let avgLinedataLabel: d3.Selection<SVGElement>;
                            avgLinedataLabel = this.targetLines.append('text').text(this.yAxisFormatter.format(this.average))
                                .classed('maxLinedataLabel', true);
                            avgLinedataLabel.attr({
                                x: yValAvg - labelYVal - displayRightAdjuster + rightShift + xAxisTitleShift + pxLiteral,
                                y: margins.left - analyticsTextAdjust + pxLiteral,
                                fill: analytics.lineColorAvg
                            });
                            avgLinedataLabel.append('title').text(this.average);
                        }

                        if (analytics.median) {
                            let medianLine: d3.Selection<SVGElement>;
                            medianLine = this.targetLines.append('line')
                                .classed('medianLine', true);
                            // tslint:disable-next-line:no-any
                            let yValMedian: any;
                            yValMedian = yScale(<number>this.median);
                            medianLine.attr({
                                x1: yValMedian + rightShift + pxLiteral,
                                y1: 0,
                                x2: yValMedian + rightShift + pxLiteral,
                                y2: scrollableHeight + pxLiteral,
                                stroke: analytics.lineColorMedian,
                                'stroke-width': analytics.strokeSizeMedian
                            });
                            let medianLinedataLabel: d3.Selection<SVGElement>;
                            medianLinedataLabel = this.targetLines.append('text').text(this.yAxisFormatter.format(this.median))
                                .classed('medianLinedataLabel', true);
                            medianLinedataLabel.attr({
                                x: yValMedian - labelYVal - displayRightAdjuster + rightShift + xAxisTitleShift + pxLiteral,
                                y: margins.left - analyticsTextAdjust + pxLiteral,
                                fill: analytics.lineColorMedian
                            });
                            medianLinedataLabel.append('title').text(this.median);
                        }
                        this.svg.selectAll('.xAxisText').remove();
                        // Format Y Axis labels and render Y Axis labels
                        yAxis = d3.svg.axis()
                            .scale(yScale)
                            .orient('bottom')
                            .tickFormat(this.yAxisFormatter.format)
                            .ticks(options.viewport.height / 80);

                        const translate: number = margins.left;
                        const translateHeight: string = `translate(${rightShift},${scrollableHeight})`;
                        this.yAxis.attr('transform', translateHeight)
                            .call(yAxis);

                        this.yAxis.selectAll('path').classed('path', true);
                        // Draw Y Axis grid lines
                        let yTitleTooltip: IValueFormatter;
                        yTitleTooltip = valueFormatter.create({
                            format: options.dataViews[0].categorical.values[0].source.format
                        });
                        // tslint:disable-next-line:no-any
                        let yTicks: any;
                        yTicks = this.svg.selectAll('.yAxis .tick');
                        yTicks.append('title')
                            .text((d: string) => {
                                return yTitleTooltip.format(d);
                            });
                        const adjustBar: number = 30;
                        let tickLeng: number;
                        tickLeng = yTicks.size();
                        let i: number = 0;
                        for (i = 0; i < tickLeng; i++) {
                            let yCoordinate: string;
                            yCoordinate = yTicks[0][i].getAttribute('transform')
                                .substring(10, yTicks[0][i].getAttribute('transform').length - 3);
                            if (parseFloat(yCoordinate) !==
                                (viewModel.fytarget && yScale(<number>viewModel.fytarget)) || !fullTargetConfig.show) {
                                if (yAxisConfig.gridLines) {
                                    this.xAxis.append('line')
                                        .classed('yAxisGrid', true).attr({
                                            x1: parseInt(yCoordinate, parseIntValue) - adjustBar + pxLiteral,
                                            y1: 0,
                                            x2: parseInt(yCoordinate, parseIntValue) - adjustBar + pxLiteral,
                                            y2: scrollableHeight + pxLiteral
                                        });
                                }
                            }
                        }

                        const adjustedHeight: number = height + 80;
                        const marginsForYAxisTitle: number = 50;
                        if (yAxisConfig.title) {
                            this.svg.append('text')
                                .classed('yTitle', true)
                                .text(yAxisName)
                                .attr('transform', `translate(${yScale(yAxisConfig.end) / 2 + marginsForYAxisTitle},
                                ${scrollableHeight + axisDisplayHeight})`)
                                .style({
                                    'font-size': yAxisConfig.fontSize + pxLiteral,
                                    color: yAxisConfig.fontColor,
                                    'font-family': yAxisConfig.fontFamily
                                })
                                .append('title').text(yAxisName);
                        }

                        // tslint:disable-next-line:no-any
                        const chartBackground: any = this.barContainer.append('image')
                            .attr('xlink:href', backgroundImage.imageUrl);

                        let barData: IBarChartDataPoint[];
                        barData = [];
                        let barforecastedData: IBarChartDataPoint[];
                        barforecastedData = [];
                        let circleData: IBarChartDataPoint[];
                        circleData = [];
                        let len: number = viewModel.dataPoints.length;
                        for (i = 0; i < len; i++) {
                            if (viewModel.dataPoints[i].forecasted !== 1) {
                                barData.push(viewModel.dataPoints[i]);
                            } else {
                                barforecastedData.push(viewModel.dataPoints[i]);
                            }
                            circleData.push(viewModel.dataPoints[i]);
                        }
                        this.bars = this.barContainer.selectAll('.bar').data(barData);
                        this.barforecasted = this.barContainer.selectAll('.barforecasted').data(barforecastedData);
                        if (animation.show) {
                            this.bars.enter()
                                .reverse()
                                .append('rect')
                                .classed('bar', true);
                            this.bars.attr({
                                width: 0,
                                height: xScale.rangeBand(),
                                // tslint:disable-next-line:no-any
                                y: function (d: any): any { return xScale(d.category) + pxLiteral; },
                                // tslint:disable-next-line:typedef
                                x: d => d.value > 0 ? yScale(barOrigin) + rightShift + pxLiteral
                                    : yScale(<number>d.value) + rightShift + pxLiteral,
                                // tslint:disable-next-line:no-any
                                fill: (d: any): void => d.color
                            })
                                .transition()
                                .duration(transitionDuration)
                                .ease('linear')
                                .attr({
                                    // tslint:disable-next-line:no-any
                                    y: function (d: any): any {
                                        return xScale(<number>d.category);
                                    },
                                    // tslint:disable-next-line:typedef
                                    width: d => d.value > 0 ? yScale(<number>d.value) - yScale(barOrigin)
                                        : yScale(barOrigin) - yScale(d.value)
                                });
                            this.barforecasted.enter()
                                .reverse()
                                .append('rect')
                                .classed('barforecasted', true);

                            this.barforecasted.attr({
                                width: 0,
                                // tslint:disable-next-line:no-any
                                height: xScale.rangeBand(),
                                // tslint:disable-next-line:no-any
                                y: function (d: any): any { return xScale(d.category) + pxLiteral; },
                                // tslint:disable-next-line:typedef
                                x: d => d.value > 0 ? yScale(barOrigin) + rightShift + pxLiteral
                                    : yScale(<number>d.value) + rightShift + pxLiteral,
                                // tslint:disable-next-line:no-any
                                fill: (d: any): any => d.color,
                                // tslint:disable-next-line:no-any
                                stroke: (d: any): any => d.color
                            })
                                .transition()
                                .duration(transitionDuration)
                                .ease('linear')
                                .attr({
                                    // tslint:disable-next-line:no-any
                                    y: function (d: any): any {
                                        return xScale(d.category);
                                    },
                                    // tslint:disable-next-line:typedef
                                    width: d => d.value > 0 ? yScale(<number>d.value) - yScale(barOrigin)
                                        : yScale(barOrigin) - yScale(d.value)
                                });
                        } else {

                            this.bars.enter()
                                .reverse()
                                .append('rect')
                                .classed('bar', true);

                            this.bars.attr({
                                width: 0,
                                height: xScale.rangeBand(),
                                // tslint:disable-next-line:no-any
                                y: function (d: any): any { return xScale(d.category); },
                                // tslint:disable-next-line:typedef
                                x: d => d.value > 0 ? yScale(barOrigin) + rightShift
                                    : yScale(<number>d.value) + rightShift,
                                // tslint:disable-next-line:no-any
                                fill: (d: any): void => d.color
                            })
                                .attr({
                                    // tslint:disable-next-line:no-any
                                    y: function (d: any): any {
                                        return xScale(<number>d.category);
                                    },
                                    // tslint:disable-next-line:typedef
                                    width: d => d.value > 0 ? yScale(<number>d.value) - yScale(barOrigin)
                                        : yScale(barOrigin) - yScale(d.value)
                                });
                            this.barforecasted.enter()
                                .reverse()
                                .append('rect')
                                .classed('barforecasted', true);

                            this.barforecasted.attr({
                                width: 0,
                                // tslint:disable-next-line:no-any
                                height: xScale.rangeBand(),
                                // tslint:disable-next-line:no-any
                                y: function (d: any): any { return xScale(d.category); },
                                // tslint:disable-next-line:typedef
                                x: d => d.value > 0 ? yScale(barOrigin) + rightShift
                                    : yScale(<number>d.value) + rightShift,
                                // tslint:disable-next-line:no-any
                                fill: (d: any): any => d.color,
                                // tslint:disable-next-line:no-any
                                stroke: (d: any): any => d.color
                            })
                                .attr({
                                    // tslint:disable-next-line:no-any
                                    y: function (d: any): any {
                                        return xScale(d.category);
                                    },
                                    // tslint:disable-next-line:typedef
                                    width: d => d.value > 0 ?  yScale(<number>d.value) - yScale(barOrigin)
                                        : yScale(barOrigin) - yScale(d.value)
                                });
                        }

                        // tslint:disable-next-line:no-any
                        this.barforecasted.on('click', function (d: any): void {
                            // Allow selection only if the visual is rendered in a view that supports interactivity (e.g. Report)
                            if (allowInteractions) {
                                selectionManager.select(d.selectionId).then((ids: ISelectionId[]) => {
                                    thisObj.barSelection = thisObj.bars;
                                    thisObj.barforecastedSelection = thisObj.barforecasted;
                                    thisObj.syncSelectionState(thisObj.barSelection, thisObj.barforecastedSelection, ids);
                                });
                                (<Event>d3.event).stopPropagation();
                            }
                        });

                        // This must be an anonymous function instead of a lambda because
                        // d3 uses 'this' as the reference to the element that was clicked.
                        // tslint:disable-next-line:no-any
                        this.bars.on('click', function (d: any): void {
                            // Allow selection only if the visual is rendered in a view that supports interactivity (e.g. Report)
                            if (allowInteractions) {
                                selectionManager.select(d.selectionId).then((ids: ISelectionId[]) => {
                                    thisObj.barSelection = thisObj.bars;
                                    thisObj.barforecastedSelection = thisObj.barforecasted;
                                    thisObj.syncSelectionState(thisObj.barSelection, thisObj.barforecastedSelection, ids);
                                });
                                (<Event>d3.event).stopPropagation();
                            }
                        });

                        this.bars.exit()
                            .remove();

                        this.barforecasted.exit()
                            .remove();

                        const imageRightMargin: number = 100 + xAxisTitleShift;

                        chartBackground.attr({
                            x: margins.left + rightShift,
                            y: 0,
                            height: scrollableHeight + pxLiteral,
                            width: (width - imageRightMargin) + pxLiteral,
                            opacity: backgroundImage.transparency / 100,
                            preserveAspectRatio: 'none'
                        });

                        lineDataPoints = [];
                        for (i = 0, len = viewModel.dataPoints.length; i < len; i++) {
                            if (viewModel.dataPoints[i].ytd || viewModel.dataPoints[i].ytd === 0) {
                                lineDataPoints.push({
                                    x1: xScale(viewModel.dataPoints[i].category) + (xScale.rangeBand() / 2),
                                    y1: yScale(<number>viewModel.dataPoints[i].ytd)
                                });
                            }
                        }

                        for (i = 0; i < lineDataPoints.length; i++) {
                            if (yTDTargetConfig.show) {
                                let circle: d3.Selection<SVGElement>;
                                circle = this.targetLines.append('circle').classed('circle', true)
                                    .attr({
                                        cx: lineDataPoints[i].y1 + rightShift,
                                        cy: lineDataPoints[i].x1,
                                        r: yTDTargetConfig.strokeSize + 1
                                    });
                            }
                            linePoints += `${lineDataPoints[i].y1 + rightShift},${lineDataPoints[i].x1} `;
                        }
                        // tslint:disable-next-line:no-any
                        const circles: any = this.targetLines.selectAll('.circle').data(circleData);

                        if (yTDTargetConfig.show) {
                            ytdLine = this.targetLines.append('polyline');
                            ytdLine.attr({
                                stroke: yTDTargetConfig.lineColor,
                                'stroke-width': yTDTargetConfig.strokeSize,
                                points: linePoints,
                                fill: 'none'
                            });
                        }

                        // X-axis
                        xAxis = d3.svg.axis()
                            .scale(xScale)
                            .orient('left');

                        const xAxisShift: number = 100 + xAxisTitleShift;

                        const translateLeft: string = `translate(${xAxisShift},0)`;

                        this.xAxis.attr('transform', translateLeft)
                            .call(xAxis);
                        this.xAxis.selectAll('path').classed('path', true);

                        this.svg.selectAll('.xAxis .tick').append('title')
                            // tslint:disable-next-line:no-any
                            .text(function (d: any): string {
                                return d.toString();
                            });
                        if (barWidths < minHeightForVertical) {
                            this.xAxis.attr('transform', translateLeft);
                            this.svg.selectAll('.xAxis .tick text')
                                // tslint:disable-next-line:no-any
                                .text(function (d: any): string {
                                    if (d.toString().length <= 13) {
                                        return d.toString();
                                    } else {
                                        let textProperties: TextProperties;
                                        textProperties = {
                                            text: d.toString(),
                                            fontFamily: 'sans-serif',
                                            fontSize: '12px'
                                        };

                                        return textMeasurementService.getTailoredTextOrDefault(textProperties, textTailoredWidth);
                                    }
                                })
                                .style('text-anchor', 'end');
                        } else {
                            const boxes: d3.Selection<SVGElement> = this.svg.selectAll('.barContainer rect');
                            const adjustedbarWidthValue: number = 90;
                            if (boxes[0].length) {
                                const barWidthValue: number = parseInt(boxes.attr('width'), parseIntValue) + adjustedbarWidthValue;
                                // tslint:disable-next-line:no-any
                                let xTicksLabels: any;
                                xTicksLabels = this.svg.selectAll('.xAxis .tick text')[0];
                                len = xTicksLabels.length - 1;
                                while (len >= 0) {
                                    // tslint:disable-next-line:no-any
                                    let xAxisLabel: any;
                                    xAxisLabel = xTicksLabels[len];
                                    xAxisLabel.style.textAnchor = 'left';
                                    textMeasurementService.wordBreak(xAxisLabel, barWidthValue, textWordBreakWidth);
                                    len--;
                                }
                            }
                        }

                        if (dataLabels.show) {
                            let measureFormat: string;
                            measureFormat = this.measureFormat;
                            let targetLinesHeight: string;
                            targetLinesHeight = $('.xTargetAxis').attr('y1');
                            let displayValLabels: number;
                            if (dataLabels.displayUnits === 0) {
                                const valLen: number = viewModel.dataMax.toString().length;
                                displayValLabels = this.getAutoDisplayUnits(valLen);
                            }
                            let formatter: IValueFormatter;
                            formatter = ValueFormatter.create({
                                format: measureFormat ? measureFormat : ValueFormatter.DefaultNumericFormat,
                                value: dataLabels.displayUnits === 0 ? displayValLabels : dataLabels.displayUnits,
                                precision: dataLabels.valueDecimal
                            });
                            const centerDataLabelAdjust: number = 90;
                            const endDataLabelAdjust: number = 15;
                            const baseDataLabelAdjust: number = 10;
                            const barMiddleAdjust: number = 3;
                            const yCoordinateAdjust: number = 62;
                            // tslint:disable-next-line:no-any
                            let labelMargin: any;

                            labelMargin = { top: 20, right: 10, left: 2 };
                            this.barContainer
                                .append('g')
                                .classed('labelGraphicContext', true)
                                .selectAll('text')
                                .data(viewModel.dataPoints)
                                .enter()
                                .append('text')
                                .classed('dataLabel', true)
                                .style('fill', dataLabels.fontColor)
                                // tslint:disable-next-line:no-any
                                .text(function (d: any): string {
                                    let labelFormattedText: string;
                                    labelFormattedText = formatter.format(d.value);
                                    let textproperties: TextProperties;
                                    textproperties = {
                                        text: labelFormattedText,
                                        fontFamily: dataLabels.fontFamily,
                                        fontSize: dataLabels.fontSize + pxLiteral
                                    };
                                    const dataTextHeight: number = textMeasurementService.measureSvgTextHeight(textproperties);
                                    // tslint:disable-next-line:typedef
                                    let barheight : number;
                                    barheight =  d.value > 0 ? yScale(<number>d.value) - yScale(barOrigin)
                                    : yScale(barOrigin) - yScale(d.value);
                                    // tslint:disable-next-line:no-unused-expression
                                    textproperties.text =  barheight < dataTextHeight ? '' : textproperties.text;

                                    return textMeasurementService.getTailoredTextOrDefault(textproperties, 50);
                                })
                                .attr({
                                    // tslint:disable-next-line:no-any
                                    x: (d: any): any => d.value >= 0 ?
                                        (
                                            dataLabels.position === 'insideCenter' ?  d.value === 0 ?
                                            yScale(barOrigin) + (dataLabels.fontSize / 2) + baseDataLabelAdjust + rightShift :
                                            (yScale(<number>d.value) + yScale(barOrigin)) / 2
                                            + centerDataLabelAdjust :
                                            dataLabels.position === 'insideEnd' ? d.value === 0 ?
                                            yScale(barOrigin) + (dataLabels.fontSize / 2) + baseDataLabelAdjust + rightShift :
                                             yScale(<number>d.value) + yCoordinateAdjust
                                                + (dataLabels.fontSize / 2) :
                                                yScale(barOrigin) + (dataLabels.fontSize / 2) + baseDataLabelAdjust + rightShift)
                                        : (dataLabels.position === 'insideCenter' ? d.value === 0 ?
                                        yScale(barOrigin) - (dataLabels.fontSize / 2) + rightShift - marginForDataLabel :
                                            ((yScale(<number>d.value) + yScale(barOrigin)) / 2) + rightShift :
                                            dataLabels.position === 'insideEnd' ? d.value === 0 ?
                                            yScale(barOrigin) - (dataLabels.fontSize / 2) + rightShift - marginForDataLabel  :
                                             yScale(<number>d.value) + endDataLabelAdjust
                                                + rightShift :
                                                yScale(barOrigin) - (dataLabels.fontSize / 2) + rightShift - marginForDataLabel),
                                    // tslint:disable-next-line:no-any
                                    y: (d: any): any => xScale(d.category) + xScale.rangeBand() / 2 + barMiddleAdjust,
                                    // tslint:disable-next-line:no-any
                                    dataBarY: (d: any): any => yScale(<number>d.value) + yCoordinateAdjust,
                                    'font-size': dataLabels.fontSize + pxLiteral,
                                    'font-family': dataLabels.fontFamily
                                }).append('title').text((d: IBarChartDataPoint): number => <number>d.value);
                            $('.labelGraphicContext').find('text').each(function (): void {
                                let labelWidth: number;
                                labelWidth = dataLabels.fontSize / 2;
                                let barlabel: string;
                                barlabel = $(this).attr('x');
                                // tslint:disable-next-line:no-any
                                const yValue: any = $(this).attr('dataBarY');
                                const yNum: number = parseInt(yValue, parseIntValue);
                                let diff: number;
                                diff = parseInt(barlabel, parseIntValue) - 0;
                                if (diff < labelWidth) {
                                    $(this).attr('x', parseInt(barlabel, parseIntValue));
                                }
                            });
                        }

                        this.tooltipServiceWrapper.addTooltip(
                            this.barContainer.selectAll('.bar,.barforecasted'),
                            (tooltipEvent: tooltipUtils.TooltipEventArgs<number>) => this.getTooltipData(tooltipEvent.data),
                            (tooltipEvent: tooltipUtils.TooltipEventArgs<number>) => null);
                        this.tooltipServiceWrapper.addTooltip(this.targetLines.selectAll('.circle'),
                                                              (tooltipEvent: tooltipUtils.TooltipEventArgs<number>) =>
                                this.getTooltipIndividualTargetData(tooltipEvent.data),
                                                              (tooltipEvent: tooltipUtils.TooltipEventArgs<number>) => null);

                        let selectionManager: ISelectionManager;
                        selectionManager = this.selectionManager;
                        let allowInteractions: boolean;
                        allowInteractions = this.host.allowInteractions;

                    } else {
                        //set overflow hidden initially
                        this.rootDiv.style('overflow-y', 'hidden').style('overflow-x', 'hidden');
                        xScale = d3.scale.ordinal()
                            .domain(viewModel.dataPoints.map((d: IBarChartDataPoint) => d.category))
                            .rangeBands([margins.left, width], 0.2, 0.3);

                        barWidths = xScale.rangeBand();
                        let dynamicWidth: number;

                        if (yAxisConfig.title) {
                            margins.left += marginForyAxis;
                        }

                        minVisibleBarWidth = 17;
                        if (barWidths < minVisibleBarWidth) {
                            // setting overflow to auto when width is less
                            this.rootDiv.style('overflow-x', 'auto');
                            dynamicWidth = width + (viewModel.dataPoints.length * (minVisibleBarWidth - barWidths)) - widthForScroll;
                            xScale.rangeBands([margins.left, dynamicWidth], 0.2, 0.3);
                            this.rootDiv.select('.baseDiv').style('width', dynamicWidth + pxLiteral);
                            this.rootDiv.select('.barChart').style('width', dynamicWidth + pxLiteral);
                            // shifting up to give space to scroll bar
                            height = height - widthForScroll;
                        } else {
                            dynamicWidth = width;
                            xScale.rangeBands([margins.left, dynamicWidth], 0.2, 0.3);
                            this.rootDiv.select('.baseDiv').style('width', dynamicWidth + pxLiteral);
                            this.rootDiv.select('.barChart').style('width', dynamicWidth + pxLiteral);
                        }

                        yScale = d3.scale.linear()
                            .domain([(<number>yAxisConfig.start), <number>yAxisConfig.end * 1.1])
                            .range([(<number>height), horizontalEndRange]);

                        if (d3.select('.rootDiv')[0][0] !== null || d3.select('.rootDiv')[0][0] !== undefined) {
                            this.rootDiv.select('.barChart').style('height', $(d3.select('.rootDiv')[0][0]).height() + pxLiteral);
                        }

                        let xTargetAxis: d3.Selection<SVGElement>;
                        xTargetAxis = this.targetLines.append('line')
                            .classed('xTargetAxis', true);
                        if (fullTargetConfig.show && viewModel.fytarget) {
                            let yVal: number;
                            yVal = yScale(<number>viewModel.fytarget);
                            xTargetAxis.attr({
                                x1: margins.left,
                                y1: yVal,
                                x2: dynamicWidth,
                                y2: yVal,
                                stroke: fullTargetConfig.lineColor,
                                'stroke-width': fullTargetConfig.strokeSize
                            })
                                .append('title')
                                .text(viewModel.fytarget);

                            let targetLineDataLabel: d3.Selection<SVGElement>;
                            targetLineDataLabel = this.targetLines.append('text').text(this.yAxisFormatter.format(viewModel.fytarget))
                                .classed('TargetdataLabel', true);
                            targetLineDataLabel.attr({
                                x: margins.left,
                                y: yVal - labelYVal,
                                fill: fullTargetConfig.lineColor
                            });
                            targetLineDataLabel.append('title').text(viewModel.fytarget);
                        }
                        if (analytics.min) {
                            let minLine: d3.Selection<SVGElement>;
                            minLine = this.targetLines.append('line')
                                .classed('minLine', true);
                            let yValMin: number;
                            yValMin = yScale(<number>this.min);
                            minLine.attr({
                                x1: margins.left,
                                y1: yValMin,
                                x2: dynamicWidth,
                                y2: yValMin,
                                stroke: analytics.lineColorMin,
                                'stroke-width': analytics.strokeSizeMin
                            });

                            let minLinedataLabel: d3.Selection<SVGElement>;
                            minLinedataLabel = this.targetLines.append('text').text(this.yAxisFormatter.format(this.min))
                                .classed('minLinedataLabel', true);
                            minLinedataLabel.attr({
                                x: margins.left,
                                y: yValMin - labelYVal,
                                fill: analytics.lineColorMin
                            });
                            minLinedataLabel.append('title').text(this.min);
                        }
                        if (analytics.max) {
                            let maxLine: d3.Selection<SVGElement>;
                            maxLine = this.targetLines.append('line')
                                .classed('maxLine', true);
                            let yValMax: number;
                            yValMax = yScale(<number>this.max);
                            maxLine.attr({
                                x1: margins.left,
                                y1: yValMax,
                                x2: dynamicWidth,
                                y2: yValMax,
                                stroke: analytics.lineColorMax,
                                'stroke-width': analytics.strokeSizeMax
                            });

                            let maxLinedataLabel: d3.Selection<SVGElement>;
                            maxLinedataLabel = this.targetLines.append('text').text(this.yAxisFormatter.format(this.max))
                                .classed('maxLinedataLabel', true);
                            maxLinedataLabel.attr({
                                x: margins.left,
                                y: yValMax - labelYVal,
                                fill: analytics.lineColorMax
                            });
                            maxLinedataLabel.append('title').text(this.max);
                        }
                        if (analytics.avg) {
                            let avgLine: d3.Selection<SVGElement>;
                            avgLine = this.targetLines.append('line')
                                .classed('avgLine', true);
                            let yValAvg: number;
                            yValAvg = yScale(<number>this.average);
                            avgLine.attr({
                                x1: margins.left,
                                y1: yValAvg,
                                x2: dynamicWidth,
                                y2: yValAvg,
                                stroke: analytics.lineColorAvg,
                                'stroke-width': analytics.strokeSizeAvg
                            });

                            let avgLinedataLabel: d3.Selection<SVGElement>;
                            avgLinedataLabel = this.targetLines.append('text').text(this.yAxisFormatter.format(this.average))
                                .classed('maxLinedataLabel', true);
                            avgLinedataLabel.attr({
                                x: margins.left,
                                y: yValAvg - labelYVal,
                                fill: analytics.lineColorAvg
                            });
                            avgLinedataLabel.append('title').text(this.average);
                        }
                        if (analytics.median) {
                            let medianLine: d3.Selection<SVGElement>;
                            medianLine = this.targetLines.append('line')
                                .classed('medianLine', true);
                            // tslint:disable-next-line:no-any
                            let yValMedian: any;
                            yValMedian = yScale(<number>this.median);
                            medianLine.attr({
                                x1: margins.left,
                                y1: yValMedian,
                                x2: dynamicWidth,
                                y2: yValMedian,
                                stroke: analytics.lineColorMedian,
                                'stroke-width': analytics.strokeSizeMedian
                            });

                            let medianLinedataLabel: d3.Selection<SVGElement>;
                            medianLinedataLabel = this.targetLines.append('text').text(this.yAxisFormatter.format(this.median))
                                .classed('medianLinedataLabel', true);
                            medianLinedataLabel.attr({
                                x: margins.left,
                                y: yValMedian - labelYVal,
                                fill: analytics.lineColorMedian
                            });
                            medianLinedataLabel.append('title').text(this.median);
                        }
                        this.svg.selectAll('.xAxisText').remove();

                        // Format Y Axis labels and render Y Axis labels
                        yAxis = d3.svg.axis()
                            .scale(yScale)
                            .orient('left')
                            .tickFormat(this.yAxisFormatter.format)
                            .ticks(options.viewport.height / 80);

                        const translate: number = margins.left;
                        const translateLeft: string = `translate( ${translate},0)`;
                        const yTitleXCoordinate: number = 40;
                        if (yAxisConfig.title) {
                            this.svg.append('text')
                                .classed('yTitle', true)
                                .text(yAxisName)
                                .attr('transform', `translate(${yTitleXCoordinate},
                                    ${height / 2 + marginForXAxis}) rotate(-90)`)
                                .style({
                                    'max-width': options.viewport.width / 2 + pxLiteral,
                                    'font-size': yAxisConfig.fontSize + pxLiteral,
                                    color: yAxisConfig.fontColor,
                                    'font-family': yAxisConfig.fontFamily
                                })
                                .append('title').text(yAxisName);
                        }
                        const adjustedHeight: number = height + 80;
                        if (xAxisConfig.title) {
                            this.svg.append('text')
                                .classed('xTitle', true)
                                .text(xAxisName)
                                .attr('transform', `translate(${dynamicWidth / 2},${adjustedHeight})`)
                                .style({
                                    'font-size': xAxisConfig.fontSize + pxLiteral,
                                    color: xAxisConfig.fontColor,
                                    'font-family': xAxisConfig.fontFamily
                                })
                                .append('title').text(xAxisName);
                        }

                        this.yAxis.attr('transform', translateLeft)
                            .call(yAxis);

                        this.yAxis.selectAll('path').classed('path', true);
                        // Draw Y Axis grid lines
                        let yTitleTooltip: IValueFormatter;
                        yTitleTooltip = valueFormatter.create({
                            format: options.dataViews[0].categorical.values[0].source.format
                        });
                        // tslint:disable-next-line:no-any
                        let yTicks: any;
                        yTicks = this.svg.selectAll('.yAxis .tick');
                        yTicks.append('title')
                            .text((d: string) => {
                                return yTitleTooltip.format(d);
                            });
                        let tickLeng: number;
                        tickLeng = yTicks.size();
                        const marginForGridLines: number = 80;
                        let i: number = 0;
                        for (i = 0; i < tickLeng; i++) {
                            let yCoordinate: string;
                            yCoordinate = yTicks[0][i].getAttribute('transform')
                                .substring(12, yTicks[0][i].getAttribute('transform').length - 1);
                            if (parseFloat(yCoordinate) !==
                                (viewModel.fytarget && yScale(<number>viewModel.fytarget)) || !fullTargetConfig.show) {
                                if (yAxisConfig.gridLines) {
                                    this.yAxis.append('line')
                                        .classed('yAxisGrid', true).attr({
                                            x1: 0,
                                            y1: yCoordinate,
                                            x2: dynamicWidth,
                                            y2: yCoordinate
                                        });
                                }
                            }
                        }
                        // tslint:disable-next-line:no-any
                        const chartBackground: any = this.barContainer.append('image')
                            .attr('xlink:href', backgroundImage.imageUrl);

                        let barData: IBarChartDataPoint[];
                        barData = [];
                        let barforecastedData: IBarChartDataPoint[];
                        barforecastedData = [];
                        let circleData: IBarChartDataPoint[];
                        circleData = [];
                        let len: number = viewModel.dataPoints.length;
                        for (i = 0; i < len; i++) {
                            if (viewModel.dataPoints[i].forecasted !== 1) {
                                barData.push(viewModel.dataPoints[i]);
                            } else {
                                barforecastedData.push(viewModel.dataPoints[i]);
                            }
                            circleData.push(viewModel.dataPoints[i]);
                        }
                        let add: number = 0;
                        if ((this.yMax > 0 && this.yMin < 0)
                            || ((this.yMax < 0 && this.yMin < 0))) {
                            add = (height - yScale(Math.abs(this.yMin)));
                        }

                        this.bars = this.barContainer.selectAll('.bar').data(barData);

                        this.barforecasted = this.barContainer.selectAll('.barforecasted').data(barforecastedData);

                        if (animation.show) {

                            this.bars.enter()
                                .append('rect')
                                .classed('bar', true);
                            this.bars.attr({
                                width: xScale.rangeBand(),
                                // tslint:disable-next-line:typedef
                                y: d => (d.value > 0) ? yScale(barOrigin) : yScale(<number>d.value),
                                // tslint:disable-next-line:no-any
                                x: function (d: any): any { return xScale(d.category); },
                                // tslint:disable-next-line:no-any
                                fill: (d: any): void => d.color
                            })
                                .transition()
                                .duration(transitionDuration)
                                .ease('linear')
                                .attr({
                                    // tslint:disable-next-line:typedef
                                    y: d => (d.value < 0) ? yScale(barOrigin) : yScale(<number>d.value),

                                    // tslint:disable-next-line:typedef
                                    height: d => (<number>d.value < 0) ? (yScale(d.value) - yScale(barOrigin))
                                        : yScale(barOrigin) - yScale(<number>d.value)

                                });
                            this.barforecasted.enter()
                                .append('rect')
                                .classed('barforecasted', true);

                            this.barforecasted.attr({
                                width: xScale.rangeBand(),
                                // tslint:disable-next-line:no-any
                                height: 0,
                                // tslint:disable-next-line:typedef
                                y: d => (d.value > 0) ? yScale(barOrigin) : yScale(<number>d.value),
                                // tslint:disable-next-line:no-any
                                x: function (d: any): any {
                                     return xScale(d.category); },
                                // tslint:disable-next-line:no-any
                                fill: (d: any): any => d.color,
                                // tslint:disable-next-line:no-any
                                stroke: (d: any): any => d.color
                            })
                                .transition()
                                .duration(transitionDuration)
                                .ease('linear')
                                .attr({
                                    // tslint:disable-next-line:typedef
                                    y: d => (d.value < 0) ? yScale(barOrigin) : yScale(<number>d.value),
                                    // tslint:disable-next-line:typedef
                                    height: d => (<number>d.value < 0) ? (yScale(d.value) - yScale(barOrigin))
                                        : yScale(barOrigin) - yScale(<number>d.value)
                                });
                        } else {

                            this.bars.enter()
                                .append('rect')
                                .classed('bar', true);

                            this.bars.attr({
                                width: xScale.rangeBand(),
                                height: 0,
                                // tslint:disable-next-line:typedef
                                y: d => (d.value < 0) ? yScale(barOrigin) : yScale(<number>d.value),
                                // tslint:disable-next-line:no-any
                                x: function (d: any): any { return xScale(d.category); },
                                // tslint:disable-next-line:no-any
                                fill: (d: any): void => d.color
                            })
                                .attr({
                                    // tslint:disable-next-line:typedef
                                    y: d => (d.value < 0) ? yScale(barOrigin) : yScale(<number>d.value),
                                    // tslint:disable-next-line:typedef
                                    height: d => (<number>d.value < 0) ? (yScale(d.value) - yScale(barOrigin))
                                        : yScale(barOrigin) - yScale(<number>d.value)
                                });
                            this.barforecasted.enter()
                                .append('rect')
                                .classed('barforecasted', true);

                            this.barforecasted.attr({
                                width: xScale.rangeBand(),
                                // tslint:disable-next-line:no-any
                                height: 0,
                                // tslint:disable-next-line:typedef
                                y: d => (d.value < 0) ? yScale(barOrigin) : yScale(<number>d.value),
                                // tslint:disable-next-line:no-any
                                x: function (d: any): any { return xScale(d.category); },
                                // tslint:disable-next-line:no-any
                                fill: (d: any): any => d.color,
                                // tslint:disable-next-line:no-any
                                stroke: (d: any): any => d.color
                            })
                                .attr({
                                    // tslint:disable-next-line:typedef
                                    y: d => (d.value < 0) ? yScale(barOrigin) : yScale(<number>d.value),
                                    // tslint:disable-next-line:typedef
                                    height: d => (<number>d.value < 0) ? (yScale(d.value) - yScale(barOrigin))
                                        : yScale(barOrigin) - yScale(<number>d.value)
                                });
                        }

                        // tslint:disable-next-line:no-any
                        this.barforecasted.on('click', function (d: any): void {
                            // Allow selection only if the visual is rendered in a view that supports interactivity (e.g. Report)
                            if (allowInteractions) {
                                selectionManager.select(d.selectionId).then((ids: ISelectionId[]) => {
                                    thisObj.barSelection = thisObj.bars;
                                    thisObj.barforecastedSelection = thisObj.barforecasted;
                                    thisObj.syncSelectionState(thisObj.barSelection, thisObj.barforecastedSelection, ids);
                                });
                                (<Event>d3.event).stopPropagation();
                            }
                        });

                        // This must be an anonymous function instead of a lambda because
                        // d3 uses 'this' as the reference to the element that was clicked.
                        // tslint:disable-next-line:no-any
                        this.bars.on('click', function (d: any): void {
                            // Allow selection only if the visual is rendered in a view that supports interactivity (e.g. Report)
                            if (allowInteractions) {
                                selectionManager.select(d.selectionId).then((ids: ISelectionId[]) => {
                                    thisObj.barSelection = thisObj.bars;
                                    thisObj.barforecastedSelection = thisObj.barforecasted;
                                    thisObj.syncSelectionState(thisObj.barSelection, thisObj.barforecastedSelection, ids);
                                });
                                (<Event>d3.event).stopPropagation();
                            }
                        });

                        this.bars.exit()
                            .remove();

                        this.barforecasted.exit()
                            .remove();

                        chartBackground.attr({
                            x: margins.left,
                            y: 10,
                            height: $('.yAxis')[0].getBoundingClientRect().height + pxLiteral,
                            width: (dynamicWidth - margins.left) + pxLiteral,
                            opacity: backgroundImage.transparency / 100,
                            preserveAspectRatio: 'none'
                        });

                        lineDataPoints = [];
                        for (i = 0, len = viewModel.dataPoints.length; i < len; i++) {
                            if (viewModel.dataPoints[i].ytd || viewModel.dataPoints[i].ytd === 0) {
                                lineDataPoints.push({
                                    x1: xScale(viewModel.dataPoints[i].category) + (xScale.rangeBand() / 2),
                                    y1: yScale(<number>viewModel.dataPoints[i].ytd)
                                });
                            }
                        }

                        for (i = 0; i < lineDataPoints.length; i++) {
                            if (yTDTargetConfig.show) {
                                let circle: d3.Selection<SVGElement>;
                                circle = this.targetLines.append('circle').classed('circle', true).attr({
                                    cx: lineDataPoints[i].x1,
                                    cy: lineDataPoints[i].y1,
                                    r: yTDTargetConfig.strokeSize + 1
                                });
                            }
                            linePoints += `${lineDataPoints[i].x1},${lineDataPoints[i].y1} `;
                        }
                        // tslint:disable-next-line:no-any
                        const circles: any = this.targetLines.selectAll('.circle').data(circleData);

                        if (yTDTargetConfig.show) {
                            ytdLine = this.targetLines.append('polyline');
                            ytdLine.attr({
                                stroke: yTDTargetConfig.lineColor,
                                'stroke-width': yTDTargetConfig.strokeSize,
                                points: linePoints,
                                fill: 'none'
                            });
                        }
                        // X-axis
                        xAxis = d3.svg.axis()
                            .scale(xScale)
                            .orient('bottom');

                        let translateHeight: string = `translate(0, ${yScale(yAxisConfig.start)} )`;
                        this.xAxis.attr('transform', translateHeight)
                            .call(xAxis);

                        this.xAxis.selectAll('path').classed('path', true);

                        this.svg.selectAll('.xAxis .tick').append('title')
                            // tslint:disable-next-line:no-any
                            .text(function (d: any): string {
                                return d.toString();
                            });

                        translateHeight = `translate(-10, ${height})`;
                        if (barWidths < minWidthForVertical) {
                            this.svg.selectAll('.xAxis .tick text')
                                // tslint:disable-next-line:no-any
                                .text(function (d: any): string {
                                    if (d.toString().length <= 13) {
                                        return d.toString();
                                    } else {
                                        let textProperties: TextProperties;
                                        textProperties = {
                                            text: d.toString(),
                                            fontFamily: 'sans-serif',
                                            fontSize: '12px'
                                        };

                                        return textMeasurementService.getTailoredTextOrDefault(textProperties, textTailoredWidth);
                                    }
                                })
                                .attr('transform', 'rotate(-45)')
                                .style('text-anchor', 'end');
                        } else {
                            let boxes: d3.Selection<SVGElement>;
                            boxes = this.svg.selectAll('.barContainer rect');
                            if (boxes[0].length) {
                                const barWidthValue: number = parseInt(boxes.attr('width'), parseIntValue);
                                // tslint:disable-next-line:no-any
                                const xTicksLabels: any = this.svg.selectAll('.xAxis .tick text')[0];
                                len = xTicksLabels.length - 1;
                                while (len >= 0) {
                                    // tslint:disable-next-line:no-any
                                    let xAxisLabel: any;
                                    xAxisLabel = xTicksLabels[len];
                                    xAxisLabel.style.textAnchor = 'middle';
                                    textMeasurementService.wordBreak(xAxisLabel, barWidthValue, textWordBreakWidth);
                                    len--;
                                }
                            }
                        }
                        if (dataLabels.show) {
                            let measureFormat: string;
                            measureFormat = this.measureFormat;
                            let targetLinesHeight: string;
                            targetLinesHeight = $('.xTargetAxis').attr('y1');
                            let displayValLabels: number = 0;
                            if (dataLabels.displayUnits === 0) {
                                const valLen: number = viewModel.dataMax.toString().length;
                                displayValLabels = this.getAutoDisplayUnits(valLen);
                            }
                            let formatter: IValueFormatter;
                            formatter = ValueFormatter.create({
                                format: measureFormat ? measureFormat : ValueFormatter.DefaultNumericFormat,
                                value: dataLabels.displayUnits === 0 ? displayValLabels : dataLabels.displayUnits,
                                precision: dataLabels.valueDecimal
                            });
                            const baseDataLabelAdjust: number = 10;
                            const barMiddleAdjust: number = 2;
                            // tslint:disable-next-line:no-any
                            let labelMargin: any;
                            labelMargin = { top: 20, right: 10, left: 2 };
                            this.barContainer
                                .append('g')
                                .classed('labelGraphicContext', true)
                                .selectAll('text')
                                .data(viewModel.dataPoints)
                                .enter()
                                .append('text')
                                .classed('dataLabel', true)
                                .style('fill', dataLabels.fontColor)
                                // tslint:disable-next-line:no-any
                                .text(function (d: any): string {
                                    let labelFormattedText: string;
                                    let barheight : number;
                                    labelFormattedText = formatter.format(d.value);
                                    let textproperties: TextProperties;
                                    textproperties = {
                                        text: labelFormattedText,
                                        fontFamily: dataLabels.fontFamily,
                                        fontSize: dataLabels.fontSize + pxLiteral
                                    };
                                    const dataTextHeight: number = textMeasurementService.measureSvgTextHeight(textproperties);
                                    barheight = (<number>d.value < 0) ? (yScale(d.value) - yScale(barOrigin))
                                       : yScale(barOrigin) - yScale(<number>d.value);
                                    textproperties.text =  barheight < dataTextHeight ? '' : textproperties.text;

                                    return textMeasurementService.getTailoredTextOrDefault(textproperties, barWidths);
                                })
                                .attr({
                                    // tslint:disable-next-line:no-any
                                    x: (d: any): any => xScale(d.category) + xScale.rangeBand() / 2 + barMiddleAdjust,
                                    // tslint:disable-next-line:no-any
                                    y: (d: any): any => d.value >= 0 ?
                                        (dataLabels.position === 'insideCenter' ? d.value === 0 ?
                                        yScale(barOrigin) + (dataLabels.fontSize / 2) - baseDataLabelAdjust :
                                            yScale(<number>d.value - (<number>d.value - barOrigin) / 2)
                                            + (dataLabels.fontSize / 2)
                                            : dataLabels.position === 'insideEnd' ? d.value === 0 ?
                                             yScale(barOrigin) + (dataLabels.fontSize / 2) - baseDataLabelAdjust :
                                                yScale(<number>d.value) + (dataLabels.fontSize / 2) + baseDataLabelAdjust
                                                :  yScale(barOrigin) + (dataLabels.fontSize / 2) - baseDataLabelAdjust
                                        ) :
                                        (dataLabels.position === 'insideCenter' ? d.value === 0 ?
                                        yScale(barOrigin) + (dataLabels.fontSize / 2) + baseDataLabelAdjust :
                                            yScale(<number>d.value - (<number>d.value - barOrigin) / 2)
                                            + (dataLabels.fontSize / 2)

                                            : dataLabels.position === 'insideEnd' ? d.value === 0 ?
                                            yScale(barOrigin) + (dataLabels.fontSize / 2) + baseDataLabelAdjust :
                                                yScale(<number>d.value) + (dataLabels.fontSize / 2) - baseDataLabelAdjust
                                                : yScale(barOrigin) + (dataLabels.fontSize / 2) + baseDataLabelAdjust
                                        ),
                                    'font-size': dataLabels.fontSize + pxLiteral,
                                    'font-family': dataLabels.fontFamily
                                }).append('title').text((d: IBarChartDataPoint): number => <number>d.value);

                            $('.labelGraphicContext').find('text').each(function (): void {
                                const labelHeight: number = $(this).height();
                                const barlabel: string = $(this).attr('y');
                                // Convert barlabel to integer and store in diff
                                const diff: number = parseInt(barlabel, parseIntValue) - 0;
                                if (diff < labelHeight) {
                                    $(this).attr('y', parseInt(barlabel, parseIntValue));
                                }
                            });
                        }
                        this.tooltipServiceWrapper.addTooltip(
                            this.barContainer.selectAll('.bar,.barforecasted'),
                            (tooltipEvent: tooltipUtils.TooltipEventArgs<number>) => this.getTooltipData(tooltipEvent.data),
                            (tooltipEvent: tooltipUtils.TooltipEventArgs<number>) => null);
                        this.tooltipServiceWrapper.addTooltip(
                            this.targetLines.selectAll('.circle'),
                            (tooltipEvent: tooltipUtils.TooltipEventArgs<number>) => this.getTooltipIndividualTargetData(tooltipEvent.data),
                            (tooltipEvent: tooltipUtils.TooltipEventArgs<number>) => null);

                        let selectionManager: ISelectionManager;
                        selectionManager = this.selectionManager;
                        let allowInteractions: boolean;
                        allowInteractions = this.host.allowInteractions;
                    }
            }
            this.barSelection = this.bars;
            this.barforecastedSelection = this.barforecasted;
            this.syncSelectionState(
                this.barSelection,
                this.barforecastedSelection,
                this.selectionManager.getSelectionIds() as ISelectionId[]
            );
            this.svg.on(
                'click',
                () => this.selectionManager.clear().then(() => {
                    this.barSelection = this.bars;
                    this.barforecastedSelection = this.barforecasted;
                    this.syncSelectionState(this.barSelection, this.barforecastedSelection, []);
                }));
        }

        // method to sync the ISelectionID and apply formatting based on selection
        private syncSelectionState(
            selection1: d3.Selection<IBarChartDataPoint>,
            selection2: d3.Selection<IBarChartDataPoint>,
            selectionIds: ISelectionId[]
        ): void {
            if (!selection1 || !selection2 || !selectionIds) {

                return;
            }

            if (!selectionIds.length) {
                selection1.style('fill-opacity', null);
                selection2.style('fill-opacity', null);

                return;
            }

            const self: this = this;

            selection1.each(function (barDataPoint: IBarChartDataPoint): void {
                const isSelected: boolean = self.isSelectionIdInArray(selectionIds, barDataPoint.selectionId);
                // add changes to the selection here
                d3.select(this).style({
                    'fill-opacity': isSelected ? BarChart.config.solidOpacity : BarChart.config.transparentOpacity
                });
            });

            selection2.each(function (barDataPoint: IBarChartDataPoint): void {
                const isSelected: boolean = self.isSelectionIdInArray(selectionIds, barDataPoint.selectionId);
                // add changes to the selection here
                d3.select(this).style({
                    'fill-opacity': isSelected ? BarChart.config.forecastedSolidOpacity : BarChart.config.forecastedTransparentOpacity
                });
            });

            return;
        }

        // method to return boolean value if given ISelectionID is selected from the given ISelectionID array
        private isSelectionIdInArray(selectionIds: ISelectionId[], selectionId: ISelectionId): boolean {
            if (!selectionIds || !selectionId) {
                return false;
            }

            return selectionIds.some((currentSelectionId: ISelectionId) => {
                return currentSelectionId.includes(selectionId);
            });
        }

        // method to set the display units when selected as auto
        public getAutoDisplayUnits(valLen: number): number {
            let displayVal: number;
            if (valLen > 9) {
                displayVal = 1e9;
            } else if (valLen <= 9 && valLen > 6) {
                displayVal = 1e6;
            } else if (valLen <= 6 && valLen >= 4) {
                displayVal = 1e3;
            } else {
                displayVal = 10;
            }

            return displayVal;
        }
        /*
                * method to display text if basic requirements are not satisfied
                */
        public displayBasicRequirement(iStatus: number): void {
            this.rootDiv.selectAll('*').empty();
            this.svg.selectAll('*').empty();
            // Change basediv height to 0 when basic requirements are not satisfied
            this.rootDiv.select('.baseDiv').style('height', '0px');
            $('<div>').attr('id', 'textToDisplay').appendTo('.rootDiv');
            if (iStatus === 0) { // if category and measure fields are not selected
                document.getElementById('textToDisplay').textContent = `Please select 'Category' and 'Measure' `;
            } else if (iStatus === 1) { // if column for category is not selected
                document.getElementById('textToDisplay').textContent = `Please select 'Category' `;
            } else if (iStatus === 2) { // if column is not selected for measure
                document.getElementById('textToDisplay').textContent = `Please select 'Measure' `;
            } else { // if appropriate column for forecasted is not selected
                document.getElementById('textToDisplay').textContent = `Please select a column with values 0 and 1 for forecasted values `;
            }
        }
        public getHorizontalSettings(dataView: DataView): IHorizontal {
            let objects: DataViewObjects = null;
            let horizontalSetting: IHorizontal;
            horizontalSetting = this.getDefaultHorizontalSettings();

            if (!dataView.metadata || !dataView.metadata.objects) { return horizontalSetting; }
            objects = dataView.metadata.objects;
            horizontalSetting.show = DataViewObjects.getValue(objects, chartProperties.horizontal.show, horizontalSetting.show);

            return horizontalSetting;
        }

        public getDefaultHorizontalSettings(): IHorizontal {
            return {
                show: false
            };
        }

        public getAnimationSettings(dataView: DataView): IAnimation {
            let objects: DataViewObjects = null;
            let animationSetting: IAnimation;
            animationSetting = this.getDefaultAnimationSettings();

            if (!dataView.metadata || !dataView.metadata.objects) { return animationSetting; }
            objects = dataView.metadata.objects;
            animationSetting.show = DataViewObjects.getValue(objects, chartProperties.animation.show, animationSetting.show);

            return animationSetting;
        }

        public getDefaultAnimationSettings(): IAnimation {
            return {
                show: false
            };
        }

        public getZoneSettings(dataView: DataView): IZoneSettings {
            let objects: DataViewObjects = null;
            let zoneSetting: IZoneSettings;
            zoneSetting = this.getDefaultZoneSettings();

            if (!dataView.metadata || !dataView.metadata.objects) { return zoneSetting; }

            objects = dataView.metadata.objects;
            zoneSetting.zone1Value = DataViewObjects.getValue(objects, chartProperties.zoneSettings.zone1Value, zoneSetting.zone1Value);
            zoneSetting.zone2Value = DataViewObjects.getValue(objects, chartProperties.zoneSettings.zone2Value, zoneSetting.zone2Value);
            zoneSetting.zone1Color = DataViewObjects.getFillColor(objects, chartProperties.zoneSettings.zone1Color, zoneSetting.zone1Color);
            zoneSetting.zone2Color = DataViewObjects.getFillColor(objects, chartProperties.zoneSettings.zone2Color, zoneSetting.zone2Color);
            zoneSetting.zone3Color = DataViewObjects.getFillColor(objects, chartProperties.zoneSettings.zone3Color, zoneSetting.zone3Color);
            zoneSetting.defaultColor = DataViewObjects.getFillColor(
                objects, chartProperties.zoneSettings.defaultColor, zoneSetting.defaultColor);

            return zoneSetting;
        }

        public getDefaultZoneSettings(): IZoneSettings {
            return {
                defaultColor: '#01B8AA',
                zone1Value: 90,
                zone2Value: 101,
                zone1Color: '#fd625e',
                zone2Color: '#f5d33f',
                zone3Color: '#01b8aa'
            };
        }

        private getYAxisSettings(dataView: DataView): IYAxisSettings {
            let objects: DataViewObjects = null;
            let yAxisSetting: IYAxisSettings;
            yAxisSetting = this.getDefaultYAxisSettings();

            if (!dataView.metadata || !dataView.metadata.objects) { return yAxisSetting; }

            objects = dataView.metadata.objects;
            yAxisSetting.fontColor = DataViewObjects.getFillColor(objects, chartProperties.yAxisConfig.fontColor, yAxisSetting.fontColor);
            yAxisSetting.displayUnits = DataViewObjects.getValue(
                objects, chartProperties.yAxisConfig.displayUnits, yAxisSetting.displayUnits);
            yAxisSetting.decimalPlaces = DataViewObjects.getValue(
                objects, chartProperties.yAxisConfig.decimalPlaces, yAxisSetting.decimalPlaces);
            yAxisSetting.gridLines = DataViewObjects.getValue(objects, chartProperties.yAxisConfig.gridLines, yAxisSetting.gridLines);
            yAxisSetting.start = DataViewObjects.getValue(objects, chartProperties.yAxisConfig.start, yAxisSetting.start);
            yAxisSetting.end = DataViewObjects.getValue(objects, chartProperties.yAxisConfig.end, yAxisSetting.end);
            yAxisSetting.fontSize = DataViewObjects.getValue(objects, chartProperties.yAxisConfig.fontSize, yAxisSetting.fontSize);
            yAxisSetting.title = DataViewObjects.getValue(objects, chartProperties.yAxisConfig.title, yAxisSetting.title);
            yAxisSetting.fontFamily = DataViewObjects.getValue(objects, chartProperties.yAxisConfig.fontFamily, yAxisSetting.fontFamily);
            if (yAxisSetting.start > this.yMin) {
                yAxisSetting.start = this.yMin;
            }
            if (this.yMin > 0) {
                if (yAxisSetting.start < 0) {
                yAxisSetting.start = 0;
                }
            }
            if (yAxisSetting.end < this.yMax) {
                yAxisSetting.end = this.yMax;
            }
            if (yAxisSetting.decimalPlaces > 4) {
                yAxisSetting.decimalPlaces = 4;
            } else if (yAxisSetting.decimalPlaces < 0) {
                yAxisSetting.decimalPlaces = 0;
            }
            if (yAxisSetting.fontSize > 20) {
                yAxisSetting.fontSize = 20;
            }

            return yAxisSetting;
        }

        public getDefaultYAxisSettings(): IYAxisSettings {
            return {
                fontColor: '#000000',
                fontSize: 12,
                displayUnits: 0,
                decimalPlaces: 0,
                gridLines: true,
                start: this.yMin,
                end: this.yMax,
                title: true,
                fontFamily: 'Arial'
            };
        }

        private getAnalyticsSettings(dataView: DataView): IAnalyticsSettings {
            let objects: DataViewObjects = null;
            let analyticsSettings: IAnalyticsSettings;
            analyticsSettings = this.getDefaultAnalyticsSettings();

            if (!dataView.metadata || !dataView.metadata.objects) { return analyticsSettings; }

            objects = dataView.metadata.objects;
            analyticsSettings.min = DataViewObjects.getValue(objects, chartProperties.analytics.min, analyticsSettings.min);
            analyticsSettings.lineColorMin = DataViewObjects.getFillColor
                (objects, chartProperties.analytics.lineColorMin, analyticsSettings.lineColorMin);
            analyticsSettings.strokeSizeMin = DataViewObjects.getValue
                (objects, chartProperties.analytics.strokeSizeMin, analyticsSettings.strokeSizeMin) > 5 ? 5
                : DataViewObjects.getValue
                    (objects, chartProperties.analytics.strokeSizeMin, analyticsSettings.strokeSizeMin);
            analyticsSettings.max = DataViewObjects.getValue(objects, chartProperties.analytics.max, analyticsSettings.max);
            analyticsSettings.lineColorMax = DataViewObjects.getFillColor
                (objects, chartProperties.analytics.lineColorMax, analyticsSettings.lineColorMax);
            analyticsSettings.strokeSizeMax = DataViewObjects.getValue
                (objects, chartProperties.analytics.strokeSizeMax, analyticsSettings.strokeSizeMax) > 5 ? 5
                : DataViewObjects.getValue
                    (objects, chartProperties.analytics.strokeSizeMax, analyticsSettings.strokeSizeMax);
            analyticsSettings.avg = DataViewObjects.getValue(objects, chartProperties.analytics.avg, analyticsSettings.avg);
            analyticsSettings.lineColorAvg = DataViewObjects.getFillColor
                (objects, chartProperties.analytics.lineColorAvg, analyticsSettings.lineColorAvg);
            analyticsSettings.strokeSizeAvg = DataViewObjects.getValue
                (objects, chartProperties.analytics.strokeSizeAvg, analyticsSettings.strokeSizeAvg) > 5 ? 5
                : DataViewObjects.getValue
                    (objects, chartProperties.analytics.strokeSizeAvg, analyticsSettings.strokeSizeAvg);
            analyticsSettings.median = DataViewObjects.getValue(objects, chartProperties.analytics.median, analyticsSettings.median);
            analyticsSettings.lineColorMedian = DataViewObjects.getFillColor
                (objects, chartProperties.analytics.lineColorMedian, analyticsSettings.lineColorMedian);
            analyticsSettings.strokeSizeMedian = DataViewObjects.getValue
                (objects, chartProperties.analytics.strokeSizeMedian, analyticsSettings.strokeSizeMedian) > 5 ? 5
                : DataViewObjects.getValue(objects, chartProperties.analytics.strokeSizeMedian, analyticsSettings.strokeSizeMedian);

            analyticsSettings.strokeSizeAvg = analyticsSettings.strokeSizeAvg < 1 ? 1 : analyticsSettings.strokeSizeAvg;
            analyticsSettings.strokeSizeMin = analyticsSettings.strokeSizeMin < 1 ? 1 : analyticsSettings.strokeSizeMin;
            analyticsSettings.strokeSizeMax = analyticsSettings.strokeSizeMax < 1 ? 1 : analyticsSettings.strokeSizeMax;
            analyticsSettings.strokeSizeMedian = analyticsSettings.strokeSizeMedian < 1 ? 1 : analyticsSettings.strokeSizeMedian;

            return analyticsSettings;
        }

        public getDefaultAnalyticsSettings(): IAnalyticsSettings {
            return {
                min: false,
                lineColorMin: 'black',
                strokeSizeMin: 1,
                max: false,
                lineColorMax: 'purple',
                strokeSizeMax: 1,
                avg: false,
                lineColorAvg: 'red',
                strokeSizeAvg: 1,
                median: false,
                lineColorMedian: 'blue',
                strokeSizeMedian: 1
            };
        }

        private getXAxisSettings(dataView: DataView): IXAxisSettings {
            let objects: DataViewObjects = null;
            let xAxisSetting: IXAxisSettings;
            xAxisSetting = this.getDefaultXAxisSettings();

            if (!dataView.metadata || !dataView.metadata.objects) { return xAxisSetting; }

            objects = dataView.metadata.objects;
            xAxisSetting.fontColor = DataViewObjects.getFillColor(objects, chartProperties.xAxisConfig.fontColor, xAxisSetting.fontColor);
            xAxisSetting.fontSize = DataViewObjects.getValue(objects, chartProperties.xAxisConfig.fontSize, xAxisSetting.fontSize);
            xAxisSetting.title = DataViewObjects.getValue(objects, chartProperties.xAxisConfig.title, xAxisSetting.title);
            xAxisSetting.fontFamily = DataViewObjects.getValue(objects, chartProperties.xAxisConfig.fontFamily, xAxisSetting.fontFamily);
            if (xAxisSetting.fontSize > 20) {
                xAxisSetting.fontSize = 20;
            }

            return xAxisSetting;
        }

        public getDefaultXAxisSettings(): IXAxisSettings {
            return {
                fontColor: '#000000',
                fontSize: 12,
                title: true,
                fontFamily: 'Arial'
            };
        }

        private getYTDSettings(dataView: DataView): ITargetSettings {
            let objects: DataViewObjects = null;
            let yTDSetting: ITargetSettings;
            yTDSetting = this.getDefaultTargetSettings();

            if (!dataView.metadata || !dataView.metadata.objects) { return yTDSetting; }

            objects = dataView.metadata.objects;
            yTDSetting.show = DataViewObjects.getValue(objects, chartProperties.yTDConfig.show, yTDSetting.show);
            yTDSetting.lineColor = DataViewObjects.getFillColor(objects, chartProperties.yTDConfig.lineColor, yTDSetting.lineColor);
            yTDSetting.strokeSize = DataViewObjects.getValue(objects, chartProperties.yTDConfig.strokeSize, yTDSetting.strokeSize);
            // Allowed stroke size from 1 to 5 only
            if (yTDSetting.strokeSize > 5) {
                yTDSetting.strokeSize = 5;
            } else if (yTDSetting.strokeSize < 1) {
                yTDSetting.strokeSize = 1;
            }

            return yTDSetting;
        }

        private getFullTargetSettings(dataView: DataView): ITargetSettings {
            let objects: DataViewObjects = null;
            let fullTargetSettings: ITargetSettings;
            fullTargetSettings = this.getDefaultTargetSettings();

            if (!dataView.metadata || !dataView.metadata.objects) { return fullTargetSettings; }

            objects = dataView.metadata.objects;
            fullTargetSettings.show = DataViewObjects.getValue(objects, chartProperties.fullTargetConfig.show, fullTargetSettings.show);
            fullTargetSettings.lineColor = DataViewObjects.getFillColor(
                objects, chartProperties.fullTargetConfig.lineColor, fullTargetSettings.lineColor);
            fullTargetSettings.strokeSize = DataViewObjects.getValue(
                objects, chartProperties.fullTargetConfig.strokeSize, fullTargetSettings.strokeSize);
            // Allowed stroke size form 1 to 5 only
            if (fullTargetSettings.strokeSize > 5) {
                fullTargetSettings.strokeSize = 5;
            } else if (fullTargetSettings.strokeSize < 1) {
                fullTargetSettings.strokeSize = 1;
            }

            return fullTargetSettings;
        }

        private getBackgroundImageSettings(dataView: DataView): IBackgroundImage {
            let objects: DataViewObjects = null;
            let backgroundImageSettings: IBackgroundImage;
            backgroundImageSettings = this.getDefaultBackgroundImageSettings();

            if (!dataView.metadata || !dataView.metadata.objects) { return backgroundImageSettings; }
            objects = dataView.metadata.objects;
            // tslint:disable-next-line:max-line-length
            if (dataView.metadata.objects.hasOwnProperty('backgroundImage') && objects.backgroundImage.show) { //checks for the backgroundimage index in objects. if present then only it is liable to check condition objects.backgroundImage.show
                backgroundImageSettings.show = DataViewObjects.getValue
                    (objects, chartProperties.backgroundImage.show, backgroundImageSettings.show);
                backgroundImageSettings.imageUrl = DataViewObjects.getValue
                    (objects, chartProperties.backgroundImage.imageUrl, backgroundImageSettings.imageUrl);
                backgroundImageSettings.transparency = DataViewObjects.getValue
                    (objects, chartProperties.backgroundImage.transparency, backgroundImageSettings.transparency);
            }

            return backgroundImageSettings;
        }

        public getDefaultTargetSettings(): ITargetSettings {
            return {
                show: true,
                lineColor: '#808080',
                strokeSize: 1
            };
        }
        public getDefaultBackgroundImageSettings(): IBackgroundImage {
            return {
                show: false,
                imageUrl: '',
                transparency: 50
            };
        }

        public getDefaultLegendSettings(): ILegendSettings {
            return {
                show: true,
                labelColor: '#000',
                labelSize: 12,
                fontFamily: 'Segoe UI',
                title: true
            };
        }
        public getLegendSettings(dataView: DataView): ILegendSettings {
            let legendSettings: ILegendSettings;
            legendSettings = this.getDefaultLegendSettings();
            let objects: DataViewObjects = null;
            if (!dataView.metadata || !dataView.metadata.objects) {
                return legendSettings;
            }
            objects = dataView.metadata.objects;
            // tslint:disable-next-line:no-any
            let legendProps: any;
            legendProps = chartProperties.legendSettings;
            legendSettings.show = DataViewObjects.getValue(objects, legendProps.show, legendSettings.show);
            legendSettings.labelColor = DataViewObjects.getFillColor(objects, legendProps.labelColor, legendSettings.labelColor);
            legendSettings.labelSize = DataViewObjects.getValue(objects, legendProps.labelSize, legendSettings.labelSize);
            legendSettings.title = DataViewObjects.getValue(objects, legendProps.title, legendSettings.title);
            legendSettings.fontFamily = DataViewObjects.getValue(objects, legendProps.fontFamily, legendSettings.fontFamily);
            if (legendSettings.labelSize > 20) {
                legendSettings.labelSize = 20;
            }

            return legendSettings;
        }
        public getDataLabelSettings(dataView: DataView): IDataLabels {
            let dataLabelsSettings: IDataLabels;
            dataLabelsSettings = this.getDefaultDataLabelSettings();
            let objects: DataViewObjects = null;
            if (!dataView.metadata || !dataView.metadata.objects) {
                return dataLabelsSettings;
            }
            objects = dataView.metadata.objects;
            // tslint:disable-next-line:no-any
            let dataProps: any;
            dataProps = chartProperties.dataLabels;
            dataLabelsSettings.show = DataViewObjects.getValue(objects, dataProps.show, dataLabelsSettings.show);
            dataLabelsSettings.fontColor = DataViewObjects.getFillColor(objects, dataProps.fontColor, dataLabelsSettings.fontColor);
            dataLabelsSettings.fontSize = DataViewObjects.getValue(objects, dataProps.fontSize, dataLabelsSettings.fontSize);
            dataLabelsSettings.fontFamily = DataViewObjects.getValue(objects, dataProps.fontFamily, dataLabelsSettings.fontFamily);
            dataLabelsSettings.displayUnits = DataViewObjects.getValue(objects, dataProps.displayUnits, dataLabelsSettings.displayUnits);
            dataLabelsSettings.valueDecimal = DataViewObjects.getValue(objects, dataProps.valueDecimal, dataLabelsSettings.valueDecimal);
            dataLabelsSettings.position = DataViewObjects.getValue(objects, dataProps.position, dataLabelsSettings.position);
            // Allowed decimal paces from 0 to 4 only
            if (dataLabelsSettings.valueDecimal > 4) {
                dataLabelsSettings.valueDecimal = 4;
            } else if (dataLabelsSettings.valueDecimal < 0) {
                dataLabelsSettings.valueDecimal = 0;
            }
            // Restrict data labels font size to 20 max
            if (dataLabelsSettings.fontSize > 20) {
                dataLabelsSettings.fontSize = 20;
            }

            return dataLabelsSettings;
        }

        // Function to get the default label settings
        public getDefaultDataLabelSettings(): IDataLabels {
            return {
                show: false,
                fontColor: '#7c7c7c',
                fontSize: 11,
                fontFamily: 'Segoe UI',
                displayUnits: 0,
                valueDecimal: 0,
                position: 'insideEnd'
            };
        }
        // Function to enumerate object instances
        // tslint:disable-next-line:cyclomatic-complexity
        public enumerateObjectInstances(options: EnumerateVisualObjectInstancesOptions): VisualObjectInstanceEnumeration {
            let zoneSetting: IZoneSettings;
            zoneSetting = this.getZoneSettings(this.dataViews);
            let yAxisConfigs: IYAxisSettings;
            yAxisConfigs = this.getYAxisSettings(this.dataViews);
            let yTDConfigs: ITargetSettings;
            yTDConfigs = this.getYTDSettings(this.dataViews);
            let fullYearConfigs: ITargetSettings;
            fullYearConfigs = this.getFullTargetSettings(this.dataViews);
            let xAxisConfigs: IXAxisSettings;
            xAxisConfigs = this.getXAxisSettings(this.dataViews);
            let legendConfig: ILegendSettings;
            legendConfig = this.getLegendSettings(this.dataViews);
            let dataLabels: IDataLabels;
            dataLabels = this.getDataLabelSettings(this.dataViews);
            let analytics: IAnalyticsSettings;
            analytics = this.getAnalyticsSettings(this.dataViews);
            let horizontal: IHorizontal;
            horizontal = this.getHorizontalSettings(this.dataViews);
            let animation: IAnimation;
            animation = this.getAnimationSettings(this.dataViews);
            let backgroundImage: IBackgroundImage;
            backgroundImage = this.getBackgroundImageSettings(this.dataViews);
            let objectName: string;
            objectName = options.objectName;
            let objectEnumeration: VisualObjectInstance[];
            objectEnumeration = [];
            const yObjProps: {} = {};
            const xObjProps: {} = {};
            switch (objectName) {
                case 'yAxis':
                    yObjProps[`fill`] = yAxisConfigs.fontColor;
                    yObjProps[`displayUnits`] = yAxisConfigs.displayUnits;
                    yObjProps[`decimalPlaces`] = yAxisConfigs.decimalPlaces;
                    yObjProps[`gridLines`] = yAxisConfigs.gridLines;
                    if (fytargetChecker && this.setYtdTarget) {
                        yObjProps[`start`] = yAxisConfigs.start;
                        yObjProps[`end`] = yAxisConfigs.end;
                    }
                    yObjProps[`title`] = yAxisConfigs.title;
                    if (yAxisConfigs.title) {
                        yObjProps[`fontSize`] = yAxisConfigs.fontSize,
                            yObjProps[`fontFamily`] = yAxisConfigs.fontFamily;
                    }
                    objectEnumeration.push({
                        objectName: objectName,
                        properties: yObjProps,
                        selector: null
                    });
                    break;
                case 'xAxis':
                    xObjProps[`fill`] = xAxisConfigs.fontColor;
                    xObjProps[`title`] = xAxisConfigs.title;
                    if (xAxisConfigs.title) {
                        xObjProps[`fontSize`] = xAxisConfigs.fontSize;
                        xObjProps[`fontFamily`] = xAxisConfigs.fontFamily;
                    }
                    objectEnumeration.push({
                        objectName: objectName,
                        properties: xObjProps,
                        selector: null
                    });
                    break;
                case 'horizontal':
                    objectEnumeration.push({
                        objectName: objectName,
                        properties: {
                            show: horizontal.show
                        },
                        selector: null
                    });
                    break;
                case 'animation':
                    objectEnumeration.push({
                        objectName: objectName,
                        properties: {
                            show: animation.show
                        },
                        selector: null
                    });
                    break;
                case 'fullYearTarget':
                    objectEnumeration.push({
                        objectName: objectName,
                        properties: {
                            show: fullYearConfigs.show,
                            lineColor: fullYearConfigs.lineColor,
                            strokeSize: fullYearConfigs.strokeSize
                        },
                        selector: null
                    });
                    break;

                case 'yTDTarget':
                    if (this.setYtdTarget) {
                        objectEnumeration.push({
                            objectName: objectName,
                            properties: {
                                show: yTDConfigs.show,
                                lineColor: yTDConfigs.lineColor,
                                strokeSize: yTDConfigs.strokeSize
                            },
                            selector: null
                        });
                        break;
                    }
                case 'analytics':
                    const obj: {} = {};
                    obj[`min`] = analytics.min;
                    if (analytics.min) {
                        obj[`lineColorMin`] = analytics.lineColorMin;
                        obj[`strokeSizeMin`] = analytics.strokeSizeMin;
                    }
                    obj[`max`] = analytics.max;
                    if (analytics.max) {
                        obj[`lineColorMax`] = analytics.lineColorMax;
                        obj[`strokeSizeMax`] = analytics.strokeSizeMax;
                    }
                    obj[`avg`] = analytics.avg;
                    if (analytics.avg) {
                        obj[`lineColorAvg`] = analytics.lineColorAvg;
                        obj[`strokeSizeAvg`] = analytics.strokeSizeAvg;
                    }
                    obj[`median`] = analytics.median;
                    if (analytics.median) {
                        obj[`lineColorMedian`] = analytics.lineColorMedian;
                        obj[`strokeSizeMedian`] = analytics.strokeSizeMedian;
                    }
                    objectEnumeration.push({
                        objectName: objectName,
                        properties: obj,
                        selector: null
                    });
                    break;

                case 'zoneSettings':
                    if (this.setYtdTarget) {
                        objectEnumeration.push({
                            objectName: objectName,
                            properties: {
                                zone1Value: zoneSetting.zone1Value,
                                zone2Value: zoneSetting.zone2Value,
                                defaultColor: zoneSetting.defaultColor,
                                zone1Color: zoneSetting.zone1Color,
                                zone2Color: zoneSetting.zone2Color,
                                zone3Color: zoneSetting.zone3Color
                            },
                            selector: null
                        });
                        break;
                    }

                case 'legend':
                    objectEnumeration.push({
                        objectName: objectName,
                        properties: {
                            show: legendConfig.show,
                            labelColor: legendConfig.labelColor,
                            fontSize: legendConfig.labelSize,
                            title: legendConfig.title,
                            fontFamily: legendConfig.fontFamily
                        },
                        selector: null
                    });
                    break;

                case 'dataLabels':
                    objectEnumeration.push({
                        objectName: objectName,
                        properties: {
                            show: dataLabels.show,
                            fontColor: dataLabels.fontColor,
                            fontSize: dataLabels.fontSize,
                            fontFamily: dataLabels.fontFamily,
                            displayUnits: dataLabels.displayUnits,
                            valueDecimal: dataLabels.valueDecimal,
                            position: dataLabels.position
                        },
                        selector: null
                    });
                    break;
                case 'backgroundImage':
                    objectEnumeration.push({
                        objectName: objectName,
                        properties: {
                            show: backgroundImage.show,
                            imageUrl: backgroundImage.imageUrl,
                            transparency: backgroundImage.transparency
                        },
                        selector: null
                    });
                    break;
                default:
                    break;

            }

            return objectEnumeration;
        }

        public getDecimalDigits(value: number): number {
            let decimalDigits: number;
            if (Math.floor(value) === value) {
                return 0;
            } else {
                decimalDigits = value.toString().split('.')[1].length;

                return (decimalDigits > 4 ? 4 : decimalDigits);
            }
        }
        // Function to display tooltip data on bars
        // tslint:disable-next-line:no-any
        private getTooltipData(value: any): VisualTooltipDataItem[] {
            let language: string;
            const tooltipDataPoints: VisualTooltipDataItem[] = [];
            language = getLocalizedString(this.locale, 'LanguageKey');
            let measureFormat: string;
            measureFormat = this.measureFormat;
            let targetFormat: string;
            targetFormat = this.targetFormat;
            let ytdDisplayName: string = '';
            let ytdTarget: string;
            ytdTarget = 'ytdtarget';

            // tslint:disable-next-line:no-any
            this.dataViews.metadata.columns.forEach((element: any) => {
                if (element.roles[ytdTarget]) {
                    ytdDisplayName = element.displayName;
                }
            });
            let formatter: IValueFormatter;
            formatter = ValueFormatter.create({
                format: measureFormat ? measureFormat : ValueFormatter.DefaultNumericFormat
            });
            if (value.ytd) {
                let formatter1: IValueFormatter;
                formatter1 = ValueFormatter.create({
                    format: targetFormat ? targetFormat : ValueFormatter.DefaultNumericFormat
                });
                tooltipDataPoints.push(
                    {
                        displayName: value.category,
                        value: formatter.format(value.value.toFixed(this.getDecimalDigits(value.value)))
                    },
                    {
                        displayName: ytdDisplayName,
                        value: formatter1.format(value.ytd.toFixed(this.getDecimalDigits(value.ytd)))
                    });
            } else {
                tooltipDataPoints.push({
                    displayName: value.category,
                    value: formatter.format(value.value.toFixed(this.getDecimalDigits(value.value)))
                });
            }
            for (const iCounter of value.tooltip) {
                const tooltipData: VisualTooltipDataItem = {
                    displayName: '',
                    value: ''
                };
                tooltipData.displayName = iCounter.name.toString();
                tooltipData.value = iCounter.value.toString();
                tooltipDataPoints.push(tooltipData);
            }

            return tooltipDataPoints;

        }
        // Function to display tooltip data on indivdual target datapoints
        // tslint:disable-next-line:no-any
        private getTooltipIndividualTargetData(value: any): VisualTooltipDataItem[] {
            let language: string;
            const tooltipDataPoints: VisualTooltipDataItem[] = [];
            language = getLocalizedString(this.locale, 'LanguageKey');
            let measureFormat: string;
            measureFormat = this.measureFormat;
            let targetFormat: string;
            targetFormat = this.targetFormat;
            let ytdDisplayName: string = '';
            let ytdTarget: string;
            ytdTarget = 'ytdtarget';

            // tslint:disable-next-line:no-any
            this.dataViews.metadata.columns.forEach((element: any) => {
                if (element.roles[ytdTarget]) {
                    ytdDisplayName = element.displayName;
                }
            });
            let formatter: IValueFormatter;
            formatter = ValueFormatter.create({
                format: measureFormat ? measureFormat : ValueFormatter.DefaultNumericFormat
            });
            if (value.ytd) {
                let formatter1: IValueFormatter;
                formatter1 = ValueFormatter.create({
                    format: targetFormat ? targetFormat : ValueFormatter.DefaultNumericFormat
                });
                tooltipDataPoints.push(
                    {
                        displayName: ytdDisplayName,
                        value: formatter1.format(value.ytd)
                    });
            } else {
                tooltipDataPoints.push({
                    displayName: value.category,
                    value: formatter.format(value.value)
                });
            }
            for (const iCounter of value.tooltip) {
                const tooltipData: VisualTooltipDataItem = {
                    displayName: '',
                    value: ''
                };
                tooltipData.displayName = iCounter.name.toString();
                tooltipData.value = iCounter.value.toString();
                tooltipDataPoints.push(tooltipData);
            }

            return tooltipDataPoints;
        }

    }
}
