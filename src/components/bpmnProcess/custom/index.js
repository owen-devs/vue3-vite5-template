import DefaultRenderer from '../customRender/diagram/DefaultRenderer';
import Styles from '../customRender/diagram/Styles';
import BpmnRenderer from '../customRender/bpmnRender/BpmnRenderer';
import TextRenderer from '../customRender/bpmnRender/TextRenderer';
import PathMap from '../customRender/bpmnRender/PathMap';
import Canvas from '../customRender/canvas/Canvas';
import GlobalConnect from '../customGlobalconnect/GlobalConnect';
import Connect from '../customConnect/Connect';
import ConnectPreview from '../customConnect/ConnectPreview';
import Dragging from '../customDragging/Dragging';
import EventBus from '../customRender/canvas/EventBus';

import Modeling from '../customRender/modeling/Modeling';
import BpmnUpdater from '../customRender/modeling/BpmnUpdater';
import BpmnLayouter from '../customRender/modeling/BpmnLayouter';
import CroppingConnectionDocking from '../customRender/modeling/CroppingConnectionDocking';

import ElementFactory from '../customRender/modeling/ElementFactory';
import BpmnFactory from '../customRender/modeling/BpmnFactory';
import CommandStack from '../customRender/command/CommandStack';


import paletteProvider from "../customPalette/paletteprovider";
import customPalette from "../customPalette/palette";

import ContextPadProvider from '../customContextpad/ContextPadProvider';
import ContextPad from '../customContextpad/ContextPad';
import ReplaceMenuProvider from '../customPopupmenu/ReplaceMenuProvider';
import BpmnReplace from '../customPopupmenu/BpmnReplace';
import PopupMenu from '../customPopupmenu/PopupMenu';

import KeyboardMove from '../customNavigation/keyboardMove/KeyboardMove';
import Keyboard from '../customNavigation/keyboard/Keyboard';
import KeyboardBindings from '../customNavigation/keyboard/KeyboardBindings';


export default {
  __init__: [
  "modeling",
  "bpmnRenderer",
  "canvas",
  "bpmnUpdater",
  "paletteProvider",
  'palette',
  'defaultRenderer',
  "contextPadProvider",
  'replaceMenuProvider',
  'popupMenu',
  'keyboardMove',
  'keyboard', 
  'keyboardBindings',
  'connectPreview'
  ],
  modeling: [ 'type', Modeling ],
  commandStack: [ 'type', CommandStack ],
  canvas: [ 'type', Canvas ],
  globalConnect: [ 'type', GlobalConnect ],
  connect: [ 'type', Connect ],
  connectPreview: [ 'type', ConnectPreview ],
  dragging: [ 'type', Dragging ],
  eventBus: [ 'type', EventBus ],
  elementFactory: [ 'type', ElementFactory ],
  bpmnFactory: [ 'type', BpmnFactory ],
  bpmnUpdater: [ 'type', BpmnUpdater ],
  layouter: [ 'type', BpmnLayouter ],
  connectionDocking: [ 'type', CroppingConnectionDocking ],
  defaultRenderer: [ 'type', DefaultRenderer ],
  bpmnRenderer: [ 'type', BpmnRenderer ],
  textRenderer: [ 'type', TextRenderer ],
  pathMap: [ 'type', PathMap ],
  styles: [ 'type', Styles ],
  paletteProvider: ["type", paletteProvider],
	palette: [ 'type', customPalette ],
	contextPadProvider: [ 'type', ContextPadProvider ],
	contextPad: [ 'type', ContextPad ],
	replaceMenuProvider: [ 'type', ReplaceMenuProvider ],
	bpmnReplace: [ 'type', BpmnReplace ],
	popupMenu: [ 'type', PopupMenu ],
	keyboard: [ 'type', Keyboard ],
  keyboardBindings: [ 'type', KeyboardBindings ],
	keyboardMove: [ 'type', KeyboardMove ],
	
	
};
