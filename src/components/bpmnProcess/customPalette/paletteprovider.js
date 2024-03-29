import { assign } from "min-dash";

export default  function PaletteProvider(
  palette,
  create,
  elementFactory,
  handTool,
  lassoTool,
  spaceTool,
  globalConnect,
  translate
) {
  this.create = create;
  this.elementFactory = elementFactory;
  this.handTool = handTool;
  this.lassoTool = lassoTool;
  this.spaceTool = spaceTool;
  this.globalConnect = globalConnect;
  this.translate = translate;

  palette.registerProvider(this);
}

PaletteProvider.$inject = [
  "palette",
  "create",
  "elementFactory",
  "handTool",
  "lassoTool",
  "spaceTool",
  "globalConnect",
  "translate"
];

PaletteProvider.prototype.getPaletteEntries = function (element) {
  const {
    create,
    elementFactory,
    handTool,
    lassoTool,
    spaceTool,
    globalConnect,
    translate
  } = this;
  
  function setNodeName(shape){
  	if(shape.type=='bpmn:UserTask'){
  		shape.businessObject.name ="节点名称"
  	}else if(shape.type=='bpmn:StartEvent' || shape.type=='bpmn:EndEvent'){
  		shape.businessObject.name = translate(shape.type)
  	}
  	return shape
  }
  function createAction(type, group, className, title, options) {
    function createListener(event) {
      var shape = elementFactory.createShape(assign({ type: type }, options));
      
      if (options) {
        shape.businessObject.di.isExpanded = options.isExpanded;
      }
      shape = setNodeName(shape);
      create.start(event, shape);
    }

    var shortType = type.replace(/^bpmn:/, "");

    return {
      group: group,
      className: className,
      shortName:options.shortName,
      title: title || translate("Create {type}", { type: shortType }),
      action: {
        dragstart: createListener,
        click: createListener
      }
    };
  }
  function createSubprocess(event) {
    var subProcess = elementFactory.createShape({
      type: 'bpmn:SubProcess',
      x: 0,
      y: 0,
      isExpanded: true
    });

    var startEvent = elementFactory.createShape({
      type: 'bpmn:StartEvent',
      x: 40,
      y: 82,
      parent: subProcess
    });

    create.start(event, [ subProcess, startEvent ], {
      hints: {
        autoSelect: [ startEvent ]
      }
    });
  }

  function createParticipant(event, collapsed) {
	    create.start(event, elementFactory.createParticipantShape(collapsed));
	}
  function teachCourse(event){
  		create.start(event,elementFactory)
  }
  return {
//  'tool-separator': {
//    group: 'toolsTitle',
//    title:"工具",
//    separator: true
//  },
   	'hand-tool': {
      group: 'tools',
      className: 'el-icon-custom-handtool',
      shortName:"抓手工具",
      title: translate('Activate the hand tool'),
      action: {
        click: function(event) {
        	handTool.activateHand(event);
        }
      }
    },
    'lasso-tool': {
      group: 'tools',
      className: 'el-icon-custom-lassotool',
      shortName:"套索工具",
      title: translate('Activate the lasso tool'),
      action: {
        click: function(event) {
          lassoTool.activateSelection(event);
        }
      }
    },
    'space-tool': {
      group: 'tools',
      className: 'el-icon-custom-spacetool',
      shortName:"空间工具",
      title: translate('Activate the create/remove space tool'),
      action: {
        click: function(event) {
          spaceTool.activateSelection(event);
        }
      }
    },
    'global-connect-tool': {
      group: 'tools',
      shortName:"连接工具",
      className: 'el-icon-custom-connecttool',
      title: translate('Activate the global connect tool'),
      action: {
        click: function(event) {
          globalConnect.toggle(event);
        }
      }
    },
//  'tool-separator': {
//    group: 'eventsTitle',
//    title:"元件",
//    separator: true
//  },
    'create.start-event': createAction(
      'bpmn:StartEvent', 'event', 'el-icon-custom-start',
      translate('Create StartEvent'),{shortName:"开始事件"}
    ),
    'create.UserTask': createAction(
      'bpmn:UserTask', 'event', 'el-icon-custom-usertask',
      translate('Create UserTask'),{shortName:"用户任务"}
    ),
    'create.exclusive-gateway': createAction(
      'bpmn:ExclusiveGateway', 'event', 'el-icon-custom-gateway',
      translate('Create Gateway'),{shortName:"网关连接器"}
    ),
//  'create.intermediate-event': createAction(
//    'bpmn:IntermediateThrowEvent', 'event', 'el-icon-custom-intermediate',
//    translate('Create Intermediate/Boundary Event'),{shortName:"中间事件"}
//  ),
    'create.end-event': createAction(
      'bpmn:EndEvent', 'event', 'el-icon-custom-end',
      translate('Create EndEvent'),{shortName:"结束事件"}
    ),
//  'create.data-object': createAction(
//    'bpmn:DataObjectReference', 'event', 'el-icon-custom-dataobject',
//    translate('Create DataObjectReference'),{shortName:"数据对象"}
//  ),
//  'create.data-store': createAction(
//    'bpmn:DataStoreReference', 'event', 'el-icon-custom-datastore',
//    translate('Create DataStoreReference'),{shortName:"数据存储"}
//  ),
//  'create.subprocess-expanded': {
//    group: 'event',
//    className: 'el-icon-custom-subprocess',
//    shortName:"扩展子流程",
//    title: translate('Create expanded SubProcess'),
//    action: {
//      dragstart: createSubprocess,
//      click: createSubprocess
//    }
//  },
//  'create.participant-expanded': {
//    group: 'event',
//    className: 'el-icon-custom-pool',
//    shortName:"创建池",
//    title: translate('Create Pool/Participant'),
//    action: {
//      dragstart: createParticipant,
//      click: createParticipant
//    }
//  },
//  'create.group': createAction(
//    'bpmn:Group', 'event', 'el-icon-custom-group',
//    translate('Create Group'),{shortName:"创建组"}
//  )
//  ,
//  'tool-separator-two': {
//    group: 'difined',
//    separator: true
//  },
//  'teach-course': {
//    group: 'difined',
//    className: 'el-icon-question',
//    title: translate('简单教程'),
//    action: {
//      click:teachCourse
//    }
//  }
    
  };
};