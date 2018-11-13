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

module powerbi.extensibility.visual.lineBarMilestoneChart406DB93C13C94724B65458578706FC21_1  {
  'use strict';
  import DataViewObjectsParser = powerbi.extensibility.utils.dataview.DataViewObjectsParser;
  import SelectableDataPoint = powerbi.extensibility.utils.interactivity.SelectableDataPoint;
  import IInteractivityService = powerbi.extensibility.utils.interactivity.IInteractivityService;

  //interface
  export interface IVisualViewModel extends SelectableDataPoint {
    dataPoints: IVisualDataPoint[];
    keyName: string;
    dataRole: string[];
    selectionId: powerbi.extensibility.ISelectionId;
  }

  export interface IVisualDataPoint extends SelectableDataPoint {
    dates: string;
    // tslint:disable-next-line:no-any
    actualDates: any;
    yvalue: PrimitiveValue;
    CL: PrimitiveValue;
    LCL1: PrimitiveValue;
    LCL2: PrimitiveValue;
    LCL3: PrimitiveValue;
    UCL1: PrimitiveValue;
    UCL2: PrimitiveValue;
    UCL3: PrimitiveValue;
  }
  export interface IMileStonePoint {
    dates: string;
    name: string;
    actualDates: Date;
    group: string;
    color: string;
    selector: powerbi.visuals.ISelectionId;
  }
  export interface IColors {
    key: string;
    color: string;
    // tslint:disable-next-line:no-any
    selectionId: any;
  }
  export interface ITooltip {
    tooltip: VisualTooltipDataItem[];
  }
  export interface ILineBarChartBehaviorOptions {
    // tslint:disable-next-line:no-any
    clearCatcher: any;
    // tslint:disable-next-line:no-any
    lineSelection: any;
    // tslint:disable-next-line:no-any
    barSelection: any;
    // tslint:disable-next-line:no-any
    legendSelection: any;
    interactivityService: IInteractivityService;
  }

  //settings
  export class VisualSettings extends DataViewObjectsParser {
    public legend: Legend = new Legend();
    public innerDiv: InnerDivLine = new InnerDivLine();
    public outerDiv: OuterDivLine = new OuterDivLine();
    //public max: MaxLine = new MaxLine();
    public indicators: IndicatorSettings = new IndicatorSettings();
    public xAxis: XAxis = new XAxis();
    public yAxis: YAxis = new YAxis();
    public mileStone: MileStone = new MileStone();
    public todayLine: TodayLine = new TodayLine();
    public shapes: Shapes = new Shapes();
    public dataLabels: DataLabels = new DataLabels();
    public strokeWidth: Height = new Height();
    public part1: Threshold1 = new Threshold1();
    public part2: Threshold2 = new Threshold2();
  }
  export class IndicatorSettings {
    public positiveIndicatorColor: string = '#CCE39A';
    public negativeIndicatorColor: string = '#F19FA5';
    public range1: string = '#FF362B';
    public range2: string = '#002FFF';
    public range3: string = '#015C55';
  }
  export class Legend {
    public show: boolean = true;
    public fontSize: number = 8;
    public color: string = 'grey';
    public title: boolean = true;
    public titleText: string = '';
    public position: string = 'Top';
  }

  // tslint:disable-next-line:max-classes-per-file
  export class XAxis {
    public show: boolean = true;
    public color: string = 'grey';
    public typeX: string = 'Continuous';
    public startValue: string = null;
    public endValue: string = null;
    public title: boolean = false;
    public titleText: string = '';
    public titleFontSize: number = 11;
    public titleFontColor: string = '#808080';
    public fontFamily: string = 'Segoe UI';
    public verticalGridLines: boolean = false;
    public verticalLineColor: string = '#ccc';
    public verticalLineWidth: number = 1;
    // Font Size
    public fontSize: number = 11;
    public maxAxisHeight: number = null;
    public minimumCategoryWidth: number = 60;
    public innerPadding: number = 10;
  }
  // tslint:disable-next-line:max-classes-per-file
  export class YAxis {
    public show: boolean = true;
    public position: string = 'Left';
    public scaleType: string = 'linear';
    public startValue: number = null;
    public endValue: number = null;
    public color: string = 'grey';
    public title: boolean = false;
    public titleText: string = '';
    public titleFontSize: number = 11;
    public titleFontColor: string = 'grey';
    public fontFamily: string = 'Segoe UI';
    public horizontalGridLines: boolean = true;
    public horizontalLineColor: string = '#ccc';
    public horizontalLineWidth: number = 1;
    // Font Size
    public fontSize: number = 11;
    public displayUnit: number = 0;
    public decimalPoints: number = 2;
    public secondaryYAxis: boolean = false;
    public secondaryScaleType: string = 'linear';
    public secondaryStartValue: number = null;
    public secondaryEndValue: number = null;
    public secondaryColor: string = 'grey';
    public secondaryTitle: boolean = false;
    public secondaryTitleText: string = '';
    public secTitleFontSize: number = 11;
    public secondaryTitleFontColor: string = 'grey';
    public secondaryFontFamily: string = 'Segoe UI';
    // Font Size
    public secFontSize: number = 11;
    public secondaryDisplayUnit: number = 0;
    public secondaryDecimalPoint: number = 0;
  }
  // tslint:disable-next-line:max-classes-per-file
  export class DataLabels {
    public show: boolean = false;
    public fontSize: number = 11;
    public fontFamily: string = 'Segoe UI';
    public color: string = 'black';
    public displayUnit: number = 0;
    public decimalPoints: number = 2;
  }
  // tslint:disable-next-line:max-classes-per-file
  export class MileStone {
    public show: boolean = true;
    public opacity: number = 100;
    public lineWidth: number = 1;
    public lineStyle: string = 'solid';
    public colorSettings: string = 'milestoneGroup';
    public fillColor: string = 'black';
    public fontFamily: string = 'Segoe UI';
    public fontSize: number = 11;
    public verticalToggle: string = 'horizontal';
    public height: number = 20;
  }
  // tslint:disable-next-line:max-classes-per-file
  export class TodayLine {
    public show: boolean = true;
    public lineWidth: number = 1;
    public lineStyle: string = 'dashed';
    public fillColor: string = 'grey';
    public fontSize: number = 11;
    public colorBeforeTodayToggle: boolean = false;
    public colorBeforeToday: string = 'grey';
    public labelPosition: string = 'top';
  }
  // tslint:disable-next-line:max-classes-per-file
  export class Shapes {
    public lineWidth: number = 2;
    public lineStyle: string = 'solid';
    public joinType: string = 'round';
  }
  // tslint:disable-next-line:max-classes-per-file
  export class OuterDivLine {
    public CL: boolean = false;
    public lineColorCL: string = 'grey';
    public strokeSizeCL: number = 1;
    public LCL1: boolean = false;
    public lineColorLCL1: string = 'grey';
    public strokeSizeLCL1: number = 1;
    public LCL2: boolean = false;
    public lineColorLCL2: string = 'grey';
    public strokeSizeLCL2: number = 1;
    public LCL3: boolean = false;
    public lineColorLCL3: string = 'grey';
    public strokeSizeLCL3: number = 1;
    public UCL1: boolean = false;
    public lineColorUCL1: string = 'grey';
    public strokeSizeUCL1: number = 1;
    public UCL2: boolean = false;
    public lineColorUCL2: string = 'grey';
    public strokeSizeUCL2: number = 1;
    public UCL3: boolean = false;
    public lineColorUCL3: string = 'grey';
    public strokeSizeUCL3: number = 1;
  }
  // tslint:disable-next-line:max-classes-per-file
  export class InnerDivLine {
    public CL: boolean = false;
    public lineColorCL: string = 'grey';
    public strokeSizeCL: number = 1;
    public LCL1: boolean = false;
    public lineColorLCL1: string = 'grey';
    public strokeSizeLCL1: number = 1;
    public LCL2: boolean = false;
    public lineColorLCL2: string = 'grey';
    public strokeSizeLCL2: number = 1;
    public LCL3: boolean = false;
    public lineColorLCL3: string = 'grey';
    public strokeSizeLCL3: number = 1;
    public UCL1: boolean = false;
    public lineColorUCL1: string = 'grey';
    public strokeSizeUCL1: number = 1;
    public UCL2: boolean = false;
    public lineColorUCL2: string = 'grey';
    public strokeSizeUCL2: number = 1;
    public UCL3: boolean = false;
    public lineColorUCL3: string = 'grey';
    public strokeSizeUCL3: number = 1;
  }
  // tslint:disable-next-line:max-classes-per-file
  export class Height {
    public strokeWidth: number = 1;
    public borderColor: string = '#CCE39A';
  }
  // tslint:disable-next-line:max-classes-per-file
  export class Threshold1 {
    public show: boolean = false;
    public threshold1: number = 0;
    public threshold2: number = 0;
    public threshold3: number = 0;
    public threshold4: number = 0;
    public threshold5: number = 0;
    public threshold6: number = 0;
    public threshold7: number = 0;
    public threshold8: number = 0;
    public threshold9: number = 0;
    public threshold10: number = 0;
    public threshold11: number = 0;
    public threshold12: number = 0;
    public threshold13: number = 0;
    public threshold14: number = 0;
    public threshold15: number = 0;
    public threshold16: number = 0;
    public threshold17: number = 0;
    public threshold18: number = 0;
    public threshold19: number = 0;
    public threshold20: number = 0;
  }
  // tslint:disable-next-line:max-classes-per-file
  export class Threshold2 {
    public show: boolean = false;
    public threshold1: number = 0;
    public threshold2: number = 0;
    public threshold3: number = 0;
    public threshold4: number = 0;
    public threshold5: number = 0;
    public threshold6: number = 0;
    public threshold7: number = 0;
    public threshold8: number = 0;
    public threshold9: number = 0;
    public threshold10: number = 0;
    public threshold11: number = 0;
    public threshold12: number = 0;
    public threshold13: number = 0;
    public threshold14: number = 0;
    public threshold15: number = 0;
    public threshold16: number = 0;
    public threshold17: number = 0;
    public threshold18: number = 0;
    public threshold19: number = 0;
    public threshold20: number = 0;
  }
}
